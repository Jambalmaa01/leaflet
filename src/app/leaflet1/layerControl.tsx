'use client';
import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';

export function LayerControl() {
  const map = useMap();
  useEffect(() => {
    if (!map) return;
    const littleton = L.marker([51.505, -0.09]).bindPopup('ene bol Littleton'),
      denver = L.marker([51.505, -0.08]).bindPopup('ene bol denver'),
      golden = L.marker([51.505, -0.91]).bindPopup('This is Golden, CO.');
    const cite = L.layerGroup([littleton, denver, golden]);
    const osm = L.tileLayer('https://.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap',
    });

    const osmHOT = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 19,
        attribution:
          '© OpenStreetMap contributors, Tiles style by Humanitarian OpenStreetMap Team hosted by France',
      }
    );
    const baseMaps = {
      OpenStreetMap: osm,
      'OpenStreetMap.HOT': osmHOT,
    };
    const overlayMaps = {
      Cities: cite,
    };
    const layerControl = L.control.layers(baseMaps, overlayMaps).addTo(map);
    const crownHill = L.marker([51.505, -0.09]).bindPopup('ene bol crownHill');
    const rubyHill = L.marker([51.505, -0.09]).bindPopup('ene bol rubyHill');
    const park = L.layerGroup([crownHill, rubyHill]);
    const openMap = L.tileLayer(
      'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 19,
        attribution:
          'Map data:© OpenStreetMap contributors, SRTM | Map style: © OpenTopoMap (CC-BY-SA)',
      }
    );
    layerControl.addBaseLayer(openMap, 'openMap');
    layerControl.addOverlay(park, 'park');
    return () => {
      map.removeControl(layerControl);
      Object.values(baseMaps).forEach((layer) => map.removeLayer(layer));
    };
  });
  return <></>;
}
