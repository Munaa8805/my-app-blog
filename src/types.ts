export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

export interface OrderItem {
  productId: string;
  name: string;
  quantity: number;
  price: number;
  image: string;
}

export interface Order {
  id: string;
  date: string;
  status: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  total: number;
  items: OrderItem[];
}

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

/** GDP time series from API: points or year → value map */
export type CountryGdp =
  | Array<{ year: number | string; value: number }>
  | Record<string, number>;

export interface Country {
  name: {
    common: string;
    official: string;
  };
  capital?: string[];
  currencies?: {
    [key: string]: {
      name: string;
      symbol: string;
    };
  };
  flags?: {
    png: string;
    svg: string;
  };
  population?: number;
  region?: string;
  subregion?: string;
  languages?: {
    [key: string]: string;
  };
  area?: number;
  borders?: string[];
  continents?: string[];
  independent?: boolean;
  landlocked?: boolean;
  latlng?: number[];
  maps?: {
    googleMaps: string;
    openStreetMaps: string;
  };
  postalCode?: {
    format: string;
    regex: string;
  };
  translations?: {
    [key: string]: {
      official: string;
      common: string;
    };
  };
  unMember?: boolean;
  _id?: string;
  gdp?: CountryGdp;
  /** Year string → numeric value, e.g. { "2020": 1744456, ... } */
  yearlyData?: Record<string, number>;
  tourist_destinations?: string[];
  /** Lower score / rank may indicate better safety depending on API definition. */
  safety_score?: {
    rank: number;
    score: number;
  };
}
