/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { usePortal } from '../context/PortalContext';
import { 
  Award, 
  BookOpen, 
  Calendar, 
  Upload, 
  User as UserIcon,
  Check,
  AlertCircle,
  FileText,
  Clock,
  Plus,
  Cloud
} from 'lucide-react';

export const FacultyPortal: React.FC = () => {
  const { 
    currentUser, 
    loginAs, 
    enrollments, 
    materials, 
    assignments, 
    enterStudentMarks, 
    markStudentAttendance, 
    uploadCourseMaterial, 
    createAssignmentByFaculty,
    uploadFile,
    supabaseStatus,
    setIsLoginModalOpen,
    setLoginModalPreselectedRole
  } = usePortal();

  const [activeSection, setActiveSection] = useState<'attendance' | 'grading' | 'materials' | 'assignments'>('attendance');

  // Input states
  const [courseCodeMat, setCourseCodeMat] = useState('CS-302');
  const [titleMat, setTitleMat] = useState('');
  const [descMat, setDescMat] = useState('');
  const [matSuccess, setMatSuccess] = useState(false);

  // Assignment states
  const [courseCodeAsg, setCourseCodeAsg] = useState('CS-302');
  const [titleAsg, setTitleAsg] = useState('');
  const [descAsg, setDescAsg] = useState('');
  const [dueDateAsg, setDueDateAsg] = useState('2026-06-15');
  const [marksAsg, setMarksAsg] = useState('20');
  const [asgSuccess, setAsgSuccess] = useState(false);

  // Supabase states
  const [materialUrl, setMaterialUrl] = useState('');
  const [materialSize, setMaterialSize] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState('');

  const handleMaterialFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadProgress('Preparing upload connection to cloud server...');
    try {
      const res = await uploadFile(file);
      if (res.success) {
        setMaterialUrl(res.url);
        const sizeMb = (file.size / (1024 * 1024)).toFixed(2);
        setMaterialSize(`${sizeMb} MB`);
        setUploadProgress(res.msg || 'Syllabus attachment aligned successfully!');
      } else {
        setUploadProgress(`Upload error: ${res.msg}`);
      }
    } catch (err: any) {
      setUploadProgress(`Error: ${err.message || err}`);
    } finally {
      setIsUploading(false);
    }
  };

  if (!currentUser || currentUser.role !== 'faculty') {
    return (
      <div className="max-w-md mx-auto my-12 bg-white border border-gray-200 rounded p-8 text-center shadow-md space-y-4">
        <UserIcon className="h-12 w-12 text-[#C5A059] mx-auto" />
        <h3 className="text-xl font-serif font-bold text-[#0B2240]">Faculty Command Center</h3>
        <p className="text-xs text-gray-600">Secure entry point for certified educators and research clinicians under KM University Mathura.</p>
        <button 
          onClick={() => {
            setLoginModalPreselectedRole('faculty');
            setIsLoginModalOpen(true);
          }}
          className="bg-[#0B2240] hover:bg-[#123158] text-white py-2 px-6 rounded text-xs font-bold uppercase tracking-wider transition-colors border border-[#C5A059]"
        >
          Enter Faculty Credentials
        </button>
      </div>
    );
  }

  const facultyData = currentUser.facultyDetails;

  const handleMaterialUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!titleMat || !descMat) return;
    uploadCourseMaterial(courseCodeMat, titleMat, descMat, materialUrl, materialSize);
    setMatSuccess(true);
    setTitleMat('');
    setDescMat('');
    setMaterialUrl('');
    setMaterialSize('');
    setUploadProgress('');
    setTimeout(() => setMatSuccess(false), 4000);
  };

  const handleAssignmentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!titleAsg || !descAsg) return;
    createAssignmentByFaculty(courseCodeAsg, titleAsg, descAsg, dueDateAsg, parseFloat(marksAsg) || 20);
    setAsgSuccess(true);
    setTitleAsg('');
    setDescAsg('');
    setTimeout(() => setAsgSuccess(false), 4000);
  };

  return (
    <div id="faculty-portal-root" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-sans">
      
      {/* Faculty Info Card */}
      <div className="bg-[#0B2240] text-white rounded p-6 shadow-md mb-6 border-l-4 border-[#C5A059] flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4 text-center sm:text-left flex-col sm:flex-row">
          <img 
            src={currentUser.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150'} 
            referrerPolicy="no-referrer"
            alt={currentUser.name} 
            className="h-16 w-16 rounded-full object-cover border-2 border-[#C5A059]"
          />
          <div>
            <h2 className="text-xl font-serif font-bold text-white uppercase">{currentUser.name}</h2>
            <div className="text-xs text-gray-300 font-mono mt-0.5">Title: {facultyData?.designation} | Division: {facultyData?.department}</div>
            <div className="text-[10px] text-gray-400 font-mono mt-1">Specialization: {facultyData?.specialization}</div>
          </div>
        </div>
        <div className="text-center sm:text-right font-mono text-xs text-gray-300">
          <div>Office Location</div>
          <span className="text-[#C5A059] font-bold">{facultyData?.officeRoom || 'Admin C block'}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Navigation Grid */}
        <div className="bg-white border border-gray-200 rounded p-4 shadow-sm space-y-1">
          <div className="text-[10px] font-mono text-gray-400 font-bold uppercase tracking-wider mb-2 px-2">Workgroup Commands</div>
          <button 
            onClick={() => setActiveSection('attendance')}
            className={`w-full text-left py-2.5 px-3 text-xs font-medium rounded transition-colors ${activeSection === 'attendance' ? 'bg-[#142d4a] text-[#C5A059]' : 'text-gray-700 hover:bg-gray-100'}`}
          >
            📋 Attendance Logs
          </button>
          <button 
            onClick={() => setActiveSection('grading')}
            className={`w-full text-left py-2.5 px-3 text-xs font-medium rounded transition-colors ${activeSection === 'grading' ? 'bg-[#142d4a] text-[#C5A059]' : 'text-gray-700 hover:bg-gray-100'}`}
          >
            📊 Academic Marks Entry
          </button>
          <button 
            onClick={() => setActiveSection('materials')}
            className={`w-full text-left py-2.5 px-3 text-xs font-medium rounded transition-colors ${activeSection === 'materials' ? 'bg-[#142d4a] text-[#C5A059]' : 'text-gray-700 hover:bg-gray-100'}`}
          >
            📁 Syllabus Uploads
          </button>
          <button 
            onClick={() => setActiveSection('assignments')}
            className={`w-full text-left py-2.5 px-3 text-xs font-medium rounded transition-colors ${activeSection === 'assignments' ? 'bg-[#142d4a] text-[#C5A059]' : 'text-gray-700 hover:bg-gray-100'}`}
          >
            📝 Design Assignments ({assignments.length})
          </button>
        </div>

        {/* Console Workspace */}
        <div className="lg:col-span-3 bg-white border border-gray-200 rounded p-6 shadow-sm min-h-[400px]">
          
          {/* Attendance Section */}
          {activeSection === 'attendance' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                <h3 className="text-lg font-serif font-bold text-[#0B2240]">Course Attendance Tracking Ledger</h3>
                <span className="text-xs font-mono font-bold text-gray-500">Term Block: CS-302</span>
              </div>
              <p className="text-xs text-gray-600">View registered students and increment attendance rosters following each diagnostic mock lecture session.</p>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-[#0B2240] text-white font-mono text-[10px] uppercase font-bold tracking-wider">
                      <th className="py-2.5 px-4 rounded-l">Roll Number</th>
                      <th className="py-2.5 px-3">Student Name</th>
                      <th className="py-2.5 px-3 text-center">Attended lectures</th>
                      <th className="py-2.5 px-3 text-center">Ratio Rate</th>
                      <th className="py-2.5 px-4 text-right rounded-r">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {enrollments.map((enr) => (
                      <tr key={enr.id} className="border-b border-gray-100 hover:bg-gray-50/50">
                        <td className="py-3 px-4 font-mono font-bold text-[#0B2240]">{enr.rollNumber}</td>
                        <td className="py-3 px-3 font-semibold text-gray-900">{enr.studentName}</td>
                        <td className="py-3 px-3 text-center font-mono font-medium">{enr.attendance.attended} / {enr.attendance.total}</td>
                        <td className="py-3 px-3 text-center font-mono font-black text-green-700">
                          {Math.floor((enr.attendance.attended / enr.attendance.total) * 100)}%
                        </td>
                        <td className="py-3 px-4 text-right space-x-1.5">
                          <button 
                            onClick={() => markStudentAttendance(enr.id, true)}
                            className="bg-green-50 text-green-700 hover:bg-green-100 border border-green-200 py-1 px-2.5 rounded text-[10px] font-bold uppercase font-mono"
                          >
                            + Present
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Marks entry Section */}
          {activeSection === 'grading' && (
            <div className="space-y-6">
              <h3 className="text-lg font-serif font-bold text-[#0B2240] border-b border-gray-100 pb-2">Academic Grading and Marks Allocation</h3>
              <p className="text-xs text-gray-600">Inject grade elements directly. Setting all fields automatically computes standard letter grades (O, A+, A, etc.).</p>

              <div className="space-y-4">
                {enrollments.map((enr) => (
                  <div key={enr.id} className="border border-gray-200 rounded p-4 shadow-sm space-y-4 bg-gray-50/50">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-gray-100 pb-2">
                      <div>
                        <span className="text-[10px] bg-blue-50 text-blue-800 border border-blue-200.5 px-1.5 py-0.5 rounded font-mono font-bold">{enr.courseCode}</span>
                        <strong className="text-xs text-gray-900 ml-2 block sm:inline-block font-semibold">{enr.studentName} ({enr.rollNumber})</strong>
                      </div>
                      <div className="font-mono text-xs text-gray-500">
                        Final Computed Grade: <strong className="text-green-700 font-bold">{enr.marks.grade || 'Awaiting Grades'}</strong>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-center">
                      <div className="space-y-1">
                        <label className="text-[9px] uppercase font-mono font-bold text-gray-400 block">Internals (/20)</label>
                        <input 
                          type="number" 
                          min="0" 
                          max="20"
                          defaultValue={enr.marks.internal || ''}
                          placeholder="e.g. 18"
                          onBlur={(e) => enterStudentMarks(enr.id, 'internal', parseFloat(e.target.value) || 0)}
                          className="w-full border border-gray-300 rounded p-1.5 text-xs bg-white focus:outline-none"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] uppercase font-mono font-bold text-gray-400 block">Mid Sem (/20)</label>
                        <input 
                          type="number" 
                          min="0" 
                          max="20"
                          defaultValue={enr.marks.midSem || ''}
                          placeholder="e.g. 16"
                          onBlur={(e) => enterStudentMarks(enr.id, 'midSem', parseFloat(e.target.value) || 0)}
                          className="w-full border border-gray-300 rounded p-1.5 text-xs bg-white focus:outline-none"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] uppercase font-mono font-bold text-gray-400 block">End Sem (/80)</label>
                        <input 
                          type="number" 
                          min="0" 
                          max="80"
                          defaultValue={enr.marks.endSem || ''}
                          placeholder="e.g. 62"
                          onBlur={(e) => enterStudentMarks(enr.id, 'endSem', parseFloat(e.target.value) || 0)}
                          className="w-full border border-gray-300 rounded p-1.5 text-xs bg-white focus:outline-none"
                        />
                      </div>
                      <div className="text-center bg-white p-2 rounded border border-gray-200">
                        <span className="text-[9px] uppercase font-mono font-bold text-gray-400 block">Aggregate (/100)</span>
                        <strong className="text-sm font-black text-gray-800">{enr.marks.total !== undefined ? `${enr.marks.total}/100` : 'N/A'}</strong>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Materials Section */}
          {activeSection === 'materials' && (
            <div className="space-y-6">
              <h3 className="text-lg font-serif font-bold text-[#0B2240] border-b border-gray-100 pb-2">Publish Course Reference Materials</h3>
              
              {matSuccess && (
                <div className="p-3 bg-green-50 text-green-800 border border-green-200 rounded text-xs font-semibold">
                  Course syllabus asset published successfully. Available dynamically inside student portals.
                </div>
              )}

              <form onSubmit={handleMaterialUploadSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-gray-500 uppercase font-mono font-bold text-[9px]">Course code</label>
                    <select 
                      value={courseCodeMat} 
                      onChange={(e) => setCourseCodeMat(e.target.value)}
                      className="w-full border border-gray-300 rounded p-2.5 bg-gray-50 focus:outline-none"
                    >
                      <option value="CS-302">CS-302: Relational Databases & SQL</option>
                      <option value="CS-304">CS-304: Advanced Object Oriented Programming</option>
                      <option value="MA-310">MA-310: Discrete Engineering Mathematics</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-gray-500 uppercase font-mono font-bold text-[9px]">Asset Heading Title</label>
                    <input 
                      type="text" 
                      required 
                      value={titleMat}
                      onChange={(e) => setTitleMat(e.target.value)}
                      placeholder="e.g. Unit 3 normalization tutorials" 
                      className="w-full border border-gray-300 rounded p-2.5 bg-gray-50 focus:outline-none" 
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-gray-500 uppercase font-mono font-bold text-[9px]">Brief Description & Objectives</label>
                  <textarea 
                    required 
                    rows={3}
                    value={descMat}
                    onChange={(e) => setDescMat(e.target.value)}
                    placeholder="Provide details about recommended readings, laboratory steps, or computational constraints..." 
                    className="w-full border border-gray-300 rounded p-2.5 bg-gray-50 focus:outline-none"
                  ></textarea>
                </div>

                {/* Unified File selection field */}
                <div className="border border-gray-200 rounded p-4 bg-gray-50/50 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-mono font-bold text-gray-500">Curricula Reference File (Attachment)</span>
                    {supabaseStatus.configured ? (
                      <span className="text-green-600 text-[9px] font-bold">● Supabase Active</span>
                    ) : (
                      <span className="text-amber-600 text-[9px]">● Local simulation active</span>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* File chooser */}
                    <div className="relative border border-dashed border-gray-300 hover:border-[#C5A059] rounded p-3 text-center transition-all bg-white flex flex-col justify-center items-center">
                      <input 
                        type="file" 
                        accept=".pdf,image/*,.doc,.docx,.ppt,.pptx"
                        onChange={handleMaterialFileChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                      />
                      <Upload className="h-4.5 w-4.5 text-gray-400 mb-1" />
                      <span className="text-[10px] font-semibold text-gray-800">Select Syllabus Document</span>
                      <span className="text-[8px] text-gray-400">PDF, PPTX, Doc, Images (Max 25MB)</span>
                    </div>

                    {/* Path reference Display */}
                    <div className="flex flex-col justify-between space-y-1">
                      <div className="space-y-1">
                        <span className="text-[9px] font-mono text-gray-400 block uppercase">Manual Attachment URL</span>
                        <input 
                          type="url" 
                          placeholder="https://drive.google.com/or-supabase-file-link" 
                          value={materialUrl}
                          onChange={(e) => setMaterialUrl(e.target.value)}
                          className="w-full border border-gray-300 rounded p-2 bg-white focus:outline-none"
                        />
                      </div>
                      
                      {uploadProgress && (
                        <div className="p-2 border border-[#C5A059]/20 rounded-sm text-[9px] font-mono bg-[#ebd19d]/10 text-gray-800 text-left">
                          {uploadProgress}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={isUploading}
                  className="bg-[#0B2240] hover:bg-[#11315a] border border-[#C5A059] text-[#ebd19d] py-2.5 px-6 rounded text-xs font-bold uppercase tracking-wider transition-opacity disabled:opacity-50"
                >
                  {isUploading ? 'Streaming reference document...' : 'Publish Syllabus Asset'}
                </button>
              </form>

              {/* Uploaded List */}
              <div className="space-y-3 mt-8">
                <h4 className="font-bold text-xs text-gray-400 font-mono uppercase tracking-wider">My Shared Assets Ledger</h4>
                <div className="space-y-2">
                  {materials.map(mat => (
                    <div key={mat.id} className="border border-gray-100 bg-white p-3 rounded flex items-center justify-between text-xs shadow-sm">
                      <div className="flex gap-2 items-center">
                        <BookOpen className="h-4.5 w-4.5 text-[#C5A059]" />
                        <div>
                          <strong className="text-gray-900 block font-semibold">{mat.title}</strong>
                          <span className="text-[10px] font-mono text-gray-400">Class: {mat.courseCode} | Published on: {mat.uploadDate}</span>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono text-gray-400">Size: {mat.fileSize}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Assignments Section */}
          {activeSection === 'assignments' && (
            <div className="space-y-6">
              <h3 className="text-lg font-serif font-bold text-[#0B2240] border-b border-gray-100 pb-2">Design Homework & Field Projects</h3>
              
              {asgSuccess && (
                <div className="p-3 bg-green-50 text-green-800 border border-green-200 rounded text-xs font-semibold">
                  Course assignment task generated successfully. Listed under student workspace cards.
                </div>
              )}

              <form onSubmit={handleAssignmentSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-gray-500 uppercase font-mono font-bold text-[9px]">Target Subject</label>
                    <select 
                      value={courseCodeAsg} 
                      onChange={(e) => setCourseCodeAsg(e.target.value)}
                      className="w-full border border-gray-300 rounded p-2.5 bg-gray-50 focus:outline-none"
                    >
                      <option value="CS-302">CS-302: DBMS Relational Databases</option>
                      <option value="CS-304">CS-304: OOP Memory Allocation</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-gray-500 uppercase font-mono font-bold text-[9px]">Submission Deadline</label>
                    <input 
                      type="date" 
                      required 
                      value={dueDateAsg}
                      onChange={(e) => setDueDateAsg(e.target.value)}
                      className="w-full border border-gray-300 rounded p-2.5 bg-gray-50 focus:outline-none" 
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-gray-500 uppercase font-mono font-bold text-[9px]">Total Allocation Weight (Marks)</label>
                    <input 
                      type="number" 
                      required 
                      min="1"
                      value={marksAsg}
                      onChange={(e) => setMarksAsg(e.target.value)}
                      className="w-full border border-gray-300 rounded p-2.5 bg-gray-50 focus:outline-none" 
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-gray-500 uppercase font-mono font-bold text-[9px]">Assignment Task Title</label>
                  <input 
                    type="text" 
                    required 
                    value={titleAsg}
                    onChange={(e) => setTitleAsg(e.target.value)}
                    placeholder="e.g. Lab Exercise 4: SQL queries on multiplex schemas" 
                    className="w-full border border-gray-300 rounded p-2.5 bg-gray-50 focus:outline-none" 
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-gray-500 uppercase font-mono font-bold text-[9px]">Problem Statement & Rubric Criteria</label>
                  <textarea 
                    required 
                    rows={4}
                    value={descAsg}
                    onChange={(e) => setDescAsg(e.target.value)}
                    placeholder="Write detailed questions and requirements..." 
                    className="w-full border border-gray-300 rounded p-2.5 bg-gray-50 focus:outline-none"
                  ></textarea>
                </div>
                <button 
                  type="submit" 
                  className="bg-[#0B2240] hover:bg-[#11315a] border border-[#C5A059] text-[#ebd19d] py-2.5 px-6 rounded text-xs font-bold uppercase tracking-wider"
                >
                  Generate Assignment Task
                </button>
              </form>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
