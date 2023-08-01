import { AnalyticsBrowser } from '@segment/analytics-next'

const SEGMENT_WRITE_KEY = process.env.NEXT_PUBLIC_SEGMENT_WRITE_KEY

// Basic implementation:
// export const segmentClient = AnalyticsBrowser
//     .load({ writeKey: SEGMENT_WRITE_KEY! })
//     .catch((err) => {
//       console.error(err)
//     })

// Basic usage:
//   segmentClient.identify('Hello from Future Primitive!')  
//   // Example usage:
//   document.body?.addEventListener('click', () => {
//     segmentClient.track('document body clicked!')
//   })

// Conditional implementation: lazy loaded, after awaiting user consent / GDPR compliance
// export const segmentClient = new AnalyticsBrowser()
// if(USER_CONSENTS_TO_SEGMENT_TRACKING) {
//   segmentClient
//     .load({ writeKey: SEGMENT_WRITE_KEY! })
//     .catch((err) => {
//       console.error(err)
//     });
// }

