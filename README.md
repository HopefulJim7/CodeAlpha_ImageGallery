# Snapshots: Image Gallery

A responsive image gallery with a lightbox viewer and category filters. Built for the **CodeAlpha Frontend Development Internship (Task 1)**.

## Features
- Responsive CSS Grid layout that adapts from desktop to mobile without media queries
- Hover zoom and caption overlay with smooth transitions
- Lightbox with next/previous buttons, wrap-around navigation and a counter
- Keyboard support: `Enter` to open, `←` `→` to navigate, `Esc` to close
- Category filters (All, Nature, City); the lightbox only cycles through the filtered images
- Basic accessibility: alt text, focus styles, focus returns to the clicked image, reduced-motion support

## Built with
HTML5, CSS3 (Grid, Flexbox, custom properties), vanilla JavaScript (ES6)

## Project structure
```
CodeAlpha_ImageGallery/
├── index.html
├── css/style.css
├── js/main.js
├── images/
└── README.md
```

## Getting started
1. Clone the repository.
2. Open `index.html` in a browser. No build step or dependencies.

The sample photos load from picsum.photos. To use your own, put images in `images/` and update the `photos` array in `js/main.js`.

## What I learned
- Writing responsive layouts with `auto-fill` and `minmax()`
- Event delegation: one listener on the grid instead of one per image
- Keeping state (`visiblePhotos`, `currentIndex`) separate from rendering
- Managing focus and keyboard input for a modal dialog

## Possible improvements
- Swipe gestures on touch screens
- Image preloading for faster navigation
- Loading photos from an API

## Author
**Jim** · [GitHub](https://github.com/HopefulJim7) · [LinkedIn](https://linkedin.com/in/jim-hope-474430303)
