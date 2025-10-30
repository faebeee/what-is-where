'use client'

import { APIProvider } from "@vis.gl/react-google-maps";
import dynamic from "next/dynamic";

const MapView = dynamic(() => import('@/components/map-view/map-view'), {
  loading: () => <p>Loading...</p>,
  ssr: false,
})

export default function Home() {
  return (
    <div>
      <APIProvider apiKey={process.env.NEXT_PUBLIC_GMAPS_API_KEY as string}>
        <MapView/>
      </APIProvider>
    </div>
  );
}
