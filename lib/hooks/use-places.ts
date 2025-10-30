import { useMap, useMapsLibrary } from '@vis.gl/react-google-maps';
import { useEffect, useState } from 'react';
import PlacesService = google.maps.places.PlacesService;

export const usePlacesService = () => {
  const map = useMap();
  const placesLibrary = useMapsLibrary('places');
  const [placesService, setPlacesService] = useState<PlacesService | null>(null);

  useEffect(() => {
    if (!placesLibrary || !map) return;

    setPlacesService(new placesLibrary.PlacesService(map));
  }, [placesLibrary, map]);

  return placesService;
};
