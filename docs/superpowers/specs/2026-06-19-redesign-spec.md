# Redesign Specification: Theme Park View Website Redesign

This document outlines the design specification for transforming the Theme Park View Housing Society website into a premium, minimalist, high-converting, Urdu-only landing page.

---

## 🎨 Core Design System & Tokens

### Colors
* **Primary Background:** Pure White (`#FFFFFF`) to maximize whitespace (more free space everywhere).
* **Text & Main Buttons:** Obsidian Black (`#111111`) for headings, body text, and major buttons.
* **Secondary Accents:** Platinum Gray (`#F5F5F7` for cards, `#E5E5EA` for borders, `#8E8E93` for subtitles).
* **Alerts/Accents:** Neutral dark grays.
* **Orange & Yellow Elimination:** Remove all instances of Ember Orange (`#E2612A`), orange hover effects, and warning yellows.

### Typography
* **Primary & Headers:** strictly Noto Nastaliq Urdu and Noto Sans Arabic.
* **Subtexts/Numerals:** Inter (clean and neutral).

### UI Elements
* **Border Radius:** `20px` for cards, inputs, and player containers.
* **Buttons:** Pill-shaped (`border-radius: 100px`) for all action and category buttons.
* **Emojis:** Completely removed. Replaced with clean custom SVG inline icons.
* **Translation Prevention:** Add `<meta name="google" content="notranslate">` to the HTML `<head>` to prevent browsers from automatically translating Urdu to broken English.

---

## 🗺️ Interactive City Selector & Filtration (Approach 1)

### Selector Placement
* Positioned directly under the main header in the Hero section.
* Designed as a horizontal, scrolling pill-bar containing buttons for each city:
  * Lahore (`لاہور`)
  * Gujranwala (`گوجرانوالہ`)
  * Faisalabad (`فیصل آباد`)
  * Okara (`اوکاڑہ`)
  * Rawalpindi (`راولپنڈی`)

### Filtration Behavior
* Clicking any city button instantly adds/removes CSS filter classes (e.g., hiding elements with `display: none`).
* Shows only the selected city's maps, short videos, and pre-selected calculator dropdown.
* Gujranwala is added as a new city option.
* Tapping a society card name opens the Google Maps link directly in a new tab.

---

## 📹 Video Walkthroughs
* **Long Video Removal:** Remove the 3.33-minute video (`IMG_3149.mov`) and its transcript drawer.
* **Short Videos:** Keep only the short vertical walkthroughs (Babu Sabu work, Possession guidelines, Rent vs Own).
* **City Filtering:** Videos are shown based on the selected city.

---

## 📈 Form & Calculator Redesign
* **Simplified Form:** The calculator features clear Noto Nastaliq Urdu labels with zero English abbreviations or subtitle descriptions.
* **WhatsApp Link:** Dynamic WhatsApp booking link pre-filled with Urdu details.
* **Pill Buttons:** WhatsApp buttons are styled as premium black pill-shaped buttons with clean WhatsApp SVG icons.
