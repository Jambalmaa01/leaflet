'use client';
import L, { Marker, MarkerOptions } from 'leaflet';
import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import 'leaflet-rotatedmarker';
import 'leaflet/dist/leaflet.css';
export type PointComponentProps = {
  point: boolean;
};

export function PointComponent(props: PointComponentProps) {
  const map = useMap();
  const { point } = props;
  const poinst: [number, number][] = [
    [51.505, -0.09],
    [51.605, -0.19],
    [51.508, -0.29],
    [51.702, -0.39],
  ];
  useEffect(() => {
    if (point) {
      const marker = L.marker([51.505, -0.09], {
        icon: new L.Icon({
          iconUrl: '/image/leaf-orange.png',
          iconSize: [45, 81],
          iconAnchor: [12, 41],
          className: 'flipped-icon',
        }),
      }).addTo(map);

      marker.on('click', () => {
        const markerElement = marker.getElement();
        if (markerElement) {
          // markerElement.classList.toggle('flipped-icon');
          markerElement.style.transition = 'transform 1s';
          markerElement.style.transform = 'rotateX(180deg)';
          // const currentLatLng = marker.getLatLng();
          // marker.setLatLng(currentLatLng);
        }
      });
    }
  });

  // useEffect(() => {
  //   if (point) {
  //     poinst.map((coord) =>
  //       coord.forEach((lat, lng) => {
  //         L.marker([lat, lng], {
  //           icon: new L.Icon({
  //             iconUrl: '/image/leaf-orange.png',
  //             iconSize: [25, 41],
  //             iconAnchor: [12, 41],
  //           }),
  //         }).addTo(map);
  //       })
  //     );
  //   } else {
  //     map.eachLayer((layer) => {
  //       if (layer instanceof Marker) {
  //         map.removeLayer(layer);
  //       }
  //     });
  //   }
  // }, [point]);

  // useEffect(() => {
  //   if (point) {
  //     map.pm.enableDraw('Marker', {
  //       snappable: true,
  //       snapDistance: 20,
  //     });

  //     map.on('pm:create', (e) => {
  //       const { layer } = e;
  //       layer.on('click', () => {
  //         map.removeLayer(layer);
  //       });
  //     });
  //   } else {
  //     map.pm.disableDraw();
  //   }
  // }, [point]);

  // useEffect(() => {
  // var markerOptions = {
  //   draggable: true,
  //   rotationAngle: 50,
  // };
  // map.on('click', (e) => {
  //   var marker = L.marker([e.latlng.lat, e.latlng.lng], {
  //     icon: new L.Icon({
  //       iconUrl: '/image/leaf-orange.png',
  //       iconSize: [45, 81],
  //       iconAnchor: [12, 41],
  //     }),
  //   }).addTo(map);
  //   marker;
  // });
  // const customMarker = L.marker([e.latlng.lat, e.latlng.lng], {
  //   icon: new L.Icon({
  //     iconUrl: '/image/leaf-orange.png',
  //     iconSize: [45, 81],
  //     iconAnchor: [12, 41],
  //   }),
  // }).addTo(map);
  // customMarker.setRotationAngle(90);
  //   function rotateMarker(angle) {
  //     customMarker.setRotationAngle(angle);  // Эргүүлэх
  // }
  // // 90 градус эргүүлэх
  // rotateMarker(90);
  // });
  // });

  return <></>;
}
