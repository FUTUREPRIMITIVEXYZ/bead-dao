import { describe, expect, it } from 'vitest'
import { isAddressMatch } from './isAddressMatch'

const VALID_ADDRESS_1 = `0x71C7656EC7ab88b098defB751B7401B5f6d8976F`
const VALID_ADDRESS_1_MIXED_CASE = `0x71c7656ec7ab88b098defb751b7401b5f6d8976f`
const VALID_ADDRESS_2 = `0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db`
const INVALID_ADDRESS = `NOT AN ADDRESS`

describe('isAddressMatch', () => {
  it('should return true for two identical addresses', () => {
    const result = isAddressMatch(VALID_ADDRESS_1, VALID_ADDRESS_1)
    expect(result).toBe(true)
  })

  it('should return true for two addresses that differ only in case', () => {
    const result = isAddressMatch(VALID_ADDRESS_1, VALID_ADDRESS_1_MIXED_CASE)
    expect(result).toBe(true)
  })

  it('should return false for two different addresses', () => {
    const result = isAddressMatch(VALID_ADDRESS_1, VALID_ADDRESS_2)
    expect(result).toBe(false)
  })

  it('should return false for invalid address', () => {
    const result = isAddressMatch(VALID_ADDRESS_1, INVALID_ADDRESS)
    expect(result).toBe(false)
  })

  it('should return false for null or undefined addresses', () => {
    const result1 = isAddressMatch(null, VALID_ADDRESS_1)
    const result2 = isAddressMatch(VALID_ADDRESS_1, undefined)
    const result3 = isAddressMatch(null, undefined)
    expect(result1).toBe(false)
    expect(result2).toBe(false)
    expect(result3).toBe(false)
  })
})
