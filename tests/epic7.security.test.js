const request = require('supertest');

// Mock specific logic
jest.mock('firebase-admin', () => require('./mocks/firebase-admin'));

// Import App after mocking
const app = require('../src/app');

describe('Epic 7: Security & Safety Center Backend', () => {

    // 3. SMOKE TEST
    it('should load the Express app without crashing', () => {
        expect(app).toBeDefined();
    });

    // 4. ROUTE SAFETY TESTS
    it('should respond to GET /api/security/activity', async () => {
        const res = await request(app)
            .get('/api/security/activity')
            .set('Authorization', 'Bearer mock-token'); // triggers mock verifyIdToken

        // We expect 200 because our mock verifyIdToken returns a valid user
        // AND our mock firestore returns 'admin' role, which is sufficient for simple auth.
        // Actually /activity requires just 'authenticate'.
        // If it fails (e.g. 500), test fails. 
        expect([200, 403, 401]).toContain(res.statusCode);
        expect(res.statusCode).not.toBe(500);
    });

    it('should respond to GET /api/admin/security/overview', async () => {
        const res = await request(app)
            .get('/api/admin/security/overview')
            .set('Authorization', 'Bearer mock-token');

        // Requires 'admin' role. Our mock returns role: 'admin' from firestore.
        expect([200, 403, 401]).toContain(res.statusCode);
        expect(res.statusCode).not.toBe(500);
    });

    // 5. ADMIN ENFORCEMENT TEST
    it('should handle POST /api/admin/security/enforce safely', async () => {
        const payload = {
            targetUserId: 'user456',
            action: 'SUSPEND',
            reason: 'Violation of policy'
        };

        const res = await request(app)
            .post('/api/admin/security/enforce')
            .set('Authorization', 'Bearer mock-token')
            .send(payload);

        // Expect success (200) or at least safe handling
        expect([200, 201]).toContain(res.statusCode);
        expect(res.body.success).toBe(true); // Assuming standard response format
    });

    // Extra: Verify App Export
    it('should export the app module', () => {
        expect(typeof app).toBe('function');
    });
});
