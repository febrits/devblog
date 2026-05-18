# DevBlog
## 🌐 Live Demo

https://devblog-bangpeb.vercel.app


A clean, dark-themed blog platform built with React 19, TypeScript, Vite, and Tailwind CSS v4.

## Features

- **Blog post listing** with cards showing title, excerpt, date, tags, and read time
- **Individual post view** with full content rendering (headings, code blocks, lists, inline formatting)
- **About page** with topic overview
- **Tag filtering** — click any tag to filter posts
- **Search** — real-time search across titles, excerpts, and content
- **Responsive design** — works on mobile, tablet, and desktop
- **Dark theme** — easy on the eyes with `#0a0a0f` background

## Tech Stack

- React 19 + TypeScript
- Vite (with `@tailwindcss/vite` plugin)
- Tailwind CSS v4
- React Router v7
- date-fns
- clsx + tailwind-merge

## Getting Started

```bash
npm install
npm run dev      # Start dev server
npm run build    # Production build
npm run preview  # Preview production build
```

## Project Structure

```
src/
├── components/       # Reusable UI components
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── SearchBar.tsx
│   ├── TagFilter.tsx
│   └── PostCard.tsx
├── pages/            # Route pages
│   ├── HomePage.tsx
│   ├── PostPage.tsx
│   └── AboutPage.tsx
├── data/
│   └── posts.ts      # Blog post content
├── types.ts          # TypeScript interfaces
├── App.tsx           # Router setup
├── main.tsx          # Entry point
└── index.css         # Tailwind imports + theme
```

## Content

5 real blog posts covering web development topics:

1. **React 19: The Features That Actually Change How You Code** — Server Components, Actions, use() hook, compiler
2. **Tailwind CSS v4: What's New and Why It's a Big Deal** — CSS-first config, Oxide engine, Vite plugin
3. **TypeScript Strict Mode: A Survival Guide for React Developers** — Fixing common strict mode errors
4. **Modern CSS Layout Techniques Every Developer Should Know in 2025** — Subgrid, container queries, :has()
5. **REST API Design Best Practices: Lessons from Building Production APIs** — Naming, versioning, error handling, pagination
