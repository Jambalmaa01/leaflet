'use client';
import { useState } from 'react';
import L from 'leaflet';
import { useEffect } from 'react';

export type FlipMarkerProps = {
  map: L.Map | null;
  position: L.LatLngExpression;
};

export function FlipMarker(props: FlipMarkerProps) {
  const [flipped, setFlipped] = useState(false);
  const { map, position } = props;
  useEffect(() => {
    if (!map) return;

    const customIcon = L.divIcon({
      className: 'custom-marker',
      html: `
        <div class="flip-card ${flipped ? 'flip' : ''}">
          <div class="flip-card-front">Front</div>
          <div class="flip-card-back">Back</div>
        </div>
      `,
      iconSize: [50, 50],
    });

    const marker = L.marker(position, { icon: customIcon }).addTo(map);

    marker.on('click', () => {
      setFlipped((prev) => !prev);
    });

    return () => {
      map.removeLayer(marker);
    };
  }, [map, flipped]);

  return null;
}
