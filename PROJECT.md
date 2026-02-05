# PROJECT.md — DesignKuhn

> Single source of truth for project documentation.
> Maintained by AI assistant. Do not delete history — append or mark deprecated.

---

## Project Overview

- **Name:** designkuhnde_new
- **Type:** Portfolio/Business website for a design studio
- **Version:** 1.0.0
- **Repository:** https://github.com/RomanPachkovskyi/designkuhn-website
- **Hosting:** Vercel (serverless)
- **Production URL:** https://designkuhn-website.vercel.app

---

## Tech Stack

| Category | Technology | Version |
|----------|------------|---------|
| Runtime | Node.js | — |
| Framework | Express.js | 4.19.2 |
| Template Engine | EJS | 3.1.9 |
| CSS Framework | Bootstrap | 5.3.3 (CDN) |
| Fonts | Google Fonts (Montserrat), Custom (MAK) | — |
| Validation | express-validator | 7.0.1 |
| Email | Nodemailer | 6.9.13 |
| i18n | i18n-express | 1.1.3 |
| Rate Limiting | express-rate-limit | 7.2.0 |
| Security | csurf, csrf, alt-xsrf | — |
| Testing | Mocha + Chai + Sinon | — |
| Dev Tools | Nodemon | 3.1.0 |

---

## Project Structure

```
designkuhn-main/
├── app.js                 # Express app entry point
├── package.json           # Dependencies & scripts
├── controllers/
│   └── main.js            # Request handlers (6 GET, 2 POST)
├── routes/
│   └── main.js            # Route definitions (8 routes)
├── middleware/
│   ├── errors.js          # Error handling (404, 500)
│   └── utils.js           # Email SMTP, Rate Limiting
├── i18n/
│   ├── de.json            # German translations
│   └── en.json            # English translations
├── views/
│   ├── index.ejs          # Home page
│   ├── horeca.ejs         # HoReCA services
│   ├── kleideranfertigung.ejs  # Custom clothing
│   ├── heimtextilien.ejs  # Home textiles
│   ├── kontakte.ejs       # Contacts
│   ├── myself.ejs         # About designer
│   ├── error.ejs          # Error page
│   └── includes/          # Reusable components
├── public/
│   ├── css/main.css       # Custom styles (502 lines)
│   ├── js/main.js         # Animations, rotation effects
│   ├── js/forms.js        # Form validation, AJAX
│   ├── fonts/             # Custom MAK font
│   └── img/               # Images, portfolio
└── tests/
    └── controllers/       # Unit tests
```

---

## Routes

| Method | Route | Controller | Description |
|--------|-------|------------|-------------|
| GET | `/` | getIndex | Home page |
| GET | `/horeca` | getHoreca | HoReCA services |
| GET | `/kleideranfertigung` | getKleideranfertigung | Custom clothing |
| GET | `/heimtextilien` | getHeimtextilien | Home textiles |
| GET | `/kontakte` | getKontakte | Contact page |
| GET | `/myself` | getMyself | About designer |
| GET | `/set-de` | getSetDe | Set language to German |
| GET | `/set-en` | getSetEn | Set language to English |
| POST | `/send-email` | postSendEmail | Contact form submission |
| POST | `/send-feedback` | postSendFeedback | Feedback submission |

---

## Scripts

```bash
npm start      # Run production server (node app.js)
npm run dev    # Run development server (nodemon app.js)
npm test       # Run tests (mocha tests/**/*.test.mjs)
```

---

## Environment Variables

Required in `.env` file:

```
SMTP_USER=<mailtrap username>
SMTP_PASS=<mailtrap password>
```

---

## Changelog

### 2026-02-05

#### Initial Analysis
- Performed full project analysis
- Documented tech stack, structure, routes
- Identified architecture: MVC pattern with EJS templates
- Languages supported: German (de), English (en)

#### Knowledge / Notes
- Email configured via Mailtrap sandbox (port 25, non-secure)
- CSRF protection enabled via csurf middleware
- Rate limiting: 1000 requests per 15 minutes
- Custom font MAK used for headings
- Bootstrap 5.3.3 loaded via CDN

#### Git & Deployment Setup
- Initialized Git repository
- Created GitHub repo: `RomanPachkovskyi/designkuhn-website`
- Added `vercel.json` for serverless deployment
- Modified `app.js` for Vercel compatibility (conditional server start)
- Successfully deployed to Vercel: https://designkuhn-website.vercel.app

#### Vercel Fixes Applied
- Added `dotenv` initialization for environment variables
- Explicitly set `views` directory path
- Disabled in-memory rate limiter (incompatible with serverless)
- Configured static file routing in vercel.json

---

## Decisions

| Date | Decision | Reasoning |
|------|----------|-----------|
| 2026-02-05 | Created PROJECT.md | Central documentation for project tracking |
| 2026-02-05 | Use Vercel for hosting | User preference, serverless Express support |
| 2026-02-05 | Branch name: main | Modern Git convention |

---

## Problems & Fixes

_No issues documented yet._

---

## TODO / Next Steps

- [ ] Add Ukrainian language support (uk.json)
- [ ] Migrate email to secure SMTP (port 587/465)
- [ ] Add helmet.js for security headers
- [ ] Optimize images (WebP format)
- [ ] Consider Docker containerization
- [ ] Add admin panel for content management
- [ ] Implement database for portfolio items

---

## Future Improvements (Ideas)

- Dark theme support
- Blog/news section
- Image gallery with filtering
- Price calculator for services
- Migration to TypeScript
- Migration to Next.js for SSR/SSG

---

_Last updated: 2026-02-05_
