export type GlobalStats = {
  total: number;
  totalExchanges: number;
  totalMarketCap: number | string;
  total24hVolume: number | string;
  totalMarkets: number;
};

export type Coin = {
  uuid: string;
  rank: number;
  name: string;
  symbol: string;
  iconUrl: string;
  price: number | string;
  marketCap: number | string;
  change: number | string;
};

export type CoinLink = {
  name: string;
  type: string;
  url: string;
};

export type CoinSupply = {
  confirmed?: boolean;
  total?: number | string | null;
  circulating?: number | string | null;
};

export type CoinDetails = Coin & {
  description: string;
  "24hVolume"?: number | string;
  allTimeHigh: {
    price: number | string;
  };
  numberOfMarkets: number;
  numberOfExchanges: number;
  supply: CoinSupply;
  links: CoinLink[];
};

export type CryptosResponse = {
  data?: {
    stats?: GlobalStats;
    coins?: Coin[];
  };
};

export type CryptoDetailsResponse = {
  data?: {
    coin?: CoinDetails;
  };
};

export type CoinHistoryPoint = {
  price: number | string;
  timestamp: number;
};

export type CryptoHistoryResponse = {
  data?: {
    change?: number | string;
    history?: CoinHistoryPoint[];
  };
};

export type NewsImage = {
  thumbnail?: {
    contentUrl?: string;
  };
};

export type NewsProvider = {
  name?: string;
  image?: NewsImage;
};

export type CryptoNewsItem = {
  name: string;
  url: string;
  description?: string;
  datePublished?: string;
  image?: NewsImage;
  provider?: NewsProvider[];
};

export type CryptoNewsResponse = {
  value?: CryptoNewsItem[];
};
