import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAutocompleteSuggestions } from '@/lib/hooks/use-autocomplete-suggestions';
import { MapPinIcon } from 'lucide-react';
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

  const loadLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        onLocationChange({ lat: position.coords.latitude, lng: position.coords.longitude });
      });
    }
  };

  const { suggestions } = useAutocompleteSuggestions(value);

  return (
    <div className="flex flex-col gap-2">
      <div className={'flex flex-row gap-2'}>
        <Button variant={'outline'} onClick={loadLocation} size={'icon'}>
          <MapPinIcon/>
        </Button>
        <Input type="text" placeholder="Search" onChange={(e) => setValue(e.target.value)}/>
      </div>

      {suggestions.length > 0 && (
        <ul className="">
          {suggestions.map((suggestion) => {
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
