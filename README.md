# 🍝 Italian Food Restaurant Website

## 🚀 Quick Start

### Method 1: Using Python (Recommended)
```bash
# Navigate to project directory
cd italian-food

# Start local server
python -m http.server 8000

# Open browser and go to:
# http://localhost:8000/index.html
```

### Method 2: Using Live Server (VS Code)
1. Install "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"

## 📁 Project Structure

```
italian-food/
├── 📄 index.html          # Main HTML file
├── 🎨 style.css           # Optimized CSS (715 lines)
├── 🚀 main.js             # Main JavaScript module
├── 🛒 cart.js             # Cart functionality
├── 🎨 ui.js               # UI and modals
├── ✨ animations.js       # GSAP animations
└── 📁 images/             # Image assets
```

## 🔧 Features

- ✅ **ES6 Modules** - Modern JavaScript architecture
- ✅ **Responsive Design** - Mobile-first approach
- ✅ **Accessibility** - WCAG 2.1 compliant
- ✅ **Animations** - GSAP-powered smooth animations
- ✅ **Cart System** - Full shopping cart functionality
- ✅ **Modal Windows** - Order and menu modals
- ✅ **Swiper Slider** - Touch-friendly navigation

## 🎯 Key Improvements Made

### 1. **Modular JavaScript Architecture**
- Split `script.js` (708 lines) into 4 focused modules
- Eliminated circular dependencies
- Added proper error handling

### 2. **Optimized CSS**
- Reduced from 2,426 lines to 715 lines (73% reduction)
- Used CSS variables for maintainability
- Eliminated code duplication

### 3. **Enhanced Accessibility**
- Semantic HTML5 elements (`<section>`, `<button>`)
- ARIA labels and descriptions
- Keyboard navigation support
- Screen reader compatibility

### 4. **Improved Performance**
- Lazy loading for images
- Optimized animations
- Reduced bundle size

## 🌐 Browser Support

- ✅ Chrome 80+
- ✅ Firefox 75+
- ✅ Safari 13+
- ✅ Edge 80+

## 📱 Mobile Support

- ✅ Responsive design
- ✅ Touch gestures
- ✅ Mobile-optimized animations
- ✅ Adaptive ingredient positioning

## 🐛 Troubleshooting

### White Screen Issue
**Problem:** Website shows white screen
**Solution:** Always use local server (not file:// protocol)

### Module Loading Errors
**Problem:** "Cannot resolve module" errors
**Solution:** Check file paths in import statements

### Animation Issues
**Problem:** Animations not working
**Solution:** Ensure GSAP library is loaded before main.js

## 🎨 Customization

### Colors
Edit CSS variables in `style.css`:
```css
:root {
    --panini-bg: #F5EFE1;
    --pizza-bg: #D9534F;
    --pasta-bg: #849458;
    --bevande-bg: #4A90E2;
}
```

### Ingredients
Modify ingredient positions in CSS variables:
```css
:root {
    --panini-rucola-1-top: 5%;
    --panini-rucola-1-right: 20%;
    --panini-rucola-1-width: 300px;
}
```

## 📞 Support

If you encounter any issues:
1. Check browser console (F12)
2. Ensure you're using local server
3. Verify all files are present
4. Check network tab for failed requests

---

**Buon appetito! 🇮🇹**
