import { http, createPublicClient } from 'viem'
import { base, mainnet } from 'viem/chains'
 
export const publicClient = createPublicClient({
  chain: base,
  transport: http(),
})