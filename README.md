# Dr. Arman Kayser — Oral & Dental Surgeon

A portfolio website for Dr. Arman Kayser, an Oral & Dental Surgeon practising in
Shyamoli, Dhaka. It is a showcase for one dentist and a small chamber, not a
clinic management system: four pages — Home, About, Services, Contact — that say
who he is, what the chamber treats and how to reach it. There is no blog, no
booking engine and no patient login. The one action the whole site is built
around is picking up the phone, with WhatsApp as the fallback for anyone who
would rather message. Built with React and Vite, routed with React Router, and
styled in plain CSS driven by a single set of design tokens.

## Quick start

Everything runs in Docker. Docker Desktop is the only thing you need installed.

    docker compose up web

Opens the development server on <http://localhost:5174>. Edits to `src/`,
`public/` and `index.html` appear in the browser immediately.

Port 5174 rather than Vite's usual 5173, because editors and other tooling
routinely hold 5173 already. If 5174 is also busy, pick another:

    WEB_PORT=5180 docker compose up web

The container always listens on 5173 internally; `WEB_PORT` only changes the
host side, and Vite's hot-reload socket follows it automatically.

    docker compose --profile prod up --build site

Builds the production bundle and serves it through nginx on
<http://localhost:8080>. Use this to check the real, minified site before
publishing.

`npm ci` runs inside the container, and `node_modules` lives in a Docker volume
rather than in the project folder. The Windows host therefore never executes a
package lifecycle script and never gets a `node_modules` directory written into
it — there is nothing to install, clean up or scan on the host side.

**Do not run `npm` on the host.** If `node_modules/` or `dist/` ever appear in
the project folder, something bypassed the container and those directories were
written by package code executing on Windows. Delete them:

    rm -rf node_modules dist

`package-lock.json` is the one generated file that belongs in the repo — it is
inert JSON, it pins every transitive dependency, and it is what makes `npm ci`
reproducible. Regenerate it inside the container, never on the host:

    docker compose exec web sh -c "cd /tmp && cp /app/package.json .       && npm install --package-lock-only && cat package-lock.json" > package-lock.json

## Editing the site

**`src/config/site.js` is the file you want.** Nearly every word on the site
lives there: the practice name and tagline, the phone number, the WhatsApp
number, the email address, the chamber address, the opening hours, all six
services with their descriptions and bullet points, the reasons-to-choose-us
panel, the patient journey steps, the statistics, the About page biography, the
team list and the testimonials. Change a value there and it updates everywhere
it appears — no other file needs touching.

The phone number is the clearest example. Every call button on every page, in
the header, in the footer and on the contact page reads the same derived
`links.tel` value, which is built from `contact.phone.dial`. Change that one
line and every call button on the site dials the new number. The same is true of
`links.whatsapp` and `links.maps`. Nothing anywhere hard-codes a `tel:` string,
so there is no risk of one stale button surviving in a corner of the site.

## The Google Business Profile

The listing is **Dr. Arman's Dental Care & Cure**, 4.9 stars from 44 reviews,
CID `7590116896021837297`. Those figures live in `google` in
`src/config/site.js` and drive the rating chip in the hero, which links to the
real listing rather than asserting a score the visitor cannot check.

Three things need doing on Google itself, none of which can be done from here:

1. **Claim the listing.** It is currently unclaimed — Google shows "Are you the
   owner of this business?" on it. Until it is claimed nobody can edit it, and
   Google will keep accepting public "suggest an edit" changes from strangers.
   Claim at <https://business.google.com>.
2. **Add the website.** The website field is empty. Once claimed, Info →
   Website. This is also what makes the listing and the site reinforce each
   other in search.
3. **Add the phone number.** Google is prompting "add a local business phone
   number", so 01915109006 is not on the listing either.

The profile name and the site title differ — Google says "Dental Care & Cure",
the site says "Dental Care". Search treats a consistent name, address and phone
across a site and its listing as a ranking signal, so pick one and change the
other.

## Adding photographs

Photographs go in `public/images/`, saved under specific filenames. Until a file
is there, the site draws a branded placeholder with the filename printed on it,
so an incomplete set never breaks the layout. `public/images/README.md` lists
every filename the site asks for, what each shot should show, the aspect ratio
it wants, and the export settings. Hand that file to whoever is taking the
photographs.

## Switching the colour scheme

The site ships with two palettes. The default is the warm yellow on deep navy
seen throughout. The alternative is the teal of Dr. Arman's existing print and
Facebook branding. To switch, add one attribute to the opening `<html>` tag in
`index.html`:

    <html lang="en" data-palette="teal">

That is the entire change. Every surface, button, icon tile, border and shadow
resolves through the design tokens in `src/styles/tokens.css`, so all of them
follow at once. Remove the attribute to go back.

## Project structure

    docker/            Dockerfile (dev, build and prod targets) and the nginx config
    docs/              DESIGN-SYSTEM.md — measured tokens, spacing and layout rules
    public/
      favicon.svg      the brand mark, drawn to match src/components/Logo.jsx
      robots.txt
      images/          photographs, plus the guide to what goes here
    src/
      components/      Button, Photo, Icon, Logo, Reveal, SectionHead
      sections/        the composed page bands — hero, services, why-us, and so on
      pages/           Home, About, Services, Contact
      styles/          tokens.css (every colour, size, radius) and base.css
      config/site.js   all copy and data
      App.jsx          routes and shared layout
    index.html         document head, fonts and the local-business schema

## A note on the design

The layout follows the visual language of a commercial dental theme — the deep
asymmetric corner radii, the yellow accent band and the circular photography —
rebuilt here from measured design tokens with original components, logo and copy.
