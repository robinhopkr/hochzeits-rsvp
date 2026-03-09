import {
  Bellefair,
  Bodoni_Moda,
  Cardo,
  Cinzel,
  Cormorant_Garamond,
  DM_Serif_Display,
  EB_Garamond,
  Inter,
  Manrope,
  Marcellus,
  Nunito_Sans,
  Playfair_Display,
  Prata,
  Raleway,
  Source_Sans_3,
} from 'next/font/google'

const playfairDisplay = Playfair_Display({
  variable: '--font-playfair-display',
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
})

const cormorantGaramond = Cormorant_Garamond({
  variable: '--font-cormorant-garamond',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  preload: false,
})

const ebGaramond = EB_Garamond({
  variable: '--font-eb-garamond',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  preload: false,
})

const prata = Prata({
  variable: '--font-prata',
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
  preload: false,
})

const dmSerifDisplay = DM_Serif_Display({
  variable: '--font-dm-serif-display',
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
  preload: false,
})

const marcellus = Marcellus({
  variable: '--font-marcellus',
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
  preload: false,
})

const bodoniModa = Bodoni_Moda({
  variable: '--font-bodoni-moda',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  preload: false,
})

const cinzel = Cinzel({
  variable: '--font-cinzel',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  preload: false,
})

const bellefair = Bellefair({
  variable: '--font-bellefair',
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
  preload: false,
})

const cardo = Cardo({
  variable: '--font-cardo',
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
  preload: false,
})

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
})

const manrope = Manrope({
  variable: '--font-manrope',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  preload: false,
})

const nunitoSans = Nunito_Sans({
  variable: '--font-nunito-sans',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  preload: false,
})

const raleway = Raleway({
  variable: '--font-raleway',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  preload: false,
})

const sourceSans3 = Source_Sans_3({
  variable: '--font-source-sans-3',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  preload: false,
})

export const fontVariables = [
  playfairDisplay.variable,
  cormorantGaramond.variable,
  ebGaramond.variable,
  prata.variable,
  dmSerifDisplay.variable,
  marcellus.variable,
  bodoniModa.variable,
  cinzel.variable,
  bellefair.variable,
  cardo.variable,
  inter.variable,
  manrope.variable,
  nunitoSans.variable,
  raleway.variable,
  sourceSans3.variable,
].join(' ')
