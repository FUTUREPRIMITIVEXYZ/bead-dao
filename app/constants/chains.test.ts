
import { describe, expect, it } from 'vitest'
import { chainIdToAlchemyNetwork, chainIdToName, chainNameToId } from './chains'
import { Network } from 'alchemy-sdk'

describe('chain constants', () => {

  it('can convert chainNameToId', () => {
    const ethereum = chainNameToId['ethereum']
    expect(ethereum).toBe(1)
    
    const goerli = chainNameToId['goerli']
    expect(goerli).toBe(5)

    const sepolia = chainNameToId['sepolia']
    expect(sepolia).toBe(11155111)
    
  })

  it('can convert chainIdToName', () => {
    const ethereum = chainIdToName[1]
    expect(ethereum).toBe('ethereum')

    const goerli = chainIdToName[5]
    expect(goerli).toBe('goerli')

    const sepolia = chainIdToName[11155111]
    expect(sepolia).toBe('sepolia')
    
  })

  it('can convert chainIdToAlchemyNetwork', () => {
    const ethereum = chainIdToAlchemyNetwork[1]
    expect(ethereum).toBe(Network.ETH_MAINNET)
    
    const goerli = chainIdToAlchemyNetwork[5]
    expect(goerli).toBe(Network.ETH_GOERLI)
    
    const sepolia = chainIdToAlchemyNetwork[11155111]
    expect(sepolia).toBe(Network.ETH_SEPOLIA)
 
  })

  test.todo('chainIdToEtherscanUrl')
  test.todo('chainIdToOpenseaAssetUrl')
  test.todo('chainIdToAlchemyNetwork')

})
