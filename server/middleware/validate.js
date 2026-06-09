function validate(req, res, next) {
  const { name, phone } = req.body;

  if (!name || !String(name).trim()) {
    return res.status(400).json({ success: false, error: 'Name and phone are required.' });
  }
  if (!phone || !String(phone).trim()) {
    return res.status(400).json({ success: false, error: 'Name and phone are required.' });
  }

  const digitsOnly = String(phone).replace(/\D/g, '');
  if (digitsOnly.length < 7 || digitsOnly.length > 15) {
    return res.status(400).json({ success: false, error: 'Please provide a valid phone number.' });
  }

  // Trim all string fields to prevent whitespace-only entries
  const stringFields = ['source', 'name', 'phone', 'email', 'city', 'message', 'product', 'page'];
  stringFields.forEach((field) => {
    if (req.body[field]) req.body[field] = String(req.body[field]).trim();
  });

  next();
}

module.exports = validate;
