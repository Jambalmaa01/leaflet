'use client';

import { useEffect } from 'react';
import L from 'leaflet';
import { useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-rotatedmarker';
export type MarkerComponentProps = { marker: boolean };

export function MarkerComponent(props: MarkerComponentProps) {
  const map = useMap();
  const { marker } = props;

  useEffect(() => {
    if (marker) {
      const createdMarker = L.marker([51.505, -0.09], {
        icon: L.icon({
          iconUrl: './map-icons/001.svg',
          iconSize: [40, 80],
          className: 'flipped-icon1',
        }),
      }).addTo(map);

      createdMarker.on('click', () => {
        const markerElement = createdMarker.getElement();
        if (markerElement) {
          markerElement.style.transition = 'transform 1s';
          markerElement.style.transformOrigin = 'center center';
          markerElement.style.transform = 'rotateX(-180deg)';

          // if (currentTransform.includes('rotateY(180deg)')) {
          //   markerElement.style.transform = 'rotateY(0deg)'; // Нэгэнт эргүүлсэн бол буцааж эргүүлэх
          // } else {
          //   markerElement.style.transform = 'rotateY(180deg)'; // Flip хийх
          // }

          // const currentLatLng = createdMarker.getLatLng();
          // createdMarker.setLatLng(currentLatLng);
          // const currentRotation = createdMarker.options.rotationAngle || 0;
          // createdMarker.setRotationAngle(currentRotation + 180);
        }
      });
    }
  }, [marker, map]);

  //   useEffect(() => {
  //     if (marker) {
  //       const createdMarker = L.marker([51.505, -0.09], {
  //         icon: L.icon({
  //           iconUrl: './image/leaf-orange.png',
  //           iconSize: [40, 80],
  //         }),
  //       }).addTo(map);

  //       createdMarker.on('click', () => {
  //         const currentAngle = createdMarker.getRotationAngle() ||0;
  //         createdMarker.setRotationAngle(currentAngle + 180);
  //       });
  //     }
  //   }, [marker, map]);

  return <></>;
}
