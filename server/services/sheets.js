const { google } = require('googleapis');

function buildAuth() {
  const raw = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  if (!raw) throw new Error('GOOGLE_SERVICE_ACCOUNT_JSON env var is not set');
  const credentials = JSON.parse(raw);
  return new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
}

function getIST() {
  return new Date().toLocaleString('en-IN', {
    timeZone:  'Asia/Kolkata',
    dateStyle: 'short',
    timeStyle: 'medium',
  });
}

async function appendLeadRow(data) {
  const { source, name, phone, email, city, message, product, page, ip } = data;

  const auth   = buildAuth();
  const sheets = google.sheets({ version: 'v4', auth });

  await sheets.spreadsheets.values.append({
    spreadsheetId:    process.env.GOOGLE_SHEET_ID,
    range:            'TRIAM Leads!A:J',
    valueInputOption: 'USER_ENTERED',
    requestBody: {
      values: [[
        getIST(),
        source   || '',
        name     || '',
        phone    || '',
        email    || '',
        city     || '',
        message  || '',
        product  || '',
        page     || '',
        ip       || '',
      ]],
    },
  });
}

module.exports = { appendLeadRow };
