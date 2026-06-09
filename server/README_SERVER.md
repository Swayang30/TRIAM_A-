# Triam TMT — API Server

Express.js backend for receiving form leads, sending email notifications, and logging to Google Sheets.

---

## Local Setup

```bash
cd server
cp .env.example .env      # fill in all values
npm install
npm run dev               # nodemon hot-reload
```

Health check: `GET http://localhost:3001/health`

---

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `PORT` | No (default 3001) | Server port |
| `CLIENT_EMAIL` | Yes | Email address that receives lead notifications |
| `SENDER_EMAIL` | Yes | Gmail address used to send emails |
| `SENDER_PASSWORD` | Yes | Gmail **App Password** (not account password) |
| `GOOGLE_SHEET_ID` | Yes | ID from the Google Sheet URL |
| `GOOGLE_SERVICE_ACCOUNT_JSON` | Yes | Full service account JSON as a single-line string |
| `ALLOWED_ORIGIN` | Yes | Production frontend URL (e.g. `https://www.triamtmt.com`) |

### Gmail App Password
1. Enable 2-Step Verification on the sending Gmail account
2. Go to **Google Account → Security → App Passwords**
3. Create a new app password (any name)
4. Use the 16-character password as `SENDER_PASSWORD`

### Google Sheets Setup
1. Create a Google Sheet
2. Rename the first tab to **TRIAM Leads**
3. Add these headers in row 1: `Timestamp | Source | Name | Phone | Email | City | Message | Product | Page | IP`
4. Copy the Sheet ID from the URL: `https://docs.google.com/spreadsheets/d/**SHEET_ID**/edit`
5. Create a service account in Google Cloud Console:
   - IAM & Admin → Service Accounts → Create
   - Download the JSON key
   - Share the Google Sheet with the service account email (Editor role)
6. Paste the full JSON (on one line) as `GOOGLE_SERVICE_ACCOUNT_JSON`

---

## API Reference

### POST `/api/leads`

```json
{
  "source":  "contact",
  "name":    "Ramesh Kumar",
  "phone":   "9876543210",
  "email":   "ramesh@example.com",
  "city":    "Kolkata",
  "message": "Looking for 16mm bars, 200 pieces",
  "product": "Fe 550D · 16mm–20mm",
  "page":    "/Fe-550D-Grade-TMT-16mm-20mm"
}
```

**Responses:**
- `200` → `{ "success": true, "message": "Thank you! We'll contact you shortly." }`
- `400` → `{ "success": false, "error": "Name and phone are required." }`
- `429` → Rate limit exceeded (10 requests / 15 min / IP)
- `500` → Server error

### GET `/health`
Returns `{ "status": "ok", "timestamp": "..." }`

---

## Deployment

### Railway
```bash
# From the /server directory
railway init
railway up
# Set all env vars in the Railway dashboard
```

### Render
1. New → Web Service → connect repo
2. Root directory: `server`
3. Build command: `npm install`
4. Start command: `npm start`
5. Add all env vars in the Environment tab

### VPS (Ubuntu)
```bash
cd server
npm install --production
npm install -g pm2
pm2 start index.js --name triam-server
pm2 save && pm2 startup
```

### Frontend `.env` (root of triam-tmt-react)
```
# Development
VITE_API_URL=http://localhost:3001

# Production (after deploying the server)
VITE_API_URL=https://your-api.railway.app
```

---

## Rate Limiting
- 10 requests per 15 minutes per IP address
- Applied to all `/api/*` routes
- Returns HTTP 429 with a JSON error message on breach
