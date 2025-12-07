
import axios from "axios";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://66b1f8e71ca8ad33d4f5f63e.mockapi.io";


export const api = axios.create({ baseURL: BASE_URL });