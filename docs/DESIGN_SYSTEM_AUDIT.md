# Design System Audit: sebastianweszler.com

## Audit Date
May 11, 2026

## Current Implementation Stack
- **Framework**: Next.js 16.2.3
- **Styling**: Tailwind CSS 4 (via @theme inline)
- **Animations**: Framer Motion 12.x
- **Dark Mode**: CSS class-based (`.dark`)

---

## 1. Color System

### 1.1 Color Palette (Current Usage)

The site exclusively uses Tailwind's zinc grays as the primary color system:

| Token | Light Value | Dark Value | Usage |
|-------|-------------|------------|-------|
| `zinc-50` | #fafafa | - | Rare (not currently used) |
| `zinc-100` | #f4f4f5 | #27272a | Button backgrounds, tag backgrounds |
| `zinc-200` | #e4e4e7 | #18181b | Borders, dividers |
| `zinc-300` | #d4d4d8 | - | Hover borders |
| `zinc-400` | #a1a1aa | #a1a1aa | Muted text, timeline dots |
| `zinc-500` | #71717a | #71717a | Primary muted text |
| `zinc-600` | #52525b | - | Secondary text (light only) |
| `zinc-700` | #3f3f46 | #71717a | Skill bar gradient start, hover text |
| `zinc-800` | #27272a | #27272a | Card backgrounds, timeline track |
| `zinc-900` | #18181b | #09090b | Primary text, buttons |
| `zinc-950` | - | #09090b | Dark mode background |

### 1.2 Accent Colors

| Color | Value | Usage |
|-------|-------|-------|
| Blue  | #3b82f6 | Focus ring outline, email link color |
| Blue (hover) | #2563eb | Hover state for links |
| Green | #16a34a | Success states, newsletter success |
| Red | #dc2626 | Error text, form validation |

### 1.3 Dark Mode Implementation

**Current pattern:**
- Uses CSS class `.dark` selector
- Applied via `document.documentElement.classList.toggle("dark")`
- Manual toggle with localStorage persistence
- System preference detection via `prefers-color-scheme: dark`

---

## 2. Typography System

### 2.1 Font Sizes Used

| Size | Value | Usage |
|------|-------|-------|
| `text-xs` | 0.75rem | Tags, labels, locale toggle, newsletter description |
| `text-sm` | 0.875rem | Nav links, footer text, form labels, skill labels |
| `text-base` | 1rem | (no direct use; default) |
| `text-lg` | 1.125rem | Body text, subtitles, descriptions |
| `text-xl` | 1.25rem | Card titles, section subheadings |
| `text-2xl` | 1.5rem | Section headings |
| `text-3xl` | 1.875rem | Page titles (About, Projects, Contact, Resume) |
| `text-4xl` | 2.25rem | Home page name (mobile) |
| `text-5xl` | 3rem | Home page name (desktop) |

### 2.2 Font Weights

| Weight | Value | Usage |
|--------|-------|-------|
| `font-normal` | 400 | (default body) |
| `font-medium` | 500 | Nav links, muted text, dates/labels |
| `font-semibold` | 600 | Links, newsletter title |
| `font-bold` | 700 | Headings, buttons, active text |

### 2.3 Font Families

| Family | Usage |
|--------|-------|
| `font-serif` | Home page name only (`font-serif`) |
| `font-sans` | Everything else (default via Tailwind) |
| `font-mono` | Skill percentage display |

### 2.4 Letter Spacing

- `tracking-tight` used on all headings: -0.025em

### 2.5 Line Heights

- `leading-relaxed` on body text: 1.625

---

## 3. Spacing System

### 3.1 Margin / Gap Patterns

| Spacing | Value | Usage |
|---------|-------|-------|
| `gap-2` | 0.5rem | Control groups (theme toggle + locale) |
| `gap-4` | 1rem | Form elements, small grids |
| `gap-6` | 1.5rem | Nav links, card grids |
| `mb-8` | 2rem | Section spacing |
| `mb-12` | 3rem | Navigation bottom margin |
| `mt-16` | 4rem | Footer top margin |
| `pt-8` | 2rem | Footer top padding |

### 3.2 Padding Patterns

| Spacing | Value | Usage |
|---------|-------|-------|
| `p-2` | 0.5rem | Buttons (toggle) |
| `px-2 py-1` | 0.5rem / 0.25rem | Locale toggle, tags |
| `px-3 py-2` | 0.75rem / 0.5rem | Inputs |
| `px-4 py-2` | 1rem / 0.5rem | Primary buttons |
| `py-3` | 0.75rem | Submit buttons (Contact) |
| `p-5` | 1.25rem | Skill cards |
| `p-6` | 1.5rem | Contact form card, newsletter success |

---

## 4. Border & Radius System

### 4.1 Border Radius

| Radius | Value | Usage |
|--------|-------|-------|
| `rounded-md` | 0.375rem | Locale toggle, tags |
| `rounded-lg` | 0.5rem | Buttons, inputs, cards |
| `rounded-xl` | 0.75rem | Profile image, cards |
| `rounded-2xl` | 1rem | Contact form card |
| `rounded-full` | 9999px | Replay button, timeline dots |

### 4.2 Border Widths

| Width | Usage |
|-------|-------|
| `border-b-2` | Active nav indicator, primary link underline |
| `border-l-2` | Timeline vertical line |
| `border-4` | Timeline dot outer border |

---

## 5. Inconsistencies Identified

### 5.1 Color Inconsistencies

| Issue | Location | Severity |
|-------|----------|----------|
| **Zinc level mismatch between light/dark** | Multiple | Medium |

**Details:** 
- Light mode body text: `text-zinc-600` (for secondary)
- Dark mode body text: `text-zinc-400`

This is actually semantically equivalent but uses different zinc levels. Should align to semantic tokens.

| Issue | Location | Severity |
|-------|----------|----------|
| **Inconsistent "muted" text shades | Navigation.tsx vs HomeContent.tsx | Low |

**Details:**
- Navigation inactive: `text-zinc-500 dark:text-zinc-400`
- Home body: `text-zinc-500 dark:text-zinc-400` (consistent)
- But actually quite consistent across the board

| Issue | Location | Severity |
|-------|----------|----------|
| **Hardcoded focus color** | globals.css:51 | Low |

**Details:**
```css
*:focus-visible {
  outline: 2px solid #3b82f6;  /* Hardcoded blue-500 */
}
```
Should use CSS variable.

### 5.2 Typography Inconsistencies

| Issue | Location | Severity |
|-------|----------|----------|
| **font-serif only on h1 home** | HomeContent.tsx:41 | Medium |

**Details:**
- Home page h1 uses `font-serif`
- All other headings use default sans-serif

Recommendation: Either use serif consistently for brand identity, or remove entirely.

| Issue | Location | Severity |
|-------|----------|----------|
| **Hardcoded fallback font** | globals.css:35 | Low |

**Details:**
```css
body {
  font-family: Arial, Helvetica, sans-serif;
}
```
Tailwind should handle this via `--font-sans`.

### 5.3 Spacing Inconsistencies

| Issue | Location | Severity |
|-------|----------|----------|
| **Magic numbers in padding/margin** | Various | Medium |

**Details:**

1. **Navigation**
   - `pb-1` for active indicator border

2. **Timeline in ResumeContent**
   - `pl-6` for timeline padding
   - `-left-[9px]` for absolute dot positioning
   - `w-4 h-4` for dot
   - `border-4 border-white dark:border-black` for dot border

3. **Skill bars**
   - `mb-1.5` for margin bottom
   - `h-2` for track height

These are design decisions but should be tokenized.

### 5.4 Component Pattern Inconsistencies

| Issue | Location | Severity |
|-------|----------|----------|
| **i18n duplication** | Navigation.tsx + NewsletterSignup.tsx | High |

**Details:**
- Navigation.tsx has inline `localeLabels` object
- NewsletterSignup.tsx has inline `i18n` object
- Both should use the messages/*.json pattern like the rest

| Issue | Location | Severity |
|-------|----------|----------|
| **Card background opacity inconsistency** | SkillsetVisualization.tsx:107 vs ContactContent.tsx:74 | Medium |

**Details:**
- Skill cards: `bg-white dark:bg-zinc-900/50` (semi-transparent dark bg)
- Contact form: `bg-zinc-50 dark:bg-zinc-800/50` (different pattern)

---

## 6. Animation System (Framer Motion)

### 6.1 Current Animations Used

| Animation | Duration | Easing | Usage |
|-----------|----------|--------|-------|
| Page enter | 400ms | easeOut | AnimatedLayout.tsx |
| Page exit | 200ms | default | AnimatedLayout.tsx |
| Scroll reveal | 600ms | easeOut | ScrollReveal.tsx |
| Skill card | 500ms | easeOut | SkillsetVisualization.tsx |
| Skill bar | 800ms | easeOut | SkillsetVisualization.tsx |
| CSS fade-in | 500ms | ease-out | globals.css |

### 6.2 Animation Values

```
Initial state: { opacity: 0, y: 10-30px }
Final state: { opacity: 1, y: 0 }
```

---

## 7. Recommended Token Structure

Based on the audit, here's the recommended semantic token structure:

### 7.1 Semantic Color Tokens

```
--color-background: var(--zinc-50)      [dark: --zinc-950]
--color-foreground: var(--zinc-900)      [dark: --zinc-50]
--color-foreground-muted: var(--zinc-500) [dark: --zinc-400]
--color-foreground-secondary: var(--zinc-600) [dark: --zinc-400]
--color-border: var(--zinc-200)            [dark: --zinc-800]
--color-border-hover: var(--zinc-300)       [dark: --zinc-700]
--color-surface: var(--zinc-100)          [dark: --zinc-800]
--color-surface-hover: var(--zinc-200)     [dark: --zinc-700]
--color-surface-card: var(--white)          [dark: --zinc-900 or 50% opacity]
--color-primary: var(--zinc-900)           [dark: --zinc-50]
--color-accent: var(--blue-500)             [dark: --blue-400]
--color-focus: var(--blue-500)
--color-success: var(--green-600)               [dark: --green-400]
--color-error: var(--red-600)                  [dark: --red-400]
```

### 7.2 Semantic Typography Tokens

```
--font-size-xs: 0.75rem
--font-size-sm: 0.875rem
--font-size-base: 1rem
--font-size-lg: 1.125rem
--font-size-xl: 1.25rem
--font-size-2xl: 1.5rem
--font-size-3xl: 1.875rem
--font-size-4xl: 2.25rem
--font-size-5xl: 3rem

--line-height-tight: 1.25
--line-height-relaxed: 1.625

--letter-spacing-tight: -0.025em
```

### 7.3 Semantic Spacing Tokens

```
--space-xs: 0.25rem
--space-sm: 0.5rem
--space-md: 0.75rem
--space-lg: 1rem
--space-xl: 1.5rem
--space-2xl: 2rem
--space-3xl: 3rem
--space-4xl: 4rem

--radius-sm: 0.375rem
--radius-md: 0.5rem
--radius-lg: 0.75rem
--radius-xl: 1rem
--radius-full: 9999px
```

### 7.4 Component-Specific Tokens

```
Button:
--btn-primary-bg: var(--zinc-900) [dark: --zinc-50]
--btn-primary-bg-hover: var(--zinc-800) [dark: --zinc-200]
--btn-primary-text: var(--white) [dark: --zinc-900]
--btn-toggle-bg: var(--zinc-100) [dark: --zinc-800]
--btn-toggle-text: var(--zinc-500) [dark: --zinc-400]

Card:
--card-bg: var(--white) [dark: --zinc-900]
--card-border: var(--zinc-200) [dark: --zinc-800]
--card-border-hover: var(--zinc-300) [dark: --zinc-700]
--card-radius: 0.75rem
--card-padding: 1.25rem

Input:
--input-bg: var(--white) [dark: --zinc-900]
--input-border: var(--zinc-200) [dark: --zinc-800]
--input-radius: 0.5rem
--input-focus-ring: var(--blue-500)

Tag:
--tag-bg: var(--zinc-100) [dark: --zinc-800]
--tag-text: var(--zinc-600) [dark: --zinc-400]
--tag-radius: 0.375rem

Link (nav):
--nav-link-text: var(--zinc-500) [dark: --zinc-400]
--nav-link-text-hover: var(--zinc-900) [dark: --zinc-50]
--nav-link-active-text: var(--zinc-900) [dark: --zinc-50]
--nav-link-active-border: var(--zinc-900) [dark: --zinc-50]
```

---

## 8. Action Items

### High Priority
1. [ ] Extract inline i18n from Navigation.tsx and NewsletterSignup.tsx into messages/*.json
2. [ ] Create shared useLocale() hook for consistent locale detection

### Medium Priority
3. [ ] Implement CSS custom property tokens for colors
4. [ ] Standardize font-serif usage (either keep for brand or remove)
5. [ ] Create component-specific tokens for cards, buttons, inputs

### Low Priority
6. [ ] Replace hardcoded #3b82f6 with CSS variable in focus-visible
7. [ ] Document design system in Storybook or similar
8. [ ] Create theme-aware Tailwind plugin for semantic tokens

---

## 9. Reference: Files Audited

- src/app/globals.css
- src/components/ThemeToggle.tsx
- src/components/Navigation.tsx
- src/components/SiteShell.tsx
- src/components/NewsletterSignup.tsx
- src/components/SkillsetVisualization.tsx
- src/components/ScrollReveal.tsx
- src/components/AnimatedLayout.tsx
- src/components/pages/HomeContent.tsx
- src/components/pages/AboutContent.tsx
- src/components/pages/ProjectsContent.tsx
- src/components/pages/ContactContent.tsx
- src/components/pages/ResumeContent.tsx
- src/components/pages/BlogContent.tsx
- messages/en.json
- messages/pl.json

---

*This audit prepared as contingency for [SEB-17](/SEB/issues/SEB-17). If UX Designer delivers by May 12, this becomes reference material.*
