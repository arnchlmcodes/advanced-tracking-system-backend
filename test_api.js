const http = require('http');

const data = JSON.stringify({
    title: 'Test Item from Node',
    type: 'lost',
    location: 'Library',
    description: 'test'
});

const options = {
    hostname: 'localhost',
    port: 5000,
    path: '/api/items',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
    }
};

const req = http.request(options, (res) => {
    let responseBody = '';
    res.on('data', (chunk) => {
        responseBody += chunk;
    });
    res.on('end', () => {
        console.log('Status Code:', res.statusCode);
        console.log('Response Body:', responseBody);
    });
});

req.on('error', (error) => {
    console.error('Error:', error);
});

req.write(data);
req.end();
