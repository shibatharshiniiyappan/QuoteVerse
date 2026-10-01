# QuoteVerse — Where Words Come Alive

QuoteVerse is a responsive, celestial-themed inspirational quote generator built with React and Vite. Set against an illustrated night sky complete with a glowing moon, twinkling stars, floating stardust particles, and layered silhouette hills, QuoteVerse brings inspirational words to life with smooth animations, mood-based filtering, local favorite management, and quick clipboard copying.

---

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Screenshots](#screenshots)
- [Project Structure](#project-structure)
- [Getting Started (Windows)](#getting-started-windows)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Development Server](#running-the-development-server)
  - [Building for Production](#building-for-production)
  - [Running the Linter](#running-the-linter)
- [How to Use the App](#how-to-use-the-app)
- [Author](#author)

---

## Features

- **Random Inspirational Quote on Load**: Displays a curated inspirational quote and author immediately upon opening the app.
- **Working New Quote Button**: Smoothly transitions to another quote within the current mood selection, preventing immediate repeats.
- **Mood Filters**:
  - **All Moods** (`🌌`) — Browse across the entire quote library.
  - **Hope** (`✨`) — Uplifting thoughts on resilience and new beginnings.
  - **Focus** (`🎯`) — Quotes on clarity, discipline, and intentional action.
  - **Love** (`💖`) — Reflections on kindness, compassion, and human connection.
  - **Healing** (`🌿`) — Gentle reminders for peace, patience, and inner growth.
  - Selecting any mood instantly updates the quote and alters the ambient celestial glow.
- **Favorites Management (`localStorage`)**:
  - Save or remove quotes with an animated heart button.
  - Saved quotes persist across browser sessions in `localStorage`.
  - Live badge indicator in the header showing the current count of saved quotes.
- **Favorites Modal View**:
  - View all saved quotes in a frosted-glass overlay.
  - **Display in Sky**: Load any favorite quote directly into the main night-sky view.
  - **Copy**: Copy individual saved quotes from within the modal.
  - **Delete**: Remove individual quotes or use **Clear All** to reset the collection.
  - Empty state with guidance when no quotes are saved yet.
- **One-Click Copy Button**:
  - Copies formatted text (`"Quote" — Author`) directly to your clipboard using the Clipboard API (with textarea fallback).
  - Displays checkmark feedback and a floating toast notification.
- **Illustrated Night-Sky World**:
  - **Glowing Moon**: Layered SVG/CSS 3D sphere with crater textures, subtle shadow, and radial atmospheric halos.
  - **Twinkling Starfield**: 65 stars with varying sizes, twinkle durations, and sparkle accents.
  - **Shooting Star**: Ambient animated streak sweeping across the upper sky.
  - **Floating Particles**: Drifting stardust and firefly motes rising from the horizon.
  - **Layered Hills**: Three SVG silhouette landscape ridges (distant mountains, midground ridge, and foreground).
- **Responsive Glassmorphism UI**: High-contrast, frosted-glass quote card built with modern CSS `backdrop-filter` that adapts seamlessly across mobile, tablet, and desktop screens.

---

## Technologies Used

- **React 19** (`react`, `react-dom`) — Component-based architecture and state management (`useState`, `useEffect`, `useMemo`, `useCallback`).
- **Vite 8** — Fast development server and production bundler.
- **Vanilla CSS3** — Custom properties (CSS variables), glassmorphism (`backdrop-filter`), keyframe animations, and responsive media queries.
- **HTML5 & SVG** — Semantic elements and vector illustrations for the hills, icons, and celestial graphics.
- **Web Storage API** — `localStorage` for offline quote persistence.
- **Google Fonts** — `Playfair Display` (serif typography for quotes) and `Plus Jakarta Sans` (UI font).
- **ESLint** — Code linting and React Hooks rules.

---

## Screenshots

<!--
INSTRUCTIONS TO ADD SCREENSHOTS:
1. Create a "screenshots" folder inside the "quoteverse" directory: quoteverse/screenshots/
2. Take a screenshot of the main screen and save it as: quoteverse/screenshots/main-view.png
3. Take a screenshot of the favorites modal and save it as: quoteverse/screenshots/favorites-view.png
4. The images linked below will automatically display on GitHub.
-->

### Main Night-Sky View
![QuoteVerse Main View](screenshots/main-view.png)

### Saved Quotes (Favorites Modal)
![QuoteVerse Favorites View](screenshots/favorites-view.png)

---

## Project Structure

```text
quoteverse/
├── public/
│   ├── favicon.svg          # App favicon
│   └── icons.svg            # Base SVG sprite assets
├── src/
│   ├── assets/              # Static image assets
│   ├── App.css              # Night sky animations, hills, modal & component styles
│   ├── App.jsx              # Main QuoteVerse component, quotes data & logic
│   ├── index.css            # Base CSS reset, typography, and theme variables
│   └── main.jsx             # React DOM root entry point
├── index.html               # Main HTML template with Google Fonts
├── package.json             # Project dependencies and npm scripts
├── vite.config.js           # Vite configuration with React plugin
└── README.md                # Project documentation
```

---

## Getting Started (Windows)

Follow these steps to run QuoteVerse locally on your Windows machine.

### Prerequisites

- **Node.js** (v18 or higher recommended)
- **npm** (comes bundled with Node.js)

### Installation

1. Open PowerShell or Command Prompt.
2. Navigate to the `quoteverse` folder:
   ```powershell
   cd quoteverse
   ```
3. Install dependencies:
   ```powershell
   npm install
   ```
   > **Note for Windows PowerShell Users**: If you encounter an execution policy error (`npm.ps1 cannot be loaded`), run:
   > ```powershell
   > npm.cmd install
   > ```

### Running the Development Server

Start the local Vite development server:

```powershell
npm run dev
```

*(Or via PowerShell fallback)*:
```powershell
npm.cmd run dev
```

Once the server starts, open your browser and navigate to the displayed local address (typically `http://localhost:5173/`).

### Building for Production

To create an optimized production build in the `dist/` directory:

```powershell
npm run build
```

*(Or via PowerShell fallback)*:
```powershell
npm.cmd run build
```

To preview the production build locally:

```powershell
npm run preview
```

*(Or via PowerShell fallback)*:
```powershell
npm.cmd run preview
```

### Running the Linter

To verify code quality and check for ESLint errors:

```powershell
npm run lint
```

*(Or via PowerShell fallback)*:
```powershell
npm.cmd run lint
```

---

## How to Use the App

1. **Discover Quotes**: When you open QuoteVerse, an inspirational quote is displayed in the center of the night sky.
2. **Generate a New Quote**: Click the **New Quote** button to fetch another quote.
3. **Filter by Mood**: Click on any of the mood pills (**Hope**, **Focus**, **Love**, or **Healing**) to immediately receive a quote matching that theme. Select **All Moods** to explore without restrictions.
4. **Save to Favorites**: Click the **Favorite** heart button on the quote card to save the current quote. The heart turns red, and the header badge counter increments.
5. **View Favorites**: Click the **Favorites** button in the top-right corner to open your saved quotes collection. From this view, you can:
   - Click **Display in Sky →** to bring any saved quote back onto the main card.
   - Click the copy icon to copy that specific saved quote.
   - Click the trash icon to remove a quote from your favorites.
   - Click **Clear All** to empty your collection.
6. **Copy Quotes**: Click the **Copy** button on the main card or in the favorites list to copy formatted text to your clipboard. A confirmation message will appear briefly.

---

## Author

- **Name**: [Your Name]
- **GitHub**: [@YourUsername](https://github.com/YourUsername)
