# Development Guide

Guide for developers who want to contribute or customize Cinematic Archives.

## Development Setup

### Prerequisites

- **Node.js** 20.x or higher
- **npm** 9.x or higher
- **Git** 2.x or higher
- **Code Editor** (VS Code recommended)

### Getting Started

1. **Clone Repository**
   ```bash
   git clone https://github.com/anacondy/Poster-scanner-2-.git
   cd Poster-scanner-2-
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```
   - Opens at `http://localhost:3000`
   - Hot reload enabled
   - Changes reflect immediately

4. **Build for Production**
   ```bash
   npm run build
   ```
   - Output: `dist/` folder
   - Optimized and minified

5. **Preview Production Build**
   ```bash
   npm run preview
   ```

## Project Structure

```
Poster-scanner-2-/
├── .github/
│   └── workflows/
│       ├── deploy.yml      # GitHub Pages deployment
│       └── release.yml     # Release builds
├── docs/
│   ├── Installation.md
│   ├── User-Guide.md
│   ├── Troubleshooting.md
│   └── screenshots/
├── public/
│   └── index.html          # HTML template (deprecated)
├── src/
│   ├── App.jsx             # Main application component
│   ├── main.jsx            # Entry point
│   └── index.css           # Global styles
├── index.html              # Vite HTML entry
├── vite.config.js          # Vite configuration
├── capacitor.config.json   # Capacitor config
├── package.json            # Dependencies and scripts
└── README.md               # Project documentation
```

## Key Technologies

### React 19.2
- Concurrent features
- Hooks (useState, useEffect, useCallback, useRef)
- Functional components

### Vite 7.2
- Fast dev server with HMR
- Optimized production builds
- Code splitting
- CSS modules

### Capacitor
- Native mobile wrapper
- Android and iOS support
- Native API access

## Code Architecture

### Main Component: App.jsx

**Structure:**
```jsx
App (Main Container)
├── Particle System (Background)
├── Header
└── Main Content
    ├── Upload Zone
    └── Artifact Grid
        └── ArtifactCard (Multiple)
            ├── Image Preview
            ├── Scan Button
            └── Results Display
```

### State Management

**App Component State:**
- `artifacts` - Array of uploaded files

**ArtifactCard State:**
- `imagePreview` - Base64 image data
- `status` - 'IDLE' | 'SCANNING' | 'RESULT' | 'ERROR'
- `result` - Analysis result object
- `scanColor` - Animation color

### Key Features Implementation

#### 1. Particle System
**Location:** `App.jsx` lines 218-291

```javascript
// Optimized for 60+ FPS
const particleCount = width < 768 ? 40 : 100;
requestAnimationFrame(animate);
```

**Customization:**
- Particle count: Line 226
- Particle speed: Lines 237-238
- Particle color: Line 256

#### 2. Image Upload
**Location:** `App.jsx` lines 293-321

**Methods:**
- Drag & Drop: `handleDrop`
- Click Upload: `handleManualUpload`

**Supported Formats:**
```javascript
accept="image/*"
```

#### 3. AI Analysis
**Location:** `App.jsx` lines 31-111

**API Configuration:**
```javascript
const apiKey = ""; // Set your key here
const response = await fetch(
  `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`,
  {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [...],
      generationConfig: { responseMimeType: "application/json" },
      safetySettings: [
        { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_NONE" },
        // ... all set to BLOCK_NONE
      ]
    })
  }
);
```

#### 4. Animation System
**Location:** `App.jsx` lines 333-360

**Keyframes:**
- `scan-y` - Scanning line animation
- `pulse-fast` - Quick pulse effect
- `fade-in-up` - Fade in from bottom
- `slide-up` - Slide up animation

**Performance Optimization:**
```css
.animate-* {
  will-change: transform, opacity;
  transform: translateZ(0);
  backface-visibility: hidden;
}
```

## Customization Guide

### Changing Colors

**Primary Purple:**
```javascript
// Search for: #9333ea, rgb(147, 51, 234)
// Replace with your color
```

**Accent Amber:**
```javascript
// Search for: #ffaa00, rgb(255, 170, 0)
// Replace with your color
```

### Adjusting Performance

**Reduce Particle Count:**
```javascript
// Line 226
const particleCount = width < 768 ? 20 : 50; // Lower values
```

**Disable Particles:**
```javascript
// Comment out lines 218-291
// Or set particleCount to 0
```

**Simplify Animations:**
```javascript
// Reduce animation duration
// Line 340: 2.5s → 1s
animation: scan-y 1s linear infinite;
```

### Adding New Features

**Example: Save Results**
```javascript
const saveResult = (result) => {
  localStorage.setItem(
    `result_${Date.now()}`,
    JSON.stringify(result)
  );
};
```

**Example: Share Functionality**
```javascript
const shareResult = async (result) => {
  if (navigator.share) {
    await navigator.share({
      title: result.title,
      text: result.description,
      url: window.location.href
    });
  }
};
```

## Building for Production

### Web Build

```bash
npm run build
```

**Output:** `dist/` folder
**Contents:**
- `index.html`
- `assets/` (CSS, JS)

**Deployment:**
- Upload to any static host
- Configure base URL in `vite.config.js`

### Android Build

**Prerequisites:**
- Android Studio
- Java JDK 17+

**Steps:**
```bash
# Build and sync
npm run build:android

# Open in Android Studio
npx cap open android

# Build APK
# In Android Studio: Build → Build Bundle(s) / APK(s) → Build APK(s)
```

**Output:** `android/app/build/outputs/apk/release/app-release.apk`

### iOS Build

**Prerequisites:**
- macOS
- Xcode 14+
- Apple Developer Account

**Steps:**
```bash
# Build and sync
npm run build:ios

# Open in Xcode
npx cap open ios

# Configure signing
# Build in Xcode: Product → Archive
```

## Testing

### Manual Testing

**Web:**
1. `npm run dev`
2. Test in Chrome, Firefox, Safari
3. Test responsive design (DevTools)
4. Test drag & drop
5. Test image analysis

**Mobile:**
1. Build APK/IPA
2. Install on device
3. Test all features
4. Test offline behavior

### Performance Testing

**Chrome DevTools:**
1. Open DevTools (F12)
2. Performance tab
3. Record interaction
4. Check FPS (should be 60+)

**Lighthouse:**
1. Open DevTools
2. Lighthouse tab
3. Generate report
4. Target: 90+ score

## Contributing

### Workflow

1. **Fork Repository**
2. **Create Feature Branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Make Changes**
   - Follow code style
   - Add comments
   - Test thoroughly

4. **Commit Changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```

5. **Push to Fork**
   ```bash
   git push origin feature/amazing-feature
   ```

6. **Open Pull Request**
   - Describe changes
   - Reference issues
   - Add screenshots

### Code Style

**JavaScript:**
- Use functional components
- Use hooks instead of classes
- Prefer const over let
- Use arrow functions
- Add JSDoc comments for complex functions

**CSS:**
- Use Tailwind-like classes
- Inline styles for dynamic values
- Organize by section
- Mobile-first approach

**Naming:**
- Components: PascalCase
- Functions: camelCase
- Constants: UPPER_SNAKE_CASE
- Files: kebab-case or PascalCase for components

### Git Commit Messages

**Format:**
```
type(scope): subject

body

footer
```

**Types:**
- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation
- `style` - Formatting
- `refactor` - Code restructuring
- `perf` - Performance improvement
- `test` - Tests
- `chore` - Maintenance

**Examples:**
```
feat(api): add support for multiple AI models

fix(mobile): resolve touch event handling on iOS

docs(readme): update installation instructions
```

## API Reference

### Google Gemini API

**Endpoint:**
```
https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent
```

**Request:**
```json
{
  "contents": [{
    "role": "user",
    "parts": [
      { "text": "prompt" },
      { "inlineData": { "mimeType": "image/jpeg", "data": "base64..." } }
    ]
  }],
  "generationConfig": {
    "responseMimeType": "application/json"
  },
  "safetySettings": [...]
}
```

**Response:**
```json
{
  "candidates": [{
    "content": {
      "parts": [{
        "text": "{\"title\":\"...\",\"year\":\"...\",\"genre\":\"...\",\"description\":\"...\"}"
      }]
    }
  }]
}
```

## Debugging

### Browser DevTools

**Console Errors:**
- Check for JavaScript errors
- Look for API failures
- Monitor network requests

**Network Tab:**
- Verify API calls
- Check request/response
- Monitor timing

**Performance Tab:**
- Record interactions
- Check frame rate
- Identify bottlenecks

### React DevTools

**Installation:**
- Chrome/Firefox extension
- Shows component tree
- Inspect props/state
- Profile performance

### Common Issues

**Issue:** Build fails
**Solution:** Delete `node_modules`, run `npm install`

**Issue:** Hot reload not working
**Solution:** Restart dev server

**Issue:** API errors
**Solution:** Check API key, rate limits

## Resources

### Documentation
- [React Docs](https://react.dev/)
- [Vite Docs](https://vitejs.dev/)
- [Capacitor Docs](https://capacitorjs.com/)
- [Gemini API Docs](https://ai.google.dev/docs)

### Tools
- [VS Code](https://code.visualstudio.com/)
- [React DevTools](https://react.dev/learn/react-developer-tools)
- [Android Studio](https://developer.android.com/studio)
- [Xcode](https://developer.apple.com/xcode/)

### Community
- [GitHub Discussions](https://github.com/anacondy/Poster-scanner-2-/discussions)
- [Issues](https://github.com/anacondy/Poster-scanner-2-/issues)
- [Pull Requests](https://github.com/anacondy/Poster-scanner-2-/pulls)

---

Happy coding! 🚀
