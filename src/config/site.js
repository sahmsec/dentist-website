/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  SITE CONFIG — everything editable lives here.
 *  Change a value in this file and it updates everywhere on the site.
 *  No other file needs to be touched to rebrand, re-word or re-price the site.
 * ─────────────────────────────────────────────────────────────────────────────
 */

/* ── Site ──────────────────────────────────────────────────────────────────────
 *  The canonical origin. Every absolute URL — canonical tags, Open Graph, the
 *  sitemap, the business schema — is built from this, so moving the site to a
 *  different domain is a one-line change. His Instagram bio already cites this
 *  domain, so it is the one to keep.
 */
export const site = {
  /* The live origin, no trailing slash. Everything absolute — canonical,
     og:url, og:image, the sitemap — is built from this one value. Set it back
     to null to fall through to whatever host is serving the page, which is what
     makes a preview deployment share as itself. */
  url: 'https://drarmansdental.com',
  locale: 'en_GB',
  region: 'BD',
}

/* ── Identity ──────────────────────────────────────────────────────────────── */
export const identity = {
  name: 'Dr. Arman Kayser',
  shortName: 'Dr. Arman',
  credential: 'BDS',
  title: 'Oral & Dental Surgeon',
  tagline: 'Healthy Teeth, Confident You',
  brandName: "Dr. Arman's Dental Care",
  /* What someone in Dhaka types comes first, the practice name second. Nobody
     searches for the brand until they already know it; they search for a
     dentist and a place. Kept under ~60 characters so Google shows all of it. */
  metaTitle: "Dentist in Shyamoli, Dhaka — Dr. Arman's Dental Care",
  metaDescription:
    'Dental clinic in Shyamoli, Dhaka. Dr. Md. Arman Kayser, BDS, with postgraduate training ' +
    'in oral & maxillofacial surgery — wisdom tooth removal, dental implants, braces and clear ' +
    'aligners, root canal, scaling and teeth whitening. Over 10,000 patients treated since ' +
    '2016. Call 01915109006.',
}

/* ── Contact ───────────────────────────────────────────────────────────────────
 *  `display` is what a visitor reads. `dial` is the E.164 number the tel: link
 *  actually calls — keep the +88 country code on `dial` so the button still
 *  works for someone calling from outside Bangladesh.
 */
export const contact = {
  phone: {
    display: '01915109006',
    dial: '+8801915109006',
    label: 'Chamber No',
  },
  whatsapp: {
    // wa.me wants digits only — no plus sign, no spaces.
    number: '8801915109006',
    display: '01915109006',
    message: 'Hello Dr. Arman, I would like to book a dental appointment.',
  },
  /*  Set this to null until there is a real, monitored inbox.
   *
   *  It was a placeholder on a domain that may not exist, and a dead address on
   *  a live site is worse than no address — a patient writes to it and hears
   *  nothing back. Every place that shows an email checks for null and simply
   *  omits it: the header info row, the footer contact tiles and the Contact
   *  page all drop to phone, WhatsApp and directions.
   *
   *  To switch it on:  email: { display: 'x@y.com', address: 'x@y.com' }
   */
  email: null,
  address: {
    line1: '12/Cha/A/2, Road No 4',
    line2: 'Shyamoli, Dhaka',
    country: 'Bangladesh',
    display: '12/Cha/A/2, Road No 4, Shyamoli, Dhaka',
    // Opens turn-by-turn directions in whatever maps app the visitor has.
    mapsUrl:
      'https://www.google.com/maps/search/?api=1&query=12%2FCha%2FA%2F2%2C+Road+No+4%2C+Shyamoli%2C+Dhaka',
    embedUrl:
      'https://www.google.com/maps?q=12%2FCha%2FA%2F2%2C%20Road%20No%204%2C%20Shyamoli%2C%20Dhaka&output=embed',
  },
}

/* ── Google Business Profile ───────────────────────────────────────────────────
 *  Read off the live listing, not invented. `cid` is Google's own identifier for
 *  the place — every link below is built from it, so if the listing ever moves
 *  there is one value to change.
 *
 *  There is deliberately no aggregateRating in the page schema. Google has not
 *  shown review stars for self-serving LocalBusiness markup since 2019, so it
 *  was doing nothing for search while being one more number to keep in sync
 *  with a listing that changes on its own.
 *
 *  NOTE: the listing is currently UNCLAIMED. Google is showing "Are you the
 *  owner of this business?" on it, the phone number is missing, and the website
 *  field is empty. Claiming it is the single highest-value thing outstanding —
 *  see README.md.
 *
 *  The name on Google is "Dr. Arman's Dental Care & Cure", which differs from
 *  the name this site uses. They should match; pick one and change the other.
 */
export const google = {
  cid: '7590116896021837297',
  rating: 4.9,
  /* A floor, not a count. The exact figure moves every few weeks, and every
     place it appears would have to be edited by hand to keep up — which is the
     kind of number that quietly goes stale and then reads as a lie. "50+" only
     ever becomes more true. Raise it when the listing is comfortably past the
     next round number. */
  reviewsFloor: 50,
  profileName: "Dr. Arman's Dental Care & Cure",
  get listing() { return `https://www.google.com/maps?cid=${this.cid}` },
  get reviews() { return `https://search.google.com/local/reviews?placeid=&q=&cid=${this.cid}` },
  get writeReview() { return `https://search.google.com/local/writereview?cid=${this.cid}` },
}

export const social = [
  { name: 'Facebook', handle: '@drarmansdental', url: 'https://facebook.com/drarmansdental', icon: 'facebook' },
  // Derived, never typed: the number exists only in `contact` above, and the
  // pre-filled enquiry text comes along with it.
  {
    name: 'WhatsApp',
    handle: contact.whatsapp.display,
    url: `https://wa.me/${contact.whatsapp.number}?text=${encodeURIComponent(contact.whatsapp.message)}`,
    icon: 'whatsapp',
  },
  { name: 'Instagram', handle: '@drarmansdental', url: 'https://instagram.com/drarmansdental', icon: 'instagram' },
  { name: 'YouTube', handle: '@drarmansdental', url: 'https://youtube.com/@drarmansdental', icon: 'youtube' },
]

/* ── Chamber hours ─────────────────────────────────────────────────────────── */
export const hours = {
  /* One line, every day. `rows` stays an array because four places render it as
     a list, and a chamber that adds a different Saturday later should only have
     to add a row here — not change four components back. */
  rows: [{ days: 'Every day', time: '6:00 PM – 11:00 PM' }],
  emergencyNote: 'Dental emergency? Call any time',
}

/* ── Hero ──────────────────────────────────────────────────────────────────── */
export const hero = {
  eyebrow: 'Trusted care in Shyamoli',
  // Words listed in `highlight` render in the accent colour inside the headline.
  headline: 'Your smile is our priority',
  highlight: ['smile'],
  lede: 'Expert care for a healthier, brighter smile — delivered gently, and explained at every step.',
  primaryCta: 'Call the chamber',
  secondaryCta: 'About Dr. Arman',
}

/* ── The three promises from the banner ────────────────────────────────────── */

/*  Heading for the accent band that carries them. Deliberately NOT
 *  about.headline: both blocks sit on the home page a screen apart, and running
 *  the same sentence twice made the page read like a template. This one is his
 *  own tagline, which had no home on the site until now.
 */
export const pillarsIntro = {
  title: 'Healthy teeth, confident you',
  text: 'Three things every patient gets here, whatever they came in for.',
}

export const pillars = [
  { icon: 'tooth', title: 'Expert Care', text: 'Advanced dental solutions for all your oral health needs.' },
  { icon: 'shield', title: 'Safe & Comfortable', text: 'Painless, gentle and patient-friendly treatment.' },
  { icon: 'smile', title: 'Beautiful Smiles', text: 'Enhancing smiles with precision and care.' },
]

/* ── Services ──────────────────────────────────────────────────────────────────
 *  Showcase only — this is a portfolio, so each card states what the treatment
 *  is and who it suits, and the call to action is a phone call, not a booking
 *  engine. `image` points at /public/images/<file>; a branded placeholder is
 *  drawn automatically for any file that is not there yet.
 */
export const services = [
  {
    slug: 'general-dentistry',
    icon: 'tooth',
    title: 'General Dentistry',
    summary: 'Comprehensive dental care for healthy, confident smiles.',
    detail:
      'Routine examination, scaling and polishing, fillings and root canal treatment — ' +
      'the everyday care that stops small problems becoming big ones.',
    points: ['Check-up & diagnosis', 'Scaling and polishing', 'Tooth-coloured fillings', 'Root canal treatment'],
    image: 'service-general.jpg',
  },
  {
    slug: 'orthodontics',
    icon: 'braces',
    title: 'Orthodontics (Braces)',
    summary: 'Straightening teeth and correcting bite, at any age.',
    detail:
      'Metal, ceramic and clear aligner treatment planned around your face and bite, ' +
      'with a clear timeline and a fixed cost agreed before anything starts.',
    points: ['Metal & ceramic braces', 'Clear aligners', 'Bite correction', 'Retainers & follow-up'],
    image: 'service-orthodontics.jpg',
  },
  {
    slug: 'dental-implants',
    icon: 'implant',
    title: 'Dental Implants',
    summary: 'Permanent replacement for missing teeth.',
    detail:
      'A titanium root placed in the jaw and restored with a custom crown, so a missing ' +
      'tooth looks, feels and bites like the one it replaced.',
    points: ['Single-tooth implants', 'Multiple & full-arch', 'Bone grafting', 'Custom crown'],
    image: 'service-implants.jpg',
  },
  {
    slug: 'cosmetic-dentistry',
    icon: 'sparkle',
    title: 'Cosmetic Dentistry',
    summary: 'Enhancing smiles with artistic, personalised care.',
    detail:
      'Veneers, composite bonding and smile design that respect your natural proportions — ' +
      'the goal is a smile nobody can tell was worked on.',
    points: ['Porcelain veneers', 'Composite bonding', 'Smile design', 'Gum contouring'],
    image: 'service-cosmetic.jpg',
  },
  {
    slug: 'teeth-whitening',
    icon: 'whitening',
    title: 'Teeth Whitening',
    summary: 'Safe, professional brightening with lasting results.',
    detail:
      'In-chamber whitening and take-home trays, matched to your enamel so the result is ' +
      'several shades brighter without the sensitivity.',
    points: ['In-chamber whitening', 'Take-home trays', 'Stain removal', 'Sensitivity care'],
    image: 'service-whitening.jpg',
  },
  {
    slug: 'oral-surgery',
    icon: 'surgery',
    title: 'Oral Surgery',
    summary: 'Extractions and minor oral surgery, done comfortably.',
    detail:
      'Wisdom-tooth removal, surgical extraction and minor oral procedures performed under ' +
      'proper anaesthesia with a clear aftercare plan.',
    points: ['Wisdom tooth removal', 'Surgical extraction', 'Minor oral surgery', 'Post-op care'],
    image: 'service-surgery.jpg',
  },
]

/* ── Why patients choose the chamber (the tabbed panel on Home) ────────────── */
export const reasons = [
  {
    key: 'qualified',
    tab: 'Qualified Surgeon',
    title: 'An oral & dental surgeon, not only a dentist',
    text:
      'Impacted wisdom teeth, implants and difficult extractions are handled here, ' +
      'not referred elsewhere.',
    checks: ['Registered oral & dental surgeon', 'Surgical cases handled in-house'],
    image: 'why-qualified.jpg',
  },
  {
    key: 'painless',
    tab: 'Painless Treatment',
    title: 'Gentle, genuinely painless treatment',
    text:
      'Proper anaesthesia and unhurried technique. You are never in the chair without ' +
      'knowing what happens next.',
    checks: ['Effective local anaesthesia', 'Calm, unhurried appointments'],
    image: 'why-painless.jpg',
  },
  {
    key: 'transparent',
    tab: 'Transparent Pricing',
    title: 'The cost is agreed before treatment starts',
    text:
      'The plan and its cost in writing before anything begins. No mid-treatment ' +
      'surprises.',
    checks: ['Written treatment plan', 'Fixed, agreed cost'],
    image: 'why-transparent.jpg',
  },
  {
    key: 'modern',
    tab: 'Modern Equipment',
    title: 'Current equipment, properly sterilised',
    text:
      'Digital diagnosis, modern materials, and a sterilisation protocol followed for ' +
      'every instrument, every time.',
    checks: ['Digital diagnosis', 'Strict sterilisation protocol'],
    image: 'why-modern.jpg',
  },
]

/* ── Patient journey ───────────────────────────────────────────────────────── */
export const process = [
  { step: '01', title: 'Call the chamber', text: 'Tell us what is wrong and we find you a slot.' },
  { step: '02', title: 'Examination', text: 'Teeth, gums and bite checked, and the diagnosis explained plainly.' },
  { step: '03', title: 'Treatment plan', text: 'Options, timeline and cost, agreed in writing before anything starts.' },
  { step: '04', title: 'Treatment & care', text: 'Carried out gently, with a follow-up to be sure it settled.' },
]

/* ── Stats ─────────────────────────────────────────────────────────────────── */
/* ── Stats ─────────────────────────────────────────────────────────────────────
 *  Every figure here should be one a visitor could check. `prefix` exists so
 *  "nearly 10" can be stated as nearly ten rather than rounded up to "10+",
 *  which would be a different and untrue claim.
 *
 *  The rating and review count are read off the Google listing (see `google`
 *  above), so they move when it does.
 */
export const stats = [
  /* Every figure here is checkable. The patient count is the practice's own,
     for the chamber since it opened in 2016; the two Google numbers come from
     the listing and are read from one place in `google` above. */
  { value: 10000, suffix: '+', label: 'Patients treated since 2016' },
  { value: 10, suffix: '', label: 'Years of the practice in Shyamoli' },
  { value: google.rating, decimals: 1, suffix: '', label: 'Average Google rating' },
  { value: google.reviewsFloor, suffix: '+', label: 'Reviews on Google' },
]

/* ── About page content ────────────────────────────────────────────────────── */
export const about = {
  /* The About page is about the clinic first. Dr. Arman is the founder and the
     name over the door, but the thing a patient books with, walks into and
     reviews is the practice — and the practice is the primary entity in the
     structured data too, with him linked to it. `practice` opens the page;
     `body` below is his own story, and the home page still takes body[0]. */
  practice: {
    eyebrow: 'The practice',
    headline: 'A dental chamber in Shyamoli since 2016',
    body: [
      'Dr. Arman’s Dental Care was founded in 2016 to provide comprehensive, modern and ' +
        'ethical dental care, with the patient at the centre of it.',
      'Since then the clinical team has treated more than 10,000 patients — from across ' +
        'Bangladesh, and from abroad. Everything from a routine scaling to full implant work is ' +
        'carried out in the one chamber on Road No 4.',
      'What the practice holds itself to: a treatment plan made for the person in the chair, ' +
        'agreed and costed before anything begins; patient safety and sterilisation without ' +
        'exception; and care aimed at oral health that lasts rather than a problem cleared today.',
    ],
  },

  eyebrow: 'About Dr. Arman',
  headline: 'Your dental health is our passion',
  lede: 'Let us make your smile your best feature.',

  /* body[0] is the whole of the home introduction; the About page runs the
     lot. Written as the practice's own account of itself — the specifics are
     what a patient searching for a dental surgeon in Dhaka is weighing up, and
     they are also the only search terms worth ranking for. */
  body: [
    'Dr. Md. Arman Kayser is an Oral & Dental Surgeon practising in Shyamoli, Dhaka, and the ' +
      'founder of Dr. Arman’s Dental Care. Wisdom teeth, implants and difficult extractions are ' +
      'treated here rather than referred elsewhere.',
    'He qualified BDS in 2014, then completed a one-year postgraduate diploma and clinical ' +
      'training in Oral & Maxillofacial Surgery at Dhaka Dental College & Hospital, and ' +
      'postgraduate clinical training in Conservative Dentistry at Shaheed Suhrawardy Medical ' +
      'College & Hospital.',
    'He founded Dr. Arman’s Dental Care in 2016. Since then he and the clinical team have ' +
      'treated more than 10,000 patients, from across Bangladesh and from abroad.',
    'Alongside the chamber he has been a Senior Lecturer at City Dental College & Hospital ' +
      'since 2017, and keeps up with the field through training in Thailand, Singapore and ' +
      'Malaysia — so what is taught in the lecture room and what happens in the chair stay the ' +
      'same thing.',
  ],

  /* Real qualifications, each with where it was earned. The home page shows the
     first four; the About page shows them all. */
  credentials: [
    { title: 'BDS — Bachelor of Dental Surgery', org: 'Qualified 2014' },
    {
      title: 'Oral & Maxillofacial Surgery',
      org: 'Postgraduate diploma and clinical training — Dhaka Dental College & Hospital',
    },
    {
      title: 'Conservative Dentistry',
      org: 'Postgraduate clinical training — Shaheed Suhrawardy Medical College & Hospital',
    },
    {
      title: 'Fixed orthodontics & clear aligners',
      org: 'One-year training programme — ICTTRDB',
    },
    { title: 'Senior Lecturer since 2017', org: 'City Dental College & Hospital' },
    {
      title: 'Cardiopulmonary resuscitation (CPR)',
      org: 'Dhaka Medical College Hospital — emergency readiness in the chair',
    },
  ],

  /* The people a patient actually meets. `bio` is the About page; the cards on
     smaller screens fall back to name and role. */
  team: [
    {
      name: 'Dr. Md. Arman Kayser',
      role: 'Oral & Dental Surgeon',
      credential: 'BDS | Postgraduate training in Oral & Maxillofacial Surgery',
      image: 'team-arman.jpg',
      lead: true,
      bio:
        'Founder of the practice and the surgeon who takes the complex cases. BDS in 2014, then ' +
        'a one-year postgraduate diploma and clinical training in Oral & Maxillofacial Surgery ' +
        'at Dhaka Dental College & Hospital, postgraduate clinical training in Conservative ' +
        'Dentistry at Shaheed Suhrawardy Medical College & Hospital, and a year of fixed ' +
        'orthodontic and clear aligner training at ICTTRDB. Senior Lecturer at City Dental ' +
        'College & Hospital since 2017, and a decade of clinical practice behind him.',
    },
    {
      name: 'Fahmida Haque',
      role: 'Owner',
      credential: 'BDS (in training)',
      image: 'team-fahmida.jpg',
      bio:
        'Owner of Dr. Arman’s Dental Care and closely involved in the development and running ' +
        'of it, while reading for her own BDS. Her interest is in the patient-centred side of ' +
        'dentistry — building a professional, compassionate and modern practice where people are ' +
        'looked after with care and attention, not processed.',
    },
    {
      name: 'Dr. Puspita Mehezabin',
      role: 'Dental Surgeon',
      credential: 'BDS | Postgraduate trainee, Oral & Maxillofacial Surgery',
      image: 'team-puspita.jpg',
      bio:
        'A qualified dental surgeon, diagnosing and treating a wide range of dental conditions, ' +
        'and currently taking postgraduate training in Oral & Maxillofacial Surgery at Dhaka ' +
        'Medical College & Hospital. She works on the principle that clinical expertise and ' +
        'plain, unhurried explanation belong together. Her interests are oral surgery, minor ' +
        'surgical procedures, dental infections, impacted teeth, and the management of complex ' +
        'oral and maxillofacial conditions.',
    },
    {
      name: 'Antara Fahmida',
      role: 'Dental Hygienist',
      credential: 'DDT | MPH',
      image: 'team-antara.jpg',
      bio:
        'A qualified dental hygienist with eight years of clinical experience, holding a DDT ' +
        'and a Master of Public Health — clinical practice on one side, preventive and ' +
        'community oral healthcare on the other. Her work is the maintenance half of dentistry: ' +
        'professional cleaning, scaling and polishing, plaque and calculus removal, and ' +
        'preventive gum care. She catches the early signs of gum disease, and spends time on ' +
        'the part most people are never actually taught — how to brush, how to floss, and what ' +
        'daily care keeps teeth and gums healthy between visits.',
    },
  ],

  /* The rest of the chamber, shown by role rather than by name — they have not
     given names or titles to publish, and a made-up one is worse than none.
     Their faces are the point here: a patient recognises who assisted them
     without needing to be told what to call anyone. */
  support: {
    title: 'And the rest of the chamber',
    text: 'Assisting at the chair and in the laboratory.',
    people: [
      { role: 'Dental Assistant', image: 'staff-assistant-1.jpg' },
      { role: 'Dental Assistant', image: 'staff-assistant-2.jpg' },
      { role: 'Laboratory Technologist', image: 'staff-technologist.jpg' },
    ],
  },
}

/* ── Testimonials ──────────────────────────────────────────────────────────── */
export const testimonials = [
  {
    quote:
      'I had put off my wisdom tooth for two years because I was scared of the pain. It was over ' +
      'before I realised it had started. I genuinely felt nothing.',
    name: 'Nusrat J.',
    context: 'Wisdom tooth extraction',
  },
  {
    quote:
      'He showed me exactly what was wrong on the screen and what each option would cost, then let ' +
      'me decide. No pressure at all. My braces finished right on the timeline he gave me.',
    name: 'Tanvir H.',
    context: 'Orthodontic treatment',
  },
  {
    quote:
      'I lost a front tooth in an accident and thought it would always look obvious. The implant ' +
      'matches so well that my own family cannot pick out which one it is.',
    name: 'Sadia R.',
    context: 'Single-tooth implant',
  },
  {
    quote:
      'Took my daughter in terrified and she came out asking when she could go back. He was patient ' +
      'with her in a way I have not seen from a dentist before.',
    name: 'Mahmudul K.',
    context: 'Paediatric check-up',
  },
]

/* ── Section switches ──────────────────────────────────────────────────────────
 *  Turn a whole section of the site on or off without touching a component.
 *  The section's code, styles and content all stay in place — flipping the flag
 *  back to true brings it straight back.
 */
export const sections = {
  // Off until there are real before-and-after cases with patient consent.
  // Generated or borrowed "results" would be a claim about outcomes this
  // chamber did not produce, so the section stays hidden rather than filled.
  beforeAfter: false,

  // Off because the four quotes below are invented placeholder copy, and there
  // are 44 real Google reviews sitting one link away. Fabricated praise beside
  // a genuine 4.9 rating is the one thing on this page that could not survive
  // a patient checking it. Replace `testimonials` with real review text and
  // turn this back on.
  testimonials: false,
}

/* ── Before / after showcase (Home section) ───────────────────────────────────
 *  Drop matching pairs into /public/images/. Leave the array as it is and
 *  branded placeholders are drawn instead — the section still reads correctly.
 */
export const beforeAfter = [
  { title: 'Composite bonding', caption: 'Chipped upper incisors rebuilt in a single visit.', before: 'ba-1-before.jpg', after: 'ba-1-after.jpg' },
  { title: 'Orthodontic result', caption: 'Eighteen months of fixed appliance treatment.', before: 'ba-2-before.jpg', after: 'ba-2-after.jpg' },
  { title: 'Professional whitening', caption: 'Four shades brighter, with no sensitivity afterwards.', before: 'ba-3-before.jpg', after: 'ba-3-after.jpg' },
]

/* ── Navigation ────────────────────────────────────────────────────────────── */
export const nav = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Contact', to: '/contact' },
]

/* ── Derived links — import these instead of hand-writing hrefs ────────────── */
export const links = {
  tel: `tel:${contact.phone.dial}`,
  whatsapp: `https://wa.me/${contact.whatsapp.number}?text=${encodeURIComponent(contact.whatsapp.message)}`,
  mailto: contact.email ? `mailto:${contact.email.address}` : null,
  maps: contact.address.mapsUrl,
  googleListing: google.listing,
  googleReviews: google.reviews,
  writeGoogleReview: google.writeReview,
}

export default {
  site, identity, contact, google, social, hours, hero, pillars, pillarsIntro,
  services, reasons, process, stats, about, testimonials, beforeAfter,
  sections, nav, links,
}
