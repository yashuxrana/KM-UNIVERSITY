/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { usePortal } from '../context/PortalContext';
import { 
  Building2, 
  Calendar, 
  Check, 
  TrendingUp, 
  Search, 
  MapPin, 
  Award,
  Users
} from 'lucide-react';

export const PlacementPortal: React.FC = () => {
  const { placementStats, placementDrives, registerForPlacementDrive, currentUser } = usePortal();
  const [searchVal, setSearchVal] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const filteredDrives = placementDrives.filter(drive => 
    drive.companyName.toLowerCase().includes(searchVal.toLowerCase()) || 
    drive.roleName.toLowerCase().includes(searchVal.toLowerCase())
  );

  const handleRegister = (driveId: string, company: string) => {
    if (!currentUser) {
      alert("Please authenticate using any Student portal login token from the navigation bar before nominating for career drives.");
      return;
    }
    registerForPlacementDrive(driveId);
    setSuccessMsg(`Nominations successfully processed for ${company}. Placements office notified.`);
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  return (
    <div id="placement-portal-root" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 font-sans">
      
      {/* Visual placement title block */}
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-10">
        <TrendingUp className="h-10 w-10 text-[#C5A059] mx-auto" />
        <h2 className="text-3xl font-serif font-bold text-[#0B2240] tracking-tight">Central Training & Placement Cell (CTPC)</h2>
        <p className="text-xs text-gray-600 max-w-xl mx-auto">
          KM University's training division drives continuous alignment with corporate and healthcare recruiters, hosting intense placement weeks, mock diagnostic trials, and clinical presentation contests.
        </p>
      </div>

      {successMsg && (
        <div id="placement-success" className="max-w-2xl mx-auto bg-green-50 border border-green-200 text-green-800 text-xs p-4 rounded text-center mb-6 font-semibold">
          {successMsg}
        </div>
      )}

      {/* Historical Ledger Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white border border-gray-200 rounded p-6 shadow-sm text-center">
          <span className="text-[10px] font-mono text-gray-400 font-bold uppercase tracking-wider block mb-2">Highest Career Offer</span>
          <div className="text-3xl font-black text-[#0B2240] font-serif">₹ 14.5 LPA</div>
          <span className="text-[11px] text-gray-500 block mt-1">AWS Cloud Engineering Track</span>
        </div>
        <div className="bg-white border border-gray-200 rounded p-6 shadow-sm text-center">
          <span className="text-[10px] font-mono text-gray-400 font-bold uppercase tracking-wider block mb-2">Overall Cohort Hired</span>
          <div className="text-3xl font-black text-green-700 font-serif">96.4%</div>
          <span className="text-[11px] text-gray-500 block mt-1">Combined clinical & technical terms</span>
        </div>
        <div className="bg-white border border-gray-200 rounded p-6 shadow-sm text-center">
          <span className="text-[10px] font-mono text-gray-400 font-bold uppercase tracking-wider block mb-2">Lead Recruiting Corp</span>
          <div className="text-3xl font-black text-[#C5A059] font-serif">Apollo / Lupin</div>
          <span className="text-[11px] text-gray-500 block mt-1">Super-speciality medical wings</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Recruitment Drives left side list */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-gray-150 pb-3">
            <h3 className="text-lg font-serif font-bold text-[#0B2240]">Active & Upcoming Recruitment Drives</h3>
            <div className="relative w-full sm:w-60">
              <input 
                type="text" 
                placeholder="Search recruiters (e.g. Cipla)..." 
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
                className="w-full border border-gray-300 rounded py-1.5 pl-8 pr-3 text-xs bg-white focus:outline-none focus:border-[#C5A059]"
              />
              <Search className="absolute left-2.5 top-2 h-3.5 w-3.5 text-gray-400" />
            </div>
          </div>

          <div className="space-y-4">
            {filteredDrives.map(drive => (
              <div key={drive.id} className="border border-gray-200 rounded-lg p-5 bg-white shadow-sm hover:border-[#C5A059] transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded bg-gray-50 border border-gray-200 text-gray-700 text-[9px] font-mono font-bold uppercase">{drive.category}</span>
                    <span className="text-[10px] font-mono text-amber-700 font-bold">Offer Packages: {drive.ctcPackage} LPA</span>
                  </div>
                  <h4 className="text-base font-serif font-black text-[#0B2240]">{drive.companyName}</h4>
                  <p className="text-xs text-gray-700 font-medium">Seeking Target Role: {drive.roleName}</p>
                  <p className="text-[11px] text-gray-500 max-w-xl leading-relaxed">{drive.description}</p>
                  
                  <div className="flex flex-wrap items-center gap-4 text-[10px] text-gray-400 font-mono mt-2">
                    <span>🎓 Target Stream: {drive.eligibilityCriteria}</span>
                    <span>📅 Drive Date: {drive.driveDate}</span>
                  </div>
                </div>

                <div className="shrink-0 flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-4 border-t sm:border-t-0 border-gray-100 pt-3 sm:pt-0">
                  <div className="text-right hidden sm:block">
                    <span className="text-[9px] text-gray-400 font-mono font-bold uppercase block">Nominations</span>
                    <strong className="text-xs font-mono text-gray-700">{drive.studentRegistrationsCount} Nominations</strong>
                  </div>
                  <button 
                    onClick={() => handleRegister(drive.id, drive.companyName)}
                    className="bg-[#0B2240] hover:bg-[#142d4a] border border-[#C5A059] text-white py-2 px-4 rounded text-xs font-bold uppercase tracking-wider"
                  >
                    Nominate Me
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Corporate Alliance Side-desk right side */}
        <div className="lg:col-span-4 bg-[#0B2240] text-gray-300 rounded p-6 shadow-md space-y-6">
          <div className="border-b border-[#C5A059]/30 pb-3">
            <h4 className="text-white font-serif font-bold text-sm">Alliance Coordinator's Desk</h4>
            <span className="text-[9px] font-mono text-gray-400 uppercase font-bold tracking-widest mt-1 block">Recruiter liaison protocols</span>
          </div>

          <div className="space-y-4 text-xs">
            <div className="space-y-1">
              <strong className="text-white text-xs block">Liaison Officer</strong>
              <p>Dr. Vivek Saxena (Chief Placements Coordinator)</p>
              <span className="text-[#C5A059] font-mono text-[10px]">📞 +91-9756664320</span>
            </div>
            
            <div className="space-y-1">
              <strong className="text-white text-xs block">Corporate Hospitality Complex</strong>
              <p>C-Block Placements Annex, Mathura Corridor. Hosts separate panel negotiation board rooms, mock interview stations, and full wireless conference nodes.</p>
            </div>
            
            <div className="pt-2 border-t border-gray-800 space-y-2">
              <span className="text-[9px] text-gray-500 font-mono font-bold uppercase block">Core Recruiting Partners Log</span>
              <ul className="space-y-1.5 text-[11px] text-gray-300">
                <li className="flex items-center gap-1.5"><span className="h-1 w-1 bg-[#C5A059] rounded-full"></span> Apollo General Health Wings</li>
                <li className="flex items-center gap-1.5"><span className="h-1 w-1 bg-[#C5A059] rounded-full"></span> Cipla Formulations Labs</li>
                <li className="flex items-center gap-1.5"><span className="h-1 w-1 bg-[#C5A059] rounded-full"></span> AWS Database Integrators</li>
                <li className="flex items-center gap-1.5"><span className="h-1 w-1 bg-[#C5A059] rounded-full"></span> Lupin Clinical Chemistry</li>
                <li className="flex items-center gap-1.5"><span className="h-1 w-1 bg-[#C5A059] rounded-full"></span> Tech Mahindra Solutions</li>
              </ul>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
