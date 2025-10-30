'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { MapProvider } from '@/lib/context/map-context';
import { Map, Marker, useMap } from '@vis.gl/react-google-maps';
import { useEffect, useState } from 'react';
import { Places } from '../places';
import { Label } from '../ui/label';
import LatLngLiteral = google.maps.LatLngLiteral;

export type Point = {
  coordinates: [number, number];
  label: string;
  id: string
}

export const MapView = () => {
  const [currentLocation, setCurrentLocation] = useState<LatLngLiteral | null>(null);
  const map = useMap();
  const [showGroceries, setShowGroceries] = useState<boolean>(true);
  const [showSchools, setShowSchools] = useState<boolean>(true);
  const [showTrainStations, setShowTrainstations] = useState<boolean>(true);
  const [showMall, setShowMall] = useState<boolean>(true);
  const [maxResults, setMaxResults] = useState(3);

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
        setCurrentLocation({ lat: position.coords.latitude, lng: position.coords.longitude });
      });
    }
  }, []);

  return <div className={'flex flex-row h-[100vh]'}>
    <MapProvider value={{ location: currentLocation, maxResults, setMaxResults }}>
      {currentLocation && <Map
        mapId={'test'}
        className={'flex-grow'}
        defaultCenter={currentLocation}
        defaultZoom={15}
      >
        <Marker position={currentLocation} title={'You'}/>
        {currentLocation && <Places show={showGroceries} location={currentLocation} search={'lebensmittel'}/>}
        {currentLocation && <Places show={showMall} location={currentLocation} search={'einkaufszentrum'}/>}
        {currentLocation && <Places show={showSchools} location={currentLocation} search={'schule'}/>}
        {currentLocation && <Places show={showTrainStations} location={currentLocation} search={'bahnhof'}/>}

      </Map>}

      <div className={'w-[420px] p-5'}>
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <Checkbox id="groceries" checked={showGroceries} onClick={() => setShowGroceries(!showGroceries)}/>
            <Label htmlFor="groceries">Groceries</Label>
          </div>

          <div className="flex items-center gap-3">
            <Checkbox id="mall" checked={showMall} onClick={() => setShowMall(!showMall)}/>
            <Label htmlFor="mall">Shopping-Mall</Label>
          </div>

          <div className="flex items-center gap-3">
            <Checkbox id="schools" checked={showSchools} onClick={() => setShowSchools(!showSchools)}/>
            <Label htmlFor="schools">Schools</Label>
          </div>

          <div className="flex items-center gap-3">
            <Checkbox id="trainstation" checked={showTrainStations}
              onClick={() => setShowTrainstations(!showTrainStations)}/>
            <Label htmlFor="trainstation">Trainstations</Label>
          </div>
        </div>
      </div>
    </MapProvider>
  </div>;
};

export default MapView;
