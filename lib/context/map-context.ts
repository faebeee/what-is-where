import { createContext, useContext } from 'react';

export type MapContextType = {
  location: google.maps.LatLngLiteral | null;
  maxResults: number,
  setMaxResults: (maxResults: number) => void;
};

export const MapContext = createContext<MapContextType>({
  location: null,
  maxResults: 3,
  setMaxResults: () => {
  }
});

export const MapProvider = MapContext.Provider;

export const useMapContext = () => useContext(MapContext);
