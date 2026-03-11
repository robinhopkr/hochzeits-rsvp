import type {
  EditableCouplePhoto,
  EditableFaqItem,
  EditableProgramItem,
  EditableSectionImage,
  EditableVendorProfile,
} from '@/types/wedding'

export type SetupQuestionnaireStepId =
  | 'basics'
  | 'venue'
  | 'messages'
  | 'design'
  | 'photos'
  | 'program'
  | 'dresscode'
  | 'gallery'
  | 'vendors'
  | 'faq'
  | 'extras'

export interface SetupQuestionnaireStep {
  id: SetupQuestionnaireStepId
  label: string
  title: string
  description: string
}

export const SETUP_QUESTIONNAIRE_STEPS: readonly SetupQuestionnaireStep[] = [
  {
    id: 'basics',
    label: 'Basis',
    title: 'Grunddaten eurer Hochzeit',
    description: 'Wir starten mit den wichtigsten Eckdaten, damit eure Einladung sofort ein klares Fundament hat.',
  },
  {
    id: 'venue',
    label: 'Ort & Story',
    title: 'Ort, Adresse und Begrüßung',
    description: 'Hier bauen wir den ersten Eindruck für eure Gäste auf.',
  },
  {
    id: 'messages',
    label: 'RSVP-Texte',
    title: 'Texte rund um Zu- und Absage',
    description: 'Diese Texte sehen eure Gäste vor und nach der Rückmeldung.',
  },
  {
    id: 'design',
    label: 'Design',
    title: 'Look & Feel für euren Gästebereich',
    description: 'Template, Schrift und Titelbild bestimmen den Stil eurer Einladung.',
  },
  {
    id: 'photos',
    label: 'Paarfotos',
    title: 'Fotos von euch als Paar',
    description: 'Diese Bilder machen die Einladung persönlicher und emotionaler.',
  },
  {
    id: 'program',
    label: 'Ablauf',
    title: 'Tagesablauf für eure Gäste',
    description: 'Wir strukturieren euren Hochzeitstag Schritt für Schritt mit Uhrzeit, Text und Icon.',
  },
  {
    id: 'dresscode',
    label: 'Dresscode',
    title: 'Outfit- und Farbhinweise',
    description: 'So wissen eure Gäste genau, woran sie sich bei Kleidung und Farben orientieren können.',
  },
  {
    id: 'gallery',
    label: 'Galerie',
    title: 'Galerie und zusätzliche Bereichsbilder',
    description: 'Hier legt ihr Titel, Beschreibung und optionale Bilder für einzelne Bereiche fest.',
  },
  {
    id: 'vendors',
    label: 'Dienstleister',
    title: 'Dienstleister vorstellen',
    description: 'Optional könnt ihr eure wichtigsten Dienstleister mit Bild, Website und Instagram zeigen.',
  },
  {
    id: 'faq',
    label: 'FAQ',
    title: 'Häufige Fragen eurer Gäste',
    description: 'Hier beantwortet ihr die Rückfragen vorab und entlastet euch am Hochzeitstag.',
  },
  {
    id: 'extras',
    label: 'Extras',
    title: 'Zusatzfunktionen und Zugänge',
    description: 'Zum Schluss schalten wir optionale Features und den Fotografen-Zugang passend ein.',
  },
] as const

function createId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}

export function createQuestionnaireCouplePhoto(): EditableCouplePhoto {
  return {
    id: createId('couple-photo'),
    imageUrl: '',
    altText: '',
    caption: '',
  }
}

export function createQuestionnaireProgramItem(): EditableProgramItem {
  return {
    id: createId('program-item'),
    timeLabel: '',
    title: '',
    description: '',
    icon: '',
  }
}

export function createQuestionnaireFaqItem(): EditableFaqItem {
  return {
    id: createId('faq-item'),
    question: '',
    answer: '',
  }
}

export function createQuestionnaireSectionImage(): EditableSectionImage {
  return {
    id: createId('section-image'),
    section: 'programm',
    title: '',
    imageUrl: '',
    altText: '',
  }
}

export function createQuestionnaireVendorProfile(): EditableVendorProfile {
  return {
    id: createId('vendor'),
    name: '',
    role: '',
    websiteUrl: '',
    instagramUrl: '',
    imageUrl: '',
  }
}
