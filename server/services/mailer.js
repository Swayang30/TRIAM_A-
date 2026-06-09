async function sendLeadEmail(leadData) {
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from: 'TRIAM Website <onboarding@resend.dev>',
      to: [process.env.CLIENT_EMAIL],
      subject: `New Lead from TRIAM Website — ${leadData.source}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">
          <div style="background:#1a1a2e;padding:20px;color:white">
            <p style="color:#f5a623;margin:0;font-size:12px">TRIAM A+ TMT · NEW LEAD</p>
            <h2 style="margin:5px 0;color:white">${leadData.source}</h2>
          </div>
          <table style="width:100%;border-collapse:collapse">
            <tr><td style="padding:10px;border-bottom:1px solid #eee;font-weight:bold">Timestamp (IST)</td><td style="padding:10px;border-bottom:1px solid #eee">${leadData.timestamp}</td></tr>
            <tr><td style="padding:10px;border-bottom:1px solid #eee;font-weight:bold">Name</td><td style="padding:10px;border-bottom:1px solid #eee">${leadData.name}</td></tr>
            <tr><td style="padding:10px;border-bottom:1px solid #eee;font-weight:bold">Phone</td><td style="padding:10px;border-bottom:1px solid #eee">${leadData.phone}</td></tr>
            <tr><td style="padding:10px;border-bottom:1px solid #eee;font-weight:bold">Email</td><td style="padding:10px;border-bottom:1px solid #eee">${leadData.email || '—'}</td></tr>
            <tr><td style="padding:10px;border-bottom:1px solid #eee;font-weight:bold">City</td><td style="padding:10px;border-bottom:1px solid #eee">${leadData.city || '—'}</td></tr>
            <tr><td style="padding:10px;border-bottom:1px solid #eee;font-weight:bold">Message</td><td style="padding:10px;border-bottom:1px solid #eee">${leadData.message || '—'}</td></tr>
            <tr><td style="padding:10px;border-bottom:1px solid #eee;font-weight:bold">Page</td><td style="padding:10px;border-bottom:1px solid #eee">${leadData.page || '—'}</td></tr>
          </table>
          <p style="color:#999;font-size:11px;padding:10px">Automated notification from TRIAM A+ website</p>
        </div>
      `
    })
  });

  const result = await response.json();
  if (!response.ok) {
    throw new Error(`Resend API error: ${JSON.stringify(result)}`);
  }
  console.log('✅ Email sent via Resend API:', result.id);
  return result;
}

module.exports = { sendLeadEmail };
