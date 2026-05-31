/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  Notice,
  PlacementDrive,
  PlacementStatistic,
  ResearchPublication,
  ResearchProject,
  EBook,
  EventRecord,
  StudentEnrollment,
  Assignment,
  CourseMaterial
} from '../types/university';

export const INITIAL_NOTICES: Notice[] = [
  {
    id: 'not-01',
    title: 'Admission Window Open for Academic Session 2026-27',
    content: 'Applications are now officially open for under-graduate, post-graduate and doctoral courses at KM University, Mathura. Eligible candidates can submit their credentials online via the Admission Gateway. Scholarships up to 100% are available for meritorious students.',
    category: 'Admissions',
    date: '2026-05-28',
    author: 'Registrar Office',
    important: true
  },
  {
    id: 'not-02',
    title: 'End-Semester Theory Examinations (June 2026) Schedule',
    content: 'The end-semester theory examinations for all programs under the School of Medical Sciences, School of Engineering, and Allied Health Sciences will commence on June 15, 2026. Hall tickets will be eligible for download on the Student Portal starting June 5, 2026. Clearance of all outstanding dues is mandatory.',
    category: 'Examination',
    date: '2026-05-25',
    author: 'Controller of Examinations',
    important: true
  },
  {
    id: 'not-03',
    title: 'Campus Recruitment Drive by Wipro & TCS Technology',
    content: 'School of Engineering & School of Management students are hereby informed that joint campus recruitment drives are scheduled from June 10 to June 12, 2026. Pre-placement talks will begin at 9:30 AM in the Central Seminar Hall. Registration closes on June 5.',
    category: 'Placements',
    date: '2026-05-24',
    author: 'Training & Placement Officer',
    important: false
  },
  {
    id: 'not-04',
    title: 'Merit-and-Means Scholarships Disbursement List',
    content: 'KM University is pleased to announce the disbursement of Shanti Devi Memorial Trust Scholarships for the winter cycle of the academic term. The list of approved recipients is now available at the administrative block. Disbursal credits will reflect on the Portal Ledger.',
    category: 'Scholarships',
    date: '2026-05-20',
    author: 'Dean - Student Welfare',
    important: true
  },
  {
    id: 'not-05',
    title: 'International Conference on Translational Medical Science ICTMS-2026',
    content: 'KM University’s School of Medical Sciences is hosting ICTMS-2026 on July 14-16, 2026. Renowned medical researchers and scientists from Cambridge and Harvard will be delivering keynote addresses. Paper submission is open until June 20, 2026.',
    category: 'Events',
    date: '2026-05-18',
    author: 'Director - Research & Development',
    important: false
  }
];

export const INITIAL_PLACEMENT_DRIVES: PlacementDrive[] = [
  {
    id: 'drive-01',
    companyName: 'Apollo Hospitals Enterprise',
    role: 'Resident Medical Officer / Associate Clinical Researcher',
    packageLPA: 12.8,
    eligibility: 'MBBS / MD / Master of Allied Health Sciences (Minimum 7.5 CGPA required)',
    deadline: '2026-06-15',
    description: 'Apollo is looking for enthusiastic clinicians to join their intensive care and clinical studies division in NCR and Bengaluru locations. The process includes a clinical diagnostics test and two rounds of oral panels.',
    registeredStudentsCount: 45,
    website: 'https://www.apollohospitals.com',
    status: 'active'
  },
  {
    id: 'drive-02',
    companyName: 'Wipro HealthTech Labs',
    role: 'Graduate Engineering Trainee & Medical Systems Analyst',
    packageLPA: 8.5,
    eligibility: 'B.Tech CSE, ECE / M.Tech / MCA (Minimum 7.0 CGPA, no active backlogs)',
    deadline: '2026-06-05',
    description: 'Join the next generation of healthcare software. This drive focuses on developing patient vitals tracking networks, AI diagnostics diagnostics suites, and laboratory inventory systems.',
    registeredStudentsCount: 112,
    website: 'https://www.wipro.com',
    status: 'active'
  },
  {
    id: 'drive-03',
    companyName: 'Cipla Pharmaceuticals',
    role: 'Quality Control Lead & Drug Research Associate',
    packageLPA: 6.2,
    eligibility: 'B.Pharm / M.Pharm / M.Sc Applied Chemistry with strong lab credentials',
    deadline: '2026-06-10',
    description: 'Cipla Research Division Mathura/Delhi NCR is seeking research assistants to validate drug purity profiles, manage medical compliance metrics, and run gas chromatography trials.',
    registeredStudentsCount: 38,
    website: 'https://www.cipla.com',
    status: 'active'
  },
  {
    id: 'drive-04',
    companyName: 'TCS - Tata Consultancy Services',
    role: 'Software Associate & Cloud Data Architect',
    packageLPA: 7.2,
    eligibility: 'All Engineering & Technology, MCA & MBA streams',
    deadline: '2026-05-22',
    description: 'TCS is organizing a special placement slot. Technical tests and coding simulations assess aptitude in JavaScript/TypeScript, SQL database structuring, and web application framework integration.',
    registeredStudentsCount: 215,
    website: 'https://www.tcs.com',
    status: 'closed'
  }
];

export const PLACEMENT_STATS: PlacementStatistic[] = [
  { year: '2022', highestPackage: 15.0, averagePackage: 5.2, placementPercentage: 88, numberOfOffers: 345 },
  { year: '2023', highestPackage: 18.5, averagePackage: 5.8, placementPercentage: 91, numberOfOffers: 412 },
  { year: '2024', highestPackage: 24.0, averagePackage: 6.4, placementPercentage: 94, numberOfOffers: 498 },
  { year: '2025', highestPackage: 32.0, averagePackage: 7.1, placementPercentage: 96, numberOfOffers: 564 }
];

export const INITIAL_RESEARCH_PUBLICATIONS: ResearchPublication[] = [
  {
    id: 'pub-01',
    title: 'Efficacy profiles of novel zinc-complexes in treating respiratory cellular degradation',
    authors: 'Dr. Ramesh Chandra Sharma, Prof. Amit K. Saxena',
    journal: 'Indian Journal of Clinical Medical Research',
    year: 2025,
    doi: '10.1016/j.ijcmr.2025.1014',
    abstract: 'In this paper, we document the structural synthesis and testing protocols of high-affinity zinc formulations targeting cellular walls. Observations over standard baseline control groups indicate significant tissue integrity preservation and mitigated inflammation rates.',
    school: 'School of Medical Sciences'
  },
  {
    id: 'pub-02',
    title: 'Hybrid convolutional neural systems for real-time dental decay detection from intraoral panoramic imagery',
    authors: 'Prof. Sumeet Gupta, Dr. Priya Mathur',
    journal: 'International Journal of Oral Imaging & Computing',
    year: 2026,
    doi: '10.1109/jodic.2026.0415',
    abstract: 'Diagnosing microscopic lesions is highly prone to human grading inconsistencies. We propose a lightweight deep learning architecture utilizing customized image features that outputs accurate classification grids within milliseconds, enhancing routine clinic workflows.',
    school: 'School of Dental Sciences'
  },
  {
    id: 'pub-03',
    title: 'Smart power transformer tracking protocols leveraging low-power wide-area communication telemetry',
    authors: 'Prof. Hardeep Singh, Er. Neha Dixit',
    journal: 'Journal of Electrical Engineering & Innovation',
    year: 2024,
    doi: '10.5121/jee.2024.1205',
    abstract: 'Grid instability is a major bottleneck in semi-urban distribution grids. This research introduces an industrial node model equipped with vibration, load, and ambient temperature sensing that relays data across a sub-GHz communication loop directly to a grid command station.',
    school: 'School of Engineering & Technology'
  }
];

export const INITIAL_RESEARCH_PROJECTS: ResearchProject[] = [
  {
    id: 'proj-01',
    title: 'Developing Cost-Effective Polymeric Splint Scaffolds for Orthopaedic Joint Trauma Solutions',
    piName: 'Dr. Vivek Malhotra (Dean, Medical Research)',
    agency: 'ICMR - Indian Council of Medical Research',
    budgetAmount: '₹ 42,50,000',
    status: 'ongoing',
    duration: '36 Months (2025 - 2028)',
    school: 'School of Medical Sciences'
  },
  {
    id: 'proj-02',
    title: 'Eco-Friendly Biotransformation of Agro-industrial Sugarcane Slurry Waste into high density Bio-Fertilizers',
    piName: 'Dr. Asha Lata Roy (Allied Chemistry Department)',
    agency: 'DST - Department of Science and Technology, Govt of India',
    budgetAmount: '₹ 28,00,000',
    status: 'ongoing',
    duration: '24 Months (2025 - 2027)',
    school: 'School of Basic & Applied Sciences'
  },
  {
    id: 'proj-03',
    title: 'Microgrid Autonomy Control System via Multi-Agent Edge Intelligence Networks',
    piName: 'Prof. Hardeep Singh (Department of Electrical Engg)',
    agency: 'SERB - Science & Engineering Research Board',
    budgetAmount: '₹ 34,50,000',
    status: 'completed',
    duration: '36 Months (2022 - 2025)',
    school: 'School of Engineering & Technology'
  }
];

export const INITIAL_EBOOKS: EBook[] = [
  {
    id: 'book-01',
    title: 'Gray\'s Anatomy: The Anatomical Basis of Clinical Practice',
    author: 'Susan Standring',
    subject: 'Human Anatomy / Clinical Medicine',
    category: 'E-Book',
    year: 2021,
    callNumber: 'QM.23.G73.2021',
    url: '#',
    available: true
  },
  {
    id: 'book-02',
    title: 'Harrison\'s Principles of Internal Medicine - 21st Edition',
    author: 'Joseph Loscalzo, Anthony Fauci, Dennis Kasper',
    subject: 'Internal Medicine / Diagnosis',
    category: 'E-Book',
    year: 2022,
    callNumber: 'RC.46.H37.2022',
    url: '#',
    available: true
  },
  {
    id: 'book-03',
    title: 'Introduction to Algorithms (CLRS) - 4th Edition',
    author: 'Thomas H. Cormen, Charles E. Leiserson',
    subject: 'Computer Science / Algebra',
    category: 'E-Book',
    year: 2022,
    callNumber: 'QA.76.6.I5.2022',
    url: '#',
    available: true
  },
  {
    id: 'book-04',
    title: 'Journal of Allied Nano-Therapeutics: Vol 12, Issue 4',
    author: 'KM University Scientific Press',
    subject: 'Nanotechnology / Clinical Chemistry',
    category: 'Journal Article',
    year: 2025,
    callNumber: 'JOURNAL.NT.2025',
    url: '#',
    available: true
  },
  {
    id: 'book-05',
    title: 'Constitutional Law of India: Principles and Critical Doctrines',
    author: 'Justice M. N. Venkatachaliah',
    subject: 'Jurisprudence / Civil Rights',
    category: 'Ref Paper',
    year: 2020,
    callNumber: 'LAW.IN.V4.2020',
    url: '#',
    available: false
  }
];

export const INITIAL_EVENTS: EventRecord[] = [
  {
    id: 'ev-01',
    title: 'ICTMS-2026: Int\'l Conference on Translational Medical Science',
    type: 'Conference',
    date: '2026-07-14',
    time: '09:00 AM - 05:30 PM',
    location: 'Sardar Patel Auditorium, Campus Block A',
    description: 'An elite congregation of doctors, clinicians, and health tech scientists presenting ground-breaking discoveries in tissue engineering, cancer therapy structures, and surgical automation models.',
    registrantsCount: 156
  },
  {
    id: 'ev-02',
    title: 'Workshop on Cloud Native Computing & Microservices Structuring',
    type: 'Workshop',
    date: '2026-06-12',
    time: '10:00 AM - 04:00 PM',
    location: 'Advanced Software Lab, School of Engineering',
    description: 'A hands-on coding workshop for students from IT, CSE, and MCA streams. Topics include microservices deployment, Docker cluster monitoring, and load balancing on node systems.',
    registrantsCount: 84
  },
  {
    id: 'ev-03',
    title: 'National Legal Seminar on Intellectual Property Rights (IPR) in Digital India',
    type: 'Seminar',
    date: '2026-06-25',
    time: '11:00 AM - 02:30 PM',
    location: 'Moot Court Hall, School of Law',
    description: 'Eminent advocates of the Honorable Supreme Court of India outline the evolving frameworks of copyright, trademark protections, and digital database safety guidelines.',
    registrantsCount: 120
  }
];

export const INITIAL_ENROLLMENTS: StudentEnrollment[] = [
  {
    id: 'enr-01',
    studentId: 'stud-101',
    studentName: 'Aarav Singhal',
    rollNumber: 'KMU-2024-MC301',
    courseCode: 'CS-302',
    courseName: 'Database Management Systems & SQL Structures',
    attendance: { attended: 36, total: 40 },
    marks: { midSem: 24, endSem: 58, internal: 18, total: 100, grade: 'A+' }
  },
  {
    id: 'enr-02',
    studentId: 'stud-101',
    studentName: 'Aarav Singhal',
    rollNumber: 'KMU-2024-MC301',
    courseCode: 'CS-304',
    courseName: 'Object Oriented Programming via C++ / Java',
    attendance: { attended: 32, total: 40 },
    marks: { midSem: 21, endSem: 48, internal: 16, total: 85, grade: 'A' }
  },
  {
    id: 'enr-03',
    studentId: 'stud-101',
    studentName: 'Aarav Singhal',
    rollNumber: 'KMU-2024-MC301',
    courseCode: 'MA-310',
    courseName: 'Discrete Mathematics & Algebraic Formations',
    attendance: { attended: 28, total: 40 },
    marks: { midSem: 15, endSem: 38, internal: 14, total: 67, grade: 'B' }
  }
];

export const INITIAL_ASSIGNMENTS: Assignment[] = [
  {
    id: 'asg-01',
    title: 'Assignment 1: Database Normalization (1NF, 2NF, 3NF & BCNF)',
    courseCode: 'CS-302',
    description: 'Deconstruct the provided spreadsheet transaction schema into highly normalized relational tables. Clearly highlight candidate keys, primary keys, and functional dependency arrows.',
    dueDate: '2026-06-10',
    totalMarks: 20,
    submittedStudents: [
      {
        studentId: 'stud-101',
        studentName: 'Aarav Singhal',
        submittedAt: '2026-05-29',
        fileUrl: '#',
        marksAwarded: 18,
        feedback: 'Outstanding attention to transitive relationships. Draw logical diagrams carefully next time.'
      }
    ]
  },
  {
    id: 'asg-02',
    title: 'Assignment 2: Graph Implementations and Path Finding Algorithms',
    courseCode: 'CS-304',
    description: 'Implement Dijkstra\'s and Kruskal\'s algorithms in a container class. Write complex graph loaders with test logs, performance diagrams, and complexity calculations.',
    dueDate: '2026-06-18',
    totalMarks: 30,
    submittedStudents: []
  }
];

export const INITIAL_MATERIALS: CourseMaterial[] = [
  {
    id: 'mat-01',
    courseCode: 'CS-302',
    title: 'DBMS Lecture Notes Unit 1 & 2',
    description: 'Complete slide PDFs introducing file systems, ANSI-SPARC schemas, outer joins, and relational algebra operations.',
    uploadedBy: 'Prof. Sumeet Gupta',
    uploadDate: '2026-05-15',
    fileSize: '4.2 MB'
  },
  {
    id: 'mat-02',
    courseCode: 'CS-304',
    title: 'C++ OOP Memory Allocation Cheat Sheet',
    description: 'Illustrates vtables, virtual inheritance layouts, heap vs stack configurations, and modern smart pointers.',
    uploadedBy: 'Dr. Kavita Verma',
    uploadDate: '2026-05-10',
    fileSize: '1.8 MB'
  }
];
