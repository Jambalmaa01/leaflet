// 'use client';
// import { point } from "leaflet";
// import { useEffect } from "react";
// import L, {Marker} from 'leaflet'
// import { useMap } from "react-leaflet";


// export type PointComponentProps={
//     point:boolean;
// }

// export function PointComponent(props:PointComponentProps){
//     const map= useMap()
//     const {point} =props
//     useEffect(()=>{
//         if(point){
//             const point = L.marker([51.505, -0.09],{
//                 icon: L.icon({
//                     iconUrl: './image/leaf-red.png',
//                     iconSize: [40, 80],
//                     className: 'flipped-icon',
//                   }),
//             }).addTo(map)

//         point.on('click', ()=>{
            
//             const pointElement= point.getElement();
//             if(pointElement){
//                 pointElement.style.transition = 'transform 1s';
//                 pointElement.style.transformOrigin = 'center center';
//                 pointElement.style.transform = 'translate3d(630px, 418px, 0px) rotateY(-180deg)'
//             }
//             //     else if (pointElement) {
//             //     pointElement.style.transition = 'transform 1s';
//             //     pointElement.style.transformOrigin = 'center center';
//             //     pointElement.style.transform = 'translate3d(630px, 418px, 0px) rotateY(-180deg)'
//             // }
//         })
//         }else{
//             map.eachLayer((layer)=>{
//                 if(layer instanceof Marker){
//                     map.removeLayer(layer)
//                 }
//             })
//         }
//     },[point,map])

//     return<></>
// }


'use client';
import { useEffect, useRef } from 'react';
import L from 'leaflet';
import { useMap } from 'react-leaflet';

export type PointComponentProps = {
  point: boolean;
  rotationX: number; 
  rotationY: number;
};

export function PointComponent({ point, rotationX, rotationY }: PointComponentProps) {
  const map = useMap();
  const markersRef=useRef<L.Marker[]>([])

  useEffect(() => {
    let marker: L.Marker | null = null;

    if (point) {
      marker = L.marker([51.505, -0.09], {
        icon: L.icon({
          iconUrl: './image/leaf-orange.png',
          iconSize: [40, 80],
          className: 'flipped-icon',
        }),
      }).addTo(map);
      const transformOrigin = `center center`
      const transform = `translate3d(630px, 418px, 0px) rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;
      if(marker){
        const markerElement= marker.getElement()
        if(markerElement){
            markerElement.style.transform =transform
            markerElement.style.transformOrigin =transformOrigin
        }
      }

      marker.on('click', ()=>{
        const markerElement = marker?.getElement();
        if(markerElement){
            markerElement.style.transition = 'transform 0s';  
            markerElement.style.transformOrigin = 'center center';
            markerElement.style.transform = 'translate3d(630px, 418px, 0px) scaleX(-1) scaleY(-1)';
          console.log('marker')
        }
      })

      
    } else {
      if (marker) {
        map.removeLayer(marker);
      }
    }

    return () => {
      if (marker) {
        map.removeLayer(marker);
      }
    };
  }, [point, rotationX, rotationY, map]);

  return <></>;
}
