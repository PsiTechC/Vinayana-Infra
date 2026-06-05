package main

import (
	"crypto/tls"
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
	// This host (MailEnable / typical cPanel) advertises only AUTH LOGIN, which
	// Go's stdlib doesn't implement — so we use our own LOGIN mechanism below.
	auth := &loginAuth{user: m.user, pass: m.pass}

	// Port 465 speaks TLS from the first byte (implicit TLS / SMTPS). Go's
	// smtp.SendMail can't do that — it only upgrades via STARTTLS — so we dial
	// the TLS connection ourselves. Ports 587/25 connect plain then STARTTLS.
	if m.port == "465" {
		return m.sendImplicitTLS(addr, auth, []byte(msg))
	}
	return m.sendStartTLS(addr, auth, []byte(msg))
}

// tlsConfig builds the TLS settings used for both implicit TLS and STARTTLS.
// Shared hosting (MailEnable/cPanel) usually presents the provider's own
// certificate (e.g. CN=whgi.net), not one matching mail.<domain>, so strict
// hostname verification fails. The channel stays TLS-encrypted; we just skip
// the name check. Set SMTP_STRICT_TLS=1 to enforce verification.
func (m *Mailer) tlsConfig() *tls.Config {
	return &tls.Config{
		ServerName:         m.host,
		InsecureSkipVerify: getenv("SMTP_STRICT_TLS", "") == "",
	}
}

// sendImplicitTLS delivers over a connection that is TLS-encrypted from the
// first byte (the SMTPS scheme used on port 465).
func (m *Mailer) sendImplicitTLS(addr string, auth smtp.Auth, msg []byte) error {
	conn, err := tls.Dial("tcp", addr, m.tlsConfig())
	if err != nil {
		return fmt.Errorf("tls dial %s: %w", addr, err)
	}
	c, err := smtp.NewClient(conn, m.host)
	if err != nil {
		return fmt.Errorf("smtp client: %w", err)
	}
	return m.deliver(c, auth, msg)
}

// sendStartTLS connects in the clear, upgrades to TLS via STARTTLS, then sends
// (the scheme used on ports 587/25).
func (m *Mailer) sendStartTLS(addr string, auth smtp.Auth, msg []byte) error {
	c, err := smtp.Dial(addr)
	if err != nil {
		return fmt.Errorf("smtp dial %s: %w", addr, err)
	}
	if ok, _ := c.Extension("STARTTLS"); ok {
		if err := c.StartTLS(m.tlsConfig()); err != nil {
			return fmt.Errorf("starttls: %w", err)
		}
	}
	return m.deliver(c, auth, msg)
}

// deliver runs AUTH + the MAIL/RCPT/DATA exchange on an established client.
func (m *Mailer) deliver(c *smtp.Client, auth smtp.Auth, msg []byte) error {
	defer c.Close()
	if err := c.Auth(auth); err != nil {
		return fmt.Errorf("smtp auth: %w", err)
	}
	if err := c.Mail(m.from); err != nil {
		return fmt.Errorf("smtp MAIL FROM: %w", err)
	}
	if err := c.Rcpt(m.to); err != nil {
		return fmt.Errorf("smtp RCPT TO: %w", err)
	}
	wc, err := c.Data()
	if err != nil {
		return fmt.Errorf("smtp DATA: %w", err)
	}
	if _, err := wc.Write(msg); err != nil {
		return fmt.Errorf("smtp write body: %w", err)
	}
	if err := wc.Close(); err != nil {
		return fmt.Errorf("smtp close body: %w", err)
	}
	return c.Quit()
}

// loginAuth implements the SMTP AUTH LOGIN mechanism, which Go's net/smtp
// omits (it ships only PLAIN and CRAM-MD5). Many Windows/cPanel mail servers
// (MailEnable here) advertise LOGIN only. We always run it inside a TLS
// channel (implicit on 465, STARTTLS on 587), so credentials aren't exposed.
type loginAuth struct{ user, pass string }

func (a *loginAuth) Start(*smtp.ServerInfo) (string, []byte, error) {
	return "LOGIN", nil, nil
}

func (a *loginAuth) Next(fromServer []byte, more bool) ([]byte, error) {
	if !more {
		return nil, nil
	}
	switch prompt := strings.ToLower(strings.TrimSpace(string(fromServer))); {
	case strings.Contains(prompt, "user"):
		return []byte(a.user), nil
	case strings.Contains(prompt, "pass"):
		return []byte(a.pass), nil
	default:
		return nil, fmt.Errorf("unexpected SMTP LOGIN challenge: %q", fromServer)
	}
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
