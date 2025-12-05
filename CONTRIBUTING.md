# Contributing to Cinematic Archives

Thank you for your interest in contributing! This document provides guidelines for contributing to the project.

## Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inspiring community for all.

### Our Standards

**Positive behavior:**
- Being respectful and inclusive
- Accepting constructive criticism
- Focusing on what's best for the community
- Showing empathy towards others

**Unacceptable behavior:**
- Harassment or discriminatory language
- Trolling or insulting comments
- Publishing others' private information
- Unprofessional conduct

## How to Contribute

### Reporting Bugs

**Before submitting:**
1. Check existing [issues](https://github.com/anacondy/Poster-scanner-2-/issues)
2. Verify it's reproducible
3. Collect relevant information

**Bug report should include:**
- Clear, descriptive title
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable
- Environment details (OS, browser, device)
- Error messages or logs

**Template:**
```markdown
**Describe the bug**
A clear description of what the bug is.

**To Reproduce**
1. Go to '...'
2. Click on '...'
3. See error

**Expected behavior**
What you expected to happen.

**Screenshots**
If applicable, add screenshots.

**Environment:**
- OS: [e.g., Windows 11, macOS 13, Android 12]
- Browser: [e.g., Chrome 120, Safari 17]
- Version: [e.g., 2.5.0]
```

### Suggesting Features

**Before suggesting:**
1. Check if it already exists
2. Search existing feature requests
3. Consider if it fits the project scope

**Feature request should include:**
- Clear, descriptive title
- Problem it solves
- Proposed solution
- Alternative solutions considered
- Additional context

### Pull Requests

#### Process

1. **Fork the repository**
   ```bash
   # Click "Fork" on GitHub
   git clone https://github.com/YOUR_USERNAME/Poster-scanner-2-.git
   ```

2. **Create a branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Make your changes**
   - Write clean, documented code
   - Follow existing code style
   - Add tests if applicable
   - Update documentation

4. **Test your changes**
   ```bash
   npm run build
   npm run preview
   ```

5. **Commit your changes**
   ```bash
   git add .
   git commit -m 'feat: add amazing feature'
   ```

6. **Push to your fork**
   ```bash
   git push origin feature/amazing-feature
   ```

7. **Open a Pull Request**
   - Go to the original repository
   - Click "New Pull Request"
   - Select your fork and branch
   - Fill out the PR template

#### PR Guidelines

**Title:**
- Use conventional commit format
- Be clear and descriptive
- Example: `feat(mobile): add swipe gestures`

**Description:**
- What changes were made
- Why the changes were needed
- How to test the changes
- Related issues (if any)
- Screenshots (if UI changes)

**Checklist:**
- [ ] Code follows project style
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] No new warnings
- [ ] Tests added/updated
- [ ] All tests pass
- [ ] Works on mobile and desktop

### Code Style

#### JavaScript/React

```javascript
// Use functional components
const MyComponent = () => {
  // Use hooks
  const [state, setState] = useState(initialState);
  
  // Use useCallback for event handlers
  const handleClick = useCallback(() => {
    // Handle click
  }, [dependencies]);
  
  // Early returns for conditions
  if (!data) return null;
  
  return (
    <div className="container">
      {/* JSX */}
    </div>
  );
};

// Export at bottom
export default MyComponent;
```

#### Naming Conventions

- Components: `PascalCase`
- Functions: `camelCase`
- Constants: `UPPER_SNAKE_CASE`
- CSS classes: `kebab-case`
- Files: `PascalCase.jsx` for components, `camelCase.js` for utilities

#### Comments

```javascript
// Single line comments for brief explanations

/**
 * Multi-line comments for:
 * - Function descriptions
 * - Complex logic
 * - API documentation
 */

// TODO: Future improvements
// FIXME: Known issues to address
// NOTE: Important information
```

#### CSS/Styling

```jsx
// Prefer inline Tailwind-like classes
<div className="flex items-center justify-center p-4 bg-purple-600">

// For dynamic styles, use inline
<div style={{ opacity: isVisible ? 1 : 0 }}>

// Complex styles in style tag
<style>{`
  .custom-animation {
    animation: fadeIn 0.3s ease-out;
  }
`}</style>
```

### Commit Messages

**Format:**
```
type(scope): subject

[optional body]

[optional footer]
```

**Types:**
- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation only
- `style` - Code style/formatting
- `refactor` - Code restructuring
- `perf` - Performance improvement
- `test` - Adding tests
- `chore` - Maintenance tasks

**Examples:**
```
feat(api): add support for GPT-4 Vision

fix(mobile): resolve iOS touch event issue

docs(readme): update installation instructions

perf(animations): optimize particle rendering
```

### Development Workflow

1. **Setup**
   ```bash
   npm install
   npm run dev
   ```

2. **Make changes**
   - Edit files in `src/`
   - Changes hot-reload automatically

3. **Test**
   - Test in browser
   - Test on mobile (if applicable)
   - Verify all features work

4. **Build**
   ```bash
   npm run build
   ```

5. **Preview**
   ```bash
   npm run preview
   ```

### Testing

#### Manual Testing

**Web:**
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

**Mobile:**
- [ ] iOS Safari
- [ ] Android Chrome
- [ ] Responsive design (DevTools)

**Features:**
- [ ] Image upload (drag & drop)
- [ ] Image upload (click)
- [ ] Image analysis
- [ ] Results display
- [ ] Image removal
- [ ] Multiple images
- [ ] Animations smooth

**Performance:**
- [ ] 60+ FPS animations
- [ ] Fast page load (<3s)
- [ ] Smooth scrolling
- [ ] No memory leaks

### Documentation

**Update when:**
- Adding new features
- Changing existing features
- Fixing bugs
- Improving performance

**Files to update:**
- `README.md` - Main documentation
- `docs/Installation.md` - Installation steps
- `docs/User-Guide.md` - Usage instructions
- `docs/Development.md` - Developer guide
- `docs/Troubleshooting.md` - Known issues

### Review Process

1. **Automated checks** run on PR
2. **Maintainers review** code
3. **Feedback** may be requested
4. **Approval** from maintainer
5. **Merge** into main branch

**Review criteria:**
- Code quality
- Performance impact
- Documentation
- Test coverage
- Browser compatibility

## Project Structure

```
Poster-scanner-2-/
├── .github/           # GitHub-specific files
│   └── workflows/     # CI/CD workflows
├── docs/              # Documentation
├── public/            # Static assets
├── src/               # Source code
│   ├── App.jsx        # Main component
│   ├── main.jsx       # Entry point
│   └── index.css      # Global styles
├── index.html         # HTML template
├── vite.config.js     # Build config
└── package.json       # Dependencies
```

## Getting Help

### Resources

- **Documentation**: [docs/](docs/)
- **Issues**: [GitHub Issues](https://github.com/anacondy/Poster-scanner-2-/issues)
- **Discussions**: [GitHub Discussions](https://github.com/anacondy/Poster-scanner-2-/discussions)

### Questions?

- Check [existing issues](https://github.com/anacondy/Poster-scanner-2-/issues)
- Search [discussions](https://github.com/anacondy/Poster-scanner-2-/discussions)
- Ask in [new discussion](https://github.com/anacondy/Poster-scanner-2-/discussions/new)

## Recognition

Contributors are recognized:
- Listed in README
- Mentioned in release notes
- GitHub contributor badge

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing! 🎉
