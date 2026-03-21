# The Market Mentor — Deployment Guide

## What's in this folder

```
market-mentor/
├── public/
│   └── index.html        ← Your website (all HTML, CSS, JS)
├── api/
│   └── chat.js           ← Serverless function (keeps your API key secret)
├── vercel.json           ← Vercel routing config
└── README.md             ← This file
```

---

## How to deploy to Vercel (free, takes ~5 minutes)

### Step 1 — Create a free Vercel account
Go to **https://vercel.com** and sign up (free tier is fine).

### Step 2 — Get your Anthropic API key
Go to **https://console.anthropic.com** → API Keys → Create new key.
Copy it somewhere safe — you'll need it in Step 4.

### Step 3 — Deploy the project
There are two ways:

**Option A — Drag and drop (easiest)**
1. In the Vercel dashboard, click **"Add New Project"**
2. Click **"Deploy from your computer"** or drag this entire `market-mentor` folder onto the page
3. Vercel will detect the structure automatically

**Option B — Via GitHub (recommended for updates)**
1. Upload this folder to a GitHub repository
2. In Vercel, click **"Add New Project"** → **"Import Git Repository"**
3. Select your repo and click Deploy

### Step 4 — Add your API key
1. In Vercel, go to your project → **Settings** → **Environment Variables**
2. Add a new variable:
   - **Name:** `ANTHROPIC_API_KEY`
   - **Value:** (paste your key from Step 2)
3. Click Save

### Step 5 — Redeploy
After adding the environment variable, go to **Deployments** → click the three dots on the latest deployment → **Redeploy**.

Your site is now live at `https://your-project-name.vercel.app` 🎉

---

## How it works (the security part)

```
User types a message
        ↓
Browser sends request to /api/chat  (YOUR server)
        ↓
Vercel serverless function adds the secret API key
        ↓
Anthropic API responds with the mentor's reply
        ↓
Reply is sent back to the browser
```

Your API key **never touches the browser** — it lives only on Vercel's servers.

---

## Making changes

- Edit `public/index.html` to change the website design or content
- Edit `api/chat.js` to change the mentor's personality or system prompt
- Push changes to GitHub (or re-upload to Vercel) and it redeploys automatically

---

## Costs

- **Vercel hosting:** Free (Hobby tier handles millions of requests/month)
- **Anthropic API:** Pay per use (~$0.003 per conversation message with Claude Sonnet)
  - A typical 10-message conversation costs roughly $0.03
  - You can set spending limits at console.anthropic.com
