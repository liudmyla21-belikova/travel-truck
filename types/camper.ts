
export interface CamperReview {
  reviewer_name: string;
  reviewer_rating: number;
  comment: string;
}

export interface CamperGalleryItem {
  thumb: string;
  original: string;
}

export type CamperForm = 'panelTruck' | 'fullyIntegrated' | 'alcove';

export interface Camper {
  id: string;
  name: string;
  price: number;
  rating: number;
  location: string;
  description: string;

  form: CamperForm;
  length: string;
  width: string;
  height: string;
  tank: string;
  consumption: string;

  transmission: 'automatic' | 'manual';
  engine: 'diesel' | 'petrol' | 'hybrid';

  AC: boolean;
  bathroom: boolean;
  kitchen: boolean;
  TV: boolean;
  radio: boolean;
  refrigerator: boolean;
  microwave: boolean;
  gas: boolean;
  water: boolean;

  gallery: CamperGalleryItem[];
  reviews: CamperReview[];

  reviewsCount?: number;
}

export interface CamperResponse {
  items: Camper[];
  total: number;
}
