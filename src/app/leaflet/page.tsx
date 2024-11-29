'use client';
import { TileLayer, Marker, Popup, MapContainer } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useState, useEffect } from 'react';
import { useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import RoomIcon from '@mui/icons-material/Room';
import ReactDOMServer from 'react-dom/server';
// import markerIcon from '../../../public/image/marker-icon.png';
// import markerShadow from './path/to/marker-shadow.png';

function LocationMarker() {
  const [position, setPosition] = useState<LatLngExpression | null>(null);
  useEffect(() => {
    if (typeof window !== 'undefined') {
    }
  }, []);
  // L.Icon.Default.mergeOptions({
  //   iconUrl: markerIcon,
  //   // shadowUrl: markerShadow,
  // });
  const createIconFromSvg = (SvgComponent: React.ElementType) => {
    // Convert the React component to static HTML markup
    const svgMarkup = ReactDOMServer.renderToStaticMarkup(
      <SvgComponent style={{ fontSize: '30px', color: 'red' }} />
    );

    // Create a Data URL from the static markup
    const svgDataUrl = `data:image/svg+xml;base64,${btoa(svgMarkup)}`;

    return svgDataUrl;
  };
  const customIconUrl = createIconFromSvg(RoomIcon);

  const customIcon = customIconUrl
    ? new L.Icon({
        iconUrl: customIconUrl,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        tooltipAnchor: [16, -28],
      })
    : undefined;

  const map = useMapEvents({
    click() {
      map.locate();
    },
    locationfound(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  return position === null ? null : (
    <Marker position={position} icon={customIcon}>
      <Popup>You are here</Popup>
    </Marker>
  );
}

export default function App() {
  return (
    <MapContainer
      center={{ lat: 51.505, lng: -0.09 }}
      zoom={13}
      scrollWheelZoom={false}
      style={{ height: '100vh' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationMarker />{' '}
    </MapContainer>
  );
}
