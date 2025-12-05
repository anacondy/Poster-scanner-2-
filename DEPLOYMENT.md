# Deployment Instructions

This document provides step-by-step instructions to complete the deployment of Cinematic Archives.

## Prerequisites Completed ✅

All code changes and configurations have been completed:
- ✅ Modern React setup with Vite
- ✅ Multi-platform build configurations (Web, Android, iOS)
- ✅ GitHub Actions workflows
- ✅ Comprehensive documentation
- ✅ Security checks passed
- ✅ Code review completed

## Next Steps for Repository Owner

### 1. Enable GitHub Pages

1. Go to repository **Settings**
2. Navigate to **Pages** (left sidebar)
3. Under **Source**, select:
   - Source: `Deploy from a branch`
   - Branch: Select the branch after this PR is merged (usually `main`)
   - Folder: `/ (root)`
4. Click **Save**

**Note**: GitHub Pages will be automatically deployed via the workflow after merging to main.

### 2. Configure Repository Secrets (If Using API Key)

If you want to use a shared API key for demos:

1. Go to **Settings** → **Secrets and variables** → **Actions**
2. Click **New repository secret**
3. Name: `VITE_GEMINI_API_KEY`
4. Value: Your Google Gemini API key
5. Click **Add secret**

**Important**: This is optional. Users can provide their own API keys via environment variables.

### 3. Create Initial Release

After merging this PR to main:

1. Create a new tag:
   ```bash
   git checkout main
   git pull
   git tag v2.5.0
   git push origin v2.5.0
   ```

2. The release workflow will automatically:
   - Build the web application
   - Create a GitHub release
   - Attach build artifacts

### 4. Enable Wiki (Optional but Recommended)

1. Go to **Settings**
2. Under **Features**, enable **Wikis**
3. Create wiki pages from the documentation in `docs/`:
   - Copy content from `docs/Installation.md` → Wiki: Installation
   - Copy content from `docs/User-Guide.md` → Wiki: User Guide
   - Copy content from `docs/Development.md` → Wiki: Development
   - Copy content from `docs/API-Docs.md` → Wiki: API Documentation
   - Copy content from `docs/Troubleshooting.md` → Wiki: Troubleshooting
   - Copy content from `CONTRIBUTING.md` → Wiki: Contributing

### 5. Add Screenshots (Optional)

To make the README more attractive:

1. Visit the deployed site
2. Take screenshots of:
   - Desktop view (1280x720 or larger)
   - Mobile view (375x667 or device screenshot)
   - Analysis in action (scanning animation)
3. Save them as:
   - `docs/screenshots/desktop-preview.png`
   - `docs/screenshots/mobile-preview.png`
   - `docs/screenshots/analysis-demo.png`
4. Commit and push:
   ```bash
   git add docs/screenshots/
   git commit -m "Add application screenshots"
   git push
   ```

### 6. Configure Branch Protection (Recommended)

For the main branch:

1. Go to **Settings** → **Branches**
2. Add rule for `main` branch
3. Enable:
   - ✅ Require pull request reviews before merging
   - ✅ Require status checks to pass before merging
   - ✅ Require conversation resolution before merging

## Testing the Deployment

### Test GitHub Pages Deployment

After enabling GitHub Pages and merging:

1. Visit: `https://anacondy.github.io/Poster-scanner-2-/`
2. Verify the site loads correctly
3. Test image upload
4. Test with your API key (if configured)

### Test Health Check Workflow

The health check runs automatically every 3 days, but you can test it:

1. Go to **Actions** tab
2. Select **Health Check** workflow
3. Click **Run workflow** → **Run workflow**
4. Check the results

### Test Release Workflow

If you created the v2.5.0 tag:

1. Go to **Actions** tab
2. Check the **Build and Release** workflow
3. Once complete, check **Releases** page for the new release

## Troubleshooting

### GitHub Pages not working

- Check that Pages is enabled in Settings
- Verify the workflow ran successfully (Actions tab)
- Wait 5-10 minutes for DNS propagation
- Clear browser cache

### API Key Issues

Users need to set their own API key:

**Method 1: Environment Variable**
```bash
cp .env.example .env.local
# Edit .env.local and add API key
```

**Method 2: Direct in Code**
Edit `src/App.jsx` line ~45 and replace the environment variable.

### Build Failures

If the build fails:
1. Check the Actions tab for error logs
2. Verify all dependencies are installed
3. Check Node.js version (should be 20+)
4. Review the health check workflow results

## Mobile App Builds (Advanced)

### Android APK

To create an Android APK:

1. Install Android Studio
2. Install Java JDK 17+
3. Clone the repository locally
4. Run:
   ```bash
   npm install
   npm run build:android
   cd android
   ./gradlew assembleRelease
   ```
5. APK location: `android/app/build/outputs/apk/release/`

### iOS App

To create an iOS app:

1. macOS with Xcode 14+
2. Clone the repository locally
3. Run:
   ```bash
   npm install
   npm run build:ios
   npx cap open ios
   ```
4. Build in Xcode: Product → Archive

## Support

- **Issues**: [GitHub Issues](https://github.com/anacondy/Poster-scanner-2-/issues)
- **Discussions**: [GitHub Discussions](https://github.com/anacondy/Poster-scanner-2-/discussions)
- **Documentation**: Check `docs/` folder

## Maintenance

### Regular Updates

The health check workflow runs every 3 days automatically and will:
- Verify the build still works
- Create an issue if build fails
- Help catch dependency issues early

### Monitoring

Check regularly:
- GitHub Actions status
- Issues created by health check
- User-reported issues
- Dependency security alerts

---

🎉 **Deployment is complete!** Once you enable GitHub Pages and merge this PR, the site will be live at:
**https://anacondy.github.io/Poster-scanner-2-/**
