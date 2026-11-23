/**
 * Speciality, condition and treatment pages.
 *
 * availability:
 *   'clinic-stated' — the clinic has stated it provides this (client brief / master prompt). Copy may say the clinic offers it.
 *   'to-confirm'    — a candidate topic from the brief. Copy explains it in general terms only and never claims it is offered.
 * review: every medical page starts 'pending'. Launch builds fail until a named clinician approves it (see scripts/verify-launch.mjs).
 *
 * Writing rules: no outcome guarantees, no session counts or downtime figures for specific devices, no statistics,
 * no individual diagnosis. Educational content does not replace a consultation.
 */
export type Availability = 'clinic-stated' | 'to-confirm';
export interface Section { id: string; heading: string; paragraphs?: string[]; list?: string[]; listIntro?: string }
export interface Topic {
  path: string;
  parent?: string;
  kind: 'speciality' | 'condition' | 'treatment';
  navLabel: string;
  h1: string;
  eyebrow: string;
  metaTitle: string;
  metaDescription: string;
  lede: string;
  availability: Availability;
  doctors: string[];
  feature?: 'deka';
  image?: 'laser-console' | 'laser-controls' | 'treatment-preparation';
  sections: Section[];
  services?: { label: string; path?: string; availability: Availability }[];
  related: string[];
  review: { status: 'pending' | 'approved'; reviewer?: string; date?: string };
}

const pending = { status: 'pending' as const };

export const DEKA_STATEMENT =
  'Fractional CO2 laser treatment using Italian DEKA technology, offered for selected concerns including acne scars, stretch marks and post-traumatic injury scars, following specialist assessment.';

export const topics: Topic[] = [
  /* =========================================================================================== DERMATOLOGY */
  {
    path: '/dermatology/', kind: 'speciality', navLabel: 'Dermatology',
    h1: 'Clinical dermatology in Jabalpur', eyebrow: 'Speciality · Dermatology',
    metaTitle: 'Dermatologist in Jabalpur | Saxena Skin and Cosmetic Clinic',
    metaDescription: 'Specialist dermatology consultations in Jabalpur for acne, psoriasis, vitiligo, eczema, pigmentation and other skin conditions, led by consultant dermatologists.',
    lede: 'Skin conditions are medical conditions. Our consultant dermatologists assess, diagnose and manage common and complex skin disorders — from acne and eczema to psoriasis, vitiligo and pigmentation — with treatment plans built around each patient.',
    availability: 'clinic-stated', doctors: ['dr-rajeev-saxena', 'dr-akshay-saxena'],
    sections: [
      { id: 'approach', heading: 'A specialist approach to skin', paragraphs: [
        'Many skin conditions look alike at first glance but have different causes and need different treatment. A dermatology consultation starts with a careful history and examination, and where needed, investigations, so that treatment is based on an accurate diagnosis rather than trial and error.',
        'Chronic conditions such as psoriasis and vitiligo are managed over time. We aim to explain each condition clearly, set realistic expectations and adjust treatment as your skin responds.',
      ] },
      { id: 'experience', heading: 'More than four decades of dermatological experience', paragraphs: [
        'The clinic’s dermatology practice is led by Dr. Rajeev Saxena, senior consultant dermatologist, who has more than 40 years of dermatological experience. He is joined by Dr. Akshay Saxena, whose practice combines clinical dermatology with laser dermatology.',
      ] },
      { id: 'when', heading: 'When to see a dermatologist', listIntro: 'Consider a specialist consultation if you have:', list: [
        'A rash, patch or spot that persists, spreads or keeps returning',
        'Acne that is painful, scarring, or not improving with simple measures',
        'Itching that disturbs sleep or daily life',
        'New white patches, or changes in skin colour',
        'A mole or growth that changes in size, shape or colour, bleeds or itches',
        'Hair or nail changes that concern you',
      ] },
    ],
    services: [
      { label: 'Acne', path: '/dermatology/acne/', availability: 'clinic-stated' },
      { label: 'Acne scars', path: '/dermatology/acne-scars/', availability: 'clinic-stated' },
      { label: 'Psoriasis', path: '/dermatology/psoriasis/', availability: 'clinic-stated' },
      { label: 'Vitiligo', path: '/dermatology/vitiligo/', availability: 'clinic-stated' },
      { label: 'Melasma & pigmentation', path: '/dermatology/melasma-pigmentation/', availability: 'clinic-stated' },
      { label: 'Eczema & dermatitis', path: '/dermatology/eczema/', availability: 'clinic-stated' },
    ],
    related: ['/conditions-we-treat/', '/laser-treatments/', '/hair-clinic/'],
    review: pending,
  },
  {
    path: '/dermatology/acne/', parent: '/dermatology/', kind: 'condition', navLabel: 'Acne',
    h1: 'Acne', eyebrow: 'Dermatology · Condition guide',
    metaTitle: 'Acne Treatment in Jabalpur — Dermatologist Guide | Saxena Clinic',
    metaDescription: 'What causes acne, how a dermatologist assesses it, treatment approaches, side effects and realistic expectations. Specialist acne consultations in Jabalpur.',
    lede: 'Acne is one of the most common skin conditions dermatologists treat. It is a medical condition of the hair follicles and oil glands — not a matter of hygiene — and early, appropriate treatment can reduce the risk of scarring.',
    availability: 'clinic-stated', doctors: ['dr-rajeev-saxena', 'dr-akshay-saxena'],
    sections: [
      { id: 'what', heading: 'What acne is', paragraphs: [
        'Acne develops when hair follicles become blocked with oil (sebum) and skin cells. Bacteria that normally live on the skin and inflammation then contribute to the spots. It most often affects the face, chest and back.',
      ] },
      { id: 'signs', heading: 'Common signs', list: [
        'Blackheads and whiteheads (comedones)',
        'Red, tender bumps (papules) and pus-filled spots (pustules)',
        'Deeper, painful lumps (nodules and cysts) in more severe acne',
        'Dark marks or scars left after spots heal',
      ] },
      { id: 'causes', heading: 'Causes and triggers', paragraphs: [
        'Hormonal changes, genetics and the skin’s oil production all play a part. Some medicines, heavy or pore-blocking cosmetics, friction and, in some people, other factors may make acne worse. Hormonal conditions can be relevant for some adult women with acne, and your doctor may ask about this.',
      ] },
      { id: 'assessment', heading: 'How acne is assessed', paragraphs: [
        'A dermatologist looks at the type and severity of acne, where it occurs, whether it is scarring, how long it has been present and what has been tried. This guides which treatment is appropriate — mild acne and scarring nodular acne are managed very differently.',
      ] },
      { id: 'treatment', heading: 'Treatment approaches', listIntro: 'Depending on the type and severity, a dermatologist may consider:', list: [
        'Topical treatments applied to the skin',
        'Oral medicines for more extensive or inflammatory acne',
        'Hormonal assessment and treatment for selected patients',
        'Procedures for persistent lesions, and scar treatment once acne is controlled',
      ], paragraphs: [
        'Treatment is chosen individually. Some medicines need monitoring, and some are not suitable in pregnancy or when planning pregnancy — your doctor will explain this.',
      ] },
      { id: 'risks', heading: 'Side effects to be aware of', paragraphs: [
        'Acne treatments can cause dryness, irritation, redness or sun sensitivity, particularly at the start. Oral medicines have their own possible side effects, which your dermatologist will discuss before starting. Do not stop or change prescribed treatment without advice.',
      ] },
      { id: 'expectations', heading: 'Realistic expectations', paragraphs: [
        'Acne treatments take time — improvement is usually gradual over weeks to months, and acne can return after treatment stops. Ongoing maintenance is often part of the plan. Picking or squeezing spots increases the risk of marks and scars.',
      ] },
    ],
    related: ['/dermatology/acne-scars/', '/laser-treatments/fractional-co2-laser/', '/dermatology/melasma-pigmentation/'],
    review: pending,
  },
  {
    path: '/dermatology/acne-scars/', parent: '/dermatology/', kind: 'condition', navLabel: 'Acne scars',
    h1: 'Acne scars', eyebrow: 'Dermatology · Condition guide',
    metaTitle: 'Acne Scar Treatment in Jabalpur — Fractional CO2 Laser | Saxena Clinic',
    metaDescription: 'Acne scar types, assessment and treatment options in Jabalpur, including fractional CO2 laser using Italian DEKA technology following specialist assessment.',
    lede: 'Acne scars form when inflammation damages the deeper layers of the skin. They are different from the temporary dark marks acne often leaves, and they need a different approach. Treatment aims to improve the texture and appearance of scars — not to erase them completely.',
    availability: 'clinic-stated', doctors: ['dr-akshay-saxena', 'dr-rajeev-saxena'], feature: 'deka', image: 'laser-console',
    sections: [
      { id: 'what', heading: 'What acne scars are', paragraphs: [
        'When inflamed acne heals, the skin can lose tissue, leaving depressions, or occasionally produce excess tissue, leaving raised scars. Depressed scars are often described by their shape — narrow, deep “ice-pick” scars, box-shaped scars and broader rolling scars. Many people have a mixture.',
        'Flat brown or red marks after acne (post-inflammatory pigmentation or redness) are not true scars and often fade over time; they are treated differently.',
      ] },
      { id: 'assessment', heading: 'Assessment first', paragraphs: [
        'A dermatologist assesses the type and depth of scarring, your skin type, any active acne and your goals. Active acne is usually brought under control before scar treatment begins, because new inflammation can create new scars.',
      ] },
      { id: 'treatment', heading: 'Treatment options', paragraphs: [
        DEKA_STATEMENT,
        'Fractional laser resurfacing treats the skin in a grid of tiny columns, leaving surrounding skin intact to support healing and remodelling of collagen. Whether it is suitable for you, and how it might be combined with other approaches, is decided after a specialist assessment.',
      ] },
      { id: 'risks', heading: 'Risks and side effects', paragraphs: [
        'Laser resurfacing causes a controlled injury to the skin. Redness, swelling and a period of healing are expected afterwards. Possible risks include infection, prolonged redness, changes in skin colour (darkening or lightening) and, rarely, scarring. Darker skin types need particular care to reduce the risk of pigment change. Your doctor will discuss the risks that apply to you.',
      ] },
      { id: 'aftercare', heading: 'Aftercare', paragraphs: [
        'Following the aftercare instructions you are given — including skin care, sun protection and avoiding picking — is an important part of getting a good and safe result. Contact the clinic if you notice anything unexpected during healing.',
      ] },
      { id: 'expectations', heading: 'Realistic expectations', paragraphs: [
        'Scar treatment usually produces gradual improvement rather than complete removal, and the degree of improvement varies between people and between scar types. Your dermatologist will explain what is realistic for your skin before you decide.',
      ] },
    ],
    related: ['/laser-treatments/fractional-co2-laser/', '/dermatology/acne/', '/our-doctors/dr-akshay-saxena/'],
    review: pending,
  },
  {
    path: '/dermatology/psoriasis/', parent: '/dermatology/', kind: 'condition', navLabel: 'Psoriasis',
    h1: 'Psoriasis', eyebrow: 'Dermatology · Condition guide',
    metaTitle: 'Psoriasis Treatment in Jabalpur — Specialist Dermatologist | Saxena Clinic',
    metaDescription: 'Psoriasis explained: symptoms, triggers, assessment and long-term treatment approaches. Specialist psoriasis care in Jabalpur with consultant dermatologists.',
    lede: 'Psoriasis is a long-term inflammatory condition in which the immune system speeds up the turnover of skin cells, causing thickened, scaly patches. It is not contagious. There is no permanent cure, but it can usually be controlled well with the right treatment.',
    availability: 'clinic-stated', doctors: ['dr-rajeev-saxena'],
    sections: [
      { id: 'signs', heading: 'Common signs', list: [
        'Raised, well-defined red or darker patches with silvery-white scale',
        'Common areas: elbows, knees, scalp, lower back — but any skin can be affected',
        'Itching, soreness or cracking of the skin',
        'Nail changes such as pitting, thickening or separation',
        'Joint pain or stiffness in some people (psoriatic arthritis)',
      ] },
      { id: 'triggers', heading: 'Triggers', paragraphs: [
        'Psoriasis tends to run in families and often comes and goes. Flares can be triggered by infections, stress, skin injury, some medicines, alcohol and smoking. Identifying your triggers is part of long-term management.',
      ] },
      { id: 'assessment', heading: 'Assessment', paragraphs: [
        'Diagnosis is usually made by examination. A dermatologist will assess the type of psoriasis, how much of the skin is affected, its impact on daily life, and whether joints or other health issues are involved — psoriasis is associated with some other conditions, which may be worth checking.',
      ] },
      { id: 'treatment', heading: 'Treatment approaches', listIntro: 'Treatment is stepped according to severity and response, and may include:', list: [
        'Topical treatments such as moisturisers and medicated creams or ointments',
        'Phototherapy (controlled ultraviolet light) for more widespread psoriasis',
        'Oral or injectable systemic medicines for moderate to severe or difficult-to-treat psoriasis',
      ], paragraphs: [
        'Systemic and newer advanced therapies require careful selection and monitoring. Your dermatologist will discuss which options are appropriate and available for you.',
      ] },
      { id: 'risks', heading: 'Side effects and monitoring', paragraphs: [
        'Every psoriasis treatment has possible side effects, from skin thinning with overuse of strong steroid creams to effects of systemic medicines that need blood tests or other monitoring. Using treatments as directed and attending follow-up keeps treatment safe.',
      ] },
      { id: 'expectations', heading: 'Living with psoriasis', paragraphs: [
        'The aim of treatment is clearer skin, fewer flares and a better quality of life. Psoriasis may change over time, so treatment is reviewed and adjusted. Gentle skin care, regular moisturising and attention to triggers all help.',
      ] },
    ],
    related: ['/dermatology/eczema/', '/conditions-we-treat/', '/our-doctors/dr-rajeev-saxena/'],
    review: pending,
  },
  {
    path: '/dermatology/vitiligo/', parent: '/dermatology/', kind: 'condition', navLabel: 'Vitiligo',
    h1: 'Vitiligo', eyebrow: 'Dermatology · Condition guide',
    metaTitle: 'Vitiligo Treatment in Jabalpur — Dermatologist Guide | Saxena Clinic',
    metaDescription: 'Vitiligo explained: what causes white patches, how vitiligo is assessed, treatment approaches and realistic expectations. Specialist vitiligo care in Jabalpur.',
    lede: 'Vitiligo is a condition in which the skin loses its pigment-producing cells, leading to white or lighter patches. It is not contagious and is not caused by diet or anything a person has done. Treatment can help stabilise vitiligo and encourage repigmentation in many people, though response varies.',
    availability: 'clinic-stated', doctors: ['dr-rajeev-saxena'],
    sections: [
      { id: 'what', heading: 'What vitiligo is', paragraphs: [
        'In vitiligo, melanocytes — the cells that give skin its colour — are lost, most often through an autoimmune process. Patches may stay stable for long periods or spread. Hair growing in affected areas can also turn white.',
      ] },
      { id: 'signs', heading: 'Common signs', list: [
        'Milky-white or lighter patches with clear edges',
        'Common areas include the face, hands, feet, around the mouth and eyes, and skin folds',
        'Patches on both sides of the body (non-segmental vitiligo) or on one area or side (segmental vitiligo)',
      ] },
      { id: 'assessment', heading: 'Assessment', paragraphs: [
        'Not every white patch is vitiligo — fungal infections, post-inflammatory changes and other conditions can look similar. A dermatologist examines the skin, sometimes with a special lamp, and assesses whether the vitiligo is active or stable. Some people may be advised to check for associated conditions such as thyroid disease.',
      ] },
      { id: 'treatment', heading: 'Treatment approaches', listIntro: 'Depending on the type, extent and activity of vitiligo, options may include:', list: [
        'Topical treatments to calm the immune reaction and encourage repigmentation',
        'Phototherapy for more widespread or active vitiligo',
        'Oral treatments to help stabilise rapidly spreading vitiligo, in selected cases',
        'Surgical or grafting procedures for stable, limited patches in selected patients',
      ], paragraphs: [
        'Newer targeted medicines are being used for vitiligo in some settings; whether any are appropriate for you is a specialist decision.',
      ] },
      { id: 'expectations', heading: 'Realistic expectations', paragraphs: [
        'Repigmentation is usually slow and may be partial; areas such as the face often respond better than the hands and feet. Some people prefer camouflage options, and protecting depigmented skin from sunburn is important. Vitiligo can affect how people feel, and it is reasonable to talk about this during your consultation.',
      ] },
    ],
    related: ['/dermatology/melasma-pigmentation/', '/conditions-we-treat/', '/our-doctors/dr-rajeev-saxena/'],
    review: pending,
  },
  {
    path: '/dermatology/melasma-pigmentation/', parent: '/dermatology/', kind: 'condition', navLabel: 'Melasma & pigmentation',
    h1: 'Melasma and pigmentation', eyebrow: 'Dermatology · Condition guide',
    metaTitle: 'Melasma & Pigmentation Treatment in Jabalpur | Saxena Skin and Cosmetic Clinic',
    metaDescription: 'Causes of melasma, dark spots and uneven skin tone, how pigmentation is assessed and treated, and why sun protection matters. Specialist care in Jabalpur.',
    lede: 'Pigmentation describes darker patches or uneven skin tone. Melasma, post-inflammatory hyperpigmentation and sun-related spots are common causes. Because the cause guides the treatment — and some treatments can worsen certain pigmentation — an accurate diagnosis comes first.',
    availability: 'clinic-stated', doctors: ['dr-rajeev-saxena', 'dr-akshay-saxena'],
    sections: [
      { id: 'types', heading: 'Common types of pigmentation', list: [
        'Melasma — symmetrical brown or grey-brown patches, often on the cheeks, forehead and upper lip',
        'Post-inflammatory hyperpigmentation — darkening after acne, eczema, injury or irritation',
        'Sun-related pigmentation and freckles',
        'Pigmentation linked to medicines or other medical conditions',
      ] },
      { id: 'causes', heading: 'What drives melasma', paragraphs: [
        'Melasma is linked to sun and visible-light exposure, hormonal factors (including pregnancy and some hormonal medicines) and genetic tendency. It is a chronic condition that often returns, especially with sun exposure.',
      ] },
      { id: 'assessment', heading: 'Assessment', paragraphs: [
        'A dermatologist identifies the type and depth of pigmentation, reviews skin care products and medicines, and considers skin type. This matters because aggressive treatments can cause irritation and paradoxically worsen pigmentation.',
      ] },
      { id: 'treatment', heading: 'Treatment approaches', list: [
        'Daily broad-spectrum sun protection — the foundation of every plan',
        'Topical treatments that reduce pigment production',
        'Selected in-clinic procedures for suitable patients, chosen with care',
        'Treating the underlying cause, such as active acne, where relevant',
      ] },
      { id: 'expectations', heading: 'Realistic expectations', paragraphs: [
        'Pigmentation usually improves gradually over months, and melasma in particular tends to recur, so maintenance and sun protection are long-term. Avoid unprescribed “fairness” or steroid-containing creams, which can harm the skin.',
      ] },
    ],
    related: ['/dermatology/acne/', '/cosmetic-dermatology/', '/laser-treatments/'],
    review: pending,
  },
  {
    path: '/dermatology/eczema/', parent: '/dermatology/', kind: 'condition', navLabel: 'Eczema & dermatitis',
    h1: 'Eczema and dermatitis', eyebrow: 'Dermatology · Condition guide',
    metaTitle: 'Eczema & Dermatitis Treatment in Jabalpur | Saxena Skin and Cosmetic Clinic',
    metaDescription: 'Atopic eczema, contact dermatitis and seborrhoeic dermatitis explained: symptoms, triggers, assessment and treatment. Specialist dermatology in Jabalpur.',
    lede: 'Eczema (dermatitis) describes inflamed, itchy, dry skin. There are several types, including atopic eczema, contact dermatitis and seborrhoeic dermatitis. Most can be controlled well with the right combination of skin care and treatment.',
    availability: 'clinic-stated', doctors: ['dr-rajeev-saxena', 'dr-akshay-saxena'],
    sections: [
      { id: 'types', heading: 'Common types', list: [
        'Atopic eczema — often starts in childhood, linked to a weakened skin barrier and allergic tendency',
        'Contact dermatitis — a reaction to something touching the skin (irritant or allergic)',
        'Seborrhoeic dermatitis — scaly, red patches on the scalp, face and chest',
        'Hand eczema — often related to frequent washing, water or chemicals',
      ] },
      { id: 'signs', heading: 'Common signs', list: ['Itching, often worse at night', 'Dry, rough or scaly skin', 'Redness or darkening of the skin, depending on skin tone', 'Oozing, crusting or thickened skin in some cases'] },
      { id: 'assessment', heading: 'Assessment', paragraphs: [
        'A dermatologist identifies the type of eczema and its triggers. Eczema can look like fungal infection, psoriasis and other conditions, which is why self-treatment with mixed or steroid creams can go wrong. Patch testing may be considered when allergic contact dermatitis is suspected.',
      ] },
      { id: 'treatment', heading: 'Treatment approaches', list: [
        'Regular use of moisturisers (emollients) and gentle skin care',
        'Anti-inflammatory creams or ointments, used as directed',
        'Identifying and avoiding triggers and irritants',
        'Systemic or advanced treatments for severe or persistent eczema, where appropriate',
      ] },
      { id: 'expectations', heading: 'Realistic expectations', paragraphs: [
        'Eczema often comes and goes. Treatment aims to control flares quickly and keep skin comfortable between them. Seek prompt advice if eczema becomes very painful, weeps, or shows signs of infection.',
      ] },
    ],
    related: ['/dermatology/psoriasis/', '/conditions-we-treat/', '/patient-education/'],
    review: pending,
  },

  /* =========================================================================================== HAIR CLINIC */
  {
    path: '/hair-clinic/', kind: 'speciality', navLabel: 'Hair Clinic',
    h1: 'Hair clinic and hair transplantation in Jabalpur', eyebrow: 'Speciality · Hair restoration',
    metaTitle: 'Hair Specialist & Hair Transplant in Jabalpur | Saxena Skin and Cosmetic Clinic',
    metaDescription: 'Hair loss evaluation, medical treatment and hair transplantation in Jabalpur, led by Dr. Nischay Saxena, dermatologist. Specialist assessment for men and women.',
    lede: 'Hair loss has many causes, and the right treatment depends on finding the cause. Our Hair Clinic, led by Dr. Nischay Saxena, brings together medical hair restoration and hair transplantation under a dermatologist’s care.',
    availability: 'clinic-stated', doctors: ['dr-nischay-saxena'],
    sections: [
      { id: 'two-paths', heading: 'Medical restoration and transplantation', paragraphs: [
        'Many people with hair loss benefit from medical treatment, and some are suitable for hair transplantation. A dermatologist-led clinic can assess both — and advise honestly when a transplant is not the right first step.',
      ] },
      { id: 'evaluation', heading: 'What a hair loss evaluation involves', list: [
        'A detailed history: pattern and timing of hair loss, family history, health, medicines and diet',
        'Examination of the scalp and hair, often with magnification (trichoscopy)',
        'Blood tests or other investigations where indicated',
        'A diagnosis and a treatment plan with realistic expectations',
      ] },
      { id: 'conditions', heading: 'Conditions we assess', list: [
        'Male pattern hair loss and female pattern hair loss (androgenetic alopecia)',
        'Alopecia areata (patchy hair loss)',
        'Telogen effluvium (diffuse shedding after illness, stress or other triggers)',
        'Scarring alopecias',
        'Hair thinning, dandruff and scalp disorders',
      ] },
    ],
    services: [
      { label: 'Hair loss evaluation & treatment', path: '/hair-clinic/hair-loss/', availability: 'clinic-stated' },
      { label: 'Hair transplantation', path: '/hair-clinic/hair-transplantation/', availability: 'clinic-stated' },
      { label: 'PRP for hair loss', path: '/hair-clinic/prp-hair-treatment/', availability: 'to-confirm' },
    ],
    related: ['/our-doctors/dr-nischay-saxena/', '/dermatology/'],
    review: pending,
  },
  {
    path: '/hair-clinic/hair-loss/', parent: '/hair-clinic/', kind: 'condition', navLabel: 'Hair loss',
    h1: 'Hair loss in men and women', eyebrow: 'Hair clinic · Condition guide',
    metaTitle: 'Hair Fall & Hair Loss Treatment in Jabalpur | Saxena Skin and Cosmetic Clinic',
    metaDescription: 'Common causes of hair fall and hair loss in men and women, how a dermatologist evaluates hair loss, and medical treatment approaches. Hair clinic in Jabalpur.',
    lede: 'Losing some hair every day is normal. Noticeable thinning, widening partings, receding hairlines, bald patches or sudden heavy shedding are worth assessing — earlier assessment often means more treatment options.',
    availability: 'clinic-stated', doctors: ['dr-nischay-saxena'],
    sections: [
      { id: 'causes', heading: 'Common causes', list: [
        'Androgenetic alopecia — inherited, hormone-sensitive thinning (male and female pattern)',
        'Telogen effluvium — temporary shedding after illness, surgery, childbirth, stress, crash dieting or some medicines',
        'Alopecia areata — an autoimmune condition causing patchy loss',
        'Scalp conditions, infections, and hairstyles that pull on the hair',
        'Thyroid problems, iron deficiency and other medical factors',
      ] },
      { id: 'assessment', heading: 'Assessment', paragraphs: [
        'A dermatologist looks at the pattern of loss, the scalp and the hair itself, often using trichoscopy, and may arrange blood tests. Some types of hair loss are reversible; others are progressive and benefit from early treatment.',
      ] },
      { id: 'treatment', heading: 'Medical treatment approaches', list: [
        'Treating any underlying cause or deficiency',
        'Topical and oral medicines for pattern hair loss, chosen and monitored by a doctor',
        'Treatments to calm inflammation in alopecia areata and scalp conditions',
        'Discussion of procedural options, including hair transplantation for suitable candidates',
      ] },
      { id: 'risks', heading: 'Side effects', paragraphs: [
        'Hair loss medicines can have side effects, and some are not suitable for everyone — including during pregnancy or when planning pregnancy. Your doctor will explain the benefits and risks before you start.',
      ] },
      { id: 'expectations', heading: 'Realistic expectations', paragraphs: [
        'Hair grows slowly, so it usually takes several months to judge whether treatment is working. Pattern hair loss treatments generally need to be continued to maintain results. Be cautious of products that promise rapid or guaranteed regrowth.',
      ] },
    ],
    related: ['/hair-clinic/hair-transplantation/', '/hair-clinic/prp-hair-treatment/', '/our-doctors/dr-nischay-saxena/'],
    review: pending,
  },
  {
    path: '/hair-clinic/hair-transplantation/', parent: '/hair-clinic/', kind: 'treatment', navLabel: 'Hair transplantation',
    h1: 'Hair transplantation', eyebrow: 'Hair clinic · Treatment guide',
    metaTitle: 'Hair Transplant in Jabalpur | Saxena Skin and Cosmetic Clinic',
    metaDescription: 'Hair transplantation in Jabalpur with Dr. Nischay Saxena: candidate evaluation, hairline planning, what the procedure involves, risks, aftercare and expectations.',
    lede: 'Hair transplantation moves hair follicles from areas where hair is permanent — usually the back and sides of the scalp — to thinning or bald areas. It is a surgical procedure, and good results depend on careful candidate selection and planning.',
    availability: 'clinic-stated', doctors: ['dr-nischay-saxena'],
    sections: [
      { id: 'candidates', heading: 'Who may be a suitable candidate', list: [
        'People with stable pattern hair loss and sufficient donor hair',
        'Those whose hair loss has been evaluated and, where appropriate, treated medically',
        'Patients with realistic expectations about density and coverage',
      ], paragraphs: [
        'A transplant redistributes existing hair; it does not create new follicles. Some types of hair loss — including active alopecia areata and certain scarring alopecias — may not be suitable.',
      ] },
      { id: 'evaluation', heading: 'Pre-transplant evaluation and planning', paragraphs: [
        'Evaluation covers the cause and likely progression of hair loss, donor area quality, general health and medicines. Planning includes the design of a natural hairline appropriate to age and face, and a long-term view, since pattern hair loss can continue in non-transplanted areas.',
      ] },
      { id: 'process', heading: 'What the procedure involves', paragraphs: [
        'The procedure is usually carried out under local anaesthesia. Follicles are harvested from the donor area and placed into the recipient area. The specific technique, duration and number of grafts are planned individually and explained at consultation.',
      ] },
      { id: 'risks', heading: 'Risks and side effects', paragraphs: [
        'As with any surgery, risks include bleeding, infection, swelling, numbness, scarring in the donor area and uneven or less-than-expected growth. Transplanted hairs often shed in the weeks after surgery before regrowing — this is expected.',
      ] },
      { id: 'aftercare', heading: 'Post-transplant care', paragraphs: [
        'You will receive specific instructions for washing, sleeping, activity and medicines in the days and weeks after the procedure. Follow-up visits allow progress to be reviewed, and medical treatment may be recommended to protect existing hair.',
      ] },
      { id: 'expectations', heading: 'Realistic expectations', paragraphs: [
        'New growth takes months to appear and the final result takes longer to judge. Results vary with hair characteristics, donor supply and the extent of loss. No responsible clinic can guarantee a specific density.',
      ] },
    ],
    related: ['/hair-clinic/hair-loss/', '/our-doctors/dr-nischay-saxena/', '/contact-us/'],
    review: pending,
  },
  {
    path: '/hair-clinic/prp-hair-treatment/', parent: '/hair-clinic/', kind: 'treatment', navLabel: 'PRP for hair loss',
    h1: 'PRP for hair loss', eyebrow: 'Hair clinic · Treatment guide',
    metaTitle: 'PRP for Hair Loss — What to Know | Saxena Skin and Cosmetic Clinic, Jabalpur',
    metaDescription: 'Platelet-rich plasma (PRP) for hair loss explained: how it works, who it may help, the procedure, side effects and the current evidence. Guidance from a hair clinic.',
    lede: 'Platelet-rich plasma (PRP) therapy uses a concentrate of platelets from a patient’s own blood, injected into the scalp. It is used as a supporting treatment for some types of hair loss. This page explains PRP in general terms.',
    availability: 'to-confirm', doctors: ['dr-nischay-saxena'],
    sections: [
      { id: 'how', heading: 'How PRP works', paragraphs: [
        'A small blood sample is taken and processed to concentrate the platelets, which contain growth factors. The concentrate is injected into areas of thinning. It is thought to support hair follicles, though how well it works varies between people.',
      ] },
      { id: 'who', heading: 'Who it may help', paragraphs: [
        'PRP is most often considered for androgenetic (pattern) hair loss, usually alongside medical treatment. It is not suitable for everyone, including people with certain blood disorders or on some medicines, and it is not a substitute for finding the cause of hair loss.',
      ] },
      { id: 'risks', heading: 'Side effects', paragraphs: [
        'Temporary scalp tenderness, swelling, mild bleeding or bruising at injection sites are common. Infection is uncommon when performed under sterile conditions.',
      ] },
      { id: 'expectations', heading: 'Realistic expectations', paragraphs: [
        'Evidence for PRP is still developing and results vary. It usually involves a course of sessions and maintenance, and changes, if they occur, are gradual. A hair specialist can advise whether it is worth considering in your case.',
      ] },
    ],
    related: ['/hair-clinic/hair-loss/', '/hair-clinic/', '/our-doctors/dr-nischay-saxena/'],
    review: pending,
  },

  /* =========================================================================================== LASER */
  {
    path: '/laser-treatments/', kind: 'speciality', navLabel: 'Laser Treatments',
    h1: 'Laser treatments in Jabalpur', eyebrow: 'Speciality · Laser dermatology',
    metaTitle: 'Laser Treatment in Jabalpur — Fractional CO2 | Saxena Clinic',
    metaDescription: 'Dermatologist-led laser treatments in Jabalpur, including fractional CO2 laser using Italian DEKA technology for acne scars, stretch marks and post-traumatic injury scars.',
    lede: 'Lasers are medical devices, and choosing the right laser — and the right settings — for each person’s skin is a specialist decision. Our laser work is led by Dr. Akshay Saxena, consultant dermatologist in clinical and laser dermatology.',
    availability: 'clinic-stated', doctors: ['dr-akshay-saxena'], feature: 'deka', image: 'laser-controls',
    sections: [
      { id: 'principle', heading: 'How medical lasers work', paragraphs: [
        'A laser delivers light energy at a specific wavelength. Different wavelengths are absorbed by different targets in the skin — water, pigment or blood vessels — which is why different lasers are used for different concerns. Skin type, the condition being treated and safety precautions all shape the treatment plan.',
      ] },
      { id: 'safety', heading: 'Safety first', list: [
        'Assessment of your skin, medical history and medicines before any laser treatment',
        'Protective eyewear for everyone in the treatment room',
        'Settings chosen for your skin type and concern',
        'Clear aftercare instructions and follow-up',
      ] },
    ],
    services: [
      { label: 'Fractional CO2 laser (DEKA)', path: '/laser-treatments/fractional-co2-laser/', availability: 'clinic-stated' },
      { label: 'Acne scars', path: '/dermatology/acne-scars/', availability: 'clinic-stated' },
      { label: 'Laser hair reduction', path: '/laser-treatments/laser-hair-reduction/', availability: 'to-confirm' },
      { label: 'Q-switched Nd:YAG laser', availability: 'to-confirm' },
      { label: 'Pico laser', availability: 'to-confirm' },
      { label: 'Tattoo removal', availability: 'to-confirm' },
    ],
    related: ['/our-doctors/dr-akshay-saxena/', '/cosmetic-dermatology/', '/dermatology/acne-scars/'],
    review: pending,
  },
  {
    path: '/laser-treatments/fractional-co2-laser/', parent: '/laser-treatments/', kind: 'treatment', navLabel: 'Fractional CO2 laser',
    h1: 'Fractional CO2 laser', eyebrow: 'Laser treatments · Treatment guide',
    metaTitle: 'Fractional CO2 Laser in Jabalpur — Italian DEKA Technology | Saxena Clinic',
    metaDescription: 'Fractional CO2 laser using Italian DEKA technology in Jabalpur for acne scars, stretch marks and post-traumatic injury scars, following specialist assessment.',
    lede: DEKA_STATEMENT,
    availability: 'clinic-stated', doctors: ['dr-akshay-saxena'], feature: 'deka', image: 'laser-console',
    sections: [
      { id: 'what', heading: 'What fractional CO2 laser is', paragraphs: [
        'A CO2 laser targets water in the skin. In fractional treatment, the energy is delivered as a grid of microscopic columns, treating a fraction of the skin while leaving the surrounding skin intact. This supports faster healing than treating the whole surface and stimulates remodelling of collagen over the following months.',
      ] },
      { id: 'indications', heading: 'What we offer it for', listIntro: 'At Saxena Skin and Cosmetic Clinic, fractional CO2 laser is offered for selected concerns, following specialist assessment:', list: [
        'Acne scars',
        'Stretch marks',
        'Scars resulting from post-traumatic injuries',
      ] },
      { id: 'assessment', heading: 'Assessment and suitability', paragraphs: [
        'Before treatment, the dermatologist assesses the scar or skin concern, your skin type, any active skin disease, medical history and medicines, and history of cold sores or abnormal scarring. Treatment is planned individually, and not everyone is a suitable candidate.',
      ] },
      { id: 'process', heading: 'What to expect on the day', paragraphs: [
        'The area is cleaned and numbing is used to make treatment more comfortable. Everyone in the room wears protective eyewear. Your doctor will explain the specific plan for your treatment, including how many sessions may be advised for your concern.',
      ] },
      { id: 'risks', heading: 'Risks and side effects', paragraphs: [
        'Redness, swelling, a feeling of heat and a period of healing with fine crusting or flaking are expected after treatment. Possible risks include infection, reactivation of cold sores, prolonged redness, darkening or lightening of the skin and, rarely, scarring. The risk of pigment change is a particular consideration in darker skin types, which is one reason specialist assessment matters.',
      ] },
      { id: 'aftercare', heading: 'Aftercare', paragraphs: [
        'You will be given specific aftercare instructions covering cleansing, moisturising, sun protection and what to avoid while the skin heals. Follow them closely and contact the clinic if you notice increasing pain, discharge or anything unexpected.',
      ] },
      { id: 'expectations', heading: 'Realistic expectations', paragraphs: [
        'Improvement develops gradually as the skin remodels. Results vary between individuals and between types of scar, and scars are improved rather than removed. Recovery time and the number of sessions depend on your skin and treatment plan, and your doctor will discuss these with you.',
      ] },
    ],
    related: ['/dermatology/acne-scars/', '/our-doctors/dr-akshay-saxena/', '/laser-treatments/'],
    review: pending,
  },
  {
    path: '/laser-treatments/laser-hair-reduction/', parent: '/laser-treatments/', kind: 'treatment', navLabel: 'Laser hair reduction',
    h1: 'Laser hair reduction', eyebrow: 'Laser treatments · Treatment guide',
    metaTitle: 'Laser Hair Reduction — What to Know | Saxena Skin and Cosmetic Clinic, Jabalpur',
    metaDescription: 'How laser hair reduction works, who it suits, the process, side effects and realistic expectations, explained by a dermatology clinic in Jabalpur.',
    lede: 'Laser hair reduction uses light energy absorbed by the pigment in hair to damage the follicle and reduce regrowth. This page explains the treatment in general terms; please ask the clinic about current availability.',
    availability: 'to-confirm', doctors: ['dr-akshay-saxena'],
    sections: [
      { id: 'how', heading: 'How it works', paragraphs: [
        'Laser light is absorbed by melanin in the hair shaft and follicle, heating and damaging the follicle while aiming to spare the surrounding skin. Because hair grows in cycles and only actively growing hairs respond well, treatment is given as a course.',
      ] },
      { id: 'who', heading: 'Who it suits', paragraphs: [
        'It tends to work best on darker hair. Very light, grey, red or white hair responds poorly. Skin type affects which laser and settings are safe, and some medical conditions — such as hormonal causes of excess hair — may need assessment as well.',
      ] },
      { id: 'risks', heading: 'Side effects', paragraphs: [
        'Temporary redness and swelling around follicles are common. Less commonly, burns, blistering, changes in skin colour or, rarely, paradoxical increased hair growth can occur. Sun exposure and some treatments before a session can increase risk.',
      ] },
      { id: 'expectations', heading: 'Realistic expectations', paragraphs: [
        'Laser gives hair reduction rather than guaranteed permanent removal. Results vary with hair colour, skin type and hormonal factors, and maintenance sessions may be needed.',
      ] },
    ],
    related: ['/laser-treatments/', '/our-doctors/dr-akshay-saxena/'],
    review: pending,
  },

  /* =========================================================================================== COSMETIC DERMATOLOGY */
  {
    path: '/cosmetic-dermatology/', kind: 'speciality', navLabel: 'Cosmetic Dermatology',
    h1: 'Cosmetic dermatology', eyebrow: 'Speciality · Aesthetic medicine',
    metaTitle: 'Cosmetic Dermatologist in Jabalpur | Saxena Skin and Cosmetic Clinic',
    metaDescription: 'Specialist-led cosmetic dermatology in Jabalpur: skin quality, scars, pigmentation and facial rejuvenation, approached with medical assessment and realistic goals.',
    lede: 'Cosmetic dermatology applies a dermatologist’s understanding of skin to concerns about appearance — texture, scarring, pigmentation and the changes of ageing. Every aesthetic treatment is a medical procedure and begins with a proper assessment.',
    availability: 'clinic-stated', doctors: ['dr-akshay-saxena', 'dr-rajeev-saxena'], image: 'treatment-preparation',
    sections: [
      { id: 'approach', heading: 'Our approach', paragraphs: [
        'We start with the skin’s health: active conditions such as acne, rosacea or melasma are diagnosed and treated first, because they affect which aesthetic options are safe. We aim for natural, proportionate results and will tell you when a treatment is unlikely to meet your goals.',
      ] },
      { id: 'areas', heading: 'Concerns we can assess', list: [
        'Acne scars and post-traumatic scars',
        'Uneven skin tone and pigmentation',
        'Skin texture and quality',
        'Fine lines and the changes of skin ageing',
      ] },
      { id: 'availability', heading: 'About individual treatments', paragraphs: [
        'The specific procedures available at the clinic — such as chemical peels, injectable treatments and skin boosters — are confirmed at consultation. This website describes treatments in general terms and does not imply that every treatment mentioned is suitable for, or offered to, every patient.',
      ] },
    ],
    services: [
      { label: 'Fractional CO2 laser for acne scars & stretch marks', path: '/laser-treatments/fractional-co2-laser/', availability: 'clinic-stated' },
      { label: 'Pigmentation management', path: '/dermatology/melasma-pigmentation/', availability: 'clinic-stated' },
      { label: 'Chemical peels', availability: 'to-confirm' },
      { label: 'Botox / neuromodulators', availability: 'to-confirm' },
      { label: 'Dermal fillers', availability: 'to-confirm' },
      { label: 'Skin boosters', availability: 'to-confirm' },
      { label: 'PRP and regenerative treatments', availability: 'to-confirm' },
    ],
    related: ['/laser-treatments/', '/facial-aesthetics/', '/dermatology/'],
    review: pending,
  },

  /* =========================================================================================== WOMEN'S HEALTH */
  {
    path: '/gynaecology/', kind: 'speciality', navLabel: 'Gynaecology',
    h1: 'Gynaecology and women’s health', eyebrow: 'Speciality · Women’s health',
    metaTitle: 'Gynaecologist in Jabalpur — Women’s Health | Saxena Skin and Cosmetic Clinic',
    metaDescription: 'Gynaecology consultations in Jabalpur with Dr. Amita Saxena: general gynaecology, menstrual health, menopause-related concerns and intimate health, with privacy and care.',
    lede: 'Our gynaecology service, led by Dr. Amita Saxena, offers consultations for women’s health concerns at every stage of life — in a private, respectful setting where questions can be asked openly.',
    availability: 'clinic-stated', doctors: ['dr-amita-saxena'],
    sections: [
      { id: 'consultations', heading: 'Consultations for', list: [
        'General gynaecological concerns',
        'Menstrual health — irregular, painful or heavy periods',
        'Menopause-related symptoms and concerns',
        'Intimate health concerns',
      ] },
      { id: 'privacy', heading: 'Privacy and sensitivity', paragraphs: [
        'Gynaecological concerns can be difficult to talk about. Consultations are confidential, and examinations are only carried out with your consent and explanation of what is involved. You are welcome to ask for a chaperone.',
      ] },
      { id: 'urgent', heading: 'When to seek urgent care', paragraphs: [
        'Severe abdominal pain, very heavy bleeding, bleeding in pregnancy, or feeling faint or very unwell need urgent medical attention. Please go to your nearest emergency department rather than waiting for a clinic appointment.',
      ] },
    ],
    related: ['/cosmetic-gynaecology/', '/our-doctors/dr-amita-saxena/'],
    review: pending,
  },
  {
    path: '/cosmetic-gynaecology/', kind: 'speciality', navLabel: 'Cosmetic Gynaecology',
    h1: 'Cosmetic gynaecology', eyebrow: 'Speciality · Women’s health',
    metaTitle: 'Cosmetic Gynaecology in Jabalpur | Saxena Skin and Cosmetic Clinic',
    metaDescription: 'Cosmetic gynaecology consultations in Jabalpur with Dr. Amita Saxena: a medically grounded, private assessment of intimate health and aesthetic concerns.',
    lede: 'Cosmetic gynaecology addresses concerns about the function, comfort and appearance of the intimate area. Dr. Amita Saxena, consultant gynaecologist and cosmetic gynaecology specialist, offers private consultations with a clear, medically grounded assessment.',
    availability: 'clinic-stated', doctors: ['dr-amita-saxena'],
    sections: [
      { id: 'assessment', heading: 'Assessment comes first', paragraphs: [
        'Symptoms such as dryness, discomfort, laxity after childbirth or urinary symptoms can have several causes, some of which are best treated medically. A consultation explores your concerns, examines with consent, and explains the options — including when no procedure is needed.',
      ] },
      { id: 'evidence', heading: 'Evidence and expectations', paragraphs: [
        'Some cosmetic gynaecology treatments are well established, while the evidence for others is still developing. We aim to explain the benefits, risks and uncertainties honestly so you can make an informed choice.',
      ] },
    ],
    services: [
      { label: 'Cosmetic gynaecology consultation', availability: 'clinic-stated' },
      { label: 'Vaginal rejuvenation', availability: 'to-confirm' },
      { label: 'PRP-based therapies', availability: 'to-confirm' },
      { label: 'Injectable and aesthetic therapies', availability: 'to-confirm' },
    ],
    related: ['/gynaecology/', '/our-doctors/dr-amita-saxena/'],
    review: pending,
  },

  /* =========================================================================================== FACE */
  {
    path: '/facial-aesthetics/', kind: 'speciality', navLabel: 'Facial Aesthetics',
    h1: 'Facial aesthetics', eyebrow: 'Speciality · Face',
    metaTitle: 'Facial Aesthetics in Jabalpur — Surgical & Non-Surgical | Saxena Clinic',
    metaDescription: 'Facial aesthetic assessment in Jabalpur with Dr. Jigisha Chhangani, cranio-maxillofacial surgeon: facial harmony, asymmetry, and surgical versus non-surgical options.',
    lede: 'Facial aesthetics looks at the face as a whole — its structure, proportions and balance. Led by Dr. Jigisha Chhangani, a cranio-maxillofacial surgeon, our approach begins with understanding the underlying facial framework before discussing any treatment.',
    availability: 'clinic-stated', doctors: ['dr-jigisha-chhangani'],
    sections: [
      { id: 'harmony', heading: 'Facial harmony and proportion', paragraphs: [
        'The bones of the face and jaw, the soft tissues and the skin all contribute to appearance. A surgeon trained in the facial skeleton can assess whether a concern relates to structure, soft tissue or skin — which determines what kind of treatment, if any, is appropriate.',
      ] },
      { id: 'surgical', heading: 'Surgical facial aesthetics', paragraphs: [
        'Surgical options change the underlying structure of the face and are considered for selected structural concerns. They involve anaesthesia, a recovery period and surgical risks, which are discussed in detail at consultation.',
      ] },
      { id: 'non-surgical', heading: 'Non-surgical facial aesthetics', paragraphs: [
        'Non-surgical treatments work on the skin and soft tissues without changing the facial skeleton, and their effects are generally more limited or temporary. Which non-surgical treatments are offered is confirmed at consultation.',
      ] },
    ],
    services: [
      { label: 'Facial aesthetic assessment', availability: 'clinic-stated' },
      { label: 'Facial asymmetry evaluation', path: '/cranio-maxillofacial-surgery/', availability: 'clinic-stated' },
      { label: 'Surgical facial aesthetics', availability: 'clinic-stated' },
      { label: 'Facial contouring', availability: 'to-confirm' },
      { label: 'Non-surgical facial aesthetics', availability: 'to-confirm' },
    ],
    related: ['/cranio-maxillofacial-surgery/', '/our-doctors/dr-jigisha-chhangani/', '/cosmetic-dermatology/'],
    review: pending,
  },
  {
    path: '/cranio-maxillofacial-surgery/', kind: 'speciality', navLabel: 'Maxillofacial Surgery',
    h1: 'Cranio-maxillofacial surgery', eyebrow: 'Speciality · Face',
    metaTitle: 'Maxillofacial Surgeon in Jabalpur | Saxena Skin and Cosmetic Clinic',
    metaDescription: 'Cranio-maxillofacial consultations in Jabalpur with Dr. Jigisha Chhangani: facial deformity and asymmetry evaluation, facial trauma and reconstruction.',
    lede: 'Cranio-maxillofacial surgery deals with the bones and soft tissues of the face, jaws and skull. Dr. Jigisha Chhangani offers consultations for facial deformities, asymmetry and the effects of facial injury.',
    availability: 'clinic-stated', doctors: ['dr-jigisha-chhangani'],
    sections: [
      { id: 'consultations', heading: 'Consultations for', list: [
        'Facial deformity evaluation',
        'Facial asymmetry',
        'Facial trauma and reconstruction',
        'Facial aesthetic assessment',
      ] },
      { id: 'process', heading: 'What a consultation involves', paragraphs: [
        'The surgeon takes a history, examines the face and bite, and may request imaging. You will receive an explanation of the findings, the options — surgical and non-surgical where relevant — and their risks and recovery, so that any decision is well informed.',
      ] },
      { id: 'urgent', heading: 'Recent facial injury', paragraphs: [
        'Facial injuries with heavy bleeding, difficulty breathing, loss of consciousness, vision changes or suspected fractures need emergency care. Please attend the nearest emergency department.',
      ] },
    ],
    related: ['/facial-aesthetics/', '/our-doctors/dr-jigisha-chhangani/'],
    review: pending,
  },
];

export const topicByPath = (p: string) => topics.find((t) => t.path === p);
export const childrenOf = (p: string) => topics.filter((t) => t.parent === p);

/** Conditions index (for /conditions-we-treat/). Only links to pages that exist. */
export const conditionGroups: { heading: string; intro: string; items: { label: string; path?: string }[] }[] = [
  { heading: 'Skin', intro: 'Assessed and managed by our consultant dermatologists.', items: [
    { label: 'Acne', path: '/dermatology/acne/' }, { label: 'Acne scars', path: '/dermatology/acne-scars/' },
    { label: 'Psoriasis', path: '/dermatology/psoriasis/' }, { label: 'Vitiligo', path: '/dermatology/vitiligo/' },
    { label: 'Melasma and pigmentation', path: '/dermatology/melasma-pigmentation/' }, { label: 'Eczema and dermatitis', path: '/dermatology/eczema/' },
    { label: 'Rosacea' }, { label: 'Fungal, bacterial and viral skin infections' }, { label: 'Urticaria (hives)' }, { label: 'Chronic itching' },
    { label: 'Lichen planus' }, { label: 'Skin allergies' }, { label: 'Nail disorders' }, { label: 'Autoimmune skin diseases' },
  ] },
  { heading: 'Hair and scalp', intro: 'Evaluated in our Hair Clinic.', items: [
    { label: 'Male and female pattern hair loss', path: '/hair-clinic/hair-loss/' }, { label: 'Alopecia areata', path: '/hair-clinic/hair-loss/' },
    { label: 'Telogen effluvium', path: '/hair-clinic/hair-loss/' }, { label: 'Scalp disorders and dandruff' },
  ] },
  { heading: 'Scars and skin texture', intro: 'Including fractional CO2 laser using Italian DEKA technology, following specialist assessment.', items: [
    { label: 'Acne scars', path: '/dermatology/acne-scars/' }, { label: 'Stretch marks', path: '/laser-treatments/fractional-co2-laser/' },
    { label: 'Post-traumatic injury scars', path: '/laser-treatments/fractional-co2-laser/' },
  ] },
  { heading: 'Women’s health', intro: 'Consultations with Dr. Amita Saxena.', items: [
    { label: 'Menstrual health', path: '/gynaecology/' }, { label: 'Menopause-related concerns', path: '/gynaecology/' }, { label: 'Intimate health', path: '/cosmetic-gynaecology/' },
  ] },
  { heading: 'Face and jaw', intro: 'Consultations with Dr. Jigisha Chhangani.', items: [
    { label: 'Facial asymmetry', path: '/cranio-maxillofacial-surgery/' }, { label: 'Facial deformity', path: '/cranio-maxillofacial-surgery/' },
    { label: 'Facial trauma', path: '/cranio-maxillofacial-surgery/' },
  ] },
];
