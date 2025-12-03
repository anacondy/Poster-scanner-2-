# Troubleshooting Guide

Common issues and their solutions for Cinematic Archives.

## Web Version Issues

### App Not Loading

**Symptoms**: Blank page, loading forever, or error messages

**Solutions**:
1. **Clear Browser Cache**
   - Chrome: Ctrl+Shift+Delete → Clear browsing data
   - Firefox: Ctrl+Shift+Delete → Clear recent history
   - Safari: Safari menu → Clear History

2. **Hard Reload**
   - Windows/Linux: Ctrl+Shift+R or Ctrl+F5
   - macOS: Cmd+Shift+R

3. **Try Different Browser**
   - Switch to Chrome, Firefox, or Edge
   - Ensure browser is up to date

4. **Disable Extensions**
   - Ad blockers may interfere
   - Try incognito/private mode

### API Errors

**Symptoms**: "SIGNAL_LOST // DECRYPTION_FAILED" or analysis fails

**Solutions**:
1. **Check API Key**
   - Verify key is correct
   - Get new key from [Google AI Studio](https://makersuite.google.com/app/apikey)

2. **Rate Limits**
   - Free tier: 60 requests/minute
   - Wait a few minutes
   - Consider upgrading to paid tier

3. **Network Issues**
   - Check internet connection
   - Disable VPN temporarily
   - Check firewall settings

4. **Image Format**
   - Use JPG, PNG, WEBP, or BMP
   - Ensure image isn't corrupted
   - Try a different image

### Performance Issues

**Symptoms**: Slow animations, laggy interface, high CPU usage

**Solutions**:
1. **Enable Hardware Acceleration**
   - Chrome: Settings → System → Use hardware acceleration
   - Firefox: Preferences → Performance → Use recommended settings

2. **Close Other Tabs**
   - Browser uses shared resources
   - Close unnecessary tabs

3. **Update Browser**
   - Ensure latest version installed
   - Restart browser after update

4. **Reduce Particle Count**
   - For developers: Edit `src/App.jsx` line 226
   - Reduce from 100 to 50 or less

## Android Issues

### APK Won't Install

**Symptoms**: Installation blocked or failed

**Solutions**:
1. **Enable Unknown Sources**
   - Settings → Security → Unknown Sources (Android 7 and below)
   - Settings → Apps → Special Access → Install Unknown Apps (Android 8+)
   - Enable for your file manager/browser

2. **Check Android Version**
   - Requires Android 8.0+ (API Level 26)
   - Update Android if possible

3. **Free Up Storage**
   - Need at least 100MB free
   - Delete unused apps

4. **Verify APK File**
   - Re-download if corrupted
   - Check file size (should be ~15-20MB)

### App Crashes on Launch

**Symptoms**: App opens then immediately closes

**Solutions**:
1. **Clear App Data**
   - Settings → Apps → Cinematic Archives
   - Storage → Clear Data

2. **Reinstall App**
   - Uninstall completely
   - Restart device
   - Install again

3. **Check Permissions**
   - Settings → Apps → Cinematic Archives → Permissions
   - Grant necessary permissions

4. **Update Android System WebView**
   - Google Play Store → Android System WebView
   - Update if available

### Images Not Uploading

**Symptoms**: Can't select images or upload fails

**Solutions**:
1. **Grant Storage Permission**
   - Settings → Apps → Cinematic Archives → Permissions
   - Enable "Storage" or "Files and Media"

2. **Check File Location**
   - Move images to internal storage
   - External SD cards may have issues

3. **File Size**
   - Keep images under 10MB
   - Compress large images

## iOS Issues

### Can't Install App

**Symptoms**: Installation blocked or developer not trusted

**Solutions**:
1. **Trust Developer Certificate**
   - Settings → General → VPN & Device Management
   - Tap your developer profile
   - Tap "Trust"

2. **Check iOS Version**
   - Requires iOS 13.0+
   - Update iOS if possible

3. **Re-sign App**
   - Developer accounts expire yearly
   - Rebuild with valid certificate

### App Not Opening

**Symptoms**: Tap icon, nothing happens

**Solutions**:
1. **Force Restart Device**
   - iPhone 8+: Volume Up, Volume Down, Hold Power
   - iPhone 7: Hold Volume Down + Power
   - iPhone 6: Hold Home + Power

2. **Delete and Reinstall**
   - Long press app icon
   - Delete app
   - Reinstall from Xcode or TestFlight

3. **Check Free Space**
   - Need at least 500MB free
   - Delete photos, apps, or cache

## Cross-Platform Issues

### API Key Not Working

**Symptoms**: Analysis fails, API errors

**Solutions**:
1. **Verify Key Format**
   - Should start with "AIza..."
   - No extra spaces or characters

2. **Check API Status**
   - Visit [Google Cloud Status](https://status.cloud.google.com/)
   - API may be temporarily down

3. **API Not Enabled**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Enable "Generative Language API"

4. **Billing Issue**
   - Check billing settings
   - Free tier may be exhausted

### Images Not Analyzed

**Symptoms**: Scan button doesn't work or gets stuck

**Solutions**:
1. **Check Image Format**
   - Use JPG, PNG, WEBP, BMP
   - Convert HEIC, TIFF, RAW to JPG

2. **Image Too Large**
   - Max recommended: 10MB
   - Resize or compress large images

3. **Internet Connection**
   - Analysis requires internet
   - Check connection stability

4. **Clear Browser Cache**
   - Refresh the page
   - Try again

### Slow Performance

**Symptoms**: Animations lag, app feels sluggish

**Solutions**:
1. **Device Specs**
   - Older devices may struggle
   - Try on newer device

2. **Background Apps**
   - Close other apps
   - Free up RAM

3. **Power Saving Mode**
   - Disable battery saver
   - Use high performance mode

4. **Optimize Settings**
   - Reduce animation quality
   - Disable unnecessary features

## Developer Issues

### Build Fails

**Symptoms**: npm run build errors

**Solutions**:
1. **Delete node_modules**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   npm run build
   ```

2. **Check Node Version**
   ```bash
   node --version  # Should be 20.x or higher
   npm --version   # Should be 9.x or higher
   ```

3. **Clear npm Cache**
   ```bash
   npm cache clean --force
   npm install
   ```

### Vite Errors

**Symptoms**: Development server won't start

**Solutions**:
1. **Port Already in Use**
   ```bash
   # Kill process on port 3000
   # Windows: netstat -ano | findstr :3000
   # macOS/Linux: lsof -ti:3000 | xargs kill
   ```

2. **Update Vite**
   ```bash
   npm install vite@latest
   ```

### Capacitor Issues

**Symptoms**: Android/iOS builds fail

**Solutions**:
1. **Sync Capacitor**
   ```bash
   npx cap sync
   ```

2. **Update Capacitor**
   ```bash
   npm install @capacitor/core@latest @capacitor/cli@latest
   ```

3. **Clean Build**
   ```bash
   # Android
   cd android && ./gradlew clean && cd ..
   
   # iOS
   cd ios && xcodebuild clean && cd ..
   ```

## Getting More Help

### Still Having Issues?

1. **Check GitHub Issues**
   - [Existing issues](https://github.com/anacondy/Poster-scanner-2-/issues)
   - Someone may have same problem

2. **Create New Issue**
   - Include error messages
   - Describe steps to reproduce
   - Mention device/browser/OS

3. **Join Discussion**
   - [GitHub Discussions](https://github.com/anacondy/Poster-scanner-2-/discussions)
   - Community can help

4. **Review Documentation**
   - [Installation Guide](Installation.md)
   - [User Guide](User-Guide.md)
   - [Development Guide](Development.md)

### Useful Information to Include

When reporting issues:
- Operating system and version
- Browser and version
- Device model (for mobile)
- Error messages (exact text)
- Steps to reproduce
- Screenshots or screen recordings

---

Last Updated: December 2025
