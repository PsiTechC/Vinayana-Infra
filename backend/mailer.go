package main

import (
	"fmt"
	"log"
	"net/smtp"
	"strings"
)

// Mailer sends contact-form enquiries by email over SMTP. All settings come
// from environment variables so no credentials live in the codebase. If SMTP
// is not configured the mailer is disabled and submissions are still saved to
// disk (the website keeps working, it just won't email).
type Mailer struct {
	host string // SMTP server host, e.g. smtp.gmail.com
	port string // SMTP server port, e.g. 587
	user string // SMTP username (login)
	pass string // SMTP password / app password
	from string // envelope + header From address
	to   string // recipient — where enquiries land
}

// NewMailer builds a Mailer from environment variables:
//
//	SMTP_HOST   SMTP server host           (required to enable email)
//	SMTP_PORT   SMTP server port           (default 587)
//	SMTP_USER   SMTP login username        (required to enable email)
//	SMTP_PASS   SMTP login password        (required to enable email)
//	MAIL_FROM   "From" address             (default = SMTP_USER)
//	MAIL_TO     recipient address          (default info@vinayanainfra.com)
func NewMailer() *Mailer {
	m := &Mailer{
		host: getenv("SMTP_HOST", ""),
		port: getenv("SMTP_PORT", "587"),
		user: getenv("SMTP_USER", ""),
		pass: getenv("SMTP_PASS", ""),
		from: getenv("MAIL_FROM", ""),
		to:   getenv("MAIL_TO", "info@vinayanainfra.com"),
	}
	if m.from == "" {
		m.from = m.user
	}
	return m
}

// Enabled reports whether SMTP is configured. When false, Send is a no-op.
func (m *Mailer) Enabled() bool {
	return m.host != "" && m.user != "" && m.pass != ""
}

// Send delivers a single enquiry to the configured recipient. It returns an
// error so the caller can log delivery failures; it never panics.
func (m *Mailer) Send(sub ContactSubmission) error {
	if !m.Enabled() {
		return fmt.Errorf("smtp not configured")
	}

	subject := sub.Subject
	if subject == "" {
		subject = "New website enquiry"
	}

	body := buildBody(sub)
	msg := buildMessage(m.from, m.to, sub.Email, "[Vinayana Infra] "+subject, body)

	addr := m.host + ":" + m.port
	auth := smtp.PlainAuth("", m.user, m.pass, m.host)
	return smtp.SendMail(addr, auth, m.from, []string{m.to}, []byte(msg))
}

// buildBody renders a readable plain-text email from a submission.
func buildBody(sub ContactSubmission) string {
	var b strings.Builder
	b.WriteString("You have received a new enquiry from the Vinayana Infra website.\n\n")
	fmt.Fprintf(&b, "Name:    %s\n", sub.Name)
	fmt.Fprintf(&b, "Email:   %s\n", sub.Email)
	if sub.Phone != "" {
		fmt.Fprintf(&b, "Phone:   %s\n", sub.Phone)
	}
	if sub.Subject != "" {
		fmt.Fprintf(&b, "Subject: %s\n", sub.Subject)
	}
	b.WriteString("\nMessage:\n")
	b.WriteString(sub.Message)
	b.WriteString("\n\n----\n")
	fmt.Fprintf(&b, "Reference: %s\n", sub.ID)
	fmt.Fprintf(&b, "Received:  %s\n", sub.CreatedAt.Format("02 Jan 2006 15:04 MST"))
	fmt.Fprintf(&b, "Sender IP: %s\n", sub.IP)
	return b.String()
}

// buildMessage assembles RFC 5322 headers + body. Reply-To is set to the
// enquirer so replying from the inbox goes straight back to them.
func buildMessage(from, to, replyTo, subject, body string) string {
	var b strings.Builder
	fmt.Fprintf(&b, "From: %s\r\n", from)
	fmt.Fprintf(&b, "To: %s\r\n", to)
	if replyTo != "" {
		fmt.Fprintf(&b, "Reply-To: %s\r\n", replyTo)
	}
	fmt.Fprintf(&b, "Subject: %s\r\n", subject)
	b.WriteString("MIME-Version: 1.0\r\n")
	b.WriteString("Content-Type: text/plain; charset=\"utf-8\"\r\n")
	b.WriteString("\r\n")
	b.WriteString(body)
	return b.String()
}

// logMailerStatus prints whether email delivery is active at startup.
func logMailerStatus(m *Mailer) {
	if m.Enabled() {
		log.Printf("email delivery enabled — enquiries will be sent to %s via %s", m.to, m.host)
	} else {
		log.Printf("email delivery DISABLED (set SMTP_HOST, SMTP_USER, SMTP_PASS to enable) — enquiries saved to disk only")
	}
}
