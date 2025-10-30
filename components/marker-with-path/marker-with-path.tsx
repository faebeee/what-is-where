import { MarkerWithInfowindow } from '@/components/MarkerWithInfowindow';
import { useMapContext } from '@/lib/context/map-context';
import { useMap } from '@vis.gl/react-google-maps';
import { FC, useEffect } from 'react';

export type MarkerWithPathProps = {
  location: google.maps.LatLng | google.maps.LatLngLiteral;
  title: string;
  icon: string;
}

export const MarkerWithPath: FC<MarkerWithPathProps> = ({ location, title, icon }) => {
  const mapContext = useMapContext();
  const map = useMap();

  useEffect(() => {
    if (!mapContext.location) {
      return;
    }

    const line = new google.maps.Polyline({
      map,
      strokeColor: '#6f98ea',
      path: [mapContext.location, location]
    });

    return () => {
      line.setMap(null);
    };
  }, [location, mapContext.location]);


  return <>
    <MarkerWithInfowindow
      position={location}
      title={title}
      pin={<img src={icon} width={'24px'}/>}>
      {title}
    </MarkerWithInfowindow>
  </>;
};
