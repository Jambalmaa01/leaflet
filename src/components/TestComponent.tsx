'use client';

import { Icon } from 'leaflet';
import {
  Marker,
  Tooltip,
  useMap,
  useMapEvent,
  useMapEvents,
} from 'react-leaflet';
import { useState } from 'react';

export function TestComponent() {
  const map = useMap();

  const [coordinates, setCoordinates] = useState<[number, number][]>([]);

  useMapEvent('click', (e) => {
    console.log('Map clicked at', e.latlng);
  });

  useMapEvents({
    click: (e: any) => {
      const { lat, lng } = e.latlng;
      setCoordinates([...coordinates, [lat, lng]]);
    },
  });

  return (
    <>
      {coordinates.length > 0 &&
        coordinates.map((coord, index) => (
          <Marker
            key={index}
            position={coord}
            icon={
              new Icon({
                iconUrl: '/image/leaf-orange.png',
                iconSize: [25, 41],
                iconAnchor: [12, 41],
              })
            }
          >
            <Tooltip>
              Latitude: {coord[0]}
              <br />
              Longitude: {coord[1]}
            </Tooltip>
          </Marker>
        ))}
    </>
  );
}
