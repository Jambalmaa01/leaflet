'use client';

import {
  MapContainer,
  TileLayer,
  SVGOverlay,
  Marker,
  Tooltip,
  Polygon,
  Circle,
  Rectangle,
} from 'react-leaflet';
import { useState, useEffect } from 'react';
import {
  LatLngExpression,
  Icon,
  LatLngBoundsExpression,
  LatLng,
  LatLngLiteral,
  marker,
} from 'leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Box, Button, TextField, Toolbar } from '@mui/material';
import { LeafletComponent } from '../leaflet1/leafletComponent';
import { TestComponent } from '../../components/TestComponent';
import { LeafletComponenet1 } from '../leaflet1/leafletComponenet1';
const position: LatLngExpression = [51.505, -0.09];
const boundArray: [number, number][][] = [
  [
    [51.505, -0.09],
    [51.515, -0.1],
  ],
];

const Map = () => {
  const points: [number, number][] = [
    [51.505, -0.09],
    [51.515, -0.1],
    [50.674, -2.674],
    [51.174, -3.674],
    [47.674, -5.674],
  ];
  const polygon: LatLngLiteral[] = [
    {
      lat: 51.505,
      lng: -0.09,
    },
    {
      lat: 51.515,
      lng: -0.1,
    },
    {
      lat: 50.674,
      lng: -2.674,
    },
    {
      lat: 51.174,
      lng: -3.674,
    },
    {
      lat: 47.674,
      lng: -4.674,
    },
  ];
  const rectangle: LatLngBoundsExpression = [
    [51.49, -0.08],
    [51.5, -0.06],
  ];

  const [coordinat, setCoordinates] = useState<[number, number][]>([]);
  const [show, setShow] = useState(false);
  const bounds = boundArray[0];
  const buttonPoint = () => {
    if (coordinat.length > 0) {
      setCoordinates([]);
    } else {
      setCoordinates(points);
      console.log('coordinat', coordinat);
    }

    //   const point = marker([51.505, -0.09], {
    //     icon: new Icon({
    //       iconUrl: '/image/leaf-orange.png',
    //       iconSize: [25, 41],
    //       iconAnchor: [12, 41],
    //     }),
    //   });
    //   console.log('point', point);
  };
  const buttonPolygon = () => {
    setShow(!show);

    const point = marker([1, 1], {
      icon: new Icon({
        iconUrl: '/image/marker-icon.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
      }),
    });
  };

  return (
    <Box sx={{ height: '100vh', width: '100%' }}>
      <Toolbar>
        <Button onClick={buttonPoint}>Point</Button>
        <Button onClick={buttonPolygon}>Polygon</Button>
      </Toolbar>
      <MapContainer
        center={position}
        zoom={13}
        scrollWheelZoom={false}
        style={{ height: 'calc(100vh - 64px)', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <SVGOverlay attributes={{ stroke: 'red' }} bounds={bounds}>
          <rect x="0" y="0" width="100%" height="100%" fill="yellow" />
          <circle cx="50%" cy="50%" r="50" fill="red" />
          <text x="50%" y="50%" stroke="purple">
            text
          </text>
        </SVGOverlay>
        {coordinat.map((coord, index) => (
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
              Latitude: {coord[0]}, Longitude: {coord[1]}
            </Tooltip>
          </Marker>
        ))}
        {show && <Polygon positions={polygon} />}
        <Circle center={position} pathOptions={{ color: 'red' }} radius={200} />
        <Rectangle bounds={rectangle} pathOptions={{ color: 'red' }} />
        {/* <LeafletComponent /> */}
        {/* <LeafletComponenet1 /> */}
        {/* <TestComponent /> */}
      </MapContainer>
    </Box>
  );
};

export default Map;
