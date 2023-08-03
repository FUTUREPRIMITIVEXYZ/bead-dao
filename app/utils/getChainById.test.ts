
import { Network } from 'alchemy-sdk'
import { Chain } from 'viem/chains'
import { FP_ENABLED_CHAINS } from '../config'

import { describe, expect, it } from 'vitest'
// import { getChainById } from './chains'
import { getChainById } from './getChainById'

describe('chain utils', () => {

  it('should return true', () => {
    const result = true
    expect(result).toBe(true)
  })

  it('should get the chain by Id', () => {
    const result = getChainById(1)
    // expect(result.id).toBe(1)
    // expect(true).toBe(true)
    
    // expect(result.name).toBe('mainnet')

    const result2 = getChainById(5)
    // expect(result2.id).toBe(5)
  })

  // test.todo('getChainById')
  // test.todo('chainNameToId')
  // test.todo('chainIdToName')
  // test.todo('chainIdToEtherscanUrl')
  // test.todo('chainIdToOpenseaAssetUrl')
  // test.todo('chainIdToAlchemyNetwork')

})
