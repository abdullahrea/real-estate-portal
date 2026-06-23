# Design Audit & Accessibility Report

**Project:** Theme Park View Real Estate Portal  
**Date:** June 20, 2026  
**Auditor:** Visual & Accessibility Auditor  

---

## 1. Visual Contrast & Accessibility (a11y) Issues

The portal aims for a premium monochrome design system (black, white, gray). However, the variable `--primary-orange` was mapped to `#111111` (primary black), causing critical black-on-black accessibility and visibility failures on dark-background elements.

### 1.1 Invisible Stars in Hero Section
* **File:** css/style.css (line 358)
* **CSS Class:** `.hero-rating .stars`
* **Issue:** Uses `color: var(--primary-orange);` (which evaluates to `#111111`). The hero section has a dark background gradient, and `.hero-rating` has a dark background `rgba(255, 255, 255, 0.08)`. This makes the stars black-on-black and completely invisible.
* **Impact:** Critical visual failure; testimonials stars cannot be seen.

### 1.2 Invisible Hero Title Highlight
* **File:** css/style.css (line 378)
* **CSS Class:** `.hero-title .highlight`
* **Issue:** Uses `color: var(--primary-orange);` (`#111111`) on the dark hero background. The highlighted text "آسان اقساط پر" is completely invisible.
* **Impact:** Critical readability issue; visitors cannot read the main heading.

### 1.3 Invisible CTA Primary Button in Hero
* **File:** css/style.css (line 409)
* **CSS Class:** `.btn-hero-primary`
* **Issue:** Background is set to `var(--primary-orange)` (`#111111`) on the dark hero background. The button blends completely into the background, leaving only its text visible, making it look broken and non-interactive.
* **Impact:** High conversion drop; primary call-to-action is visually hidden.

### 1.4 Invisible Accent Row Borders and Text in Calculator Card
* **File:** css/style.css (lines 1175 and 1193)
* **CSS Class:** `.result-row.accent-row` and `.result-row.accent-row .res-value`
* **Issue:** The calculator results card has a dark background (`#111111` to `#2A2A2C`). The accent row's bottom border and text value use `var(--primary-orange)` (`#111111`), making the border and key price value completely invisible.
* **Impact:** Critical functional bug; users cannot see the "Advance Down Payment" value.

### 1.5 Invisible Footer Top Border and Heading Lines
* **File:** css/style.css (lines 1394 and 1428)
* **CSS Class:** `.footer` (border-top) and `.footer-col h4::after`
* **Issue:** The footer background is `var(--espresso-black)` (`#111111`). The top border and section underline elements use `var(--primary-orange)` (`#111111`), rendering them completely invisible.
* **Impact:** Design inconsistency; loss of clean layout dividers.

### 1.6 Invisible Hover States in Footer
* **File:** css/style.css (lines 1495 and 1520)
* **CSS Class:** `.footer-links a:hover` and `.contact-link:hover`
* **Issue:** On hover, footer links change color to `var(--primary-orange)` (`#111111`), which makes them disappear into the black footer background.
* **Impact:** Poor user experience; hover states act as visual cloaking.

### 1.7 Low Contrast Text Elements
* **File:** css/style.css (lines 1229, 1448, 1553)
* **CSS Class:** `.whatsapp-disclaimer`, `.footer-desc`, `.footer-bottom`
* **Issue:** Uses `rgba(255,255,255,0.4)` on dark backgrounds, yielding a contrast ratio of ~2.8:1, which is below the WCAG AA minimum of 4.5:1.
* **Impact:** Accessibility barrier for low-vision users.

---

## 2. Layout, Font, & Spacing Improvements

### 2.1 Urdu Heading Text Overlap
* **File:** css/style.css (lines 369, 581, 748, 1070)
* **CSS Class:** `.hero-title`, `.jallo-video-title`, `.Jallo-main-title`, `.calc-title`
* **Issue:** These headers combine Urdu Noto font family and a small `line-height: 1.4;`. When text wraps on smaller screens or mobile viewports, the Urdu letters (which have high vertical strokes) overlap.
* **Recommendation:** Increase heading `line-height` to `1.8` for Urdu text classes to avoid overlap.

### 2.2 Unresolved CSS Variables
* **File:** css/style.css (lines 501, 597)
* **CSS Variable:** `var(--charcoal-night)`
* **Issue:** Referenced in `.hero-image-card` and `.video-player-card` backgrounds but is never defined in `:root`. Falls back to transparent.
* **Recommendation:** Define `--charcoal-night: #1C1C1E;` in `:root`.

### 2.3 Font Load Discrepancy
* **File:** css/style.css (line 17)
* **Issue:** `--font-main` falls back immediately to system fonts because `'Inter'` is not loaded in `index.html`. `Poppins` is loaded but not defined as main font.
* **Recommendation:** Prepend `'Poppins'` to `--font-main` to use the loaded font.

### 2.4 Hardcoded Non-Monochrome Colors
* **File:** css/style.css (lines 697, 818, 838, 867)
* **Issue:** Hardcoded brownish colors (`#F0EDE9` and `#eae8e5`) break the strict monochrome color palette.
* **Recommendation:** Replace them with shades from the design system, e.g., `var(--border-gray)` and `var(--secondary-gray)`.

---

## 3. Data Inconsistencies & Typos

### 3.1 Typos in constructed home prices (2.5 Marla Single)
* **Files:** index.html (line 168), js/app.js (line 10)
* **Issue:** Total price listed as `2,00,000` (two hundred thousand) instead of `2,000,000` (two million), which conflicts with the test assertion.
* **Recommendation:** Correct `2,00,000` to `2,000,000` in both files.

---

## 4. Proposed Fixes

To resolve all findings:

* **variables:** Define `--charcoal-night` and fix `--font-main`
* **hero rating:** stars color to `var(--true-white)`
* **hero title:** highlight color to `var(--true-white)`
* **hero button:** `btn-hero-primary` background to `var(--true-white)`, color to `var(--primary-black)`, and hover background to `var(--secondary-gray)`
* **calculator details:** accent-row border to translucent white, text color to `var(--true-white)`
* **footer adjustments:** border-top and header line to `var(--border-gray)`, hover state colors to `var(--true-white)`, contact link hover border to `var(--true-white)`
* **line-height overrides:** change Urdu headers to use `line-height: 1.8`
* **hardcoded color updates:** substitute non-monochrome colors with system gray variables.
