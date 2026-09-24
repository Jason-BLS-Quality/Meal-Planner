# Meal & Gym Planner

A personal, single-file meal + gym planner — vanilla HTML/CSS/JS, no build step, no dependencies.

## Use it
- **Locally:** open `meal-planner.html` in any browser (double-click).
- **Hosted:** visit the Vercel URL (the site root serves the planner). On a phone it gets an app-style bottom tab bar.

## What it does
**Today** — your dashboard: next workout, today's meals vs your calorie/protein target, steps, goal ETA, quick weight/steps log, leaderboard snapshot.

**Meals & shopping**
- Library of simple, cheap, fruit-free meals → drag or tap onto a 7-day grid. Every meal shows calories + protein (macros are worked out from the ingredients).
- **Auto-plan** fills the week to hit the selected person's calorie & protein target, with variety — and to a **weekly budget** (💰, default $150): it costs each meal by what it *adds* to the basket, so meals that share ingredients win, last night's dinner becomes 🍱 leftovers for lunch, snacks come out of multipacks, and a final pass swaps the priciest items until the week fits.
- Pack rounding stretches small overages (1.1 packs → buy 1); 🧂 pantry staples (oils, spices, sauces) are listed but left out of the total unless you mark them.
- **Per-person portions** — each profile's portion (auto from calories) scales shared meals; the shopping list buys the real total, and every recipe shows a plate guide (cooked grams, piece counts, wrap sizes) per person.
- **Grab & go snacks** — simple, portable snacks you can take to work.
- **Treats & takeaway night** — a sweet treat every day or every second day (≈8% of calories) and one takeaway night with a calorie budget ("a splash, not a blowout"), both built into the plan.
- Auto-generated **shopping list**, consolidated and scaled by People, in **Woolworths** aisle order, with whole-pack price estimates. Copy / Email / Print-PDF.
- **Recipes**: add your own meals; **Use It Up** finds meals for leftovers.

**Gym (per person)**
- Profile → **BMI**, BMR, maintenance and **daily calorie target**, protein/carbs/fat, water.
- **Auto-generated program** by goal (lose fat / build muscle / get stronger / general fitness), experience, days per week (2–6) and equipment (gym / dumbbells / bodyweight).
- **Workout logger**: last-session numbers, suggested weights (progressive overload: hit the top of the rep range → add weight), rest timer, swap/add exercises, PR detection.
- **Goals with ETA** — projected from the plan, then from your real weigh-in trend. Strength score, sets per muscle, strength charts, steps.
- **Leaderboard** — points, workouts, volume, most improved, streak, strength, cardio, steps; by week/month/all-time. **Crews** let friends compete via an invite link (shares names, avatars and workout stats only).
- **Steps from iPhone Health** via an Apple Shortcut that opens `…/#steps=N` (instructions in the app).

Data lives in the browser (localStorage). Optional 🔗 sync shares one household across phones (fitness records merge, so two phones logging at once don't overwrite each other).

## Hosting
Deployed as a static site on **Vercel**. `vercel.json` rewrites `/` to `meal-planner.html`.
Sync + crews use `api/plan.js` (Vercel KV / Upstash Redis via env vars `KV_REST_API_URL` + `KV_REST_API_TOKEN`, or the `UPSTASH_REDIS_REST_*` equivalents). Until those are set, sync and crews report "not connected" and everything else works locally.
