# 🚀 Deploy Your Portfolio to GitHub & Vercel

## Step 1: Create GitHub Repository

1. **Go to GitHub:** https://github.com/new
2. **Repository name:** `portfolio` (or any name you prefer)
3. **Description:** "Personal Portfolio - CSE Student at University of Dhaka"
4. **Make it Public** (so others can see your work)
5. **Don't initialize** with README (we already have one)
6. **Click "Create repository"**

## Step 2: Connect Your Local Repository to GitHub

After creating the repository, GitHub will show you commands. Use these:

```bash
# Add GitHub as remote origin (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/portfolio.git

# Push your code to GitHub
git branch -M main
git push -u origin main
```

## Step 3: Deploy to Vercel (Free Hosting)

1. **Go to Vercel:** https://vercel.com/
2. **Sign up/Login** with your GitHub account
3. **Click "New Project"**
4. **Import your portfolio repository**
5. **Configure:**
   - Framework Preset: Next.js
   - Root Directory: ./
   - Build Command: `npm run build`
   - Output Directory: `.next`
6. **Add Environment Variables:**
   - If using Formspree: No additional env vars needed
   - Your `.env.local` variables won't be deployed (they're ignored)
7. **Click "Deploy"**

## Step 4: Your Live Portfolio

After deployment, you'll get:

- **Live URL:** `https://your-portfolio-name.vercel.app`
- **Auto-deployment:** Every push to GitHub triggers new deployment
- **Custom domain:** Optional - you can add your own domain later

## Step 5: Update Contact Form (if needed)

Since you're using Formspree with form ID `xyzpqklg`, make sure:

1. Your Formspree account email matches: `sistahak900@gmail.com`
2. The form ID `xyzpqklg` is active in your Formspree dashboard
3. Test the contact form after deployment

## 🎯 Quick Commands Summary

```bash
# 1. Add remote repository (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/portfolio.git

# 2. Push to GitHub
git push -u origin main

# 3. For future updates:
git add .
git commit -m "Update content"
git push
```

## 🌟 Benefits

- ✅ **Free hosting** with Vercel
- ✅ **Automatic SSL** certificate
- ✅ **Fast global CDN**
- ✅ **Auto-deployment** from GitHub
- ✅ **Professional portfolio URL**

## 📧 Contact Form Status

Your Formspree integration will work automatically once deployed. Messages will be sent to `sistahak900@gmail.com`.

---

**Need help?** Check the commands above or let me know if you encounter any issues!
