package main

import (
	"encoding/json"
	"log"
	"net"
	"net/http"
	"regexp"
	"strings"
	"time"
)

var emailRe = regexp.MustCompile(`^[^@\s]+@[^@\s]+\.[^@\s]+$`)

// seedProjects is the featured-project list served to the website.
var seedProjects = []Project{
	{ID: 1, Title: "Vinayana Skyline Residences", Location: "Sector 84, Gurugram", Status: "Ongoing", Category: "Residential", Image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=900&q=80"},
	{ID: 3, Title: "Greenfield Township Phase II", Location: "Sarjapur, Bengaluru", Status: "Ongoing", Category: "Land Development", Image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=900&q=80"},
	{ID: 6, Title: "Vinayana Trade Centre", Location: "Vesu, Surat", Status: "Ongoing", Category: "Commercial", Image: "https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=900&q=80"},
}

type Server struct {
	store  *Store
	mailer *Mailer
}

func NewServer(store *Store, mailer *Mailer) *Server {
	return &Server{store: store, mailer: mailer}
}

// Routes wires up all API endpoints behind CORS + logging middleware.
func (s *Server) Routes() http.Handler {
	mux := http.NewServeMux()
	mux.HandleFunc("/api/health", s.handleHealth)
	mux.HandleFunc("/api/projects", s.handleProjects)
	mux.HandleFunc("/api/contact", s.handleContact)
	return logging(cors(mux))
}

func (s *Server) handleHealth(w http.ResponseWriter, r *http.Request) {
	writeJSON(w, http.StatusOK, map[string]any{
		"status":      "ok",
		"service":     "vinayana-infra-backend",
		"submissions": s.store.Count(),
		"time":        time.Now().UTC(),
	})
}

func (s *Server) handleProjects(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		writeJSON(w, http.StatusMethodNotAllowed, APIResponse{Error: "method not allowed"})
		return
	}
	writeJSON(w, http.StatusOK, seedProjects)
}

func (s *Server) handleContact(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		writeJSON(w, http.StatusMethodNotAllowed, APIResponse{Error: "method not allowed"})
		return
	}

	var req ContactRequest
	if err := json.NewDecoder(http.MaxBytesReader(w, r.Body, 1<<20)).Decode(&req); err != nil {
		writeJSON(w, http.StatusBadRequest, APIResponse{Error: "invalid JSON payload"})
		return
	}

	req.Name = strings.TrimSpace(req.Name)
	req.Email = strings.TrimSpace(req.Email)
	req.Message = strings.TrimSpace(req.Message)

	if req.Name == "" || req.Email == "" || req.Message == "" {
		writeJSON(w, http.StatusBadRequest, APIResponse{Error: "name, email and message are required"})
		return
	}
	if !emailRe.MatchString(req.Email) {
		writeJSON(w, http.StatusBadRequest, APIResponse{Error: "please provide a valid email address"})
		return
	}

	sub := ContactSubmission{
		ContactRequest: req,
		ID:             newID(),
		CreatedAt:      time.Now().UTC(),
		IP:             clientIP(r),
	}

	if err := s.store.SaveContact(sub); err != nil {
		log.Printf("save contact: %v", err)
		writeJSON(w, http.StatusInternalServerError, APIResponse{Error: "could not save your message, please try again"})
		return
	}

	log.Printf("new enquiry %s from %s <%s>", sub.ID, req.Name, req.Email)

	// Email the enquiry to the team. Done in the background so a slow or failing
	// mail server never blocks the visitor's response — the submission is
	// already safely saved to disk above.
	if s.mailer.Enabled() {
		go func() {
			if err := s.mailer.Send(sub); err != nil {
				log.Printf("email enquiry %s failed: %v", sub.ID, err)
			} else {
				log.Printf("email enquiry %s delivered to %s", sub.ID, s.mailer.to)
			}
		}()
	}

	writeJSON(w, http.StatusCreated, APIResponse{
		Message: "Thank you, " + req.Name + "! Your message has been received. Our team will reach out shortly.",
	})
}

// ---------- helpers ----------

func writeJSON(w http.ResponseWriter, status int, v any) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	_ = json.NewEncoder(w).Encode(v)
}

func clientIP(r *http.Request) string {
	if fwd := r.Header.Get("X-Forwarded-For"); fwd != "" {
		return strings.TrimSpace(strings.Split(fwd, ",")[0])
	}
	host, _, err := net.SplitHostPort(r.RemoteAddr)
	if err != nil {
		return r.RemoteAddr
	}
	return host
}

// ---------- middleware ----------

func cors(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusNoContent)
			return
		}
		next.ServeHTTP(w, r)
	})
}

func logging(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		start := time.Now()
		next.ServeHTTP(w, r)
		log.Printf("%s %s %s", r.Method, r.URL.Path, time.Since(start))
	})
}
