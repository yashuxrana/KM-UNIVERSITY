/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { usePortal } from '../context/PortalContext';
import { 
  Award, 
  BookOpen, 
  FileText, 
  Search, 
  HelpCircle, 
  Server,
  Microscope,
  Compass
} from 'lucide-react';

interface ResearchPortalProps {
  currentTab: string;
}

export const ResearchPortal: React.FC<ResearchPortalProps> = ({ currentTab }) => {
  const { publications: researchPublications = [], projects: researchProjects = [] } = usePortal();
  const [searchQuery, setSearchQuery] = useState('');

  console.log('[ResearchPortal] currentTab:', currentTab);

  const filteredPubs = researchPublications.filter(pub => 
    pub.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    pub.authors.toLowerCase().includes(searchQuery.toLowerCase()) || 
    pub.keywords.some(k => k.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  if (!currentTab) return <div className="text-center p-12">Loading... or invalid tab.</div>;

  return (
    <div id="research-portal-root" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 font-sans">
      
      {/* Title header */}
      <div className="text-center max-w-2xl mx-auto space-y-4 mb-10">
        <Microscope className="h-10 w-10 text-[#C5A059] mx-auto" />
        <h2 className="text-3xl font-serif font-bold text-[#0B2240] tracking-tight">University Sponsored Projects & Scholarly Repositories</h2>
        <p className="text-xs text-gray-600 max-w-xl mx-auto">
          KM University's faculty experts conduct pioneering investigations backed by the Government of India's apex funding divisions (ICMR, DST, DBT, Ministry of Electronics).
        </p>
      </div>

      {currentTab === 'research-centers' ? (
        <div className="p-12 text-center border-2 border-dashed border-gray-200 rounded">
          <h3 className="text-xl font-serif text-[#0B2240]">Research Centers Directory</h3>
          <p className="text-xs text-gray-500 mt-2">Currently being updated by our Research Registry office.</p>
        </div>
      ) : (
        /* Grid displays */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left column schema: Sponsored projects (shown if research-projects or all/research) */}
          {(currentTab === 'research' || currentTab === 'research-projects') && (
            <div className={`bg-[#FAFBF9] border border-gray-200 rounded p-5 shadow-sm space-y-5 ${currentTab === 'research-projects' ? 'lg:col-span-12' : 'lg:col-span-4'}`}>
              <div className="border-b border-gray-150 pb-2">
                <h3 className="font-serif font-bold text-sm text-[#0B2240]">Government Funded Projects</h3>
                <span className="text-[9px] font-mono text-gray-400 uppercase tracking-wider block mt-1">Audit status: DST, ICMR active logs</span>
              </div>

              <div className="space-y-4">
                {researchProjects.map(proj => (
                  <div key={proj.id} className="bg-white border border-gray-200.5 p-4 rounded shadow-sm space-y-2">
                    <span className="px-2.5 py-0.5 bg-green-50 border border-green-200 text-green-700 text-[10px] font-mono rounded font-bold uppercase">{proj.status}</span>
                    <h4 className="text-xs font-serif font-extrabold text-gray-900 leading-snug">{proj.title}</h4>
                    <div className="text-[10px] text-gray-500 font-mono space-y-1">
                      <div><strong className="text-gray-700">Project Leader:</strong> {proj.piName}</div>
                      <div><strong className="text-gray-700">Sponsor Block:</strong> {proj.agency}</div>
                      <div><strong className="text-gray-700">Funding Budget:</strong> ₹ {proj.budgetAmount}</div>
                      <div><strong className="text-gray-700">Term Dates:</strong> {proj.duration}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Right column schema: Scholarly Publications database (shown if research-publications or all/research) */}
          {(currentTab === 'research' || currentTab === 'research-publications') && (
            <div className={`bg-white border border-gray-200 rounded p-6 shadow-sm space-y-6 ${currentTab === 'research-publications' ? 'lg:col-span-12' : 'lg:col-span-8'}`}>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-gray-100 pb-3">
                <h3 className="text-lg font-serif font-bold text-[#0B2240]">Certified Research Publications Directory</h3>
                <div className="relative w-full sm:w-64">
                  <input 
                    type="text" 
                    placeholder="Search publications abstracts..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full border border-gray-300 rounded py-1.5 pl-8 pr-3 text-xs bg-white focus:outline-none focus:border-[#C5A059]"
                  />
                  <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-gray-400" />
                </div>
              </div>

              <div className="space-y-6">
                {filteredPubs.length === 0 ? (
                  <div className="p-12 text-center text-gray-400 text-xs italic">No matching scientific publications found.</div>
                ) : (
                  filteredPubs.map(pub => (
                    <div key={pub.id} className="border-b border-gray-100 pb-5 space-y-2.5">
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] bg-blue-50 border border-blue-200 text-blue-800 rounded font-mono font-bold py-0.5 px-2 uppercase">{pub.journal}</span>
                        <span className="text-[10px] text-gray-400 font-mono">Date Published: {pub.year}</span>
                      </div>
                      <h4 className="text-base font-serif font-extrabold text-[#0B2240] leading-snug">{pub.title}</h4>
                      <div className="text-[11px] text-gray-600 font-medium">Authors: {pub.authors}</div>
                      <p className="text-xs text-gray-600 leading-relaxed bg-[#FAFBF9] p-3 rounded border border-gray-100 italic">
                        "Abstract: {pub.abstract}"
                      </p>
                      
                      {/* Keywords */}
                      <div className="flex flex-wrap items-center gap-1.5 pt-1">
                        {pub.keywords.map((kw, kIdx) => (
                          <span key={kIdx} className="text-[9.5px] bg-[#FAF1EC] border border-gray-200 text-gray-600 font-mono px-2 py-0.5 rounded-sm">
                            #{kw}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

        </div>
      )}

    </div>
  );
};
