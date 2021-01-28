module.exports = {
    production: { port: 80 },
    development: {
        port: process.env.PORT || 5000
    }
};