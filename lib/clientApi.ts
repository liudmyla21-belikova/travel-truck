
import { api } from "./api";
import { Camper, CamperResponse } from "@/types/camper";
import { CamperFilters } from "@/lib/store/filterStore";

export interface CamperQueryParams extends CamperFilters {
  page: number;
  limit: number;
}

const normalizeCamper = (item: any): Camper => {
  return {
    id: String(item.id),
    name: item.name ?? "",
    price: Number(item.price ?? 0),
    rating: Number(item.rating ?? 0),
    location: item.location ?? "",
    description: item.description ?? "",
    form: (item.form ?? "panelTruck") as Camper["form"],
    length: item.length ?? "",
    width: item.width ?? "",
    height: item.height ?? "",
    tank: item.tank ?? "",
    consumption: item.consumption ?? "",
    transmission: (item.transmission ?? "manual") as Camper["transmission"],
    engine: (item.engine ?? "diesel") as Camper["engine"],
    AC: Boolean(item.AC),
    bathroom: Boolean(item.bathroom),
    kitchen: Boolean(item.kitchen),
    TV: Boolean(item.TV),
    radio: Boolean(item.radio),
    refrigerator: Boolean(item.refrigerator),
    microwave: Boolean(item.microwave),
    gas: Boolean(item.gas),
    water: Boolean(item.water),
    gallery: Array.isArray(item.gallery) ? item.gallery.map((g: any) => ({
      thumb: g.thumb ?? g.original ?? "",
      original: g.original ?? g.thumb ?? "",
    })) : [],
    reviews: Array.isArray(item.reviews) ? item.reviews.map((r: any) => ({
      reviewer_name: r.reviewer_name ?? r.name ?? "Anonymous",
      reviewer_rating: Number(r.reviewer_rating ?? r.rating ?? 0),
      comment: r.comment ?? "",
    })) : [],
    reviewsCount: Array.isArray(item.reviews) ? item.reviews.length : (item.reviewsCount ?? 0),
  } as Camper;
};

const buildQuery = (params: CamperQueryParams) => {
  const { page, limit, ...filters } = params;
  const q: Record<string, any> = { page, limit };

  if (filters.location) q.location = filters.location;
  if (filters.form) q.form = filters.form;

  const boolKeys: (keyof CamperFilters)[] = [
    "AC",
    "kitchen",
    "TV",
    "bathroom",
    "radio",
    "refrigerator",
    "microwave",
    "gas",
    "water",
  ];

  boolKeys.forEach((k) => {
    const v = (filters as any)[k];
    if (v === true) q[k] = true;
  });

  return q;
};

export const getCampers = async (params: CamperQueryParams): Promise<CamperResponse> => {
  const query = buildQuery(params);

  const { data } = await api.get("/campers", { params: query });


  if (data && typeof data === "object" && Array.isArray(data.items)) {
    return {
      items: data.items.map((i: any) => normalizeCamper(i)),
      total: Number(data.total ?? data.items.length ?? 0),
    };
  }

  if (Array.isArray(data)) {
    return {
      items: data.map((i: any) => normalizeCamper(i)),
      total: data.length,
    };
  }

  return { items: [], total: 0 };
};
