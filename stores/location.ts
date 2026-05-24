import { create } from "zustand";
import { persist } from "zustand/middleware";

export type City = "TGU" | "SPS";

interface LocationStore {
  city: City | null;
  hasSelected: boolean;
  setCity: (city: City) => void;
}

export const useLocationStore = create<LocationStore>()(
  persist(
    (set) => ({
      city: null,
      hasSelected: false,
      setCity: (city) => set({ city, hasSelected: true }),
    }),
    { name: "click-location" }
  )
);
