export interface Item {
  id: number;
  title: string;
  image: string;
}

export interface Point {
  id: number;
  name: string;
  email: string;
  image: string;
  whatsapp: string;
  latitude: number;
  longitude: number;
  city: string;
  uf: string;
}

export interface ItemPerPoint {
  id: number;
  item_id: number;
  point_id: number;
}

export interface PointsBody extends Point {
  items: number[];
}
