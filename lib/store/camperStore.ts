import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Camper, CamperForm } from '@/types/camper';


export interface CamperFilters {
    location: string;
    type: CamperForm | ''; 
    ac: boolean;
    kitchen: boolean;
    TV: boolean;
    bathroom: boolean;
    gas: boolean;
    water: boolean;
}

interface CamperState {
    campers: Camper[];
    filters: CamperFilters;
    page: number; 
    isLoading: boolean;
    canLoadMore: boolean; 
    error: string | null;

    setFilters: (newFilters: Partial<CamperFilters>) => void;
    fetchCampers: (reset?: boolean) => Promise<void>;
    resetFilters: () => void;
}

const initialFilters: CamperFilters = {
    location: '',
    type: '',
    ac: false,
    kitchen: false,
    TV: false,
    bathroom: false,
    gas: false,
    water: false,
};

export const useCamperStore = create<CamperState>((set, get) => ({
    campers: [],
    filters: initialFilters,
    page: 1,
    isLoading: false,
    canLoadMore: true,
    error: null,

    setFilters: (newFilters) => {
        const newCombinedFilters = { ...get().filters, ...newFilters };
        set({ filters: newCombinedFilters, page: 1, campers: [], canLoadMore: true }); 
    },
    
    resetFilters: () => {
        set({ filters: initialFilters, page: 1, campers: [], canLoadMore: true });
    },

    fetchCampers: async (reset = false) => {
    },
}));


interface FavouritesState {
  favourites: Camper[]; 
  toggleFavourite: (truck: Camper) => void;
}

export const useFavouriteTrucksStore = create<FavouritesState>()(
    persist(
        (set) => ({
            favourites: [],
        
            toggleFavourite: (truck) =>
                set((state) => {
                    const exists = state.favourites.some((item) => item.id === truck.id);
        
                    return exists
                        ? { favourites: state.favourites.filter((item) => item.id !== truck.id) } 
                        : { favourites: [...state.favourites, truck] };
                }),
        }),
        {
            name: 'camper-favourites-truck-storage',
            }
    )
);