import { AdvancedMarker, AdvancedMarkerProps, InfoWindow, useAdvancedMarkerRef, } from '@vis.gl/react-google-maps';
import React, { FC, PropsWithChildren, ReactNode, useState } from 'react';

export type MarkerWithInfowindowProps = PropsWithChildren & AdvancedMarkerProps & {
  pin: ReactNode
};

export const MarkerWithInfowindow: FC<MarkerWithInfowindowProps> = ({ children, pin, ...props }) => {
  const [infowindowOpen, setInfowindowOpen] = useState(false);
  const [markerRef, marker] = useAdvancedMarkerRef();

  return (
    <>
      <AdvancedMarker
        {...props}
        ref={markerRef}
        onClick={() => setInfowindowOpen(true)}
      >
        {pin}
      </AdvancedMarker>
      {infowindowOpen && (
        <InfoWindow
          anchor={marker}
          maxWidth={200}
          onCloseClick={() => setInfowindowOpen(false)}>
          {children}
        </InfoWindow>
      )}
    </>
  );
};
