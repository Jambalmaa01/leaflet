'use client';
import { useEffect } from 'react';
import L, { Polygon } from 'leaflet';
import { useMap } from 'react-leaflet';
import { LatLngLiteral } from 'leaflet';
import 'leaflet/dist/leaflet.css';
export type PolygonProps = {
  polygon: boolean;
};

export function PolygonComponent(props: PolygonProps) {
  const { polygon } = props;
  const polygonpoint: LatLngLiteral[] = [
    {
      lat: 51.505,
      lng: -0.09,
    },
    {
      lat: 51.605,
      lng: -0.19,
    },
    {
      lat: 51.505,
      lng: -0.29,
    },
    {
      lat: 51.702,
      lng: -0.39,
    },
  ];
  const map = useMap();
  useEffect(() => {
    if (polygon) {
      const polygon = L.polygon(polygonpoint).addTo(map);

      // polygon.on('click', () => {
      //   const polygonElement = polygon.getElement();
      //   if (polygonElement instanceof HTMLElement) {
      //     polygonElement.style.transition = 'transform 5s';
      //     polygonElement.style.transform = 'rotateY(180deg)';
      //   }
      // });
    } else {
      map.eachLayer((layer) => {
        if (layer instanceof Polygon) {
          map.removeLayer(layer);
        }
      });
    }
  }, [polygon, map]);

  // useEffect(() => {
  //   if (polygon) {
  //     map.pm.enableDraw('Polygon', {
  //       snappable: true,
  //       snapDistance: 20,
  //     });
  //     map.on('pm:create', (e) => {
  //       const layer = e.layer;
  //       if (layer instanceof L.Polygon) {
  //         const layer = e.layer as L.Polygon;
  //         const lanlng = layer.getLatLngs();
  //         if (lanlng && lanlng.length > 0 && Array.isArray(lanlng[0])) {
  //           const coordinatesList = lanlng
  //             .map((polygon, index) => {
  //               if (Array.isArray(polygon)) {
  //                 return polygon
  //                   .map((point) => {
  //                     if (point instanceof L.LatLng) {
  //                       return `Polygon ${index + 1}: (${point.lat.toFixed(
  //                         2
  //                       )}, ${point.lng.toFixed(2)})`;
  //                     }
  //                     return '';
  //                   })
  //                   .join('<br>');
  //               } else {
  //                 return `Polygon ${index + 1}: (${polygon.lat.toFixed(2)})`;
  //               }
  //             })
  //             .join('<br>');
  //           const popupContent = `<b>Координат:</b><br>${coordinatesList}`;
  //           layer.bindPopup(popupContent).openPopup();
  //         }
  //       }
  //       // map.pm.enableGlobalRemovalMode();
  //       map.pm.enableGlobalCutMode({
  //         allowSelfIntersection: false,
  //       });
  //     });
  //   } else {
  //     map.pm.disableDraw();
  //   }
  // }, [polygon]);

  return <></>;
}
