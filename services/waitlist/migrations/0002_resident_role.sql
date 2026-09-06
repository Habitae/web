-- Rebuild the CHECK constraint while preserving all signup and consent data.
CREATE TABLE waitlist_with_residents (
  email TEXT PRIMARY KEY,
  language TEXT NOT NULL CHECK (language IN ('pt', 'en')),
  role TEXT NOT NULL CHECK (role IN ('owner', 'resident', 'manager', 'other')),
  consent_version TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO waitlist_with_residents (email, language, role, consent_version, created_at)
SELECT email, language, role, consent_version, created_at FROM waitlist;
DROP TABLE waitlist;
ALTER TABLE waitlist_with_residents RENAME TO waitlist;
CREATE INDEX waitlist_created_at ON waitlist(created_at);
