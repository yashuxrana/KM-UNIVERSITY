/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  User,
  UserRole,
  AdmissionApplication,
  Notice,
  PlacementDrive,
  PlacementStatistic,
  ResearchPublication,
  ResearchProject,
  EBook,
  EventRecord,
  StudentEnrollment,
  Assignment,
  CourseMaterial,
  VIPGuest,
  CampusSpot
} from '../types/university';

import {
  INITIAL_NOTICES,
  INITIAL_PLACEMENT_DRIVES,
  PLACEMENT_STATS,
  INITIAL_RESEARCH_PUBLICATIONS,
  INITIAL_RESEARCH_PROJECTS,
  INITIAL_EBOOKS,
  INITIAL_EVENTS,
  INITIAL_ENROLLMENTS,
  INITIAL_ASSIGNMENTS,
  INITIAL_MATERIALS
} from '../data/initialData';

// Simulated current users
const SYSTEM_USERS: User[] = [
  {
    id: 'stud-101',
    email: 'student@kmu.edu.in',
    name: 'Aarav Singhal',
    role: 'student',
    phone: '+91 9876543210',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=150',
    createdAt: '2024-07-15',
    studentDetails: {
      rollNumber: 'KMU-2024-MC301',
      enrollmentNo: 'ENR2409817',
      program: 'Bachelor of Technology (B.Tech)',
      branch: 'Computer Science & Engineering',
      school: 'School of Engineering & Technology',
      semester: 4,
      batch: '2024 - 2028',
      academicAdviser: 'Prof. Sumeet Gupta',
      cgpa: 8.74,
      totalCreditsEarned: 76,
      outstandingFees: 45000,
      attendanceOverall: 84,
      grievancesSubmitted: [
        {
          id: 'griv-01',
          subject: 'Lab AC unit replacement',
          description: 'The AC unit in Lab 4 (Computer Center) has been malfunctioning for 2 weeks. It is difficult to code under warm conditions.',
          status: 'resolved',
          date: '2026-05-10',
          reply: 'We have dispatched maintenance. The fan coil unit was cleaned on May 15. Standard temperatures restored.'
        }
      ]
    }
  },
  {
    id: 'fac-201',
    email: 'faculty@kmu.edu.in',
    name: 'Prof. Sumeet Gupta',
    role: 'faculty',
    phone: '+91 9911882233',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150',
    createdAt: '2020-03-12',
    facultyDetails: {
      employeeId: 'EMP-FAC-504',
      designation: 'Professor & Head',
      school: 'School of Engineering & Technology',
      department: 'Computer Science & Engineering',
      qualification: 'Ph.D. in Mobile Databases (IIT Kharagpur)',
      specialization: 'Distributed Database Systems, IoT Telemetry',
      officeRoom: 'Block C, Room 304'
    }
  },
  {
    id: 'staff-301',
    email: 'staff@kmu.edu.in',
    name: 'Mrs. Neeta Agarwal',
    role: 'staff',
    phone: '+91 9897116655',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150',
    createdAt: '2021-08-01',
    staffDetails: {
      employeeId: 'EMP-ADM-401',
      designation: 'Senior Registrar Coordinator',
      department: 'Academic Registry & Admissions Hub',
      officeRoom: 'Main Admin Wing, Desk 12'
    }
  },
  {
    id: 'admin-001',
    email: 'admin@kmu.edu.in',
    name: 'Dr. Manoj Kumar Shastri',
    role: 'admin',
    phone: '+91 9999988888',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
    createdAt: '2019-01-10'
  }
];

interface SEOConfiguration {
  title: string;
  metaDescription: string;
  keywords: string;
}

interface PortalContextType {
  currentUser: User | null;
  allUsers: User[];
  applications: AdmissionApplication[];
  notices: Notice[];
  placementDrives: PlacementDrive[];
  placementStats: PlacementStatistic[];
  publications: ResearchPublication[];
  projects: ResearchProject[];
  ebooks: EBook[];
  events: EventRecord[];
  enrollments: StudentEnrollment[];
  assignments: Assignment[];
  materials: CourseMaterial[];
  seoConfig: SEOConfiguration;

  // Authentication & Simulation Operations
  loginAs: (role: UserRole, specificEmail?: string) => void;
  logout: () => void;
  registerUser: (name: string, email: string, role: UserRole, customDetails?: any) => User;
  isLoginModalOpen: boolean;
  setIsLoginModalOpen: (open: boolean) => void;
  loginModalPreselectedRole: UserRole | null;
  setLoginModalPreselectedRole: (role: UserRole | null) => void;

  // Admissions system
  applyAdmission: (appData: any) => void;
  submitApplication: (appData: Omit<AdmissionApplication, 'id' | 'applicantId' | 'applicantName' | 'applicantEmail' | 'status' | 'feePaid'>) => void;
  payApplicationFee: (applicationId: string) => void;
  updateApplicationStatus: (id: string, status: AdmissionApplication['status'], comments?: string) => void;

  // Student specific operations
  submitStudentAssignment: (assignmentId: string, fileUrl: string) => void;
  submitStudentGrievance: (subject: string, description: string) => void;
  payTuitionFee: (amount: number) => void;

  // Faculty specific operations
  enterStudentMarks: (enrollmentId: string, examType: 'midSem' | 'endSem' | 'internal', score: number) => void;
  markStudentAttendance: (enrollmentId: string, increment: boolean) => void;
  uploadCourseMaterial: (courseCode: string, title: string, description: string, fileUrl?: string, fileSize?: string) => void;
  createAssignmentByFaculty: (courseCode: string, title: string, description: string, dueDate: string, totalMarks: number) => void;

  // Admin CRUD operations
  addNotice: (notice: Omit<Notice, 'id' | 'date'>) => void;
  deleteNotice: (id: string) => void;
  editNotice: (notice: Notice) => void;
  addEvent: (event: Omit<EventRecord, 'id' | 'registrantsCount'>) => void;
  deleteEvent: (id: string) => void;
  registerForEvent: (id: string) => void;
  addEbook: (book: Omit<EBook, 'id'>) => void;
  deleteEbook: (id: string) => void;
  addPublication: (pub: Omit<ResearchPublication, 'id'>) => void;
  deletePublication: (id: string) => void;
  addProject: (proj: Omit<ResearchProject, 'id'>) => void;
  deleteProject: (id: string) => void;
  addPlacementDrive: (drive: Omit<PlacementDrive, 'id' | 'registeredStudentsCount'>) => void;
  deletePlacementDrive: (id: string) => void;
  registerForPlacement: (driveId: string) => void;
  updateSeoSettings: (config: SEOConfiguration) => void;

  // VIP & Campus Spot management
  vipGuests: VIPGuest[];
  campusSpots: CampusSpot[];
  addVIPGuest: (guest: Omit<VIPGuest, 'id'>) => void;
  updateVIPGuest: (guest: VIPGuest) => void;
  deleteVIPGuest: (id: string) => void;
  addCampusSpot: (spot: Omit<CampusSpot, 'id'>) => void;
  updateCampusSpot: (spot: CampusSpot) => void;
  deleteCampusSpot: (id: string) => void;

  isLoadingCloudState: boolean;
  supabaseStatus: { configured: boolean; url: string | null; bucket: string | null; info: string };
  syncStatus: 'idle' | 'syncing' | 'synced' | 'error';
  syncWithSupabase: (latestState?: any) => Promise<boolean>;
  uploadFile: (file: File) => Promise<{ success: boolean; url: string; msg: string }>;
}

const INITIAL_VIP_GUESTS: VIPGuest[] = [
  {
    id: 'vip-1',
    name: 'Shri Yogi Adityanath',
    title: 'Chief Minister of Uttar Pradesh',
    category: 'government',
    visitDate: 'April 14, 2026',
    event: 'KMU Campus Inauguration & Super-Specialty Medical Wing Dedication',
    photoUrl: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=300',
    quotes: 'KM University represents a massive paradigm shift in healthcare and technical literacy in the Mathura-Vrindavan green corridor. The integration of clinical study with sustainable engineering is commendable.',
    departmentHosted: 'Shanti Devi Charitable Trust & Office of the Vice-Chancellor',
    keyHighlights: [
      'Dedicated the 750-bed KMU Super Specialty Wing to rural patients.',
      'Presided over the central seed funding allocation for regional agro-tech research.'
    ]
  },
  {
    id: 'vip-2',
    name: 'Smt. Droupadi Murmu',
    title: 'President of India',
    category: 'government',
    visitDate: 'May 10, 2026',
    event: 'First Convocation Ceremony & Research Center Foundation Stone Laying',
    photoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=300',
    quotes: 'The bright young minds graduating from KM University today hold the key to an empowered and clinical-focused India. I am particularly touched to see the massive scholarship enrollment ratio for underprivileged girl students.',
    departmentHosted: 'University Academic Senate',
    keyHighlights: [
      'Delivered the main Convocation address to 1,200 pioneering graduates.',
      'Laid the foundation stone for the state-of-the-art Shanti Devi Advanced Biotech Lab.'
    ]
  },
  {
    id: 'vip-3',
    name: 'Dr. Mansukh Mandaviya',
    title: 'Union Minister for Health & Family Welfare',
    category: 'government',
    visitDate: 'March 18, 2026',
    event: 'KMU-KD Medical Center Research Conclave',
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300',
    quotes: 'The clinical facilities at KM University are and will remain a gold standard for western Uttar Pradesh. By bridging medical students directly with actual village clinical care camps, we are creating empathetic practitioners.',
    departmentHosted: 'Faculty of Clinical Medicine & Dental Centers',
    keyHighlights: [
      'Reviewed the telemedicine network connecting 42 villages in Mathura district.',
      'Inaugurated the KD Clinical Research Laboratories and Diagnostics Center.'
    ]
  },
  {
    id: 'vip-4',
    name: 'Sri Sri Ravi Shankar',
    title: 'Spiritual Leader & Humanitarian, Founder of Art of Living',
    category: 'spiritual',
    visitDate: 'January 22, 2026',
    event: 'Inaugural Youth Wellness Summit & Meditation Center Dedication',
    photoUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=300',
    quotes: 'Education is complete only when it nurtures both the intellect and the heart. KM University’s emphasis on mindfulness alongside digital technologies is a blessing to the country.',
    departmentHosted: 'Department of Student Affairs & Welfare',
    keyHighlights: [
      'Conducted a collective peace meditation session for 3,500 students.',
      'Dedicated the KMU Sunrise Mindfulness Pavilion in the central forest.'
    ]
  },
  {
    id: 'vip-5',
    name: 'Shri Nitin Gadkari',
    title: 'Union Minister for Road Transport & Highways',
    category: 'government',
    visitDate: 'February 28, 2026',
    event: 'Smart Civil Transit & Sustainable Infra-Sectors Symposium',
    photoUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=300',
    quotes: 'Uttar Pradesh is transforming rapidly, and institutes like KM University which research hydrogen fuel-cells and green-engineered campus grids are critical for creating carbon-neutral development.',
    departmentHosted: 'School of Sustainable Engineering & Green Transit Labs',
    keyHighlights: [
      'Unveiled the Zero-Carbon Solar Shuttle program for Mathura highways.',
      'Laid down strategic directions for regional logistics and structural research.'
    ]
  },
  {
    id: 'vip-6',
    name: 'Dr. Wendy Sherman',
    title: 'Global Health Policy Coordinator & WHO Regional Delegate',
    category: 'academia',
    visitDate: 'May 05, 2026',
    event: 'International Public Health Audit & MoU Signing',
    photoUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=300',
    quotes: 'The rapid community outreach action model formulated by KMU Clinical Division is an internationally reproducible blueprint. Their rural clinical outreach logs are precise and highly actionable.',
    departmentHosted: 'School of Allied Health Sciences & Community Medicine',
    keyHighlights: [
      'Signed an academic exchange MoU for community public health audits.',
      'Visited rural clinics hosted by interns and postgraduate doctors.'
    ]
  }
];

const INITIAL_CAMPUS_SPOTS: CampusSpot[] = [
  {
    id: 'spot-1',
    name: 'K.D. Medical College & Hospital Complex',
    category: 'clinical',
    coordinateX: 25,
    coordinateY: 45,
    description: 'Our state-of-the-art super specialty tertiary hospital with 300+ ICU and general nursing beds, advanced life support systems, and molecular diagnostics research blocks.',
    features: ['Modern MRI & CT Scanners', 'Open Heart Surgery Suites', '24/7 Emergency Trauma Center', 'Pediatric Super Specialty Outposts'],
    imageUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=600',
    stat: '720+ Daily Outpatients Serviced'
  },
  {
    id: 'spot-2',
    name: 'Advanced Software & Robotics Wing (Block C)',
    category: 'academic',
    coordinateX: 60,
    coordinateY: 30,
    description: 'Home to the School of Engineering & Technology. Equips computer science labs with high-performance workstation clusters, micro-controller arrays, and server-tier local data terminals.',
    features: ['GPU workloads cluster', 'Cybersecurity forensics terminal', 'Humanoid robotics assembly floor', 'Cloud microservices test platform'],
    imageUrl: 'https://images.unsplash.com/photo-1562774053-401386dfdf8f?auto=format&fit=crop&q=80&w=600',
    stat: '100% Digital Workstation Density'
  },
  {
    id: 'spot-3',
    name: 'Radhakrishnan Central Library & Archive',
    category: 'hub',
    coordinateX: 45,
    coordinateY: 65,
    description: 'A structural masterpiece housing over 85,000 physical volumes, a vast digital repository catalog of e-books, journals, and ancient surgical/pharmacological treatise reproductions.',
    features: ['Silent reference halls', 'RFID automated checkout gates', '250-seat multimedia research bay', 'E-journals subscription feeds'],
    imageUrl: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=600',
    stat: '85,000+ Bound Archive Volumes'
  },
  {
    id: 'spot-4',
    name: 'Ramanujan Medical & Pharmacy Research Center',
    category: 'clinical',
    coordinateX: 75,
    coordinateY: 55,
    description: 'Dedicated chemical and biochemical synthesis laboratories. Certified researchers conduct DST-sponsored trials on polymeric splints and organic nutrient transformation.',
    features: ['High-performance chromatography engines', 'Spectral molecular sensors', 'Sterilized cell cultivation cabinets', 'Drug formulation press lines'],
    imageUrl: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&q=80&w=600',
    stat: '₹4.5Cr+ Sponsored Projects Value'
  },
  {
    id: 'spot-5',
    name: 'Vrindavan Boys & Yamuna Girls Hostels Block',
    category: 'life',
    coordinateX: 18,
    coordinateY: 75,
    description: 'Deluxe fully-airconditioned double and single lodging units. Includes round-the-clock water and power grids, multi-cuisine clean mess facilities, and outdoor recreation zones.',
    features: ['Fiber Ethernet link in study rooms', 'State-of-the-art power grids', 'Hygienically verified kitchens', 'Indoor tennis & basketball tables'],
    imageUrl: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&q=80&w=600',
    stat: '1,800+ On-campus Housing Slots'
  }
];

const PortalContext = createContext<PortalContextType | undefined>(undefined);

export const PortalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Try to load initial database state from localStorage or use defaults
  const loadState = <T,>(key: string, defaultValue: T): T => {
    const saved = localStorage.getItem(`kmu_db_${key}`);
    return saved ? JSON.parse(saved) : defaultValue;
  };

  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('kmu_current_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [allUsers, setAllUsers] = useState<User[]>(() => loadState('users', SYSTEM_USERS));
  const [applications, setApplications] = useState<AdmissionApplication[]>(() => loadState('applications', []));
  const [notices, setNotices] = useState<Notice[]>(() => loadState('notices', INITIAL_NOTICES));
  const [placementDrives, setPlacementDrives] = useState<PlacementDrive[]>(() => loadState('placement_drives', INITIAL_PLACEMENT_DRIVES));
  const [placementStats, setPlacementStats] = useState<PlacementStatistic[]>(() => loadState('placement_stats', PLACEMENT_STATS));
  const [publications, setPublications] = useState<ResearchPublication[]>(() => loadState('publications', INITIAL_RESEARCH_PUBLICATIONS));
  const [projects, setProjects] = useState<ResearchProject[]>(() => loadState('projects', INITIAL_RESEARCH_PROJECTS));
  const [ebooks, setEbooks] = useState<EBook[]>(() => loadState('ebooks', INITIAL_EBOOKS));
  const [events, setEvents] = useState<EventRecord[]>(() => loadState('events', INITIAL_EVENTS));
  const [enrollments, setEnrollments] = useState<StudentEnrollment[]>(() => loadState('enrollments', INITIAL_ENROLLMENTS));
  const [assignments, setAssignments] = useState<Assignment[]>(() => loadState('assignments', INITIAL_ASSIGNMENTS));
  const [materials, setMaterials] = useState<CourseMaterial[]>(() => loadState('materials', INITIAL_MATERIALS));
  const [seoConfig, setSeoConfig] = useState<SEOConfiguration>(() => loadState('seo_config', {
    title: 'KM University, Mathura - Premier Academic & Research Institution in India',
    metaDescription: 'KM University, Mathura offers state-of-the-art education in Medicine, Dental Sciences, Pharmacy, Engineering, and Law. Powered by excellence and global partnerships.',
    keywords: 'KM University, KD Medical College, Universities in Mathura, Private Universities UP, Medical College Mathura, Engineering, Admission 2026'
  }));

  const [vipGuests, setVipGuests] = useState<VIPGuest[]>(() => loadState('vip_guests', INITIAL_VIP_GUESTS));
  const [campusSpots, setCampusSpots] = useState<CampusSpot[]>(() => loadState('campus_spots', INITIAL_CAMPUS_SPOTS));

  const [isLoadingCloudState, setIsLoadingCloudState] = useState(false);
  const [hasHydrated, setHasHydrated] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [loginModalPreselectedRole, setLoginModalPreselectedRole] = useState<UserRole | null>(null);
  const [supabaseStatus, setSupabaseStatus] = useState<{ configured: boolean; url: string | null; bucket: string | null; info: string }>({
    configured: false,
    url: null,
    bucket: null,
    info: 'Evaluating credentials...'
  });
  const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing' | 'synced' | 'error'>('idle');

  // Load initial state from database (local space)
  useEffect(() => {
    setSupabaseStatus({
      configured: false,
      url: null,
      bucket: null,
      info: 'Client-side container active. System operates with secure offline state persistence.'
    });
    setIsLoadingCloudState(false);
    setSyncStatus('synced');
    setHasHydrated(true);
  }, []);

  // Helper routine to save state (fully offline local storage)
  const syncWithSupabase = async (stateOverride?: any) => {
    setSyncStatus('synced');
    return true;
  };

  // Auto-sync state changes (no operations since we save to localStorage separately below)
  useEffect(() => {
    if (!hasHydrated) return;
    setSyncStatus('synced');
  }, [
    allUsers,
    applications,
    notices,
    placementDrives,
    placementStats,
    publications,
    projects,
    ebooks,
    events,
    enrollments,
    assignments,
    materials,
    seoConfig,
    hasHydrated
  ]);

  // Helper routine to encode and upload binary attachments via direct Base64 encoding
  const uploadFile = async (file: File): Promise<{ success: boolean; url: string; msg: string }> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64Data = reader.result as string;
        resolve({
          success: true,
          url: base64Data,
          msg: 'Local asset stream buffered successfully.'
        });
      };
      reader.onerror = () => {
        resolve({
          success: false,
          url: '',
          msg: 'File conversion failed.'
        });
      };
    });
  };

  // Save changes to localStorage on any state modification
  useEffect(() => {
    localStorage.setItem('kmu_current_user', currentUser ? JSON.stringify(currentUser) : '');
  }, [currentUser]);

  useEffect(() => { localStorage.setItem('kmu_db_users', JSON.stringify(allUsers)); }, [allUsers]);
  useEffect(() => { localStorage.setItem('kmu_db_applications', JSON.stringify(applications)); }, [applications]);
  useEffect(() => { localStorage.setItem('kmu_db_notices', JSON.stringify(notices)); }, [notices]);
  useEffect(() => { localStorage.setItem('kmu_db_placement_drives', JSON.stringify(placementDrives)); }, [placementDrives]);
  useEffect(() => { localStorage.setItem('kmu_db_placement_stats', JSON.stringify(placementStats)); }, [placementStats]);
  useEffect(() => { localStorage.setItem('kmu_db_publications', JSON.stringify(publications)); }, [publications]);
  useEffect(() => { localStorage.setItem('kmu_db_projects', JSON.stringify(projects)); }, [projects]);
  useEffect(() => { localStorage.setItem('kmu_db_ebooks', JSON.stringify(ebooks)); }, [ebooks]);
  useEffect(() => { localStorage.setItem('kmu_db_events', JSON.stringify(events)); }, [events]);
  useEffect(() => { localStorage.setItem('kmu_db_enrollments', JSON.stringify(enrollments)); }, [enrollments]);
  useEffect(() => { localStorage.setItem('kmu_db_assignments', JSON.stringify(assignments)); }, [assignments]);
  useEffect(() => { localStorage.setItem('kmu_db_materials', JSON.stringify(materials)); }, [materials]);
  useEffect(() => { localStorage.setItem('kmu_db_seo_config', JSON.stringify(seoConfig)); }, [seoConfig]);
  useEffect(() => { localStorage.setItem('kmu_db_vip_guests', JSON.stringify(vipGuests)); }, [vipGuests]);
  useEffect(() => { localStorage.setItem('kmu_db_campus_spots', JSON.stringify(campusSpots)); }, [campusSpots]);

  // Auth Functions
  const loginAs = (role: UserRole, specificEmail?: string) => {
    if (role === 'guest') {
      setCurrentUser(null);
      return;
    }
    if (specificEmail) {
      const match = allUsers.find(u => u.email.trim().toLowerCase() === specificEmail.trim().toLowerCase());
      if (match) {
        setCurrentUser(match);
        return;
      }
    }
    const matched = allUsers.find(u => u.role === role);
    if (matched) {
      setCurrentUser(matched);
    } else {
      // Create a fallback user of this role
      const fallback: User = {
        id: `mock-${role}-${Date.now()}`,
        email: `${role}@kmu.edu.in`,
        name: `${role.charAt(0).toUpperCase() + role.slice(1)} Simulator`,
        role,
        createdAt: new Date().toISOString().split('T')[0]
      };
      setAllUsers(prev => [...prev, fallback]);
      setCurrentUser(fallback);
    }
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const registerUser = (name: string, email: string, role: UserRole, customDetails?: any): User => {
    const newUser: User = {
      id: `user-${Date.now()}`,
      email,
      name,
      role,
      createdAt: new Date().toISOString().split('T')[0]
    };

    if (role === 'applicant') {
      // Basic setup
    } else if (role === 'student') {
      newUser.studentDetails = {
        rollNumber: customDetails?.rollNumber || `KMU-2026-ST${Math.floor(100 + Math.random() * 900)}`,
        enrollmentNo: customDetails?.enrollmentNo || `ENR26${Math.floor(100000 + Math.random() * 900000)}`,
        program: customDetails?.program || 'Bachelor of Technology (B.Tech)',
        branch: customDetails?.branch || 'Computer Science & Engineering',
        school: customDetails?.school || 'School of Engineering & Technology',
        semester: Number(customDetails?.semester) || 1,
        batch: customDetails?.batch || '2026 - 2030',
        academicAdviser: customDetails?.academicAdviser || 'Prof. Sumeet Gupta',
        outstandingFees: customDetails?.outstandingFees !== undefined ? Number(customDetails?.outstandingFees) : 120000,
        attendanceOverall: 100,
        totalCreditsEarned: 0,
        grievancesSubmitted: []
      };
    } else if (role === 'faculty') {
      newUser.facultyDetails = {
        employeeId: customDetails?.employeeId || `KMU-FAC-${Math.floor(100 + Math.random() * 900)}`,
        designation: customDetails?.designation || 'Lecturer',
        school: customDetails?.school || 'School of Engineering & Technology',
        department: customDetails?.department || 'Computer Science & Engineering',
        qualification: customDetails?.qualification || 'Ph.D. / M.Tech',
        specialization: customDetails?.specialization || 'Intelligent Web Infrastructure',
        officeRoom: customDetails?.officeRoom || 'Room C-302, Phase 1 block'
      };
    } else if (role === 'staff') {
      newUser.staffDetails = {
        employeeId: customDetails?.employeeId || `KMU-STF-${Math.floor(100 + Math.random() * 900)}`,
        designation: customDetails?.designation || 'Executive Assistant',
        department: customDetails?.department || 'Office of Admissions & Registries',
        officeRoom: customDetails?.officeRoom || 'Admissions Branch Zone Desk #2'
      };
    }

    setAllUsers(prev => [...prev, newUser]);
    return newUser;
  };

  // Admission System operations
  const applyAdmission = (appData: any) => {
    const email = `${appData.applicantName.toLowerCase().replace(/\s+/g, '')}@example.com`;
    const newApp: AdmissionApplication = {
      id: `app-${Date.now()}`,
      applicantId: `usr-${Date.now()}`,
      applicantName: appData.applicantName,
      applicantEmail: email,
      programName: appData.programName,
      schoolName: 'School of Admissions',
      courseDegree: appData.courseDegree,
      personalInfo: {
        fullName: appData.applicantName,
        dob: appData.personalInfo.dob,
        gender: appData.personalInfo.gender,
        phone: appData.personalInfo.phone,
        parentsName: appData.personalInfo.parentsName,
        address: appData.personalInfo.address
      },
      educationInfo: {
        board12th: appData.educationInfo?.board12th || 'CBSE Board',
        percentage12th: appData.educationInfo?.percentage12th || 85,
        year12th: 2025
      },
      documents: {
        marksheet12th: 'https://drive.google.com/attached-marksheet.pdf',
        photoUrl: 'https://drive.google.com/attached-photo.png'
      },
      feePaid: true,
      status: 'submitted',
      submittedAt: new Date().toISOString()
    };
    setApplications(prev => [newApp, ...prev]);
  };

  const submitApplication = (appData: Omit<AdmissionApplication, 'id' | 'applicantId' | 'applicantName' | 'applicantEmail' | 'status' | 'feePaid'>) => {
    if (!currentUser) return;
    const newApp: AdmissionApplication = {
      ...appData,
      id: `app-${Date.now()}`,
      applicantId: currentUser.id,
      applicantName: currentUser.name,
      applicantEmail: currentUser.email,
      status: 'submitted',
      feePaid: false,
      submittedAt: new Date().toISOString()
    };
    setApplications(prev => [newApp, ...prev.filter(a => a.applicantId !== currentUser.id)]);
  };

  const payApplicationFee = (applicationId: string) => {
    setApplications(prev => prev.map(a => {
      if (a.id === applicationId) {
        return {
          ...a,
          feePaid: true,
          admissionUpdate: 'Thank you for your application fee. Your files are currently being audited by the Admissions Registrar.',
          status: 'under_review' as const
        };
      }
      return a;
    }));
  };

  const updateApplicationStatus = (id: string, status: AdmissionApplication['status'], comments?: string) => {
    setApplications(prev => prev.map(a => {
      if (a.id === id) {
        return {
          ...a,
          status,
          admissionUpdate: comments || `Your application status has been transitioned to ${status.replace('_', ' ')}.`
        };
      }
      return a;
    }));

    // If approved, sync application to a new student account
    if (status === 'approved') {
      const appRecord = applications.find(a => a.id === id);
      if (appRecord) {
        const studentCheck = allUsers.find(u => u.email === appRecord.applicantEmail && u.role === 'student');
        if (!studentCheck) {
          const freshStudent: User = {
            id: appRecord.applicantId,
            email: appRecord.applicantEmail,
            name: appRecord.applicantName,
            role: 'student',
            phone: appRecord.personalInfo.phone,
            createdAt: new Date().toISOString().split('T')[0],
            studentDetails: {
              rollNumber: `KMU-2026-ST${Math.floor(100 + Math.random() * 900)}`,
              enrollmentNo: `ENR26${Math.floor(100000 + Math.random() * 899999)}`,
              program: appRecord.programName,
              school: appRecord.schoolName,
              semester: 1,
              batch: '2026 - 2030',
              academicAdviser: 'Prof. Sumeet Gupta',
              outstandingFees: 120000,
              attendanceOverall: 100,
              totalCreditsEarned: 0,
              grievancesSubmitted: []
            }
          };
          setAllUsers(prev => prev.map(u => u.id === appRecord.applicantId ? { ...u, role: 'student' as const, studentDetails: freshStudent.studentDetails } : u));
        }
      }
    }
  };

  // Student Actions
  const submitStudentAssignment = (assignmentId: string, fileUrl: string) => {
    if (!currentUser) return;
    setAssignments(prev => prev.map(asg => {
      if (asg.id === assignmentId) {
        const submissions = asg.submittedStudents.filter(s => s.studentId !== currentUser.id);
        return {
          ...asg,
          submittedStudents: [
            ...submissions,
            {
              studentId: currentUser.id,
              studentName: currentUser.name,
              submittedAt: new Date().toISOString().split('T')[0],
              fileUrl
            }
          ]
        };
      }
      return asg;
    }));
  };

  const submitStudentGrievance = (subject: string, description: string) => {
    if (!currentUser || !currentUser.studentDetails) return;
    const newGrievance = {
      id: `griv-${Date.now()}`,
      subject,
      description,
      status: 'pending' as const,
      date: new Date().toISOString().split('T')[0]
    };
    const updatedDetails = {
      ...currentUser.studentDetails,
      grievancesSubmitted: [...(currentUser.studentDetails.grievancesSubmitted || []), newGrievance]
    };
    setAllUsers(prev => prev.map(u => u.id === currentUser.id ? { ...u, studentDetails: updatedDetails } : u));
    setCurrentUser(prev => prev ? { ...prev, studentDetails: updatedDetails } : null);
  };

  const payTuitionFee = (amount: number) => {
    if (!currentUser || !currentUser.studentDetails) return;
    const currentOutstanding = currentUser.studentDetails.outstandingFees;
    const updatedOutstanding = Math.max(0, currentOutstanding - amount);
    const updatedDetails = {
      ...currentUser.studentDetails,
      outstandingFees: updatedOutstanding
    };
    setAllUsers(prev => prev.map(u => u.id === currentUser.id ? { ...u, studentDetails: updatedDetails } : u));
    setCurrentUser(prev => prev ? { ...prev, studentDetails: updatedDetails } : null);
  };

  // Faculty actions
  const enterStudentMarks = (enrollmentId: string, examType: 'midSem' | 'endSem' | 'internal', score: number) => {
    setEnrollments(prev => prev.map(enr => {
      if (enr.id === enrollmentId) {
        const updatedMarks = {
          ...enr.marks,
          [examType]: score
        };
        // Re-total and compute grade if all components entered
        const mid = updatedMarks.midSem ?? 0;
        const end = updatedMarks.endSem ?? 0;
        const int = updatedMarks.internal ?? 0;
        const total = mid + end + int;
        let grade = enr.marks.grade;

        if (updatedMarks.midSem !== undefined && updatedMarks.endSem !== undefined && updatedMarks.internal !== undefined) {
          if (total >= 90) grade = 'O';
          else if (total >= 80) grade = 'A+';
          else if (total >= 70) grade = 'A';
          else if (total >= 60) grade = 'B+';
          else if (total >= 50) grade = 'B';
          else if (total >= 40) grade = 'C';
          else grade = 'F';
        }

        return {
          ...enr,
          marks: {
            ...updatedMarks,
            total,
            grade
          }
        };
      }
      return enr;
    }));
  };

  const markStudentAttendance = (enrollmentId: string, increment: boolean) => {
    setEnrollments(prev => prev.map(enr => {
      if (enr.id === enrollmentId) {
        const currentAttended = enr.attendance.attended;
        const currentTotal = enr.attendance.total;
        return {
          ...enr,
          attendance: {
            attended: increment ? currentAttended + 1 : Math.max(0, currentAttended - 1),
            total: currentTotal + 1
          }
        };
      }
      return enr;
    }));
  };

  const uploadCourseMaterial = (courseCode: string, title: string, description: string, fileUrl?: string, fileSize?: string) => {
    if (!currentUser) return;
    const newMaterial: CourseMaterial = {
      id: `mat-${Date.now()}`,
      courseCode,
      title,
      description,
      uploadedBy: currentUser.name,
      uploadDate: new Date().toISOString().split('T')[0],
      fileSize: fileSize || '1.8 MB',
      fileUrl: fileUrl || '#'
    };
    setMaterials(prev => [newMaterial, ...prev]);
  };

  const createAssignmentByFaculty = (courseCode: string, title: string, description: string, dueDate: string, totalMarks: number) => {
    const newAsg: Assignment = {
      id: `asg-${Date.now()}`,
      title,
      courseCode,
      description,
      dueDate,
      totalMarks,
      submittedStudents: []
    };
    setAssignments(prev => [...prev, newAsg]);
  };

  // General Admin / Super Admin actions
  const addNotice = (noticeData: Omit<Notice, 'id' | 'date'>) => {
    const newNotice: Notice = {
      ...noticeData,
      id: `not-${Date.now()}`,
      date: new Date().toISOString().split('T')[0]
    };
    setNotices(prev => [newNotice, ...prev]);
  };

  const editNotice = (updatedNotice: Notice) => {
    setNotices(prev => prev.map(n => n.id === updatedNotice.id ? updatedNotice : n));
  };

  const deleteNotice = (id: string) => {
    setNotices(prev => prev.filter(n => n.id !== id));
  };

  const addEvent = (eventData: Omit<EventRecord, 'id' | 'registrantsCount'>) => {
    const newEvent: EventRecord = {
      ...eventData,
      id: `ev-${Date.now()}`,
      registrantsCount: 0
    };
    setEvents(prev => [...prev, newEvent]);
  };

  const deleteEvent = (id: string) => {
    setEvents(prev => prev.filter(e => e.id !== id));
  };

  const registerForEvent = (id: string) => {
    setEvents(prev => prev.map(e => e.id === id ? { ...e, registrantsCount: e.registrantsCount + 1 } : e));
  };

  const addEbook = (bookData: Omit<EBook, 'id'>) => {
    const newBook: EBook = {
      ...bookData,
      id: `book-${Date.now()}`
    };
    setEbooks(prev => [...prev, newBook]);
  };

  const deleteEbook = (id: string) => {
    setEbooks(prev => prev.filter(b => b.id !== id));
  };

  const addPublication = (pubData: Omit<ResearchPublication, 'id'>) => {
    const newPub: ResearchPublication = {
      ...pubData,
      id: `pub-${Date.now()}`
    };
    setPublications(prev => [...prev, newPub]);
  };

  const deletePublication = (id: string) => {
    setPublications(prev => prev.filter(p => p.id !== id));
  };

  const addProject = (projData: Omit<ResearchProject, 'id'>) => {
    const newProj: ResearchProject = {
      ...projData,
      id: `proj-${Date.now()}`
    };
    setProjects(prev => [...prev, newProj]);
  };

  const deleteProject = (id: string) => {
    setProjects(prev => prev.filter(p => p.id !== id));
  };

  const addPlacementDrive = (driveData: Omit<PlacementDrive, 'id' | 'registeredStudentsCount'>) => {
    const newDrive: PlacementDrive = {
      ...driveData,
      id: `drive-${Date.now()}`,
      registeredStudentsCount: 0
    };
    setPlacementDrives(prev => [...prev, newDrive]);
  };

  const deletePlacementDrive = (id: string) => {
    setPlacementDrives(prev => prev.filter(p => p.id !== id));
  };

  const registerForPlacement = (driveId: string) => {
    setPlacementDrives(prev => prev.map(p => p.id === driveId ? { ...p, registeredStudentsCount: p.registeredStudentsCount + 1 } : p));
  };

  const updateSeoSettings = (config: SEOConfiguration) => {
    setSeoConfig(config);
    document.title = config.title;
  };

  const addVIPGuest = (guestData: Omit<VIPGuest, 'id'>) => {
    const newGuest: VIPGuest = {
      ...guestData,
      id: `vip-${Date.now()}`
    };
    setVipGuests(prev => [newGuest, ...prev]);
  };

  const updateVIPGuest = (updatedGuest: VIPGuest) => {
    setVipGuests(prev => prev.map(g => g.id === updatedGuest.id ? updatedGuest : g));
  };

  const deleteVIPGuest = (id: string) => {
    setVipGuests(prev => prev.filter(g => g.id !== id));
  };

  const addCampusSpot = (spotData: Omit<CampusSpot, 'id'>) => {
    const newSpot: CampusSpot = {
      ...spotData,
      id: `spot-${Date.now()}`
    };
    setCampusSpots(prev => [...prev, newSpot]);
  };

  const updateCampusSpot = (updatedSpot: CampusSpot) => {
    setCampusSpots(prev => prev.map(s => s.id === updatedSpot.id ? updatedSpot : s));
  };

  const deleteCampusSpot = (id: string) => {
    setCampusSpots(prev => prev.filter(s => s.id !== id));
  };

  return (
    <PortalContext.Provider value={{
      currentUser,
      allUsers,
      applications,
      notices,
      placementDrives,
      placementStats,
      publications,
      projects,
      ebooks,
      events,
      enrollments,
      assignments,
      materials,
      seoConfig,
      vipGuests,
      campusSpots,
      addVIPGuest,
      updateVIPGuest,
      deleteVIPGuest,
      addCampusSpot,
      updateCampusSpot,
      deleteCampusSpot,
      loginAs,
      logout,
      registerUser,
      applyAdmission,
      submitApplication,
      payApplicationFee,
      updateApplicationStatus,
      submitStudentAssignment,
      submitStudentGrievance,
      payTuitionFee,
      enterStudentMarks,
      markStudentAttendance,
      uploadCourseMaterial,
      createAssignmentByFaculty,
      addNotice,
      deleteNotice,
      editNotice,
      addEvent,
      deleteEvent,
      registerForEvent,
      addEbook,
      deleteEbook,
      addPublication,
      deletePublication,
      addProject,
      deleteProject,
      addPlacementDrive,
      deletePlacementDrive,
      registerForPlacement,
      updateSeoSettings,
      isLoadingCloudState,
      supabaseStatus,
      syncStatus,
      syncWithSupabase,
      uploadFile,
      isLoginModalOpen,
      setIsLoginModalOpen,
      loginModalPreselectedRole,
      setLoginModalPreselectedRole
    }}>
      {children}
    </PortalContext.Provider>
  );
};

export const usePortal = () => {
  const context = useContext(PortalContext);
  if (!context) {
    throw new Error('usePortal must be used within a PortalProvider');
  }
  return context;
};
