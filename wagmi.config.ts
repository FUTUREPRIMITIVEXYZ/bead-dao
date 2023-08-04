import { defineConfig } from '@wagmi/cli'
import { react } from '@wagmi/cli/plugins'

import BEAD_CONTRACT from './app/abis/BEAD.json'

export default defineConfig({
  out: 'app/generated.ts',
  contracts: [
    {
      name: 'BEAD',
      address: {
        11155111: '0x4909145BCdFeC4984636656098f8359391a84142',
        1: '0xDC754d884217E658E5a158E31236D8AeeC4d25A7',
      },
      // @ts-ignore
      abi: BEAD_CONTRACT.abi,
    },
  ],
  plugins: [react()],
})
