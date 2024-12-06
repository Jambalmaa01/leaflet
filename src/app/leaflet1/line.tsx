'use client';
import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import L, { Polyline } from 'leaflet';
export type LineComponemtProps = {
  polyline: boolean;
};
export function LineComponent(props: LineComponemtProps) {
  const { polyline } = props;
  const map = useMap();
  useEffect(() => {
    if (polyline) {
      L.polyline([
        [51.505, -0.09],
        [51.605, -0.19],
        [51.585, -0.29],
      ]).addTo(map);
    } else {
      map.eachLayer((layer) => {
        if (layer instanceof Polyline) {
          map.removeLayer(layer);
        }
      });
    }
  }, [polyline]);

  // useEffect(() => {
  //   if (polyline) {
  //     console.log('map', map.pm.Draw);
  //     map.pm.enableDraw('Line', {
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
  // }, [polyline]);

  return <></>;
}
