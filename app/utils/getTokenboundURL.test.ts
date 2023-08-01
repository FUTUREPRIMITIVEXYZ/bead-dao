import { getTokenboundWalletURL } from './getTokenboundURL'

import { test } from 'vitest'

test('getTokenboundWalletURL - should return correct URL when tbWalletAddress is valid', () => {
  const tbWalletAddress: `0x${string}` = '0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B'
  const expectedResult =
    'https://tokenbound.org/wallet/0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B'
  const result = getTokenboundWalletURL(tbWalletAddress)
  expect(result).toBe(expectedResult)
})

test('getTokenboundWalletURL - should throw an error when tbWalletAddress is not valid', () => {
  const tbWalletAddress: `0x${string}` = '0x'
  expect(() => getTokenboundWalletURL(tbWalletAddress)).toThrowError(
    'not a valid address'
  )
})
