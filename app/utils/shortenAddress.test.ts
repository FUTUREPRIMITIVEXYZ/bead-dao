import { describe, expect, it } from 'vitest'

import { shortenAddress } from './shortenAddress'

const TEST_ADDRESS = `0x71C7656EC7ab88b098defB751B7401B5f6d8976F`

describe('Text', () => {
  it('should shorten an address', () => {
    const shortenedAddress = shortenAddress(TEST_ADDRESS)
    expect(shortenedAddress).toBe(`0x71...76F`)
  })

})
