'use client';

import { Box, Button } from '@mui/material';
import * as L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import '@geoman-io/leaflet-geoman-free';
import '@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css';
import { useEffect, useState } from 'react';

export function LeafletLineComponenet(){
    const [coordinatesList, setCoordinatesList] =useState<{lat:number, lng:number}[][]>([]);
    const [map, setMap] = useState<L.Map | null>(null);
    const [polylines, setPolylines] = useState<L.Polyline[]>([])
    useEffect (()=>{
        if(typeof window !== 'undefined'){
            const map = L.map('masp').setView([51.505, -0.09], 13);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(
            map
        );
        setMap(map)
        map.pm.addControls({
            position: 'topleft',
            drawControls: true,
            editControls: true,
            optionsControls: true,
            customControls: true,
            oneBlock: false,
          });
        map.on('pm:create', (e) => {
          const { layer } = e;
          if (layer instanceof L.Polyline) {
            const coords = layer.getLatLngs();
        
            let latLngs;
            if (Array.isArray(coords)) {
              latLngs = Array.isArray(coords[0]) ? coords[0] : coords;  
            } else {
              latLngs = [coords];  
            }
        
            const formattedCoords = latLngs.map((latLng) => ({
              lat: latLng.lat,
              lng: latLng.lng,
            }));
            layer.addTo(map);
            setPolylines((prev)=>[...prev, layer])
        
            setCoordinatesList((prev) => [...prev, formattedCoords]);
          }
        });
        
        
        return () =>{
           if(map){
            map.remove()
           }
        }
    
        }
    },[])

    // const handleRemoveCoordinate = () => {
    //   if (coordinatesList.length > 0) {
    //     const lastPolyline = polylines[polylines.length - 1]
    //     if(lastPolyline && map !== null){
    //       map.removeLayer(lastPolyline)
    //       setPolylines((prev)=>prev.slice(0, -1))
    //       setCoordinatesList((prev) => prev.slice(0, -2));  
    //       console.log('-', coordinatesList)

    //     }
    //   }
    // };

    const handleRemoveCoordinate = () => { 
      if (coordinatesList.length > 0 && map !== null) { 
        const lastPolyline = polylines[polylines.length - 1]; 
        if (lastPolyline) { 
          //  map.removeLayer(lastPolyline); 
            setPolylines((prev) => prev.slice(0, -1)); 
            const updatedCoordinatesList = [...coordinatesList]; 
            const lastCoordinateSet = updatedCoordinatesList.pop(); 
            if (lastCoordinateSet && lastCoordinateSet.length > 0) { 
              const newCoordinates = lastCoordinateSet.slice(0, -1); 
              if (newCoordinates.length > 0) { 
                updatedCoordinatesList.push(newCoordinates); 
              } 
            } 
            setCoordinatesList(updatedCoordinatesList); 
          } } };

    useEffect(() => {
      if (coordinatesList.length > 0) {
        console.log(coordinatesList);
      }
    }, [coordinatesList]);  

    return(
      <Box>
        <Button onClick={handleRemoveCoordinate}>remove coordinate</Button>
        <Box sx={{height:'100vh', width:'100%'}} id='masp'></Box>
      </Box>
    )
}

