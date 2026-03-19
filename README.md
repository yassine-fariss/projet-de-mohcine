# Revo Productions

A cinematic, premium-feel portfolio and services website built with React, Vite, Tailwind CSS, and Framer Motion.

## 🚀 Deployment Notice
> **Note:** This repository is structured and configured to be linked directly with **Vercel** for seamless continuous deployment. Later on, it will be mapped to a **custom domain name**.

## 💻 Tech Stack
- **React 18** - UI Library
- **Vite** - Build Tool
- **Tailwind CSS v4** - Styling
- **Framer Motion** - Animations
- **i18next** - Internationalization (EN, FR, AR)
- **React Router DOM** - Navigation
- **TypeScript** - Type Safety

## 🛠️ Running Locally

First, clone the repository and install dependencies:
```bash
npm install
```

Then, run the development server:
```bash
npm run dev
```

Open [https://revoproductions.ma](https://revoproductions.ma) with your browser to see the application running.

## 🌐 Deployment Details
This project is fully optimized for Vercel deployment. Once pushed to the `main` branch, Vercel will automatically build and deploy the changes, ensuring high performance and a premium web experience.

## 🔗 Domain Configuration

To link your custom domain name to this project on Vercel:

1. **Add Domain in Vercel:**
   - Go to your Project Settings in the Vercel Dashboard.
   - Select **Domains** and enter your domain name (e.g., `revoproductions.ma`).
2. **Configure DNS (at your Registrar):**
   - **A Record:** Point `@` to `76.76.21.21`.
   - **CNAME Record:** Point `www` to `cname.vercel-dns.com`.
3. **Wait for Propagation:**
   - Vercel will automatically detect the DNS changes and issue an SSL certificate for HTTPS.
