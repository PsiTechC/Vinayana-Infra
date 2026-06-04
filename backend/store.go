package main

import (
	"encoding/json"
	"fmt"
	"os"
	"sync"
	"time"
)

// Store is a tiny thread-safe JSON-file persistence layer for contact
// submissions. It avoids any external database dependency so the backend
// runs with the Go standard library alone.
type Store struct {
	mu   sync.Mutex
	path string
}

func NewStore(path string) *Store {
	return &Store{path: path}
}

// SaveContact appends a submission to the JSON file on disk.
func (s *Store) SaveContact(sub ContactSubmission) error {
	s.mu.Lock()
	defer s.mu.Unlock()

	subs, err := s.readAll()
	if err != nil {
		return err
	}
	subs = append(subs, sub)

	data, err := json.MarshalIndent(subs, "", "  ")
	if err != nil {
		return err
	}
	return os.WriteFile(s.path, data, 0o644)
}

// Count returns how many submissions are stored (used by health/admin).
func (s *Store) Count() int {
	s.mu.Lock()
	defer s.mu.Unlock()
	subs, _ := s.readAll()
	return len(subs)
}

// readAll loads existing submissions; a missing file is treated as empty.
func (s *Store) readAll() ([]ContactSubmission, error) {
	var subs []ContactSubmission
	data, err := os.ReadFile(s.path)
	if err != nil {
		if os.IsNotExist(err) {
			return subs, nil
		}
		return nil, err
	}
	if len(data) == 0 {
		return subs, nil
	}
	if err := json.Unmarshal(data, &subs); err != nil {
		return nil, fmt.Errorf("corrupt store %s: %w", s.path, err)
	}
	return subs, nil
}

// newID builds a sortable, time-based identifier for a submission.
func newID() string {
	return fmt.Sprintf("VIP-%d", time.Now().UnixNano())
}
