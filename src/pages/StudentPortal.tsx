/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { usePortal } from '../context/PortalContext';
import { 
  FileText, 
  Calendar, 
  CheckCircle, 
  CreditCard, 
  Download, 
  User as UserIcon,
  HelpCircle,
  FileSpreadsheet,
  AlertOctagon,
  Bell,
  BookOpen,
  ArrowUpRight,
  Upload,
  Cloud
} from 'lucide-react';

export const StudentPortal: React.FC = () => {
  const { 
    currentUser, 
    loginAs, 
    enrollments, 
    assignments, 
    materials, 
    submitStudentAssignment, 
    submitStudentGrievance, 
    payTuitionFee,
    uploadFile,
    supabaseStatus,
    setIsLoginModalOpen,
    setLoginModalPreselectedRole
  } = usePortal();
  
  // Sub-tabs inside student portal
  const [activeSection, setActiveSection] = useState<'dashboard' | 'courses' | 'finance' | 'grades' | 'admitcard' | 'grievances'>('dashboard');
  
  // States for operations
  const [grievSubject, setGrievSubject] = useState('');
  const [grievDesc, setGrievDesc] = useState('');
  const [grievSuccess, setGrievSuccess] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState('');
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [selectedAsgId, setSelectedAsgId] = useState('');
  const [submissionUrl, setSubmissionUrl] = useState('');
  const [subSuccess, setSubSuccess] = useState('');

  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgressMsg, setUploadProgressMsg] = useState('');

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadProgressMsg('Uploading attachment securely to KMS...');
    try {
      const res = await uploadFile(file);
      if (res.success) {
        setSubmissionUrl(res.url);
        setUploadProgressMsg(res.msg || 'Attachment compiled successfully!');
      } else {
        setUploadProgressMsg(`Upload error: ${res.msg}`);
      }
    } catch (err: any) {
      setUploadProgressMsg(`Network error: ${err.message || err}`);
    } finally {
      setIsUploading(false);
    }
  };

  if (!currentUser || currentUser.role !== 'student') {
    return (
      <div className="max-w-md mx-auto my-12 bg-white border border-gray-200 rounded p-8 text-center shadow-md space-y-4">
        <UserIcon className="h-12 w-12 text-[#C5A059] mx-auto" />
        <h3 className="text-xl font-serif font-bold text-[#0B2240]">Secure Student Hub</h3>
        <p className="text-xs text-gray-600">Please authenticate with an active Student token to access grade reports, outstanding balances, and assignment files.</p>
        <button 
          onClick={() => {
            setLoginModalPreselectedRole('student');
            setIsLoginModalOpen(true);
          }}
          className="bg-[#0B2240] hover:bg-[#123158] text-white py-2 px-6 rounded text-xs font-bold uppercase tracking-wider transition-colors border border-[#C5A059]"
        >
          Enter Student Credentials
        </button>
      </div>
    );
  }

  const studentNum = currentUser.studentDetails?.rollNumber || 'KMU-2024-MC301';
  const studentData = currentUser.studentDetails;

  // Filter enrollments for this specific student
  const myEnrollments = enrollments.filter(e => e.rollNumber === studentNum);

  const handleGrievanceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!grievSubject || !grievDesc) return;
    submitStudentGrievance(grievSubject, grievDesc);
    setGrievSuccess(true);
    setGrievSubject('');
    setGrievDesc('');
    setTimeout(() => setGrievSuccess(false), 4000);
  };

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    const amt = parseFloat(paymentAmount);
    if (isNaN(amt) || amt <= 0) return;
    payTuitionFee(amt);
    setPaymentSuccess(true);
    setPaymentAmount('');
    setTimeout(() => setPaymentSuccess(false), 4000);
  };

  const handleAssignmentUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAsgId || !submissionUrl) return;
    submitStudentAssignment(selectedAsgId, submissionUrl);
    setSubSuccess('Assignment file validated and processed into faculty grading queue.');
    setSubmissionUrl('');
    setTimeout(() => setSubSuccess(''), 4000);
  };

  return (
    <div id="student-portal-root" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-sans">
      
      {/* Student Badge Row */}
      <div className="bg-[#0B2240] text-white rounded p-6 shadow-md mb-6 border-l-4 border-[#C5A059] flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4 text-center sm:text-left flex-col sm:flex-row">
          <img 
            src={currentUser.avatar || 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=150'} 
            referrerPolicy="no-referrer"
            alt={currentUser.name} 
            className="h-16 w-16 rounded-full object-cover border-2 border-[#C5A059]"
          />
          <div>
            <h2 className="text-xl font-serif font-bold text-white capitalize">{currentUser.name}</h2>
            <div className="text-xs text-gray-300 font-mono mt-0.5">Roll Number: {studentNum} | Dept: {studentData?.branch || 'General'}</div>
            <div className="text-[10px] text-gray-400 font-mono mt-1">KMU Institutional Member since: {currentUser.createdAt}</div>
          </div>
        </div>
        <div className="flex gap-2">
          <span className="px-3 py-1 bg-green-500/10 border border-green-500/30 rounded text-xs font-mono text-green-300">Semester {studentData?.semester || 1} Enrolled</span>
          <span className="px-3 py-1 bg-[#C5A059]/10 border border-[#C5A059]/30 rounded text-xs font-mono text-[#ebd19d]">Credits Earned: {studentData?.totalCreditsEarned || 0}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        
        {/* Navigation Sidebar */}
        <div className="bg-white border border-gray-200 rounded p-4 shadow-sm space-y-1">
          <div className="text-[10px] font-mono text-gray-400 font-bold uppercase tracking-wider mb-2 px-2">Workplace Modules</div>
          <button 
            onClick={() => setActiveSection('dashboard')}
            className={`w-full text-left py-2.5 px-3 text-xs font-medium rounded transition-colors ${activeSection === 'dashboard' ? 'bg-[#142d4a] text-[#C5A059]' : 'text-gray-700 hover:bg-gray-100'}`}
          >
            📊 Core Dashboard
          </button>
          <button 
            onClick={() => setActiveSection('courses')}
            className={`w-full text-left py-2.5 px-3 text-xs font-medium rounded transition-colors ${activeSection === 'courses' ? 'bg-[#142d4a] text-[#C5A059]' : 'text-gray-700 hover:bg-gray-100'}`}
          >
            📚 Courses & Materials ({myEnrollments.length})
          </button>
          <button 
            onClick={() => setActiveSection('finance')}
            className={`w-full text-left py-2.5 px-3 text-xs font-medium rounded transition-colors ${activeSection === 'finance' ? 'bg-[#142d4a] text-[#C5A059]' : 'text-gray-700 hover:bg-gray-100'}`}
          >
            💳 Tuition & Finance Ledger
          </button>
          <button 
            onClick={() => setActiveSection('grades')}
            className={`w-full text-left py-2.5 px-3 text-xs font-medium rounded transition-colors ${activeSection === 'grades' ? 'bg-[#142d4a] text-[#C5A059]' : 'text-gray-700 hover:bg-gray-100'}`}
          >
            🎓 Grade Sheets & Marksheets
          </button>
          <button 
            onClick={() => setActiveSection('admitcard')}
            className={`w-full text-left py-2.5 px-3 text-xs font-medium rounded transition-colors ${activeSection === 'admitcard' ? 'bg-[#142d4a] text-[#C5A059]' : 'text-gray-700 hover:bg-gray-100'}`}
          >
            🎟️ Exam Admit Cards (June 2026)
          </button>
          <button 
            onClick={() => setActiveSection('grievances')}
            className={`w-full text-left py-2.5 px-3 text-xs font-medium rounded transition-colors ${activeSection === 'grievances' ? 'bg-[#142d4a] text-[#C5A059]' : 'text-gray-700 hover:bg-gray-100'}`}
          >
            💬 Grievance & Liaison Box
          </button>
        </div>

        {/* Dynamic Content Panel */}
        <div className="lg:col-span-3 bg-white border border-gray-200 rounded p-6 shadow-sm min-h-[400px]">
          
          {/* Dashboard Module */}
          {activeSection === 'dashboard' && (
            <div className="space-y-6">
              <h3 className="text-lg font-serif font-bold text-[#0B2240] border-b border-gray-100 pb-2">Institutional Ledger Summary</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="border border-gray-200 rounded p-4 shadow-sm text-center">
                  <div className="text-gray-400 text-[10px] font-mono uppercase font-bold mb-1">Tuition Fees Unpaid</div>
                  <div className="text-xl font-black text-red-600">₹ {studentData?.outstandingFees || 0}</div>
                  <button onClick={() => setActiveSection('finance')} className="text-[#C5A059] text-[10px] uppercase font-bold mt-2 hover:indigo block mx-auto">Pay Ledger Balance</button>
                </div>
                <div className="border border-gray-200 rounded p-4 shadow-sm text-center">
                  <div className="text-gray-400 text-[10px] font-mono uppercase font-bold mb-1">Overall Attendance</div>
                  <div className="text-xl font-black text-green-700">{studentData?.attendanceOverall || 0}%</div>
                  <span className="text-[10px] text-gray-500 block mt-2">Required threshold: 75%</span>
                </div>
                <div className="border border-gray-200 rounded p-4 shadow-sm text-center">
                  <div className="text-gray-400 text-[10px] font-mono uppercase font-bold mb-1">Academic Adviser</div>
                  <div className="text-xs font-bold text-[#0B2240] truncate mt-1">Prof. Sumeet Gupta</div>
                  <span className="text-[10px] text-gray-400 block mt-2">School of Engineering</span>
                </div>
              </div>

              {/* Actionable items: Assignments Due & Alerts */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-gray-400 font-mono uppercase tracking-wider">Assignments Pending Grading</h4>
                  <div className="space-y-2">
                    {assignments.map(asg => {
                      const hasSubmitted = asg.submittedStudents.some(s => s.studentId === currentUser.id);
                      return (
                        <div key={asg.id} className="border border-gray-100 p-3 rounded bg-gray-50 flex items-center justify-between text-xs">
                          <div>
                            <strong className="text-gray-800 font-medium block truncate max-w-44">{asg.title}</strong>
                            <span className="text-[10px] font-mono text-gray-400">Due: {asg.dueDate} | Code: {asg.courseCode}</span>
                          </div>
                          {hasSubmitted ? (
                            <span className="px-2 py-0.5 bg-green-50 border border-green-200 text-green-700 text-[9px] font-mono rounded">Submitted</span>
                          ) : (
                            <span className="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-700 text-[9px] font-mono rounded">Pending</span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-gray-400 font-mono uppercase tracking-wider">Registrar Bulletins</h4>
                  <div className="bg-[#0B2240]/5 border border-[#C5A059]/20 rounded p-4 text-xs space-y-2">
                    <div className="flex gap-2">
                      <Bell className="h-4.5 w-4.5 text-[#C5A059] shrink-0" />
                      <div>
                        <strong>Physical Library Clearance</strong>
                        <p className="text-[11px] text-gray-600 mt-0.5">Please hand back overdue reference texts before June 10, 2026 to ensure examination admit cards generate successfully.</p>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* Courses & Materials Module */}
          {activeSection === 'courses' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                <h3 className="text-lg font-serif font-bold text-[#0B2240]">Course Registry & Syllabus Resources</h3>
                <span className="text-xs font-mono text-gray-500">Term: Spring Cycle 2026</span>
              </div>

              {/* Enrollment grid */}
              <div className="space-y-4">
                {myEnrollments.map((enr) => (
                  <div key={enr.id} className="border border-gray-200 rounded p-4 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <span className="text-[9px] font-mono bg-blue-50 border border-blue-200 text-blue-800 rounded px-2 py-0.5 font-bold uppercase">{enr.courseCode}</span>
                      <h4 className="text-xs font-bold text-gray-900">{enr.courseName}</h4>
                      <p className="text-[10px] text-gray-500 font-mono">Present lectures: {enr.attendance.attended} / {enr.attendance.total} lectures</p>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <span className="text-[9px] font-mono font-bold text-gray-400 block uppercase">Attendance Rate</span>
                        <span className={`text-xs font-bold ${((enr.attendance.attended/enr.attendance.total)*100) >= 75 ? 'text-green-700' : 'text-red-600'}`}>
                          {Math.floor((enr.attendance.attended / enr.attendance.total) * 100)}%
                        </span>
                      </div>
                      <div className="text-center">
                        <span className="text-[9px] font-mono font-bold text-gray-400 block uppercase">Internal Marks</span>
                        <span className="text-xs font-bold text-gray-800">{enr.marks.internal !== undefined ? `${enr.marks.internal}/20` : 'Pending'}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Assignments submission portal segment */}
              <div className="bg-gray-50 border border-gray-200 rounded p-4 text-xs mt-6">
                <h4 className="font-bold text-gray-800 mb-2 font-serif">Transmit Assignments Hand-In</h4>
                {subSuccess && <div className="p-3 bg-green-50 text-green-800 rounded mb-3 border border-green-200">{subSuccess}</div>}
                <form onSubmit={handleAssignmentUpload} className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-gray-500 text-[10px] uppercase font-mono">Select Assignment Task</label>
                      <select 
                        required 
                        value={selectedAsgId} 
                        onChange={(e) => setSelectedAsgId(e.target.value)} 
                        className="w-full border border-gray-300 rounded p-2 text-xs bg-white focus:outline-none"
                      >
                        <option value="">-- Choose Target --</option>
                        {assignments.map(a => (
                          <option key={a.id} value={a.id}>{a.title} ({a.courseCode})</option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-1 sm:col-span-2">
                      <label className="text-gray-500 text-[10px] uppercase font-mono flex items-center justify-between">
                        <span>Assignment Document Delivery File</span>
                        {supabaseStatus.configured ? (
                          <span className="text-green-600 text-[9px] font-bold">● Cloud Storage Active</span>
                        ) : (
                          <span className="text-amber-600 text-[9px]">● Local simulation active</span>
                        )}
                      </label>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-1">
                        {/* File Selector Dropzone */}
                        <div className="relative border-2 border-dashed border-gray-300 rounded p-3 hover:border-[#C5A059] bg-white transition-colors flex flex-col items-center justify-center text-center">
                          <input 
                            type="file" 
                            accept=".pdf,image/*,.doc,.docx"
                            onChange={handleFileChange}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                          />
                          <Upload className="h-5 w-5 text-gray-400 mb-1" />
                          <span className="text-[10px] font-semibold text-gray-700">Choose physical attachment File</span>
                          <span className="text-[8px] text-gray-400 mt-0.5">PDF, Word Document, or JPEG (Max 20MB)</span>
                        </div>

                        {/* Text URL Input URL fallback */}
                        <div className="space-y-2 flex flex-col justify-between">
                          <div className="space-y-1">
                            <span className="text-[9px] font-mono text-gray-400 block uppercase">Or deliver via direct URI location</span>
                            <input 
                              type="url" 
                              required 
                              placeholder="https://drive.google.com/or-supabase-file-link" 
                              value={submissionUrl} 
                              onChange={(e) => setSubmissionUrl(e.target.value)} 
                              className="w-full border border-gray-200 rounded p-2 text-xs bg-white focus:outline-none focus:border-[#C5A059]"
                            />
                          </div>
                          
                          {uploadProgressMsg && (
                            <div className="p-2 border border-[#C5A059]/20 rounded-sm text-[10px] font-mono bg-[#ebd19d]/10 text-gray-800">
                              {uploadProgressMsg}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <button 
                    type="submit" 
                    disabled={isUploading}
                    className="bg-[#0B2240] hover:bg-[#142d4a] border border-[#C5A059] text-[#ebd19d] py-2 px-5 rounded text-xs font-bold uppercase tracking-wider transition-opacity disabled:opacity-50"
                  >
                    {isUploading ? 'Streaming file...' : 'Submit Assignment File'}
                  </button>
                </form>
              </div>

              {/* Uploaded Materials from Faculty */}
              <div className="space-y-3 mt-6">
                <h4 className="font-bold text-xs text-gray-400 font-mono uppercase tracking-wider">Faculty Shared Syllabus Assets</h4>
                <div className="space-y-2">
                  {materials.map(mat => (
                    <div key={mat.id} className="border border-gray-100 bg-white p-3 rounded flex items-center justify-between text-xs hover:border-[#C5A059]">
                      <div className="flex gap-2 items-center">
                        <BookOpen className="h-4 w-4 text-[#C5A059] shrink-0" />
                        <div>
                          <strong className="text-gray-800 font-semibold block">{mat.title}</strong>
                          <span className="text-[10px] font-mono text-gray-400">Class: {mat.courseCode} | Uploaded by: {mat.uploadedBy} • {mat.uploadDate}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono text-gray-500">{mat.fileSize}</span>
                        <a 
                          href={mat.fileUrl || '#'} 
                          target={mat.fileUrl && mat.fileUrl !== '#' ? "_blank" : undefined}
                          rel="noreferrer"
                          className="p-1.5 hover:bg-[#ebd19d]/20 hover:text-[#C5A059] rounded text-gray-700" 
                          title={mat.fileUrl && mat.fileUrl !== '#' ? "Download/View Material File" : "Simulated Material Link"}
                        >
                          <Download className="h-4 w-4" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* Finance Ledger Module */}
          {activeSection === 'finance' && (
            <div className="space-y-6">
              <h3 className="text-lg font-serif font-bold text-[#0B2240] border-b border-gray-100 pb-2">Tuition Ledger and Ledger Auditing</h3>
              
              <div className="bg-gray-50 rounded border border-gray-200 p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-xs text-gray-500 uppercase tracking-wider block font-medium">PENDING TUITION FEES INSTRUCTIONS</span>
                  <div className="text-3xl font-black text-red-600">₹ {studentData?.outstandingFees || 0}</div>
                  <span className="text-[10px] text-gray-400 block font-mono">Session ID: KMU-TERM-4 (Spring Cycle)</span>
                </div>
                <div className="bg-white p-3 rounded border border-gray-300">
                  <span className="text-[10px] font-bold text-gray-400 font-mono block mb-1">TRANSMITTED FINANCIAL SUPPORT</span>
                  <div className="text-sm font-bold text-[#0C2546]">Shanti Devi Scholarship Schem (25% Covered)</div>
                </div>
              </div>

              {/* Fee clearance information card instead of payment form */}
              <div className="border border-amber-200 bg-amber-50/50 rounded p-5 shadow-sm text-xs space-y-3">
                <h4 className="font-serif font-black text-gray-900 text-sm flex items-center gap-1.5 label-alert text-amber-900">
                  ⚠️ Institutional Fee Settlement Policy
                </h4>
                <p className="text-gray-700 leading-relaxed">
                  In compliance with KM University central accounting guidelines, online fee collection through this portal has been disabled. All tuition balances, exam fees, and lab dues must be paid directly at the <b>Accounts Branch Registry</b>.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 font-mono text-[10px] text-gray-600">
                  <div className="space-y-1 bg-white p-3 rounded border border-amber-100">
                    <span className="font-bold text-[#0B2240] block uppercase">Physical Depositions</span>
                    <p>Accounts Desk #4, Ground Floor, Central Administrative Wing (09:00 AM – 04:00 PM).</p>
                  </div>
                  <div className="space-y-1 bg-white p-3 rounded border border-amber-100">
                    <span className="font-bold text-[#0B2240] block uppercase">By Demand Draft (DD)</span>
                    <p>In favor of <i>Shanti Devi Charitable Trust</i>, payable at Mathura NCT Delhi roadway.</p>
                  </div>
                </div>
                <div className="p-2.5 bg-amber-500/10 border border-amber-500/20 text-[10.5px] rounded italic text-amber-800">
                  Note: Outstanding balance ledger is refreshed automatically on this portal within 24–48 working hours from physical receipt verification by the registrar.
                </div>
              </div>

              {/* Simulated ledger logs */}
              <div className="space-y-2 mt-6">
                <h4 className="text-xs font-bold text-gray-400 font-mono uppercase tracking-wider">Fee Receipt Journals</h4>
                <div className="border border-gray-100 rounded text-xs bg-white shadow-sm overflow-hidden">
                  <div className="flex justify-between items-center bg-[#0B2240] text-white py-2 px-3 font-mono text-[10px] font-bold uppercase">
                    <span>TRANSACTION ID</span>
                    <span>PARTICULAR</span>
                    <span>AMOUNT PAID</span>
                    <span>DECREE</span>
                  </div>
                  <div className="flex justify-between items-center py-2.5 px-3 border-b border-gray-100 font-mono text-[11px]">
                    <span>TXN-98172635</span>
                    <span>Admission Fee Voucher</span>
                    <span className="text-green-700 font-bold">₹ 5,000</span>
                    <button onClick={() => alert('Download Receipt Successful. Receipt #KMU-REC-9817 in local storage.')} className="text-blue-600 hover:underline flex items-center gap-0.5 text-[10px]"><Download className="h-3 w-3" /> Download</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Grades Marks Module */}
          {activeSection === 'grades' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                <h3 className="text-lg font-serif font-bold text-[#0B2240]">Grade Sheets Registry</h3>
                <span className="text-xs font-mono text-gray-500">CGPA: {studentData?.cgpa || '8.74'}</span>
              </div>

              <div className="space-y-4">
                <div className="border border-gray-200 rounded overflow-hidden">
                  <div className="grid grid-cols-5 bg-[#0B2240] text-white text-[10px] font-mono font-bold uppercase py-2 px-3 text-center">
                    <span className="text-left">CODE</span>
                    <span className="text-left">COURSE TITLE</span>
                    <span>INT (/20)</span>
                    <span>END SEM (/80)</span>
                    <span>GRADE</span>
                  </div>
                  {myEnrollments.map((enr) => (
                    <div key={enr.id} className="grid grid-cols-5 text-xs text-gray-700 border-b border-gray-100 py-3 px-3 items-center text-center">
                      <span className="text-left font-mono font-bold">{enr.courseCode}</span>
                      <span className="text-left font-medium text-gray-900 truncate max-w-44" title={enr.courseName}>{enr.courseName}</span>
                      <span>{enr.marks.internal !== undefined ? enr.marks.internal : 'N/A'}</span>
                      <span>{enr.marks.endSem !== undefined ? enr.marks.endSem : 'N/A'}</span>
                      <span className="font-mono text-green-700 font-black">{enr.marks.grade || 'Under-review'}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-4 text-right">
                  <button 
                    onClick={() => alert(`Transmitting download request for official seals marksheet: ${studentNum}`)}
                    className="bg-[#0b2240] text-[#C5A059] border border-[#C5A059] py-2 px-4 rounded text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5"
                  >
                    <Download className="h-4 w-4" />
                    Download Signed Marksheet PDF
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Exam Admit Card Module */}
          {activeSection === 'admitcard' && (
            <div className="space-y-6">
              <h3 className="text-lg font-serif font-bold text-[#0B2240] border-b border-gray-100 pb-2">Examination Hall Ticket</h3>
              
              {studentData && studentData.outstandingFees > 0 ? (
                <div className="bg-amber-50 border border-amber-200 rounded p-6 text-center space-y-4">
                  <AlertOctagon className="h-10 w-10 text-amber-600 mx-auto" />
                  <h4 className="text-sm font-bold text-gray-800">Clearance Outstanding Hold</h4>
                  <p className="text-xs text-gray-600 max-w-md mx-auto">
                    Your institutional ledger shows an outstanding tuition balance of **₹ {studentData.outstandingFees}**. To automatically generate your June 2026 Examination hall ticket, please clear or secure outstanding dues.
                  </p>
                  <button 
                    onClick={() => setActiveSection('finance')}
                    className="bg-amber-600 hover:bg-amber-700 text-white rounded px-4 py-2 text-xs font-bold uppercase transition-colors"
                  >
                    Clear Ledger Balance
                  </button>
                </div>
              ) : (
                <div className="border-4 border-double border-[#0B2240] p-6 space-y-4 bg-[#FAFBF9] rounded">
                  <div className="text-center space-y-1 pb-3 border-b border-gray-300">
                    <span className="text-[10px] font-mono font-bold tracking-widest text-[#C5A059]">KM UNIVERSITY, MATHURA</span>
                    <h4 className="text-base font-serif font-bold text-[#0B2240] uppercase">Official Examination Admit Card</h4>
                    <span className="text-[10px] font-mono text-gray-500">EXAMINATION SEASON: JUNE 2026</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="space-y-1">
                      <div><strong className="text-gray-400 uppercase font-mono text-[9px]">Student Name</strong></div>
                      <div className="font-bold text-gray-900">{currentUser.name}</div>
                    </div>
                    <div className="space-y-1">
                      <div><strong className="text-gray-400 uppercase font-mono text-[9px]">Roll Number</strong></div>
                      <div className="font-mono font-bold text-[#0b2240]">{studentNum}</div>
                    </div>
                    <div className="space-y-1">
                      <div><strong className="text-gray-400 uppercase font-mono text-[9px]">Enrolled Degree</strong></div>
                      <div className="font-bold text-gray-800 truncate">{studentData?.program}</div>
                    </div>
                    <div className="space-y-1">
                      <div><strong className="text-gray-400 uppercase font-mono text-[9px]">Center venue</strong></div>
                      <div className="font-mono font-bold text-gray-800">C-BLOCK EXAMINATION ANNEX, SHANTI DEVI CAMPUS</div>
                    </div>
                  </div>

                  <div className="border-t border-gray-300 pt-4 space-y-2">
                    <div className="text-[10px] font-mono font-bold text-gray-400 uppercase">Registered Schedules</div>
                    <div className="bg-white rounded border border-gray-200">
                      <table className="w-full text-left text-xs">
                        <thead>
                          <tr className="bg-gray-100 border-b border-gray-200 text-[10px] font-mono uppercase tracking-wider">
                            <th className="py-2 px-3">Code</th>
                            <th className="py-2 px-3">Subject Name</th>
                            <th className="py-2 px-3">Timings</th>
                          </tr>
                        </thead>
                        <tbody>
                          {myEnrollments.map(e => (
                            <tr key={e.id} className="border-b border-gray-100">
                              <td className="py-2 px-3 font-mono font-bold">{e.courseCode}</td>
                              <td className="py-2 px-3 text-gray-700 truncate max-w-44">{e.courseName}</td>
                              <td className="py-2 px-3 text-gray-500 font-mono">09:30 AM - 12:30 PM</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="pt-4 flex items-center justify-between">
                    <div className="text-[9px] text-gray-400 italic">Signature: Controller of Examinations</div>
                    <button 
                      onClick={() => alert('PDF document compilation complete. Initiated secure print line.')}
                      className="bg-[#0B2240] hover:bg-[#123158] text-[#C5A059] px-4 py-2 font-bold uppercase text-[10px] rounded tracking-wider flex items-center gap-1"
                    >
                      <Download className="h-4.5 w-4.5" />
                      Print Admit Card
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Grievance Module */}
          {activeSection === 'grievances' && (
            <div className="space-y-6">
              <h3 className="text-lg font-serif font-bold text-[#0B2240] border-b border-gray-100 pb-2">Grievance & Student Welfare Liaison</h3>
              
              <div className="bg-white border border-gray-200 rounded p-5 shadow-sm space-y-4">
                <h4 className="font-serif font-bold text-sm text-gray-800">Submit New Liaison Token</h4>
                {grievSuccess && <div className="p-3 bg-green-50 text-green-800 border border-green-200 rounded text-xs">Liaison ticket logged. Student Welfare Unit notified immediately.</div>}
                <form onSubmit={handleGrievanceSubmit} className="space-y-3 text-xs">
                  <div className="space-y-1.5">
                    <label className="text-gray-500 uppercase font-mono text-[9px] font-bold">Ticket Subject Particular</label>
                    <input 
                      type="text" 
                      required 
                      placeholder="e.g. Hostels water logging issue" 
                      value={grievSubject} 
                      onChange={(e) => setGrievSubject(e.target.value)}
                      className="w-full border border-gray-300 rounded p-2.5 bg-gray-50 focus:outline-none focus:border-[#C5A059]" 
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-gray-500 uppercase font-mono text-[9px] font-bold">Detailed Description</label>
                    <textarea 
                      required 
                      rows={4}
                      placeholder="Please delineate timelines, specific block locations..." 
                      value={grievDesc} 
                      onChange={(e) => setGrievDesc(e.target.value)}
                      className="w-full border border-gray-300 rounded p-2.5 bg-gray-50 focus:outline-none focus:border-[#C5A059]"
                    ></textarea>
                  </div>
                  <button 
                    type="submit" 
                    className="bg-[#0B2240] hover:bg-[#11315a] border border-[#C5A059] text-white py-2.5 px-5 rounded text-xs font-bold uppercase tracking-wider"
                  >
                    Transmit Liaison Ticket
                  </button>
                </form>
              </div>

              {/* History */}
              <div className="space-y-2 mt-6">
                <h4 className="text-xs font-bold text-gray-400 font-mono uppercase tracking-wider">Liaison Submission Journals</h4>
                <div className="space-y-3">
                  {studentData?.grievancesSubmitted?.map((griv) => (
                    <div key={griv.id} className="border border-gray-200 rounded p-4 shadow-sm bg-white text-xs">
                      <div className="flex justify-between items-center mb-1.5">
                        <strong className="text-gray-900 font-semibold">{griv.subject}</strong>
                        <span className={`px-2 py-0.5 rounded text-[9px] font-mono uppercase font-bold ${
                          griv.status === 'resolved' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}>
                          {griv.status}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-2 leading-relaxed">{griv.description}</p>
                      {griv.reply && (
                        <div className="bg-[#0B2240]/5 p-3 rounded border-l-2 border-[#C5A059] text-gray-700">
                          <strong className="block text-[10px] font-mono text-gray-400 uppercase">Registrar coordinator reply:</strong>
                          <p className="mt-0.5">{griv.reply}</p>
                        </div>
                      )}
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
