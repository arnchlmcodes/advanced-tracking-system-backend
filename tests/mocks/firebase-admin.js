const mockFirestore = {
    collection: jest.fn().mockReturnThis(),
    doc: jest.fn().mockReturnThis(),
    get: jest.fn().mockResolvedValue({
        exists: true,
        data: () => ({ role: 'admin', status: 'active' }), // Default admin user
        forEach: (cb) => { },
        size: 5
    }),
    add: jest.fn().mockResolvedValue({ id: 'mock-doc-id' }),
    set: jest.fn().mockResolvedValue(true),
    update: jest.fn().mockResolvedValue(true),
    where: jest.fn().mockReturnThis(),
    orderBy: jest.fn().mockReturnThis(),
    limit: jest.fn().mockReturnThis(),
};

const mockAuth = {
    verifyIdToken: jest.fn().mockResolvedValue({ uid: 'testUser123', email: 'test@example.com' }),
    getUser: jest.fn().mockResolvedValue({ uid: 'testUser123', email: 'test@example.com' }),
};

const mockAdmin = {
    apps: [],
    // Add mock app to prevent initialization loop if check fails
    initializeApp: jest.fn(),
    credential: {
        cert: jest.fn(),
    },
    firestore: () => mockFirestore,
    auth: () => mockAuth,
};

mockAdmin.firestore.FieldValue = {
    serverTimestamp: () => 'MOCK_TIMESTAMP',
};

module.exports = mockAdmin;
