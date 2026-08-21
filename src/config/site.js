/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  SITE CONFIG — everything editable lives here.
 *  Change a value in this file and it updates everywhere on the site.
 *  No other file needs to be touched to rebrand, re-word or re-price the site.
 * ─────────────────────────────────────────────────────────────────────────────
 */

/* ── Identity ──────────────────────────────────────────────────────────────── */
export const identity = {
  name: 'Dr. Arman Kayser',
  shortName: 'Dr. Arman',
  credential: 'BDS',
  title: 'Oral & Dental Surgeon',
  tagline: 'Healthy Teeth, Confident You',
  brandName: "Dr. Arman's Dental Care",
  metaTitle: "Dr. Arman's Dental Care — Oral & Dental Surgeon, Shyamoli Dhaka",
  metaDescription:
    "Dr. Arman's Dental Care — Oral & Dental Surgeon in Shyamoli, Dhaka. General dentistry, " +
    'orthodontics, dental implants, cosmetic dentistry and teeth whitening. ' +
    'Call 01915109006 to book an appointment.',
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
  rows: [
    { days: 'Saturday – Wednesday', time: '5:00 PM – 10:00 PM' },
    { days: 'Thursday', time: '5:00 PM – 9:00 PM' },
    { days: 'Friday', time: 'Closed' },
  ],
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
      'Surgical training means the complicated cases — impacted wisdom teeth, implants, ' +
      'difficult extractions — are handled in the chamber rather than referred on.',
    checks: ['Registered oral & dental surgeon', 'Surgical cases handled in-house'],
    image: 'why-qualified.jpg',
  },
  {
    key: 'painless',
    tab: 'Painless Treatment',
    title: 'Gentle, genuinely painless treatment',
    text:
      'Proper anaesthesia, unhurried technique, and a rule that you are never in the chair ' +
      'without knowing what happens next. Nervous patients are welcome here.',
    checks: ['Effective local anaesthesia', 'Calm, unhurried appointments'],
    image: 'why-painless.jpg',
  },
  {
    key: 'transparent',
    tab: 'Transparent Pricing',
    title: 'The cost is agreed before treatment starts',
    text:
      'You get the full treatment plan and its cost in writing before anything begins. ' +
      'No mid-treatment surprises and no charges you did not agree to.',
    checks: ['Written treatment plan', 'Fixed, agreed cost'],
    image: 'why-transparent.jpg',
  },
  {
    key: 'modern',
    tab: 'Modern Equipment',
    title: 'Current equipment, properly sterilised',
    text:
      'Digital diagnosis, modern restorative materials, and a sterilisation protocol followed ' +
      'for every single instrument, every single time.',
    checks: ['Digital diagnosis', 'Strict sterilisation protocol'],
    image: 'why-modern.jpg',
  },
]

/* ── Patient journey ───────────────────────────────────────────────────────── */
export const process = [
  { step: '01', title: 'Call the chamber', text: 'Ring 01915109006 and tell us what is bothering you. We find you a slot.' },
  { step: '02', title: 'Examination', text: 'A full look at your teeth, gums and bite, with the diagnosis explained plainly.' },
  { step: '03', title: 'Treatment plan', text: 'Your options, the timeline and the cost — written down and agreed before we begin.' },
  { step: '04', title: 'Treatment & care', text: 'The work carried out gently, then a follow-up to be sure it settled well.' },
]

/* ── Stats ─────────────────────────────────────────────────────────────────── */
export const stats = [
  { value: 12, suffix: '+', label: 'Years treating patients' },
  { value: 5000, suffix: '+', label: 'Smiles cared for' },
  { value: 98, suffix: '%', label: 'Patients who recommend us' },
  { value: 6, suffix: '', label: 'Treatments offered' },
]

/* ── About page content ────────────────────────────────────────────────────── */
export const about = {
  eyebrow: 'About Dr. Arman',
  headline: 'Your dental health is our passion',
  lede: 'Let us make your smile your best feature.',
  body: [
    'Dr. Arman Kayser is an Oral & Dental Surgeon practising in Shyamoli, Dhaka. His chamber ' +
      'handles everything from a routine scaling to full-arch implant work, with the same ' +
      'principle behind all of it: a patient who understands their treatment is a patient who ' +
      'is comfortable during it.',
    'Surgical training is what sets the practice apart. Impacted wisdom teeth, difficult ' +
      'extractions and implant placement are done here rather than referred elsewhere — fewer ' +
      'appointments, one person accountable for the outcome, and a plan that holds together ' +
      'from diagnosis through to follow-up.',
    'Every treatment plan is written down and costed before work begins. Nothing starts until ' +
      'you have agreed to it.',
  ],
  credentials: [
    { title: 'BDS — Bachelor of Dental Surgery', org: 'Registered dental surgeon' },
    { title: 'Oral & Dental Surgery', org: 'Surgical extraction, implants, minor oral surgery' },
    { title: 'Orthodontic treatment', org: 'Fixed appliances and clear aligners' },
    { title: 'Cosmetic & restorative dentistry', org: 'Veneers, bonding, smile design' },
  ],
  // Deliberately small — this is a personal portfolio, not a hospital site.
  team: [
    { name: 'Dr. Arman Kayser', role: 'Oral & Dental Surgeon', image: 'team-arman.jpg', lead: true },
    { name: 'Associate Dentist', role: 'General Dentistry', image: 'team-associate.jpg' },
    { name: 'Chamber Assistant', role: 'Dental Assistant', image: 'team-assistant.jpg' },
  ],
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
}

export default {
  identity, contact, social, hours, hero, pillars, pillarsIntro, services,
  reasons, process, stats, about, testimonials, beforeAfter, sections, nav, links,
}
