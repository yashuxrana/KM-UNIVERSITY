/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import React, { useState } from 'react';
import { PortalProvider } from './context/PortalContext';
import { Header } from './components/Header';
import { AIAssistant } from './components/AIAssistant';
import { LoginModal } from './components/LoginModal';

// Pages import
import { HomeView } from './pages/HomeView';
import { StudentPortal } from './pages/StudentPortal';
import { FacultyPortal } from './pages/FacultyPortal';
import { StaffPortal } from './pages/StaffPortal';
import { AdminPortal } from './pages/AdminPortal';
import { PlacementPortal } from './pages/PlacementPortal';
import { ResearchPortal } from './pages/ResearchPortal';
import { AlumniPortal } from './pages/AlumniPortal';
import { AdmissionPortal } from './pages/AdmissionPortal';
import { EventsNewsView } from './pages/EventsNewsView';
import { VIPVisitors } from './pages/VIPVisitors';

// Lucide icon imports
import { 
  Building2, 
  GraduationCap, 
  BookOpen, 
  Award, 
  Globe, 
  Compass, 
  ShieldCheck, 
  Users,
  ChevronRight,
  School,
  ArrowRight,
  Sparkles,
  Search
} from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('home');

  const renderContent = () => {
    switch (currentTab) {
      case 'home':
        return <HomeView setCurrentTab={setCurrentTab} />;
        
      case 'admission-portal':
        return <AdmissionPortal />;
        
      case 'student-portal':
        return <StudentPortal />;
        
      case 'faculty-portal':
        return <FacultyPortal />;
        
      case 'staff-portal':
        return <StaffPortal />;
        
      case 'admin-portal':
        return <AdminPortal />;
        
      case 'placements':
        return <PlacementPortal />;
        
      case 'research':
      case 'research-centers':
      case 'research-publications':
      case 'research-projects':
        return <ResearchPortal currentTab={currentTab} />;
        
      case 'alumni':
        return <AlumniPortal />;

      // 1. Static Pages or Detailed Views
      case 'vip-visitors':
        return <VIPVisitors />;

      case 'about-parent':
      case 'about':
        return (
          <div className="max-w-4xl mx-auto px-4 py-12 font-sans space-y-8">
            <div className="text-center space-y-2">
              <School className="h-10 w-10 text-[#C5A059] mx-auto" />
              <h2 className="text-3xl font-serif font-black text-[#0B2240] tracking-tight">About KM University</h2>
              <span className="text-xs font-mono text-gray-500 uppercase tracking-wider block">Mathura NCR Campus - Estd 2026</span>
            </div>
            
            <div className="prose text-xs text-gray-700 leading-relaxed space-y-4">
              <p>
                KM University, Mathura is a premier institution established under the visionary guidance of the Shanti Devi Charitable Trust. Built on the core values of Academic Excellence, Professional Trust, and Student Empowerment, KMU serves as a modern catalyst for clinical medical studies, high-value mechanical sciences, and legal diagnostics countrywide.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                <div className="p-5 border border-gray-200 bg-gray-50 rounded shadow-sm">
                  <h4 className="font-serif font-bold text-sm text-[#0B2240] mb-2">Our Vision</h4>
                  <p className="text-xs">
                    To serve as a globally recognized nexus of scholarly innovation and professional integrity, cultivating certified clinical champions, database programmers, and courtroom leaders.
                  </p>
                </div>
                <div className="p-5 border border-gray-200 bg-gray-50 rounded shadow-sm">
                  <h4 className="font-serif font-bold text-sm text-[#0B2240] mb-2">Our Mission</h4>
                  <p className="text-xs">
                    Integrating secondary healthcare structures, deep biochemical research, and co-designed industry curriculums to prepare students for real-world contributions within a clean green campus environment.
                  </p>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-100">
                <h4 className="font-serif font-bold text-base text-[#0B2240] mb-3">Visionary Leadership</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans">
                  <div className="p-4 border rounded shadow-sm bg-white flex gap-3 items-center">
                    <div className="h-11 w-11 rounded-full bg-gray-200 flex items-center justify-center font-bold text-[#0B2240] shrink-0 border border-[#C5A059] shadow-inner">VC</div>
                    <div>
                      <strong className="text-gray-900 block font-bold">Prof. Dr. Manhar Lal Singhal</strong>
                      <span className="text-[10px] text-gray-400 block font-mono">Vice-Chancellor</span>
                    </div>
                  </div>
                  <div className="p-4 border rounded shadow-sm bg-white flex gap-3 items-center">
                    <div className="h-11 w-11 rounded-full bg-gray-200 flex items-center justify-center font-bold text-[#0B2240] shrink-0 border border-[#C5A059] shadow-inner">RG</div>
                    <div>
                      <strong className="text-gray-900 block font-bold">Dr. Shashi Shekhar Dixit</strong>
                      <span className="text-[10px] text-gray-400 block font-mono">Registrar Coordinator</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'admissions-parent':
      case 'admissions-ug':
      case 'admissions-pg':
      case 'admissions-phd':
        return (
          <div className="max-w-4xl mx-auto px-4 py-12 font-sans space-y-8">
            <div className="text-center space-y-2">
              <GraduationCap className="h-10 w-10 text-[#C5A059] mx-auto" />
              <h2 className="text-3xl font-serif font-black text-[#0B2240] tracking-tight text-center">Admissions Guidelines & Curriculums</h2>
              <span className="text-xs font-mono text-gray-400 uppercase">KMU Admissions Office Mathura Corridor</span>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm space-y-6 text-xs text-gray-700 leading-relaxed">
              <p>
                Undergraduate, Postgraduate, and PhD selection lines are based entirely on academic transcript verification, national entrance scores, and physical counseling audits in central mathura complexes.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                <div className="p-4 border border-gray-150 rounded shadow-sm space-y-2">
                  <strong className="text-sm font-serif text-[#0B2240] block">Undergraduate Direct Lines</strong>
                  <p className="text-[11px] leading-relaxed">Eligibility: Complete 10+2 examinations with Physics, Chemistry, Biology / Mathematics secure averages above 50%.</p>
                  <button onClick={() => setCurrentTab('admission-portal')} className="text-[#C5A059] font-bold text-[10px] block hover:underline">Apply UG</button>
                </div>
                <div className="p-4 border border-gray-150 rounded shadow-sm space-y-2">
                  <strong className="text-sm font-serif text-[#0B2240] block">Postgraduate Lines</strong>
                  <p className="text-[11px] leading-relaxed">Eligibility: Hold complete MBBS, BDS, B.Pharm, or B.Tech degrees with verified clinical license files.</p>
                  <button onClick={() => setCurrentTab('admission-portal')} className="text-[#C5A059] font-bold text-[10px] block hover:underline">Apply PG</button>
                </div>
                <div className="p-4 border border-gray-150 rounded shadow-sm space-y-2">
                  <strong className="text-sm font-serif text-[#0B2240] block">PhD Research Fellowship</strong>
                  <p className="text-[11px] leading-relaxed">Eligibility: Master's degree holders with active UGC NET or GATE scores. Involves presenting draft research abstract papers.</p>
                  <button onClick={() => setCurrentTab('admission-portal')} className="text-[#C5A059] font-bold text-[10px] block hover:underline">Apply PhD Fellowship</button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'scholarships':
        return (
          <div className="max-w-4xl mx-auto px-4 py-12 font-sans space-y-8">
            <div className="text-center space-y-2">
              <Award className="h-10 w-10 text-[#C5A059] mx-auto animate-bounce-slow" />
              <h2 className="text-3xl font-serif font-black text-[#0B2240] tracking-tight">Shanti Devi Charitable Trust Scholarships</h2>
              <span className="text-xs font-mono text-gray-400 uppercase">Means-and-Merit Tuition Assistance Programs</span>
            </div>

            <div className="bg-[#FAFBF9] border rounded p-6 shadow-sm space-y-6 text-xs text-gray-700 leading-relaxed">
              <p>
                KM University believes that financial limitations should not restrain outstanding academic pursuit. The Shanti Devi Memorial Charitable Trust funds multiple scholarship tracks based on verified score cards.
              </p>

              <div className="space-y-3">
                <div className="p-4 border bg-white rounded flex justify-between items-center">
                  <div>
                    <strong className="text-gray-900 block font-bold">100% Tuition Fee Waivers Scheme</strong>
                    <span className="text-[10px] text-gray-500 font-mono">Eligibility: 10+2 board state toppers, or national entrance high-ranking achievers.</span>
                  </div>
                  <span className="text-xs font-black text-green-700">100% OFF</span>
                </div>
                <div className="p-4 border bg-white rounded flex justify-between items-center">
                  <div>
                    <strong className="text-gray-900 block font-bold">25% Merit Tiers Scheme</strong>
                    <span className="text-[10px] text-gray-500 font-mono">Eligibility: 10+2 scores above 85% aggregate average. Applied automatically at enrolment checkout.</span>
                  </div>
                  <span className="text-xs font-black text-[#0C2546]">25% OFF</span>
                </div>
              </div>

              <div className="pt-4 text-center">
                <button onClick={() => setCurrentTab('admission-portal')} className="bg-[#0B2240] text-white py-2 px-5 border border-[#C5A059] rounded text-xs font-bold uppercase tracking-wider">
                  Fill Scholarship Enrolment Sheet
                </button>
              </div>
            </div>
          </div>
        );

      case 'academics-parent':
      case 'schools':
      case 'programs':
        return (
          <div className="max-w-5xl mx-auto px-4 py-12 font-sans space-y-8">
            <div className="text-center space-y-2">
              <Building2 className="h-10 w-10 text-[#C5A059] mx-auto" />
              <h2 className="text-2xl font-serif font-bold text-[#0B2240]">Certified schools of KM University</h2>
              <p className="text-xs text-gray-500">Each school represents independent research labs, clinics, and professional workspaces.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-5 border rounded shadow-sm bg-white space-y-2">
                <strong className="text-sm font-serif text-[#0B2240] block">School of Medical Sciences</strong>
                <p className="text-xs text-gray-650 leading-relaxed">Includes clinical medicine MBBS and postgraduate surgical wings. Operates directly inside the super-speciality K.D. Hospital Complexes containing 300+ diagnostic beds.</p>
              </div>
              <div className="p-5 border rounded shadow-sm bg-white space-y-2">
                <strong className="text-sm font-serif text-[#0B2240] block">School of Engineering & Technology</strong>
                <p className="text-xs text-gray-650 leading-relaxed">Focuses on machine intelligence, database management, cloud microservice arrays. Curriculums co-designed with top-tier industrial developers.</p>
              </div>
              <div className="p-5 border rounded shadow-sm bg-white space-y-2">
                <strong className="text-sm font-serif text-[#0B2240] block">School of Management & Allied Commerce</strong>
                <p className="text-xs text-gray-650 leading-relaxed">Covers financial logistics, corporate accounting, operations, and leadership modules with active corporate tie-ups.</p>
              </div>
              <div className="p-5 border rounded shadow-sm bg-white space-y-2">
                <strong className="text-sm font-serif text-[#0B2240] block">School of Dental Sciences</strong>
                <p className="text-xs text-gray-650 leading-relaxed">Fully accredited BDS laboratory units servicing local public pathology needs under physical supervision of senior orthopedics clinicians.</p>
              </div>
            </div>
          </div>
        );

      case 'calendar':
        return (
          <div className="max-w-4xl mx-auto px-4 py-12 font-sans space-y-6">
            <div className="text-center space-y-2">
              <Compass className="h-10 w-10 text-[#C5A059] mx-auto" strokeWidth={1.5} />
              <h2 className="text-3xl font-serif font-black text-[#0B2240] tracking-tight">Academic Scheduling Calendar</h2>
              <span className="text-xs font-mono text-gray-400 uppercase">Registrar coordinator office dates</span>
            </div>

            <div className="bg-white border rounded p-6 shadow-sm text-xs text-gray-700 leading-relaxed">
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b pb-2">
                  <span>Admissions Portals Launch:</span>
                  <strong className="font-mono text-[#0B2240]">May 15, 2026</strong>
                </div>
                <div className="flex justify-between items-center border-b pb-2">
                  <span>Physical Documents Clearance Desk Open:</span>
                  <strong className="font-mono text-[#0B2240]">June 10, 2026</strong>
                </div>
                <div className="flex justify-between items-center border-b pb-2">
                  <span>Spring Semester Review Marks Published:</span>
                  <strong className="font-mono text-green-700">June 20, 2026</strong>
                </div>
                <div className="flex justify-between items-center border-b pb-2">
                  <span>Enrolment and Lecture Commencements:</span>
                  <strong className="font-mono text-[#0B2240]">July 15, 2026</strong>
                </div>
              </div>
            </div>
          </div>
        );

      case 'events-news':
        return <EventsNewsView />;

      case 'contact':
        return (
          <div className="max-w-4xl mx-auto px-4 py-12 font-sans space-y-8">
            <div className="text-center space-y-2">
              <Compass className="h-10 w-10 text-[#C5A059] mx-auto" />
              <h2 className="text-3xl font-serif font-black text-[#0B2240] tracking-tight">Central Liaison Headquarters</h2>
              <span className="text-xs font-mono text-gray-500 uppercase">Mathura NCT Delhi Roadway Corridor</span>
            </div>

            <div className="bg-white border rounded p-6 shadow-sm space-y-6 text-xs text-gray-700 leading-relaxed">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-serif font-bold text-sm text-[#0B2240] mb-3">Public Liaison Office</h4>
                  <ul className="space-y-2 font-mono text-[11px]">
                    <li>📍 Address: Plot No. 2, Mathura-Delhi Highway, NH-2, Uttar Pradesh-281001</li>
                    <li>📞 University Helpline: +91-9756664320</li>
                    <li>📞 Admission Enquiry: +91-9756664315</li>
                    <li>📞 City Office: +91-9756664314</li>
                    <li>✉️ Email: info@kmu.edu.in, admissions@kmu.edu.in</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-serif font-bold text-sm text-[#0B2240] mb-3">Office Hours Desk</h4>
                  <p>Admissions liaison complex is open Monday through Saturday from 09:00 AM to 05:00 PM (excluding physical government holidays).</p>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return <div className="p-12 text-center text-gray-500 font-mono text-xs">Error: Target workspace page not found inside routes config.</div>;
    }
  };

  return (
    <PortalProvider>
      <div id="application-container" className="min-h-screen bg-[#FAF9F5] flex flex-col justify-between font-sans selection:bg-[#C5A059] selection:text-[#051121]">
        
        {/* Nav Header */}
        <Header currentTab={currentTab} setCurrentTab={setCurrentTab} />

        {/* Dynamic Pages Area with negative outer layouts */}
        <main className="flex-1 bg-[#FAF9F5] animate-fade-in relative z-10">
          {renderContent()}
        </main>

        {/* AIAssistant advisor is globally injected floating at bottom-right corner! */}
        <AIAssistant />

        {/* Dynamic Login Modal overlay */}
        <LoginModal />

      </div>
    </PortalProvider>
  );
}
