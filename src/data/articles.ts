/**
 * Patient education articles.
 *
 * An article is published only when status === 'published' AND it has a named author, a named clinical reviewer
 * with credentials, a review date and at least one reference. Drafts render in preview builds (noindex, with a
 * visible "draft" banner) so the clinic can review them; launch builds exclude them entirely.
 * Never fill author/reviewer fields with anyone who has not actually written or reviewed the article.
 */
export interface Article {
  slug: string;
  title: string;
  metaDescription: string;
  category: 'Dermatology' | 'Hair' | 'Laser & aesthetics' | 'Women’s health' | 'Face';
  status: 'draft' | 'published';
  author: { name: string; credentials: string } | null;
  reviewer: { name: string; credentials: string } | null;
  published: string | null;   // ISO date
  updated: string | null;     // ISO date
  references: { title: string; url: string }[];
  summary: string;
  body: { heading?: string; paragraphs: string[] }[];
  related: string[];
}

/** Fully approved: status published + named author + named reviewer + dates + at least one reference. */
export const isPublishable = (a: Article) =>
  a.status === 'published' && !!a.author && !!a.reviewer && !!a.published && !!a.updated && a.references.length > 0;

export const articles: Article[] = [
  {
    slug: 'why-does-acne-keep-coming-back',
    title: 'Why does acne keep coming back?',
    metaDescription: 'Why acne often returns after treatment, common reasons it persists into adulthood, and what helps keep it under control.',
    category: 'Dermatology', status: 'draft', author: null, reviewer: null, published: null, updated: null, references: [],
    summary: 'Acne is often a long-term condition rather than a one-off problem. Understanding why it returns makes treatment more effective.',
    body: [
      { paragraphs: ['Many people find that acne clears with treatment and then returns. This is common, and it does not usually mean the treatment “failed”. Acne is driven by factors — oil production, how the skin sheds cells inside the follicle, hormones and inflammation — that continue after a course of treatment ends.'] },
      { heading: 'Common reasons acne persists', paragraphs: ['Stopping treatment as soon as the skin looks clear, using products that block pores, hormonal changes, and picking or squeezing spots can all contribute. In some adult women, hormonal factors are important. Some medicines can also trigger acne-like eruptions.'] },
      { heading: 'What helps', paragraphs: ['A dermatologist can match treatment to the type of acne, explain how long to use it, and plan maintenance to reduce relapses. Treating acne early also lowers the risk of scarring, which is harder to treat than active acne.'] },
    ],
    related: ['/dermatology/acne/', '/dermatology/acne-scars/'],
  },
  {
    slug: 'understanding-fractional-co2-laser',
    title: 'Understanding fractional CO2 laser',
    metaDescription: 'What fractional CO2 laser is, how it works, what it is used for at the clinic, and what to consider before treatment.',
    category: 'Laser & aesthetics', status: 'draft', author: null, reviewer: null, published: null, updated: null, references: [],
    summary: 'Fractional CO2 laser is a resurfacing treatment used for selected scars and skin texture concerns. Here is what it involves.',
    body: [
      { paragraphs: ['A fractional CO2 laser delivers energy in a grid of microscopic columns, treating part of the skin while leaving the surrounding skin intact to support healing. Over the following months, the skin remodels collagen in the treated area.'] },
      { heading: 'What it is used for at our clinic', paragraphs: ['At Saxena Skin and Cosmetic Clinic, fractional CO2 laser treatment using Italian DEKA technology is offered for selected concerns including acne scars, stretch marks and post-traumatic injury scars, following specialist assessment.'] },
      { heading: 'Before you decide', paragraphs: ['Suitability depends on your skin type, the kind of scar, any active skin disease and your medical history. Redness, swelling and a period of healing are expected, and there are risks including pigment change. A specialist consultation is the place to weigh these for your own skin.'] },
    ],
    related: ['/laser-treatments/fractional-co2-laser/', '/dermatology/acne-scars/'],
  },
];

/** Topics from the client brief, shown as a transparent editorial roadmap (not as published content). */
export const plannedTopics: { category: string; titles: string[] }[] = [
  { category: 'Dermatology', titles: ['Understanding melasma', 'Psoriasis and modern treatment options', 'Understanding vitiligo', 'Fungal infection or eczema?', 'Skin allergies and chronic itching'] },
  { category: 'Hair', titles: ['Causes of hair fall in men and women', 'Understanding androgenetic alopecia', 'Hair transplantation: who is a suitable candidate?', 'PRP for hair loss', 'Understanding alopecia areata'] },
  { category: 'Laser & aesthetics', titles: ['Botox versus dermal fillers', 'Chemical peels and their indications', 'Laser hair reduction', 'Acne scar treatment options', 'Understanding skin boosters'] },
  { category: 'Women’s health & face', titles: ['Understanding cosmetic gynaecology', 'Facial aesthetics and facial harmony', 'Surgical versus non-surgical facial rejuvenation'] },
];
