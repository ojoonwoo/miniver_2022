const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/api',
        createProxyMiddleware({
            // target: 'https://localhost:4000',
            target: process.env.API_URL,
            changeOrigin: true,
        })
    );
    app.use(
        '/works',
        createProxyMiddleware({
            // target: 'https://localhost:4000',
            target: process.env.API_URL,
            changeOrigin: true,
        })
    );
    app.use(
        '/journalists',
        createProxyMiddleware({
            // target: 'https://localhost:4000',
            target: process.env.API_URL,
            changeOrigin: true,
        })
    );
    app.use(
        '/postings',
        createProxyMiddleware({
            // target: 'https://localhost:4000',
            target: process.env.API_URL,
            changeOrigin: true,
        })
    );
};