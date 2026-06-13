// Vercel Serverless Function — health check
module.exports = function handler(req, res) {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    platform: 'vercel',
  });
};
