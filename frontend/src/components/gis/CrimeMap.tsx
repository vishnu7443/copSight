import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import L from 'leaflet';
import { Incident } from '../../types';
import { Layers } from 'lucide-react';

interface CrimeMapProps {
  incidents: Incident[];
  onSelectIncident?: (incident: Incident) => void;
  center?: [number, number];
  zoom?: number;
}

// Custom Leaflet marker icons by crime category
const createCustomMarker = (category: string) => {
  const colorMap: Record<string, string> = {
    THEFT: '#f59e0b',       // Amber
    ROBBERY: '#ef4444',     // Red
    BURGLARY: '#a855f7',    // Purple
    CYBERCRIME: '#06b6d4',  // Cyan
    ASSAULT: '#f97316',     // Orange
    NARCOTICS: '#10b981',   // Emerald
    HOMICIDE: '#dc2626',    // Crimson
  };

  const color = colorMap[category] || '#64748b';

  const svgIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${color}" width="32" height="32">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
    </svg>
  `;

  return L.divIcon({
    className: 'custom-leaflet-marker',
    html: svgIcon,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -30],
  });
};

export const CrimeMap: React.FC<CrimeMapProps> = ({
  incidents,
  onSelectIncident,
  center = [12.9784, 77.6408], // Bengaluru Indiranagar default
  zoom = 12
}) => {
  return (
    <div className="relative w-full h-full rounded-2xl overflow-hidden glass-panel border border-slate-800 shadow-2xl">
      <MapContainer
        center={center}
        zoom={zoom}
        preferCanvas={true} // Zero-lag Canvas rendering mode
        style={{ width: '100%', height: '100%', minHeight: '450px', background: '#090d16' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />

        {/* Hotspot Radius Circles */}
        <Circle
          center={[12.9784, 77.6408]}
          radius={1200}
          pathOptions={{ fillColor: '#f59e0b', fillOpacity: 0.15, color: '#f59e0b', weight: 1.5, dashArray: '4, 4' }}
        />
        <Circle
          center={[12.9755, 77.6068]}
          radius={800}
          pathOptions={{ fillColor: '#ef4444', fillOpacity: 0.2, color: '#ef4444', weight: 1.5 }}
        />

        {incidents.map((inc) => (
          <Marker
            key={inc.id}
            position={[inc.latitude, inc.longitude]}
            icon={createCustomMarker(inc.category)}
          >
            <Popup className="ksp-map-popup">
              <div className="p-2 bg-slate-900 text-slate-100 rounded-lg min-w-[200px]">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30">
                    {inc.category}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">{inc.fir_number}</span>
                </div>
                <h4 className="mt-2 text-xs font-bold text-slate-100">{inc.location_name}</h4>
                <p className="mt-1 text-[11px] text-slate-400 line-clamp-2">{inc.raw_fir_text}</p>
                <div className="mt-2.5 pt-2 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-400">
                  <span>IO: {inc.investigating_officer}</span>
                  {onSelectIncident && (
                    <button
                      onClick={() => onSelectIncident(inc)}
                      className="px-2 py-1 rounded bg-amber-500 text-slate-950 font-bold hover:bg-amber-400 transition-colors"
                    >
                      Summarize
                    </button>
                  )}
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Floating Map Legend Overlay */}
      <div className="absolute bottom-4 left-4 z-[400] glass-panel bg-slate-900/90 border border-slate-800 p-3 rounded-xl shadow-xl text-xs space-y-2">
        <div className="font-bold text-slate-200 flex items-center gap-1.5 border-b border-slate-800 pb-1.5">
          <Layers className="w-3.5 h-3.5 text-amber-400" />
          <span>GIS Incident Legend</span>
        </div>
        <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 text-[11px] text-slate-300">
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span> Theft</span>
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-red-500"></span> Robbery</span>
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-purple-500"></span> Burglary</span>
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-cyan-500"></span> Cybercrime</span>
        </div>
      </div>
    </div>
  );
};
