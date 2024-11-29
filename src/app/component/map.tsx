'use client';

import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect } from 'react';
const position: LatLngExpression = [51.505, -0.09];

const Map = () => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      console.log(position);
    }
  });
  return (
    <MapContainer
      center={position}
      zoom={13}
      scrollWheelZoom={false}
      style={{ height: '100vh', width: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {/* <Marker position={position}>
        <Popup>A pretty CSS3 popup. Easily customizable.</Popup>
      </Marker> */}
      <CircleMarker
        center={position}
        radius={20}
        color="transparent"
        fillColor="red"
        opacity={5}
      >
        <Popup>A pretty CSS3 popup. Easily customizable.</Popup>
      </CircleMarker>
    </MapContainer>
  );
};

export default Map;
