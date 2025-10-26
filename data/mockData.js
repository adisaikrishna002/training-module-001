// Mock user data for development
import { ROLES } from '../utils/rbac';

export const MOCK_USERS = [
  {
    id: 1,
    username: 'admin',
    password: 'admin123',
    name: 'System Administrator',
    email: 'admin@company.com',
    role: ROLES.SYSTEM_ADMIN,
    department: 'IT',
    site: 'Corporate HQ',
    active: true,
    lastLogin: '2025-10-23T09:00:00Z'
  },
  {
    id: 2,
    username: 'coordinator',
    password: 'coord123',
    name: 'John Smith',
    email: 'john.smith@company.com',
    role: ROLES.TRAINING_COORDINATOR,
    department: 'Training',
    site: 'Corporate HQ',
    active: true,
    lastLogin: '2025-10-23T08:30:00Z'
  },
  {
    id: 3,
    username: 'trainer',
    password: 'trainer123',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@company.com',
    role: ROLES.TRAINER,
    department: 'Training',
    site: 'Manufacturing Plant A',
    active: true,
    lastLogin: '2025-10-22T16:45:00Z'
  },
  {
    id: 4,
    username: 'trainee',
    password: 'trainee123',
    name: 'Mike Wilson',
    email: 'mike.wilson@company.com',
    role: ROLES.TRAINEE,
    department: 'Production',
    site: 'Manufacturing Plant A',
    active: true,
    lastLogin: '2025-10-23T07:15:00Z'
  },
  {
    id: 5,
    username: 'hod',
    password: 'hod123',
    name: 'Lisa Chen',
    email: 'lisa.chen@company.com',
    role: ROLES.HOD,
    department: 'Quality Assurance',
    site: 'Corporate HQ',
    active: true,
    lastLogin: '2025-10-22T18:20:00Z'
  }
];

// Training Categories
export const TRAINING_CATEGORIES = [
  { id: 1, name: 'GxP Compliance', description: 'Good Manufacturing/Laboratory/Clinical Practices', active: true },
  { id: 2, name: 'Safety Training', description: 'Workplace safety and emergency procedures', active: true },
  { id: 3, name: 'Technical Skills', description: 'Job-specific technical competencies', active: true },
  { id: 4, name: 'Quality Management', description: 'Quality systems and processes', active: true },
  { id: 5, name: 'Regulatory Compliance', description: 'Industry regulations and standards', active: true },
  { id: 6, name: 'Soft Skills', description: 'Communication, leadership, and interpersonal skills', active: true }
];

// Training Types
export const TRAINING_TYPES = [
  { id: 1, name: 'ILT', description: 'Instructor-Led Training', active: true },
  { id: 2, name: 'eLearning', description: 'Online Learning Modules', active: true },
  { id: 3, name: 'OJT', description: 'On-the-Job Training', active: true },
  { id: 4, name: 'Blended', description: 'Combination of multiple training methods', active: true },
  { id: 5, name: 'Workshop', description: 'Interactive group sessions', active: true },
  { id: 6, name: 'Webinar', description: 'Online seminars and presentations', active: true }
];

// Mock Training Data
export const MOCK_TRAININGS = [
  {
    id: 1,
    title: 'GMP Fundamentals',
    category: 'GxP Compliance',
    type: 'eLearning',
    description: 'Basic principles of Good Manufacturing Practices',
    trainer: 'Sarah Johnson',
    duration: 120, // minutes
    startDate: '2025-10-01',
    endDate: '2025-11-01',
    status: 'Active',
    materials: ['GMP_Guidelines.pdf', 'GMP_Video.mp4'],
    assessmentRequired: true,
    passingScore: 80,
    certificateEnabled: true,
    assignedCount: 45,
    completedCount: 32,
    overdueCount: 3
  },
  {
    id: 2,
    title: 'Laboratory Safety Procedures',
    category: 'Safety Training',
    type: 'ILT',
    description: 'Comprehensive laboratory safety training including chemical handling',
    trainer: 'Dr. Michael Brown',
    duration: 240,
    startDate: '2025-10-15',
    endDate: '2025-11-15',
    status: 'Active',
    materials: ['Lab_Safety_Manual.pdf', 'Chemical_Handling_Guide.pdf'],
    assessmentRequired: true,
    passingScore: 85,
    certificateEnabled: true,
    assignedCount: 28,
    completedCount: 15,
    overdueCount: 0
  },
  {
    id: 3,
    title: 'Equipment Validation Training',
    category: 'Technical Skills',
    type: 'Blended',
    description: 'Training on equipment validation processes and documentation',
    trainer: 'Sarah Johnson',
    duration: 180,
    startDate: '2025-09-01',
    endDate: '2025-10-01',
    status: 'Completed',
    materials: ['Validation_Protocol.pdf', 'Equipment_Manual.pdf'],
    assessmentRequired: true,
    passingScore: 80,
    certificateEnabled: true,
    assignedCount: 20,
    completedCount: 20,
    overdueCount: 0
  }
];

// Mock User Training Assignments
export const MOCK_USER_TRAININGS = {
  4: [ // trainee user
    {
      trainingId: 1,
      userId: 4,
      assignedDate: '2025-10-01',
      dueDate: '2025-11-01',
      status: 'In Progress',
      progress: 65,
      attempts: 1,
      score: null,
      completedDate: null,
      certificateIssued: false,
      extensionRequests: []
    },
    {
      trainingId: 2,
      userId: 4,
      assignedDate: '2025-10-15',
      dueDate: '2025-11-15',
      status: 'Pending',
      progress: 0,
      attempts: 0,
      score: null,
      completedDate: null,
      certificateIssued: false,
      extensionRequests: []
    },
    {
      trainingId: 3,
      userId: 4,
      assignedDate: '2025-09-01',
      dueDate: '2025-10-01',
      status: 'Completed',
      progress: 100,
      attempts: 2,
      score: 88,
      completedDate: '2025-09-28',
      certificateIssued: true,
      extensionRequests: []
    }
  ]
};

// Notification Templates
export const NOTIFICATION_TEMPLATES = {
  TRAINING_ASSIGNED: {
    subject: 'New Training Assignment: {trainingTitle}',
    body: 'You have been assigned to complete the training "{trainingTitle}". Due date: {dueDate}.'
  },
  DUE_DATE_REMINDER_30: {
    subject: 'Training Due in 30 Days: {trainingTitle}',
    body: 'Reminder: Your training "{trainingTitle}" is due in 30 days ({dueDate}).'
  },
  DUE_DATE_REMINDER_15: {
    subject: 'Training Due in 15 Days: {trainingTitle}',
    body: 'Important: Your training "{trainingTitle}" is due in 15 days ({dueDate}).'
  },
  DUE_DATE_REMINDER_3: {
    subject: 'URGENT: Training Due in 3 Days: {trainingTitle}',
    body: 'URGENT: Your training "{trainingTitle}" is due in 3 days ({dueDate}). Please complete immediately.'
  },
  TRAINING_OVERDUE: {
    subject: 'OVERDUE: Training Past Due Date: {trainingTitle}',
    body: 'Your training "{trainingTitle}" was due on {dueDate} and is now overdue.'
  },
  EXTENSION_REQUESTED: {
    subject: 'Extension Request: {trainingTitle}',
    body: 'An extension has been requested for training "{trainingTitle}". New requested due date: {requestedDate}.'
  }
};

export const DASHBOARD_METRICS = {
  [ROLES.SYSTEM_ADMIN]: {
    totalUsers: 1250,
    activeTrainings: 45,
    totalCompletions: 3420,
    complianceRate: 94.5,
    overdueTrainings: 23,
    pendingApprovals: 12
  },
  [ROLES.TRAINING_COORDINATOR]: {
    myTrainings: 15,
    activeAssignments: 120,
    completionRate: 89.2,
    overdueAssignments: 8,
    pendingApprovals: 5
  },
  [ROLES.TRAINER]: {
    assignedTrainings: 8,
    activeTrainees: 65,
    completionRate: 91.5,
    pendingEvaluations: 12,
    upcomingSessions: 3
  },
  [ROLES.TRAINEE]: {
    assignedTrainings: 5,
    completedTrainings: 12,
    inProgressTrainings: 2,
    overdueTrainings: 0,
    certificatesEarned: 8
  }
};

// Mock Assessments Data
export const MOCK_ASSESSMENTS = [
  {
    id: 1,
    title: 'GMP Fundamentals Assessment',
    description: 'Assessment for GMP Fundamentals training',
    type: 'Quiz',
    status: 'Pending',
    dueDate: '2025-10-30',
    score: null
  },
  {
    id: 2,
    title: 'Laboratory Safety Procedures Assessment',
    description: 'Assessment for Laboratory Safety Procedures training',
    type: 'Quiz',
    status: 'Pending',
    dueDate: '2025-10-29',
    score: null
  }
];