import assert from 'node:assert/strict';
import { test } from 'node:test';
import { CONSENT_VERSION, CONSENT_DURATION_MS, parseConsent } from '../src/consent.ts';

test('analytics consent is separate and old language-only decisions cannot enable it', () => {
  const now = Date.now();
  const choice = { version: CONSENT_VERSION, preferences: true, analytics: false, updatedAt: now, expiresAt: now + CONSENT_DURATION_MS };
  assert.equal(parseConsent(JSON.stringify(choice), now).analytics, false);
  assert.equal(parseConsent(JSON.stringify({ ...choice, version: 1 }), now), null);
  const { analytics, ...legacy } = choice;
  assert.equal(parseConsent(JSON.stringify(legacy), now), null);
  assert.equal(parseConsent(JSON.stringify({ ...choice, analytics: 'true' }), now), null);
  assert.equal(parseConsent(JSON.stringify(choice), now + CONSENT_DURATION_MS), null);
});
