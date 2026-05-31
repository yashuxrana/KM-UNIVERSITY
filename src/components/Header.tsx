/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { usePortal } from '../context/PortalContext';
import { UserRole } from '../types/university';
import { 
  GraduationCap, 
  Menu, 
  X, 
  ChevronDown, 
  LogIn, 
  LogOut, 
  User as UserIcon,
  BookOpen,
  Calendar,
  AlertCircle,
  Cloud,
  CloudOff,
  RefreshCw
} from 'lucide-react';

interface HeaderProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentTab, setCurrentTab }) => {
  const { 
    currentUser, 
    loginAs, 
    logout,
    supabaseStatus,
    syncStatus,
    syncWithSupabase,
    isLoadingCloudState,
    setIsLoginModalOpen,
    setLoginModalPreselectedRole
  } = usePortal();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const toggleDropdown = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  const selectTab = (tab: string) => {
    let targetTab = tab;
    if (tab === 'about-parent') {
      targetTab = 'about';
    } else if (tab === 'admissions-parent') {
      targetTab = 'admissions-ug';
    } else if (tab === 'academics-parent') {
      targetTab = 'schools';
    }
    setCurrentTab(targetTab);
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  };

  const isTabActive = (itemId: string) => {
    if (currentTab === itemId) return true;
    if (itemId === 'about-parent') {
      return ['about', 'vip-visitors'].includes(currentTab);
    }
    if (itemId === 'admissions-parent') {
      return ['admissions-parent', 'admissions-ug', 'admissions-pg', 'admissions-phd', 'scholarships', 'admission-portal'].includes(currentTab);
    }
    if (itemId === 'academics-parent') {
      return ['academics-parent', 'schools', 'programs', 'calendar'].includes(currentTab);
    }
    if (itemId === 'research') {
      return ['research', 'research-centers', 'research-publications', 'research-projects'].includes(currentTab);
    }
    return false;
  };

  const handlePortalLogin = (role: UserRole) => {
    setLoginModalPreselectedRole(role);
    setIsLoginModalOpen(true);
    setMobileMenuOpen(false);
    setActiveDropdown(null);
    if (role === 'student') selectTab('student-portal');
    else if (role === 'faculty') selectTab('faculty-portal');
    else if (role === 'staff') selectTab('staff-portal');
    else if (role === 'admin') selectTab('admin-portal');
  };

  const handleLogoutClick = () => {
    logout();
    selectTab('home');
  };

  const navItems = [
    { label: 'Home', id: 'home' },
    { 
      label: 'About KMU', 
      id: 'about-parent',
      dropdown: [
        { label: 'University Overview', id: 'about' },
        { label: 'VIP Visitors Gallery', id: 'vip-visitors' }
      ]
    },
    { 
      label: 'Admissions', 
      id: 'admissions-parent',
      dropdown: [
        { label: 'Undergraduate', id: 'admissions-ug' },
        { label: 'Postgraduate', id: 'admissions-pg' },
        { label: 'Doctoral (Ph.D.)', id: 'admissions-phd' },
        { label: 'Scholarships', id: 'scholarships' },
        { label: 'Apply Online', id: 'admission-portal' }
      ]
    },
    { 
      label: 'Academics', 
      id: 'academics-parent',
      dropdown: [
        { label: 'Schools & Depts', id: 'schools' },
        { label: 'Degree Programs', id: 'programs' },
        { label: 'Academic Calendar', id: 'calendar' }
      ]
    },
    { 
      label: 'Research', 
      id: 'research',
      dropdown: [
        { label: 'Research Centers', id: 'research-centers' },
        { label: 'Publications', id: 'research-publications' },
        { label: 'Sponsored Projects', id: 'research-projects' }
      ]
    },
    { label: 'Placements', id: 'placements' },
    { label: 'Events & News', id: 'events-news' },
    { label: 'Alumni', id: 'alumni' },
    { label: 'Contact', id: 'contact' }
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-[#0B2240] text-white shadow-md border-b-[3px] border-[#C5A059]">
      {/* Top Banner Bar */}
      <div className="bg-[#051121] py-1.5 px-4 sm:px-6 lg:px-8 text-xs border-b border-[#142d4a]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1 sm:gap-4 font-mono">
          <div className="flex items-center gap-4 text-gray-300">
            <span>📍 Mathura-Delhi Highway, NH-2, Mathura (UP)</span>
            <span className="hidden md:inline">📞 +91-9756664320</span>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-[#C5A059] hidden md:inline">Approved by UGC, Ministry of Education, Govt of India</span>
            
            {currentUser ? (
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-green-500"></span>
                <span className="text-gray-300">Logged in as: <strong className="text-white capitalize">{currentUser.role}</strong></span>
              </div>
            ) : (
              <span className="text-gray-400">Portal Systems Sandbox</span>
            )}
          </div>
        </div>
      </div>

      {/* Main Brand & Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex items-center justify-between">
          
          {/* Elegant University Crest & Name */}
          <div id="brand-crest" className="flex items-center gap-3 cursor-pointer" onClick={() => selectTab('home')}>
            <div className="h-12 w-12 bg-white p-0.5 rounded-md flex items-center justify-center shadow-inner overflow-hidden">
              <img 
                src="https://images.jdmagicbox.com/v2/comp/mathura/a8/9999px565.x565.231118123604.w7a8/catalogue/km-university-sonkh-mathura-universities-gro1i6zg8h.jpg" 
                alt="KM University Logo" 
                className="h-full w-full object-contain" 
              />
            </div>
            <div>
              <div className="text-base sm:text-lg font-serif font-bold tracking-wide text-white leading-tight">
                KM UNIVERSITY
              </div>
              <div className="text-[10px] sm:text-xs font-mono font-medium tracking-widest text-[#ebd19d]">
                MATHURA, INDIA • ESTD 2026
              </div>
            </div>
          </div>

          {/* Desktop Navigation Link Row */}
          <nav className="hidden lg:flex items-center gap-1.5">
            {navItems.map((item) => (
              <div key={item.id} className="relative group">
                {item.dropdown ? (
                  <div>
                    <button 
                      onClick={() => {
                        selectTab(item.id);
                        toggleDropdown(item.id);
                      }}
                      className={`px-3 py-1.5 rounded-sm text-xs font-medium tracking-wide transition-all outline-none flex items-center gap-1 hover:text-[#C5A059] ${
                        isTabActive(item.id)
                          ? 'text-[#C5A059] font-semibold bg-[#142d4a]' 
                          : 'text-gray-100'
                      }`}
                    >
                      {item.label}
                      <ChevronDown className="h-3 w-3 opacity-75" />
                    </button>
                    {/* Secondary Absolute Menu */}
                    <div className={`absolute top-full left-0 mt-1 w-52 bg-[#0B2240] border border-[#142d4a] rounded shadow-2xl py-1 transition-all z-50 group-hover:block ${
                      activeDropdown === item.id ? 'block' : 'hidden'
                    }`}>
                      <div className="h-0.5 w-full bg-[#C5A059]"></div>
                      {item.dropdown.map((sub) => (
                        <button
                          key={sub.id}
                          onClick={() => selectTab(sub.id)}
                          className={`w-full text-left px-4 py-2.5 text-xs tracking-wide transition-colors block hover:bg-[#142d4a] text-gray-200 hover:text-white ${
                            currentTab === sub.id ? 'bg-[#142d4a] text-[#C5A059] font-medium' : ''
                          }`}
                        >
                          {sub.label}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => selectTab(item.id)}
                    className={`px-3 py-1.5 rounded-sm text-xs font-medium tracking-wide transition-all ${
                      currentTab === item.id 
                        ? 'text-[#C5A059] font-semibold bg-[#142d4a]' 
                        : 'text-gray-100 hover:text-[#C5A059]'
                    }`}
                  >
                    {item.label}
                  </button>
                )}
              </div>
            ))}
          </nav>

          {/* Right Sided Account Portal Dropdowns */}
          <div className="hidden lg:flex items-center gap-3">
            {currentUser ? (
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => selectTab(`${currentUser.role}-portal`)}
                  className="flex items-center gap-2 bg-[#142d4a] hover:bg-[#1a385c] px-3 py-1.5 border border-[#C5A059] rounded-sm text-xs transition-colors"
                >
                  <UserIcon className="h-3.5 w-3.5 text-[#C5A059]" />
                  <span className="font-medium max-w-28 truncate">{currentUser.name}</span>
                </button>
                <button 
                  onClick={handleLogoutClick}
                  className="p-1.5 hover:bg-red-950/40 text-red-400 hover:text-red-300 rounded transition-colors text-xs flex items-center gap-1"
                  title="Log Out of Portal"
                >
                  <LogOut className="h-3.5 w-3.5" />
                  <span>Exit</span>
                </button>
              </div>
            ) : (
              <button 
                onClick={() => handlePortalLogin('admin')}
                className="flex items-center gap-1.5 bg-[#C5A059] hover:bg-[#b08c48] text-[#051121] px-4 py-1.5 rounded font-semibold text-xs tracking-wider uppercase transition-colors"
              >
                <LogIn className="h-3.5 w-3.5" />
                Admin Portal
              </button>
            )}
          </div>

          {/* Mobile responsive toggle */}
          <div className="flex items-center gap-3 lg:hidden">
            {currentUser && (
              <button 
                onClick={() => selectTab(`${currentUser.role}-portal`)}
                className="p-1.5 bg-[#142d4a] rounded text-[#C5A059]"
                title="Go to Active Dashboard"
              >
                <UserIcon className="h-4 w-4" />
              </button>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded bg-[#142d4a] text-white hover:text-[#C5A059] focus:outline-none"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile drawer selection */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0c2546] border-t border-[#14325a] px-4 pt-2 pb-6 space-y-3 shadow-inner">
          <div className="space-y-1">
            {navItems.map((item) => (
              <div key={item.id} className="border-b border-[#14325a]/40 pb-1 pt-1">
                {item.dropdown ? (
                  <div>
                    <div className="text-xs font-semibold uppercase text-gray-400 py-1.5 px-2">
                      {item.label}
                    </div>
                    <div className="pl-4 space-y-1 mt-1">
                      {item.dropdown.map((sub) => (
                        <button
                          key={sub.id}
                          onClick={() => selectTab(sub.id)}
                          className={`w-full text-left block py-1.5 px-2 text-xs text-gray-200 rounded hover:bg-[#142d4a] hover:text-white ${
                            currentTab === sub.id ? 'bg-[#142d4a] text-[#C5A059] font-medium' : ''
                          }`}
                        >
                          • {sub.label}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => selectTab(item.id)}
                    className={`w-full text-left block py-2 px-2 text-xs text-gray-100 rounded hover:bg-[#142d4a] ${
                      currentTab === item.id ? 'bg-[#142d4a] text-[#C5A059] font-medium' : 'hover:text-white'
                    }`}
                  >
                    {item.label}
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Core roles quick launcher for mobile */}
          <div className="pt-4 border-t border-[#14325a] space-y-2">
            {!currentUser ? (
              <div>
                <div className="text-[10px] font-mono text-gray-400 mb-2 px-2 tracking-widest uppercase">
                  ADMIN REGISTRY gateway
                </div>
                <div className="text-center">
                  <button 
                    onClick={() => handlePortalLogin('admin')}
                    className="w-full bg-[#C5A059] text-black text-xs py-2 px-2 rounded font-bold flex items-center justify-center gap-1"
                  >
                    👑 enter Super Admin dashboard
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between bg-[#041121] p-3 rounded border border-[#142d4a]">
                <div className="flex items-center gap-2">
                  <UserIcon className="h-3.5 w-3.5 text-[#C5A059]" />
                  <div>
                    <div className="text-xs font-bold truncate max-w-44 text-white">{currentUser.name}</div>
                    <div className="text-[10px] text-gray-400 capitalize">{currentUser.role} Account</div>
                  </div>
                </div>
                <button 
                  onClick={handleLogoutClick}
                  className="bg-red-950 hover:bg-red-900 border border-red-800 text-red-200 p-1.5 rounded text-xs"
                >
                  <LogOut className="h-3 w-3" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
