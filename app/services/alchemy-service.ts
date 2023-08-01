import { ACTIVE_NETWORK } from "@/constants"
import { Alchemy } from "alchemy-sdk"

const settings = {
  apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
  network: ACTIVE_NETWORK,
}

export const alchemyService = new Alchemy(settings)
