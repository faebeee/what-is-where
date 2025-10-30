import { useMapsLibrary } from '@vis.gl/react-google-maps';
import { useEffect, useMemo, useState } from 'react';

export function useAutocompleteSuggestions(
  inputString: string
) {
  const geocodeLib = useMapsLibrary('geocoding');
  const [suggestions, setSuggestions] = useState<google.maps.GeocoderResult[]>([]);
  const coder = useMemo(() => {
    if (!geocodeLib) {
      return null;
    }
    return new geocodeLib.Geocoder();
  }, [geocodeLib]);

  // stores the current sessionToken

  // indicates if there is currently an incomplete request to the places API
  const [isLoading, setIsLoading] = useState(false);
  const loadLocation = async (input: string) => {
    if (!coder) {
      return;
    }
    setIsLoading(true);
    try {
      const response = await coder.geocode({ address: input });
      setSuggestions(response.results);
    } catch {
      setSuggestions([]);
    }

    setIsLoading(false);
  };

  // once the PlacesLibrary is loaded and whenever the input changes, a query
  // is sent to the Autocomplete Data API.
  useEffect(() => {
    loadLocation(inputString);
  }, [inputString]);

  return {
    suggestions,
    isLoading
  };
}
