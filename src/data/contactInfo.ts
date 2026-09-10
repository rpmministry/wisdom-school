// Datos de contacto oficiales de Wisdom School (fuente única de verdad).
export const CONTACT_INFO = {
  name: 'Mauricio Andrade Luna',
  email: 'mauriandrade@outlook.com',
  whatsappDisplay: '+593 0979376810',
  whatsappNumber: '593979376810',
} as const;

const CONTACT_SUBJECT = 'Quiero información sobre Wisdom School';

export const MAILTO_HREF = `mailto:${CONTACT_INFO.email}?subject=${encodeURIComponent(CONTACT_SUBJECT)}`;

export const WHATSAPP_HREF = `https://wa.me/${CONTACT_INFO.whatsappNumber}?text=${encodeURIComponent(
  'Hola, quiero información sobre Wisdom School y sus planes de estudio.'
)}`;
