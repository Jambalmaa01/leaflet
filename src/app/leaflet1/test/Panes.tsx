'use client';
import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';

export function Panes() {
  const map = useMap();
  useEffect(() => {
    if (!map) return; // Ensure that map is defined before accessing its methods.

    map.createPane('labels');
    map.getPane('labels')?.style.setProperty('zIndex', '650');
    map.getPane('labels')?.style.setProperty('pointerEvents', 'none');

    const positron = L.tileLayer(
      'https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png',
      {
        attribution: '©OpenStreetMap, ©CartoDB',
      }
    ).addTo(map);

    const positronLabels = L.tileLayer(
      'https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}.png',
      {
        attribution: '©OpenStreetMap, ©CartoDB',
        pane: 'labels',
      }
    ).addTo(map);

    const geojson = L.geoJson(GeoJsonData, geoJsonOptions).addTo(map);
    geojson.eachLayer(function (layer) {
      layer.bindPopup(layer.feature.properties.name);
    });

    map.fitBounds(geojson.getBounds());
  }, [map]);
  return <></>;
}
