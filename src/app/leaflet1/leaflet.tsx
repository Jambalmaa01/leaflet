'use client';
import {
  Box,
  Button,
  MenuItem,
  Select,
  TextField,
  Toolbar,
} from '@mui/material';
import {
  LatLngBoundsExpression,
  LatLngExpression,
  LatLngLiteral,
} from 'leaflet';
import {
  MapContainer,
  Popup,
  TileLayer,
  Marker,
  LayerGroup,
  Circle,
  FeatureGroup,
  Rectangle,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import { PointComponent } from './point';
import { TestComponent } from './test';
import { PolygonComponent } from './polygon';
import { LineComponent } from './line';
import { LayerController } from './layerController';
// import { RotateComponent } from './rotate';
import { MarkerComponent } from '../marker';
import { LayersControl } from 'react-leaflet';
import { LayerControl } from './layerControl';
const position: LatLngExpression = [51.505, -0.09];

export function Leaflet() {
  const rectangle: LatLngBoundsExpression = [
    [51.49, -0.08],
    [51.5, -0.06],
  ];
  const center: LatLngExpression = [51.505, -0.09];

  const [point, setPoint] = useState(false);
  const [polygon, setPolygon] = useState(false);
  const [polyline, setPolyline] = useState(false);
  const [marker, setMarker] = useState(false);
  const [rotationX, setRotationX] = useState(0);
  const [rotationY, setRotationY] = useState(0);
  function onPoint() {
    setPoint((point) => !point);
  }
  function onPolygon() {
    setPolygon((polygon) => !polygon);
  }
  function onLine() {
    setPolyline((polyline) => !polyline);
  }
  function onMarker() {
    setMarker((marker) => !marker);
  }
  function onX() {
    setRotationX((prev) => prev + 180); 
  }
  function onY() {
    setRotationY((prev) => prev + 180); 
  }

  return (
    <Box>
      <Toolbar>
        <Button onClick={onPoint} variant="contained">
          Point
        </Button>
        <Button onClick={onPolygon}>Polygon</Button>
        <Button onClick={onLine}>Line</Button>
        <Button variant="contained" onClick={onMarker}>
          marker
        </Button>
        {point && (
          <Toolbar>
            <Button onClick={onX}>X</Button>
            <Button  onClick={onY}>Y</Button>
          </Toolbar>
        )}
      </Toolbar>
      <MapContainer
        center={position}
        zoom={14}
        scrollWheelZoom={false}
        style={{ height: 'calc(100vh - 64px)', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <PointComponent 
        point={point} 
        rotationX={rotationX} rotationY={rotationY}
         />
        <PolygonComponent polygon={polygon} /> 
        <LineComponent polyline={polyline} />
        <MarkerComponent marker={marker} />
        <TestComponent />
        {/* <LayerController /> */}
        <LayerControl />
        {/* <LayersControl position="topright">
          <LayersControl.Overlay name="Marker">
            <Marker
              position={position}
              // icon={
              //   new Icon({
              //     iconUrl:'/image/marker-icon.png',
              //     iconSize: [25, 41],
              //     iconAnchor: [12, 41],
              //   })
              // }
            >
              <Popup>A pretty CSS3 popup. Easily customizable.</Popup>
            </Marker>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="later group with circleMarker">
            <LayerGroup>
              <Circle
                center={center}
                radius={200}
                pathOptions={{ fillColor: 'red' }}
              />
              <Circle
                center={[51.519, -0.09]}
                radius={300}
                pathOptions={{ fillColor: 'orange' }}
              />
              <Circle
                center={center}
                radius={100}
                pathOptions={{ fillColor: 'green' }}
                stroke={false}
              />
            </LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name=" feature group">
            <FeatureGroup>
              <Popup>popup in featreFroup</Popup>
              <Circle
                center={[51.505, -0.09]}
                radius={200}
                pathOptions={{ fillColor: 'red' }}
              />
              <Rectangle bounds={rectangle} />
            </FeatureGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="layer group">
            <LayerGroup>
              <Circle
                center={[51.505, -0.09]}
                radius={300}
                pathOptions={{ fillColor: 'red' }}
              />
              <Rectangle bounds={rectangle} />
            </LayerGroup>
          </LayersControl.Overlay>
        </LayersControl> */}
      </MapContainer>
    </Box>
  );
}
