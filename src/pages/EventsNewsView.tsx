/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { usePortal } from '../context/PortalContext';
import { NoticeCategory } from '../types/university';
import { 
  Compass, 
  MapPin, 
  Calendar as CalendarIcon, 
  Clock, 
  Search, 
  Bell, 
  CheckCircle,
  Megaphone,
  Filter,
  User as UserIcon
} from 'lucide-react';

export const EventsNewsView: React.FC = () => {
  const { notices, events, registerForEvent } = usePortal();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<NoticeCategory | 'All'>('All');
  const [registeredEvents, setRegisteredEvents] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<'notices' | 'events'>('notices');

  const categories: Array<NoticeCategory | 'All'> = [
    'All',
    'Academic',
    'Examination',
    'Admissions',
    'Scholarships',
    'Placements',
    'Events',
    'General'
  ];

  // Filtering Notices
  const filteredNotices = notices.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          note.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' ? true : note.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleRegisterEvent = (eventId: string) => {
    if (registeredEvents.includes(eventId)) return;
    registerForEvent(eventId);
    setRegisteredEvents(prev => [...prev, eventId]);
  };

  return (
    <div id="events-news-portal-root" className="max-w-4xl mx-auto px-4 py-12 font-sans space-y-8">
      {/* Banner */}
      <div className="text-center space-y-2">
        <Compass className="h-10 w-10 text-[#C5A059] mx-auto animate-pulse" />
        <h2 className="text-3xl font-serif font-black text-[#0B2240] tracking-tight">University Notice & Event Hub</h2>
        <p className="text-xs text-gray-500">Live academic board, bulletins, and event schedules synced in real-time.</p>
      </div>

      {/* Switcher Tab */}
      <div className="flex justify-center">
        <div className="bg-gray-100 p-1 rounded-md border border-gray-200 flex gap-1">
          <button
            onClick={() => setActiveTab('notices')}
            className={`px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded transition-all flex items-center gap-1.5 ${
              activeTab === 'notices' 
                ? 'bg-[#0B2240] text-[#C5A059]' 
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
            }`}
          >
            <Megaphone className="h-3.5 w-3.5" /> Notice Board ({filteredNotices.length})
          </button>
          <button
            onClick={() => setActiveTab('events')}
            className={`px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded transition-all flex items-center gap-1.5 ${
              activeTab === 'events' 
                ? 'bg-[#0B2240] text-[#C5A059]' 
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
            }`}
          >
            <CalendarIcon className="h-3.5 w-3.5" /> Campus Events ({events.length})
          </button>
        </div>
      </div>

      {activeTab === 'notices' ? (
        /* NOTICES TAB */
        <div className="space-y-6">
          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-between pb-4 border-b border-gray-200">
            {/* Search */}
            <div className="relative w-full sm:max-w-xs">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <Search className="h-3.5 w-3.5" />
              </span>
              <input
                type="text"
                placeholder="Search bulletins..."
                className="w-full bg-white border border-gray-300 rounded pl-9 pr-3 py-1.5 text-xs outline-none focus:border-[#C5A059]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Filter */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Filter className="h-3.5 w-3.5 text-gray-400 shrink-0" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value as any)}
                className="w-full sm:w-auto bg-white border border-gray-300 rounded px-2.5 py-1.5 text-xs outline-none focus:border-[#C5A059]"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat === 'All' ? '📑 All Bulletins' : cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Notices Feed List */}
          <div className="space-y-4">
            {filteredNotices.length === 0 ? (
              <div className="text-center py-12 p-6 border rounded bg-white text-gray-450 text-xs">
                No active postings found of this category or search criteria.
              </div>
            ) : (
              filteredNotices.map((note) => (
                <div 
                  key={note.id} 
                  className={`p-5 bg-white border rounded shadow-sm relative overflow-hidden transition-all duration-200 ${
                    note.important ? 'border-l-4 border-l-red-600' : 'border-gray-200'
                  }`}
                >
                  {note.important && (
                    <div className="absolute top-0 right-0 bg-red-600 text-white font-mono text-[9px] font-bold px-2 py-0.5 rounded-bl uppercase tracking-wider flex items-center gap-1">
                      <Bell className="h-2.5 w-2.5" /> IMPORTANT
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2 items-center text-[10px] text-gray-400 mb-2 font-mono">
                    <span className="bg-gray-100 text-[#0B2240] font-bold px-2 py-0.5 rounded uppercase border border-gray-250">
                      {note.category}
                    </span>
                    <span>•</span>
                    <span>Issued: {note.date}</span>
                    <span>•</span>
                    <span className="flex items-center gap-0.5">
                      <UserIcon className="h-2.5 w-2.5" /> {note.author || 'University Registrar'}
                    </span>
                  </div>

                  <h3 className="text-sm font-serif font-black text-gray-950 mb-2 leading-snug">
                    {note.title}
                  </h3>
                  
                  <p className="text-xs text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {note.content}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      ) : (
        /* EVENTS TAB */
        <div className="space-y-6">
          <div className="text-xs text-gray-500 font-mono text-center mb-2">
            Click RSVP to claim an entry receipt. Event listings represent physical seminar groups and academic labs.
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {events.length === 0 ? (
              <div className="col-span-2 text-center py-12 border rounded bg-white text-xs text-gray-400">
                No university events scheduled currently.
              </div>
            ) : (
              events.map((ev) => {
                const isRegistered = registeredEvents.includes(ev.id);
                return (
                  <div key={ev.id} className="bg-white border border-gray-200 rounded p-5 shadow-sm space-y-4 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-[10px] uppercase font-mono font-bold">
                        <span className="text-[#C5A059]">{ev.type}</span>
                        <span className="text-gray-400 flex items-center gap-1">
                          <Clock className="h-3 w-3" /> {ev.time || '10:00 AM'}
                        </span>
                      </div>

                      <h3 className="text-xs font-serif font-bold text-gray-900 leading-snug">
                        {ev.title}
                      </h3>

                      <p className="text-[11px] text-gray-600 leading-relaxed line-clamp-3">
                        {ev.description}
                      </p>

                      <div className="space-y-1 pt-2 border-t border-gray-100 text-[10.5px] text-gray-500 font-mono">
                        <div className="flex items-center gap-1">
                          <CalendarIcon className="h-3.5 w-3.5 text-gray-400 shrink-0" />
                          <span>Date: {ev.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3.5 w-3.5 text-gray-400 shrink-0" />
                          <span className="truncate">{ev.location}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-gray-50">
                      <span className="text-[10px] text-gray-500 font-mono">
                        🙋 {ev.registrantsCount || 0} claimed seats
                      </span>

                      <button
                        onClick={() => handleRegisterEvent(ev.id)}
                        disabled={isRegistered}
                        className={`text-[10px] font-bold uppercase tracking-wider py-1 px-3 border rounded transition-all flex items-center gap-1 ${
                          isRegistered 
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-250 cursor-default'
                            : 'bg-[#0B2240] hover:bg-[#C5A059] hover:text-[#0b2240] text-white border-[#C5A059]'
                        }`}
                      >
                        {isRegistered ? (
                          <>
                            <CheckCircle className="h-3 w-3 text-emerald-650" /> RSVP Claimed
                          </>
                        ) : (
                          'RSVP Entrance'
                        )}
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
};
