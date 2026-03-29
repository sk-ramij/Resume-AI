const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: process.env.FRONTEND_URL || '*' }));
app.use(express.json());

// Simple in-memory rate limiter (5 resumes/hour per IP for free users)
const requestCounts = new Map();
const RATE_LIMIT = 5;
const RATE_WINDOW = 60 * 60 * 1000;

function rateLimit(req, res, next) {
  const ip = req.ip || req.headers['x-forwarded-for'] || 'unknown';
  const now = Date.now();
  const entry = requestCounts.get(ip) || { count: 0, resetAt: now + RATE_WINDOW };
  if (now > entry.resetAt) { entry.count = 0; entry.resetAt = now + RATE_WINDOW; }
  if (entry.count >= RATE_LIMIT) {
    return res.status(429).json({
      error: 'Free plan limit reached (5/hour). Upgrade to Pro for unlimited resumes!'
    });
  }
  entry.count++;
  requestCounts.set(ip, entry);
  next();
}

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'ResumeAI server running ✅' });
});

// Generate resume
app.post('/api/generate', rateLimit, async (req, res) => {
  const { name, role, email, phone, links, experience, education, skills, projects, jobDesc } = req.body;

  if (!name || !role) {
    return res.status(400).json({ error: 'Name and target role are required.' });
  }

  const prompt = `You are an expert resume writer with 15+ years of experience helping people land jobs at top companies.

Create a professional resume and cover letter for:

Name: ${name}
Target Role: ${role}
Email: ${email || 'not provided'}
Phone: ${phone || 'not provided'}
Links/Portfolio: ${links || 'not provided'}
Work Experience: ${experience || 'fresher / not provided'}
Education: ${education || 'not provided'}
Skills: ${skills || 'not provided'}
Projects: ${projects || 'none'}
Job Description / Target: ${jobDesc || 'not provided'}

Return ONLY a valid JSON object. No markdown, no backticks, no explanation. Just raw JSON:
{
  "resume": "complete resume as plain text with clear section headers",
  "coverLetter": "professional 3-paragraph cover letter as plain text",
  "atsScore": 78,
  "tips": ["tip 1", "tip 2", "tip 3", "tip 4", "tip 5"]
}

Resume rules:
- Sections: CONTACT INFO, PROFESSIONAL SUMMARY, EXPERIENCE, EDUCATION, SKILLS, PROJECTS
- ATS-friendly, no tables or columns in the text
- Strong action verbs, quantify achievements where possible
- Match keywords to job description if provided
- If fresher: focus on education, projects, skills, internships

Cover letter: 3 paragraphs, confident and professional.
atsScore: integer 55-95, realistic based on how complete the info is.
tips: 5 specific, actionable tips for THIS person's resume.`;

  try {
    // Call Google Gemini API
    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite-preview-06-17:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 2500,
          }
        })
      }
    );

    if (!geminiRes.ok) {
      const errData = await geminiRes.json();
      console.error('Gemini API error:', errData);
      if (geminiRes.status === 429) {
        return res.status(503).json({ error: 'AI service is busy. Please try again in a moment.' });
      }
      throw new Error('Gemini API request failed');
    }

    const geminiData = await geminiRes.json();
    const rawText = geminiData.candidates?.[0]?.content?.parts?.[0]?.text || '';

    let parsed;
    try {
      const clean = rawText.replace(/```json|```/g, '').trim();
      parsed = JSON.parse(clean);
    } catch (e) {
      console.error('JSON parse error:', e.message);
      return res.status(500).json({ error: 'AI returned unexpected format. Please try again.' });
    }

    res.json(parsed);

  } catch (err) {
    console.error('Server error:', err.message);
    res.status(500).json({ error: 'Something went wrong. Please try again in a moment.' });
  }
});

app.listen(PORT, () => {
  console.log(`✅ ResumeAI server running on port ${PORT}`);
});
