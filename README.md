# ResumeAI 🚀
### AI Resume Builder — Powered by Google Gemini (100% Free to Run)

Users fill in their details → get a professional resume, cover letter & ATS score instantly.
No API key shown to users. No credit card needed to start.

---

## 📁 Project Structure

```
resume-builder/
├── frontend/
│   └── index.html        ← The website (host FREE on GitHub Pages)
└── server/
    ├── server.js          ← Backend (deploy FREE on Render)
    ├── package.json
    ├── .env.example       ← Copy to .env, never commit .env!
    └── .gitignore
```

---

## ✅ WHY GEMINI? (Important to understand)

| | Google Gemini | Claude / OpenAI |
|---|---|---|
| Free tier | ✅ YES — forever | ❌ Trial credits only (~$5, expires) |
| Credit card needed | ❌ No | ✅ Yes |
| Daily free requests | 1,000/day (Flash-Lite) | Stops after trial |
| Quality | Very good | Excellent |

**Conclusion:** Gemini is genuinely free. Perfect for starting with zero budget.

---

## 🛠️ STEP-BY-STEP SETUP

---

### STEP 1 — Get Your Free Gemini API Key (5 minutes)

1. Go to **https://aistudio.google.com**
2. Sign in with your Google account (Gmail)
3. Click **"Get API Key"** in the left sidebar
4. Click **"Create API Key"**
5. Copy the key — it looks like: `AIzaSyXXXXXXXXXXXXXXXXXXXX`
6. Save it somewhere safe (like Notepad)

✅ No credit card. No payment. Done.

---

### STEP 2 — Upload Your Project to GitHub (10 minutes)

1. Go to **https://github.com** → Sign up free
2. Click **"New repository"**
3. Name it: `resume-builder`
4. Set to **Public** → Click **"Create repository"**
5. Upload all your project files:
   - Drag and drop the `frontend/` and `server/` folders
   - Click **"Commit changes"**

---

### STEP 3 — Deploy Backend on Render (15 minutes)

Render hosts your server for FREE.

1. Go to **https://render.com** → Sign up with GitHub
2. Click **"New +"** → **"Web Service"**
3. Click **"Connect"** next to your `resume-builder` repo
4. Fill in settings:
   - **Name:** `resumeai-server`
   - **Root Directory:** `server`
   - **Build Command:** `npm install`
   - **Start Command:** `node server.js`
   - **Instance Type:** Free
5. Click **"Environment"** tab → **"Add Environment Variable"**:
   - Key: `GEMINI_API_KEY`
   - Value: paste your key from Step 1
6. Click **"Create Web Service"**
7. Wait 2-3 minutes → Render gives you a URL like:
   `https://resumeai-server.onrender.com`

⚠️ **Copy this URL — you need it in Step 4!**

---

### STEP 4 — Connect Frontend to Your Backend (2 minutes)

Open `frontend/index.html` in any text editor (Notepad works).

Find this line near the bottom of the file:
```
const API = 'http://localhost:3001';
```

Change it to your Render URL from Step 3:
```
const API = 'https://resumeai-server.onrender.com';
```

Save the file and re-upload it to GitHub.

---

### STEP 5 — Enable GitHub Pages (5 minutes)

1. Go to your GitHub repo → **Settings**
2. Scroll down to **"Pages"**
3. Under Source: select **"Deploy from a branch"**
4. Branch: **main** | Folder: **/frontend**
5. Click **Save**
6. Wait 1-2 minutes → your site is live at:
   `https://yourusername.github.io/resume-builder`

---

### STEP 6 — Test It! 🎉

1. Open your GitHub Pages URL
2. Fill in a name and role
3. Click Generate
4. Resume appears in ~5 seconds — no API key asked from user!

---

## 💰 Free Tier Limits (What You Get)

| Model | Free Requests/Day | Good For |
|-------|------------------|---------|
| Gemini 2.5 Flash-Lite | **1,000/day** | ✅ Perfect for starting out |
| Gemini 2.5 Flash | 250/day | Better quality |
| Gemini 2.5 Pro | 100/day | Best quality |

1,000 resumes/day = more than enough for your first 6 months of growth.

---

## 💸 Monetization Plan

### Free Plan (default for users)
- 5 resumes per hour (your rate limit)
- Resume + Cover Letter + ATS Score + Tips

### Pro Plan — ₹99/month (add Razorpay later)
- Unlimited resumes
- Multiple templates
- PDF download
- LinkedIn bio generator

---

## 🚀 How to Get First Users (Free)

1. **Reddit:** Post in r/india, r/jobs, r/resumes, r/indianstudents
   - "I built a free AI resume tool — try it, feedback welcome!"
2. **WhatsApp/Telegram:** Share in college and professional groups
3. **LinkedIn:** Post about what you built — developers get lots of engagement
4. **Product Hunt:** Launch after you hit 50+ users

---

## 🔧 Common Issues & Fixes

**"Failed to fetch" error on website:**
→ Your `const API = '...'` URL in index.html is wrong. Check Step 4.

**Server not starting on Render:**
→ Go to Render dashboard → your service → Logs tab → read the error
→ Usually means `GEMINI_API_KEY` env variable is missing

**429 error (too many requests):**
→ You've hit Gemini's free daily limit (1,000/day). Resets at midnight Pacific Time.
→ Switch to `gemini-2.5-flash-lite` model in server.js for higher limits.

**Render server "spins down" after 15 mins of inactivity:**
→ Free Render servers sleep when idle. First request after sleep takes ~30 seconds.
→ Solution: Use a free service like UptimeRobot to ping your server every 10 mins.

---

## 📈 Next Features to Build (in this order)

1. ✅ Basic resume generator (done!)
2. ⬜ PDF download button (use jsPDF library)
3. ⬜ Email capture (use Mailchimp free tier)
4. ⬜ User accounts (use Firebase free tier)
5. ⬜ Razorpay Pro subscription
6. ⬜ Multiple resume templates
