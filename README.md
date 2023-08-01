This is a [Next.js](https://nextjs.org/) project starter for FP projects, initialized with common directory structures and base technologies so that we can standardize our build approach.

## Technology

- [clsx](https://vitest.dev/) for constructing className strings conditionally
- [CVA](https://cva.style/docs) for organizing variant styles
- [Eslint](https://eslint.org/) for static code analysis
- [Husky](https://typicode.github.io/husky/) for running native git hooks
- [pnpm](https://pnpm.io/) for managing dependencies
- [Prettier](https://prettier.io/) for formatting code automatically
- [svgr](https://react-svgr.com) for transforming SVGs into React components
- [Tailwind](https://eslint.org/) for CSS
- [Vitest](https://vitest.dev/) for unit tests
- [Sentry](https://docs.sentry.io/platforms/javascript/guides/nextjs/) for error reporting
- [Segment](https://segment.com/) for analytics
- [ShadCN](https://ui.shadcn.com/docs/installation/next) for starter components built with Radix+Tailwind
## Getting Started

- Clone this repo
- [Install pnpm](https://pnpm.io/installation)
- Run `pnpm i` to install dependencies for all projects
- Run `npx vercel link` + `npx vercel env pull .env.local` to retrieve .env files from Vercel (if any)
- Run `pnpm dev` to launch an in-browser development environment at [http://localhost:3000](http://localhost:3000)

## Configuration

Core config options can be handled in the ```app/config``` files. Config options include:
- App Settings (Name, Desc, etc.)
- Enabled Chains
- ... and more (eg. debug mode settings)

See ```.env.example``` for required environment variables.

## Directory Structure

- /abis
- /components
- /config
- /constants
- /data, for defining queries, mutations, and subscriptions
- /hooks
- /fonts
- /services
- /types
- /utils for utility functions. As a general rule, new additions here should also have tests.

## Custom Files

- not-found.tsx to customize the 404 page

## Fonts

Font configurations live in ```/fonts```. Instances of Google Fonts and locally-served fonts should all be configured in ```fonts.ts```, where you can find additional information about configuring CSS variables and Tailwind styles for each typeface.

## Icons

We generate React components for icons using SVGR. Just drop raw SVGs into ```/icon-svg```, and run ```pnpm build-icons``` to rebuild the icon set in ```app/components/icons/generated```. If you have pre-built or custom icon components, drop them in ```app/components/icons/```. Be aware that components in ```icons/generated``` will be overwritten by the build process, so any custom modifications should be done to the source SVGs or in a custom icon component.

## Barrel Exports

Barrel exports simplify imports and improve code organization. This starter uses them extensively.

By creating an `index.ts` file for a directory, multiple modules or components can be exported from a single entry point:

**index.ts**
```typescript
export * from '@/components/foo'
export * from '@/components/bar'
export * from '@/components/foo-bar'
```

Barrel exports allow multiple modules or components to be imported with a single statement:

```typescript
import { FooComponent, BarComponent, FooBarComponent } from '@/components'
```

This approach keeps imports concise and avoids specifying individual paths for each module or component.

You can still import components individually if necessary:

```typescript
import FooComponent from '@/components/foo'
import BarComponent from '@/components/bar'
import FooBarComponent from '@/components/foo-bar'
```

## Analytics

Analytics are collected using Segment. ```@segment/analytics-next``` is already included as a dependency.

### Step 1.

Log in to Segment and create a new source for the project. This will create an API key that will allow us to write data to segment. Add the key to .env.local / Vercel's env vars:

**.env**
```bash
NEXT_PUBLIC_SEGMENT_WRITE_KEY="<add_your_write_key_here>"
```

### Step 2.

Segment can be included in the front-end by importing an implementation of ```analyticsClient``` from ```app/services/segment-service.ts```. This will ensure that we have one consistent instance client-side.

 You'll first need to uncomment one of the two implementations:

- a. the basic implementation
- b. the conditional implementation, which requires an explicit call to analyticsClient.load

The conditional implementation is best for scenarios where user consent is required for data collection, eg. for GDPR compliance.

See additional instructions for configuration in ```segment-service.ts```

### Step 3.
Import the segment client instance:
```jsx
import { segmentClient } from '@/services'
```

Use the client instance:
```jsx
<button onClick={() => segmentClient.track('hello world')}>Track</button>
```

## Installing ShadCN Components

ShadCN is a component starter library whose components can all be directly installed locally rather than as an NPM package, so we have the ability to modify the files directly. Each component is installed separately on an as-needed basis. Core components will be installed into `@/components/ui`

For example, here we install the `<Button>` component:
```bash
pnpm dlx shadcn-ui@latest add button
```