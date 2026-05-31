/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { usePortal } from '../context/PortalContext';
import { 
  Building2, 
  FileText, 
  CheckCircle, 
  XOctagon, 
  User as UserIcon,
  Search,
  Filter,
  Users
} from 'lucide-react';

export const StaffPortal: React.FC = () => {
  const { 
    currentUser, 
    loginAs, 
    applications, 
    updateApplicationStatus, 
    allUsers,
    setIsLoginModalOpen,
    setLoginModalPreselectedRole
  } = usePortal();

  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedAppId, setSelectedAppId] = useState<string | null>(null);
  const [rejectComment, setRejectComment] = useState<string>('');
  const [processSuccess, setProcessSuccess] = useState<string>('');

  if (!currentUser || currentUser.role !== 'staff') {
    return (
      <div className="max-w-md mx-auto my-12 bg-white border border-gray-200 rounded p-8 text-center shadow-md space-y-4">
        <UserIcon className="h-12 w-12 text-[#C5A059] mx-auto" />
        <h3 className="text-xl font-serif font-bold text-[#0B2240]">Admissions Registrar Office</h3>
        <p className="text-xs text-gray-600">Access zone for KM University admissions administrators, accountants, and coordinate officers.</p>
        <button 
          onClick={() => {
            setLoginModalPreselectedRole('staff');
            setIsLoginModalOpen(true);
          }}
          className="bg-[#0B2240] hover:bg-[#123158] text-white py-2 px-6 rounded text-xs font-bold uppercase tracking-wider transition-colors border border-[#C5A059]"
        >
          Enter Staff Credentials
        </button>
      </div>
    );
  }

  const staffDetails = currentUser.staffDetails;

  const handleProcessStatus = (id: string, nextStatus: 'approved' | 'rejected' | 'under_review', comments: string) => {
    updateApplicationStatus(id, nextStatus, comments);
    setProcessSuccess(`Application successfully updated to ${nextStatus.toUpperCase()}.`);
    setSelectedAppId(null);
    setRejectComment('');
    setTimeout(() => setProcessSuccess(''), 4000);
  };

  const filteredApps = applications.filter((app) => {
    const matchesStatus = filterStatus === 'all' || app.status === filterStatus;
    const matchesSearch = app.applicantName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          app.programName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const selectedApp = applications.find(a => a.id === selectedAppId);

  return (
    <div id="staff-portal-root" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-sans">
      
      {/* Staff ID Header */}
      <div className="bg-[#0B2240] text-white rounded p-6 shadow-md mb-6 border-l-4 border-[#C5A059] flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4 text-center sm:text-left flex-col sm:flex-row">
          <img 
            src={currentUser.avatar || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150'} 
            referrerPolicy="no-referrer"
            alt={currentUser.name} 
            className="h-16 w-16 rounded-full object-cover border-2 border-[#C5A059]"
          />
          <div>
            <h2 className="text-xl font-serif font-bold text-white uppercase">{currentUser.name}</h2>
            <div className="text-xs text-gray-300 font-mono mt-0.5">Office Title: {staffDetails?.designation} | Department: {staffDetails?.department}</div>
            <div className="text-[10px] text-gray-400 font-mono mt-1">KMU Central Admin Branch Desk: {staffDetails?.officeRoom}</div>
          </div>
        </div>
        <div className="shrink-0 flex gap-2">
          <span className="px-3 py-1 bg-blue-500/15 border border-blue-400/30 text-blue-300 rounded text-xs font-mono">System Auditor Role</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Selection Listing Panel on Left */}
        <div className="lg:col-span-5 bg-white border border-gray-200 rounded p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-gray-100 pb-2">
            <h3 className="font-serif font-bold text-sm text-[#0B2240]">Incoming Direct Admissions Applications</h3>
            <span className="text-[10px] font-mono text-gray-400 font-bold uppercase">{filteredApps.length} in progress</span>
          </div>

          {processSuccess && (
            <div className="p-3 bg-green-50 text-green-800 border border-green-200 text-xs font-semibold rounded">
              {processSuccess}
            </div>
          )}

          {/* Filters */}
          <div className="flex gap-2 items-center text-xs">
            <Filter className="h-4 w-4 text-gray-400 shrink-0" />
            <select 
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border border-gray-300 rounded p-1.5 focus:outline-none focus:border-[#C5A059]"
            >
              <option value="all">All States</option>
              <option value="submitted">Submitted</option>
              <option value="under_review">Under Review</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
            <div className="relative flex-1">
              <input 
                type="text" 
                placeholder="Search nominee..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full border border-gray-300 rounded py-1.5 pl-7 pr-3 text-xs focus:outline-none"
              />
              <Search className="absolute left-2 top-2 h-3.5 w-3.5 text-gray-400" />
            </div>
          </div>

          {/* List */}
          <div className="space-y-2.5 max-h-[450px] overflow-y-auto pr-1">
            {filteredApps.length === 0 ? (
              <div className="p-8 text-center text-gray-400 text-xs italic">No matching admissions registries in active logs.</div>
            ) : (
              filteredApps.map((app) => (
                <div 
                  key={app.id}
                  onClick={() => setSelectedAppId(app.id)}
                  className={`p-3.5 rounded border text-xs cursor-pointer transition-all ${
                    selectedAppId === app.id ? 'bg-[#142d4a]/5 border-[#C5A059] ring-2 ring-[#C5A059]/20' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex justify-between items-center mb-1.5">
                    <strong className="text-gray-900 font-bold block">{app.applicantName}</strong>
                    <span className={`px-2 py-0.5 rounded text-[9px] font-mono uppercase font-bold ${
                      app.status === 'approved' ? 'bg-green-50 text-green-700 border border-green-200' :
                      app.status === 'rejected' ? 'bg-red-50 text-red-700 border border-red-200' :
                      'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}>
                      {app.status.replace('_', ' ')}
                    </span>
                  </div>
                  <div className="text-gray-500 text-[10px] uppercase font-mono">{app.courseDegree} {app.programName}</div>
                  <div className="flex justify-between items-center mt-2.5 text-[10px] text-gray-400 font-mono">
                    <span>12th %: {app.educationInfo.percentage12th}%</span>
                    <span>Fee: {app.feePaid ? '✅ Paid' : '❌ Pending'}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Audit Sheets Workspace on Right */}
        <div className="lg:col-span-7 bg-white border border-gray-200 rounded p-6 shadow-sm min-h-[450px] flex flex-col justify-between">
          {selectedApp ? (
            <div className="space-y-6 text-xs">
              <div className="border-b border-gray-100 pb-3 flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-serif font-bold text-[#0B2240] tracking-tight">{selectedApp.applicantName}</h3>
                  <span className="text-gray-400 text-[10px] font-mono">Application Reference: {selectedApp.id}</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-mono font-bold uppercase text-gray-400">Status</span>
                  <div className="font-extrabold capitalize text-sm text-[#C5A059] mt-0.5">{selectedApp.status.replace('_', ' ')}</div>
                </div>
              </div>

              {/* Data Blocks */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded p-3 border border-gray-150 space-y-1">
                  <div className="text-gray-400 text-[9px] font-mono uppercase font-bold">Personal Credentials</div>
                  <div><strong className="text-gray-900">DOB:</strong> {selectedApp.personalInfo.dob} | {selectedApp.personalInfo.gender}</div>
                  <div><strong className="text-gray-900">Guardians:</strong> {selectedApp.personalInfo.parentsName}</div>
                  <div><strong className="text-gray-900">Contact:</strong> {selectedApp.personalInfo.phone}</div>
                  <div><strong className="text-gray-900">Address:</strong> {selectedApp.personalInfo.address}</div>
                </div>
                
                <div className="bg-gray-50 rounded p-3 border border-gray-150 space-y-1">
                  <div className="text-gray-400 text-[9px] font-mono uppercase font-bold">Educational Ledger</div>
                  <div><strong className="text-gray-900">12th Board:</strong> {selectedApp.educationInfo.board12th}</div>
                  <div><strong className="text-gray-900">12th Aggregate:</strong> {selectedApp.educationInfo.percentage12th}%</div>
                  {selectedApp.educationInfo.graduationDegree && (
                    <div><strong className="text-gray-900">Prior Grad:</strong> {selectedApp.educationInfo.graduationDegree} ({selectedApp.educationInfo.graduationPercentage}%)</div>
                  )}
                  {selectedApp.educationInfo.entranceScore && (
                    <div><strong className="text-gray-900">Entrance Scores:</strong> {selectedApp.educationInfo.entranceScore}</div>
                  )}
                </div>
              </div>

              {/* Document verification block */}
              <div className="space-y-2">
                <div className="text-gray-400 text-[9px] font-mono uppercase font-bold">Uploaded Documents Summary</div>
                <div className="grid grid-cols-2 gap-3 text-center text-xs">
                  <div className="p-2 border border-gray-200 bg-gray-50 rounded cursor-pointer hover:bg-gray-100 flex items-center justify-between" onClick={() => alert('Viewing 12th Marksheet PDF')}>
                    <span className="font-mono text-[10px]">📄 12th_Marksheet.pdf</span>
                    <span className="text-green-700 font-bold uppercase text-[9px]">Verified</span>
                  </div>
                  <div className="p-2 border border-gray-200 bg-gray-50 rounded cursor-pointer hover:bg-gray-100 flex items-center justify-between" onClick={() => alert('Viewing Photo Passport Identification')}>
                    <span className="font-mono text-[10px]">📷 Passport_Photo.jpeg</span>
                    <span className="text-green-700 font-bold uppercase text-[9px]">Verified</span>
                  </div>
                </div>
              </div>

              {/* State Transitions Form */}
              <div className="bg-gray-50 rounded border border-gray-200 p-4 space-y-4">
                <h4 className="font-serif font-bold text-xs text-gray-800">Process State Transitions</h4>
                
                <div className="space-y-1.5">
                  <label className="text-gray-500 uppercase font-mono text-[9px] font-bold">Auditor Notes / Resolution comments</label>
                  <input 
                    type="text"
                    required
                    placeholder="Provide specific details about seat numbers or documents required..."
                    value={rejectComment}
                    onChange={(e) => setRejectComment(e.target.value)}
                    className="w-full bg-white border border-gray-300 rounded p-2 text-xs focus:outline-none"
                  />
                </div>

                <div className="flex gap-2 flex-wrap">
                  <button 
                    onClick={() => handleProcessStatus(selectedApp.id, 'approved', rejectComment || 'Congratulations! Your files have been validated. Welcome newly admitted student!')}
                    className="bg-green-700 hover:bg-green-800 text-white rounded font-bold px-4 py-2 uppercase tracking-wide text-[10px]"
                  >
                    ✓ Verify & Approve Seat
                  </button>
                  <button 
                    onClick={() => handleProcessStatus(selectedApp.id, 'rejected', rejectComment || 'The admissions coordinator rejected the draft due to missing board certificate inputs.')}
                    className="bg-red-700 hover:bg-red-800 text-white rounded font-bold px-4 py-2 uppercase tracking-wide text-[10px]"
                  >
                    ✗ Decline Application
                  </button>
                  <button 
                    onClick={() => handleProcessStatus(selectedApp.id, 'under_review', rejectComment || 'Under-review: Awaiting physical signature verifications inside Mathura liaison center.')}
                    className="bg-amber-600 hover:bg-[#b08c48] text-white rounded font-bold px-4 py-2 uppercase tracking-wide text-[10px]"
                  >
                    ✎ Set Under-Review
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center p-12 text-gray-400 flex flex-col items-center justify-center h-full space-y-2">
              <FileText className="h-10 w-10 text-gray-300" />
              <h4 className="font-serif font-bold text-sm text-gray-700">Audit Desk Workspace</h4>
              <p className="text-xs max-w-sm text-gray-500 leading-relaxed">Select an active admissions application file from the left corridor stream to audit transcripts, review payments, and approve campus admissions.</p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
