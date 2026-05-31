/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type UserRole = 'guest' | 'applicant' | 'student' | 'faculty' | 'staff' | 'admin';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  createdAt: string;
  phone?: string;
  studentDetails?: StudentDetails;
  facultyDetails?: FacultyDetails;
  staffDetails?: StaffDetails;
}

export interface StudentDetails {
  rollNumber: string;
  enrollmentNo: string;
  program: string;
  branch?: string;
  school: string;
  semester: number;
  batch: string;
  academicAdviser: string;
  cgpa?: number;
  totalCreditsEarned: number;
  outstandingFees: number;
  attendanceOverall: number;
  grievancesSubmitted?: Array<{
    id: string;
    subject: string;
    description: string;
    status: 'pending' | 'resolved';
    date: string;
    reply?: string;
  }>;
}

export interface FacultyDetails {
  employeeId: string;
  designation: string;
  school: string;
  department: string;
  qualification: string;
  specialization: string;
  officeRoom: string;
}

export interface StaffDetails {
  employeeId: string;
  designation: string;
  department: string;
  officeRoom: string;
}

export interface AdmissionApplication {
  id: string;
  applicantId: string;
  applicantName: string;
  applicantEmail: string;
  programName: string;
  schoolName: string;
  courseDegree: 'UG' | 'PG' | 'PHD' | 'Diploma';
  personalInfo: {
    fullName: string;
    dob: string;
    gender: string;
    phone: string;
    parentsName: string;
    address: string;
  };
  educationInfo: {
    board12th: string;
    percentage12th: number;
    year12th: number;
    graduationDegree?: string;
    graduationPercentage?: number;
    entranceScore?: string;
  };
  documents: {
    photoUrl?: string;
    marksheet10th?: string;
    marksheet12th?: string;
    signatureUrl?: string;
  };
  feePaid: boolean;
  status: 'draft' | 'submitted' | 'under_review' | 'approved' | 'rejected';
  admissionUpdate?: string;
  submittedAt?: string;
}

export type NoticeCategory = 'Academic' | 'Examination' | 'Admissions' | 'Scholarships' | 'Placements' | 'Events' | 'General';

export interface Notice {
  id: string;
  title: string;
  content: string;
  category: NoticeCategory;
  date: string;
  author: string;
  important: boolean;
}

export interface PlacementDrive {
  id: string;
  companyName: string;
  role: string;
  packageLPA: number;
  eligibility: string;
  deadline: string;
  description: string;
  registeredStudentsCount: number;
  website: string;
  status: 'active' | 'closed';
}

export interface PlacementStatistic {
  year: string;
  highestPackage: number;
  averagePackage: number;
  placementPercentage: number;
  numberOfOffers: number;
}

export interface ResearchPublication {
  id: string;
  title: string;
  authors: string;
  journal: string;
  year: number;
  doi?: string;
  abstract: string;
  school: string;
}

export interface ResearchProject {
  id: string;
  title: string;
  piName: string; // Principal Investigator
  agency: string; // Funding agency
  budgetAmount: string;
  status: 'ongoing' | 'completed';
  duration: string;
  school: string;
}

export interface EBook {
  id: string;
  title: string;
  author: string;
  subject: string;
  category: 'E-Book' | 'Journal Article' | 'Ref Paper';
  year: number;
  callNumber: string;
  url: string;
  available: boolean;
}

export interface EventRecord {
  id: string;
  title: string;
  type: 'Conference' | 'Workshop' | 'Seminar' | 'Cultural' | 'Sports';
  date: string;
  time: string;
  location: string;
  description: string;
  registrantsCount: number;
  bannerUrl?: string;
}

export interface CourseMaterial {
  id: string;
  courseCode: string;
  title: string;
  description: string;
  uploadedBy: string;
  uploadDate: string;
  fileSize: string;
  fileUrl?: string;
}

export interface Assignment {
  id: string;
  title: string;
  courseCode: string;
  description: string;
  dueDate: string;
  totalMarks: number;
  submittedStudents: Array<{
    studentId: string;
    studentName: string;
    submittedAt: string;
    fileUrl: string;
    marksAwarded?: number;
    feedback?: string;
  }>;
}

export interface StudentEnrollment {
  id: string;
  studentId: string;
  studentName: string;
  rollNumber: string;
  courseCode: string;
  courseName: string;
  attendance: {
    attended: number;
    total: number;
  };
  marks: {
    midSem?: number;
    endSem?: number;
    internal?: number;
    total?: number;
    grade?: string;
  };
}

export interface VIPGuest {
  id: string;
  name: string;
  title: string;
  category: 'government' | 'industry' | 'academia' | 'spiritual';
  visitDate: string;
  event: string;
  photoUrl: string;
  quotes: string;
  departmentHosted: string;
  keyHighlights: string[];
}

export interface CampusSpot {
  id: string;
  name: string;
  category: 'clinical' | 'academic' | 'hub' | 'life';
  coordinateX: number;
  coordinateY: number;
  description: string;
  features: string[];
  imageUrl: string;
  stat: string;
}

