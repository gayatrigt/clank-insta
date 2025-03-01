/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Root {
    data: TokenData
  }
  
  export interface TokenData {
    id: string
    type: string
    attributes: Attributes
    relationships: Relationships
  }
  
  export interface Attributes {
    address: string
    name: string
    symbol: string
    decimals: number
    image_url: any
    coingecko_coin_id: any
    total_supply: string
    price_usd: any
    fdv_usd: any
    total_reserve_in_usd: any
    volume_usd: VolumeUsd
    market_cap_usd: any
  }
  
  export interface VolumeUsd {
    h24: any
  }
  
  export interface Relationships {
    top_pools: TopPools
  }
  
  export interface TopPools {
    data: any[]
  }
  