# 🏋️‍♂️ FITLOG — Workout Tracker & Exercise Library

<div align="center">

![FitLog Logo](public/img/logo.png)

**Train with intent. Log every set.**

An athletic, dark-themed gym companion and workout tracking web application. Designed for athletes and lifters to browse comprehensive exercise guides, build focused daily workout routines, monitor training volume and caloric burn in real time, and bookmark lifts for upcoming sessions.

[![Next.js](https://img.shields.io/badge/Next.js-16.3-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![DaisyUI](https://img.shields.io/badge/daisyUI-v5-5A0EF8?style=for-the-badge&logo=daisyui&logoColor=white)](https://daisyui.com/)
[![License](https://img.shields.io/badge/License-MIT-brightgreen?style=for-the-badge)](LICENSE)

</div>

---

## 📖 Table of Contents

- [About the Project](#-about-the-project)
- [Key Features](#-5-key-features)
- [Technologies Used](#-technologies-used)
- [Architecture & Folder Structure](#-folder-structure)
- [Getting Started](#-getting-started)
- [API Reference](#-api-reference)
- [License](#-license)

---

## 📌 About the Project

**FitLog** is built for lifters who prioritize focus and discipline over cluttered fitness spreadsheets. It offers a curated exercise library covering every major muscle group, paired with an interactive daily routine builder capped at 5 exercises per session to enforce intentional, high-intensity training.

With real-time aggregated metrics (total lifts, estimated duration, and caloric output), instant completion toggles, and persistent local storage, FitLog delivers a seamless, distraction-free gym experience.

---

## ⚡ 5 Key Features

### 1. 📚 Comprehensive Exercise & Workout Library
- Browse a curated directory of lifts targeting every primary muscle group (*Chest, Back, Legs, Shoulders, Arms, Core*).
- Interactive card grid presenting muscle category badges, required equipment, workout duration, estimated calories burned, and community ratings.
- Fast data loading with server-side caching and dynamic client fallbacks.

### 2. 🔍 Detailed Exercise Breakdown & Form Guides
- Dedicated detail pages (`/workouts/[id]`) for every lift featuring full-scale demonstration imagery.
- Granular training specifications: **Equipment**, **Difficulty Level**, **Recommended Sets & Reps**, **Duration**, and **Caloric Burn**.
- Numbered, step-by-step instructions to ensure proper lifting mechanics, safety, and peak muscle engagement.

### 3. 🎯 Focused Daily Workout Planner ("Today's Plan")
- Build an intentional routine for the day with a strict **5-lift cap** to encourage quality over junk volume.
- Easily add lifts directly from exercise cards or detail pages with instantaneous feedback.
- Guard rails preventing duplicate entries with automated contextual alert banners.

### 4. 📊 Real-Time Metric Aggregation & Smart Sorting
- Dynamic dashboard displaying live session statistics:
  - **Total Exercises**: Current number of lifts scheduled.
  - **Estimated Time**: Sum of workout duration in minutes.
  - **Calorie Expenditure**: Cumulative estimated calories burned (kcal).
- Interactive multi-criteria sorting to organize lifts by **Duration**, **Calories**, or **Rating**.

### 5. ✅ Interactive Progress Tracking & "Saved for Later" Library
- **Mark as Done**: Check off completed lifts in real time with dynamic badge states.
- **Save for Later**: Separate bookmarking shelf to preserve exercises you want to incorporate in future split routines.
- **Client-Side Persistence**: Seamless `localStorage` synchronization keeping your plan and completed lifts intact across reloads without requiring an account.

---

## 🛠 Technologies Used

### Frontend & Core Framework
- **[Next.js 16](https://nextjs.org/)** — React framework utilizing App Router, Server Components, dynamic route handlers (`[id]`), and static parameter generation.
- **[React 19](https://react.dev/)** — Modern UI library leveraging state management, custom context providers, and hooks (`useMemo`, `useContext`, `useEffect`).

### Styling & Design System
- **[Tailwind CSS v4](https://tailwindcss.com/)** — Utility-first styling engine powering a sleek, athletic high-contrast dark theme (`#0d0f14` background with `#c6ff00` neon accents).
- **[DaisyUI v5](https://daisyui.com/)** — Accessible, lightweight Tailwind CSS component classes for navigation menus, buttons, and responsive controls.
- **[React Toastify](https://fkhadra.github.io/react-toastify/)** — Customized dark-themed toast notifications for non-intrusive user action alerts.

### State & Storage
- **React Context API (`PlanContext`)** — Global centralized state governing active plans, saved workouts, and completion statuses.
- **Browser LocalStorage API** — Automatic local persistence for active workout sessions and saved routines.

### Data & Deployment
- **REST API** — Cloudflare Workers backend integration (`https://api.abcz.workers.dev/api/fitlog`).
- **Netlify & Vercel Ready** — Configured for modern edge deployment via `netlify.toml`.

---

## 📁 Folder Structure

```text
assignment-6/
├── public/                     # Static assets (images, icons, logo)
│   ├── img/
│   │   ├── banner.png
│   │   ├── logo.png
│   │   └── barbell-bench-press.jpg
│   └── favicon.ico
├── src/
│   ├── app/
│   │   ├── layout.js           # Root layout with PlanProvider, Nav, and Footer
│   │   ├── page.js             # Landing page with banner & featured library preview
│   │   ├── loading.js          # Global loading skeleton
│   │   ├── not-found.jsx       # Custom 404 error page
│   │   ├── globals.css         # Tailwind v4 styles, custom theme & Toastify overrides
│   │   ├── workouts/
│   │   │   ├── page.jsx        # Complete workout catalog view
│   │   │   └── [id]/page.jsx   # Dynamic exercise detail guide & action buttons
│   │   └── my-plan/
│   │       └── page.jsx        # Today's plan & saved workouts dashboard
│   ├── component/
│   │   ├── Card.jsx            # Workout card component with tags & stats
│   │   ├── ExerciseLoading.jsx # Skeleton loader component for exercise cards
│   │   ├── Footer.jsx          # App footer
│   │   ├── HomeBanner.jsx      # Hero banner component
│   │   ├── Nav.jsx             # Responsive navigation bar with mobile drawer
│   │   └── WorkoutActionButtons.jsx # Add-to-plan & save-for-later actions
│   └── context/
│       └── PlanContext.jsx     # State manager with LocalStorage sync & notifications
├── netlify.toml                # Netlify deployment configuration
├── next.config.mjs             # Next.js configuration
├── package.json                # Project dependencies and npm scripts
└── README.md                   # Project documentation
```

---

## 🚀 Getting Started

Follow these steps to run FitLog locally on your machine:

### Prerequisites
- **Node.js**: v18.18.0 or later (Node 20+ recommended)
- **npm**, **yarn**, or **pnpm**

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/rhRafi247/Fit-Log.git
   cd Fit-Log
   ```

2. **Install project dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **View in browser:**
   Open [http://localhost:3000](http://localhost:3000) to view the application.

### Available Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Runs the Next.js development server at `localhost:3000` |
| `npm run build` | Builds the optimized production application |
| `npm run start` | Starts the production server |
| `npm run lint` | Runs ESLint to check for code quality and errors |

---

## 🌐 API Reference

FitLog fetches workout data from a remote endpoint:

- **List All Workouts**: `GET https://api.abcz.workers.dev/api/fitlog`
- **Workout Details**: `GET https://api.abcz.workers.dev/api/fitlog/:id`

Each workout entity contains:
```json
{
  "id": 1,
  "name": "Barbell Bench Press",
  "muscleGroups": ["Chest", "Triceps", "Shoulders"],
  "equipment": "Barbell, Bench",
  "difficulty": "Intermediate",
  "sets": "3-4",
  "reps": "8-12",
  "duration": 25,
  "caloriesBurned": 180,
  "rating": 4.8,
  "description": "A classic compound movement...",
  "instructions": [
    "Lie flat on the bench with your eyes directly under the bar.",
    "Grip the bar slightly wider than shoulder-width apart...",
    "Lower the bar smoothly to mid-chest level...",
    "Press the bar back up forcefully to arms-length."
  ],
  "image": "https://..."
}
```

---

## 📄 License

This project is licensed under the [MIT License](LICENSE) — feel free to customize and use it for your personal training needs.
