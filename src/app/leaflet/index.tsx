import dynamic from 'next/dynamic';

const Map = dynamic(() => import('./page'), {
  ssr: false,
});
// let totalDistance = 0;

// // Iterate over the points in the polygon
// polygon.forEach((point, i) => {
//   if (point instanceof L.LatLng) {
//     if (i < polygon.length - 1) {
//       const pointA = polygon[i];
//       const pointB = polygon[i + 1];
//       console.log('Calculating distance between', pointA, 'and', pointB);

//       // Calculate the distance between consecutive points
//       totalDistance += pointA.distanceTo(pointB);
//     }
//   }
// });
// map.on('pm:create', (e) => {
//   const layer = e.layer; // Шинэ үүсгэсэн layer
//   if (layer instanceof L.Polygon || layer instanceof L.Polyline) {
//     // Шинэ объект нь полигон эсвэл шугам бол шалгах
//     const lanlng = layer.getLatLngs(); // Тухайн layer-ийн координатуудыг авах
//     if (lanlng && lanlng.length > 0 && Array.isArray(lanlng[0])) {
//       // Хэрэв координат байна уу
//       const coordinatesList = lanlng
//         .map((polygon, index) => {
//           if (Array.isArray(polygon)) {
//             // Хэрэв энэ нь полигон бол
//             return polygon
//               .map((point) => {
//                 if (point instanceof L.LatLng) {
//                   // Лат/лон координат объект бол
//                   return `Polygon ${index + 1}: (${point.lat.toFixed(
//                     2
//                   )}, ${point.lng.toFixed(2)})`; // Координат хэвлэх
//                 }
//                 return '';
//               })
//               .join('<br>'); // Тухайн полигон дахь бүх цэгүүдийг <br> ашиглан нэгтгэх
//           } else {
//             return `Polygon ${index + 1}: (${polygon.lat.toFixed(2)})`; // Гадуур байх үед цэгийн координатыг хэвлэх
//           }
//         })
//         .join('<br>'); // Бүх полигонуудад тусгай <br> тэмдэг нэмэх

//       console.log('latlng', lanlng); // Консол дээр координатуудыг харуулах
//       const popupContent = `<b>Координат:</b><br>${coordinatesList}`; // Popup-ийн агуулга

//       layer.bindPopup(popupContent).openPopup(); // Полигон эсвэл шугам дээр popup нэмэх
//     }
//   }
// });

// ('use client');

// import { useEffect } from 'react';
// import * as L from 'leaflet';
// import 'leaflet/dist/leaflet.css';
// import '@geoman-io/leaflet-geoman-free';
// import '@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css';
// import { Box } from '@mui/material';

// export function LeafletComponenet1() {
//   useEffect(() => {
//     if (typeof window !== 'undefined') {
//       const map = L.map('map').setView([51.505, -0.09], 13);
//       L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(
//         map
//       );

//       if (map.pm) {
//         map.pm.addControls();
//         map.pm.enableDraw('Polygon', {
//           snappable: true,
//           snapDistance: 20,
//         });
//       } else {
//         console.error('Geoman нь ачаалагдаагүй байна');
//       }

//       map.on('pm:create', (e) => {
//         const layer = e.layer;

//         if (layer instanceof L.Polygon || layer instanceof L.Polyline) {
//           const latlngs = layer.getLatLngs();

//           // Polyline болон Polygon-т зориулсан процесс
//           if (Array.isArray(latlngs)) {
//             const coordinatesList = Array.isArray(latlngs[0])
//               ? // Polygon: 2D массив
//                 latlngs
//                   .map((polygon, index) => {
//                     if (Array.isArray(polygon)) {
//                       return polygon
//                         .map((point) => {
//                           if (point instanceof L.LatLng) {
//                             return `Polygon ${index + 1}: (${point.lat.toFixed(
//                               2
//                             )}, ${point.lng.toFixed(2)})`;
//                           }
//                           return '';
//                         })
//                         .join('<br>');
//                     }
//                     return '';
//                   })
//                   .join('<br>')
//               : // Polyline: 1D массив
//                 latlngs
//                   .map((point, index) => {
//                     if (point instanceof L.LatLng) {
//                       return `Point ${index + 1}: (${point.lat.toFixed(
//                         2
//                       )}, ${point.lng.toFixed(2)})`;
//                     }
//                     return '';
//                   })
//                   .join('<br>');

//             const popupContent = `<b>Координат:</b><br>${coordinatesList}`;
//             layer.bindPopup(popupContent).openPopup();
//           }
//         } else if (layer instanceof L.Rectangle) {
//           // Rectangle-ийн хувьд LatLngBounds ашиглана
//           const bounds = layer.getBounds();
//           const corner1 = bounds.getSouthWest();
//           const corner2 = bounds.getNorthEast();
//           const coordinatesList = `Rectangle: (${corner1.lat.toFixed(
//             2
//           )}, ${corner1.lng.toFixed(2)}) to (${corner2.lat.toFixed(
//             2
//           )}, ${corner2.lng.toFixed(2)})`;

//           const popupContent = `<b>Координат:</b><br>${coordinatesList}`;
//           layer.bindPopup(popupContent).openPopup();
//         } else if (layer instanceof L.Circle) {
//           // Circle-ийн хувьд center болон радиус ашиглана
//           const center = layer.getLatLng();
//           const radius = layer.getRadius();
//           const coordinatesList = `Circle: Center: (
//           ${center.lat.toFixed(2)},
//           ${center.lng.toFixed(2)})
//           Radius: ${radius.toFixed(2)} meters`;

//           const popupContent = `<b>Координат:</b><br>${coordinatesList}`;
//           layer.bindPopup(popupContent).openPopup();
//         } else if (layer instanceof L.Marker) {
//           // Marker-ийн хувьд center (lat, lng) мэдээлэл
//           const latlng = layer.getLatLng();
//           const coordinatesList = `Marker: (${latlng.lat.toFixed(
//             2
//           )}, ${latlng.lng.toFixed(2)})`;

//           const popupContent = `<b>Координат:</b><br>${coordinatesList}`;
//           layer.bindPopup(popupContent).openPopup();
//         } else {
//           console.error(
//             'Тэмдэглэл хийхэд ашиглаж байгаа layer нь буруу төрөлтэй байна'
//           );
//         }
//       });

//       return () => {
//         map.remove();
//       };
//     }
//   }, []);

//   return <Box id="map" sx={{ height: '100vh', width: '100%' }}></Box>;
// }
