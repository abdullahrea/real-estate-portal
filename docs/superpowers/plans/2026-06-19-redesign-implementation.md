# Redesign Spec: Theme Park View Website Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the real estate landing page into an Urdu-only, premium, highly-simplified layout with dynamic city-based filtering, black/white/gray colors, custom SVGs, direct Google Maps redirects, and zero emojis.

**Architecture:** Use basic CSS classes for white/black/gray styling, HTML `<meta>` tags to block translation, and a light JavaScript event listener to filter page elements dynamically based on a custom `data-city` attribute when the top city pills are clicked.

**Tech Stack:** Vanilla HTML5, CSS3, ES6 JavaScript.

## Global Constraints
* No orange or yellow color accents (only `#FFFFFF`, `#111111`, `#000000`, and grays like `#F5F5F7`, `#E5E5EA`, `#8E8E93`).
* No emojis anywhere in the markup.
* No English translation text or bilingual labels (Urdu only, except numeric values or brand name).
* Add `<meta name="google" content="notranslate">` to head.
* All buttons must be pill-shaped (`border-radius: 100px`).
* All cards and players must have rounded corners (`border-radius: 20px`).
* Gujranwala added as a selectable location.
* Map cards must show satellite map image screenshots instead of gray placeholders.

---

## Proposed Changes

### Task 1: Setup Translation Guard and Global CSS Tokens

**Files:**
* Modify: [style.css](file:///Users/Apple/.gemini/antigravity/scratch/real-estate-portal/css/style.css)
* Modify: [index.html](file:///Users/Apple/.gemini/antigravity/scratch/real-estate-portal/index.html)

**Interfaces:**
* None

- [ ] **Step 1: Add meta tag to block browser translations**

In `index.html`, add `<meta name="google" content="notranslate">` inside the `<head>` tag.

```html
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="google" content="notranslate">
  <meta name="description" content="Theme Park View Housing Society Pakistan - اپنا گھر حاصل کریں آسان اقساط پر بغیر Advance">
  <title>Theme Park View Housing Society Pakistan</title>
```

- [ ] **Step 2: Update CSS design tokens to white, black, and gray**

In `css/style.css`, modify the `:root` variables to define the new black, white, and gray system:

```css
:root {
  --primary-black: #111111;
  --primary-black-hover: #000000;
  --secondary-gray: #F5F5F7;
  --border-gray: #E5E5EA;
  --text-gray: #8E8E93;
  --true-white: #FFFFFF;
  --ink-black: #0A0A0A;
  --slate-gray: #6B6B6B;
  --mint-green: #22C55E;
  
  --font-main: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-urdu: 'Noto Nastaliq Urdu', 'Noto Sans Arabic', sans-serif;
  
  --ease-out-standard: cubic-bezier(0.0, 0.0, 0.2, 1);
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
}
```

- [ ] **Step 3: Define hidden class and pill styling**

Add the `.hidden` class to style.css for dynamic city filtering:

```css
.hidden {
  display: none !important;
}
```

Ensure all buttons have pill styling:

```css
.btn-nav-cta, .btn-hero-primary, .btn-hero-secondary, .btn-whatsapp-booking, .btn-location-map, .tab-btn {
  border-radius: 100px !important;
}
```

- [ ] **Step 4: Commit changes to Git**

```bash
git add index.html css/style.css
git commit -m "style: add translation guard and white-black-gray CSS tokens"
```

---

### Task 2: Redesign Navigation and Add Top City Selector Pill-Bar

**Files:**
* Modify: [index.html](file:///Users/Apple/.gemini/antigravity/scratch/real-estate-portal/index.html)
* Modify: [css/style.css](file:///Users/Apple/.gemini/antigravity/scratch/real-estate-portal/css/style.css)

**Interfaces:**
* Consumes: Global CSS tokens from Task 1

- [ ] **Step 1: Simplify navigation and remove emojis**

In `index.html`, modify `<header class="header-nav">` to remove emojis (`🏡`) and English translation subtitles/subtexts. Also update the styling of the header in `css/style.css` to match the new white/black/gray palette.

- [ ] **Step 2: Add City Selector Pill-Bar in index.html**

Add the city selector element right below the navbar or inside the Hero section:

```html
<div class="city-selector-container container">
  <div class="city-selector-bar">
    <button class="city-btn active" data-city="lahore">لاہور</button>
    <button class="city-btn" data-city="gujranwala">گوجرانوالہ</button>
    <button class="city-btn" data-city="faisalabad">فیصل آباد</button>
    <button class="city-btn" data-city="okara">اوکاڑہ</button>
    <button class="city-btn" data-city="rawalpindi">راولپنڈی</button>
  </div>
</div>
```

- [ ] **Step 3: Style the City Selector Pill-Bar**

In `css/style.css`, add the layout for the selector bar:

```css
.city-selector-container {
  margin-top: 30px;
  margin-bottom: 20px;
  text-align: center;
}

.city-selector-bar {
  display: inline-flex;
  gap: 12px;
  background: var(--secondary-gray);
  padding: 8px;
  border-radius: 100px;
  border: 1px solid var(--border-gray);
}

.city-btn {
  border: none;
  background: none;
  font-family: var(--font-urdu);
  font-size: 16px;
  font-weight: 700;
  padding: 10px 24px;
  border-radius: 100px;
  cursor: pointer;
  color: var(--ink-black);
  transition: all 0.2s var(--ease-out-standard);
}

.city-btn.active {
  background: var(--primary-black);
  color: var(--true-white);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}
```

- [ ] **Step 4: Commit changes to Git**

```bash
git add index.html css/style.css
git commit -m "feat: add top city selector pill-bar and simplify nav header"
```

---

### Task 3: Implement Dynamic Filtering Logic in JavaScript

**Files:**
* Modify: [js/app.js](file:///Users/Apple/.gemini/antigravity/scratch/real-estate-portal/js/app.js)
* Modify: [index.html](file:///Users/Apple/.gemini/antigravity/scratch/real-estate-portal/index.html)

**Interfaces:**
* Consumes: City Selector DOM elements from Task 2
* Produces: Filtered view of map cards and walkthrough sections

- [ ] **Step 1: Add city attributes to HTML elements**

In `index.html`, add `data-city="..."` tags to specify which cities they belong to:
* Jallo Phase: `data-city="lahore"`
* Babu Sabu/Saggian/Chung/KSK: `data-city="lahore"`
* Faisalabad (Jaranwala) map card: `data-city="faisalabad"`
* Okara map card: `data-city="okara"`
* Rawalpindi map card: `data-city="rawalpindi"`
* Walkthrough video sections: add `data-city="lahore"` or relevant city tags.
* Add a placeholder section or message for Gujranwala: `data-city="gujranwala"`.

- [ ] **Step 2: Add JS event listener to handle city selection**

In `js/app.js`, add a filter function:

```javascript
function filterByCity(selectedCity) {
  // Update button active state
  document.querySelectorAll('.city-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-city') === selectedCity);
  });

  // Filter elements by data-city
  document.querySelectorAll('[data-city]').forEach(el => {
    const cities = el.getAttribute('data-city').split(' ');
    if (cities.includes(selectedCity)) {
      el.classList.remove('hidden');
    } else {
      el.classList.add('hidden');
    }
  });

  // Update calculator location selection automatically
  const calcLoc = document.getElementById('calc-loc');
  if (calcLoc) {
    if (selectedCity === 'lahore') {
      calcLoc.value = 'jallo';
    } else if (selectedCity === 'faisalabad') {
      calcLoc.value = 'jaranwala';
    } else if (selectedCity === 'okara') {
      calcLoc.value = 'okara';
    } else if (selectedCity === 'rawalpindi') {
      calcLoc.value = 'rawalpindi';
    } else if (selectedCity === 'gujranwala') {
      calcLoc.value = 'gujranwala';
    }
    // trigger change event to refresh calculator calculations
    calcLoc.dispatchEvent(new Event('change'));
  }
}
```

Attach to button clicks:

```javascript
document.querySelectorAll('.city-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const city = btn.getAttribute('data-city');
    filterByCity(city);
    localStorage.setItem('selected-city', city);
  });
});

// Run default city filter on load
const defaultCity = localStorage.getItem('selected-city') || 'lahore';
filterByCity(defaultCity);
```

- [ ] **Step 3: Add Gujranwala option in Calculator dropdown**

In `index.html`, add `<option value="gujranwala">گوجرانوالہ (Gujranwala)</option>` inside `<select id="calc-loc">`.

- [ ] **Step 4: Commit changes to Git**

```bash
git add js/app.js index.html
git commit -m "feat: implement JavaScript dynamic city filtering and sync with calculator"
```

---

### Task 4: Redesign Walkthroughs (Remove Long Video/Transcript & Emojis)

**Files:**
* Modify: [index.html](file:///Users/Apple/.gemini/antigravity/scratch/real-estate-portal/index.html)
* Modify: [css/style.css](file:///Users/Apple/.gemini/antigravity/scratch/real-estate-portal/css/style.css)

**Interfaces:**
* None

- [ ] **Step 1: Remove long 3.33-minute video section and its transcript box**

In `index.html`, delete the left side column under Jallo phase containing `#jallo-player-container` and the `.transcript-box`. Replace it with a clean minimalist image card or simply structure the Jallo details to occupy the full width (or combine with other short videos).
Also, remove all emojis like `🛣️`, `⚡`, `🔑`, `📅`, `🏠`, `📈` from walkthrough text headers.

- [ ] **Step 2: Add custom SVGs in place of emojis**

Replace emojis with inline SVG shapes in `index.html`. For example, a simple bullet point marker SVG:

```html
<svg class="bullet-svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 16 16 12 12 8"></polyline><line x1="8" y1="12" x2="16" y2="12"></line></svg>
```

- [ ] **Step 3: Update CSS layout to support white-black-gray theme**

Style the walkthrough blocks to use pure white cards, fine gray borders, and zero orange highlights. Let's make the pricing tables and headings look extremely clean.

- [ ] **Step 4: Commit changes to Git**

```bash
git add index.html css/style.css
git commit -m "feat: remove long video transcript and replace emojis with custom SVGs"
```

---

### Task 5: Redesign Maps Grid with Generated Images and Direct Map Link Redirection

**Files:**
* Modify: [index.html](file:///Users/Apple/.gemini/antigravity/scratch/real-estate-portal/index.html)
* Modify: [css/style.css](file:///Users/Apple/.gemini/antigravity/scratch/real-estate-portal/css/style.css)

**Interfaces:**
* Consumes: Generated map images in `images/`

- [ ] **Step 1: Link generated map images to card classes**

In `css/style.css`, update the `.card-map-mock` styles to reference the new generated map screenshots instead of gray gradients:

```css
.card-map-mock.lahore-map {
  background-image: url('../images/map_lahore.png');
  background-size: cover;
  background-position: center;
}

.card-map-mock.faisalabad-map {
  background-image: url('../images/map_faisalabad.png');
  background-size: cover;
  background-position: center;
}

.card-map-mock.gujranwala-map {
  background-image: url('../images/map_gujranwala.png');
  background-size: cover;
  background-position: center;
}
```

- [ ] **Step 2: Update HTML cards to open Google Maps directly on click**

In `index.html`, wrap the entire `.location-card` or its name header in a link to Google Maps, ensuring clicking any society name redirects the user directly:

```html
<div class="location-card" onclick="window.open('https://maps.google.com/?q=31.532780,74.237897', '_blank')" style="cursor: pointer;">
  <div class="card-map-mock lahore-map"></div>
  <div class="location-card-content">
    <h3 class="urdu-text card-loc-title">لاہور (بابو صابو)</h3>
  </div>
</div>
```

Ensure all English translation texts (such as subtitles like `Babu Sabu, Lahore`) are removed.

- [ ] **Step 3: Commit changes to Git**

```bash
git add index.html css/style.css
git commit -m "feat: integrate map image screenshots and enable click-to-redirect on map cards"
```

---

### Task 6: Redesign Installment Calculator and WhatsApp Form

**Files:**
* Modify: [index.html](file:///Users/Apple/.gemini/antigravity/scratch/real-estate-portal/index.html)
* Modify: [css/style.css](file:///Users/Apple/.gemini/antigravity/scratch/real-estate-portal/css/style.css)
* Modify: [js/app.js](file:///Users/Apple/.gemini/antigravity/scratch/real-estate-portal/js/app.js)

**Interfaces:**
* None

- [ ] **Step 1: Remove English details from calculator UI**

In `index.html`, remove all English translation texts from labels like `لوکیشن (Location)` and `پلان کی قسم (Plan Type)`. Make them purely `لوکیشن`, `پلان کی قسم`, etc.
Also, simplify results labels from `کل قیمت (Total Price):` to `کل قیمت:` and remove all emojis from the calculator card.

- [ ] **Step 2: Add Gujranwala calculator handling**

Ensure that selecting Gujranwala shows "رابطہ کریں" in the calculator fields.
Verify `js/app.js` updates:

```javascript
// js/app.js should calculate and handle gujranwala value which defaults to 'رابطہ کریں'
```

- [ ] **Step 3: Style the booking button as a black pill with a WhatsApp SVG**

In `css/style.css`, update the booking button styling to match the white-black-gray scheme:

```css
.btn-whatsapp-booking {
  background: var(--primary-black) !important;
  color: var(--true-white) !important;
  border-radius: 100px !important;
  box-shadow: 0 4px 16px rgba(0,0,0,0.15) !important;
}

.btn-whatsapp-booking:hover {
  background: var(--primary-black-hover) !important;
}
```

- [ ] **Step 4: Commit changes to Git**

```bash
git add index.html css/style.css js/app.js
git commit -m "feat: redesign calculator UI and WhatsApp contact button to match theme"
```

---

### Task 7: Unit Testing and Verification

**Files:**
* Modify: [tests/calculator.test.js](file:///Users/Apple/.gemini/antigravity/scratch/real-estate-portal/tests/calculator.test.js)

**Interfaces:**
* Consumes: `calculatePrice` from [js/app.js](file:///Users/Apple/.gemini/antigravity/scratch/real-estate-portal/js/app.js)

- [ ] **Step 1: Write test to verify Gujranwala returns null pricing**

In `tests/calculator.test.js`, add a test for Gujranwala:

```javascript
test('calculatePrice Gujranwala returns null', () => {
  const result = calculatePrice('gujranwala', 'constructed', '3marla', 'single');
  assert.equal(result, null);
});
```

- [ ] **Step 2: Run all unit tests**

Run: `node --test tests/calculator.test.js`
Expected: All tests pass (5 passing tests).

- [ ] **Step 3: Verify dynamic city selector and maps click behavior**

Open `index.html` locally and verify:
1. Translating is blocked (no popups in Chrome).
2. Tapping on a city updates the page immediately.
3. Map cards show satellite map screenshots.
4. Emojis are completely removed.
5. All buttons are pill-shaped.

- [ ] **Step 4: Commit changes to Git**

```bash
git add tests/calculator.test.js
git commit -m "test: add Gujranwala pricing test and verify all tests pass"
```
