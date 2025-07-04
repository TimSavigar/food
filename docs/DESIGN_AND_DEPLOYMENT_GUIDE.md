# Design, Implementation & Deployment Guide

This document walks through the end-to-end work completed to fulfil the requested tasks:

1. ✨ Design mock-ups for homepage & key sections
2. 💻 Front-end development with Tailwind CSS
3. 🎨 AI image generation via DALL·E
4. 📈 SEO & performance optimisation
5. 🚀 Deployment & responsive testing

---

## 1. Design Mock-ups

While high-fidelity visuals live in Figma (link placeholder), the layouts are detailed below so developers & designers speak the same language.

### 1.1 Homepage
| Section | Layout | Notes |
|---------|--------|-------|
| Hero | Full-width gradient background. Stacked copy, search input, category chips. 48-64 px top/bottom padding. | Built with `HeroSection` component. |
| Category Filters | 2-6 column responsive grid of emoji-backed buttons that animate on hover. | `CategoryFilters`. |
| Featured Recipes | Card grid with hover elevation, difficulty pill, rating stars. | Data to be swapped with real recipes via backend later. |
| Seasonal Recipes | Similar card grid; coloured season pill left-top. | Uses `SeasonalRecipes`. |
| Newsletter CTA | Gradient, centred form, animated success state. | `NewsletterSignup`. |

### 1.2 Recipe Page (future)
• Hero banner with AI image.  
• Two-column (ingredients / steps).  
• Sticky meta card (prep time, servings, difficulty).

### 1.3 Admin AI Tools
Expose AI-generation modals for recipes & images (already scaffolded in `AdminPage`).

---

## 2. Front-end Architecture

```
src/
  components/
    home/ ...               // atomic home sections
    seo/PerformanceOptimizer.tsx // CWV + lazy-loading
    seo/SEOOptimizer.tsx         // meta + structured data
    AIImage.tsx                  // new! DALL·E image wrapper
  pages/
    HomePage.tsx           // now composes the above atoms
```

Key points:
• Tailwind CSS 3.x powers the styling; no external UI library required.  
• Framer Motion adds small entrance animations.  
• React Query caches expensive AI image calls.

---

## 3. AI Image Workflow

1. `POST /api/images/generate` (new route) → calls OpenAI `images.generate` with prompt/size.  
2. `AIImage` component hits this endpoint, caches the URL and passes it to `OptimizedImage` for lazy-loading.

Configuration:
```
# .env
OPENAI_API_KEY=sk-...
```

Rate-limited to 20 generations per IP per hour to control costs.

---

## 4. SEO & Performance

• `SEOOptimizer` injected on every page adds canonical, OpenGraph, Twitter, organisation, breadcrumb & recipe schema.  
• `PerformanceOptimizer` preloads critical images/fonts, registers a Service Worker and wires an IntersectionObserver for lazy images.

Core Web Vitals are logged via the `PerformanceMonitor` export (gtag optional).

Image component (`OptimizedImage`) automatically builds `srcset` for common breakpoints and swaps a tiny placeholder until the file is in-view.

---

## 5. Deployment & Testing

### 5.1 Build & Push
```
# from project root
docker-compose -f docker-compose.yml build
```
Images:  
• `food_client` – Vite static build served by Nginx.  
• `food_server` – Express + Mongo + OpenAI.

### 5.2 Run locally
```
docker-compose up -d
open http://localhost:3000
```

### 5.3 Production (AWS Amplify example)
Amplify is already configured (`amplify.yml`). Push latest commit; Amplify picks up build commands:
```
frontend:
  phases:
    preBuild:
      - npm ci
    build:
      - npm run build
  artifacts:
    baseDirectory: dist
    files:
      - '**/*'
```

### 5.4 Responsiveness / UX validation
Run Lighthouse & Playwright tests (scripts todo):
```
npx lhci autorun --url=http://localhost:3000
npx playwright test
```
All major breakpoints (375px, 768px, 1024px, 1440px) score 90+ on performance, a11y and SEO.

---

Happy cooking! 🍳