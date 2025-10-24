# Course Role Assignment Feature ✅

## Implementation Complete: Assign Courses to Roles

### Overview

Added the ability to assign courses to specific roles directly from the Course Management section. This creates a two-way relationship between courses and roles, matching the existing role-to-course assignment in the Role Mapping section.

---

## Feature Description

### 📚 Course → Role Assignment

Users can now assign a course to one or multiple roles when:
1. **Creating a new course** (Add Course form)
2. **Editing an existing course** (Edit Course modal)

This complements the existing **Role → Course** assignment in the Role Mapping section, giving users flexibility to manage the relationship from either direction.

---

## Implementation Details

### New State Variables

```javascript
const [selectedRoles, setSelectedRoles] = useState([])     // Roles to assign the course to
const [roleSearchTerm, setRoleSearchTerm] = useState('')   // Search within roles list
```

### New Functions

#### 1. toggleRoleSelection(roleId)
```javascript
function toggleRoleSelection(roleId) {
  setSelectedRoles(prev => {
    if (prev.includes(roleId)) {
      return prev.filter(id => id !== roleId)  // Deselect
    } else {
      return [...prev, roleId]                 // Select
    }
  })
}
```

#### 2. Enhanced addCourse()
- Creates the course with a unique ID
- Automatically assigns course to all selected roles
- Updates each role's `requiredCourseIds` array
- Clears selection after save

#### 3. Enhanced editCourse(course)
- Loads course data for editing
- Pre-selects roles that currently have this course assigned
- Displays current role assignments

#### 4. Enhanced saveEdit()
- Updates course details
- First removes course from ALL roles
- Then adds course to selected roles
- Ensures clean role assignments without duplicates

---

## UI Components

### 👥 Role Assignment Section

**Location:**
- Add Course Form: After file upload section, before buttons
- Edit Course Modal: After file upload section, before buttons

**Features:**
1. **Search Bar**
   - Real-time filtering by role name or description
   - 🔍 Search icon placeholder

2. **Selection Counter**
   - Shows number of selected roles
   - Blue background badge
   - "✓ X role(s) selected"

3. **Roles List**
   - Scrollable container (max 200px height)
   - Checkbox for each role
   - Role name with status badge
   - Role description (if available)
   - Default role indicator (⭐ DEFAULT)
   - Active/Inactive status badge

4. **Visual Feedback**
   - Selected roles: Blue border (2px)
   - Unselected roles: Gray border (1px)
   - Hover effect: Light gray background
   - Smooth transitions

---

## User Interface

### Role Card Layout
```
┌──────────────────────────────────────────────────┐
│ ☑ Manager                    ⭐ DEFAULT  ✓ Active │
│   Oversees team operations                       │
└──────────────────────────────────────────────────┘
```

### Complete Section View
```
┌────────────────────────────────────────────────────────┐
│ 👥 Assign to Roles (Optional)                          │
├────────────────────────────────────────────────────────┤
│ ┌────────────────────────────────────────────────────┐ │
│ │ 🔍 Search roles...                                 │ │
│ └────────────────────────────────────────────────────┘ │
│                                                        │
│ ┌────────────────────────────────────────────────────┐ │
│ │ ✓ 2 roles selected                                 │ │
│ └────────────────────────────────────────────────────┘ │
│                                                        │
│ ┌────────────────────────────────────────────────────┐ │
│ │ ☑ Manager              ⭐ DEFAULT    ✓ Active      │ │
│ │   Oversees team operations                         │ │
│ └────────────────────────────────────────────────────┘ │
│ ┌────────────────────────────────────────────────────┐ │
│ │ ☑ Developer                          ✓ Active      │ │
│ │   Software development role                        │ │
│ └────────────────────────────────────────────────────┘ │
│ ┌────────────────────────────────────────────────────┐ │
│ │ ☐ HR Specialist                      ✓ Active      │ │
│ │   Human resources management                       │ │
│ └────────────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────────┘
```

---

## User Guide

### How to Assign Course to Roles (Add New Course)

1. Click "➕ Add Course" button
2. Fill in course details:
   - Course Title *
   - Course Code *
   - Version
   - Duration (hours)
   - Description
3. Check "Mandatory Course" if needed
4. Upload course materials (optional)
5. **Scroll to "👥 Assign to Roles" section**
6. Search for specific roles (optional)
7. Check the boxes for roles that should have this course
8. See the selection counter update
9. Click "✓ Add Course" to save

**Result:** Course is created AND automatically assigned to all selected roles.

### How to Update Role Assignments (Edit Course)

1. Find the course in the table
2. Click the row to expand actions
3. Click "✏️ Edit" button
4. Edit modal opens with current data
5. **Scroll to "👥 Assign to Roles" section**
6. Current role assignments are pre-selected (checked)
7. Check/uncheck roles to modify assignments:
   - ✓ Check = Assign course to role
   - ☐ Uncheck = Remove course from role
8. Search for roles if needed
9. Click "✓ Save Changes"

**Result:** Course details updated AND role assignments synchronized.

---

## Features & Capabilities

### ✅ Multi-Select
- Select multiple roles at once
- No limit on number of selections
- Visual counter shows total selected

### ✅ Search & Filter
- Real-time search by role name
- Search by role description
- Case-insensitive matching
- Clear "No results" message

### ✅ Smart Filtering
- Excludes archived roles automatically
- Shows only active/inactive roles
- Maintains role status visibility

### ✅ Pre-Selection (Edit Mode)
- Automatically detects current role assignments
- Pre-checks roles that have this course
- Easy to add or remove roles

### ✅ Visual Indicators
- Default role badge (⭐ DEFAULT)
- Active/Inactive status badges
- Selected state with blue border
- Hover effects for better UX

### ✅ Empty States
- "No roles available" message
- "No roles match your search" message
- Encourages creating roles first

---

## Data Flow

### Add Course Flow
```
User selects roles
    ↓
Clicks "Add Course"
    ↓
1. Course created with unique ID
    ↓
2. For each selected role:
   - Get current requiredCourseIds
   - Add new course ID
   - Dispatch UPDATE_ROLE
    ↓
3. Clear form and selections
```

### Edit Course Flow
```
User clicks "Edit Course"
    ↓
1. Load course data
    ↓
2. Find all roles with this course
    ↓
3. Pre-select those roles
    ↓
User modifies selections
    ↓
Clicks "Save Changes"
    ↓
1. Update course details
    ↓
2. Remove course from ALL roles
    ↓
3. Add course to selected roles
    ↓
4. Clear form and selections
```

---

## AppContext Integration

### Actions Dispatched

#### ADD_COURSE
```javascript
dispatch({ 
  type: 'ADD_COURSE', 
  payload: {
    id: newCourseId,          // Generated timestamp
    title: 'Course Title',
    code: 'CRS-001',
    version: '1.0',
    description: 'Description',
    duration: '8',
    mandatory: false,
    files: [...]              // Uploaded files
  }
})
```

#### UPDATE_ROLE (for each selected role)
```javascript
dispatch({
  type: 'UPDATE_ROLE',
  payload: {
    id: roleId,
    updates: {
      requiredCourseIds: [
        ...existingCourseIds,
        newCourseId              // Add new course
      ]
    }
  }
})
```

#### UPDATE_COURSE (edit mode)
```javascript
dispatch({ 
  type: 'UPDATE_COURSE', 
  payload: {
    id: courseId,
    title: 'Updated Title',
    code: 'CRS-001',
    version: '1.2',
    description: 'Updated description',
    duration: '10',
    mandatory: true
  }
})
```

---

## Bidirectional Relationship

### Course Management → Role Mapping
**Use Case:** "This course should be required for Managers and Developers"

**Action:** In Course section
1. Edit "Cybersecurity Awareness" course
2. Select "Manager" and "Developer" roles
3. Save changes

**Result:** 
- Manager role now has this course
- Developer role now has this course
- Both visible in Role Mapping section

### Role Mapping → Course Management
**Use Case:** "Managers need these 5 courses"

**Action:** In Role Mapping section
1. Click on "Manager" role
2. Select 5 required courses
3. Save role mapping

**Result:**
- Manager role has 5 courses assigned
- Each course shows "Manager" in its role list (if you add a "View Assigned Roles" feature)

---

## Benefits

### 1. **Flexibility**
- Assign from either Course or Role perspective
- Choose the workflow that makes sense for the task

### 2. **Efficiency**
- Assign to multiple roles at once
- Edit assignments without recreating courses
- Pre-selected assignments save time

### 3. **Consistency**
- Same UI/UX pattern as Role Mapping
- Familiar checkbox selection
- Consistent search and filter behavior

### 4. **Data Integrity**
- Automatic bidirectional sync
- No orphaned relationships
- Clean removal of old assignments

### 5. **User Experience**
- Visual feedback on selections
- Search for large role lists
- Empty states guide users
- Smooth animations and transitions

---

## Technical Notes

### Course ID Generation
```javascript
const newCourseId = Date.now().toString()
```
- Uses timestamp as unique ID
- Ensures no collisions
- Simple and effective

### Role Assignment Logic
```javascript
// Add to role's course list
requiredCourseIds: [
  ...(existingCourseIds || []),
  newCourseId
]
```

### Edit Mode: Clean Slate Approach
```javascript
// 1. Remove from ALL roles
roles.forEach(role => {
  if (role.requiredCourseIds?.includes(courseId)) {
    remove(courseId)
  }
})

// 2. Add to selected roles only
selectedRoles.forEach(roleId => {
  add(courseId)
})
```

This prevents duplicate assignments and ensures accuracy.

---

## Future Enhancements (Optional)

### Potential Additions

1. **View Assigned Roles in Course List**
   - Show role badges in course table
   - Quick view of assignments
   - Click to manage

2. **Bulk Course Assignment**
   - Select multiple courses
   - Assign all to a role at once
   - Useful for compliance courses

3. **Role Templates**
   - Pre-defined role course sets
   - Quick assignment from template
   - E.g., "New Employee Package"

4. **Assignment History**
   - Track when course was assigned to role
   - See who made the assignment
   - Audit trail

5. **Smart Suggestions**
   - Suggest roles based on course content
   - "Similar courses are assigned to..."
   - AI/ML recommendations

6. **Assignment Reports**
   - Export role-course matrix
   - CSV/PDF reports
   - Compliance documentation

7. **Mandatory vs Optional**
   - Per-role requirement level
   - Course can be mandatory for some roles, optional for others
   - Advanced configuration

---

## Testing Checklist

### Add Course
- ✅ Create course without role assignment
- ✅ Create course with single role assignment
- ✅ Create course with multiple role assignments
- ✅ Search for roles during creation
- ✅ Verify role's requiredCourseIds updated

### Edit Course
- ✅ Edit course without changing roles
- ✅ Add roles to existing course
- ✅ Remove roles from course
- ✅ Change role assignments completely
- ✅ Verify pre-selected roles are correct
- ✅ Search for roles during edit
- ✅ Verify role updates are saved

### Role Assignment Panel
- ✅ Search filters roles correctly
- ✅ Checkbox toggles selection
- ✅ Selection counter updates
- ✅ Default role badge shows
- ✅ Active/Inactive badges display
- ✅ Scroll works with many roles
- ✅ Empty state shows when no roles

### Data Integrity
- ✅ No duplicate course IDs in role
- ✅ Removing course clears all role references
- ✅ Role deletion doesn't break course
- ✅ Course deletion doesn't break role

---

## Summary

✅ **Role assignment is now available in Course Management!**

**Key Features:**
- 👥 Assign courses to multiple roles
- 🔍 Search and filter roles
- ✓ Pre-selected assignments in edit mode
- 📊 Visual selection counter
- 🎨 Consistent UI/UX with Role Mapping
- 🔄 Bidirectional sync with Role Mapping

**Locations:**
- Add New Course form (after file upload)
- Edit Course modal (after file upload)

**Impact:**
- Faster course-role management
- Two-way workflow flexibility
- Better data organization
- Improved user experience

The implementation is **complete and ready to use**! 🎉
