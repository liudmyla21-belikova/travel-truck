
import { Camper } from "@/types/camper";
import { api } from "./api"; 

const normalizeCamper = (item: any): Camper => {
  return <Camper>{ 
    ...item,
    price: Number(item.price),
    reviewsCount: item.reviews?.length || 0,
  };
};

export const getCamperById = async (id: string): Promise<Camper> => {
  try {
    const { data } = await api.get(`/campers/${id}`);
    return normalizeCamper(data);
  } catch (error) {
    console.error(`Помилка отримання кемпера з ID ${id} на сервері:`, error);
    throw new Error('Не вдалося завантажити деталі кемпера.');
  }
};

export const sendBookingRequest = async (payload: {
  name: string;
  email: string;
  date: string;
  comment?: string;
}) => {
    const { data } = await api.post("/booking", payload); 
    return data;
};