# DFA Systems Website

Static bilingual consulting website for **DFA Systems** built with HTML, CSS and vanilla JavaScript.

## Project Structure

```text
.
├── index.html
├── services.html
├── portfolio.html
├── about.html
├── contact.html
├── login.html
├── private-demos.html
├── assets
│   ├── css
│   │   └── styles.css
│   └── js
│       ├── main.js
│       ├── translations.js
│       └── auth-demo.js
└── README.md
```

## Run Locally

1. Open the project folder.
2. Double-click `index.html` or serve with any static server.
3. Navigate between pages using header links.

No build tools, npm packages or framework setup required.

## How Translations Work

- All text mappings are centralized in `assets/js/translations.js`.
- Structure uses language keys (`en`, `es`) and page keys (`index`, `services`, etc.) plus shared `common` entries.
- Elements in HTML use `data-i18n="key"` attributes.
- `assets/js/main.js` reads selected language and injects translated text.
- Language preference is stored in `localStorage` under `dfaLanguage`.

### Add/Edit Content in Both Languages

1. Add the translation key in `translations.js` under both `en` and `es`.
2. Add `data-i18n="yourKey"` to the target HTML element.
3. Reload the page and switch languages to verify.

## Fake Auth Flow (Demo Only)

Implemented in `assets/js/auth-demo.js`.

- Login page validates a static credential pair:
  - Email: `demo@dfasystems.com`
  - Password: `demo123`
- On success, localStorage key `dfaDemoAuth` is set to `true` and user is redirected to `private-demos.html`.
- `private-demos.html` checks this key; if missing/false, user is redirected to `login.html`.
- Logout resets `dfaDemoAuth` to `false`.

Important: this is client-side placeholder auth and is **not secure** for production.

## Add Portfolio Items

1. Open `portfolio.html`.
2. Duplicate a `.project-card` block.
3. Set `data-category` values (comma-separated): `automation`, `data`, `dashboards`, `software`, `industry`.
4. Add translation keys in `translations.js` for title/description if needed.

## Replace Placeholder Links

Update these locations before publishing:

- `contact.html`: email, LinkedIn, GitHub placeholders.
- `portfolio.html` and `private-demos.html`: button `href="#"` links.

## Future Real Authentication Integration

Recommended options:

1. Firebase Auth
2. Supabase Auth
3. Custom backend session auth

Suggested migration steps:

1. Replace static credential check in `auth-demo.js` with provider login API.
2. Replace localStorage auth flag with secure token/session check.
3. Protect private routes server-side where possible.
4. Remove demo credentials hint from `login.html`.
