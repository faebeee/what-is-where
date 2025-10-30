import { Input } from '@/components/ui/input';
import { useAutocompleteSuggestions } from '@/lib/hooks/use-autocomplete-suggestions';
import { FC, useState } from 'react';

export type LocationSearchProps = {
  onLocationChange: (location: google.maps.LatLngLiteral) => void;
}

export const LocationSearch: FC<LocationSearchProps> = ({ onLocationChange }) => {
  const [value, setValue] = useState('');

  const onLocationSelected = (location?: google.maps.LatLng) => {
    if (!location) {
      return;
    }
    onLocationChange(location.toJSON());
  };


  const { suggestions } = useAutocompleteSuggestions(value);

  return (
    <div className="flex flex-col gap-2">
      <Input type="text" placeholder="Search" onChange={(e) => setValue(e.target.value)}/>

      {suggestions.length > 0 && (
        <ul className="">
          {suggestions.map((suggestion, index) => {

            return (
              <li
                key={suggestion.place_id}
                onClick={() => onLocationSelected(suggestion.geometry.location)}>
                {suggestion.formatted_address}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
