// types/geckoterminal.ts

export interface TransactionStat {
    buys: number;
    sells: number;
    buyers: number;
    sellers: number;
  }
  
  export interface PriceChangePercentage {
    m5: string;
    h1: string;
    h6: string;
    h24: string;
  }
  
  export interface VolumeUsd {
    m5: string;
    h1: string;
    h6: string;
    h24: string;
  }
  
  export interface Transactions {
    m5: TransactionStat;
    m15: TransactionStat;
    m30: TransactionStat;
    h1: TransactionStat;
    h24: TransactionStat;
  }
  
  export interface PoolAttributes {
    base_token_price_usd: string;
    base_token_price_native_currency: string;
    quote_token_price_usd: string;
    quote_token_price_native_currency: string;
    base_token_price_quote_token: string;
    quote_token_price_base_token: string;
    address: string;
    name: string;
    pool_created_at: string;
    fdv_usd: string;
    market_cap_usd: string;
    price_change_percentage: PriceChangePercentage;
    transactions: Transactions;
    volume_usd: VolumeUsd;
    reserve_in_usd: string;
  }
  
  export interface TokenData {
    id: string;
    type: string;
  }
  
  export interface DexData {
    id: string;
    type: string;
  }
  
  export interface RelationshipData {
    base_token: {
      data: TokenData;
    };
    quote_token: {
      data: TokenData;
    };
    dex: {
      data: DexData;
    };
  }
  
  export interface PoolData {
    id: string;
    type: string;
    attributes: PoolAttributes;
    relationships: RelationshipData;
  }
  
  export interface PoolResponse {
    data: PoolData;
  }