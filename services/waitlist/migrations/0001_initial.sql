CREATE TABLE IF NOT EXISTS waitlist (
  email TEXT PRIMARY KEY,
  language TEXT NOT NULL CHECK (language IN ('pt', 'en')),
  role TEXT NOT NULL CHECK (role IN ('owner', 'manager', 'other')),
  consent_version TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS waitlist_created_at ON waitlist(created_at);
