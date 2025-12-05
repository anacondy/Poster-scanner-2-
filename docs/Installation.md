# Installation Guide

## Web Version

### Instant Access (Recommended)
Visit [https://anacondy.github.io/Poster-scanner-2-/](https://anacondy.github.io/Poster-scanner-2-/)

No installation needed! The web version works on:
- Desktop browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Any device with a modern web browser

### Self-Hosting

1. **Download the Web Build**
   - Go to [Releases](https://github.com/anacondy/Poster-scanner-2-/releases)
   - Download `cinematic-archives-web.zip`
   - Extract the ZIP file

2. **Serve the Files**
   ```bash
   # Option 1: Python
   python -m http.server 8000
   
   # Option 2: Node.js
   npx serve dist
   
   # Option 3: PHP
   php -S localhost:8000
   ```

3. **Open in Browser**
   - Navigate to `http://localhost:8000`

---

## Android Installation

### Method 1: Direct APK Install (Easiest)

1. **Download APK**
   - Visit [Releases](https://github.com/anacondy/Poster-scanner-2-/releases)
   - Download `cinematic-archives.apk`

2. **Enable Unknown Sources**
   - Go to Settings → Security
   - Enable "Install from Unknown Sources"
   - Or on Android 8+: Settings → Apps → Special Access → Install Unknown Apps
   - Enable for your browser/file manager

3. **Install APK**
   - Open the downloaded APK file
   - Tap "Install"
   - Wait for installation to complete
   - Tap "Open" to launch

4. **First Launch**
   - Grant necessary permissions (camera, storage)
   - The app is ready to use!

### Method 2: Build from Source

1. **Prerequisites**
   - Android Studio (latest version)
   - Java JDK 17 or higher
   - Android SDK (API Level 26+)
   - Node.js 20+

2. **Clone and Install**
   ```bash
   git clone https://github.com/anacondy/Poster-scanner-2-.git
   cd Poster-scanner-2-
   npm install
   ```

3. **Build Android Project**
   ```bash
   npm run build:android
   npx cap open android
   ```

4. **Build APK in Android Studio**
   - Wait for Gradle sync
   - Build → Build Bundle(s) / APK(s) → Build APK(s)
   - APK location: `android/app/build/outputs/apk/release/`

5. **Install on Device**
   - Enable USB debugging on your device
   - Connect via USB
   - Run → Run 'app'

---

## iOS Installation

### Prerequisites
- macOS computer
- Xcode 14 or later
- iOS device or simulator
- Apple Developer Account (for device installation)

### Build Process

1. **Clone Repository**
   ```bash
   git clone https://github.com/anacondy/Poster-scanner-2-.git
   cd Poster-scanner-2-
   npm install
   ```

2. **Build iOS Project**
   ```bash
   npm run build:ios
   npx cap open ios
   ```

3. **Configure Signing**
   - In Xcode, select the project
   - Go to Signing & Capabilities
   - Select your Team
   - Xcode will automatically manage signing

4. **Install on Device**
   - Connect your iOS device
   - Select your device as the build target
   - Product → Run (⌘R)

5. **Trust Developer**
   - On your device: Settings → General → VPN & Device Management
   - Tap your developer account
   - Tap "Trust"

### TestFlight Distribution (Optional)
For easier distribution:
1. Build → Archive in Xcode
2. Upload to App Store Connect
3. Add internal/external testers
4. Distribute via TestFlight

---

## Desktop Installation

### Windows

1. **Via Browser (Recommended)**
   - Use Chrome, Firefox, or Edge
   - Visit [https://anacondy.github.io/Poster-scanner-2-/](https://anacondy.github.io/Poster-scanner-2-/)
   - Install as PWA: Click install icon in address bar

2. **Local Development**
   ```bash
   # Install Node.js from nodejs.org
   git clone https://github.com/anacondy/Poster-scanner-2-.git
   cd Poster-scanner-2-
   npm install
   npm run dev
   ```

### macOS

1. **Via Browser (Recommended)**
   - Use Safari or Chrome
   - Visit [https://anacondy.github.io/Poster-scanner-2-/](https://anacondy.github.io/Poster-scanner-2-/)
   - Safari: Share → Add to Dock

2. **Local Development**
   ```bash
   # Install Homebrew (if needed)
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   
   # Install Node.js
   brew install node
   
   # Clone and run
   git clone https://github.com/anacondy/Poster-scanner-2-.git
   cd Poster-scanner-2-
   npm install
   npm run dev
   ```

### Linux

1. **Via Browser**
   - Use Firefox, Chrome, or Chromium
   - Visit [https://anacondy.github.io/Poster-scanner-2-/](https://anacondy.github.io/Poster-scanner-2-/)

2. **Local Development**
   ```bash
   # Ubuntu/Debian
   sudo apt update
   sudo apt install nodejs npm git
   
   # Fedora
   sudo dnf install nodejs npm git
   
   # Arch
   sudo pacman -S nodejs npm git
   
   # Clone and run
   git clone https://github.com/anacondy/Poster-scanner-2-.git
   cd Poster-scanner-2-
   npm install
   npm run dev
   ```

---

## Troubleshooting

### Web Version
- **App not loading**: Clear browser cache and hard reload (Ctrl+Shift+R)
- **API errors**: Check browser console for details
- **Slow performance**: Ensure hardware acceleration is enabled in browser

### Android
- **APK won't install**: Ensure "Install from Unknown Sources" is enabled
- **App crashes**: Check Android version (requires 8.0+)
- **No API key**: You'll need to provide your own Gemini API key

### iOS
- **Can't install**: Ensure device is registered in your Apple Developer account
- **Signing errors**: Check provisioning profiles in Xcode
- **App not trusted**: Go to Settings → General → VPN & Device Management

### Common Issues
- **API rate limits**: The Gemini API has rate limits; wait a few minutes
- **Image not analyzed**: Check file format (JPG, PNG, WEBP, BMP only)
- **Slow animations**: Try reducing particle count in settings

---

## Next Steps

After installation:
1. Read the [User Guide](User-Guide.md)
2. Get a [Gemini API Key](https://makersuite.google.com/app/apikey)
3. Start analyzing your movie posters!

For issues, visit [Troubleshooting](Troubleshooting.md) or [open an issue](https://github.com/anacondy/Poster-scanner-2-/issues).
