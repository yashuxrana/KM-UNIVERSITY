/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Award, 
  MapPin, 
  Clock, 
  Quote, 
  Building, 
  Search, 
  Filter,
  Flame,
  CheckCircle2,
  Calendar
} from 'lucide-react';
import { usePortal } from '../context/PortalContext';
import { VIPGuest } from '../types/university';

export const VIPVisitors: React.FC = () => {
  const { vipGuests } = usePortal();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const filteredGuests = vipGuests.filter(guest => {
    const matchesSearch = guest.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          guest.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          guest.event.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = categoryFilter === 'all' || guest.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  return (
    <div id="vip-visitors-root" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 font-sans">
      
      {/* Visual Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ebd19d]/10 border border-[#C5A059]/30 text-[#C5A059] text-[10px] font-mono tracking-wider uppercase">
          <Award className="h-3.5 w-3.5 animate-pulse" />
          Honorable Dignitaries & Visitors
        </div>
        <h2 className="text-3xl font-serif font-bold text-[#0B2240] tracking-tight">KMU Distinguished Speakers & Guests Gallery</h2>
        <p className="text-xs text-gray-600 max-w-xl mx-auto">
          KM University is highly honored to host national leadership, spiritual luminaries, medical pioneers, and international scholars. Here we chronicle the visits that continually guide our institutional milestones and inspire students.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-mono font-bold text-gray-400 uppercase tracking-wide mr-2">Filter Category:</span>
          {['all', 'government', 'academia', 'spiritual'].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1.5 rounded-sm capitalize text-[11px] font-medium transition-all ${
                categoryFilter === cat 
                  ? 'bg-[#0B2240] text-[#C5A059] border border-[#C5A059]' 
                  : 'bg-gray-150 text-gray-600 border border-gray-200 hover:bg-gray-200'
              }`}
            >
              {cat === 'all' ? 'All Classes' : cat}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-80">
          <input
            type="text"
            placeholder="Search VIPs, titles, or events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border border-gray-300 rounded py-1.5 pl-9 pr-4 text-xs focus:outline-none focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059]/30"
          />
          <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-gray-400" />
        </div>
      </div>

      {/* Dignitaries Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredGuests.length === 0 ? (
          <div className="col-span-full py-16 text-center text-gray-400 bg-white border border-gray-200 rounded-lg shadow-sm font-serif italic text-sm">
            No matching dignitaries found in university historical logs.
          </div>
        ) : (
          filteredGuests.map((guest) => (
            <div 
              key={guest.id} 
              className="bg-white border border-gray-200 rounded shadow-sm hover:shadow-md transition-all flex flex-col h-full overflow-hidden border-t-4 border-[#C5A059]"
            >
              <div className="p-5 flex-1 space-y-4">
                <div className="flex gap-4 items-start">
                  <div className="h-16 w-16 bg-gray-100 rounded-lg overflow-hidden border border-[#C5A059] shrink-0">
                    <img 
                      src={guest.photoUrl} 
                      alt={guest.name} 
                      className="h-full w-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="space-y-0.5">
                    <h3 className="font-serif font-black text-sm text-[#0B2240]">{guest.name}</h3>
                    <p className="text-[10px] text-gray-600 leading-tight font-medium">{guest.title}</p>
                    <span className="inline-block px-2 py-0.5 bg-gray-50 border border-gray-200 rounded text-[9px] font-mono capitalize mt-1.5 text-gray-500">
                      {guest.category} Guest
                    </span>
                  </div>
                </div>

                {/* Visit parameters */}
                <div className="space-y-1 text-[11px] text-gray-600 border-l-2 border-gray-150 pl-3">
                  <div className="flex items-center gap-1 text-gray-400 font-mono text-[10px]">
                    <Calendar className="h-3 w-3 text-[#C5A059]" />
                    <span>{guest.visitDate}</span>
                  </div>
                  <p className="font-bold text-gray-800 line-clamp-2 leading-snug">{guest.event}</p>
                </div>

                {/* Key remark quote block */}
                <div className="bg-gray-50 rounded-lg p-3.5 relative border border-gray-100">
                  <Quote className="h-6 w-6 text-[#C5A059]/10 absolute right-2.5 top-1.5" />
                  <p className="text-[11px] text-gray-600 italic leading-relaxed relative z-10 font-sans">
                    "{guest.quotes}"
                  </p>
                </div>
              </div>

              {/* Host and highlight details footer */}
              <div className="bg-gray-50 px-5 py-4 border-t border-gray-150 space-y-2.5">
                <div className="flex items-start gap-1 text-[10px] text-gray-500">
                  <Building className="h-3.5 w-3.5 text-[#C5A059] shrink-0 mt-0.5" />
                  <span><strong className="text-gray-700">Hosted by:</strong> {guest.departmentHosted}</span>
                </div>
                <div className="space-y-1 border-t border-gray-200 pt-2 text-[10px]">
                  <strong className="text-gray-400 font-mono uppercase text-[9px] tracking-wider block mb-1">Key Highlights:</strong>
                  {guest.keyHighlights.map((hl, index) => (
                    <div key={index} className="flex gap-1.5 items-start text-gray-600">
                      <span className="text-[#C5A059] font-bold">•</span>
                      <p className="leading-tight">{hl}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Liaison / Protocols Disclaimer */}
      <div className="mt-12 bg-[#051121] text-white p-5 rounded-lg border-l-4 border-[#C5A059] flex flex-col sm:flex-row items-center justify-between gap-4 shadow">
        <div className="space-y-0.5 text-center sm:text-left">
          <h4 className="font-serif font-bold text-xs text-white">University Liaison Council & Protocol Office</h4>
          <p className="text-[10px] text-gray-400 font-sans">
            Overseeing foreign student visa coordination, central cabinet logistics, and security clearing grids matching academic standards.
          </p>
        </div>
        <button 
          onClick={() => {
            alert("The KMU Guestbook Liaison Coordinator can be reached at: guest-relations@kmu.edu.in");
          }}
          className="shrink-0 bg-transparent text-xs hover:bg-[#C5A059]/10 text-[#C5A059] py-1.5 px-4 rounded border border-[#C5A059] font-bold uppercase tracking-wider transition-colors"
        >
          Request Protocol Clearance
        </button>
      </div>

    </div>
  );
};
