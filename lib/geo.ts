import type { City } from "@prisma/client";

// TGU = Tegucigalpa, SPS = San Pedro Sula
const CITY_COORDS: Record<City, { lat: number; lng: number }> = {
  TGU: { lat: 14.0722, lng: -87.2068 },
  SPS: { lat: 15.5048, lng: -88.025 },
};

export function getCityCoords(city: City) {
  return CITY_COORDS[city];
}

// Destination coords used by the rider simulator
export const DELIVERY_ZONES: Record<City, { lat: number; lng: number }[]> = {
  TGU: [
    { lat: 14.0867, lng: -87.2072 }, // Colonia Kennedy
    { lat: 14.0983, lng: -87.2064 }, // Colonia Lomas del Mayab
    { lat: 14.0642, lng: -87.1947 }, // Barrio Guanacaste
    { lat: 14.101, lng: -87.2127 },  // Boulevard Morazán
    { lat: 14.0774, lng: -87.1723 }, // Tegucigalpa Centro
  ],
  SPS: [
    { lat: 15.5049, lng: -88.0162 }, // Centro SPS
    { lat: 15.4913, lng: -87.9887 }, // Col. Las Mesetas
    { lat: 15.521, lng: -87.9947 },  // Zona Viva
    { lat: 15.4826, lng: -88.0441 }, // Col. El Trapiche
    { lat: 15.5175, lng: -88.0412 }, // Barrio Medina
  ],
};

export function getRandomDeliveryZone(city: City) {
  const zones = DELIVERY_ZONES[city];
  return zones[Math.floor(Math.random() * zones.length)];
}

// Store pickup locations (rider starts here)
export const STORE_COORDS: Record<City, { lat: number; lng: number }> = {
  TGU: { lat: 14.0818, lng: -87.2011 }, // Multiplaza Tegucigalpa area
  SPS: { lat: 15.5108, lng: -88.0257 }, // City Mall SPS area
};

// Linear interpolation for smooth rider marker movement
export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

export function lerpCoords(
  from: { lat: number; lng: number },
  to: { lat: number; lng: number },
  t: number
) {
  return {
    lat: lerp(from.lat, to.lat, t),
    lng: lerp(from.lng, to.lng, t),
  };
}
