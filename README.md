# Weekly Meal Planner

A personal, single-file meal planner — vanilla HTML/CSS/JS, no build step, no dependencies.

## Use it
- **Locally:** open `meal-planner.html` in any browser (double-click).
- **Hosted:** visit the Vercel URL (the site root serves the planner).

## What it does
- Pick from a built-in library of simple, cheap, fruit-free meals → drag or tap them onto a 7-day grid.
- Auto-generates a **shopping list**, consolidating shared ingredients and scaling by the number of people, grouped in **Woolworths** aisle order.
- **Email** button drafts your meal plan **and** shopping list.
- Favourites/pinning, dark mode, custom meals. Your plan is saved in the browser (localStorage) — nothing leaves your device.

## Hosting
Deployed as a static site on **Vercel**. `vercel.json` rewrites `/` to `meal-planner.html` so the root URL opens the app.

## Roadmap
- Phone access via the hosted URL.
- One-tap "email me my plan + list" via a Power Automate HTTP flow → Outlook.
