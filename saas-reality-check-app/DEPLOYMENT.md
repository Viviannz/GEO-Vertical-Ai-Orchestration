# Deployment Guide - SaaS Reality Check App

## 🌐 Recommended Setup

Deploy **two separate sites** on Netlify:

1. **Landing Page** (Marketing/Sales) → `saasrealitycheck.com`
2. **Web App** (Product) → `app.saasrealitycheck.com`

---

## 📦 Deploy the App to Netlify

### Option 1: GitHub Integration (Recommended)

1. **Push to GitHub** (if not already done):
   \`\`\`bash
   cd saas-reality-check-app
   git remote add origin https://github.com/YOUR-USERNAME/saas-reality-check.git
   git push -u origin main
   \`\`\`

2. **Connect to Netlify**:
   - Go to [app.netlify.com](https://app.netlify.com/)
   - Click "Add new site" → "Import from Git"
   - Connect GitHub and select your repo

3. **Configure Build Settings**:
   - **Base directory**: `saas-reality-check-app`
   - **Build command**: `npm run build`
   - **Publish directory**: `.next`

4. **Deploy!**
   - Netlify will auto-detect Next.js and install the plugin
   - Your site will be live at `random-name.netlify.app`

### Option 2: Netlify CLI

\`\`\`bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
cd saas-reality-check-app
netlify init
netlify deploy --prod
\`\`\`

### Option 3: Drag & Drop

1. Build locally:
   \`\`\`bash
   npm run build
   \`\`\`

2. Zip the `.next` folder

3. Drag to Netlify deploy zone

---

## 🎨 Deploy the Landing Page

### Super Easy: Drag & Drop

1. Go to [app.netlify.com](https://app.netlify.com/)
2. Drag the `saas-reality-check-landing` folder
3. Done!

### Or Use GitHub

1. Same as above, but set:
   - **Base directory**: `saas-reality-check-landing`
   - **Publish directory**: `.` (root)

---

## 🌍 Custom Domain Setup

### For Main Landing Page (`saasrealitycheck.com`)

In Netlify dashboard for landing page:
1. Domain Settings → Add custom domain
2. Enter: `saasrealitycheck.com`
3. Configure DNS:
   - **A Record**: `75.2.60.5`
   - **CNAME**: `www` → `your-site.netlify.app`

### For App (`app.saasrealitycheck.com`)

In Netlify dashboard for app:
1. Domain Settings → Add custom domain
2. Enter: `app.saasrealitycheck.com`
3. Configure DNS:
   - **CNAME**: `app` → `your-app-site.netlify.app`

### SSL Certificates

Netlify provides free SSL automatically via Let's Encrypt.

---

## ⚙️ Environment Variables (If Needed)

Currently, the app doesn't need env variables (BYOK model), but if you add backend features:

In Netlify dashboard:
- Site Settings → Environment Variables
- Add variables
- Redeploy

---

## 🔄 Continuous Deployment

Netlify auto-deploys on git push:

1. Make changes locally
2. Commit and push to GitHub
3. Netlify automatically rebuilds and deploys

To disable auto-deploy:
- Site Settings → Build & Deploy → Stop builds

---

## 🚨 Troubleshooting

### Build Fails

**Error**: "Cannot find module '@anthropic-ai/sdk'"
- Solution: Ensure `package.json` has all dependencies
- Run `npm install` locally first

**Error**: "Next.js build failed"
- Solution: Check `netlify.toml` exists
- Ensure Next.js plugin is installed

### App Loads Blank

**Error**: White screen after deploy
- Check browser console for errors
- Verify API routes are working
- Check Next.js static export settings

### API Key Not Persisting

**Error**: localStorage not working
- This is a browser security feature
- Users must re-enter API key per browser
- This is expected behavior (security by design)

---

## 📊 Analytics Setup (Optional)

### Add Google Analytics

1. Get your GA4 tracking ID
2. Add to `app/layout.tsx`:

\`\`\`tsx
// In <head>
<Script
  src="https://www.googletagmanager.com/gtag/js?id=YOUR-GA-ID"
  strategy="afterInteractive"
/>
<Script id="google-analytics" strategy="afterInteractive">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'YOUR-GA-ID');
  `}
</Script>
\`\`\`

### Or Use Netlify Analytics

- Site Settings → Analytics
- Enable (costs $9/month)
- Get server-side analytics (no JS required)

---

## 💰 Payment Integration

To accept payments for the app:

### Option 1: Gumroad (Easiest)

1. Create product on Gumroad
2. Get purchase link
3. Update landing page CTAs to link to Gumroad
4. On purchase, send download link to app

### Option 2: Stripe

1. Create Stripe product
2. Add Stripe checkout to landing page
3. On successful payment, redirect to app with license key
4. Add license validation to app

### Option 3: Lemon Squeezy

Similar to Gumroad but handles EU VAT automatically.

---

## 🔐 Adding License Validation (Optional)

If you want to gate access:

1. Generate license keys on purchase
2. Add license check in app:
   \`\`\`tsx
   // In app/page.tsx
   const [license, setLicense] = useState('');

   // Validate against your database/API
   \`\`\`

3. Store valid licenses in Netlify Functions or external DB

---

## 📧 Support

For deployment issues:
- Check [Netlify docs](https://docs.netlify.com/)
- [Next.js on Netlify](https://docs.netlify.com/integrations/frameworks/next-js/)

For app issues:
- Check browser console
- Verify API key is valid
- Test locally first: `npm run dev`

---

## ✅ Launch Checklist

- [ ] App deployed to Netlify
- [ ] Landing page deployed to Netlify
- [ ] Custom domains configured
- [ ] SSL certificates active
- [ ] Payment processing setup
- [ ] Analytics installed
- [ ] Test validation flow end-to-end
- [ ] Update all email addresses in code
- [ ] Add license key system (if using)
- [ ] Create support email/channel
- [ ] Announce on social media!

---

Good luck with your launch! 🚀

© 2025 Dr. Vivian Nzegbulem | SaaS Reality Check
