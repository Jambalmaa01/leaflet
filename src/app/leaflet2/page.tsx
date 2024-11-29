'use client';

import {
  MapContainer,
  TileLayer,
  SVGOverlay,
  Marker,
  Tooltip,
  useMapEvents,
} from 'react-leaflet';
import { useState } from 'react';
import { LatLngExpression, Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Box, Button, TextField } from '@mui/material';
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
const points: [number, number][] = [
  [51.505, -0.09],
  [51.515, -0.1],
  [63.674, -49.674],
  [42.674, -49.674],
  [35.674, -49.674],
];
// const [coordinat, setCoordinates] = useState<[number, number][]>([]);
const Map = () => {
  const bounds = boundArray[0];

  const ButtonPoint = () => {
    console.log('lll', points);
    // setCoordinates(points);
  };
  return (
    <Box sx={{ height: '100vh', width: '100%' }}>
      <Button onClick={ButtonPoint}>Point</Button>
      <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
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

        {/* {coordinates.length > 0 &&
          coordinates.map((coord, index) => (
            <Marker key={index} position={coord}>
              <Tooltip>
                Latitude: {coord[0]}, Longitude: {coord[1]}
              </Tooltip>
            </Marker>
          ))} */}
        {/* <LeafletComponent /> */}
        <LeafletComponenet1 />
        {/* <TestComponent /> */}
      </MapContainer>
    </Box>
  );
};

export default Map;
