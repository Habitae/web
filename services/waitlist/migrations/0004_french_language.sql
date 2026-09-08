-- Preserve signup consent and pending/sent deliveries while adding French.
CREATE TABLE waitlist_i18n_backup AS SELECT * FROM waitlist;
CREATE TABLE waitlist_outbox_i18n_backup AS SELECT * FROM waitlist_email_outbox;
DROP TRIGGER waitlist_queue_signup_emails;
DROP TABLE waitlist_email_outbox;
DROP TABLE waitlist;
CREATE TABLE IF NOT EXISTS waitlist (
  email TEXT PRIMARY KEY,
  language TEXT NOT NULL CHECK (language IN ('pt', 'en', 'fr')),
  role TEXT NOT NULL CHECK (role IN ('owner', 'resident', 'manager', 'other')),
  consent_version TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS waitlist_created_at ON waitlist(created_at);

INSERT INTO waitlist SELECT * FROM waitlist_i18n_backup;
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

INSERT INTO waitlist_email_outbox SELECT * FROM waitlist_outbox_i18n_backup;
DROP TABLE waitlist_i18n_backup;
DROP TABLE waitlist_outbox_i18n_backup;
CREATE TRIGGER waitlist_queue_signup_emails AFTER INSERT ON waitlist BEGIN
  INSERT INTO waitlist_email_outbox (id, email, kind) VALUES (lower(hex(randomblob(16))), NEW.email, 'confirmation');
  INSERT INTO waitlist_email_outbox (id, email, kind) VALUES (lower(hex(randomblob(16))), NEW.email, 'admin');
END;
