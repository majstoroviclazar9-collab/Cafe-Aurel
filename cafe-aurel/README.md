<div align="center">

# Café Aurel ☕
*Good coffee. Golden moments.*

A little Art Deco café website, built with React, TypeScript, and Tailwind CSS.

[☕ Come on in: see the live site](#)

</div>

## What is this?

Café Aurel is a made-up neighbourhood café in Dorćol, Belgrade, and this is its website. I built it as a portfolio project to see how far a strong visual identity could go: warm coffee tones, Art Deco details, and typography with a bit of personality.

I wanted it to feel like a real place you'd want to walk into: friendly, easy to find your way around, and good-looking on any screen.

## What's inside

- **Works on any screen.** Designed for desktop first, but it holds up nicely on phones too.
- **Art Deco look and feel.** Decorative patterns, warm colours, and an editorial style.
- **A menu you can actually browse.** Accessible tabs built with Radix UI.
- **Gentle motion.** A few subtle animations to make things feel alive without getting in the way.
- **Typography with character.** Cormorant Garamond for headings, DM Sans for everything you need to read comfortably.
- **Real photography.** Hosted locally, with credit to the photographers (see below).
- **The café's story.** Menu, backstory, and sample visiting details.

## Built with

| Tool | What it's for |
|---|---|
| React 19 | Building the interface from components |
| TypeScript | Catching mistakes before they reach the browser |
| Vite 8 | Dev server and production builds |
| Tailwind CSS 4 | Styling |
| Radix UI | Accessible building blocks, like the menu tabs |
| Lucide React | Icons |
| CSS | The custom touches: type, responsive rules, animations |

A few small helpers also made the cut: `clsx`, `tailwind-merge`, and `class-variance-authority`.

## Run it yourself

You'll need Node.js 22.13.0 or newer, plus npm.

```bash
# Clone the repo and step inside
cd cafe-aurel

# Install dependencies
npm install

# Start the dev server
npm run dev
```

Then open the address that appears in your terminal (usually http://localhost:5173).

### Commands

| Command | What it does |
|---|---|
| `npm run dev` | Starts the dev server |
| `npm run build` | Type-checks everything and builds the site into `dist/` |
| `npm run preview` | Lets you preview the production build locally |

## Where things live

```
cafe-aurel/
├── app/
│   ├── page.tsx            # Page content, navigation, menu data, interactions
│   ├── globals.css         # Theme, layout, responsive styles, animations
│   └── fonts.css           # Local font declarations
├── components/
│   └── ui/
│       └── tabs.tsx        # The accessible menu tabs
├── public/
│   ├── images/             # Café photography
│   ├── fonts/              # Locally hosted fonts
│   └── favicon.svg
├── src/
│   └── main.tsx            # React entry point
├── index.html
├── package.json
└── vite.config.ts
```

## Make it your own

Want to turn this into a site for a different café or brand? Here's where to start:

1. Swap in your own details, menu items, and prices in `app/page.tsx`.
2. Tweak the colours and decorative styles in `app/globals.css`.
3. Change fonts in `app/fonts.css` if you'd like a different feel.
4. Drop your images into `public/images/` and update the credits.
5. Update the page title and description in `index.html`.

## Deployment

This is a static frontend, and it lives on Vercel. To build it yourself:

```bash
npm run build
```

Everything lands in `dist/`. On Vite-friendly hosts, use `npm run build` as the build command and `dist` as the output directory.

## Good to know

Café Aurel isn't a real business. The story, menu, prices, hours, and location are all sample content, and the map link points to the Dorćol neighbourhood rather than an actual address.

It's also frontend-only: no orders, no bookings, no customer data, no backend. You don't need any API keys or environment variables to run it.

## Credits

Photos come from Unsplash and are stored locally. Thank you to:

- **Matt Hoffman** for the coffee in a ceramic mug
- **Alan Zhang** for the sunlit café interior
- **Fajar Imani Firdaus** for the coffee and croissant

Fonts are Cormorant Garamond and DM Sans, via Google Fonts. You'll find their licences in the `licenses/` folder.

<div align="center">

Made with care, for the love of good design and good coffee.

[Visit Café Aurel](#)

</div>