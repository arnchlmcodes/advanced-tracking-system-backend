/**
 * Simple in-memory rate limiter to prevent abuse.
 * Note: For distributed systems, use Redis or similar store.
 */
const rateLimit = (options) => {
    const windowMs = options.windowMs || 15 * 60 * 1000; // Default 15 minutes
    const max = options.max || 100; // Default 100 requests per window
    const message = options.message || { success: false, message: 'Too many requests, please try again later.' };

    const hits = new Map();

    // Cleanup interval
    setInterval(() => {
        const now = Date.now();
        for (const [ip, data] of hits.entries()) {
            if (now - data.startTime > windowMs) {
                hits.delete(ip);
            }
        }
    }, windowMs); // Run cleanup every windowMs

    return (req, res, next) => {
        const ip = req.ip || req.connection.remoteAddress;
        const now = Date.now();

        if (!hits.has(ip)) {
            hits.set(ip, { count: 1, startTime: now });
            return next();
        }

        const data = hits.get(ip);

        if (now - data.startTime > windowMs) {
            // Reset if window passed (though cleanup helper usually handles this, this is double safety)
            data.count = 1;
            data.startTime = now;
            hits.set(ip, data);
            return next();
        }

        if (data.count >= max) {
            return res.status(429).json(message);
        }

        data.count++;
        hits.set(ip, data);
        next();
    };
};

module.exports = rateLimit;
