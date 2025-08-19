# Portfolio Website

A modern, responsive portfolio website built with Next.js, TypeScript, and Tailwind CSS. Perfect for showcasing projects, sharing technical blogs, and presenting competitive programming achievements.

## 🚀 Features

- **Modern Design**: Clean, professional interface with dark/light mode support
- **Responsive Layout**: Works perfectly on desktop, tablet, and mobile devices
- **Project Showcase**: Highlight your best work with detailed project descriptions
- **Technical Blog**: Share your knowledge with a built-in blogging platform
- **Competitive Programming**: Dedicated sections for CP achievements and problem-solving
- **Contact Form**: Easy way for visitors to get in touch
- **SEO Optimized**: Built-in SEO optimization for better search visibility
- **Fast Performance**: Optimized for speed with Next.js and static generation

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Deployment**: Vercel (recommended) / GitHub Pages
- **Development**: ESLint, Prettier for code quality

## 🏃‍♂️ Quick Start

1. **Install dependencies**:

   ```bash
   npm install
   ```

2. **Start development server**:

   ```bash
   npm run dev
   ```

3. **Open in browser**: Visit `http://localhost:3000`

## ✏️ Customization

### Personal Information

Update your personal details in `src/data/personal.ts`:

- Name, title, and contact information
- Skills and experience levels
- Competitive programming achievements
- Social media links

### Projects

Add your projects in `src/data/projects.ts`:

- Project descriptions and technologies
- GitHub links and live demos
- Categories and featured status

### Blog Posts

Create blog content in `src/data/blog.ts`:

- Technical articles and tutorials
- Personal experiences and insights
- Competitive programming tips

## 🌐 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically with each push

### GitHub Pages

1. Update `next.config.ts` for static export:
   ```typescript
   const nextConfig = {
     output: "export",
     basePath: "/portfolio",
     images: {
       unoptimized: true,
     },
   };
   ```
2. Build and deploy:
   ```bash
   npm run build
   ```

Built with ❤️ for Computer Science students and competitive programmers.

# or

pnpm dev

# or

bun dev

```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
```
