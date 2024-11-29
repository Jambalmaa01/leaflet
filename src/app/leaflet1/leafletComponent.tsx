'use client';
import { useEffect, useState } from 'react';
import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '@geoman-io/leaflet-geoman-free';
import '@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css';
import { Box } from '@mui/material';
export function LeafletComponent() {
  const [Polygon, setPolygon] = useState<L.Polygon | null>(null);

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
        console.error('Geoman is not loaded');
      }

      map.on('pm:create', (e) => {
        const layer = e.layer;
        if (layer instanceof L.Polygon) {
          const latlng = layer.getLatLngs();
          if (latlng && latlng.length > 0 && Array.isArray(latlng[0])) {
            const coordinatesList = latlng.map((polygon, index) => {
              if (Array.isArray(polygon)) {
                console.log('polygon', polygon);
                let totalDistance = 0;

                polygon.forEach((point, i) => {
                  if (point instanceof L.LatLng) {
                    if (i < polygon.length - 1) {
                      const pointA = polygon[i];
                      const pointB = polygon[i + 1];
                      console.log(
                        'Calculating distance between',
                        pointA
                        // 'and',
                        // pointB
                      );

                      // totalDistance += pointA.distanceTo(pointB);
                    }
                  }
                });

                // return polygon.map((point) => {
                //   if (point instanceof L.LatLng) {
                //     const latlng1 = point.lat;
                //     const lnglng1 = point.lng;
                //     console.log('latlng1', latlng1);
                //     let totalDistance = 0;
                //     for (let i = 0; i < latlng.length - 1; i++) {
                //       const pointA = latlng[i];
                //       const pointB = latlng[i + 1];
                //       console.log('latlng', pointA);

                //       // totalDistance += pointA.distanceTo(pointB);
                //       // console.log('totalDistance', totalDistance);
                //     }
                //   }
                // });
              }
            });
          }
        }
      });

      // const updateToolbar = () => {
      //   if (Polygon && Polygon instanceof L.Polygon) {
      //     const latlngs = Polygon.getLatLngs();
      //     // const area = L.GeometryUtil.geodesicArea(latlngs[0]);
      //     // const perimeter=Polygon.getPerimeter();
      //     const aria = Polygon.getArea();

      //     console.log('length', length);
      //     console.log('latlngs', latlngs);
      //   }
      // };
      // if (Polygon) {
      //   updateToolbar();
      // }
      // map.on('pm:create', (e) => {
      //   const drawPolygon = e.layer as L.Polygon;
      //   setPolygon(drawPolygon);

      //   const latlngs = drawPolygon.getLatLngs();
      //   let area = 0;
      //   const latlngsLength = latlngs.length;

      //   if (latlngsLength > 2) {
      //     for (let i = 0; i < latlngsLength - 1; i++) {
      //       area +=
      //         latlngs[i].lat * latlngs[i + 1].lng -
      //         latlngs[i].lng * latlngs[i + 1].lat;
      //     }
      //     area +=
      //       latlngs[latlngsLength - 1].lat * latlngs[0].lng -
      //       latlngs[latlngsLength - 1].lng * latlngs[0].lat;
      //     area = Math.abs(area / 2);
      //     console.log('Area:', area); // Талбайг хэвлэх
      //   }
      // });
      // map.on('pm:create', (e) => {
      //   const drawPolygon = e.layer as L.Polygon;
      //   setPolygon(drawPolygon);
      //   const layer = e.layer as L.Polygon;
      //   const latlngs = drawPolygon.getLatLngs();
      //   let area = 0;
      //   if (Array.isArray(latlngs)) {
      //     const latlngArray =
      //       latlngs[0] instanceof L.LatLng ? latlngs : latlngs[0];
      //     const latlngsLength = latlngArray.length;

      //     if (latlngsLength > 2) {
      //       for (let i = 0; i < latlngsLength - 1; i++) {
      //         area +=
      //           latlngArray[i].lat * latlngArray[i + 1].lng -
      //           latlngArray[i].lng * latlngArray[i + 1].lat;
      //       }
      //       area +=
      //         latlngArray[latlngsLength - 1].lat * latlngArray[0].lng -
      //         latlngArray[latlngsLength - 1].lng * latlngArray[0].lat;
      //       area = Math.abs(area / 2);

      //       console.log('Area:', area);
      //       console.log('latlngArray', latlngArray);
      //       console.log('latlngsLength', latlngsLength);
      //       const popupContent = `
      //          <b>Area:</b> ${area}
      //          <br>
      //          <b>
      //          latlngLengthД:</b> ${latlngsLength} </b>
      //        `;
      //       layer.on('mouseover', () => {
      //         layer.bindPopup(popupContent).openPopup();
      //       });

      //       layer.on('mouseout', () => {
      //         layer.closePopup();
      //       });
      //     }
      //   }
      // });
      return () => {
        map.remove();
      };
    }
  }, []);

  //   useEffect(() => {
  //     const map = L.map('map').setView([51.505, -0.09], 13);
  // L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(
  //   map
  // );
  // map.pm.addControls();
  // L.marker([51.50915, -0.096112], { pmIgnore: true }).addTo(map);
  // enable Drag Mode like this:

  // map.pm.enableDraw('Polygon', {
  //   snappable: true,
  //   snapDistance: 5,
  // });

  // map.pm.disableDraw();
  // map.on('pm:drawstart', (e) => {
  //   console.log('polygom', e);
  // });
  // map.pm.enableGlobalDragMode();
  // // layer.pm.enableLayerDrag();
  // map.on('pm:globaldragmodetoggled', (e) => {
  //   console.log(e);
  // });
  // map.pm.enableGlobalDragMode();

  // enable cutting mode
  // map.pm.enableGlobalCutMode({
  //   allowSelfIntersection: false,
  // });

  //     return () => {
  //       map.remove();
  //     };
  //   });

  return <Box id="map" sx={{ height: '100vh', width: '100%' }}></Box>;
}
