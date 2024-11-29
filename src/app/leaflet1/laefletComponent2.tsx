'use client';
import '@geoman-io/leaflet-geoman-free';
import '@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css';
import * as L from 'leaflet';
import 'laeflet/dist/leaflet.css';
import { useEffect } from 'react';
export default function LeafletComponent2() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const map = L.map('map').setView([51.505, -0.09], 13);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);
      return () => {
        map.remove();
      };
    }
  }, []);
  return;
}
