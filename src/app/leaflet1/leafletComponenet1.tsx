'use client';

import { useEffect, useState } from 'react';
import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '@geoman-io/leaflet-geoman-free';
import '@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css';
import { Box } from '@mui/material';
// import 'leaflet-geometryutil';

// declare module 'leaflet' {
//   namespace GeometryUtil {
//     function geodesicArea(latlngs: L.LatLng[]): number;
//   }
// }

export function LeafletComponenet1() {
  // const [polygon, setPolygon] = useState<L.Polygon | null>(null);
  // const [tooltip, setTooltip] = useState<L.Tooltip | null>(null);

  // useEffect(() => {
  //   if (typeof window !== 'undefined') {
  //     const map = L.map('map').setView([51.505, -0.09], 13);
  //     L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(
  //       map
  //     );

  //     if (map.pm) {
  //       map.pm.addControls();
  //       map.pm.enableDraw('Polygon', {
  //         snappable: true,
  //         snapDistance: 20,
  //       });
  //     } else {
  //       console.error('Geoman нь ачаалагдаагүй байна');
  //     }

  //     //     map.on('pm:create', (e: any) => {
  //     //       const drawPolygon = e.layer as L.Polygon;
  //     //       setPolygon(drawPolygon);

  //     //       const latlngs = drawPolygon.getLatLngs();
  //     //       const flatLatLngs = latlngs.flat(2);

  //     //       if (L && L.GeometryUtil && L.GeometryUtil.geodesicArea) {
  //     //         const area = L.GeometryUtil.geodesicArea(flatLatLngs);
  //     //         const areaText = `Талбай: ${area.toFixed(2)} м²`;

  //     //         drawPolygon
  //     //           .bindTooltip(areaText, {
  //     //             permanent: true,
  //     //             direction: 'top',
  //     //             className: 'leaflet-tooltip',
  //     //           })
  //     //           .openTooltip();

  //     //         drawPolygon.on('mouseover', () => {
  //     //           const area = L.GeometryUtil.geodesicArea(flatLatLngs);
  //     //           const areaText = `Талбай: ${area.toFixed(2)} м²`;
  //     //           drawPolygon.bindTooltip(areaText).openTooltip();
  //     //         });

  //     //         drawPolygon.on('mouseout', () => {
  //     //           drawPolygon.closeTooltip();
  //     //         });
  //     //       } else {
  //     //         console.error('L.GeometryUtil нь байхгүй байна');
  //     //       }
  //     //     });

  //     return () => {
  //       map.remove();
  //     };
  //   }
  // }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const map = L.map('map').setView([51.505, -0.09], 13);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(
        map
      );
      if (map.pm) {
        map.pm.addControls();
        map.pm.enableDraw('Polygon', {
          snappable: true,
          snapDistance: 20,
        });
      } else {
        console.error('Geoman ');
      }

      map.on('pm:create', (e) => {
        const layer = e.layer;
        if (layer instanceof L.Polygon || layer instanceof L.Polyline) {
          //instanceof удамшиж байгаа эсэхийг шаалтана
          const lanlng = layer.getLatLngs(); //координатыг авах

          if (lanlng && lanlng.length > 0 && Array.isArray(lanlng[0])) {
            const coordinatesList = lanlng
              .map((polygon, index) => {
                if (Array.isArray(polygon)) {
                  return polygon
                    .map((point) => {
                      if (point instanceof L.LatLng) {
                        return `Polygon ${index + 1}: (${point.lat.toFixed(
                          2
                        )}, ${point.lng.toFixed(2)})`; // координатыг 2 оронтой харуулна
                      }

                      return '';
                    })
                    .join('<br>'); //string ийг массив руу хөрвүүлэх
                } else {
                  return `Polygon ${index + 1}: (${polygon.lat.toFixed(5)})`;
                }
              })
              .join('<br>');

            console.log('latlng', lanlng);
            const popupContent = `<b>Координат:</b><br>${coordinatesList}`;

            layer.bindPopup(popupContent).openPopup();
          }
        } else if (layer instanceof L.Rectangle) {
          const bounds = layer.getBounds();
          const conner1 = bounds.getSouthWest();
          const conner2 = bounds.getNorthEast();
          const coordinatesList = `Rectangle: (
           ${conner1.lat.toFixed(2)},
           ${conner1.lng.toFixed(2)}, to
           ${conner2.lat.toFixed(2)},
           ${conner2.lng.toFixed(2)}
           )`;
          const popupContent = `<b>Координат:</b><br>${coordinatesList}`;
          layer.bindPopup(popupContent).openPopup();
        } else if (layer instanceof L.Circle) {
          const center = layer.getLatLng();
          const raduis = layer.getRadius();
          const coordinatesList = `Circle:(
          ${center.lat.toFixed(2)},
          ${center.lng.toFixed(2)},
          ${raduis.toFixed(2)} meter )`;
          const popupContent = ` <b>Координат:</b> <br> ${coordinatesList} `;
          layer.bindPopup(popupContent).openPopup();
        } else if (layer instanceof L.Marker) {
          const latlng = layer.getLatLng();
          const coordinatesList = `Marker: (${latlng.lat.toFixed(
            2
          )}, ${latlng.lng.toFixed(2)})`;
          const popupContent = `<b>Координат:</b> <br> ${coordinatesList} </b>`;
          layer.bindPopup(popupContent).openPopup();
        } else if (layer instanceof L.CircleMarker) {
          const latIng = layer.getLatLng();
          const radius = layer.getRadius();
          const coordinatesList = `CircleMarker: <br> (x: ${latIng.lat.toFixed(
            2
          )}, <br> y: ${latIng.lng.toFixed(2)} , <br> radius: ${radius.toFixed(
            2
          )} ) `;
          const popupContent = `<b>Координат:</b> <br> ${coordinatesList} </b>`;
          layer.bindPopup(popupContent).openPopup();
        } else {
          console.error('layer нь байхгүй байна');
        }
        map.pm.enableGlobalRemovalMode(); // устгах үйлдлийг маф руу шилжүүлэх
      });

      return () => {
        map.remove();
      };
    }
  }, []);

  return <Box id="map" sx={{ height: '100vh', width: '100%' }}></Box>;
}
