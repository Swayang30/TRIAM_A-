// Vercel Serverless Function — CommonJS
const nodemailer = require('nodemailer');
const { google } = require('googleapis');

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const {
      source = 'unknown',
      name, phone,
      email = '', city = '',
      message = '', product = '', page = ''
    } = req.body || {};

    if (!name || !String(name).trim()) {
      return res.status(400).json({ success: false, error: 'Name is required.' });
    }
    const cleanPhone = String(phone || '').replace(/\s/g, '');
    if (!cleanPhone || !/^\d{7,15}$/.test(cleanPhone)) {
      return res.status(400).json({ success: false, error: 'Valid phone number is required.' });
    }

    const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

    const leadData = {
      source:   String(source).trim(),
      name:     String(name).trim(),
      phone:    cleanPhone,
      email:    String(email).trim(),
      city:     String(city).trim(),
      message:  String(message).trim(),
      product:  String(product).trim(),
      page:     String(page).trim(),
      timestamp,
    };

    console.log(`[Lead] ${timestamp} | source: ${leadData.source} | name: ${leadData.name} | phone: ${leadData.phone}`);

    const [emailResult, sheetsResult] = await Promise.allSettled([
      sendLeadEmail(leadData),
      appendToSheet(leadData),
    ]);

    if (emailResult.status === 'rejected') {
      console.error('[Lead] Email error:', emailResult.reason?.message);
    } else {
      console.log('[Lead] Email sent successfully');
    }

    if (sheetsResult.status === 'rejected') {
      console.error('[Lead] Sheets error:', sheetsResult.reason?.message);
    } else {
      console.log('[Lead] Sheet row appended');
    }

    return res.status(200).json({
      success: true,
      message: 'Thank you! Our team will contact you shortly.',
    });

  } catch (err) {
    console.error('[Lead] Unexpected error:', err.message);
    return res.status(500).json({
      success: false,
      error: 'Submission failed. Please try again.',
    });
  }
};

async function sendLeadEmail(leadData) {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.SENDER_EMAIL,
      pass: process.env.SENDER_PASSWORD,
    },
  });

  const recipients = (process.env.CLIENT_EMAIL || '')
    .split(',')
    .map(e => e.trim())
    .filter(Boolean);

  await transporter.sendMail({
    from: `"TRIAM Website" <${process.env.SENDER_EMAIL}>`,
    to: recipients,
    subject: `🔔 New Lead — ${leadData.source} | TRIAM A+ Website`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;border:1px solid #e0e0e0;border-radius:8px;overflow:hidden">
        <div style="background:#1a1a2e;padding:24px 20px">
          <p style="color:#F47C20;margin:0;font-size:11px;letter-spacing:2px;text-transform:uppercase">TRIAM A+ TMT · NEW LEAD</p>
          <h2 style="margin:6px 0 0;color:#ffffff;font-size:20px">${leadData.source}</h2>
        </div>
        <table style="width:100%;border-collapse:collapse">
          <tr style="background:#f9f9f9"><td style="padding:12px 16px;font-weight:bold;width:35%;color:#555">Timestamp (IST)</td><td style="padding:12px 16px;color:#222">${leadData.timestamp}</td></tr>
          <tr><td style="padding:12px 16px;font-weight:bold;color:#555">Name</td><td style="padding:12px 16px;color:#222">${leadData.name}</td></tr>
          <tr style="background:#f9f9f9"><td style="padding:12px 16px;font-weight:bold;color:#555">Phone</td><td style="padding:12px 16px;color:#222"><strong>${leadData.phone}</strong></td></tr>
          <tr><td style="padding:12px 16px;font-weight:bold;color:#555">Email</td><td style="padding:12px 16px;color:#222">${leadData.email || '—'}</td></tr>
          <tr style="background:#f9f9f9"><td style="padding:12px 16px;font-weight:bold;color:#555">City</td><td style="padding:12px 16px;color:#222">${leadData.city || '—'}</td></tr>
          <tr><td style="padding:12px 16px;font-weight:bold;color:#555">Product</td><td style="padding:12px 16px;color:#222">${leadData.product || '—'}</td></tr>
          <tr style="background:#f9f9f9"><td style="padding:12px 16px;font-weight:bold;color:#555">Message</td><td style="padding:12px 16px;color:#222">${leadData.message || '—'}</td></tr>
          <tr><td style="padding:12px 16px;font-weight:bold;color:#555">Page URL</td><td style="padding:12px 16px;color:#222">${leadData.page || '—'}</td></tr>
        </table>
        <div style="background:#f5f5f5;padding:12px 16px;font-size:11px;color:#999">
          Automated notification from TRIAM A+ website — do not reply to this email.
        </div>
      </div>
    `,
  });
}

async function appendToSheet(leadData) {
  const credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON);

  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const sheets = google.sheets({ version: 'v4', auth });

  await sheets.spreadsheets.values.append({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range: 'TRIAM Leads!A:J',
    valueInputOption: 'USER_ENTERED',
    requestBody: {
      values: [[
        leadData.timestamp,
        leadData.source,
        leadData.name,
        leadData.phone,
        leadData.email,
        leadData.city,
        leadData.message,
        leadData.product,
        leadData.page,
        'vercel',
      ]],
    },
  });
}
