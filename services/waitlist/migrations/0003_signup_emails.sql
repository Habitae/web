-- Only new signups enqueue mail. Existing waitlist entries are not backfilled.
CREATE TABLE waitlist_email_outbox (
  id TEXT PRIMARY KEY,
  email TEXT NOT NULL REFERENCES waitlist(email) ON DELETE CASCADE,
  kind TEXT NOT NULL CHECK (kind IN ('confirmation', 'admin')),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'failed')),
  payload_json TEXT,
  attempts INTEGER NOT NULL DEFAULT 0,
  first_attempt_at TEXT,
  next_attempt_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  locked_until TEXT,
  sent_at TEXT,
  provider_id TEXT,
  last_error TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE (email, kind)
);
CREATE INDEX waitlist_email_pending ON waitlist_email_outbox(status, next_attempt_at);
CREATE TRIGGER waitlist_queue_signup_emails AFTER INSERT ON waitlist BEGIN
  INSERT INTO waitlist_email_outbox (id, email, kind) VALUES (lower(hex(randomblob(16))), NEW.email, 'confirmation');
  INSERT INTO waitlist_email_outbox (id, email, kind) VALUES (lower(hex(randomblob(16))), NEW.email, 'admin');
END;
