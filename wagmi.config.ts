import { defineConfig } from '@wagmi/cli'
import { react } from '@wagmi/cli/plugins'

import BEAD_CONTRACT from './contracts/out/BEAD.sol/BEAD.json'

export default defineConfig({
  out: 'app/generated.ts',
  contracts: [
    {
      name: 'BEAD',
      address: {
        11155111: '0xa17f131B2d6C3AFa64f24dA5e1ce98cffaabDf7D',
      },
      // @ts-ignore
      abi: BEAD_CONTRACT.abi,
    },
  ],
  plugins: [react()],
})
