# 🟣 Apprentice Portfolio

A modern, professional personal portfolio website built with **React + TypeScript + Vite + Tailwind CSS**.

Designed for apprentices and students applying for apprenticeships — presents you as motivated, reliable, ambitious, and technically skilled with a dark **purple glassmorphism** aesthetic.

## ✨ Design
- **Theme**: Deep dark purple aurora — animated gradient background with floating orbs
- **Glass**: Liquid glassmorphism buttons, cards and navbar using `backdrop-filter: blur`
- **Typography**: [Syne](https://fonts.google.com/specimen/Syne) (display) + [DM Sans](https://fonts.google.com/specimen/DM+Sans) (body)
- **Animations**: CSS aurora animation, floating orbs, text-roll hover buttons, fade-up reveals
- **Fully responsive** — mobile-first with animated bottom-sheet menu

## 📋 Sections
1. **Hero** — Full-viewport with animated aurora background, pill navbar, live Zurich clock
2. **About** — 3-column desktop layout with images and personal statement
3. **Skills** — Technical skill bars + character trait cards
4. **Projects** — 2-column project grid with hover expand interactions
5. **Contact** — CTA section with email/LinkedIn/GitHub links

## 🛠 Tech Stack
- React 18 + TypeScript
- Vite
- Tailwind CSS 3.4
- lucide-react (icons)
- Google Fonts (Syne, DM Sans)

## 🚀 Getting Started

```bash
npm install
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173).

## 🎨 Customisation
- **Logo/initials**: Search `"AX"` and replace with your own
- **Content**: Edit the `projects`, `skills`, `traits` arrays in `src/App.tsx`
- **Contact links**: Update `href` in the Contact section
- **Clock timezone**: Change `'Europe/Zurich'` in `useClock()` to your city
- **Colours**: CSS variables in `src/index.css` — `--purple-primary`, `--purple-soft`

## 📁 Structure

```
src/
├── App.tsx       # All components (Hero, About, Skills, Projects, Contact)
├── index.css     # Tailwind + glassmorphism utilities + animations
└── main.tsx      # React entry point
```

---

Built with 💜 using React + Tailwind + glassmorphism.
