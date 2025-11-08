# SaaS Reality Check App

**Validate Your AI Startup Before Writing Code**

A 5-agent validation system that helps founders avoid the GPT wrapper graveyard by assessing problem fit, moat strength, market timing, and founder leverage.

## 🎯 What This Does

This application implements the **SaaS Reality Check System** with 5 specialized AI agents:

1. **Clara – StoryMapper**: Maps your idea to a pain → goal arc
2. **Ethan – MoatDetector**: Assesses clone risk and moat strength
3. **Maya – MarketRealityCheck**: Analyzes market saturation and timing
4. **Isaac – LeverageStack**: Evaluates your audience and distribution
5. **Leo – BuildOrNot**: Delivers final verdict (🟢 Proceed / 🟡 Validate / 🔴 Delay)

## 💰 Cost Model: BYOK (Bring Your Own Key)

This app uses your personal Claude API key:
- **Your key stays in your browser** (never sent to servers)
- **You pay Claude directly** for usage (~$0.01-0.03 per validation)
- **Transparent pricing** - see exact costs in real-time

## 🚀 Quick Start

### 1. Install Dependencies

\`\`\`bash
npm install
\`\`\`

### 2. Run Development Server

\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000)

### 3. Get Your Claude API Key

1. Go to [console.anthropic.com](https://console.anthropic.com/)
2. Create an account (free tier available)
3. Generate an API key from Settings → API Keys
4. Paste it into the app

### 4. Validate Your Startup

Follow the sequential agent flow:
- Enter your startup idea for Clara
- Describe your tech stack for Ethan
- Share your target market for Maya
- Explain your leverage for Isaac
- Receive final verdict from Leo

## 🏗️ Build for Production

\`\`\`bash
npm run build
npm start
\`\`\`

## 📦 Deployment

### Vercel (Recommended)

\`\`\`bash
npm install -g vercel
vercel
\`\`\`

### Other Platforms

- **Netlify**: Works out of the box
- **Docker**: Standard Next.js container
- **Self-hosted**: Run \`npm run build && npm start\`

## 🔐 Security

- API keys stored in browser localStorage only
- No backend server required
- Direct client-to-Claude API calls
- No data collection or tracking

## 📊 Features

- ✅ Sequential 5-agent validation flow
- ✅ Real-time cost tracking
- ✅ Session persistence (localStorage)
- ✅ Export validation reports
- ✅ Markdown rendering for agent responses
- ✅ Mobile-responsive design
- ✅ No backend required

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **AI**: Anthropic Claude API (Haiku model)
- **Storage**: Browser localStorage

## 💡 Cost Estimates

Using Claude 3.5 Haiku:
- Single validation: **$0.01 - $0.03**
- 100 validations: **$1 - $3**
- 1,000 validations: **$10 - $30**

## 📝 License

**Proprietary**

© 2025 Dr. Vivian Nzegbulem. All rights reserved.

Part of the [Vertical AI Orchestration](https://verticalsystems.xyz) methodology.

## 🙋 Support

For questions or licensing inquiries:
- Visit: [verticalsystems.xyz](https://verticalsystems.xyz)
- LinkedIn: [Dr. Vivian Nzegbulem](https://www.linkedin.com/in/dr-vivian-nzegbulem-58ab3568/)

## 🎯 Use Cases

- **Solo Founders**: Validate before quitting your job
- **Accelerators**: Screen cohort applications
- **Investors**: Due diligence on early-stage ideas
- **Consultants**: Offer validation as a service
