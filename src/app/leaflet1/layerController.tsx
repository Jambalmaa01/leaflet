'use client';
import { Button, Box } from '@mui/material';
import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import LayersIcon from '@mui/icons-material/Layers';
import L from 'leaflet';

export function LayerController() {
  const map = useMap();
  // useEffect(() => {
  //   if (!map) return;
  //   var basemaps = {
  //     Topography: L.tileLayer.wms('http://ows.mundialis.de/services/service?', {
  //       layers: 'TOPO-WMS',
  //     }),

  //     Places: L.tileLayer.wms('http://ows.mundialis.de/services/service?', {
  //       layers: 'OSM-Overlay-WMS',
  //     }),

  //     'Topography, then places': L.tileLayer.wms(
  //       'http://ows.mundialis.de/services/service?',
  //       {
  //         layers: 'TOPO-WMS,OSM-Overlay-WMS',
  //       }
  //     ),

  //     'Places, then topography': L.tileLayer.wms(
  //       'http://ows.mundialis.de/services/service?',
  //       {
  //         layers: 'OSM-Overlay-WMS,TOPO-WMS',
  //       }
  //     ),
  //   };

  //   const layerControl = L.control.layers(basemaps).addTo(map);

  //   basemaps.Places.addTo(map);
  //   return () => {
  //     map.removeControl(layerControl);
  //     Object.values(basemaps).forEach((layer) => map.removeLayer(layer));
  //   };
  // }, [map]);

  useEffect(() => {
    if (!map) return;
    var littleton = L.marker([51.505, -0.09], {
        icon: new L.Icon({
          iconUrl: '/image/leaf-orange.png',
          iconSize: [45, 81],
          iconAnchor: [12, 41],
        }),
      }).bindPopup('This is Littleton, CO.'),
      denver = L.marker([51.505, -0.89], {
        icon: new L.Icon({
          iconUrl: '/image/leaf-orange.png',
          iconSize: [45, 81],
          iconAnchor: [12, 41],
        }),
      }).bindPopup('This is Denver, CO.'),
      aurora = L.marker([51.505, -0.92]).bindPopup('This is Aurora, CO.'),
      golden = L.marker([51.505, -0.91]).bindPopup('This is Golden, CO.');
    var cities = L.layerGroup([littleton, denver, aurora, golden]);
    var osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap',
    });

    var osmHOT = L.tileLayer(
      'https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png',
      {
        maxZoom: 19,
        attribution:
          '© OpenStreetMap contributors, Tiles style by Humanitarian OpenStreetMap Team hosted by OpenStreetMap France',
      }
    );

    // var map = L.map('map', {
    //   center: [39.73, -104.99],
    //   zoom: 10,
    //   layers: [osm, cities],
    // });
    // osm.addTo(map);
    // osmHOT.addTo(map);
    var baseMaps = {
      OpenStreetMap: osm,
      'OpenStreetMap.HOT': osmHOT,
    };

    var overlayMaps = {
      Cities: cities,
    };
    var layerControl = L.control.layers(baseMaps, overlayMaps).addTo(map);
    var crownHill = L.marker([51.505, -0.09], {
        icon: new L.Icon({
          iconUrl: '/image/leaf-red.png',
          iconSize: [45, 81],
          iconAnchor: [12, 41],
        }),
      }).bindPopup('This is Crown Hill Park.'),
      rubyHill = L.marker([51.505, -0.89], {
        icon: new L.Icon({
          iconUrl: '/image/leaf-red.png',
          iconSize: [45, 81],
          iconAnchor: [12, 41],
        }),
      }).bindPopup('This is Ruby Hill Park.');

    var parks = L.layerGroup([crownHill, rubyHill]);
    var openTopoMap = L.tileLayer(
      'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 19,
        attribution:
          'Map data: © OpenStreetMap contributors, SRTM | Map style: © OpenTopoMap (CC-BY-SA)',
      }
    );

    layerControl.addBaseLayer(openTopoMap, 'OpenTopoMap');
    layerControl.addOverlay(parks, 'Parks');
    return () => {
      map.removeControl(layerControl); //layer ustgah
      Object.values(baseMaps).forEach((layer) => map.removeLayer(layer));
    };
  }, [map]);

  return <></>;
}
