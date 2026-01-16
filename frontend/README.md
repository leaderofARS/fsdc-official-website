# 🚀 FSDC Website - Project Overview

This documentation covers the technical architecture and features of the official website for the **Full Stack Development Club (FSDC)**, from the high-impact **Homepage** to the elite **Team Roster**.

---

## 🎨 Visual Identity & UI/UX
The website follows a "Techno-Neon" aesthetic, utilizing a deep \`#050505\` background with vibrant purple (\`#a855f7\`) accents.

* **Aurora Engine**: A custom GPU-accelerated background that creates a fluid, deep-space aurora effect across all pages.
* **Page Transitions**: Smooth Framer Motion-based entry/exit animations for a seamless "Single Page Application" feel.
* **Reveal-on-Scroll**: Components use Intersection Observers to slide or fade into view as the user scrolls.

---

## 🏠 Modules Overview

### 1. Landing & Homepage
* **Hero Section**: Bold typography with a focus on "Innovation" and "Development".
* **Navigation**: A glassmorphic header that adapts its transparency based on scroll position.

### 2. Team Page (Executive Council)
The flagship feature of the site, showcasing leadership with an elite interactive experience:

* **Coverflow Swiper**: A 3D-rotating carousel that brings the active profile card to the forefront.
* **Accumulating Timeline (PC)**: A custom progress indicator where dots fill with color as the user swipes.
    * **Logic**: Uses CSS sibling selectors (\`:has(~ .active)\`) to highlight all "past" dots.
    * **Reset**: Automatically clears all color when the user loops back from the last member to the first.
* **Timed Progress Bar**: The active dot expands into a 60px bar that fills in real-time based on autoplay delay.
* **Mobile Adaptive**: The timeline is automatically hidden on mobile devices (under 768px) to prioritize card visibility.

---

## 🛠️ Technical Stack

| Category | Technology |
| :--- | :--- |
| **Frontend** | React.js |
| **Styling** | Tailwind CSS |
| **Slider** | Swiper.js (Autoplay, Coverflow, Pagination) |
| **Icons** | Lucide React |
| **Animations** | Framer Motion & CSS Sibling Logic |

---

## 📁 Project Structure

```
src/
├── assets/          # Compressed images for team/mentors
├── components/      # Reusable UI (Aurora, ProfileCard, PageTransition)
├── pages/           # Main route views (Homepage, TeamPage)
└── App.jsx          # Route management
```

---

## 🚀 Future Roadmap
* **Events Module**: Integration with a backend for live event updates.
* **Contact System**: Secure form handling for club inquiries.
* **Mobile Enhancements**: Further touch-gesture optimizations for navigation.
