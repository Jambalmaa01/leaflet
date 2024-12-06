'use client';
import { LatLngBoundsExpression } from 'leaflet';
import { SVGOverlay } from 'react-leaflet';

export function TestComponent() {
  const bounds: LatLngBoundsExpression = [
    [51.505, -0.09],
    [51.515, -0.1],
  ];

  return (
    <>
      <SVGOverlay attributes={{ stroke: 'red' }} bounds={bounds}>
        <rect x="0" y="0" width="100%" height="100%" fill="yellow" />
        <circle cx="50%" cy="50%" r="50" fill="red" />
        <text x="50%" y="50%" stroke="purple">
          text
        </text>
      </SVGOverlay>
    </>
  );
}
