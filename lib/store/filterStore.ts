import { create } from "zustand";

export type CamperForm = "panelTruck" | "fullyIntegrated" | "alcove" | "";

export interface CamperFilters {
  location: string;
  form: CamperForm;
  AC?: boolean;
  TV?: boolean;
  kitchen?: boolean;
  bathroom?: boolean;
  radio?: boolean;
  refrigerator?: boolean;
  microwave?: boolean;
  gas?: boolean;
  water?: boolean;
}

interface FiltersState extends CamperFilters {
  setFilter: (key: keyof CamperFilters, value: any) => void;
  resetFilters: () => void;
}

const initialFilters: CamperFilters = {
  location: "",
  form: "",
  AC: undefined,
  TV: undefined,
  kitchen: undefined,
  bathroom: undefined,
  radio: undefined,
  refrigerator: undefined,
  microwave: undefined,
  gas: undefined,
  water: undefined,
};

export const useFiltersStore = create<FiltersState>((set) => ({
  ...initialFilters,
  setFilter: (key, value) =>
    set((state) => ({
      ...state,
      [key]: value === false ? undefined : value,
    })),
  resetFilters: () => set({ ...initialFilters }),
}));