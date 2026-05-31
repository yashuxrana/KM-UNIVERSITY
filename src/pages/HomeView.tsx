/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { usePortal } from '../context/PortalContext';
import { VirtualTour } from '../components/VirtualTour';
import campusImage from '../assets/images/regenerated_image_1780225455118.jpg';
import { 
  Award, 
  BookOpen, 
  Building2, 
  Globe, 
  MapPin, 
  Phone, 
  Mail, 
  TrendingUp, 
  Users, 
  Calendar, 
  ArrowRight,
  ShieldAlert,
  ChevronRight,
  Sparkles,
  ClipboardList
} from 'lucide-react';

interface HomeViewProps {
  setCurrentTab: (tab: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ setCurrentTab }) => {
  const { notices, placementStats, events, registerForEvent, loginAs, currentUser } = usePortal();
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryEmail, setInquiryEmail] = useState('');
  const [inquirySchool, setInquirySchool] = useState('School of Medical Sciences');
  const [inquiryDegree, setInquiryDegree] = useState('Under-Graduate (MBBS/B.Tech/BDS/B.Pharm)');
  const [inquiryText, setInquiryText] = useState('');
  const [inquirySuccess, setInquirySuccess] = useState(false);
  const [whatsAppUrl, setWhatsAppUrl] = useState('');

  const [activeShortcutTab, setActiveShortcutTab] = useState(true);

  const triggerStaffLoginDirect = () => {
    loginAs('staff');
    setCurrentTab('staff-portal');
  };

  const triggerAdminLoginDirect = () => {
    loginAs('admin');
    setCurrentTab('admin-portal');
  };

  const importantNotice = notices.find(n => n.important);

  const schools = [
    { name: 'School of Medical Sciences', decs: 'Under the flagship K.D. Medical Hospital offering advanced MBBS, MD & specialized clinical research.' },
    { name: 'School of Dental Sciences', decs: 'Top accredited BDS/MDS labs with active clinics servicing 200+ local patients daily.' },
    { name: 'School of Pharmacy', decs: 'Approved by PCI, conducting deep biochemical syntheses and formulation projects.' },
    { name: 'School of Nursing & Allied Health', decs: 'Essential professional health training with integrated on-hospital diagnostic learning.' },
    { name: 'School of Engineering & Technology', decs: 'Premier computer engineering with curriculum co-designed by leading cloud developers.' },
    { name: 'School of Management & Commerce', decs: 'Developing industrial managers with specialized accounting & analytics programs.' },
    { name: 'School of Law', decs: 'Moot courts, clinical legal studies, and guidance from legal leaders.' },
    { name: 'School of Agricultural Sciences', decs: 'Researching crop analytics, organic bio-fertilizer synthesis, and micro-climate yields.' }
  ];

  const upcomingEvents = events.slice(0, 3);

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryName || !inquiryEmail || !inquiryText) return;

    // Build the academic inquiry message text for WhatsApp transmission
    const messageBody = `Hello KM University Admissions Team,

I would like to make an academic admissions inquiry with the following details:
• *Name:* ${inquiryName}
• *Email:* ${inquiryEmail}
• *Target School:* ${inquirySchool}
• *Degree Seeking:* ${inquiryDegree}
• *Query Details:* ${inquiryText}

Please guide me with the enrollment procedures and intake criteria for the academic term. Thank you!`;

    const encodedText = encodeURIComponent(messageBody);
    const waLink = `https://wa.me/919756664320?text=${encodedText}`;
    setWhatsAppUrl(waLink);

    // Attempt to open WhatsApp immediately in a secure new tab
    try {
      window.open(waLink, '_blank', 'noopener,noreferrer');
    } catch (err) {
      console.warn('Redirect blocked by browser sandbox/iframe security. Direct manual click fallback activated.', err);
    }

    setInquirySuccess(true);
  };

  return (
    <div id="home-view-root" className="bg-[#FAF9F5] text-gray-800">
      

      
      {/* 1. Hero Section & Notice Ticker */}
      <section className="relative bg-[#051121] py-20 lg:py-32 overflow-hidden border-b-[4px] border-[#C5A059]">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=1920" 
            referrerPolicy="no-referrer"
            alt="KMU Campus View" 
            className="w-full h-full object-cover opacity-25 object-center scale-[105%]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#051121] via-[#051121]/90 to-transparent"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-8 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#C5A059]/10 border border-[#C5A059]/40 rounded-full">
              <Sparkles className="h-3.5 w-3.5 text-[#C5A059]" />
              <span className="text-[10px] sm:text-xs font-mono font-bold tracking-widest text-[#ebd19d] uppercase">KMU Admissions 2026 Open</span>
            </div>
            
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-black text-white leading-[1.1] tracking-tight">
              Elearning • Excellence • Empowerment
            </h1>
            
            <p className="text-sm sm:text-base text-gray-300 max-w-2xl font-serif leading-relaxed">
              KM University, Mathura represents pristine standards of global academic leadership. Home to the leading **K.D. Medical & Dental Clinical Centers**, we synthesize rigorous scientific intelligence, traditional ethics, and industry-synced engineering paradigms.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <button 
                id="apply-whatsapp-btn"
                onClick={() => {
                  const message = "Hello KM University Admissions Desk, I would like to inquire about the online admission procedures, courses, and seat availability for the 2026 academic term. Please help me register.";
                  const encodedText = encodeURIComponent(message);
                  const waLink = `https://wa.me/919756664320?text=${encodedText}`;
                  
                  // Primary redirect in a new window/tab
                  const newWindow = window.open(waLink, '_blank', 'noopener,noreferrer');
                  
                  // Immediate fallback to parent/current window redirect in case iframes/popup-blockers intercept it
                  if (!newWindow) {
                    window.location.href = waLink;
                  }
                }}
                className="bg-[#C5A059] hover:bg-[#ebd19d] text-[#051121] px-6 py-3 rounded text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shadow-lg cursor-pointer"
              >
                Apply Online
                <ArrowRight className="h-4 w-4" />
              </button>
              <button 
                onClick={() => setCurrentTab('schools')}
                className="bg-transparent hover:bg-white/5 text-white border border-white/60 hover:border-white px-6 py-3 rounded text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
              >
                Academic Curriculums
              </button>
            </div>
          </div>

          {/* Quick Notice Widget inside Hero */}
          {importantNotice && (
            <div className="lg:col-span-4 bg-[#0B2240]/90 backdrop-blur-md rounded border border-[#C5A059]/30 p-5 shadow-2xl">
              <div className="flex items-center gap-2 text-red-400 font-mono text-[10px] font-bold tracking-widest uppercase mb-2">
                <ShieldAlert className="h-4 w-4 shrink-0" />
                Urgent notice
              </div>
              <h3 className="text-sm font-serif font-bold text-white mb-2 leading-snug">{importantNotice.title}</h3>
              <p className="text-xs text-gray-300 line-clamp-3 mb-4 leading-relaxed">{importantNotice.content}</p>
              <button 
                onClick={() => setCurrentTab('events-news')}
                className="text-[#C5A059] hover:text-[#ebd19d] text-xs font-semibold flex items-center gap-1 transition-colors"
              >
                Access Digital Notice Board
                <ChevronRight className="h-3 w-3" />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* 2. University Overview block */}
      <section className="py-16 bg-[#FAF9F5] border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-5 relative">
              <div className="absolute -top-4 -left-4 w-24 h-24 border-t-2 border-l-2 border-[#C5A059] opacity-40"></div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-2 border-r-2 border-[#C5A059] opacity-40"></div>
              <img 
                src={campusImage}
                referrerPolicy="no-referrer"
                alt="Institutional Pride" 
                className="w-full rounded shadow-xl border border-gray-300"
              />
            </div>

            <div className="lg:col-span-7 space-y-4">
              <span className="text-[10px] font-mono font-bold tracking-widest text-[#C5A059] uppercase block">A Legacy of Learning</span>
              <h2 className="text-3xl font-serif font-bold text-[#0B2240] tracking-tight">The KM University Experience</h2>
              <p className="text-xs text-gray-700 leading-relaxed">
                KM University, Mathura is established by the highly recognized Shanti Devi Charitable Trust with the mission to elevate secondary healthcare structures and high-value technical research in Uttar Pradesh and countrywide. 
              </p>
              <div className="h-0.5 w-16 bg-[#C5A059] my-4"></div>
              <p className="text-xs text-gray-600 italic">
                "Our campus, situated on the prestigious Mathura-Delhi road corridor, provides a peaceful, green environment optimal for rigorous studies, innovative clinical chemistry collaborations, and multi-sport training."
              </p>
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
                <div>
                  <div className="text-2xl font-serif font-black text-[#0B2240]">120+</div>
                  <div className="text-[10px] font-mono text-gray-500 uppercase tracking-wider">Expert Clinicians & Faculty</div>
                </div>
                <div>
                  <div className="text-2xl font-serif font-black text-[#0B2240]">3,500+</div>
                  <div className="text-[10px] font-mono text-gray-500 uppercase tracking-wider">Active Cohort Students</div>
                </div>
                <div>
                  <div className="text-2xl font-serif font-black text-[#0B2240]">14+</div>
                  <div className="text-[10px] font-mono text-gray-500 uppercase tracking-wider">National Accreditations</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4 & 5. Schools & Academic Programs */}
      <section id="schools" className="py-16 bg-[#FAF9F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <Building2 className="h-7 w-7 text-[#C5A059] mx-auto mb-3" />
            <h3 className="text-2xl font-serif font-bold text-[#0B2240] tracking-tight">Schools of KM University</h3>
            <p className="text-xs text-gray-500 font-mono">Specialized learning corridors staffed by top-tier researchers.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {schools.map((sch, idx) => (
              <div key={idx} className="bg-white border border-gray-200 rounded p-6 shadow-sm flex flex-col justify-between hover:border-[#C5A059] transition-colors">
                <div>
                  <h4 className="font-serif font-bold text-sm text-[#0B2240] mb-2">{sch.name}</h4>
                  <p className="text-xs text-gray-600 leading-relaxed">{sch.decs}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-gray-50 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-gray-400">UG, PG & Doctoral</span>
                  <button 
                    onClick={() => setCurrentTab('admission-portal')}
                    className="text-[#C5A059] hover:text-black text-[10px] font-bold tracking-wider uppercase flex items-center gap-0.5"
                  >
                    Enroll
                    <ChevronRight className="h-3 w-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* 9. Digital Notice Ledger */}
      <section className="py-16 bg-[#FAF9F5] border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-between border-b-2 border-[#C5A059] pb-4 mb-8">
              <h3 className="text-2xl font-serif font-bold text-[#0B2240]">Digital Notice Ledger</h3>
              <button 
                onClick={() => setCurrentTab('events-news')}
                className="text-xs bg-[#0B2240] text-white hover:bg-[#C5A059] hover:text-[#051121] px-4 py-2 rounded transition-colors uppercase font-mono font-bold"
              >
                View All Notices
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {notices.slice(0, 4).map((note) => (
                <div key={note.id} className="bg-white p-5 rounded border border-gray-200 shadow-sm relative overflow-hidden flex flex-col justify-between">
                  {note.important && <div className="absolute top-0 right-0 h-1.5 w-16 bg-red-600"></div>}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] bg-gray-100 text-[#0B2240] font-mono uppercase font-bold py-0.5 px-2 rounded-sm border border-gray-200">{note.category}</span>
                      <span className="text-[10px] font-mono text-gray-400">{note.date}</span>
                    </div>
                    <h4 className="text-sm font-serif font-bold text-gray-900 leading-snug">{note.title}</h4>
                    <p className="text-xs text-gray-600 leading-relaxed line-clamp-3">{note.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 8. Virtual Campus Tour Module */}
      <section className="py-12 bg-[#FAF9F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <VirtualTour />
        </div>
      </section>

      {/* 16. Inquiry & Interactive Contact Forms */}
      <section id="contact" className="py-16 bg-[#F1F1EC] border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            <div className="lg:col-span-5 space-y-6">
              <span className="text-[10px] font-mono font-bold tracking-widest text-[#C5A059] uppercase block">LIAISON HEADQUARTERS</span>
              <h3 className="text-2xl font-serif font-bold text-[#0B2240] tracking-tight">Get in Touch with Admissions</h3>
              <p className="text-xs text-gray-700 leading-relaxed">
                Contact our liaison desk for support, administrative inquiries, clinical training references, or scholarship review. Or visit our green mathura corridor directly under Delhi-NCR highways.
              </p>
              
              <div className="space-y-4 font-sans text-xs">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 bg-white border border-gray-300 rounded flex items-center justify-center text-[#C5A059] shadow-sm"><MapPin className="h-4 w-4" /></div>
                  <div>
                    <strong className="text-gray-900 block font-bold">KMU Mathura Campus</strong>
                    <span className="text-gray-600 block">Mathura-Delhi Road, NH-2, Uttar Pradesh-281001</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 bg-white border border-gray-300 rounded flex items-center justify-center text-[#C5A059] shadow-sm"><Phone className="h-4 w-4" /></div>
                  <div>
                    <strong className="text-gray-900 block font-bold">University Helpline</strong>
                    <span className="text-gray-600 block">+91- 9756664320</span>
                    <strong className="text-gray-900 block font-bold mt-1">Admission Enquiry</strong>
                    <span className="text-gray-600 block">+91- 9756664315</span>
                    <strong className="text-gray-900 block font-bold mt-1">City Office</strong>
                    <span className="text-gray-600 block">+91- 9756664314</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 bg-white border border-gray-300 rounded flex items-center justify-center text-[#C5A059] shadow-sm"><Mail className="h-4 w-4" /></div>
                  <div>
                    <strong className="text-gray-900 block font-bold">Email Contacts</strong>
                    <span className="text-gray-600 block">info@kmu.edu.in</span>
                    <span className="text-gray-600 block">admissions@kmu.edu.in</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 bg-white rounded border border-gray-200 p-8 shadow-sm">
              <h4 className="font-serif font-bold text-base text-[#0B2240] mb-4">Admissions & Syllabus Inquiry Form</h4>
              {inquirySuccess ? (
                <div className="bg-[#FAF9F5] border-2 border-dashed border-[#C5A059]/40 p-6 rounded text-center space-y-4">
                  <div className="space-y-1.5 text-[#0B2240]">
                    <div className="font-bold text-sm tracking-tight">✓ Inquire Token Configured & Compiled!</div>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      Your interest details are safely prepared. Click the button below to instantly transmit this query message to our Admissions Desk via WhatsApp.
                    </p>
                  </div>

                  <div className="p-3 bg-white border border-gray-200 rounded text-left font-mono text-[10px] text-gray-600 max-h-32 overflow-y-auto leading-relaxed shadow-inner">
                    <strong className="text-gray-800">Prepared message:</strong>
                    <div className="whitespace-pre-wrap mt-1">
                      {`Hello KM University Admissions Team,

I would like to make an academic admissions inquiry with the following details:
• Name: ${inquiryName}
• Email: ${inquiryEmail}
• Target School: ${inquirySchool}
• Degree Seeking: ${inquiryDegree}
• Query Details: ${inquiryText}`}
                    </div>
                  </div>
                  
                  <div className="pt-2 flex flex-col items-center gap-3">
                    <a 
                      href={whatsAppUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded text-xs uppercase tracking-wider inline-flex items-center justify-center gap-2 shadow-md transition-colors w-full sm:w-auto"
                    >
                      <svg className="h-4.5 w-4.5 fill-current shrink-0" viewBox="0 0 24 24">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.968C16.59 2.072 14.12 1.045 11.49 1.045c-5.44 0-9.866 4.372-9.87 9.802 0 1.96.516 3.868 1.5 5.575l-1.015 3.703 3.822-.988c1.62.884 3.186 1.347 4.72 1.347z"/>
                      </svg>
                      Send Inquiry on WhatsApp
                    </a>
                    
                    <button 
                      onClick={() => {
                        setInquiryName('');
                        setInquiryEmail('');
                        setInquiryText('');
                        setInquirySuccess(false);
                      }}
                      className="text-gray-500 hover:text-gray-800 text-[10px] uppercase font-mono tracking-wider underline cursor-pointer"
                    >
                      Reset Form & Write New Query
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleInquirySubmit} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-gray-600 font-semibold uppercase font-mono tracking-wide">Your Name</label>
                      <input 
                        type="text" 
                        required 
                        value={inquiryName} 
                        onChange={(e) => setInquiryName(e.target.value)}
                        placeholder="e.g. Aarav Singhal" 
                        className="w-full border border-gray-300 rounded px-3 py-2.5 bg-gray-50 focus:outline-none focus:border-[#C5A059]" 
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-gray-600 font-semibold uppercase font-mono tracking-wide">Your Email</label>
                      <input 
                        type="email" 
                        required 
                        value={inquiryEmail}
                        onChange={(e) => setInquiryEmail(e.target.value)}
                        placeholder="e.g. aarav@gmail.com" 
                        className="w-full border border-gray-300 rounded px-3 py-2.5 bg-gray-50 focus:outline-none focus:border-[#C5A059]" 
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-gray-600 font-semibold uppercase font-mono tracking-wide">Target School</label>
                      <select 
                        value={inquirySchool} 
                        onChange={(e) => setInquirySchool(e.target.value)}
                        className="w-full border border-gray-300 rounded px-3 py-2.5 bg-gray-50 focus:outline-none focus:border-[#C5A059]"
                      >
                        {schools.map((s, idx) => <option key={idx} value={s.name}>{s.name}</option>)}
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-gray-600 font-semibold uppercase font-mono tracking-wide">Degree Seeking</label>
                      <select 
                        value={inquiryDegree}
                        onChange={(e) => setInquiryDegree(e.target.value)}
                        className="w-full border border-gray-300 rounded px-3 py-2.5 bg-gray-50 focus:outline-none focus:border-[#C5A059]"
                      >
                        <option value="Under-Graduate (MBBS/B.Tech/BDS/B.Pharm)">Under-Graduate (MBBS/B.Tech/BDS/B.Pharm)</option>
                        <option value="Post-Graduate (MD/M.Tech/MDS/M.Pharm/MBA)">Post-Graduate (MD/M.Tech/MDS/M.Pharm/MBA)</option>
                        <option value="Doctoral Programs (Ph.D)">Doctoral Programs (Ph.D)</option>
                        <option value="Short Term certification courses">Short Term certification courses</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-gray-600 font-semibold uppercase font-mono tracking-wide">Elaborate your request</label>
                    <textarea 
                      required 
                      rows={4}
                      value={inquiryText}
                      onChange={(e) => setInquiryText(e.target.value)}
                      placeholder="Please note eligibility score requirements, fee payment cycle..." 
                      className="w-full border border-gray-300 rounded px-3 py-2.5 bg-gray-50 focus:outline-none focus:border-[#C5A059]"
                    ></textarea>
                  </div>
                  <button 
                    type="submit" 
                    className="bg-[#0B2240] hover:bg-[#11315a] border border-[#C5A059] text-[#ebd19d] w-full py-3 rounded text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
                  >
                    Transmit Query Token via WhatsApp
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* 17. Footnote and Disclosures */}
      <footer className="bg-[#051121] py-12 text-gray-400 border-t-2 border-[#C5A059]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-xs">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-3">
              <span className="font-serif font-black tracking-wider text-white text-base">KM UNIVERSITY</span>
              <p className="text-[11px] text-gray-400 leading-relaxed">
                Mathura-Delhi Corridor, Uttar Pradesh. Operating under the visionary trusteeship of the Shanti Devi Charitable Memorial Trust. Dedicated to absolute academic excellence and translational scientific breakthroughs.
              </p>
            </div>
            <div className="space-y-1">
              <h4 className="text-white font-semibold uppercase font-mono tracking-wide">Academics Core</h4>
              <span onClick={() => setCurrentTab('schools')} className="hover:text-white cursor-pointer block py-1">K.D. Medical Hospital Complex</span>
              <span onClick={() => setCurrentTab('schools')} className="hover:text-white cursor-pointer block py-1">K.D. Dental Hospital Complex</span>
              <span onClick={() => setCurrentTab('schools')} className="hover:text-white cursor-pointer block py-1">School of Engineering Technology</span>
              <span onClick={() => setCurrentTab('schools')} className="hover:text-white cursor-pointer block py-1">School of Pharmacy & Biotech</span>
            </div>
            <div className="space-y-1">
              <h4 className="text-white font-semibold uppercase font-mono tracking-wide">Interactive Links</h4>
              <span onClick={() => setCurrentTab('admission-portal')} className="hover:text-white cursor-pointer block py-1">Online Admission Gateway</span>
              <span onClick={() => setCurrentTab('placements')} className="hover:text-white cursor-pointer block py-1">Training & Placements Cell</span>
              <span onClick={() => setCurrentTab('research')} className="hover:text-white cursor-pointer block py-1">Sponsored Projects Registry</span>
            </div>
            <div className="space-y-1">
              <h4 className="text-white font-semibold uppercase font-mono tracking-wide">Statutory Links</h4>
              <a href="https://ugc.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-white block py-1">UGC Guidelines Act</a>
              <a href="https://kmu.edu.in" target="_blank" rel="noopener noreferrer" className="hover:text-white block py-1">Official Origin [KMU Mathura]</a>
              <span onClick={() => setCurrentTab('admin-portal')} className="hover:text-white cursor-pointer block py-1">Super Admin Central Panel</span>
            </div>
          </div>
          <div className="h-px bg-gray-800"></div>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] font-mono color-gray-500">
            <span>© 2026 KM University, Mathura. All Rights Reserved. • Designed under Global University Standards</span>
            <div className="flex gap-4">
              <span>Privacy Grid</span>
              <span>Terms of Compliance</span>
              <span>UGC Disclosures</span>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
};
