import { Inter as InterFont, Space_Mono, Source_Sans_3 } from 'next/font/google'

// Each use of a 'next/font' is hosted as an instance in the app
// To reduce the number of instances, we can define a font once and reuse it throughout the app

// For a local font, uncomment the following line and add your font to app/fonts
// Be sure to export it at the bottom of this file.
// import localFont from 'next/font/local' 
// const FPRegular = localFont({ 
//   src: [
//     {
//       path: './FP-Regular.ttf',
//       weight: '700',
//       style: 'normal',
//     },
//   ]
//   // additional weights can be added here  
//  })

// const Inter = InterFont({
//   variable: '--font-inter', // a custom css variable for the font
//   subsets: ['latin'],
//   display: 'swap'
// })

const SpaceMono = Space_Mono({
  variable: '--font-space_mono',
  weight: '400',
  subsets: ['latin'],
  display: 'swap'
})


// Export 2 weights of Source Sans 3, a non-variable font
const SourceCodePro400 = Source_Sans_3({ 
  variable: '--font-sourcecode400',
  weight: '400',
  subsets: ['latin'],
  display: 'swap'
})
// const sourceCodePro700 = Source_Sans_3({ 
//   variable: '--font-sourcecode700',
//   weight: '700',
//   subsets: ['latin'],
//   display: 'swap'
// })

// Exports from here should be added to:
// - GlobalStyleProvider, as CSS variables for use site-wide
// - The 'fontFamily' block of tailwind.config.js, so we can conveniently use them in Tailwind classes like 'font-mono'

export { 
  // Inter,
  SpaceMono,
  SourceCodePro400,
  // sourceCodePro700,
  // FPRegular
}