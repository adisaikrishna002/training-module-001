# Role-Based Access Control System

## Overview
The Training Management System now includes a comprehensive role-based authentication and authorization system with 4 distinct user roles.

## User Roles

### 1. **Administrator** 👑
- **Username:** `admin`
- **Password:** `admin123`
- **Access Level:** Full Access to Everything
- **Permissions:**
  - ✅ Full system access
  - ✅ Manage all users
  - ✅ Manage training categories
  - ✅ Manage training types
  - ✅ Manage courses
  - ✅ Assign training to anyone
  - ✅ Give training
  - ✅ Receive training
  - ✅ View all reports
  - ✅ Manage roles and permissions
  - ✅ Manage assessments

### 2. **Training Coordinator** 📋
- **Username:** `coordinator`
- **Password:** `coord123`
- **Access Level:** Assign & Coordinate Training
- **Permissions:**
  - ✅ Manage training categories
  - ✅ Manage training types
  - ✅ Manage courses
  - ✅ **Assign training to Trainers and Trainees**
  - ✅ View reports
  - ✅ Manage assessments
  - ❌ Cannot manage users
  - ❌ Cannot give training directly
  - ❌ Cannot manage system roles

### 3. **Trainer** 👨‍🏫
- **Username:** `trainer`
- **Password:** `trainer123`
- **Access Level:** Give Training to Trainees
- **Permissions:**
  - ✅ **Give training to Trainees**
  - ✅ Receive training (can also be trained)
  - ✅ View assigned training
  - ❌ Cannot manage categories/types/courses
  - ❌ Cannot assign training
  - ❌ Cannot view reports
  - ❌ Cannot manage assessments
  - ❌ Cannot manage users or roles

### 4. **Trainee** 🎓
- **Username:** `trainee`
- **Password:** `trainee123`
- **Access Level:** Receive Training Only
- **Permissions:**
  - ✅ **Receive training from Trainers**
  - ✅ View own training schedule
  - ✅ Complete assigned training
  - ❌ Cannot give training
  - ❌ Cannot assign training
  - ❌ Cannot manage anything
  - ❌ Read-only access to assigned content

## Navigation Access

### Dashboard (/)
- **Accessible by:** All roles
- Shows role-specific information and statistics

### Categories (/training/categories)
- **Accessible by:** Admin, Training Coordinator
- **Hidden for:** Trainer, Trainee

### Training Types (/training/types)
- **Accessible by:** Admin, Training Coordinator
- **Hidden for:** Trainer, Trainee

### Courses (/training/courses)
- **Accessible by:** Admin, Training Coordinator
- **Hidden for:** Trainer, Trainee

### Role Mapping (/training/role-mapping)
- **Accessible by:** Admin
- **Hidden for:** Training Coordinator, Trainer, Trainee

### Assessments (/training/assessments)
- **Accessible by:** Admin, Training Coordinator
- **Hidden for:** Trainer, Trainee

### Job Responsibilities (/training/job-responsibilities)
- **Accessible by:** Admin
- **Hidden for:** Training Coordinator, Trainer, Trainee

## Features

### Authentication
- **Login Page:** `/login`
- **Session Management:** Uses localStorage
- **Auto-redirect:** Unauthenticated users are redirected to login
- **Protected Routes:** All pages except login require authentication

### Authorization
- **Permission-based Navigation:** Users only see menu items they have access to
- **Role-based Visibility:** UI elements adapt based on user role
- **Function-level Permissions:** Each role has specific action permissions

### User Interface
- **User Display:** Shows current user name and role in header
- **Avatar:** First letter of user's name
- **Logout Button:** Available in header for all authenticated users
- **Quick Login:** Demo credentials available on login page

## Usage Guide

### For Administrators
1. Login with admin credentials
2. Full access to all features
3. Can manage all aspects of the system
4. Can create, edit, delete all records

### For Training Coordinators
1. Login with coordinator credentials
2. Create and manage training content (categories, types, courses)
3. Assign training sessions to trainers and trainees
4. Monitor training progress through reports
5. Manage assessments

### For Trainers
1. Login with trainer credentials
2. View assigned training sessions
3. Conduct training for trainees
4. Can also receive training from others
5. Limited to training delivery functions

### For Trainees
1. Login with trainee credentials
2. View assigned training
3. Complete training modules
4. Take assessments (if assigned)
5. View own progress

## Security Notes

- Passwords are validated on login
- User sessions persist across page reloads
- Automatic redirect to login on logout
- Role-based access prevents unauthorized actions
- Demo credentials are for testing purposes only

## Implementation Details

### Files Modified/Created
1. **`src/context/AuthContext.js`** - Authentication context and permissions
2. **`pages/login.js`** - Login page with role-based quick login
3. **`pages/_app.js`** - Added AuthProvider wrapper
4. **`src/components/SimpleLayout.js`** - Added user display and role-based navigation

### Permission System
```javascript
// Check permission
hasPermission('canManageCourses')

// Check authentication
isAuthenticated()

// Get user info
user.name
user.role
user.email
```

## Future Enhancements
- User management interface for admins
- Password change functionality
- Multi-factor authentication
- Detailed audit logs
- Training assignment interface for coordinators
- Training delivery interface for trainers
- Training completion tracking for trainees
