const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SENDER_EMAIL,
    pass: process.env.SENDER_PASSWORD,
  },
});

const SOURCE_LABELS = {
  'contact':       'Contact Form',
  'floating-cta':  'Floating CTA',
  'onsite-advice': 'Onsite Advice Form',
  'price-inquiry': 'Price Inquiry Form',
};

function getIST() {
  return new Date().toLocaleString('en-IN', {
    timeZone:  'Asia/Kolkata',
    dateStyle: 'long',
    timeStyle: 'medium',
  });
}

function row(label, value) {
  if (!value) return '';
  return `
    <tr>
      <td style="padding:11px 16px;font-size:12px;font-weight:700;color:#666;white-space:nowrap;background:#f8f8f8;border-bottom:1px solid #eee;width:160px;">${label}</td>
      <td style="padding:11px 16px;font-size:13px;color:#1b2a3a;border-bottom:1px solid #eee;">${value}</td>
    </tr>`;
}

async function sendLeadEmail(data) {
  const { source, name, phone, email, city, message, product, page, ip } = data;
  const label = SOURCE_LABELS[source] || source || 'Unknown Form';

  const html = `
  <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;border:1px solid #ddd;border-radius:10px;overflow:hidden;">
    <div style="background:#1b2a3a;padding:28px 32px;">
      <div style="color:#e48915;font-size:10px;font-weight:700;letter-spacing:2.5px;text-transform:uppercase;margin-bottom:10px;">
        TRIAM A+ TMT &nbsp;·&nbsp; New Lead
      </div>
      <h2 style="color:#ffffff;margin:0;font-size:22px;font-weight:800;">${label}</h2>
    </div>

    <div style="padding:28px 32px 8px;">
      <table style="width:100%;border-collapse:collapse;border:1px solid #eee;border-radius:8px;overflow:hidden;">
        ${row('Timestamp (IST)', getIST())}
        ${row('Source Form',     label)}
        ${row('Name',            name)}
        ${row('Phone',           phone)}
        ${row('Email',           email)}
        ${row('City',            city)}
        ${row('Product',         product)}
        ${row('Message',         message)}
        ${row('Page URL',        page)}
        ${row('IP Address',      ip)}
      </table>
    </div>

    <div style="padding:20px 32px 28px;">
      <a href="tel:${phone}"
         style="display:inline-block;background:#e48915;color:#fff;padding:11px 24px;border-radius:6px;text-decoration:none;font-size:13px;font-weight:700;">
        Call ${name}
      </a>
    </div>

    <div style="padding:16px 32px;background:#f4f3ee;font-size:11px;color:#999;border-top:1px solid #eee;">
      Sent automatically from triamtmt.com &nbsp;·&nbsp; Do not reply to this email.
    </div>
  </div>`;

  await transporter.sendMail({
    from:    `"TRIAM Website" <${process.env.SENDER_EMAIL}>`,
    to:      process.env.CLIENT_EMAIL,
    subject: `New Lead from TRIAM Website — ${label}`,
    html,
  });
}

module.exports = { sendLeadEmail };
