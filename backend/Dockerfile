# ---- build stage ----
FROM golang:1.21-alpine AS build
WORKDIR /src

# No external dependencies, so only go.mod is needed for the module graph.
COPY go.mod ./
RUN go mod download

COPY . .
# Static, stripped binary so it can run in a minimal image.
RUN CGO_ENABLED=0 GOOS=linux go build -ldflags="-s -w" -o /out/server .

# ---- run stage ----
FROM alpine:3.20
# ca-certificates lets the mailer make a TLS/STARTTLS connection to SMTP.
RUN apk add --no-cache ca-certificates tzdata \
    && adduser -D -u 10001 appuser \
    && mkdir -p /data && chown appuser:appuser /data

WORKDIR /app
COPY --from=build /out/server .

# Persist enquiries here; mounted as a volume so they survive restarts.
ENV PORT=8090 \
    DATA_FILE=/data/contacts.json
VOLUME ["/data"]
EXPOSE 8090

USER appuser
ENTRYPOINT ["/app/server"]
