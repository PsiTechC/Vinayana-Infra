package main

import "time"

// Project is a featured development shown on the website.
type Project struct {
	ID       int    `json:"id"`
	Title    string `json:"title"`
	Location string `json:"location"`
	Status   string `json:"status"` // Completed | Ongoing | Upcoming
	Category string `json:"category"`
	Image    string `json:"image"`
}

// ContactRequest is the inbound payload from the website contact form.
type ContactRequest struct {
	Name    string `json:"name"`
	Email   string `json:"email"`
	Phone   string `json:"phone"`
	Subject string `json:"subject"`
	Message string `json:"message"`
}

// ContactSubmission is a stored enquiry (request + server-side metadata).
type ContactSubmission struct {
	ContactRequest
	ID        string    `json:"id"`
	CreatedAt time.Time `json:"created_at"`
	IP        string    `json:"ip"`
}

// APIResponse is the generic JSON envelope for write endpoints.
type APIResponse struct {
	Message string `json:"message,omitempty"`
	Error   string `json:"error,omitempty"`
}
