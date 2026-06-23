# Content Audit Report - Theme Park View Housing Society Portal

This report details the findings from a deep audit of the Theme Park View Housing Society codebase (`index.html`, `css/style.css`, and `js/app.js`) against the user's requirements, exact coordinates/URLs, typography styles, and language/bilingual constraints.

---

## 1. Map Coordinates and Links Audit

### Findings
The portal lists 9 housing society entries in `index.html` under the locations section, but only 7 societies have user-specified coordinates and links. The status of each is detailed below:

| Housing Society | Exact Target URL | Status in Codebase |
| :--- | :--- | :--- |
| **Jallo More** | `https://maps.app.goo.gl/GHLvE4CYS9LwcwFGA?g_st=aw` | **Match**: Mapped correctly. |
| **Babu Sabu** | `https://maps.google.com/?q=31.532780,74.237897&entry=gps&g_st=aw` | **Match**: Mapped correctly. |
| **Saggian** | `https://maps.google.com/?q=31.559606,74.242864&entry=gps&g_st=aw` | **Match**: Mapped correctly. |
| **Chung Lahore** | `https://maps.google.com/?cid=6157353699438484857&entry=gps&g_st=aw` | **Match**: Mapped correctly. |
| **Jaranwala Faisalabad** | `https://maps.google.com/?q=31.232738,73.454733&entry=gps&g_st=aw` | **Match**: Mapped correctly. |
| **Okara** | `https://goo.gl/maps/ZZUCJUwamkUsMbbK9?g_st=aw` | **Match**: Mapped correctly. |
| **Rawalpindi** | `https://maps.google.com/?cid=6362428337950221488&entry=gps&g_st=aw` | **Match**: Mapped correctly. |
| *Kala Shah Kaku* | *(None provided by user)* | **Extra**: Mapped to generic coordinates. |
| *Gujranwala* | *(None provided by user)* | **Extra**: Mapped to general town search. |

### Discrepancies
- **Kala Shah Kaku** and **Gujranwala** are listed in the locations section, calculator selectors, and city selector bar, but they do not have user-specified coordinates.
- To ensure that *every single housing society listed has the exact coordinates/URLs provided by the user*, these extra societies must be removed.

---

## 2. Font Stack Audit

### Findings
- **Google Fonts Import (`index.html`)**: Correctly imports `Poppins` (`family=Poppins:wght@300;400;500;600;700;800;900`), `Noto Nastaliq Urdu`, and `Noto Sans Arabic`.
- **CSS Variables (`css/style.css`)**: 
  - `--font-main` specifies `'Inter', -apple-system, BlinkMacSystemFont, sans-serif;` instead of `'Poppins'`.
  - Body element utilizes `var(--font-main)`.

### Discrepancies
- `--font-main` utilizes `'Inter'` as the primary font, violating the requirement that Poppins be specified as the main font.
- Urdu font definitions are missing for `.pricing-table td` and `.input-group select`, which means Urdu text inside pricing table rows and dropdown inputs may fallback to default system fonts or display with improper spacing.

---

## 3. Language, Translation, and Typographical Audit

### Findings
- **Bilingual Labels**: Numerous headers, buttons, and fields contain English text in parentheses alongside Urdu translations:
  - `تیار گھر (Constructed Homes)` / `رہائشی پلاٹ (Residential Plots)`
  - `سائز (Size)`, `اسٹوری (Story)`, `کل قیمت (Total)`, `ایڈوانس (Advance)`, `ماہانہ قسط (Installment)`
  - `سنگل اسٹوری (Single)` / `ڈبل اسٹوری (Double)`
  - `ہماری دیگر لوکیشنز (Other Locations)`
  - `سوسائٹی کی پریمیم سہولیات (Amenities)`
  - `سوسائٹی کے بارے میں مزید ویڈیوز (Video Gallery)`
  - `عام سوالات کے جوابات (FAQ Accordion)`
  - `اوورسیز پاکستانیوں (Overseas Pakistanis)`
- **English Translation Text**: Paragraph descriptions under several sections and items are in English:
  - Tab selector subtext (`Select a tab below...`)
  - Locations subtext (`Click below to locate...`)
  - All 9 amenity card descriptions.
  - Video gallery section subtext (`Watch and listen...`) and individual gallery card description labels.
  - FAQ section subtext (`Find answers...`).
  - Footer branding title (`Theme Park View`) and copyright (`© 2026 Theme Park View Housing Society. All Rights Reserved.`) / social icon names (`Facebook`, `YouTube`, `WhatsApp`).
- **Emojis**: None were found, which complies with the emoji-free constraint.
- **Typo**: `index.html` line 168 lists the total price for "2.5 Marla Single Story" as `2,00,000` (2 lakhs) instead of the correct `2,000,000` (20 lakhs / 2 million).

---

## 4. Proposed Fixes

### A. Locations and Dropdowns Clean-up
- Remove **Kala Shah Kaku** and **Gujranwala** from the locations card grid, calculator options, and city selectors in `index.html`.
- Remove the Gujranwala option automatic setting block in `js/app.js`.

### B. Font Stack Adjustments
- Update `--font-main` in `css/style.css` to use `'Poppins'` as the primary font stack:
  ```css
  --font-main: 'Poppins', -apple-system, BlinkMacSystemFont, sans-serif;
  ```
- Explicitly apply `var(--font-urdu)` to elements with Urdu text that currently lack it:
  - `.pricing-table td`
  - `.input-group select`
  - `.card-map-mock::after`
- Increase readability for small Urdu elements:
  - Increase `.card-map-mock::after` size to `12px` and add Urdu font.
  - Increase `.whatsapp-disclaimer` size to `14px` and set line-height to `1.8`.

### C. Language Clean-up (English Removal & Urdu Translation)
- Remove all parenthetical English text from bilingual elements.
- Translate all English sub-headers and descriptions into native, easy-to-read Urdu so the interface remains clean, functional, and fully Urdu-focused.
- Translate brand headings (e.g. `Theme Park View` -> `تھیم پارک ویو`) and footer tags.

### D. Typographical Corrections
- Fix the price in the 2.5 marla single-story constructed row to `2,000,000`.
