# Migration Plan: Express+EJS → Next.js

> Technical assessment and migration roadmap for DesignKuhn project.
> Created: 2026-02-05

---

## Current State Assessment

### Tech Stack (Express+EJS)

| Category | Technology | Version |
|----------|------------|---------|
| Runtime | Node.js | — |
| Framework | Express.js | 4.19.2 |
| Template Engine | EJS | 3.1.9 |
| CSS Framework | Bootstrap | 5.3.3 (CDN) |
| Validation | express-validator | 7.0.1 |
| Email | Nodemailer | 6.9.13 |
| i18n | i18n-express | 1.1.3 |

### Code Quality Score: 6/10

**Strengths:**
- MVC architecture with clear separation
- Form validation with sanitization (escape, trim)
- i18n support via JSON files
- CSRF protection, rate limiting

**Weaknesses:**
- Code duplication in controllers
- Hardcoded email addresses
- Deprecated packages (csurf)
- No TypeScript
- No ESLint/Prettier
- Content hardcoded in templates (no CMS)

---

## Target State: Next.js

### Proposed Tech Stack

| Category | Technology | Why |
|----------|------------|-----|
| Framework | Next.js 14+ (App Router) | SSR/SSG, React ecosystem, Vercel native |
| Language | TypeScript | Type safety, better DX |
| Styling | Tailwind CSS | Utility-first, smaller bundle |
| Forms | React Hook Form + Zod | Type-safe validation |
| i18n | next-intl | Built for Next.js, typed dictionaries |
| Email | Resend or Nodemailer | Modern API, better deliverability |

---

## Project Structure (Next.js)

```
designkuhn-nextjs/
├── app/                          # App Router (Next.js 14+)
│   ├── layout.tsx                # Root layout (head, fonts, nav, footer)
│   ├── page.tsx                  # Home page (/)
│   ├── horeca/
│   │   └── page.tsx              # /horeca
│   ├── kleideranfertigung/
│   │   └── page.tsx              # /kleideranfertigung
│   ├── heimtextilien/
│   │   └── page.tsx              # /heimtextilien
│   ├── kontakte/
│   │   └── page.tsx              # /kontakte
│   ├── myself/
│   │   └── page.tsx              # /myself
│   ├── api/
│   │   ├── send-email/
│   │   │   └── route.ts          # POST /api/send-email
│   │   └── send-feedback/
│   │       └── route.ts          # POST /api/send-feedback
│   └── globals.css               # Global styles
│
├── components/
│   ├── layout/
│   │   ├── Navigation.tsx
│   │   ├── Footer.tsx
│   │   └── Cover.tsx
│   ├── sections/
│   │   ├── Portfolio.tsx
│   │   ├── Testimonials.tsx
│   │   ├── Contact.tsx
│   │   ├── Service.tsx
│   │   └── Instagram.tsx
│   └── ui/
│       ├── Button.tsx
│       ├── Card.tsx
│       └── Form.tsx
│
├── lib/
│   ├── i18n/
│   │   ├── config.ts             # i18n configuration
│   │   ├── dictionaries/
│   │   │   ├── de.json
│   │   │   ├── en.json
│   │   │   └── uk.json           # Easy to add new languages
│   │   └── getDictionary.ts
│   ├── email.ts                  # Email service
│   └── validations.ts            # Zod schemas
│
├── public/
│   ├── fonts/
│   ├── images/
│   │   └── portfolio/
│   └── favicon.ico
│
├── tailwind.config.ts
├── next.config.js
├── package.json
└── tsconfig.json
```

---

## Migration Phases

### Phase 1: Project Setup
**Executor:** Claude Code
**Estimated time:** 15 minutes

- [ ] Create Next.js project with TypeScript
- [ ] Configure Tailwind CSS
- [ ] Set up folder structure
- [ ] Copy fonts and images to public/
- [ ] Configure next.config.js

```bash
npx create-next-app@latest designkuhn-nextjs --typescript --tailwind --app --src-dir=false
```

---

### Phase 2: Layout & Navigation
**Executor:** Claude Code
**Estimated time:** 30 minutes

- [ ] Create root layout.tsx with fonts
- [ ] Port Navigation component from EJS
- [ ] Port Footer component from EJS
- [ ] Set up global CSS (convert from Bootstrap to Tailwind)
- [ ] Add MAK custom font via next/font

---

### Phase 3: Home Page
**Executor:** Claude Code
**Estimated time:** 45 minutes

- [ ] Create Cover component
- [ ] Create Portfolio section
- [ ] Create Testimonials section
- [ ] Create Contact section
- [ ] Wire up home page (app/page.tsx)

---

### Phase 4: Inner Pages
**Executor:** Codex
**Estimated time:** 1 hour

- [ ] /horeca page
- [ ] /kleideranfertigung page
- [ ] /heimtextilien page
- [ ] /myself page
- [ ] /kontakte page
- [ ] Create reusable page template component

---

### Phase 5: UI Components
**Executor:** Claude Code
**Estimated time:** 30 minutes

- [ ] Button component with variants
- [ ] Card component
- [ ] Form input components
- [ ] Convert Bootstrap classes to Tailwind

---

### Phase 6: Internationalization (i18n)
**Executor:** Codex
**Estimated time:** 45 minutes

- [ ] Set up next-intl
- [ ] Migrate de.json dictionary
- [ ] Migrate en.json dictionary
- [ ] Add uk.json (Ukrainian)
- [ ] Create language switcher component
- [ ] Configure middleware for locale detection

---

### Phase 7: API Routes
**Executor:** Claude Code
**Estimated time:** 30 minutes

- [ ] Create /api/send-email route
- [ ] Create /api/send-feedback route
- [ ] Set up Zod validation schemas
- [ ] Configure email service (Resend or Nodemailer)
- [ ] Add rate limiting (if needed)

---

### Phase 8: Forms
**Executor:** Codex
**Estimated time:** 45 minutes

- [ ] Install React Hook Form
- [ ] Create contact form component
- [ ] Create feedback form component
- [ ] Add client-side validation
- [ ] Implement form submission with loading states
- [ ] Add success/error notifications

---

### Phase 9: Optimization
**Executor:** Claude Code
**Estimated time:** 30 minutes

- [ ] Convert images to use next/image
- [ ] Add metadata (SEO) to all pages
- [ ] Generate sitemap.xml
- [ ] Add robots.txt
- [ ] Configure Open Graph images
- [ ] Test Lighthouse scores

---

### Phase 10: Testing & Deployment
**Executor:** Claude Code
**Estimated time:** 30 minutes

- [ ] Manual testing of all pages
- [ ] Test forms and email sending
- [ ] Test language switching
- [ ] Test responsive design
- [ ] Deploy to Vercel
- [ ] Configure environment variables
- [ ] Update DNS (if custom domain)

---

## Time Estimates

| Executor | Phases | Time |
|----------|--------|------|
| Claude Code | 1, 2, 3, 5, 7, 9, 10 | ~3 hours |
| Codex | 4, 6, 8 | ~2.5 hours |
| **Total (sequential)** | All | ~5-6 hours |
| **Total (parallel)** | Claude + Codex | ~3-4 hours |

---

## Benefits After Migration

| Feature | Express+EJS | Next.js |
|---------|-------------|---------|
| Add new page | 3 files (view, controller, route) | 1 file (page.tsx) |
| Add new language | Edit i18n-express config | Add JSON file |
| Image optimization | Manual | Automatic (next/image) |
| SEO metadata | Manual in EJS | Built-in API |
| Page load speed | ~2-3s | ~0.5-1s (SSG) |
| TypeScript | ❌ | ✅ |
| Hot Reload | Nodemon (full reload) | Fast Refresh (instant) |
| Bundle size | Bootstrap 5 (~200KB) | Tailwind (~10KB used) |

---

## Code Examples

### Home Page (app/page.tsx)

```tsx
import { getDictionary } from '@/lib/i18n/getDictionary'
import Cover from '@/components/layout/Cover'
import Portfolio from '@/components/sections/Portfolio'
import Contact from '@/components/sections/Contact'
import Testimonials from '@/components/sections/Testimonials'

export const metadata = {
  title: 'DesignKuhn - Maßgeschneiderte Mode',
  description: 'Individuelle Kleidung und Heimtextilien nach Maß',
}

export default async function Home() {
  const dict = await getDictionary('de')

  return (
    <>
      <Cover
        topic={dict.main}
        image="/images/cover.jpg"
        showLeftBlock
        showRightBlock
        showDiscount
      />
      <Portfolio items={dict.portfolio} />
      <Testimonials items={dict.testimonials} />
      <Contact title={dict.contact.title} />
    </>
  )
}
```

### API Route (app/api/send-email/route.ts)

```tsx
import { NextResponse } from 'next/server'
import { z } from 'zod'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
  tel: z.string().min(1, 'Phone is required'),
  message: z.string().optional(),
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const result = schema.safeParse(body)

    if (!result.success) {
      return NextResponse.json(
        { errors: result.error.issues },
        { status: 400 }
      )
    }

    await resend.emails.send({
      from: 'website@designkuhn.de',
      to: 'info@designkuhn.de',
      subject: 'New contact form submission',
      text: `
        Name: ${result.data.name}
        Email: ${result.data.email}
        Phone: ${result.data.tel}
        Message: ${result.data.message || 'N/A'}
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    )
  }
}
```

### Cover Component (components/layout/Cover.tsx)

```tsx
import Image from 'next/image'
import { Button } from '@/components/ui/Button'

interface CoverProps {
  topic: {
    title: string
    subtitle: string
    buttonText?: string
  }
  image: string
  showLeftBlock?: boolean
  showRightBlock?: boolean
  showDiscount?: boolean
}

export default function Cover({
  topic,
  image,
  showLeftBlock,
  showRightBlock,
  showDiscount,
}: CoverProps) {
  return (
    <section className="relative h-screen flex items-center">
      <Image
        src={image}
        alt={topic.title}
        fill
        className="object-cover -z-10"
        priority
      />
      <div className="container mx-auto px-4">
        <h1 className="font-mak text-5xl md:text-7xl text-white">
          {topic.title}
        </h1>
        <p className="mt-4 text-xl text-white/80">
          {topic.subtitle}
        </p>
        {topic.buttonText && (
          <Button className="mt-8" size="lg">
            {topic.buttonText}
          </Button>
        )}
      </div>
      {showDiscount && (
        <div className="absolute top-20 right-10 bg-red-500 text-white p-4 rounded-full">
          -20%
        </div>
      )}
    </section>
  )
}
```

---

## Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Learning curve (React/Next.js) | Medium | Use Claude Code for complex parts |
| Design differences after migration | Low | Use Tailwind utilities that match Bootstrap |
| SEO impact during transition | Medium | Keep old site live until new is ready |
| Email deliverability | Low | Use Resend with proper domain setup |

---

## Decision Log

| Date | Decision | Reasoning |
|------|----------|-----------|
| 2026-02-05 | Choose Next.js over Astro | Better for forms, API routes, React ecosystem |
| 2026-02-05 | Choose Tailwind over keeping Bootstrap | Smaller bundle, more flexible |
| 2026-02-05 | Choose next-intl for i18n | Native Next.js integration, typed |
| 2026-02-05 | Consider Resend over Nodemailer | Better API, analytics, deliverability |

---

## Next Steps

1. **Decision:** Confirm migration start date
2. **Preparation:** Review current content for accuracy
3. **Execution:** Follow phases 1-10
4. **Validation:** Test all functionality
5. **Launch:** Switch DNS to new deployment

---

_Document created: 2026-02-05_
_Status: Planning phase_
