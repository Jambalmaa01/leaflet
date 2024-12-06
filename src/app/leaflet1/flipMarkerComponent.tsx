// import { useEffect } from 'react';
// import 'leaflet/dist/leaflet.css';
// import 'leaflet-rotatedmarker'; // Ensure the plugin is loaded
// import L from 'leaflet';
// import { useMap } from 'react-leaflet';

// export type FlipMarkerComponentProps = { point: boolean };

// export function FlipMarkerComponent(props: FlipMarkerComponentProps) {
//   const { point } = props;
//   const map = useMap();

//   useEffect(() => {
//     if (point) {
//       // Use L.rotatedMarker instead of L.marker
//       const rotatedMarker = L.marker([51.505, -0.09], {
//         icon: new L.Icon({
//           iconUrl: '/image/leaf-orange.png',
//           iconSize: [45, 81],
//           iconAnchor: [12, 41],
//         }),
//         // rotationAngle: 45, // Initial rotation angle
//       }).addTo(map);

//       // Attach an event listener to rotate the marker
//       rotatedMarker.on('click', () => {
//         const currentAngle = rotatedMarker.getRotationAngle(); // Get current rotation angle
//         rotatedMarker.setRotationAngle(currentAngle + 45); // Rotate by 45 degrees
//       });
//     }
//   }, [point, map]);

//   return <></>;
// }

import { useEffect, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import 'leaflet-rotatedmarker';
import L from 'leaflet';
export type FlipMarkerComponentProps = {
  marker: boolean;
};
export function FlipMarkerComponent(props: FlipMarkerComponentProps) {
  const [map, setMap] = useState(null);
  const { marker } = props;

  useEffect(() => {
    if (marker) {
      const L = require('leaflet');
      const mapInstance = L.map('map').setView([47.918873, 106.917748], 13);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
      }).addTo(mapInstance);

      const marker = L.marker([51.505, -0.09]).addTo();

      marker.setRotationAngle(45);
      marker.on('click', () => {
        const currentAngle = marker.getRotationAngle();
        marker.setRotationAngle(currentAngle + 45);
      });

      setMap(mapInstance);
    }
  }, []);

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <div id="map" style={{ height: '100%', width: '100%' }}></div>
    </div>
  );
}
