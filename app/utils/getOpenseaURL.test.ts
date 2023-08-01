import { describe, expect, it } from 'vitest'
// import {
//   getOpenseaTokenURL,
//   getOpenseaCollectionURL,
//   getOpenseaUserURL,
// } from './getOpenseaURL'
import { Address } from 'wagmi'
// import { CHAIN_AWARE_OPENSEA_URL } from '@/constants'

const COLLECTION_ADDRESS = '0x1234567890abcdef1234567890abcdef12345678' as Address
const TOKEN_ID = '123'
const USER_ADDRESS = '0xabcdef1234567890abcdef1234567890abcdef12' as Address

describe('Opensea functions', () => {
  test.todo('re-enable when URLs are fixed')
  // it('should return the correct token URL', () => {
  //   const tokenURL = getOpenseaTokenURL(COLLECTION_ADDRESS, TOKEN_ID)
  //   expect(tokenURL).toBe(
  //     `${CHAIN_AWARE_OPENSEA_URL}/assets/ethereum/${COLLECTION_ADDRESS}/${TOKEN_ID}`
  //   )
  // })

  // it('should return the correct collection URL', () => {
  //   const collectionURL = getOpenseaCollectionURL(COLLECTION_ADDRESS)
  //   expect(collectionURL).toBe(`${CHAIN_AWARE_OPENSEA_URL}/${COLLECTION_ADDRESS}/`)
  // })

  // it('should return the correct user URL', () => {
  //   const userURL = getOpenseaUserURL(USER_ADDRESS)
  //   expect(userURL).toBe(`${CHAIN_AWARE_OPENSEA_URL}/${USER_ADDRESS}/`)
  // })

})
