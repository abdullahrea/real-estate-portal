# Theme Park View Housing Society — Design Specification

This document details the complete design system, page structure, and interactive components for the **Theme Park View Housing Society** web application.

---

## 1. Brand Identity & Design Philosophy

### Overall Aesthetic
The web application is designed to be a high-conversion, premium landing portal. It balances a sleek, dark aesthetic above the fold with a clean, high-contrast light body below the fold, creating a professional, trustworthy, and premium experience.

*   **Dark Hero, Light Body**: Immersive radial black-and-orange glow above the fold to capture attention; transitions to clean white with soft-grey cards below for readability.
*   **Urgency & Value Upfront**: Scarcity element (a countdown timer) and special promotions are immediately visible.
*   **Trust & Social Proof**: Multilingual callouts, owner message video, gated society amenities, and transparent installments table.
*   **Urdu-First Communication**: taglines and value propositions are displayed in Urdu with clean nastaliq/sans-serif fallback styling, tailored to the Pakistani market.
*   **Primary Accent (Ember Orange - `#E2612A`)**: Used exclusively for action buttons, highlights, and active states.

---

## 2. Color & Typography System

### Color Palette

| Name | Hex | Usage |
| :--- | :--- | :--- |
| **Ember Orange** | `#E2612A` | CTA buttons, active state highlights, icons, play overlays |
| **Espresso Black** | `#110A04` | Hero background, dark card blocks, entry modal |
| **Charcoal Night** | `#1A1A1A` | Sub-card backgrounds in dark blocks |
| **Soft Cloud** | `#F5F4F2` | Standard card background on light page sections |
| **True White** | `#FFFFFF` | Core background for body sections |
| **Ink Black** | `#0A0A0A` | Main text (headings and paragraphs on light BG) |
| **Slate Gray** | `#6B6B6B` | Secondary text, captions, and descriptions |
| **Mint Green** | `#22C55E` | Live status dot, success confirmations |

### Typography
*   **Primary Font Family**: `Inter`, `-apple-system`, `BlinkMacSystemFont`, sans-serif.
*   **Urdu Font Family**: `Noto Nastaliq Urdu`, `Noto Sans Arabic`, sans-serif.
*   **Scale**:
    *   *Display Large (Hero Title)*: 48px - 64px, ExtraBold (`font-weight: 800`), Letter spacing `-0.02em`.
    *   *Section Titles*: 32px - 40px, Bold (`font-weight: 700`).
    *   *Card Titles / Step Titles*: 20px - 24px, SemiBold (`font-weight: 600`).
    *   *Body Copy*: 15px - 16px, Regular (`font-weight: 400`), Line height `1.6`.

---

## 3. Global & Shared Layout Components

### 3.1 Promo & Announcement Bar (Top)
*   **Background**: Ember Orange (`#E2612A`).
*   **Height**: 48px.
*   **Left**: Empty (or close button).
*   **Center**: Live countdown timer: `"محدود وقت کی خصوصی پیشکش (VIP کارڈ سہولت) - Offer Ends In [ 23 : 06 : 40 ]"`.
*   **Right**: A white outlined pill badge: `"Get 15% Off (Overseas) ✈️"`.

### 3.2 Floating Navigation Pill
*   **Style**: Centered floating capsule that stays sticky.
*   **Background**: White Smoke (`#F0EDE9`) with `backdrop-filter: blur(12px)`.
*   **Border-Radius**: 100px.
*   **Box Shadow**: `0 4px 20px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.04)`.
*   **Links**: Home, Phases, Amenities, Pricing, FAQs.
*   **Action Button**: Mini-orange pill button: `"بکنگ کروائیں — Book Now"`.

### 3.3 Main Entry Quiz Modal (Self-Selector)
*   **Trigger**: Appears on page load (saved in `localStorage` to avoid repeating).
*   **Layout**: Center-focused card on a dark-radial backdrop.
*   **Question**: `"آپ اپنا گھر کس شہر/علاقے میں بنانا چاہتے ہیں؟"` (Where would you like to build your home?)
*   **Options**:
    1.  Lahore (Jallo Phase - G.T Road)
    2.  Lahore (Babu Sabu / Saggian / Chung)
    3.  Faisalabad (Jaranwala)
    4.  Okara
    5.  Rawalpindi (Adyala Road)
*   **Action**: Clicking an option auto-scrolls the page directly to the corresponding pricing showcase section.

---

## 4. Page Sections

### 4.1 Hero Section (Dark Theme)
*   **Taglines (Urdu & English)**:
    *   `"اپنا گھر حاصل کریں — آسان اقساط پر، بغیر کسی ٹینشن کے!"`
    *   `"صرف پلاٹ نہیں دیتے — ہم آپ کو مکمل گھر بنا کر دیتے ہیں آسان اقساط میں۔"`
    *   *"We build and deliver fully constructed homes for you. Pay monthly installments only after getting the keys!"*
*   **Left Column**: Taglines, star rating badge (`4.9/5 stars based on 1,200+ families`), CTAs (`"واٹس ایپ رابطہ کریں"` and `"مقام دیکھیں"`).
*   **Right Column**: Premium render image of society entrance or model home. Concentric pulsing radar circles in the background.

### 4.2 Core Showcase: Lahore Jallo Phase
This section uses a split-column format to educate users via a vertical owner speech video while displaying detailed pricing.

*   **Left Column (9x16 Video Container)**:
    *   A vertical video card styled like a smartphone/short-form player.
    *   Play button overlay with video duration (`3:33`).
    *   **Subtitles/Transcript Toggle**: Underneath the video, a button allows users to expand the text transcript (based on Jahanzaib Bhai's speech):
        *   *"Allah listened to our prayers, Ring Road work has started..."*
        *   *"We build the house first without taking advance, hand over keys, and start installments after possession."*
*   **Right Column (Tabbed Installment Table)**:
    *   **Tab 1: Constructed Homes (تیار گھر اقساط پلان)**:
        *   *2.5 Marla Single Story*: Total: 20L | Advance: 4L | Monthly: 30k
        *   *2.5 Marla Double Story*: Total: 35L | Advance: 6L | Monthly: 30k
        *   *3 Marla Single Story*: Total: 35L | Advance: 7L | Monthly: 30k
        *   *3 Marla Double Story*: Total: 45L | Advance: 8L | Monthly: 30k
        *   *5 Marla Single Story*: Total: 45L | Advance: 8L | Monthly: 20k
        *   *5 Marla Double Story*: Total: 70L | Advance: 11L | Monthly: 50k
    *   **Tab 2: Residential Plots (پلاٹس اقساط پلان)**:
        *   *2.5 Marla*: Total: 22L | Advance: 5L | Monthly: 20k
        *   *3 Marla*: Total: 37L | Advance: 7L | Monthly: 30k
        *   *5 Marla*: Total: 55L | Advance: 9L | Monthly: 40k

### 4.3 Other Locations Grid
*   A responsive 3-column card grid displaying other societies:
    1.  *Babu Sabu, Lahore*
    2.  *Saggian, Lahore*
    3.  *Chung, Multan Road Lahore*
    4.  *Kala Shah Kaku (Near Etihad Town)*
    5.  *Jaranwala, Faisalabad*
    6.  *Okara*
    7.  *Rawalpindi (Adyala Road)*
*   Each card displays the location name, a small map graphic, and a button to *"Open in Google Maps"* linking to the exact coordinate URLs provided.

### 4.4 Interactive Booking Calculator
*   **Interface**: Interactive dropdown selects Location, Type (Plot vs Constructed), Size (2.5, 3, 5 Marla), and Story (Single vs Double).
*   **Display Panel**: Instantly shows down payment, monthly payment, and total price.
*   **CTA Button**: WhatsApp Booking (`"واٹس ایپ پر بکنگ کے لیے رابطہ کریں"`). When clicked, it generates a pre-filled WhatsApp link containing all user selections:
    `https://wa.me/923218265844?text=Assalam-o-Alaikum,%20I%20want%20to%20book%20a%20[SIZE]%20[STORY]%20in%20[LOCATION].%20Please%20guide%20me.`

### 4.5 Amenities Grid (سہولیات)
A sleek grid displaying the 9 major facilities with bilingual text and simple illustrations:
1.  🚧 Gate & Security (گیٹڈ کمیونٹی اور سیکیورٹی)
2.  ⚡ 24/7 Electricity (24/7 بجلی)
3.  🕌 Grand Mosque (جامع مسجد)
4.  🛣️ Carpeted Roads (کشادہ کارپٹڈ روڈز)
5.  🏥 Hospital & Clinic (ہسپتال اور میڈیکل کیمپس)
6.  🏫 School (اسکول)
7.  🌳 Parks & Play Areas (پارک اور پلے ایریاز)
8.  🚰 Filtration Plant (واٹر فلٹریشن پلانٹ)
9.  💳 VIP Card Benefits (VIP کارڈ سہولت)

### 4.6 FAQ Accordion
*   Contains interactive dropdown answers about development progress, booking process, overseas benefits (15% discount), and registry/possession rules.

---

## 5. Technical Stack

1.  **HTML5**: Clean semantic layout (`<section>`, `<article>`, `<header>`, `<nav>`, `<video>`).
2.  **CSS3**: Modern Vanilla CSS with variables for the design system. Responsive using grid systems and flexbox.
3.  **JavaScript**: Vanilla JS for countdown timers, modal controls, active tab toggles, installment calculator, and WhatsApp message generator.
4.  **No Placeholders**: Actual map links, actual rates, and unzipped video transcripts are hardcoded so the site is fully informative from day one.
