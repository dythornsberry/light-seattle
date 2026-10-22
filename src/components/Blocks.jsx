import React from 'react';
import { Check, Phone } from 'lucide-react';
import ContactForm from '@/components/ContactForm';
import { photos, included, steps, faqs, PHONE_DISPLAY, PHONE_TEL } from '@/data/site';

export const Section = ({ id, title, intro, children, alt = false }) => (
  <section id={id} className={`scroll-mt-16 py-16 md:py-20 ${alt ? 'bg-background-alt' : ''}`}>
    <div className="max-w-6xl mx-auto px-4">
      {title && <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-3">{title}</h2>}
      {intro && <p className="text-foreground/75 max-w-2xl mb-8">{intro}</p>}
      {!intro && title && <div className="mb-8" />}
      {children}
    </div>
  </section>
);

export const Hero = ({ title, sub }) => (
  <section className="relative isolate overflow-hidden">
    <img
      src="/images/work/hero.webp"
      alt="Home lit with warm white C9 roofline lights and a wreath"
      className="absolute inset-0 -z-10 h-full w-full object-cover"
    />
    <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/80 via-black/55 to-black/20" />
    <div className="max-w-6xl mx-auto px-4 py-24 md:py-36">
      <h1 className="max-w-2xl text-4xl md:text-5xl font-semibold leading-tight text-white">{title}</h1>
      <p className="mt-5 max-w-xl text-lg text-white/85">{sub}</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <a href="#quote" className="inline-flex items-center rounded-md bg-primary px-6 py-3 font-semibold text-primary-foreground hover:brightness-110">
          Get a free quote
        </a>
        <a href={`tel:${PHONE_TEL}`} className="inline-flex items-center gap-2 rounded-md border border-white/40 px-6 py-3 font-semibold text-white hover:bg-white/10">
          <Phone className="w-4 h-4" /> {PHONE_DISPLAY}
        </a>
      </div>
      <p className="mt-5 text-sm text-white/75">Same day quotes by text. Most homes lit up within a week of booking.</p>
    </div>
  </section>
);

export const Included = () => (
  <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
    {included.map((item) => (
      <li key={item.title} className="flex gap-3 rounded-lg border border-border p-5">
        <Check className="w-5 h-5 mt-0.5 shrink-0 text-primary" />
        <div>
          <h3 className="font-semibold text-foreground">{item.title}</h3>
          <p className="mt-1 text-foreground/75">{item.body}</p>
        </div>
      </li>
    ))}
  </ul>
);

export const PhotoGrid = ({ items = photos }) => (
  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
    {items.map((p) => (
      <a key={p.src} href={p.src} target="_blank" rel="noopener noreferrer" className="block overflow-hidden rounded-lg bg-background-alt">
        <img
          src={p.src}
          alt={p.alt}
          loading="lazy"
          decoding="async"
          className="aspect-[4/3] w-full object-cover transition-transform duration-300 hover:scale-[1.03]"
        />
      </a>
    ))}
  </div>
);

export const Steps = () => (
  <ol className="grid gap-6 md:grid-cols-3">
    {steps.map((s, i) => (
      <li key={s.title} className="rounded-lg border border-border p-6">
        <span className="inline-flex w-8 h-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold mb-4">
          {i + 1}
        </span>
        <h3 className="font-semibold text-foreground mb-2">{s.title}</h3>
        <p className="text-foreground/75">{s.body}</p>
      </li>
    ))}
  </ol>
);

export const Faq = () => (
  <div className="divide-y divide-border rounded-lg border border-border max-w-3xl">
    {faqs.map((f) => (
      <details key={f.q} className="group p-5">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium text-foreground">
          {f.q}
          <span className="text-primary text-xl leading-none transition-transform group-open:rotate-45">+</span>
        </summary>
        <p className="mt-3 text-foreground/75">{f.a}</p>
      </details>
    ))}
  </div>
);

export const QuoteSection = ({ title = 'Get a free quote' }) => (
  <Section id="quote" title={title} intro={`Send your info and we will get back to you with a price. Or just call ${PHONE_DISPLAY}.`} alt>
    <div className="max-w-2xl rounded-xl border border-border bg-background p-6 md:p-8">
      <ContactForm />
    </div>
  </Section>
);
