'use client';

import { LocationSearch } from '@/components/location-search';
import { Checkbox } from '@/components/ui/checkbox';
import { MapProvider } from '@/lib/context/map-context';
import { useLocalStorage } from '@uidotdev/usehooks';
import { Map, Marker, useMap } from '@vis.gl/react-google-maps';
import { Fragment, useEffect, useState } from 'react';
import { Places } from '../places';
import { Label } from '../ui/label';


export type Point = {
  coordinates: [number, number];
  label: string;
  id: string
}

export type POILayersEntry = {
  id: string,
  label: string,
  keyword: string
}
export type POILayersGroup = {
  id: string,
  label: string,
  layers: POILayersEntry[]
}

export const POILayers: POILayersGroup[] = [
  {
    id: 'food',
    label: 'Food',
    layers: [
      {
        id: 'groceries',
        label: 'Lebensmittel',
        keyword: 'lebensmittel'
      },
      {
        id: 'bakery',
        label: 'Bäckerei',
        keyword: 'bäckerei'
      },
      {
        id: 'restaurant',
        label: 'Restaurant',
        keyword: 'restaurant'
      }
    ]
  },
  {
    id: 'public',
    label: 'Public',
    layers: [
      {
        id: 'school',
        label: 'Schulen',
        keyword: 'schule'
      },
      {
        id: 'trainstation',
        label: 'Bahnhof',
        keyword: 'bahnhof'
      },
      {
        id: 'bus-station',
        label: 'Bus-Station',
        keyword: 'bus-station'
      }
    ]
  },
  {
    id: 'medical',
    label: 'Medical',
    layers: [
      {
        id: 'pharmacy',
        label: 'Apotheke',
        keyword: 'apotheke'
      },
      {
        id: 'doctor',
        label: 'Arztpraxis',
        keyword: 'arztpraxis'
      },
      {
        id: 'hospital',
        label: 'Spital',
        keyword: 'spital'
      }
    ]
  },
  {
    id: 'recreation',
    label: 'Recreation',
    layers: [
      {
        id: 'mall',
        label: 'Einkaufs-Zentrum',
        keyword: 'shopping-mall'
      },
      {
        id: 'swimming-pool',
        label: 'Schwimmbad',
        keyword: 'swimming-pool'
      },
      {
        id: 'gym',
        label: 'Gym',
        keyword: 'gym'
      }
    ]
  }
];

export const MapView = () => {
  const [currentLocation, setCurrentLocation] = useLocalStorage<google.maps.LatLngLiteral | null>('location', null);
  const map = useMap();
  const [maxResults, setMaxResults] = useState(3);
  const [layers, setLayers] = useLocalStorage<string[]>('layers', []);

  useEffect(() => {
    if (!currentLocation) {
      return;
    }
    map?.setCenter(currentLocation);
    map?.setZoom(15);
  }, [currentLocation]);

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        if (!currentLocation) {
          setCurrentLocation({ lat: position.coords.latitude, lng: position.coords.longitude });
        }
      });
    }
  }, []);

  const toggleLayer = (layer: string) => {
    if (layers.includes(layer)) {
      setLayers(layers.filter((l) => l !== layer));
    } else {
      setLayers([...layers, layer]);
    }
  };

  return <div className={'flex flex-row h-[100vh]'}>
    <MapProvider value={{ location: currentLocation, maxResults, setMaxResults }}>
      {currentLocation && <Map
        mapId={'test'}
        className={'flex-grow'}
        defaultCenter={currentLocation}
        defaultZoom={15}
      >
        <Marker position={currentLocation} title={'You'}/>
        {POILayers.map((group) => (<>
          {group.layers.map((layer) => (<>
            {currentLocation &&
              <Places show={layers.includes(layer.id)} location={currentLocation} search={layer.keyword}/>}
          </>))}
        </>))}
      </Map>}

      <div className={'w-[420px] p-5 flex flex-col gap-5'}>
        <div>
          <LocationSearch onLocationChange={setCurrentLocation}/>
        </div>
        <div className="flex flex-col gap-5">
          {POILayers.map((group) => (<Fragment key={group.id}>
              <div className="flex flex-col gap-5">
                <label>{group.label}</label>
                {group.layers.map((layer) => (
                  <div className="flex items-center gap-3" key={layer.id}>
                    <Checkbox id={layer.id}
                      checked={layers.includes(layer.id)}
                      onClick={() => toggleLayer(layer.id)}/>
                    <Label htmlFor={layer.id}>{layer.label}</Label>
                  </div>))
                }
              </div>
            </Fragment>
          ))}
        </div>
      </div>
    </MapProvider>
  </div>;
};

export default MapView;
