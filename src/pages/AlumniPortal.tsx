/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { usePortal } from '../context/PortalContext';
import { 
  Users, 
  Award, 
  MapPin, 
  Heart, 
  UserPlus, 
  Search,
  BookOpen
} from 'lucide-react';

export const AlumniPortal: React.FC = () => {
  const { allUsers } = usePortal();
  
  // Local states to support Alumni Network persistence & interaction without throwing context errors
  const [alumniEndowmentFund, setAlumniEndowmentFund] = useState(1850000);
  const [customAlumniList, setCustomAlumniList] = useState<any[]>([]);

  const registerAsAlumnus = (data: any) => {
    setCustomAlumniList(prev => [...prev, data]);
  };

  const donateToAlumniFund = (amt: number) => {
    setAlumniEndowmentFund(prev => prev + amt);
  };
  
  // Register form states
  const [name, setName] = useState('');
  const [program, setProgram] = useState('B.Tech CSE');
  const [gradYear, setGradYear] = useState('2022');
  const [company, setCompany] = useState('');
  const [location, setLocation] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Donation form states
  const [donationAmt, setDonationAmt] = useState('');
  const [donationSuccess, setDonationSuccess] = useState(false);

  // Filter and directory
  const alumniDirectory = [
    { name: 'Dr. Vivek Malhotra', grad: 'MBBS Class of 2021', role: 'Junior Pediatric Resident', location: 'AIIMS New Delhi', img: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=150' },
    { name: 'Ananya Dixit', grad: 'B.Tech CSE Class of 2023', role: 'Software Engineer', location: 'AWS Labs Hyderabad', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150' },
    { name: 'Amit Singhal', grad: 'MBA Class of 2022', role: 'Operations Manager', location: 'Cipla Mathura Plant', img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=150' }
  ];

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !company || !location) return;
    registerAsAlumnus({
      name,
      programName: program,
      gradYear: parseInt(gradYear) || 2022,
      currentCompany: company,
      location
    });
    setSuccessMsg("Congratulations! Your Alumnus registration is recorded into the KMU Network Archives.");
    setName('');
    setCompany('');
    setLocation('');
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  const handleDonation = (e: React.FormEvent) => {
    e.preventDefault();
    const amt = parseFloat(donationAmt);
    if (isNaN(amt) || amt <= 0) return;
    donateToAlumniFund(amt);
    setDonationSuccess(true);
    setDonationAmt('');
    setTimeout(() => setDonationSuccess(false), 4000);
  };

  return (
    <div id="alumni-portal-root" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 font-sans">
      
      {/* Visual Title */}
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-10">
        <Users className="h-10 w-10 text-[#C5A059] mx-auto" strokeWidth={1.5} />
        <h2 className="text-3xl font-serif font-bold text-[#0B2240] tracking-tight">KM University Alumni Network & Giving</h2>
        <p className="text-xs text-gray-600 max-w-xl mx-auto">
          Unifying thousands of graduates operating across international clinical hospitals, engineering conglomerates, and civil jurisdictions. Connect with mentorship registries or support local scholarship trusts.
        </p>
      </div>

      {successMsg && (
        <div className="max-w-xl mx-auto bg-green-50 border border-green-250 text-green-800 text-xs p-4 rounded text-center mb-6 font-semibold">
          {successMsg}
        </div>
      )}

      {/* Financial Endowment support ledger */}
      <div className="bg-[#051121] text-white p-6 rounded-lg shadow-xl border-t-4 border-[#C5A059] flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
        <div className="space-y-1.5 max-w-xl">
          <span className="text-[10px] font-mono font-bold text-[#ebd19d] uppercase tracking-widest block">Charitable Trust support index</span>
          <h3 className="text-xl font-serif font-black tracking-tight text-white">KMU Alumni Scholarship Endowment Fund</h3>
          <p className="text-xs text-gray-300 leading-relaxed">
            Directly funding merit-and-means tuition offsets for underprivileged Mathura cohort admissions under Shanti Devi Charitable Trust grids.
          </p>
        </div>
        <div className="shrink-0 flex items-center gap-6">
          <div className="text-center sm:text-right">
            <span className="text-[9px] font-mono text-gray-400 block uppercase font-bold text-gray-400">Total Endowment Pool</span>
            <strong className="text-2xl font-serif font-black text-[#C5A059]">₹ {alumniEndowmentFund.toLocaleString('en-IN')}</strong>
          </div>
          
          <form onSubmit={handleDonation} className="flex gap-2 items-center">
            <input 
              type="number" 
              required 
              min="100" 
              placeholder="e.g. ₹ 5000" 
              value={donationAmt} 
              onChange={(e) => setDonationAmt(e.target.value)} 
              className="w-24 border border-gray-700 bg-[#0B2240] text-white p-1.5 text-xs rounded focus:outline-none focus:border-[#C5A059]"
            />
            <button 
              type="submit" 
              className="bg-[#C5A059] text-[#051121] py-1.5 px-4 rounded text-xs font-bold uppercase tracking-wider transition-colors hover:bg-[#ebd19d]"
            >
              Support
            </button>
          </form>
        </div>
      </div>

      {donationSuccess && (
        <div className="max-w-sm ml-auto bg-green-50 border border-green-200 p-3 rounded mb-4 text-xs text-green-800 font-semibold text-center animate-fade-in">
          Endowment contribution token validated! Total pool updated instantly. Thank you!
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Alumni register form left */}
        <div className="lg:col-span-5 bg-white border border-gray-200 rounded p-6 shadow-sm space-y-4">
          <div className="border-b border-gray-150 pb-2.5">
            <h3 className="font-serif font-bold text-sm text-[#0B2240] flex items-center gap-1.5">
              <UserPlus className="h-4.5 w-4.5 text-[#C5A059]" />
              Join Alumnus Registry Index
            </h3>
            <span className="text-[9px] font-mono text-gray-400 uppercase tracking-widest block mt-1">Simulated database registration</span>
          </div>

          <form onSubmit={handleRegister} className="space-y-3.5 text-xs">
            <div className="space-y-1.5">
              <label className="text-gray-500 uppercase font-mono text-[9px] font-bold">Your Alumnus Name</label>
              <input 
                type="text" 
                required 
                placeholder="e.g. Priyesh Mishra" 
                value={name} 
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-gray-300 rounded p-2.5 bg-gray-50 focus:outline-none" 
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-gray-500 uppercase font-mono text-[9px] font-bold">Degree Program</label>
                <select 
                  value={program} 
                  onChange={(e) => setProgram(e.target.value)}
                  className="w-full border border-gray-300 rounded p-2.5 bg-gray-50 focus:outline-none"
                >
                  <option>B.Tech CSE</option>
                  <option>MBBS clinical</option>
                  <option>BDS dental</option>
                  <option>MBA general</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-gray-500 uppercase font-mono text-[9px] font-bold">Year of Graduation</label>
                <select 
                  value={gradYear} 
                  onChange={(e) => setGradYear(e.target.value)}
                  className="w-full border border-gray-300 rounded p-2.5 bg-gray-50 focus:outline-none"
                >
                  <option>2021</option>
                  <option>2022</option>
                  <option>2023</option>
                  <option>2024</option>
                  <option>2025</option>
                </select>
              </div>
            </div>
            
            <div className="space-y-1.5">
              <label className="text-gray-500 uppercase font-mono text-[9px] font-bold">Current Recruiting Corporation</label>
              <input 
                type="text" 
                required 
                placeholder="e.g. Apollo General Hospital / TCS" 
                value={company} 
                onChange={(e) => setCompany(e.target.value)}
                className="w-full border border-gray-300 rounded p-2.5 bg-gray-50 focus:outline-none" 
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-gray-500 uppercase font-mono text-[9px] font-bold">Direct Liaison Location Office</label>
              <input 
                type="text" 
                required 
                placeholder="e.g. Mathura, Uttar Pradesh" 
                value={location} 
                onChange={(e) => setLocation(e.target.value)}
                className="w-full border border-gray-300 rounded p-2.5 bg-gray-50 focus:outline-none" 
              />
            </div>

            <button 
              type="submit" 
              className="bg-[#0B2240] hover:bg-[#11315a] border border-[#C5A059] text-white py-2.5 w-full rounded text-xs font-bold uppercase tracking-wider"
            >
              Verify & Log Alumnus Index
            </button>
          </form>
        </div>

        {/* Directory details right */}
        <div className="lg:col-span-7 bg-white border border-gray-200 rounded p-6 shadow-sm space-y-6">
          <div className="border-b border-gray-100 pb-2.5">
            <h3 className="text-base font-serif font-bold text-[#0B2240]">Spotlight Mentorship Directory</h3>
            <p className="text-[10px] text-gray-400 font-mono">These alumni act as verified advisors conducting regular feedback circles.</p>
          </div>

          <div className="space-y-4">
            {alumniDirectory.map((al, idx) => (
              <div key={idx} className="border border-gray-200 p-4 rounded bg-[#FAFBF9] flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <img src={al.img} referrerPolicy="no-referrer" alt={al.name} className="h-11 w-11 rounded-full object-cover border border-gray-300 shrink-0" />
                  <div>
                    <h4 className="text-xs font-serif font-black text-gray-900">{al.name}</h4>
                    <span className="text-[10px] font-mono text-gray-400 block">{al.grad}</span>
                    <p className="text-[11px] text-gray-600 mt-0.5">{al.role} at <strong className="text-gray-800">{al.location}</strong></p>
                  </div>
                </div>
                <button 
                  onClick={() => alert(`Your request to follow and request guidance from ${al.name} of ${al.grad} is sent. A liaison coordinator will forward contact channels.`)}
                  className="bg-transparent hover:bg-[#0B2240] hover:text-white border border-gray-300 hover:border-transparent rounded px-3 py-1.5 text-[10px] font-bold uppercase font-mono transition-colors"
                >
                  Contact
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
