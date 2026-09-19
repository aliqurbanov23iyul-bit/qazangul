# Security model

Student codes are high-entropy random secrets generated server-side. Codes must not encode grade, class, student number, or sequence. Store only a keyed hash/HMAC of the normalized code. Login is server-side, rate-limited, and returns a secure HttpOnly/SameSite cookie. Failed attempts are logged without storing the attempted plaintext secret. Codes can be rotated/revoked by authorized staff.

Permissions: Super Admin -> all; Homeroom Teacher -> roster/code management for assigned class; Subject Teacher -> only assigned class+subject capabilities; Student -> only self + own class resources. Every API route re-checks permissions server-side.
