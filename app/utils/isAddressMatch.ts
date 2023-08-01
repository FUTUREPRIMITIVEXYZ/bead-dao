import { getAddress } from 'viem'

// Compare two strings to see if they contain the same 0x address. Uses ethers.utils.getAddress
// to normalize the addresses so case-sensitivity and checksums are properly handled.
export function isAddressMatch(
  a?: string | null,
  b?: string | null
) {
  try {
    if(!a || !b) return false
    return getAddress(a) === getAddress(b)
  } catch (error) {
    return false
  }
}
