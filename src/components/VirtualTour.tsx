/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { MapPin, Image as ImageIcon, Video, Compass, HelpCircle } from 'lucide-react';
import { usePortal } from '../context/PortalContext';
import { CampusSpot } from '../types/university';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

// Leaflet marker fix: Using a simple DivIcon to avoid asset path issues
const customIcon = L.divIcon({
  className: 'custom-leaflet-icon',
  html: `<div style="background-color: #0B2240; width: 24px; height: 24px; border-radius: 50%; border: 3px solid white; display:flex; align-items:center; justify-content:center; box-shadow: 0 0 5px rgba(0,0,0,0.5);">
          <svg viewBox="0 0 24 24" width="14" height="14" stroke="white" stroke-width="2" fill="none" class="lucide lucide-map-pin"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
         </div>`,
  iconSize: [24, 24],
  iconAnchor: [12, 24],
});

const selectedIcon = L.divIcon({
    className: 'custom-leaflet-icon',
    html: `<div style="background-color: #C5A059; width: 30px; height: 30px; border-radius: 50%; border: 3px solid white; display:flex; align-items:center; justify-content:center; box-shadow: 0 0 5px rgba(0,0,0,0.5);">
            <svg viewBox="0 0 24 24" width="18" height="18" stroke="white" stroke-width="2" fill="none" class="lucide lucide-map-pin"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
           </div>`,
    iconSize: [30, 30],
    iconAnchor: [15, 30],
  });

export const VirtualTour: React.FC = () => {
  const { campusSpots: spots } = usePortal();
  const [selectedSpot, setSelectedSpot] = useState<string>('spot-1');
  const [droneVideoPlaying, setDroneVideoPlaying] = useState(false);

  const selectedSpotData = spots.find(s => s.id === selectedSpot) || spots[0] || {
    id: 'spot-placeholder',
    name: 'KMU Campus Block',
    category: 'academic',
    coordinateX: 50,
    coordinateY: 50,
    description: 'Explore our modern academic and green campus structures.',
    features: [],
    imageUrl: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=600',
    stat: 'State-of-the-art Infrastructure'
  };

  return (
    <div id="virtual-tour-root" className="bg-[#FAF9F5] border border-[#EBEAE4] rounded p-6 shadow-sm min-h-[500px]">
      <div className="flex flex-col md:flex-row items-start justify-between gap-4 border-b border-gray-200 pb-4 mb-6">
        <div>
          <span className="text-xs font-mono font-semibold tracking-widest text-[#C5A059] uppercase block mb-1">Interactive Experience</span>
          <h3 className="text-2xl font-serif font-bold text-[#0B2240] tracking-tight">Virtual Campus Tour</h3>
          <p className="text-sm text-gray-600 mt-1">Navigate the extensive KM University Mathura campus sectors and explore world-class infrastructure blocks virtually.</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => setDroneVideoPlaying(false)}
            className={`px-3 py-1.5 rounded text-xs font-semibold tracking-wider uppercase transition-colors flex items-center gap-1.5 ${
              !droneVideoPlaying ? 'bg-[#0B2240] text-white border border-[#0B2240]' : 'bg-white text-gray-700 border border-gray-300'
            }`}
          >
            <Compass className="h-3.5 w-3.5" />
            Interactive Map
          </button>
          <button 
            onClick={() => setDroneVideoPlaying(true)}
            className={`px-3 py-1.5 rounded text-xs font-semibold tracking-wider uppercase transition-colors flex items-center gap-1.5 ${
              droneVideoPlaying ? 'bg-[#0B2240] text-white border border-[#0B2240]' : 'bg-white text-gray-700 border border-gray-300'
            }`}
          >
            <Video className="h-3.5 w-3.5" />
            360° Drone Gallery
          </button>
          <a 
            href="https://earth.google.com/web/search/KM+University+Mathura+Road+Mathura+Uttar+Pradesh"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 rounded text-xs font-semibold tracking-wider uppercase transition-colors flex items-center gap-1.5 bg-white text-gray-700 border border-gray-300 hover:text-[#C5A059]"
          >
            <Compass className="h-3.5 w-3.5" />
            Earth View
          </a>
        </div>
      </div>

      {droneVideoPlaying ? (
        <div className="space-y-4">
          <div className="relative aspect-video rounded overflow-hidden shadow-md bg-[#051121] flex flex-col items-center justify-center p-8 text-center text-gray-300 border border-gray-200">
            <Video className="h-16 w-16 text-[#C5A059] mb-4 animate-pulse" />
            <h4 className="text-xl font-serif font-bold text-white mb-2">Aerial Drone Stream: KMU Mathura Green Meadows</h4>
            <p className="text-xs max-w-md text-gray-400">This simulates a high-definition 1080p drone flyby capturing the K.D. Medical Center, central multi-sport complex, and administrative dome at sunrise.</p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <span className="px-2.5 py-1 bg-[#142d4a] border border-[#C5A059]/40 text-[#ebd19d] text-[10px] font-mono rounded">FHD Stream Active</span>
              <span className="px-2.5 py-1 bg-[#142d4a] border border-[#C5A059]/40 text-[#ebd19d] text-[10px] font-mono rounded">Air Speed: 14 m/s</span>
              <span className="px-2.5 py-1 bg-[#142d4a] border border-[#C5A059]/40 text-[#ebd19d] text-[10px] font-mono rounded">Heading: True North</span>
            </div>
            <button 
              onClick={() => setDroneVideoPlaying(false)}
              className="mt-8 bg-[#C5A059] text-black px-4 py-2 text-xs font-bold rounded uppercase tracking-wider hover:bg-[#ebd19d] transition-colors"
            >
              Return to Blueprints Map
            </button>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="aspect-video bg-gray-200 rounded overflow-hidden relative group cursor-pointer border border-gray-300">
              <img src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=300" referrerPolicy="no-referrer" alt="Library" className="object-cover h-full w-full group-hover:scale-105 transition-transform" />
              <div className="absolute inset-0 bg-black/40 flex items-end p-2"><span className="text-[10px] text-white font-semibold">Central Quad</span></div>
            </div>
            <div className="aspect-video bg-gray-200 rounded overflow-hidden relative group cursor-pointer border border-gray-300">
              <img src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=300" referrerPolicy="no-referrer" alt="Hospital" className="object-cover h-full w-full group-hover:scale-105 transition-transform" />
              <div className="absolute inset-0 bg-black/40 flex items-end p-2"><span className="text-[10px] text-white font-semibold">KDMC Trauma Care</span></div>
            </div>
            <div className="aspect-video bg-gray-200 rounded overflow-hidden relative group cursor-pointer border border-gray-300">
              <img src="https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&q=80&w=300" referrerPolicy="no-referrer" alt="Hostels" className="object-cover h-full w-full group-hover:scale-105 transition-transform" />
              <div className="absolute inset-0 bg-black/40 flex items-end p-2"><span className="text-[10px] text-white font-semibold">Residencies Arena</span></div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main Visual interactive schematic */}
          <div className="flex-1 bg-[#051121] rounded-lg border border-[#142d4a] relative min-h-[350px] sm:min-h-[400px] overflow-hidden group shadow-inner">
            <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
            <MapContainer center={[27.4924, 77.6737]} zoom={16} className="h-full w-full">
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={[27.4924, 77.6737]} icon={selectedIcon}>
                <Popup>KM University, Mathura Road</Popup>
              </Marker>
              {spots.map((spot) => (
                <Marker 
                    key={spot.id} 
                    position={[27.4924 + (spot.coordinateY - 50)/500, 77.6737 + (spot.coordinateX - 50)/500]} 
                    icon={selectedSpot === spot.id ? selectedIcon : customIcon}
                    eventHandlers={{ click: () => setSelectedSpot(spot.id) }}
                >
                </Marker>
              ))}
            </MapContainer>
          </div>

          {/* Details segment on the right */}
          <div className="w-full lg:w-[380px] flex flex-col justify-between border border-gray-200 bg-white rounded p-5 shadow-sm">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className={`px-2 py-0.5 rounded text-[10px] font-semibold font-mono tracking-wider uppercase ${
                  selectedSpotData.category === 'clinical' ? 'bg-red-50 text-red-700 border border-red-200' :
                  selectedSpotData.category === 'academic' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
                  selectedSpotData.category === 'hub' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                  'bg-green-50 text-green-700 border border-green-200'
                }`}>
                  {selectedSpotData.category}
                </span>
                <span className="text-[10px] font-mono font-bold text-gray-400 tracking-wider">
                  {selectedSpotData.stat}
                </span>
              </div>

              <h4 className="text-lg font-serif font-bold text-[#0B2240] leading-snug">
                {selectedSpotData.name}
              </h4>
              <p className="text-xs text-gray-600 mt-2.5 leading-relaxed">
                {selectedSpotData.description}
              </p>

              <div className="mt-4 border-t border-gray-100 pt-3.5">
                <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-gray-400 mb-2">Features & Amenities:</div>
                <ul className="space-y-1.5">
                  {selectedSpotData.features.map((feat, idx) => (
                    <li key={idx} className="text-xs text-gray-700 flex items-center gap-1.5">
                      <span className="h-1 w-1 bg-[#C5A059] rounded-full shrink-0"></span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-6">
              <div className="rounded overflow-hidden aspect-video border border-gray-200 bg-gray-100 mb-3 grayscale-[30%] hover:grayscale-0 transition-all">
                <img 
                  src={selectedSpotData.imageUrl} 
                  referrerPolicy="no-referrer"
                  alt={selectedSpotData.name} 
                  className="object-cover h-full w-full"
                />
              </div>
              <div className="text-[10px] text-gray-400 text-center italic font-mono flex items-center justify-center gap-1">
                <ImageIcon className="h-3 w-3" />
                Actual high-definition campus reference rendering.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
