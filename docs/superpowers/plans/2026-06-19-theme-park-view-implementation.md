# Theme Park View Housing Society Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a premium, high-conversion static real estate landing website for Theme Park View Housing Society, integrating Urdu taglines, unzipped video transcripts, and an interactive WhatsApp down-payment calculator.

**Architecture:** A fast, responsive single-page web app built with semantic HTML5, custom CSS3 flex/grid design system (dark hero, light body theme), and vanilla JavaScript. Tests are written using the native Node.js test runner (`node --test`).

**Tech Stack:** HTML5, CSS3, JavaScript (ES6+), Node.js (v18+ test runner).

## Global Constraints
*   Primary Brand Color: Ember Orange (`#E2612A`) used only for CTAs, highlighted text, active states.
*   Urdu typography fallback: `Noto Nastaliq Urdu`, `Noto Sans Arabic`, sans-serif.
*   Map links and pricing details must be exactly matched from the specification.
*   Fully responsive layout: Mobile shows video on top and description/tables below.

---

### Task 1: Scaffolding, Base Files & TDD Setup

**Files:**
- Create: `index.html`
- Create: `css/style.css`
- Create: `js/app.js`
- Create: `tests/calculator.test.js`

**Interfaces:**
- Consumes: None (starting task)
- Produces: `calculatePrice(location, category, size, story)` returning `{ total, advance, installment }`

- [ ] **Step 1: Write the failing test**
  Create `tests/calculator.test.js` with the following code:
  ```javascript
  const assert = require('node:assert');
  const test = require('node:test');
  const { calculatePrice } = require('../js/app.js');

  test('calculatePrice returns correct pricing for Jallo Constructed Homes', () => {
    const result = calculatePrice('jallo', 'constructed', '3marla', 'double');
    assert.deepEqual(result, {
      total: '4,500,000',
      advance: '800,000',
      installment: '30,000'
    });
  });
  ```

- [ ] **Step 2: Run the test to verify it fails**
  Run: `node --test tests/calculator.test.js`
  Expected: FAIL (Cannot find module '../js/app.js' or calculatePrice is not a function)

- [ ] **Step 3: Write minimal implementation**
  Create `js/app.js` with the export and function:
  ```javascript
  function calculatePrice(location, category, size, story) {
    if (location === 'jallo' && category === 'constructed' && size === '3marla' && story === 'double') {
      return { total: '4,500,000', advance: '800,000', installment: '30,000' };
    }
    return null;
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { calculatePrice };
  }
  ```

- [ ] **Step 4: Run the test to verify it passes**
  Run: `node --test tests/calculator.test.js`
  Expected: PASS

- [ ] **Step 5: Create index.html and css/style.css skeletons**
  Create a basic HTML5 skeleton in `index.html` and define CSS custom properties in `css/style.css`:
  ```css
  :root {
    --primary-orange: #E2612A;
    --espresso-black: #110A04;
    --charcoal-night: #1A1A1A;
    --soft-cloud: #F5F4F2;
    --true-white: #FFFFFF;
    --ink-black: #0A0A0A;
    --slate-gray: #6B6B6B;
    --mint-green: #22C55E;
  }
  ```

- [ ] **Step 6: Commit**
  Run:
  ```bash
  git add index.html css/style.css js/app.js tests/calculator.test.js
  git commit -m "feat: setup project skeleton and TDD calculator test"
  ```

---

### Task 2: Global Shell Elements (Promo Bar, Floating Navbar, Footer)

**Files:**
- Modify: `index.html`
- Modify: `css/style.css`
- Modify: `js/app.js`

**Interfaces:**
- Consumes: Scaffolding files
- Produces: Visual layouts for top promotional bar, pill sticky navbar, and footer

- [ ] **Step 1: Write markup for Promo Bar, Navbar, and Footer**
  In `index.html`, add:
  ```html
  <div class="promo-bar" id="promo-bar">
    <span>محدود وقت کی خصوصی پیشکش (VIP کارڈ سہولت) - Offer Ends In <strong id="countdown-timer">23:06:40</strong></span>
    <span class="promo-badge">Get 15% Off (Overseas) ✈️</span>
  </div>
  <nav class="nav-pill">
    <div class="nav-logo">Theme Park View</div>
    <div class="nav-links">
      <a href="#hero">Home</a>
      <a href="#jallo">Jallo Phase</a>
      <a href="#other-locations">Locations</a>
      <a href="#calculator">Calculator</a>
      <a href="#amenities">Amenities</a>
    </div>
    <a href="#calculator" class="nav-cta">بکنگ کروائیں</a>
  </nav>
  ```

- [ ] **Step 2: Add CSS for Global Layout**
  Styling the promo-bar and nav-pill:
  ```css
  .promo-bar {
    background: var(--primary-orange);
    color: var(--true-white);
    height: 48px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 24px;
    font-size: 14px;
  }
  .nav-pill {
    position: sticky;
    top: 12px;
    max-width: 1100px;
    margin: 12px auto;
    background: rgba(240, 237, 233, 0.85);
    backdrop-filter: blur(12px);
    border-radius: 100px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 24px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.06);
    z-index: 1000;
  }
  ```

- [ ] **Step 3: Implement Countdown Timer JS**
  In `js/app.js`, add code to calculate a mock 24h countdown.
  ```javascript
  function startCountdown(durationSecs) {
    let timer = durationSecs;
    const display = document.getElementById('countdown-timer');
    if (!display) return;
    setInterval(() => {
      let hours = Math.floor(timer / 3600);
      let minutes = Math.floor((timer % 3600) / 60);
      let seconds = timer % 60;
      display.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
      if (--timer < 0) timer = durationSecs;
    }, 1000);
  }
  ```

- [ ] **Step 4: Commit**
  Run:
  ```bash
  git add index.html css/style.css js/app.js
  git commit -m "feat: add promo bar, floating navbar, and countdown timer"
  ```

---

### Task 3: Entry Selector Modal & Hero Section

**Files:**
- Modify: `index.html`
- Modify: `css/style.css`
- Modify: `js/app.js`

**Interfaces:**
- Consumes: Floating navbar and page wrapper
- Produces: Entrance modal filter quiz, Hero section

- [ ] **Step 1: Create Entrance Modal Markup & Style**
  Add modal container in `index.html`:
  ```html
  <div id="entry-modal" class="modal-overlay">
    <div class="modal-content">
      <h2>آپ اپنا گھر کس شہر/علاقے میں بنانا چاہتے ہیں؟</h2>
      <p>Where would you like to build your home?</p>
      <div class="modal-options">
        <button class="modal-opt" data-target="jallo">Lahore (Jallo Phase - G.T Road)</button>
        <button class="modal-opt" data-target="other-locations">Lahore (Babu Sabu / Saggian / Chung)</button>
        <button class="modal-opt" data-target="other-locations">Faisalabad (Jaranwala)</button>
        <button class="modal-opt" data-target="other-locations">Okara / Rawalpindi</button>
      </div>
    </div>
  </div>
  ```

- [ ] **Step 2: Add JS logic to display and handle quiz selection**
  Add to `js/app.js`:
  ```javascript
  document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('entry-modal');
    if (!localStorage.getItem('society-location-quiz')) {
      modal.classList.add('active');
    }
    document.querySelectorAll('.modal-opt').forEach(btn => {
      btn.addEventListener('click', (e) => {
        localStorage.setItem('society-location-quiz', e.target.dataset.target);
        modal.classList.remove('active');
        const targetSection = document.getElementById(e.target.dataset.target);
        if (targetSection) targetSection.scrollIntoView({ behavior: 'smooth' });
      });
    });
  });
  ```

- [ ] **Step 3: Build Hero Section with Urdu Display Typography**
  Create a dual-column Hero Section in `index.html` and write CSS for `radial-gradient` glow:
  ```css
  .hero {
    background: radial-gradient(ellipse 70% 60% at 25% 50%, #3D1A08 0%, #110A04 60%, #0A0805 100%);
    min-height: 85vh;
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    padding: 80px 40px;
    color: var(--true-white);
  }
  ```

- [ ] **Step 4: Commit**
  Run:
  ```bash
  git add index.html css/style.css js/app.js
  git commit -m "feat: implement entrance modal quiz and hero section styling"
  ```

---

### Task 4: Location Showcase, Video Transcript Dialogs & Google Maps Coordinates

**Files:**
- Modify: `index.html`
- Modify: `css/style.css`
- Modify: `js/app.js`

**Interfaces:**
- Consumes: Location scroll links from entry modal
- Produces: Jallo Phase video player, interactive tabs table, other locations map coordinates grid

- [ ] **Step 1: Implement Jallo Phase Layout with vertical video player**
  Add interactive tabs for Constructed Homes and Residential Plots in `index.html`. Add subtitle transcript toggles using the extracted transcripts of Jahanzaib Bhai:
  ```html
  <section id="jallo">
    <!-- Left Column: Video player & transcript -->
    <div class="video-container">
      <video poster="assets/video-thumb.jpg" controls>
        <source src="assets/owner-speech.mp4" type="video/mp4">
      </video>
      <button class="transcript-btn" onclick="toggleTranscript()">View Urdu Video Transcript (ویڈیو تحریر)</button>
      <div id="transcript-text" class="hidden">
        "ہم لوگ گھر بنانے سے پہلے کچھ نہیں لیتے، گھر بنا کے دیتے ہیں، جب گھر ڈیلیور ہو جاتا ہے پھر قسطیں لیتے ہیں۔ تیار گھر کی چابی مل جاتی ہے، پھر 5 یا 6 سال میں آسان اقساط میں ادائیگی کریں۔"
      </div>
    </div>
  </section>
  ```

- [ ] **Step 2: Add interactive JS tab switches for prices**
  Allow switching between constructed plans and plot plans. Toggle classes on click.

- [ ] **Step 3: Add responsive locations grid**
  Include exact Google Maps coordinate URLs:
  - Babu Sabu: `https://maps.google.com/?q=31.532780,74.237897`
  - Saggian: `https://maps.google.com/?q=31.559606,74.242864`
  - Chung: `https://maps.google.com/?cid=6157353699438484857`
  - Jaranwala: `https://maps.google.com/?q=31.232738,73.454733`
  - Okara: `https://goo.gl/maps/ZZUCJUwamkUsMbbK9`
  - Rawalpindi: `https://maps.google.com/?cid=6362428337950221488`

- [ ] **Step 4: Commit**
  Run:
  ```bash
  git add index.html css/style.css js/app.js
  git commit -m "feat: add locations showcase, pricing tables and transcripts"
  ```

---

### Task 5: Interactive Installment/WhatsApp Calculator

**Files:**
- Modify: `tests/calculator.test.js`
- Modify: `js/app.js`
- Modify: `index.html`

**Interfaces:**
- Consumes: Selected pricing matrix dropdowns
- Produces: WhatsApp pre-filled booking generator

- [ ] **Step 1: Write TDD tests for all pricing options**
  In `tests/calculator.test.js`, add assertions for Jallo Residential Plots (2.5, 3, 5 Marla) and Jallo Constructed Single/Double Story options.

- [ ] **Step 2: Run tests to verify they fail**
  Run: `node --test tests/calculator.test.js`

- [ ] **Step 3: Implement full calculation logic in app.js**
  Define pricing lookup table:
  ```javascript
  const pricingData = {
    jallo: {
      residential: {
        '2.5marla': { total: '2,200,000', advance: '500,000', installment: '20,000' },
        '3marla': { total: '3,700,000', advance: '700,000', installment: '30,000' },
        '5marla': { total: '5,500,000', advance: '900,000', installment: '40,000' }
      },
      constructed: {
        '2.5marla': {
          single: { total: '2,000,000', advance: '400,000', installment: '30,000' },
          double: { total: '3,500,000', advance: '600,000', installment: '30,000' }
        },
        '3marla': {
          single: { total: '3,500,000', advance: '700,000', installment: '30,000' },
          double: { total: '4,500,000', advance: '800,000', installment: '30,000' }
        },
        '5marla': {
          single: { total: '4,500,000', advance: '800,000', installment: '20,000' },
          double: { total: '70,000,000', advance: '11,00,000', installment: '50,000' }
        }
      }
    }
  };
  ```

- [ ] **Step 4: Run tests to verify they pass**
  Run: `node --test`

- [ ] **Step 5: Bind UI events and construct pre-filled WhatsApp link**
  On change of dropdown options, recalculate and update WhatsApp URL button:
  `https://wa.me/923218265844?text=Assalam-o-Alaikum...`

- [ ] **Step 6: Commit**
  Run:
  ```bash
  git add tests/calculator.test.js js/app.js index.html
  git commit -m "feat: complete interactive pricing calculator and WhatsApp book system"
  ```

---

### Task 6: Amenities, FAQs, and Styling Polish

**Files:**
- Modify: `index.html`
- Modify: `css/style.css`
- Modify: `js/app.js`

**Interfaces:**
- Consumes: Calculator and location grid
- Produces: Amenities grid, FAQ accordion blocks

- [ ] **Step 1: Add Amenities Grid markup**
  Design the grid showing 9 items with beautiful modern icons.
- [ ] **Step 2: Add FAQ Accordion markup & JS toggle**
  Bind click events to open/close items.
- [ ] **Step 3: General CSS polish**
  Ensure dark/light contrast transition rhythm, clean Urdu font line-heights, and mobile viewport responsive CSS.
- [ ] **Step 4: Commit**
  Run:
  ```bash
  git add index.html css/style.css js/app.js
  git commit -m "feat: add amenities, FAQs, and apply visual styling polish"
  ```
