import { MarkerWithPath } from '@/components/marker-with-path/marker-with-path';
import { useMapContext } from '@/lib/context/map-context';
import { usePlacesService } from '@/lib/hooks/use-places';
import { FC, Fragment, useEffect, useMemo, useState } from 'react';
import PlaceResult = google.maps.places.PlaceResult;

export type PlacesProps = {
  location: google.maps.LatLngLiteral;
  search: string;
  show: boolean;
}

export const Places: FC<PlacesProps> = ({ location, search, show }) => {
  const placesService = usePlacesService();
  const [points, setPoints] = useState<PlaceResult[]>([]);
  const mapContext = useMapContext();

  const loadLocation = async () => {
    if (!placesService) return;

    placesService.nearbySearch({
      location: location,
      // radius: 1000,
      keyword: search,
      rankBy: google.maps.places.RankBy.DISTANCE
    }, (val) => {
      setPoints(val ?? []);
    });
  };

  useEffect(() => {
    loadLocation();
  }, [location, placesService]);

  const pointsToRender = useMemo(() => points.slice(0, mapContext.maxResults), [points, mapContext.maxResults]);

  if (!show) {
    return;
  }

  return <>{
    pointsToRender.map((point) => (<Fragment key={point.place_id}>
      {point.geometry?.location &&
        <MarkerWithPath location={point.geometry.location} icon={point.icon!} title={point.name!}/>}

    </Fragment>))
  }</>;
};
