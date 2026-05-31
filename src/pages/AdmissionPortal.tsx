/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { usePortal } from '../context/PortalContext';
import { 
  GraduationCap, 
  MapPin, 
  CheckCircle, 
  HelpCircle, 
  ClipboardList,
  Upload,
  Sparkles
} from 'lucide-react';

export const AdmissionPortal: React.FC = () => {
  const { applyAdmission } = usePortal();

  // Form entries
  const [applicantName, setApplicantName] = useState('');
  const [phone, setPhone] = useState('');
  const [parentName, setParentName] = useState('');
  const [dob, setDob] = useState('2008-05-15');
  const [gender, setGender] = useState('Male');
  const [address, setAddress] = useState('');
  const [board12th, setBoard12th] = useState('CBSE');
  const [pct12th, setPct12th] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('B.Tech Computer Science');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const programs = [
    { title: 'B.Tech Computer Science Development', degrees: 'UG • 4 Years', desc: 'Accredited curriculum with cloud-tier local database terminals.' },
    { title: 'MBBS Clinical Nursing Flagship', degrees: 'UG • 5.5 Years', desc: 'Integrated clinical study under Super specialty KDMC Hospital Mathura.' },
    { title: 'Dental Sciences BDS', degrees: 'UG • 5 Years', desc: 'A+ ratings active local dental hospital clinics.' },
    { title: 'School of Law LLB Moot-Court', degrees: 'UG • 3 Years', desc: 'Clinical litigation studies directed by courtroom leaders.' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!applicantName || !phone || !parentName || !pct12th) return;
    setSubmitting(true);
    
    // Create direct application object mapping
    const appData = {
      applicantName,
      courseDegree: selectedCourse.startsWith('M') || selectedCourse.startsWith('Ph') ? 'PG' : 'UG' as any,
      programName: selectedCourse,
      personalInfo: {
        dob,
        gender: gender as any,
        parentsName: parentName,
        phone,
        address
      },
      educationInfo: {
        board12th,
        percentage12th: parseFloat(pct12th) || 85
      }
    };

    setTimeout(() => {
      applyAdmission(appData);
      setSuccess(true);
      setSubmitting(false);
      // Reset
      setApplicantName('');
      setPhone('');
      setParentName('');
      setPct12th('');
      setAddress('');
    }, 1500);
  };

  return (
    <div id="admission-portal-root" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 font-sans">
      
      {/* Overview header */}
      <div className="text-center max-w-2xl mx-auto space-y-4 mb-10">
        <GraduationCap className="h-10 w-10 text-[#C5A059] mx-auto" />
        <h2 className="text-3xl font-serif font-bold text-[#0B2240] tracking-tight">Direct Admissions Gateway 2026</h2>
        <p className="text-xs text-gray-600 max-w-lg mx-auto">
          Enroll directly in our world-renowned programs. After submitting, your portfolio will queue in the admissions registrar's staff portal for document checking and seat reservations.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Curriculums Listing panel left */}
        <div className="lg:col-span-5 bg-white border border-gray-200 rounded p-5 shadow-sm space-y-5">
          <div className="border-b border-gray-150 pb-2 flex items-center justify-between">
            <h3 className="font-serif font-bold text-sm text-[#0B2240]">Admissions Options and Terms</h3>
            <span className="text-[10px] bg-[#C5A059]/10 border border-[#C5A059]/40 text-[#051121] px-2 py-0.5 rounded font-mono font-bold">2026 Season</span>
          </div>

          <div className="space-y-4">
            {programs.map((p, idx) => (
              <div key={idx} className="border border-gray-200 p-4 rounded bg-[#FAFBF9] space-y-1 hover:border-[#C5A059] transition-colors">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-serif font-black text-gray-900">{p.title}</h4>
                  <span className="text-[9px] font-mono text-gray-400 font-bold">{p.degrees}</span>
                </div>
                <p className="text-[10.5px] text-gray-600 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Dynamic Interactive Admissions Application Form on Right */}
        <div className="lg:col-span-7 bg-white border border-gray-200 rounded p-6 shadow-sm">
          <h3 className="text-lg font-serif font-bold text-[#0B2240] border-b border-gray-100 pb-2 mb-6">Direct Enrolment Application Form</h3>

          {success ? (
            <div id="apply-success" className="bg-green-50 border border-green-200 p-6 rounded space-y-3 text-center">
              <CheckCircle className="h-10 w-10 text-green-700 mx-auto" />
              <h4 className="text-sm font-bold text-green-800">Your application has been logged!</h4>
              <p className="text-xs text-green-700">
                Registrar reference token has been secured. This submission is visible inside the **Admissions Staff Portal Cabinet** for immediate review and seat allocation.
              </p>
              <button 
                onClick={() => setSuccess(false)}
                className="bg-[#0B2240] hover:bg-[#142d4a] border border-[#C5A059] text-white py-1.5 px-4 rounded text-xs font-bold uppercase transition-colors"
              >
                Apply Another Seat
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs font-sans">
              
              <div className="bg-[#FAFBF9] p-4 rounded border border-gray-150 space-y-3">
                <span className="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest block border-b pb-1">1. Nominee Identification</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-gray-500 font-bold uppercase font-mono text-[9px]">Your full Name</label>
                    <input 
                      type="text" 
                      required 
                      value={applicantName} 
                      onChange={(e) => setApplicantName(e.target.value)}
                      placeholder="e.g. Aarav Singhal" 
                      className="w-full border border-gray-300 rounded p-2 text-xs bg-white focus:outline-none" 
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-gray-500 font-bold uppercase font-mono text-[9px]">Phone Desk Liaison</label>
                    <input 
                      type="tel" 
                      required 
                      value={phone} 
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. +91 9756664320" 
                      className="w-full border border-gray-300 rounded p-2 text-xs bg-white focus:outline-none" 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="text-gray-500 font-bold uppercase font-mono text-[9px]">Parents / Guardian Name</label>
                    <input 
                      type="text" 
                      required 
                      value={parentName} 
                      onChange={(e) => setParentName(e.target.value)}
                      placeholder="e.g. Shishir Singhal" 
                      className="w-full border border-gray-300 rounded p-2 text-xs bg-white" 
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-gray-500 font-bold uppercase font-mono text-[9px]">Date of Birth</label>
                    <input 
                      type="date" 
                      required 
                      value={dob} 
                      onChange={(e) => setDob(e.target.value)}
                      className="w-full border border-gray-300 rounded p-2 text-xs bg-white" 
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-gray-500 font-bold uppercase font-mono text-[9px]">Gender</label>
                    <select 
                      value={gender} 
                      onChange={(e) => setGender(e.target.value)} 
                      className="w-full border border-gray-300 rounded p-2 text-xs bg-white"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-gray-500 font-bold uppercase font-mono text-[9px]">Postal Code & Residence Address</label>
                  <input 
                    type="text" 
                    required 
                    value={address} 
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="e.g. Plot No. 12, Vrindavan Road, Mathura NCR" 
                    className="w-full border border-gray-300 text-xs rounded p-2 bg-white" 
                  />
                </div>
              </div>

              <div className="bg-[#FAFBF9] p-4 rounded border border-gray-150 space-y-3">
                <span className="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest block border-b pb-1">2. Academic Transcripts</span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="text-gray-500 font-bold uppercase font-mono text-[9px]">12th Board Authority</label>
                    <select 
                      value={board12th} 
                      onChange={(e) => setBoard12th(e.target.value)} 
                      className="w-full border border-gray-300 text-xs rounded p-2 bg-white"
                    >
                      <option>CBSE Board</option>
                      <option>ICSE Board</option>
                      <option>Uttar Pradesh State Board</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-gray-500 font-bold uppercase font-mono text-[9px]">12th Aggregate Percentage</label>
                    <input 
                      type="number" 
                      required 
                      min="35"
                      max="100"
                      value={pct12th} 
                      onChange={(e) => setPct12th(e.target.value)}
                      placeholder="e.g. 89%" 
                      className="w-full border border-gray-300 text-xs rounded p-2 bg-white" 
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-gray-500 font-bold uppercase font-mono text-[9px]">Degree Seeking program</label>
                    <select 
                      value={selectedCourse} 
                      onChange={(e) => setSelectedCourse(e.target.value)} 
                      className="w-full border border-gray-300 text-xs rounded p-2 bg-white"
                    >
                      <option>B.Tech Computer Science</option>
                      <option>MBBS Clinical Surgical</option>
                      <option>Dental Sciences BDS</option>
                      <option>LLB Moot Court studies</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="bg-[#FAFBF9] p-4 rounded border border-gray-150 space-y-2">
                <span className="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest block border-b pb-1">3. Document Upload simulation</span>
                <p className="text-[10px] text-gray-500">Simulate attaching transcript files. Clicking submit registers these items inside the local storage cache.</p>
                <div className="grid grid-cols-2 gap-3 text-center">
                  <div className="p-3 border border-gray-350 bg-white rounded cursor-not-allowed">
                    <span className="text-[10px] block font-semibold text-[#0B2240]">Upload 12th_Transcript.pdf</span>
                    <span className="text-[9px] text-gray-400 block mt-1">(Pre-Attached)</span>
                  </div>
                  <div className="p-3 border border-gray-350 bg-white rounded cursor-not-allowed">
                    <span className="text-[10px] block font-semibold text-[#0B2240]">Upload Passport_Photo.jpeg</span>
                    <span className="text-[9px] text-gray-400 block mt-1">(Pre-Attached)</span>
                  </div>
                </div>
              </div>

              <button 
                type="submit" 
                disabled={submitting}
                className="bg-[#0B2240] hover:bg-[#11315a] border border-[#C5A059] text-white py-3 w-full rounded text-xs font-bold uppercase tracking-wider block transition-colors shadow-md"
              >
                {submitting ? 'Transmitting credentials files into registrar networks...' : 'Transmit Admissions Portfolio'}
              </button>
            </form>
          )}
        </div>

      </div>

    </div>
  );
};
