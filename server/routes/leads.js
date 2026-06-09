const express        = require('express');
const router         = express.Router();
const validate       = require('../middleware/validate');
const { sendLeadEmail } = require('../services/mailer');
const { appendLeadRow } = require('../services/sheets');

router.post('/', validate, async (req, res) => {
  const ip = (
    req.headers['x-forwarded-for']?.split(',')[0]?.trim() ||
    req.socket?.remoteAddress ||
    ''
  );

  const payload = { ...req.body, ip };

  console.log(
    `[${new Date().toISOString()}] Lead — source: ${payload.source || 'unknown'} | name: ${payload.name} | phone: ${payload.phone}`
  );

  try {
    const [emailResult, sheetResult] = await Promise.allSettled([
      sendLeadEmail(payload),
      appendLeadRow(payload),
    ]);

    if (emailResult.status === 'rejected') {
      console.error('[Lead] Email error:', emailResult.reason?.message);
    }
    if (sheetResult.status === 'rejected') {
      console.error('[Lead] Sheets error:', sheetResult.reason?.message);
    }

    res.json({ success: true, message: "Thank you! We'll contact you shortly." });
  } catch (err) {
    console.error('[Lead] Unexpected error:', err.message);
    res.status(500).json({ success: false, error: 'Submission failed. Please try again.' });
  }
});

module.exports = router;
