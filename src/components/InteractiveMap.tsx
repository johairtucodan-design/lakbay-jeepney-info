import { useEffect, useRef } from 'react';
import L from 'leaflet';

interface InteractiveMapProps {
  center?: [number, number];
  zoom?: number;
  routes?: Array<{
    name: string;
    color: string;
    coordinates: Array<[number, number]>;
  }>;
  markers?: Array<{
    position: [number, number];
    label: string;
    type?: 'terminal' | 'stop';
  }>;
  height?: string;
}

export default function InteractiveMap({ 
  center = [8.2280, 124.2452], // Barangay Suarez coordinates
  zoom = 13,
  routes = [],
  markers = [],
  height = '400px'
}: InteractiveMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Initialize map
    const map = L.map(mapRef.current).setView(center, zoom);

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(map);

    // Custom icon for markers
    const createIcon = (type: 'terminal' | 'stop' = 'stop') => {
      const color = type === 'terminal' ? '#2E7D32' : '#F9A825';
      return L.divIcon({
        className: 'custom-marker',
        html: `
          <div style="
            background-color: ${color};
            width: 24px;
            height: 24px;
            border-radius: 50% 50% 50% 0;
            transform: rotate(-45deg);
            border: 2px solid white;
            box-shadow: 0 2px 4px rgba(0,0,0,0.3);
          ">
            <div style="
              transform: rotate(45deg);
              width: 100%;
              height: 100%;
              display: flex;
              align-items: center;
              justify-content: center;
              color: white;
              font-size: 10px;
            ">📍</div>
          </div>
        `,
        iconSize: [24, 24],
        iconAnchor: [12, 24],
        popupAnchor: [0, -24],
      });
    };

    // Add markers
    markers.forEach(marker => {
      L.marker(marker.position, { 
        icon: createIcon(marker.type)
      })
        .bindPopup(`<strong>${marker.label}</strong>`)
        .addTo(map);
    });

    // Add routes
    routes.forEach(route => {
      const polyline = L.polyline(route.coordinates, {
        color: route.color,
        weight: 4,
        opacity: 0.7,
      }).addTo(map);

      polyline.bindPopup(`<strong>${route.name}</strong>`);
    });

    mapInstanceRef.current = map;

    // Cleanup
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [center, zoom, routes, markers]);

  return (
    <div 
      ref={mapRef} 
      style={{ 
        height, 
        width: '100%',
        borderRadius: '8px',
        overflow: 'hidden'
      }}
      className="border border-gray-200"
    />
  );
}
