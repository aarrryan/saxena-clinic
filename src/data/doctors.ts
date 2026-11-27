import type { Status } from '../config/site';

/**
 * Consultant profiles. Every statement here traces to the client brief (reference-assets/Pasted text.txt,
 * Pasted markdown.md, CLAUDE_CODE_MASTER_PROMPT.md). Nothing is invented.
 *
 * `qualifications` and `experienceNote` are stored but only rendered when status === 'confirmed'.
 * `heldAreas` are described in the brief but depend on equipment or techniques the clinic has not yet confirmed;
 * they are listed in CONTENT-VERIFICATION.md and are NOT rendered.
 */
export interface Doctor {
  slug: string;
  name: string;
  honorific: 'Dr.';
  role: string;
  discipline: string;
  initials: string;
  summary: string[];
  experienceYears?: number;          // rendered only for Dr. Rajeev Saxena (client-stated)
  focusAreas: string[];
  heldAreas: string[];
  qualifications: { value: string; source: string; status: Status };
  experienceNote?: { value: string; source: string; status: Status };
  relatedPages: string[];
  schemaSpecialty?: 'Dermatology' | 'Gynecologic';
  photo: string | null;              // approved photograph path, or null
  /** Whole-profile approval by the clinic. Physician structured data is emitted only when 'confirmed'. */
  profileStatus: Status;
  metaTitle: string;
  metaDescription: string;
}

export const doctors: Doctor[] = [
  {
    slug: 'dr-rajeev-saxena',
    name: 'Rajeev Saxena',
    honorific: 'Dr.',
    role: 'Senior Consultant Dermatologist',
    discipline: 'Dermatology',
    initials: 'RS',
    experienceYears: 40,
    summary: [
      'Dr. Rajeev Saxena is the senior consultant dermatologist at Saxena Skin and Cosmetic Clinic and the most experienced dermatologist in the clinic’s team, with more than 40 years of dermatological experience.',
      'His practice centres on clinical and medical dermatology — the diagnosis and long-term management of complex and chronic skin conditions, including psoriasis, vitiligo, pigmentation disorders and acne.',
    ],
    focusAreas: [
      'Clinical and medical dermatology',
      'Diagnosis and management of complex skin disorders',
      'Psoriasis and other chronic inflammatory skin conditions',
      'Vitiligo and pigmentation disorders',
      'Acne and common dermatological conditions',
    ],
    heldAreas: [],
    qualifications: { value: 'D.V.D. (A.F.M.C.)', source: 'Clinic consultant signboard (screenshot in reference-assets)', status: 'supplied' },
    relatedPages: ['/dermatology/', '/dermatology/psoriasis/', '/dermatology/vitiligo/', '/dermatology/melasma-pigmentation/', '/dermatology/acne/', '/dermatology/eczema/'],
    schemaSpecialty: 'Dermatology',
    photo: '/media/doctors/dr-rajeev-saxena.webp',
    profileStatus: 'supplied',
    metaTitle: 'Dr. Rajeev Saxena — Senior Consultant Dermatologist, Jabalpur',
    metaDescription: 'Dr. Rajeev Saxena, senior consultant dermatologist at Saxena Skin and Cosmetic Clinic, Jabalpur, with more than 40 years of dermatological experience in clinical dermatology.',
  },
  {
    slug: 'dr-akshay-saxena',
    name: 'Akshay Saxena',
    honorific: 'Dr.',
    role: 'Consultant Dermatologist — Clinical and Laser Dermatology',
    discipline: 'Dermatology & lasers',
    initials: 'AS',
    summary: [
      'Dr. Akshay Saxena is a consultant dermatologist whose practice spans two areas: clinical dermatology and laser dermatology.',
      'He leads the clinic’s laser work, including fractional CO2 laser treatment using Italian DEKA technology, offered for selected concerns such as acne scars, stretch marks and post-traumatic injury scars following specialist assessment.',
    ],
    focusAreas: [
      'Clinical dermatology',
      'Laser dermatology',
      'Fractional CO2 laser treatment',
      'Acne scar management',
      'Pigmentation and skin rejuvenation',
      'Laser hair reduction',
      'Cosmetic dermatology',
    ],
    heldAreas: ['Q-switched Nd:YAG laser', 'Pico laser treatments', 'Regenerative and injectable treatments', 'Advanced dermatological procedures (scope to be defined)'],
    qualifications: { value: 'M.D. (Dermatology)', source: 'Clinic consultant signboard', status: 'supplied' },
    relatedPages: ['/laser-treatments/', '/laser-treatments/fractional-co2-laser/', '/dermatology/acne-scars/', '/laser-treatments/laser-hair-reduction/', '/cosmetic-dermatology/'],
    schemaSpecialty: 'Dermatology',
    photo: '/media/doctors/dr-akshay-saxena.webp',
    profileStatus: 'supplied',
    metaTitle: 'Dr. Akshay Saxena — Clinical & Laser Dermatology, Jabalpur',
    metaDescription: 'Dr. Akshay Saxena, consultant dermatologist in Jabalpur focusing on clinical dermatology and laser dermatology, including DEKA fractional CO2 laser for selected scar concerns.',
  },
  {
    slug: 'dr-nischay-saxena',
    name: 'Nischay Saxena',
    honorific: 'Dr.',
    role: 'Dermatologist — Hair Transplantation and Hair Restoration',
    discipline: 'Hair restoration',
    initials: 'NS',
    summary: [
      'Dr. Nischay Saxena is a dermatologist whose practice focuses on hair restoration and hair transplantation, leading the clinic’s Hair Clinic.',
      'His work covers the evaluation of hair loss in men and women, medical management of hair and scalp disorders, and assessment and planning for hair transplantation.',
    ],
    focusAreas: [
      'Hair loss evaluation',
      'Male pattern and female pattern hair loss',
      'Medical management of hair and scalp disorders',
      'Hair transplantation and hair restoration',
      'Pre-transplant evaluation and post-transplant care',
      'PRP for hair restoration',
    ],
    heldAreas: ['FUE technique (mention only if confirmed)', 'Specific surgical techniques and qualifications'],
    qualifications: { value: '', source: 'Not supplied; not on consultant signboard', status: 'missing' },
    relatedPages: ['/hair-clinic/', '/hair-clinic/hair-transplantation/', '/hair-clinic/hair-loss/', '/hair-clinic/prp-hair-treatment/'],
    schemaSpecialty: 'Dermatology',
    photo: '/media/doctors/dr-nischay-saxena.webp',
    profileStatus: 'supplied',
    metaTitle: 'Dr. Nischay Saxena — Hair Transplant & Hair Restoration, Jabalpur',
    metaDescription: 'Dr. Nischay Saxena, dermatologist leading hair restoration and hair transplantation in Jabalpur: hair loss evaluation, treatment and transplant planning.',
  },
  {
    slug: 'dr-amita-saxena',
    name: 'Amita Saxena',
    honorific: 'Dr.',
    role: 'Consultant Gynaecologist and Cosmetic Gynaecology Specialist',
    discipline: 'Gynaecology',
    initials: 'AS',
    summary: [
      'Dr. Amita Saxena is a consultant gynaecologist and cosmetic gynaecology specialist, leading the clinic’s women’s health services.',
      'Her consultations cover general gynaecology, menstrual health, menopause-related concerns, intimate health and cosmetic gynaecology, offered with privacy and sensitivity.',
    ],
    focusAreas: [
      'General gynaecological consultations',
      'Women’s health and menstrual health',
      'Menopause-related concerns',
      'Intimate health',
      'Cosmetic gynaecology',
    ],
    heldAreas: ['Vaginal rejuvenation (only if offered)', 'PRP and regenerative gynaecological therapies', 'Injectable and aesthetic therapies'],
    qualifications: { value: 'D.G.O.', source: 'Clinic consultant signboard', status: 'supplied' },
    experienceNote: { value: '27+ years at Marble City Hospital; 15–20 years in cosmetic gynaecology at the clinic', source: 'Pasted markdown.md', status: 'supplied' },
    relatedPages: ['/gynaecology/', '/cosmetic-gynaecology/'],
    schemaSpecialty: 'Gynecologic',
    photo: null,
    profileStatus: 'supplied',
    metaTitle: 'Dr. Amita Saxena — Gynaecologist & Cosmetic Gynaecology, Jabalpur',
    metaDescription: 'Dr. Amita Saxena, consultant gynaecologist and cosmetic gynaecology specialist in Jabalpur: general gynaecology, menstrual and menopausal health, and cosmetic gynaecology.',
  },
  {
    slug: 'dr-jigisha-chhangani',
    name: 'Jigisha Chhangani',
    honorific: 'Dr.',
    role: 'Cranio-Maxillofacial Surgeon and Facial Aesthetics Specialist',
    discipline: 'Maxillofacial & facial aesthetics',
    initials: 'JC',
    summary: [
      'Dr. Jigisha Chhangani is a cranio-maxillofacial surgeon and facial aesthetics specialist, leading the clinic’s facial surgery and facial aesthetics services.',
      'Her consultations focus on the structure and proportions of the face — evaluating facial asymmetry, facial deformities and the effects of facial trauma, and advising on surgical and, where appropriate, non-surgical approaches.',
    ],
    focusAreas: [
      'Cranio-maxillofacial consultations',
      'Facial deformity and asymmetry evaluation',
      'Facial trauma and reconstruction',
      'Facial harmony and proportions',
      'Surgical facial aesthetics',
    ],
    heldAreas: ['Facial contouring (scope to confirm)', 'Non-surgical facial aesthetic procedures (only where offered)'],
    qualifications: { value: 'M.D.S. — Oral & Maxillofacial Surgery', source: 'Clinic consultant signboard (name shown as “Dr. Jigisha Chhangani Saxena”)', status: 'supplied' },
    relatedPages: ['/cranio-maxillofacial-surgery/', '/facial-aesthetics/'],
    photo: null,
    profileStatus: 'supplied',
    metaTitle: 'Dr. Jigisha Chhangani — Maxillofacial Surgery & Facial Aesthetics, Jabalpur',
    metaDescription: 'Dr. Jigisha Chhangani, cranio-maxillofacial surgeon and facial aesthetics specialist in Jabalpur: facial asymmetry, facial trauma and aesthetic assessment.',
  },
];

export const doctorBySlug = (slug: string) => doctors.find((d) => d.slug === slug);
export const fullName = (d: Doctor) => `${d.honorific} ${d.name}`;
