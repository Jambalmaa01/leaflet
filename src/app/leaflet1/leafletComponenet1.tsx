'use client';

import { useEffect, useState } from 'react';
import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '@geoman-io/leaflet-geoman-free';
import '@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css';
import { Box, Button, Toolbar } from '@mui/material';
import { LatLngExpression, LatLngBoundsExpression } from 'leaflet';
import { text } from 'stream/consumers';
const position: LatLngExpression = [51.505, -0.09];
type ACTION_NAMES = 'cancel' | 'save' | 'edit';
type Action = {
  text: string;
  title?: string;
  onclick?: () => void;
};
// const actions: (L.PM.ACTION_NAMES | L.PM.Action)[] = [
//   'cancel',
//   {
//     text: 'Click Me',
//     onclick: () => {
//       console.log('Clicked');
//       alert('You clicked the custom button!');
//     },
//   },
// ];
export function LeafletComponenet1() {
  const point: [number, number][] = [
    [51.505, -0.09],
    [51.515, -0.1],
    [63.674, -49.674],
    [42.674, -49.674],
    [35.674, -49.674],
  ];
  const rectangle: LatLngBoundsExpression = [
    [51.49, -0.08],
    [51.5, -0.06],
  ];
  const [points, setPoints] = useState<[number, number][]>([]);
  // const [map, setMap] = useState<L.Map | null>(null);

  const actions: (ACTION_NAMES | Action)[] = [
    'cancel',
    'edit',

    {
      text: 'Display text on hover button',
      title: 'Display text on hover button',
      onclick: () => {
        console.log('click');
        alert('click');
      },
    },
  ];

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const map = L.map('map').setView([51.505, -0.09], 13);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(
        map
      );
      map.pm.addControls({
        position: 'topleft',
        drawControls: false,
        editControls: true,
        optionsControls: true,
        customControls: true,
        oneBlock: false,
      });

      const circle = L.circle([51.505, -0.09], {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: 500,
      }).addTo(map);
      circle.bindPopup('I am a circle.');
      map.pm.addControls({
        drawControls: true,
        editControls: false,
        optionsControls: true,
        customControls: true,
        oneBlock: false,
      });
      const marker = L.marker([51.505, -0.09], {
        icon: new L.Icon({
          iconUrl: '/image/leaf-orange.png',
          iconSize: [25, 41],
          iconAnchor: [12, 41],
        }),
      }).addTo(map);
      marker.bindPopup('I am a marker.').openPopup();

      // map.pm.Toolbar.copyDrawControl('draw-polygon', {
      //   name: 'CustomControl',
      //   block: 'custom',
      //   title: 'Custom Control Title',
      //   actions: actions,
      // });
      // map.pm.Toolbar.changeActionsOfControl("Rectangle", actions);

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
      map.pm.enableGlobalRemovalMode(); // устгах үйлдлийг маф руу шилжүүлэх

      return () => {
        map.remove();
      };
    }
  }, []);
  // const handlePoint = () => {
  //   if (map) {
  //     // Create a marker
  //     const marker = L.marker([51.505, -0.09], {
  //       icon: new L.Icon({
  //         iconUrl: '/image/leaf-orange.png',
  //         iconSize: [25, 41],
  //         iconAnchor: [12, 41],
  //       }),
  //     });

  //     // Add the marker to the map
  //     marker.addTo(map);

  //     // Bind popup to the marker
  //     marker
  //       .bindPopup('A pretty CSS3 popup. <br /> Easily customizable.')
  //       .openPopup();
  //   } else {
  //     console.log('Map is not initialized');
  //   }
  // };

  // const handlePoint = () => {
  //   const marker = L.marker([51.505, -0.09], {
  //     icon: new L.Icon({
  //       iconUrl: '/image/leaf-orange.png',
  //       iconSize: [25, 41],
  //       iconAnchor: [12, 41],
  //     }),
  //   });
  //   console.log('marker', marker);
  //   marker.bindPopup('A pretty CSS3 popup. <br /> Easily customizable.');
  // };

  return (
    <Box>
      {/* <Toolbar>
        <Button onClick={handlePoint}>Point</Button>
      </Toolbar> */}
      <Box sx={{ height: '100vh', width: '100%' }} id="map"></Box>
    </Box>
  );
}
