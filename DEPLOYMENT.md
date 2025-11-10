# GitHub Pages Deployment Guide

This guide will help you deploy your Next.js application to GitHub Pages.

## Prerequisites

1. **Install dependencies** (including the newly added `cross-env`):
   ```bash
   npm install
   ```

2. **Ensure your repository is on GitHub** and you have push access.

3. **Enable GitHub Pages** in your repository settings:
   - Go to your repository on GitHub
   - Navigate to **Settings** → **Pages**
   - Under **Source**, select **Deploy from a branch**
   - Choose the `gh-pages` branch
   - Select the `/ (root)` folder
   - Click **Save**

## Deployment Steps

### Step 1: Determine Your Repository Name

Your GitHub Pages URL will be:
- `https://<username>.github.io/<repository-name>/` (if repository is not your username.github.io)
- `https://<username>.github.io/` (if repository is `<username>.github.io`)

**Example**: If your repository is `https://github.com/johndoe/LimitlessFit-Client`, your site will be at `https://johndoe.github.io/LimitlessFit-Client/`

### Step 2: Set the Base Path

Before deploying, you need to set the `NEXT_PUBLIC_BASE_PATH` environment variable to match your repository name.

**For Windows (PowerShell):**
```powershell
$env:NEXT_PUBLIC_BASE_PATH="/LimitlessFit-Client"
```

**For Windows (Command Prompt):**
```cmd
set NEXT_PUBLIC_BASE_PATH=/LimitlessFit-Client
```

**For Linux/Mac:**
```bash
export NEXT_PUBLIC_BASE_PATH=/LimitlessFit-Client
```

**Note**: 
- Replace `LimitlessFit-Client` with your actual repository name
- If your repository is `username.github.io`, set it to an empty string: `NEXT_PUBLIC_BASE_PATH=""`

### Step 3: Deploy

Run the deploy command:

```bash
npm run deploy
```

This will:
1. Build your Next.js app for static export (with GitHub Pages configuration)
2. Deploy the `out` folder to the `gh-pages` branch
3. Your site will be available at `https://<username>.github.io/<repository-name>/` within a few minutes

## Alternative: Build and Deploy Separately

If you want to build and deploy separately:

```bash
# Build for GitHub Pages
npm run build:gh-pages

# Deploy manually
npx gh-pages -d out
```

## Custom Domain

If you're using a custom domain, set `NEXT_PUBLIC_BASE_PATH` to an empty string:

**Windows (PowerShell):**
```powershell
$env:NEXT_PUBLIC_BASE_PATH=""
npm run deploy
```

**Linux/Mac:**
```bash
NEXT_PUBLIC_BASE_PATH="" npm run deploy
```

## Troubleshooting

### 404 Errors
- **Problem**: Pages return 404 errors
- **Solution**: Make sure `NEXT_PUBLIC_BASE_PATH` matches your repository name exactly (case-sensitive)

### Assets Not Loading
- **Problem**: Images, CSS, or JavaScript files don't load
- **Solution**: 
  - Verify that `.nojekyll` file exists in the `public` folder (it should already be there)
  - Check that `basePath` in `next.config.ts` is set correctly
  - Ensure `trailingSlash: true` is enabled (already configured)

### Build Errors
- **Problem**: Build fails with errors
- **Solution**: 
  - Make sure all dependencies are installed: `npm install`
  - Check that `cross-env` is installed: `npm install cross-env --save-dev`
  - Verify your code has no TypeScript or linting errors

### Environment Variables Not Working
- **Problem**: `NEXT_PUBLIC_BASE_PATH` is not being picked up
- **Solution**: 
  - Make sure to set the environment variable in the same terminal session before running `npm run deploy`
  - For a permanent solution, create a `.env.local` file (but don't commit it if it contains secrets)

## What Changed

The following improvements were made to your deployment setup:

1. ✅ Added `build:gh-pages` script that builds with GitHub Pages configuration
2. ✅ Updated `deploy` script to build first, then deploy
3. ✅ Added `cross-env` package for cross-platform environment variable support
4. ✅ `.nojekyll` file already exists in `public` folder (prevents Jekyll processing)

## Quick Reference

```bash
# Install dependencies (including cross-env)
npm install

# Set base path (replace with your repo name)
# Windows PowerShell:
$env:NEXT_PUBLIC_BASE_PATH="/your-repo-name"

# Deploy
npm run deploy
```

Your site will be live at: `https://<username>.github.io/<repository-name>/`

