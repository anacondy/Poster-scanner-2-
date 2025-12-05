# User Guide

Welcome to Cinematic Archives! This guide will help you get the most out of the AI-powered poster scanner.

## Getting Started

### First Launch

1. **Open the App**
   - Web: Visit [https://anacondy.github.io/Poster-scanner-2-/](https://anacondy.github.io/Poster-scanner-2-/)
   - Mobile: Tap the app icon
   - Desktop: Open in your browser

2. **Interface Overview**
   - **Header**: Shows app name and artifact count
   - **Upload Zone**: Drag & drop or click to upload
   - **Artifact Grid**: Displays your uploaded images
   - **Background**: Animated particle system for ambiance

## Basic Usage

### Uploading Images

**Method 1: Drag and Drop**
1. Find an image file on your computer
2. Drag it over the upload zone
3. Drop to upload

**Method 2: Click to Upload**
1. Click the upload zone
2. Select one or more images
3. Click "Open"

**Supported Formats**
- JPG/JPEG
- PNG
- WEBP
- BMP
- GIF (static)

**Tips**
- Upload multiple images at once
- Newer uploads appear at the top
- High-quality images work best

### Analyzing Images

1. **Hover Over Image**
   - Desktop: Move mouse over uploaded image
   - Mobile: Image is always interactive

2. **Click "SCAN_ARTIFACT"**
   - Button appears on hover (desktop)
   - Always visible on mobile

3. **Watch the Analysis**
   - Green scanning line appears
   - Purple glow effect
   - "ANALYZING_DATA..." message
   - Takes 2-5 seconds

4. **View Results**
   - Title appears in large text
   - Year and genre shown below
   - Atmospheric description at bottom

### Managing Your Collection

**Remove Images**
- Desktop: Hover and click X button (top-right)
- Mobile: Tap X button (always visible)

**Upload More**
- Use the "UPLOAD MORE" button
- Or drag & drop new images

**Start Fresh**
- Remove all images individually
- Or refresh the page

## Advanced Features

### API Key Configuration

The app uses Google Gemini AI. To use it:

1. **Get an API Key**
   - Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Sign in with Google account
   - Create a new API key
   - Copy the key

2. **Configure in App**
   - The app will prompt for key on first scan
   - Or edit the source code (see Development Guide)

3. **API Limits**
   - Free tier: 60 requests/minute
   - Paid tier: Higher limits available

### Understanding Results

**Title**
- Movie, game, or artwork name
- AI-generated if unknown
- Displayed in large, cinematic font

**Year**
- Release year or era
- Estimated if unknown
- Shown with genre

**Genre**
- Film/game category
- Examples: Sci-Fi, Noir, Romance, Horror
- Highlighted in amber

**Description**
- 30-50 word atmospheric description
- Focuses on mood and vibe
- No spoilers
- Italic serif font for elegance

### Performance Tips

**For Best Experience**
- Use modern browser (Chrome, Firefox, Safari)
- Enable hardware acceleration in browser
- Close unnecessary tabs
- Good internet connection for API calls

**High Refresh Rate Displays**
- App automatically detects 90Hz, 120Hz, 144Hz
- Animations scale to match display
- Smooth 60+ FPS guaranteed

**Mobile Optimization**
- Works on 20:9 and 16:9 displays
- Touch-optimized controls
- Reduced particle count for performance
- Efficient battery usage

## Common Use Cases

### Movie Poster Collection
1. Upload your favorite movie posters
2. Let AI identify and describe them
3. Build a digital archive
4. Share results with friends

### Game Cover Analysis
1. Upload game box art
2. Get genre and era information
3. Discover game descriptions
4. Organize your collection

### Art Appreciation
1. Upload abstract or artistic images
2. Get AI-generated interpretations
3. Explore different perspectives
4. Learn about art styles

### Unknown Posters
1. Found an interesting poster?
2. Upload it for analysis
3. AI identifies or creates fitting title
4. Get context and description

## Keyboard Shortcuts

### Desktop
- **Tab**: Navigate between elements
- **Enter**: Activate focused button
- **Escape**: Close modals (if any)
- **Ctrl + V**: Paste image (from clipboard)

### Mobile Gestures
- **Tap**: Interact with elements
- **Long Press**: Context menu (if available)
- **Swipe**: Scroll through artifacts
- **Pinch**: Zoom images (browser default)

## Accessibility Features

### Screen Reader Support
- All images have alt text
- Buttons have descriptive labels
- Status updates announced
- ARIA labels for dynamic content

### Keyboard Navigation
- Full keyboard support
- Visible focus indicators
- Logical tab order
- Skip links available

### Visual Accessibility
- High contrast dark theme
- Large, readable fonts
- Clear button states
- Minimal motion option (browser setting)

### Touch Targets
- Large touch areas (44x44px minimum)
- Adequate spacing
- Visual feedback on tap
- No accidental triggers

## Privacy & Data

### What Gets Sent
- Only images you upload
- Sent to Google Gemini API
- Processed in real-time
- Not stored permanently

### What's Stored
- Nothing on our servers
- Results shown in your browser
- Cleared on page refresh
- No user tracking

### API Usage
- Your API key (if configured)
- Image data sent to Google
- Follows Google's privacy policy
- You control your data

## Tips & Tricks

### Better Results
- Use high-quality images
- Clear, well-lit posters
- Avoid heavily edited images
- Standard aspect ratios work best

### Faster Performance
- Optimize images before upload
- Use recommended formats (JPG, PNG)
- Clear browser cache regularly
- Update to latest browser version

### Creative Uses
- Analyze fan art
- Identify vintage posters
- Explore international cinema
- Discover hidden gems

### Troubleshooting Quick Fixes
- Refresh page if stuck
- Clear browser cache
- Check internet connection
- Try different image format

## Getting Help

### Documentation
- [Installation Guide](Installation.md)
- [API Documentation](API-Docs.md)
- [Development Guide](Development.md)
- [Troubleshooting](Troubleshooting.md)

### Support Channels
- [GitHub Issues](https://github.com/anacondy/Poster-scanner-2-/issues)
- [Discussions](https://github.com/anacondy/Poster-scanner-2-/discussions)
- [Wiki](https://github.com/anacondy/Poster-scanner-2-/wiki)

### Community
- Share your results
- Report bugs
- Request features
- Contribute improvements

## Next Steps

Ready to dive deeper?
- Learn about [API customization](API-Docs.md)
- Explore [development](Development.md)
- Read [troubleshooting tips](Troubleshooting.md)
- Join the [community](https://github.com/anacondy/Poster-scanner-2-/discussions)

Happy scanning! 🎬✨
