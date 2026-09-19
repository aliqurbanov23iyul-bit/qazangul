# Database collections

- users: staff/admin identities and capabilities
- students: name, classId, active, profile
- classes: grade, section, homeroomTeacherId
- subjects
- teacherAssignments: teacherId + classId + subjectId + capabilities
- accessCodes: studentId + codeHash + active + createdAt + rotatedAt (plaintext code is never stored)
- sessions: subjectId + role + expiresAt + revokedAt
- channels: classId + type + subjectId?
- messages: channelId + authorId + body + createdAt
- grades: studentId + classId + subjectId + teacherId + value
- attendance: studentId + classId + subjectId + date + status
- assignments
- submissions
- announcements
- siteContent
- auditLogs

Authorization rule: class membership and teacherAssignments are authoritative; hiding UI is never treated as authorization.
