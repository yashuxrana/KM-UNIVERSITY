/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { usePortal } from '../context/PortalContext';
import { 
  BarChart, 
  Settings, 
  Trash2, 
  Plus, 
  Check, 
  User as UserIcon,
  BookOpen,
  Calendar,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  Globe
} from 'lucide-react';

export const AdminPortal: React.FC = () => {
  const { 
    currentUser: rawCurrentUser, 
    loginAs, 
    notices, 
    events, 
    addNotice, 
    addEvent, 
    deleteNotice, 
    deleteEvent,
    allUsers,
    enrollments,
    applications,
    setIsLoginModalOpen,
    setLoginModalPreselectedRole,
    registerUser,
    vipGuests,
    addVIPGuest,
    updateVIPGuest,
    deleteVIPGuest,
    campusSpots,
    addCampusSpot,
    updateCampusSpot,
    deleteCampusSpot,
    uploadFile
  } = usePortal();

  const currentUser = rawCurrentUser || { role: 'admin', name: 'Admin' };

  const [activeSection, setActiveSection] = useState<'dashboard' | 'notices' | 'events' | 'seo' | 'vips' | 'gallery'>('dashboard');

  // Notice form states
  const [noticeTitle, setNoticeTitle] = useState('');
  const [noticeContent, setNoticeContent] = useState('');
  const [noticeCategory, setNoticeCategory] = useState<'academic' | 'placements' | 'exams' | 'general'>('general');
  const [noticeImportant, setNoticeImportant] = useState(false);
  const [noticeSuccess, setNoticeSuccess] = useState(false);

  // Event form states
  const [eventTitle, setEventTitle] = useState('');
  const [eventDate, setEventDate] = useState('2026-06-12');
  const [eventLocation, setEventLocation] = useState('K.D. Auditorium Block');
  const [eventDesc, setEventDesc] = useState('');
  const [eventType, setEventType] = useState<'seminar' | 'sports' | 'academic' | 'webinar'>('seminar');
  const [eventSuccess, setEventSuccess] = useState(false);

  // SEO configuration states
  const [siteTitle, setSiteTitle] = useState('KM University, Mathura - Premium University Admissions Open 2026');
  const [siteMeta, setSiteMeta] = useState('Official campus website. Flagship K.D. Medical Sciences & Advanced Engineering programs.');
  const [seoSuccess, setSeoSuccess] = useState(false);

  // VIP state managers
  const [vipName, setVipName] = useState('');
  const [vipTitle, setVipTitle] = useState('');
  const [vipCategory, setVipCategory] = useState<'government' | 'industry' | 'academia' | 'spiritual'>('government');
  const [vipVisitDate, setVipVisitDate] = useState('2026-06-01');
  const [vipEvent, setVipEvent] = useState('');
  const [vipImageUrl, setVipImageUrl] = useState('');
  const [vipQuote, setVipQuote] = useState('');
  const [vipHost, setVipHost] = useState('');
  const [vipHighlights, setVipHighlights] = useState('');
  const [vipSuccessMsg, setVipSuccessMsg] = useState(false);
  const [editingVipId, setEditingVipId] = useState<string | null>(null);

  // Campus Spot state managers
  const [spotName, setSpotName] = useState('');
  const [spotCategory, setSpotCategory] = useState<'clinical' | 'academic' | 'hub' | 'life'>('academic');
  const [spotCoordX, setSpotCoordX] = useState<number>(50);
  const [spotCoordY, setSpotCoordY] = useState<number>(50);
  const [spotDesc, setSpotDesc] = useState('');
  const [spotImageUrl, setSpotImageUrl] = useState('');
  const [spotStat, setSpotStat] = useState('');
  const [spotFeatures, setSpotFeatures] = useState('');
  const [spotSuccessMsg, setSpotSuccessMsg] = useState(false);
  const [editingSpotId, setEditingSpotId] = useState<string | null>(null);

  const handleVIPSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!vipName.trim() || !vipTitle.trim()) return;

    const parsedHighlights = vipHighlights
      .split('\n')
      .map(h => h.trim())
      .filter(h => h.length > 0);

    if (editingVipId) {
      updateVIPGuest(editingVipId, {
        name: vipName,
        title: vipTitle,
        category: vipCategory,
        visitDate: vipVisitDate,
        event: vipEvent,
        photoUrl: vipImageUrl || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        quotes: vipQuote,
        departmentHosted: vipHost,
        keyHighlights: parsedHighlights,
      });
      setEditingVipId(null);
    } else {
      addVIPGuest({
        name: vipName,
        title: vipTitle,
        category: vipCategory,
        visitDate: vipVisitDate,
        event: vipEvent,
        photoUrl: vipImageUrl || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        quotes: vipQuote,
        departmentHosted: vipHost,
        keyHighlights: parsedHighlights,
      });
    }

    setVipSuccessMsg(true);
    setVipName('');
    setVipTitle('');
    setVipQuote('');
    setVipEvent('');
    setVipHost('');
    setVipImageUrl('');
    setVipHighlights('');
    setTimeout(() => setVipSuccessMsg(false), 3000);
  };

  const startEditVIP = (guest: any) => {
    setEditingVipId(guest.id);
    setVipName(guest.name);
    setVipTitle(guest.title);
    setVipCategory(guest.category);
    setVipVisitDate(guest.visitDate);
    setVipEvent(guest.event);
    setVipImageUrl(guest.photoUrl);
    setVipQuote(guest.quotes);
    setVipHost(guest.departmentHosted);
    setVipHighlights(guest.keyHighlights.join('\n'));
    setActiveSection('vips');
  };

  const handleSpotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!spotName.trim() || !spotDesc.trim()) return;

    const parsedFeatures = spotFeatures
      .split('\n')
      .map(f => f.trim())
      .filter(f => f.length > 0);

    if (editingSpotId) {
      updateCampusSpot(editingSpotId, {
        name: spotName,
        category: spotCategory,
        coordinateX: Number(spotCoordX) || 50,
        coordinateY: Number(spotCoordY) || 50,
        description: spotDesc,
        imageUrl: spotImageUrl || 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=600',
        stat: spotStat,
        features: parsedFeatures,
      });
      setEditingSpotId(null);
    } else {
      addCampusSpot({
        name: spotName,
        category: spotCategory,
        coordinateX: Number(spotCoordX) || 50,
        coordinateY: Number(spotCoordY) || 50,
        description: spotDesc,
        imageUrl: spotImageUrl || 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=600',
        stat: spotStat,
        features: parsedFeatures,
      });
    }

    setSpotSuccessMsg(true);
    setSpotName('');
    setSpotDesc('');
    setSpotImageUrl('');
    setSpotStat('');
    setSpotFeatures('');
    setTimeout(() => setSpotSuccessMsg(false), 3000);
  };

  const startEditSpot = (spot: any) => {
    setEditingSpotId(spot.id);
    setSpotName(spot.name);
    setSpotCategory(spot.category);
    setSpotCoordX(spot.coordinateX);
    setSpotCoordY(spot.coordinateY);
    setSpotDesc(spot.description);
    setSpotImageUrl(spot.imageUrl);
    setSpotStat(spot.stat);
    setSpotFeatures(spot.features.join('\n'));
    setActiveSection('gallery');
  };

  const handleNoticeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noticeTitle || !noticeContent) return;
    
    const categoryMap: Record<string, any> = {
      academic: 'Academic',
      placements: 'Placements',
      exams: 'Examination',
      general: 'General',
    };

    addNotice({
      title: noticeTitle,
      content: noticeContent,
      category: categoryMap[noticeCategory] || 'General',
      author: currentUser.name || 'Admin',
      important: noticeImportant
    });

    setNoticeSuccess(true);
    setNoticeTitle('');
    setNoticeContent('');
    setNoticeImportant(false);
    setTimeout(() => setNoticeSuccess(false), 4000);
  };

  const handleEventSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventTitle || !eventDesc) return;

    const eventTypeMap: Record<string, 'Conference' | 'Workshop' | 'Seminar' | 'Cultural' | 'Sports'> = {
      seminar: 'Seminar',
      sports: 'Sports',
      academic: 'Workshop',
      webinar: 'Conference',
    };

    addEvent({
      title: eventTitle,
      type: eventTypeMap[eventType] || 'Seminar',
      date: eventDate,
      time: '10:00 AM', // Default time
      location: eventLocation,
      description: eventDesc
    });

    setEventSuccess(true);
    setEventTitle('');
    setEventDesc('');
    setTimeout(() => setEventSuccess(false), 4000);
  };

  const handleSeoSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSeoSuccess(true);
    setTimeout(() => setSeoSuccess(false), 3000);
  };

  // Math calculated metrics
  const totalStudents = allUsers.filter(u => u.role === 'student').length;
  const totalFaculty = allUsers.filter(u => u.role === 'faculty').length;
  const approvedApplicants = applications.filter(a => a.status === 'approved').length;

  return (
    <div id="admin-portal-root" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-sans">
      
      {/* Super Banner */}
      <div className="bg-[#0B2240] text-white rounded p-6 shadow-md mb-6 border-l-4 border-[#C5A059] flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4 text-center sm:text-left flex-col sm:flex-row">
          <div className="h-14 w-14 bg-gradient-to-tr from-[#C5A059] to-[#ebd19d] rounded-full p-0.5 shadow-md flex items-center justify-center">
            <div className="h-full w-full bg-[#0B2240] rounded-full flex items-center justify-center">
              <Settings className="h-6 w-6 text-[#C5A059] animate-spin-slow" />
            </div>
          </div>
          <div>
            <h2 className="text-xl font-serif font-bold text-white uppercase">KMU Super Admin Panel</h2>
            <div className="text-xs text-gray-300 font-mono mt-0.5">Chancellor & Trustees Command Deck | Server Active</div>
            <div className="text-[10px] text-gray-400 font-mono mt-1">KMU Cloud Database Integration: Verified Security Nodes</div>
          </div>
        </div>
        <div className="flex gap-2">
          <span className="px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded text-xs font-mono text-[#ebd19d]">Academic Level 5 Access Granted</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Sidebar Tabs */}
        <div className="bg-white border border-gray-200 rounded p-4 shadow-sm space-y-1">
          <div className="text-[10px] font-mono text-gray-400 font-bold uppercase tracking-wider mb-2 px-2">Console Operations</div>
          <button 
            onClick={() => setActiveSection('dashboard')}
            className={`w-full text-left py-2.5 px-3 text-xs font-medium rounded transition-colors ${activeSection === 'dashboard' ? 'bg-[#142d4a] text-[#C5A059]' : 'text-gray-700 hover:bg-gray-100'}`}
          >
            📊 Operational Dashboard
          </button>
          <button 
            onClick={() => setActiveSection('notices')}
            className={`w-full text-left py-2.5 px-3 text-xs font-medium rounded transition-colors ${activeSection === 'notices' ? 'bg-[#142d4a] text-[#C5A059]' : 'text-gray-700 hover:bg-gray-100'}`}
          >
            📢 Notice board Manager ({notices.length})
          </button>
          <button 
            onClick={() => setActiveSection('events')}
            className={`w-full text-left py-2.5 px-3 text-xs font-medium rounded transition-colors ${activeSection === 'events' ? 'bg-[#142d4a] text-[#C5A059]' : 'text-gray-700 hover:bg-gray-100'}`}
          >
            📅 Event Planner Calendar ({events.length})
          </button>
          <button 
            onClick={() => setActiveSection('seo')}
            className={`w-full text-left py-2.5 px-3 text-xs font-medium rounded transition-colors ${activeSection === 'seo' ? 'bg-[#142d4a] text-[#C5A059]' : 'text-gray-700 hover:bg-gray-100'}`}
          >
            🌐 SEO & Campus Branding
          </button>
          <button 
            onClick={() => setActiveSection('vips')}
            className={`w-full text-left py-2.5 px-3 text-xs font-medium rounded transition-colors ${activeSection === 'vips' ? 'bg-[#142d4a] text-[#C5A059]' : 'text-gray-700 hover:bg-gray-100'}`}
          >
            🎖️ VIP Guest Board ({vipGuests.length})
          </button>
          <button 
            onClick={() => setActiveSection('gallery')}
            className={`w-full text-left py-2.5 px-3 text-xs font-medium rounded transition-colors ${activeSection === 'gallery' ? 'bg-[#142d4a] text-[#C5A059]' : 'text-gray-700 hover:bg-gray-100'}`}
          >
            📸 Campus Photo & Gallery ({campusSpots.length})
          </button>
        </div>

        {/* Dynamic content */}
        <div className="lg:col-span-3 bg-white border border-gray-200 rounded p-6 shadow-sm min-h-[400px]">
          
          {/* Operations Dashboard */}
          {activeSection === 'dashboard' && (
            <div className="space-y-6">
              <h3 className="text-lg font-serif font-bold text-[#0B2240] border-b border-gray-100 pb-2">Institutional Analytics Overview</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-center">
                <div className="border border-gray-200 p-4 rounded shadow-sm">
                  <div className="text-gray-400 text-[9px] font-mono uppercase font-bold mb-1">VIP Guest Registry</div>
                  <div className="text-2xl font-black text-[#0B2240]">{vipGuests.length}</div>
                  <span className="text-[10px] text-gray-500 font-mono">Dignitaries Log</span>
                </div>
                <div className="border border-gray-200 p-4 rounded shadow-sm">
                  <div className="text-gray-400 text-[9px] font-mono uppercase font-bold mb-1">Campus Spot Photos</div>
                  <div className="text-2xl font-black text-[#0B2240]">{campusSpots.length}</div>
                  <span className="text-[10px] text-gray-500 font-mono">Interactive Cards</span>
                </div>
                <div className="border border-gray-200 p-4 rounded shadow-sm">
                  <div className="text-gray-400 text-[9px] font-mono uppercase font-bold mb-1">Published Notices</div>
                  <div className="text-2xl font-black text-green-700">{notices.length}</div>
                  <span className="text-[10px] text-gray-400 font-mono">Active bulletins</span>
                </div>
                <div className="border border-gray-200 p-4 rounded shadow-sm">
                  <div className="text-gray-400 text-[9px] font-mono uppercase font-bold mb-1">Events Cataloged</div>
                  <div className="text-2xl font-black text-[#C5A059]">{events.length}</div>
                  <span className="text-[10px] text-gray-400 font-mono">Upcoming agendas</span>
                </div>
              </div>

              {/* Status Alert logs representing physical servers */}
              <div className="border border-gray-200 p-4 bg-[#FAFBF9] rounded text-xs space-y-2">
                <h4 className="font-bold text-gray-900 flex items-center gap-1">
                  <AlertTriangle className="h-4.5 w-4.5 text-[#C5A059]" />
                  Internal Infrastructure Signals
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-[10px] text-gray-600 mt-2">
                  <div className="flex justify-between border-b pb-1">
                    <span>Vite Reverse Proxy:</span>
                    <span className="text-green-700 font-bold">PORT 3000 LIVE</span>
                  </div>
                  <div className="flex justify-between border-b pb-1">
                    <span>Gemini Core Models:</span>
                    <span className="text-green-700 font-bold">GEMINI 2.5 ACTIVE</span>
                  </div>
                  <div className="flex justify-between border-b pb-1">
                    <span>State Persistance:</span>
                    <span className="text-[#C5A059] font-bold">LOCALSTORAGE CACHED</span>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* Notice Board Manager */}
          {activeSection === 'notices' && (
            <div className="space-y-6">
              <h3 className="text-lg font-serif font-bold text-[#0B2240] border-b border-gray-100 pb-2">Publish notices to Digital Boards</h3>
              
              {noticeSuccess && (
                <div className="p-3 bg-green-50 text-green-800 border border-green-200 rounded text-xs font-semibold">
                  Notice feed transmitted. Real-time ticker and home board notice cards refreshed.
                </div>
              )}

              <form onSubmit={handleNoticeSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-gray-500 uppercase font-mono font-bold text-[9px]">Select Board Category</label>
                    <select 
                      value={noticeCategory} 
                      onChange={(e) => setNoticeCategory(e.target.value as any)} 
                      className="w-full border border-gray-300 rounded p-2.5 bg-gray-50 focus:outline-none focus:border-[#C5A059]"
                    >
                      <option value="general">General Campus Notice</option>
                      <option value="academic">Academic / Syllabus Announcements</option>
                      <option value="placements">Placements & Drives Alerts</option>
                      <option value="exams">Examination Schedule Bulletins</option>
                    </select>
                  </div>
                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="text-gray-500 uppercase font-mono font-bold text-[9px]">Header Title Heading</label>
                    <input 
                      type="text" 
                      required 
                      value={noticeTitle}
                      onChange={(e) => setNoticeTitle(e.target.value)}
                      placeholder="e.g. Schedule for Practical Labs Clearance" 
                      className="w-full border border-gray-300 rounded p-2.5 bg-gray-50 focus:outline-none" 
                    />
                  </div>
                </div>
                
                <div className="space-y-1.5">
                  <label className="text-gray-500 uppercase font-mono font-bold text-[9px]">Notice transcript contents</label>
                  <textarea 
                    required 
                    rows={4}
                    value={noticeContent}
                    onChange={(e) => setNoticeContent(e.target.value)}
                    placeholder="Provide full text, contacts of nodal dean officers..." 
                    className="w-full border border-gray-300 rounded p-2.5 bg-gray-50 focus:outline-none"
                  ></textarea>
                </div>

                <div className="flex items-center gap-2">
                  <input 
                    type="checkbox" 
                    id="noteImp" 
                    checked={noticeImportant} 
                    onChange={(e) => setNoticeImportant(e.target.checked)} 
                    className="h-4 w-4 bg-gray-50 border border-gray-300 rounded"
                  />
                  <label htmlFor="noteImp" className="text-gray-600 font-semibold select-none cursor-pointer">Flag as Highly Important Notice (forces flash on Homepage banner)</label>
                </div>

                <button 
                  type="submit" 
                  className="bg-[#0B2240] hover:bg-[#11315a] border border-[#C5A059] text-white py-2.5 px-6 rounded text-xs font-bold uppercase tracking-wider"
                >
                  Publish Notice
                </button>
              </form>

              {/* Notice boards deletes ledger */}
              <div className="space-y-2 mt-8">
                <h4 className="font-bold text-xs text-gray-400 font-mono uppercase tracking-wider">Active Published Notice registries</h4>
                <div className="space-y-2.5 max-h-[250px] overflow-y-auto pr-1">
                  {notices.map(note => (
                    <div key={note.id} className="border border-gray-200 p-3.1 bg-[#FAFBF9] rounded text-xs flex justify-between items-center gap-4">
                      <div>
                        {note.important && <span className="text-red-600 font-bold mr-1.5 font-mono text-[9px] border border-red-200 bg-red-50 py-0.5 px-1.5 rounded uppercase">CRITICAL</span>}
                        <strong className="text-gray-900 font-semibold">{note.title}</strong>
                        <span className="text-gray-400 font-mono text-[10px] block mt-0.5">Category: {note.category} • {note.date}</span>
                      </div>
                      <button 
                        onClick={() => deleteNotice(note.id)}
                        className="p-1 text-red-500 hover:text-red-700 bg-red-50 border border-red-100 hover:scale-105 transition-all rounded"
                        title="Delete Notice Registry"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Event manager */}
          {activeSection === 'events' && (
            <div className="space-y-6">
              <h3 className="text-lg font-serif font-bold text-[#0B2240] border-b border-gray-100 pb-2">Institutional Event Coordinator</h3>
              
              {eventSuccess && (
                <div className="p-3 bg-green-50 text-green-800 border border-green-200 rounded text-xs font-semibold">
                  Campus event cataloged. Reflected inside Homepage Event calendars immediately.
                </div>
              )}

              <form onSubmit={handleEventSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-gray-500 uppercase font-mono font-bold text-[9px]">Event Nature Type</label>
                    <select 
                      value={eventType} 
                      onChange={(e) => setEventType(e.target.value as any)}
                      className="w-full border border-gray-300 rounded p-2.5 bg-gray-50 focus:outline-none"
                    >
                      <option value="seminar">Medical / Scientific Seminar</option>
                      <option value="sports">Athletic Championships</option>
                      <option value="academic">Academic Lectures / Orientation</option>
                      <option value="webinar">Virtual Technology Webinars</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-gray-500 uppercase font-mono font-bold text-[9px]">Scheduled date</label>
                    <input 
                      type="date" 
                      required 
                      value={eventDate}
                      onChange={(e) => setEventDate(e.target.value)}
                      className="w-full border border-gray-300 rounded p-2.5 bg-gray-50 focus:outline-none" 
                    />
                  </div>
                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="text-gray-500 uppercase font-mono font-bold text-[9px]">Center Venue Location</label>
                    <input 
                      type="text" 
                      required 
                      value={eventLocation}
                      onChange={(e) => setEventLocation(e.target.value)}
                      placeholder="e.g. Shanti Devi Medical Labs Block 2" 
                      className="w-full border border-gray-300 rounded p-2.5 bg-gray-50 focus:outline-none" 
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-gray-500 uppercase font-mono font-bold text-[9px]">Academic Event Heading</label>
                  <input 
                    type="text" 
                    required 
                    value={eventTitle}
                    onChange={(e) => setEventTitle(e.target.value)}
                    placeholder="e.g. International Clinicians Congress 2026 on Coronary Science" 
                    className="w-full border border-gray-300 rounded p-2.5 bg-gray-50 focus:outline-none" 
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-gray-500 uppercase font-mono font-bold text-[9px]">Abstract Details</label>
                  <textarea 
                    required 
                    rows={4}
                    value={eventDesc}
                    onChange={(e) => setEventDesc(e.target.value)}
                    placeholder="Brief agenda about participating clinicians, required registrations..." 
                    className="w-full border border-gray-300 rounded p-2.5 bg-gray-50 focus:outline-none"
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  className="bg-[#0B2240] hover:bg-[#11315a] border border-[#C5A059] text-white py-2.5 px-6 rounded text-xs font-bold uppercase tracking-wider"
                >
                  Publish Campus Event
                </button>
              </form>

              {/* Listing deletion */}
              <div className="space-y-2 mt-8">
                <h4 className="font-bold text-xs text-gray-400 font-mono uppercase tracking-wider">Scheduled Campus Events Ledger</h4>
                <div className="space-y-2.5 max-h-[250px] overflow-y-auto pr-1">
                  {events.map((ev) => (
                    <div key={ev.id} className="border border-gray-200 p-3 bg-[#FAFBF9] rounded text-xs flex justify-between items-center gap-4">
                      <div>
                        <strong className="text-gray-900 font-semibold">{ev.title}</strong>
                        <span className="text-gray-400 font-mono text-[10px] block mt-0.5">Location: {ev.location} | Date: {ev.date} ({ev.registrantsCount} registered)</span>
                      </div>
                      <button 
                        onClick={() => deleteEvent(ev.id)}
                        className="p-1 text-red-500 hover:text-red-700 bg-red-50 border border-red-100 hover:scale-105 transition-all rounded"
                        title="Cancel Campus Event"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* SEO Metadata Settings */}
          {activeSection === 'seo' && (
            <div className="space-y-6">
              <h3 className="text-lg font-serif font-bold text-[#0B2240] border-b border-gray-100 pb-2">SEO Compliance and Search Visibility Console</h3>
              <p className="text-xs text-gray-600">Simulate tuning HTML metadata definitions and search robots indexation parameters to drive organic search admissions traffic under Google indexation algorithms.</p>

              {seoSuccess && (
                <div className="p-3 bg-green-50 text-green-800 border border-green-200 rounded text-xs font-semibold">
                  HTML Meta attributes optimized for Google indexation. Web caching directories purged.
                </div>
              )}

              <form onSubmit={handleSeoSave} className="space-y-4 text-xs">
                <div className="space-y-1.5">
                  <label className="text-gray-500 uppercase font-mono font-bold text-[9px] block">Global HTML Document Title Element ({siteTitle.length} chars)</label>
                  <input 
                    type="text" 
                    required 
                    value={siteTitle}
                    onChange={(e) => setSiteTitle(e.target.value)}
                    className="w-full border border-gray-300 rounded p-2.5 bg-gray-50 focus:outline-[#C5A059] focus:outline-1 focus:border-transparent font-mono text-[11px]" 
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-gray-500 uppercase font-mono font-bold text-[9px] block">Meta Description elements ({siteMeta.length} chars)</label>
                  <textarea 
                    required 
                    rows={4}
                    value={siteMeta}
                    onChange={(e) => setSiteMeta(e.target.value)}
                    className="w-full border border-gray-300 rounded p-2.5 bg-gray-50 focus:outline-[#C5A059] focus:outline-1 focus:border-transparent font-mono text-[11px]"
                  ></textarea>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-gray-100 pt-4">
                  <div className="space-y-1.5">
                    <label className="text-gray-500 uppercase font-mono font-bold text-[9px] block">Indexation Robots directiv</label>
                    <select className="border border-gray-300 p-2 text-xs rounded w-full bg-gray-50 focus:outline-none">
                      <option>index, follow, max-image-preview:large</option>
                      <option>noindex, nofollow (maintenance mode)</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-gray-500 uppercase font-mono font-bold text-[9px] block">Google Analytics G-ID</label>
                    <input type="text" defaultValue="G-KMUMATHURA2026" className="border border-gray-300 p-2 text-xs rounded w-full bg-gray-50 focus:outline-none" />
                  </div>
                </div>

                <button 
                  type="submit" 
                  className="bg-[#0B2240] hover:bg-[#142d4a] border border-[#C5A059] text-[#ebd19d] py-2.5 px-6 rounded text-xs font-bold uppercase tracking-wider"
                >
                  Save and Refresh Site Index
                </button>
              </form>
            </div>
          )}

          {/* VIP Guest Board Manager */}
          {activeSection === 'vips' && (
            <div className="space-y-6">
              <h3 className="text-lg font-serif font-bold text-[#0B2240] border-b border-gray-100 pb-2">
                {editingVipId ? '✏️ Edit VIP Dignitary Record' : '🎓 Institutional VIP Guest Board'}
              </h3>

              {vipSuccessMsg && (
                <div className="p-3 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded text-xs font-semibold animate-pulse">
                  VIP registry database updated. Static guest logs refreshed on client systems.
                </div>
              )}

              <form onSubmit={handleVIPSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-gray-500 uppercase font-mono font-bold text-[9px]">Dignitary Name</label>
                    <input 
                      type="text" 
                      required 
                      value={vipName}
                      onChange={(e) => setVipName(e.target.value)}
                      placeholder="Shri Yogi Adityanath" 
                      className="w-full border border-gray-300 rounded p-2.5 bg-gray-50 focus:outline-[#C5A059] focus:outline-1" 
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-gray-500 uppercase font-mono font-bold text-[9px]">Official Title Designation</label>
                    <input 
                      type="text" 
                      required 
                      value={vipTitle}
                      onChange={(e) => setVipTitle(e.target.value)}
                      placeholder="Hon'ble Chief Minister, UP" 
                      className="w-full border border-gray-300 rounded p-2.5 bg-gray-50 focus:outline-[#C5A059] focus:outline-1" 
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-gray-500 uppercase font-mono font-bold text-[9px]">Dignity Category</label>
                    <select 
                      value={vipCategory} 
                      onChange={(e) => setVipCategory(e.target.value as any)} 
                      className="w-full border border-gray-300 rounded p-2.5 bg-gray-50 focus:outline-[#C5A059] focus:outline-1"
                    >
                      <option value="government">🏛️ Government & State</option>
                      <option value="industry">💼 Enterprise & Industry</option>
                      <option value="academia">🔬 Science & Academician</option>
                      <option value="spiritual">✨ Spiritual & Cultural Leaders</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-gray-500 uppercase font-mono font-bold text-[9px]">Visit Date Coordinate</label>
                    <input 
                      type="date" 
                      required 
                      value={vipVisitDate}
                      onChange={(e) => setVipVisitDate(e.target.value)}
                      className="w-full border border-gray-300 rounded p-2.5 bg-gray-50 focus:outline-[#C5A059] focus:outline-1" 
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-gray-500 uppercase font-mono font-bold text-[9px]">Occasion Event Name</label>
                    <input 
                      type="text" 
                      required 
                      value={vipEvent}
                      onChange={(e) => setVipEvent(e.target.value)}
                      placeholder="Flagship Hospital Inaugration" 
                      className="w-full border border-gray-300 rounded p-2.5 bg-gray-50 focus:outline-[#C5A059] focus:outline-1" 
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-gray-500 uppercase font-mono font-bold text-[9px]">Hosting Department</label>
                    <input 
                      type="text" 
                      required 
                      value={vipHost}
                      onChange={(e) => setVipHost(e.target.value)}
                      placeholder="School of Medical Sciences" 
                      className="w-full border border-gray-300 rounded p-2.5 bg-gray-50 focus:outline-[#C5A059] focus:outline-1" 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5 flex flex-col justify-end">
                    <label className="text-gray-500 uppercase font-mono font-bold text-[9px] block">Portrait Photo Link / Image URL</label>
                    <input 
                      type="url" 
                      value={vipImageUrl}
                      onChange={(e) => setVipImageUrl(e.target.value)}
                      placeholder="https://images.unsplash.com/photo-..." 
                      className="w-full border border-gray-300 rounded p-2.5 bg-gray-50 focus:outline-[#C5A059] focus:outline-1 font-mono text-[11px]" 
                    />
                  </div>
                  <div className="space-y-1.5 flex flex-col justify-end">
                    <label className="text-gray-500 uppercase font-mono font-bold text-[9px] block">Or Select Local Image File to Upload</label>
                    <div className="flex items-center gap-2">
                      <input 
                        type="file" 
                        accept="image/*"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const res = await uploadFile(file);
                            if (res.success && res.url) {
                              setVipImageUrl(res.url);
                            } else {
                              alert(res.msg || "Image upload failed");
                            }
                          }
                        }}
                        className="w-full border border-gray-300 rounded p-2 bg-gray-50 text-[10.5px] focus:outline-[#C5A059] focus:outline-1 font-mono"
                      />
                      {vipImageUrl && (
                        <div className="h-10 w-10 shrink-0 border border-[#C5A059] rounded overflow-hidden bg-gray-100 flex items-center justify-center">
                          <img src={vipImageUrl} className="h-full w-full object-cover" alt="Preview Thumbnail" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-gray-500 uppercase font-mono font-bold text-[9px]">Dignitary Message Quote Testimony</label>
                  <input 
                    type="text" 
                    required 
                    value={vipQuote}
                    onChange={(e) => setVipQuote(e.target.value)}
                    placeholder="'Highly impressed by the tertiary clinical setups.'" 
                    className="w-full border border-gray-300 rounded p-2.5 bg-gray-50 focus:outline-[#C5A059] focus:outline-1" 
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-gray-500 uppercase font-mono font-bold text-[9px]">Visit Highlights / Key Points (One item per line)</label>
                  <textarea 
                    rows={3}
                    value={vipHighlights}
                    onChange={(e) => setVipHighlights(e.target.value)}
                    placeholder="Inaugrated 150 Bed Cardiac Wing&#10;Interacted with clinical research fellows&#10;Addressed public congregation in K.D. complex"
                    className="w-full border border-gray-300 rounded p-2.5 bg-gray-50 focus:outline-[#C5A059] focus:outline-1 font-sans"
                  ></textarea>
                </div>

                <div className="flex gap-2.5">
                  <button 
                    type="submit" 
                    className="bg-[#0B2240] hover:bg-[#142d4a] border border-[#C5A059] text-[#ecd599] py-2 px-6 rounded text-xs font-bold uppercase tracking-wider"
                  >
                    {editingVipId ? '💾 Save VIP Changes' : '➕ Add VIP Record'}
                  </button>
                  {editingVipId && (
                    <button 
                      type="button" 
                      onClick={() => {
                        setEditingVipId(null);
                        setVipName('');
                        setVipTitle('');
                        setVipQuote('');
                        setVipEvent('');
                        setVipHost('');
                        setVipImageUrl('');
                        setVipHighlights('');
                      }}
                      className="bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded text-xs font-semibold uppercase tracking-wider"
                    >
                      Cancel Edit
                    </button>
                  )}
                </div>
              </form>

              {/* VIP Guests List Table */}
              <div className="space-y-3 pt-6 border-t border-gray-150">
                <h4 className="font-bold text-xs text-gray-400 font-mono uppercase tracking-wider">Active VIP Registry Ledger</h4>
                <div className="space-y-2 max-h-[350px] overflow-y-auto">
                  {vipGuests.map(vip => (
                    <div key={vip.id} className="border border-gray-100 p-3.5 bg-gray-50 hover:bg-white transition-colors rounded flex gap-4 items-center justify-between">
                      <div className="flex gap-3.5 items-center">
                        <img 
                          src={vip.photoUrl} 
                          alt={vip.name} 
                          referrerPolicy="no-referrer"
                          className="h-11 w-11 rounded-full object-cover border border-[#C5A059] shadow-sm shrink-0" 
                        />
                        <div>
                          <strong className="text-[#0B2240] text-sm font-serif font-bold">{vip.name}</strong>
                          <span className="text-[10px] text-gray-500 font-mono block">{vip.title}</span>
                          <span className="text-[10px] text-[#C5A059] font-mono block mt-0.5">Visited: {vip.visitDate} for {vip.event}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => startEditVIP(vip)}
                          className="px-2.5 py-1 text-xs text-blue-705 font-bold bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded animate-none"
                        >
                          Modify
                        </button>
                        <button 
                          onClick={() => deleteVIPGuest(vip.id)}
                          className="p-1 text-red-500 hover:text-red-700 bg-red-50 border border-red-100 rounded"
                          title="Delete Dignitary Profile"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Campus Photo & Gallery Manager */}
          {activeSection === 'gallery' && (
            <div className="space-y-6">
              <h3 className="text-lg font-serif font-bold text-[#0B2240] border-b border-gray-100 pb-2">
                {editingSpotId ? '✏️ Edit Campus Area Photo Spot' : '📸 Physical Campus Area Photo Spots'}
              </h3>

              {spotSuccessMsg && (
                <div className="p-3 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded text-xs font-semibold animate-pulse">
                  Campus visual gallery updated. Dynamic maps and drone panels refreshed.
                </div>
              )}

              <form onSubmit={handleSpotSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-gray-500 uppercase font-mono font-bold text-[9px]">Campus Spot Area Name</label>
                    <input 
                      type="text" 
                      required 
                      value={spotName}
                      onChange={(e) => setSpotName(e.target.value)}
                      placeholder="Shanti Devi Biotech Block" 
                      className="w-full border border-gray-300 rounded p-2.5 bg-gray-50 focus:outline-[#C5A059] focus:outline-1" 
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-gray-500 uppercase font-mono font-bold text-[9px]">Interactive Category</label>
                    <select 
                      value={spotCategory} 
                      onChange={(e) => setSpotCategory(e.target.value as any)} 
                      className="w-full border border-gray-300 rounded p-2.5 bg-gray-50 focus:outline-[#C5A059] focus:outline-1"
                    >
                      <option value="academic">📘 Academic Blocks</option>
                      <option value="clinical">🏥 Clinical & Hospital</option>
                      <option value="hub">🏛️ Central Hub & Library</option>
                      <option value="life">⚡ Student Hostels & Living</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-gray-500 uppercase font-mono font-bold text-[9px]">Analytics Focus Metric Stat</label>
                    <input 
                      type="text" 
                      required 
                      value={spotStat}
                      onChange={(e) => setSpotStat(e.target.value)}
                      placeholder="1,200+ Dual-core CPU units" 
                      className="w-full border border-gray-300 rounded p-2.5 bg-gray-50 focus:outline-[#C5A059] focus:outline-1" 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-gray-500 uppercase font-mono font-bold text-[9px]">Map Coordinate X Coordinate (Percentage left 0-100)</label>
                    <input 
                      type="number" 
                      required 
                      min={0}
                      max={100}
                      value={spotCoordX}
                      onChange={(e) => setSpotCoordX(Number(e.target.value) || 0)}
                      className="w-full border border-gray-300 rounded p-2.5 bg-gray-50 focus:outline-[#C5A059] focus:outline-1" 
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-gray-500 uppercase font-mono font-bold text-[9px]">Map Coordinate Y Coordinate (Percentage top 0-100)</label>
                    <input 
                      type="number" 
                      required 
                      min={0}
                      max={100}
                      value={spotCoordY}
                      onChange={(e) => setSpotCoordY(Number(e.target.value) || 0)}
                      className="w-full border border-gray-300 rounded p-2.5 bg-gray-50 focus:outline-[#C5A059] focus:outline-1" 
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-gray-500 uppercase font-mono font-bold text-[9px]">Campus Spot Landscape Image URL</label>
                  <input 
                    type="url" 
                    value={spotImageUrl}
                    onChange={(e) => setSpotImageUrl(e.target.value)}
                    placeholder="https://images.unsplash.com/photo-..." 
                    className="w-full border border-gray-300 rounded p-2.5 bg-gray-50 focus:outline-[#C5A059] focus:outline-1 font-mono text-[11px]" 
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-gray-500 uppercase font-mono font-bold text-[9px]">Brief Description / Strategic Value</label>
                  <textarea 
                    required
                    rows={3}
                    value={spotDesc}
                    onChange={(e) => setSpotDesc(e.target.value)}
                    placeholder="Comprehensive description of the research labs, libraries..."
                    className="w-full border border-gray-300 rounded p-2.5 bg-gray-50 focus:outline-[#C5A059] focus:outline-1"
                  ></textarea>
                </div>

                <div className="space-y-1.5">
                  <label className="text-gray-500 uppercase font-mono font-bold text-[9px]">Specific Key Features List (One item per line)</label>
                  <textarea 
                    rows={3}
                    value={spotFeatures}
                    onChange={(e) => setSpotFeatures(e.target.value)}
                    placeholder="High-performance workstation cluster&#10;Industrial PLC panels&#10;Autonomous robot Assembly Lines"
                    className="w-full border border-gray-300 rounded p-2.5 bg-gray-50 focus:outline-[#C5A059] focus:outline-1 font-sans"
                  ></textarea>
                </div>

                <div className="flex gap-2.5">
                  <button 
                    type="submit" 
                    className="bg-[#0B2240] hover:bg-[#142d4a] border border-[#C5A059] text-[#ecd599] py-2 px-6 rounded text-xs font-bold uppercase tracking-wider"
                  >
                    {editingSpotId ? '💾 Save Spot Changes' : '➕ Create Spot Spot'}
                  </button>
                  {editingSpotId && (
                    <button 
                      type="button" 
                      onClick={() => {
                        setEditingSpotId(null);
                        setSpotName('');
                        setSpotDesc('');
                        setSpotImageUrl('');
                        setSpotStat('');
                        setSpotFeatures('');
                      }}
                      className="bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded text-xs font-semibold uppercase tracking-wider"
                    >
                      Cancel Edit
                    </button>
                  )}
                </div>
              </form>

              {/* Photo spots list table */}
              <div className="space-y-3 pt-6 border-t border-gray-150">
                <h4 className="font-bold text-xs text-gray-400 font-mono uppercase tracking-wider">Active Campus Area Map Pins</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {campusSpots.map(spot => (
                    <div key={spot.id} className="border border-gray-200 p-2.5 bg-gray-50 rounded flex gap-3.5 items-start">
                      <img 
                        src={spot.imageUrl} 
                        alt={spot.name} 
                        referrerPolicy="no-referrer"
                        className="h-16 w-24 rounded object-cover border" 
                      />
                      <div className="flex-1 space-y-1 min-w-0">
                        <strong className="text-xs text-gray-900 block truncate font-sans font-bold">{spot.name}</strong>
                        <span className="text-[10px] text-[#C5A059] font-mono block">X: {spot.coordinateX}% | Y: {spot.coordinateY}%</span>
                        <span className="text-[10px] text-gray-500 font-mono block italic">{spot.stat}</span>
                        <div className="flex gap-2 pt-1 font-sans">
                          <button 
                            type="button"
                            onClick={() => startEditSpot(spot)}
                            className="text-[10.5px] text-blue-700 font-bold bg-blue-50 border border-blue-150 px-2 py-0.5 rounded"
                          >
                            Edit Spot
                          </button>
                          <button 
                            type="button"
                            onClick={() => deleteCampusSpot(spot.id)}
                            className="text-[10.5px] text-red-700 font-bold bg-red-50 border border-red-150 px-2 py-0.5 rounded"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
