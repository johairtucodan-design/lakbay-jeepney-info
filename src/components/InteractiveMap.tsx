import { useEffect, useRef, useState } from 'react';
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
  center = [8.1915, 124.2151],
  zoom = 13,
  routes = [],
  markers = [],
  height = '400px'
}: InteractiveMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const layersRef = useRef<Array<L.Polyline | L.Marker>>([]);
  const [isMapReady, setIsMapReady] = useState(false);
  const initializingRef = useRef(false);
  const routingCacheRef = useRef<Map<string, Array<[number, number]>>>(new Map());

  // Ensure Leaflet CSS is loaded
  useEffect(() => {
    const existingLink = document.querySelector('link[href*="leaflet"]');
    if (!existingLink) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      link.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=';
      link.crossOrigin = '';
      document.head.appendChild(link);
    }
  }, []);

  // Initialize map once
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current || initializingRef.current) {
      return;
    }

    const container = mapContainerRef.current;
    initializingRef.current = true;

    // Wait for container to have dimensions and CSS to load
    const timer = setTimeout(() => {
      try {
        console.log('Initializing Leaflet map...');
        
        // Ensure container has dimensions
        if (container.offsetWidth === 0 || container.offsetHeight === 0) {
          console.error('Container has no dimensions');
          initializingRef.current = false;
          return;
        }

        console.log('Container dimensions:', container.offsetWidth, 'x', container.offsetHeight);
        
        // Create map instance
        const map = L.map(container, {
          center: center,
          zoom: zoom,
          zoomControl: true,
          attributionControl: true,
        });

        console.log('Adding tile layer...');

        // Add tile layer
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
          attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);

        mapInstanceRef.current = map;

        // Wait for map to fully render before marking as ready
        setTimeout(() => {
          if (mapInstanceRef.current) {
            try {
              mapInstanceRef.current.invalidateSize();
              setIsMapReady(true);
              console.log('Map initialized and ready');
            } catch (e) {
              console.error('Error invalidating size:', e);
            }
          }
        }, 200);

      } catch (error) {
        console.error('Map initialization error:', error);
        initializingRef.current = false;
      }
    }, 300);

    // Cleanup
    return () => {
      clearTimeout(timer);
      if (mapInstanceRef.current) {
        try {
          mapInstanceRef.current.remove();
        } catch (e) {
          console.error('Error removing map:', e);
        }
        mapInstanceRef.current = null;
      }
      initializingRef.current = false;
      setIsMapReady(false);
    };
  }, []);

  // Update map view when center or zoom changes
  useEffect(() => {
    if (!mapInstanceRef.current || !isMapReady) return;

    try {
      const map = mapInstanceRef.current;
      
      // Check if map container and panes exist before moving
      if (map.getContainer() && map.getPane('mapPane')) {
        map.setView(center, zoom, { animate: false });
      }
    } catch (e) {
      console.error('Error updating map view:', e);
    }
  }, [center, zoom, isMapReady]);

  // Update routes and markers when they change
  useEffect(() => {
    if (!mapInstanceRef.current || !isMapReady) return;

    const map = mapInstanceRef.current;

    const updateLayers = async () => {
      try {
        // Check if map is still valid
        if (!map.getContainer() || !map.getPane('mapPane')) {
          console.warn('Map container or pane not available, skipping layer update');
          return;
        }

        console.log('Updating map layers:', { routesCount: routes.length, markersCount: markers.length });

        // Remove all existing layers
        layersRef.current.forEach(layer => {
          try {
            if (map.hasLayer(layer)) {
              map.removeLayer(layer);
            }
          } catch (e) {
            console.error('Error removing layer:', e);
          }
        });
        layersRef.current = [];

        // Create custom marker icon
        const createIcon = (type: 'terminal' | 'stop' = 'stop') => {
          const color = type === 'terminal' ? '#2E7D32' : '#F9A825';
          return L.divIcon({
            className: 'custom-marker',
            html: `
              <div style="
                background-color: ${color};
                width: 30px;
                height: 30px;
                border-radius: 50% 50% 50% 0;
                transform: rotate(-45deg);
                border: 3px solid white;
                box-shadow: 0 3px 8px rgba(0,0,0,0.4);
              ">
                <div style="
                  transform: rotate(45deg);
                  color: white;
                  font-size: 16px;
                  font-weight: bold;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  height: 100%;
                ">•</div>
              </div>
            `,
            iconSize: [30, 30],
            iconAnchor: [15, 30],
            popupAnchor: [0, -30],
          });
        };

        // Add polylines for routes that follow roads
        const allCoordinates: Array<[number, number]> = [];
        
        // Process all routes sequentially to avoid race conditions
        for (const route of routes) {
          if (route.coordinates && route.coordinates.length > 0) {
            console.log(`Drawing route: ${route.name}`);
            
            try {
              // Validate coordinates are valid numbers
              const validCoords = route.coordinates.filter(coord => 
                Array.isArray(coord) && 
                coord.length === 2 && 
                typeof coord[0] === 'number' && 
                typeof coord[1] === 'number' &&
                !isNaN(coord[0]) && 
                !isNaN(coord[1])
              );

              if (validCoords.length === 0) {
                console.warn(`Route ${route.name} has no valid coordinates`);
                continue;
              }

              // Check map is still valid before adding layer
              if (!map.getContainer() || !map.getPane('mapPane')) {
                console.warn('Map removed during route drawing');
                return;
              }

              // Use the coordinates directly without OSRM routing
              const polyline = L.polyline(validCoords, {
                color: route.color,
                weight: 6,
                opacity: 0.7,
                smoothFactor: 1.0,
                lineCap: 'round',
                lineJoin: 'round',
              }).addTo(map);
              
              polyline.bindPopup(`<strong>${route.name}</strong>`);
              layersRef.current.push(polyline);
              allCoordinates.push(...validCoords);
              
              console.log(`Successfully drew route ${route.name} with ${validCoords.length} points`);
            } catch (e) {
              console.error(`Error drawing route ${route.name}:`, e);
            }
          }
        }

        // Add markers
        markers.forEach((marker, idx) => {
          if (marker.position && marker.position.length === 2) {
            console.log(`Adding marker ${idx + 1}: ${marker.label}`);
            
            try {
              // Validate marker position
              if (typeof marker.position[0] !== 'number' || typeof marker.position[1] !== 'number' ||
                  isNaN(marker.position[0]) || isNaN(marker.position[1])) {
                console.warn(`Invalid marker position for ${marker.label}`);
                return;
              }

              // Check map is still valid
              if (!map.getContainer()) {
                console.warn('Map removed during marker adding');
                return;
              }

              const markerLayer = L.marker(marker.position, {
                icon: createIcon(marker.type),
              }).addTo(map);
              
              markerLayer.bindPopup(`<strong>${marker.label}</strong>`);
              layersRef.current.push(markerLayer);
            } catch (e) {
              console.error(`Error adding marker ${marker.label}:`, e);
            }
          }
        });

        // Auto-fit map bounds to show all routes
        if (allCoordinates.length > 1) {
          try {
            // Wait a bit before fitting bounds to ensure layers are rendered
            setTimeout(() => {
              if (mapInstanceRef.current && map.getContainer() && map.getPane('mapPane')) {
                const bounds = L.latLngBounds(allCoordinates);
                if (bounds.isValid()) {
                  map.fitBounds(bounds, { 
                    padding: [50, 50],
                    maxZoom: 14,
                    animate: false,
                  });
                  console.log('Map bounds fitted to routes');
                }
              }
            }, 100);
          } catch (e) {
            console.error('Error fitting bounds:', e);
          }
        }

      } catch (e) {
        console.error('Error updating layers:', e);
      }
    };

    updateLayers();

  }, [routes, markers, isMapReady]);

  return (
    <>
      <div 
        id="map-container"
        style={{ 
          width: '100%', 
          height: height,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div 
          ref={mapContainerRef}
          id="map"
          style={{
            width: '100%',
            height: '100%',
          }}
        />
        {!isMapReady && (
          <div 
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#f3f4f6',
              zIndex: 1000,
            }}
          >
            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: '32px',
                height: '32px',
                border: '2px solid #2E7D32',
                borderTopColor: 'transparent',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite',
                margin: '0 auto 8px',
              }} />
              <p style={{ color: '#6b7280', fontSize: '14px' }}>Loading map...</p>
            </div>
          </div>
        )}
      </div>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        
        #map {
          background: #ddd;
        }
        
        #map .leaflet-tile-pane {
          z-index: 200;
        }
        
        #map .leaflet-tile {
          opacity: 1 !important;
          visibility: visible !important;
        }
        
        .custom-marker {
          background: transparent !important;
          border: none !important;
        }
      `}} />
    </>
  );
}