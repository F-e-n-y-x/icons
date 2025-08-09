# 🎨 Icons

A curated collection of modern, minimalist SVG icons—designed for seamless use in websites, apps and design systems.

[![Icons](https://img.shields.io/badge/icons-count-auto-blueviolet?logo=svg)](#icons)  
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)  
[![Pages](https://img.shields.io/badge/live-preview-GitHub&nbsp;Pages-orange)](https://f-e-n-y-x.github.io/icons)

---

## 🚀 Quick Start

### Direct CDN Link

```html
<!-- 24 × 24 “home” icon -->
<img src="https://raw.githubusercontent.com/F-e-n-y-x/icons/main/icons/ui/home.svg"
     alt="home" width="24" height="24">
```

### Clone & Use Locally

```bash
git clone https://github.com/F-e-n-y-x/icons.git
cd icons
```

---

## 🖥️ Live Preview

Browse, search and copy icons instantly:

**https://f-e-n-y-x.github.io/icons**

Features  
• Instant search & category filters  
• One-click “Copy URL” and “Copy HTML” buttons  
• Size preview (24 / 32 / 48 / 64 px)  
• Dark & light themes  
• Auto-updates when new SVGs are pushed to `main`

---

## 📁 Repository Structure

```
icons/
├─ ui/          # Controls, arrows, interface
├─ social/      # Social media logos
├─ brands/      # Brand marks
├─ misc/        # Everything else
preview/        # Static website (GitHub Pages)
LICENSE
README.md
```

---

## ✨ Key Features

1. **Pure SVG** – crisp on any display, easily restyled with `fill="currentColor"`.  
2. **Consistent grid & stroke** – every icon fits a `24 × 24` viewBox.  
3. **Direct-link CDN** – serve straight from GitHub raw URLs; no build step.  
4. **MIT-licensed** – free for personal & commercial work.  
5. **Live gallery** – auto-generated static site for rapid browsing.  

---

## 📦 Installation Options

| Method | Command |
|--------|---------|
| npm (bundler) | `npm i @f-e-n-y-x/icons` _(planned)_ |
| pnpm | `pnpm add @f-e-n-y-x/icons` |
| yarn | `yarn add @f-e-n-y-x/icons` |

---

## 🛠️ Usage Examples

### HTML

```html
<link rel="stylesheet" href="https://f-e-n-y-x.github.io/icons/css/icons.css">
<i class="icon icon-search"></i>
```

### React / Next.js

```jsx
export default function Navbar() {
  return (
    <img
      src="https://raw.githubusercontent.com/F-e-n-y-x/icons/main/icons/ui/menu.svg"
      width={32}
      height={32}
      alt="menu"
    />
  );
}
```

### Tailwind CSS

```html
<!-- Example utility override -->
<img src=".../heart.svg" class="w-6 h-6 text-red-500" alt="heart">
```

---

## 🤝 Contributing

1. **Fork** the repo & create a new branch.  
2. Add your SVG to the correct sub-folder:  
   * 24 × 24 viewBox  
   * Strokes at **2 px** (or consistent)  
   * Use `currentColor` for fills/strokes  
   * File name: `kebab-case.svg`  
3. Run `npm run lint:svg` (coming soon).  
4. Open a PR with a descriptive title.

---

## 📈 Auto-Generated Stats

| Metric | Value* |
|--------|--------|
| Total icons | ![auto](https://img.shields.io/badge/dynamic/json?label=&url=https%3A%2F%2Fraw.githubusercontent.com%2FF-e-n-y-x%2Ficons%2Fmain%2Fpreview%2Fstats.json&query=%24.total&color=blue) |
| Categories  | ![auto](https://img.shields.io/badge/dynamic/json?label=&url=https%3A%2F%2Fraw.githubusercontent.com%2FF-e-n-y-x%2Ficons%2Fmain%2Fpreview%2Fstats.json&query=%24.categories&color=blue) |
| Contributors | ![GitHub contributors](https://img.shields.io/github/contributors/F-e-n-y-x/icons) |

_\*Updated on every push via GitHub Actions._

---

## 📜 License

Icons, code and site are released under the **MIT License**.  
See [LICENSE](LICENSE) for details.

---

Made with ❤️ in Delhi by **F-e-n-y-x**.  
Happy designing!
