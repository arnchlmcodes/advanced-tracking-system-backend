const { spawn } = require('child_process');
const http = require('http');

const PORT = 5000;
const BASE_URL = `http://localhost:${PORT}`;

let serverProcess;
let createdItemId;
let createdClaimId;

// Colors for output
const GREEN = '\x1b[32m';
const RED = '\x1b[31m';
const RESET = '\x1b[0m';

const log = (msg, color = RESET) => console.log(`${color}${msg}${RESET}`);

const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const startServer = () => {
    return new Promise((resolve, reject) => {
        log('🚀 Starting server...');
        serverProcess = spawn('node', ['src/server.js'], {
            env: { ...process.env, NODE_ENV: 'development', PORT: PORT },
            stdio: 'pipe' // Pipe stdio to see output
        });

        serverProcess.stdout.on('data', (data) => {
            const output = data.toString();
            process.stdout.write(output); // Uncommented to see server logs
            if (output.includes('Server running') || output.includes('Initialized')) {
                resolve();
            }
        });

        serverProcess.stderr.on('data', (data) => {
            // console.error(`Server Error: ${data}`);
            if (data.toString().includes('EADDRINUSE')) {
                resolve(); // Assume already running
            }
        });

        // Timeout fallback
        setTimeout(() => resolve(), 5000);
    });
};

const stopServer = () => {
    if (serverProcess) {
        log('🛑 Stopping server...');
        serverProcess.kill();
    }
};

const request = async (method, endpoint, body = null) => {
    const headers = { 'Content-Type': 'application/json' };
    const options = {
        method,
        headers,
    };
    if (body) options.body = JSON.stringify(body);

    try {
        const res = await fetch(`${BASE_URL}${endpoint}`, options);
        const data = await res.json().catch(() => ({}));
        if (res.status >= 400) {
            console.log(`Debug Error (${endpoint}):`, JSON.stringify(data));
        }
        return { status: res.status, data };
    } catch (err) {
        return { error: err.message };
    }
};

const runTests = async () => {
    await startServer();
    await wait(2000); // Give it a sec to settle

    log('\n🧪 Starting API Tests...\n');

    // 1. Health Check
    try {
        const res = await fetch(`${BASE_URL}/`);
        const text = await res.text();
        if (res.status === 200) log(`✅ [PASS] GET / (Health): ${text}`, GREEN);
        else log(`❌ [FAIL] GET /: ${res.status}`, RED);
    } catch (e) {
        log(`❌ [FAIL] GET /: Connection failed - ${e.message}`, RED);
        stopServer();
        process.exit(1);
    }

    // 2. User Profile (Auth Bypass)
    const profile = await request('GET', '/api/users/profile');
    if (profile.status === 200) log(`✅ [PASS] GET /api/users/profile (Auth Bypass)`, GREEN);
    else log(`❌ [FAIL] GET /api/users/profile: ${profile.status} ${JSON.stringify(profile.data)}`, RED);

    // 3. Create Item
    const newItem = {
        title: "Test Laptop " + Date.now(),
        type: "lost",
        location: "Library",
        description: "Integration test item"
    };
    const itemRes = await request('POST', '/api/items', newItem);
    if (itemRes.status === 201) {
        log(`✅ [PASS] POST /api/items`, GREEN);
        createdItemId = itemRes.data.data.id;
    } else {
        log(`❌ [FAIL] POST /api/items: ${itemRes.status} ${JSON.stringify(itemRes.data)}`, RED);
    }

    // 4. Get Items
    const itemsRes = await request('GET', '/api/items');
    if (itemsRes.status === 200 && Array.isArray(itemsRes.data.data)) {
        log(`✅ [PASS] GET /api/items (Found ${itemsRes.data.data.length} items)`, GREEN);
    } else {
        log(`❌ [FAIL] GET /api/items: ${itemsRes.status}`, RED);
    }

    // 5. Create Claim
    if (createdItemId) {
        const claimRes = await request('POST', '/api/claims', { itemId: createdItemId });
        if (claimRes.status === 201) {
            log(`✅ [PASS] POST /api/claims`, GREEN);
            createdClaimId = claimRes.data.data.id;
        } else if (claimRes.status === 400 && claimRes.data.message.includes('Duplicate')) {
            log(`⚠️ [WARN] POST /api/claims: Duplicate claim (Test ran twice?)`, GREEN);
        } else {
            log(`❌ [FAIL] POST /api/claims: ${claimRes.status} ${JSON.stringify(claimRes.data)}`, RED);
        }
    } else {
        log(`⚠️ [SKIP] POST /api/claims (No item created)`, RED);
    }

    // 6. My Claims
    const myClaims = await request('GET', '/api/claims/my');
    if (myClaims.status === 200) log(`✅ [PASS] GET /api/claims/my`, GREEN);
    else log(`❌ [FAIL] GET /api/claims/my: ${myClaims.status}`, RED);

    // 7. Admin Pending Claims
    const adminClaims = await request('GET', '/api/admin/claims/pending');
    if (adminClaims.status === 200) log(`✅ [PASS] GET /api/admin/claims/pending`, GREEN);
    else log(`❌ [FAIL] GET /api/admin/claims/pending: ${adminClaims.status}`, RED);

    // 8. Admin Analytics
    const analytics = await request('GET', '/api/admin/analytics');
    if (analytics.status === 200) log(`✅ [PASS] GET /api/admin/analytics`, GREEN);
    else log(`❌ [FAIL] GET /api/admin/analytics: ${analytics.status}`, RED);

    log('\n🏁 Tests Completed.');
    stopServer();
    process.exit(0);
};

runTests().catch(e => {
    console.error(e);
    stopServer();
});
