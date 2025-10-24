# Training Types Management System - Complete Specification Document

## Document Information
- **Document Title:** Training Types Master Data Specification
- **Version:** 1.0
- **Date:** October 16, 2025
- **Author:** Training Management System
- **Purpose:** Define comprehensive specifications for creating and maintaining standardized training delivery methods

---

## Table of Contents
1. [Executive Summary](#executive-summary)
2. [System Overview](#system-overview)
3. [Field Specifications](#field-specifications)
4. [User Interface Design](#user-interface-design)
5. [Process Flow](#process-flow)
6. [CRUD Operations](#crud-operations)
7. [Validation Rules](#validation-rules)
8. [Security & Access Control](#security-access-control)
9. [Reporting & Analytics](#reporting-analytics)
10. [Technical Requirements](#technical-requirements)

---

## 1. Executive Summary

The Training Types Management System serves as a centralized repository for defining and maintaining standardized training delivery methods across the organization. This system ensures consistency in how training programs are categorized, tracked, and reported, enabling efficient resource allocation and strategic training planning.

### Key Objectives
- Establish a single source of truth for training delivery methods
- Standardize training type classifications across all departments
- Enable efficient tracking and reporting of training activities
- Support informed decision-making through comprehensive data capture
- Facilitate cost management and resource planning

---

## 2. System Overview

### 2.1 Purpose
The Training Types module allows authorized users to create, view, edit, and manage different types of training delivery methods used throughout the organization.

### 2.2 Primary Users
- **Training Administrators:** Full access to create, edit, and delete training types
- **HR Managers:** View and edit access for training types in their department
- **Department Heads:** View-only access to review available training options
- **System Administrators:** Full system access including audit logs

### 2.3 Key Features
- Comprehensive training type catalog
- Real-time validation and data integrity checks
- Status management (Active/Inactive)
- Audit trail for all changes
- Search and filter capabilities
- Bulk operations support
- Export functionality for reporting

---

## 3. Field Specifications

### 3.1 Mandatory Fields

#### Field 1: Training Type Name
- **Field Type:** Text Input
- **Character Limit:** 100 characters
- **Validation:** 
  - Required field (cannot be empty)
  - Must be unique across all training types
  - No special characters except hyphen (-) and ampersand (&)
  - Cannot start or end with spaces
- **Example Values:** 
  - "Classroom Training"
  - "Virtual Instructor-Led Training (VILT)"
  - "Self-Paced E-Learning"
  - "On-the-Job Training"
  - "Workshop & Seminars"
- **Purpose:** Primary identifier for the training delivery method
- **Display:** Bold text in card header

#### Field 2: Training Type Code / ID
- **Field Type:** Alphanumeric Input
- **Character Limit:** 20 characters
- **Validation:**
  - Required field (cannot be empty)
  - Must be unique (system enforced)
  - Uppercase letters and numbers only
  - No spaces allowed
  - Format: XXX-YYY or XXXXXXYY
- **Auto-Generation Option:** System can auto-generate based on naming convention
- **Example Values:**
  - "TRN-CLR-001" (Classroom Training)
  - "TRN-VLT-002" (Virtual Learning)
  - "TRN-EPL-003" (E-Learning)
  - "TRN-OJT-004" (On-the-Job Training)
- **Purpose:** Unique system identifier for integration with other modules
- **Display:** Badge/Tag format with custom color

#### Field 3: Description
- **Field Type:** Multi-line Text Area
- **Character Limit:** 500 characters
- **Validation:**
  - Required field
  - Minimum 20 characters
  - Maximum 500 characters
  - Character counter displayed
- **Example Values:**
  - "Traditional face-to-face training conducted in a physical classroom with an instructor present. Suitable for hands-on learning and group activities."
  - "Live online training sessions delivered via video conferencing platforms. Enables remote participation while maintaining instructor interaction."
- **Purpose:** Detailed explanation of the training type and its characteristics
- **Display:** Regular text with "Show More/Show Less" toggle for long descriptions

#### Field 4: Delivery Mode
- **Field Type:** Single-select Dropdown
- **Available Options:**
  - In-Person / Classroom
  - Virtual / Online Live
  - Self-Paced Online
  - Hybrid (Combination)
  - On-Site / Field Training
  - Coaching / Mentoring
  - Conference / Seminar
  - Blended Learning
- **Validation:** Required field, must select one option
- **Purpose:** Categorize how the training is delivered to participants
- **Display:** Icon + Text label
- **Icons:**
  - 🏫 In-Person
  - 💻 Virtual
  - 📱 Self-Paced
  - 🔄 Hybrid
  - 🏭 On-Site
  - 👥 Coaching
  - 🎤 Conference
  - 📚 Blended

#### Field 5: Duration (Hours/Days)
- **Field Type:** Number Input with Unit Selector
- **Components:**
  - Numeric value (decimal allowed, up to 2 decimal places)
  - Unit dropdown (Hours / Days / Weeks / Months)
- **Validation:**
  - Required field
  - Must be greater than 0
  - Maximum: 365 days or equivalent
- **Example Values:**
  - "2 Hours"
  - "3 Days"
  - "1.5 Weeks"
  - "6 Months"
- **Purpose:** Standard duration for this training type
- **Display:** Number + Unit in badge format
- **System Behavior:** Auto-converts to hours for calculations

### 3.2 Mandatory System Fields

#### Field 6: Cost Type / Expense Category
- **Field Type:** Multi-select Dropdown
- **Available Options:**
  - Internal Training (No external cost)
  - External Vendor Fee
  - Software/Platform Subscription
  - Travel & Accommodation
  - Materials & Resources
  - Instructor/Facilitator Fee
  - Venue Rental
  - Certification Fee
  - Equipment Purchase/Rental
- **Validation:** At least one option must be selected
- **Purpose:** Identify cost components associated with this training type
- **Display:** Tags/chips showing selected categories
- **Color Coding:**
  - Green: Internal/No cost
  - Blue: Vendor fees
  - Orange: Travel related
  - Purple: Certification

#### Field 7: Eligibility / Applicable Roles
- **Field Type:** Multi-select Dropdown with Search
- **Data Source:** Populated from Job Responsibilities Master Data
- **Options:**
  - All Employees
  - Management Level Only
  - Specific Departments (selectable list)
  - Specific Job Roles (selectable list)
  - New Hires (within X months)
  - Custom Role Groups
- **Validation:** At least one eligibility criterion required
- **Purpose:** Define who can participate in this training type
- **Display:** Comma-separated list with "Show All" expansion
- **Search Feature:** Type-ahead search for quick role selection

### 3.3 Audit & Tracking Fields (Auto-populated)

#### Field 8: Created By / Created Date
- **Field Type:** Auto-populated (Read-only)
- **Components:**
  - Created By: Username/Full name of creator
  - Created Date: Timestamp (YYYY-MM-DD HH:MM:SS)
- **Data Source:** System authentication context
- **Purpose:** Track who created the training type and when
- **Display:** 
  - "Created by [Name] on [Date]"
  - Format: "Created by John Doe on Oct 16, 2025, 10:30 AM"
- **Audit Log:** All creation events logged to audit table

#### Field 9: Last Updated By / Last Updated Date
- **Field Type:** Auto-populated (Read-only)
- **Components:**
  - Last Updated By: Username/Full name of last editor
  - Last Updated Date: Timestamp (YYYY-MM-DD HH:MM:SS)
- **Data Source:** System authentication context
- **Update Trigger:** Updated on every edit/save action
- **Purpose:** Track modification history
- **Display:**
  - "Last updated by [Name] on [Date]"
  - Format: "Last updated by Jane Smith on Oct 16, 2025, 2:45 PM"
- **Version Control:** Maintains version history in background

### 3.4 Status & Configuration Fields

#### Field 10: Active / Inactive Flag
- **Field Type:** Toggle Switch / Status Dropdown
- **Available Options:**
  - Active (Default for new entries)
  - Inactive
- **Validation:** Cannot be null/empty
- **Purpose:** Control visibility and availability of training type
- **Business Rules:**
  - Only Active training types appear in course creation dropdowns
  - Inactive types are hidden from regular users (visible to admins)
  - Cannot delete training type if used in courses (must deactivate instead)
- **Display:**
  - Active: ✓ Green badge "Active"
  - Inactive: ⏸ Red badge "Inactive"
- **Toggle Action:** Immediate update with confirmation dialog
- **Confirmation Message:** 
  - Activating: "Activate this training type? It will be available for use."
  - Deactivating: "Deactivate this training type? It will be hidden from selection lists."

---

## 4. User Interface Design

### 4.1 Page Layout

#### Header Section
```
┌─────────────────────────────────────────────────────────────┐
│  🎓 Training Types Management                               │
│                                                             │
│  [+ Add New Training Type]          [🔍 Search...]         │
│  [📤 Export]  [📊 View Report]      [⚙️ Settings]          │
└─────────────────────────────────────────────────────────────┘
```

#### Filter & Search Bar
```
┌─────────────────────────────────────────────────────────────┐
│  Filters:                                                   │
│  Delivery Mode: [All ▼]   Status: [All ▼]   Cost: [All ▼] │
│  Sort By: [Name ▼]         View: [📇 Card] [📋 List]       │
└─────────────────────────────────────────────────────────────┘
```

#### Statistics Dashboard (Optional)
```
┌──────────────┬──────────────┬──────────────┬──────────────┐
│ Total Types  │ Active Types │ Inactive     │ Most Used    │
│     24       │      18      │      6       │  Classroom   │
└──────────────┴──────────────┴──────────────┴──────────────┘
```

### 4.2 Card Layout (Default View)

```
┌─────────────────────────────────────────────────────────────┐
│  🏫  Classroom Training            [✓ Active]               │
│      TRN-CLR-001                                            │
│                                                             │
│  Traditional face-to-face training conducted in a           │
│  physical classroom with an instructor present...           │
│                                                             │
│  📍 Delivery: In-Person              ⏱️ Duration: 2 Days    │
│  💰 Cost Type: Venue Rental, Materials                      │
│  👥 Eligible: All Employees                                 │
│                                                             │
│  Created by: John Doe on Oct 10, 2025                       │
│  Updated by: Jane Smith on Oct 15, 2025                     │
│                                                             │
│  [Click to see action buttons]                              │
└─────────────────────────────────────────────────────────────┘

[When clicked, buttons appear:]
┌─────────────────────────────────────────────────────────────┐
│  [✏️ Edit] [📋 Duplicate] [⏸️ Deactivate] [👁 View] [🗑 Delete] │
└─────────────────────────────────────────────────────────────┘
```

### 4.3 Action Buttons Specification

#### Primary Actions (Appear on Card Click)

**1. Edit Button**
- **Label:** ✏️ Edit
- **Color:** Blue (#3b82f6)
- **Hover Color:** Dark Blue (#2563eb)
- **Action:** Opens edit form with pre-populated data
- **Permission:** Training Admin, HR Manager
- **Tooltip:** "Edit this training type"

**2. Duplicate Button**
- **Label:** 📋 Duplicate
- **Color:** Purple (#8b5cf6)
- **Hover Color:** Dark Purple (#7c3aed)
- **Action:** Creates copy with "(Copy)" suffix in name
- **Permission:** Training Admin
- **Tooltip:** "Create a duplicate of this training type"
- **Behavior:** Opens edit form with duplicated data for review before saving

**3. Activate/Deactivate Button**
- **Label (Active):** ⏸️ Deactivate
- **Label (Inactive):** ✓ Activate
- **Color (Active):** Orange (#f59e0b)
- **Color (Inactive):** Green (#10b981)
- **Hover Color (Active):** Dark Orange (#d97706)
- **Hover Color (Inactive):** Dark Green (#059669)
- **Action:** Toggles status with confirmation
- **Permission:** Training Admin
- **Tooltip:** "Change status of this training type"
- **Confirmation Required:** Yes

**4. View Button**
- **Label:** 👁 View
- **Color:** Cyan (#06b6d4)
- **Hover Color:** Dark Cyan (#0891b2)
- **Action:** Opens read-only modal with full details
- **Permission:** All users
- **Tooltip:** "View complete details"

**5. Delete Button**
- **Label:** 🗑 Delete
- **Color:** Red (#ef4444)
- **Hover Color:** Dark Red (#dc2626)
- **Action:** Permanently deletes training type
- **Permission:** System Admin only
- **Tooltip:** "Delete this training type permanently"
- **Confirmation Required:** Yes (2-step confirmation)
- **Business Rule:** Cannot delete if used in any course
- **Error Message:** "Cannot delete: This training type is used in X active courses"

### 4.4 Form Layout (Add/Edit)

```
┌─────────────────────────────────────────────────────────────┐
│  [Add New Training Type] / [Edit Training Type]             │
│  ─────────────────────────────────────────────────────────  │
│                                                             │
│  Training Type Name: *                                      │
│  [_________________________________________________]        │
│                                                             │
│  Training Type Code: *                                      │
│  [__________________]  [🔄 Auto-Generate]                   │
│                                                             │
│  Description: *                                             │
│  [_________________________________________________]        │
│  [_________________________________________________]        │
│  [_________________________________________________]        │
│  (450/500 characters remaining)                             │
│                                                             │
│  Delivery Mode: *                                           │
│  [Select Delivery Mode ▼]                                   │
│                                                             │
│  Duration: *                                                │
│  [____] [Hours ▼]                                           │
│                                                             │
│  Cost Type / Expense Category: *                            │
│  [☐ Internal Training    ☐ External Vendor Fee]            │
│  [☐ Software Subscription ☐ Travel & Accommodation]        │
│  [☐ Materials & Resources ☐ Instructor Fee]                │
│  [☐ Venue Rental         ☐ Certification Fee]              │
│  [☐ Equipment]                                              │
│                                                             │
│  Eligibility / Applicable Roles: *                          │
│  [Search roles...                                      ▼]   │
│  Selected: [Management ×] [New Hires ×] [IT Department ×]  │
│                                                             │
│  Status: *                                                  │
│  ⚪ Active    ⚪ Inactive                                    │
│                                                             │
│  ─────────────────────────────────────────────────────────  │
│  [💾 Save]  [❌ Cancel]  [🔄 Reset]                         │
└─────────────────────────────────────────────────────────────┘
```

### 4.5 View Details Modal

```
┌─────────────────────────────────────────────────────────────┐
│  Training Type Details                               [✕]    │
│  ───────────────────────────────────────────────────────────│
│                                                             │
│  🏫  Classroom Training                  [✓ Active]         │
│       TRN-CLR-001                                           │
│                                                             │
│  Description:                                               │
│  Traditional face-to-face training conducted in a           │
│  physical classroom with an instructor present. Suitable    │
│  for hands-on learning and group activities.                │
│                                                             │
│  ───────────────────────────────────────────────────────────│
│                                                             │
│  📍 Delivery Mode:                                          │
│     In-Person / Classroom                                   │
│                                                             │
│  ⏱️ Duration:                                               │
│     2 Days (16 Hours)                                       │
│                                                             │
│  💰 Cost Type / Expense Category:                           │
│     • Venue Rental                                          │
│     • Materials & Resources                                 │
│     • Instructor/Facilitator Fee                            │
│                                                             │
│  👥 Eligibility / Applicable Roles:                         │
│     • All Employees                                         │
│     • Management Level                                      │
│     • Sales Department                                      │
│     • Customer Service Team                                 │
│                                                             │
│  ───────────────────────────────────────────────────────────│
│                                                             │
│  📋 Audit Information:                                      │
│                                                             │
│  Created by: John Doe                                       │
│  Created on: October 10, 2025, 9:30 AM                      │
│                                                             │
│  Last updated by: Jane Smith                                │
│  Last updated on: October 15, 2025, 2:45 PM                 │
│                                                             │
│  Version History: [View 3 previous versions →]             │
│                                                             │
│  ───────────────────────────────────────────────────────────│
│  [✏️ Edit]  [📋 Duplicate]  [🗑 Delete]  [Close]            │
└─────────────────────────────────────────────────────────────┘
```

---

## 5. Process Flow

### 5.1 Creation Process

```
┌─────────────┐
│   START     │
└──────┬──────┘
       │
       ▼
┌─────────────────────────┐
│ User clicks             │
│ "Add New Training Type" │
└──────┬──────────────────┘
       │
       ▼
┌─────────────────────────┐
│ System displays         │
│ blank form with         │
│ required fields marked  │
└──────┬──────────────────┘
       │
       ▼
┌─────────────────────────┐
│ User fills in           │
│ mandatory fields:       │
│ - Name                  │
│ - Code                  │
│ - Description           │
│ - Delivery Mode         │
│ - Duration              │
│ - Cost Type             │
│ - Eligibility           │
└──────┬──────────────────┘
       │
       ▼
┌─────────────────────────┐     ┌──────────────────┐
│ User clicks "Save"      │────→│ Validation       │
└─────────────────────────┘     │ Check            │
                                └────┬─────────────┘
                                     │
                    ┌────────────────┴────────────────┐
                    │                                 │
             [PASS] ▼                                 ▼ [FAIL]
       ┌──────────────────────┐         ┌─────────────────────────┐
       │ System validates:    │         │ Display error messages  │
       │ - Unique name        │         │ - Highlight invalid     │
       │ - Unique code        │         │   fields                │
       │ - All required fields│         │ - User corrects errors  │
       │ - Format compliance  │         └──────┬──────────────────┘
       └──────┬───────────────┘                │
              │                                 │
              ▼                                 │
       ┌──────────────────────┐                │
       │ System saves data:   │                │
       │ - Auto-populate      │◄───────────────┘
       │   Created By         │
       │ - Auto-populate      │
       │   Created Date       │
       │ - Set status         │
       │   (Active by default)│
       └──────┬───────────────┘
              │
              ▼
       ┌──────────────────────┐
       │ Success message:     │
       │ "Training Type       │
       │ created successfully"│
       └──────┬───────────────┘
              │
              ▼
       ┌──────────────────────┐
       │ System returns to    │
       │ list view showing    │
       │ new training type    │
       └──────┬───────────────┘
              │
              ▼
       ┌─────────────┐
       │     END     │
       └─────────────┘
```

**Responsible Parties:**
- **User Action:** Training Administrator or HR Manager
- **System Action:** Automated validation and data storage
- **Expected Outcome:** New training type created and available for use

### 5.2 Validation/Review Process

```
┌─────────────┐
│   START     │
└──────┬──────┘
       │
       ▼
┌─────────────────────────┐
│ Data Validation Layer   │
└──────┬──────────────────┘
       │
       ▼
┌─────────────────────────┐
│ Field-Level Validation  │
│ ─────────────────────── │
│ ✓ Name: Unique?         │
│ ✓ Code: Format correct? │
│ ✓ Description: Length?  │
│ ✓ Duration: Valid range?│
│ ✓ All required filled?  │
└──────┬──────────────────┘
       │
       ▼
┌─────────────────────────┐
│ Business Rule Validation│
│ ─────────────────────── │
│ ✓ Code format standard? │
│ ✓ Cost types logical?   │
│ ✓ Roles exist in system?│
│ ✓ No conflicts?         │
└──────┬──────────────────┘
       │
       ▼
┌─────────────────────────┐
│ Cross-Reference Check   │
│ ─────────────────────── │
│ • Check against existing│
│   training types        │
│ • Verify role references│
│ • Validate dependencies │
└──────┬──────────────────┘
       │
       ▼
       Decision
   ┌───────────┐
   │All Valid? │
   └─────┬─────┘
         │
    ┌────┴────┐
    │         │
 [YES]      [NO]
    │         │
    ▼         ▼
 ┌──────┐  ┌──────────────────┐
 │PASS  │  │Display Errors:   │
 │      │  │- Field highlights│
 │Save  │  │- Error messages  │
 │Data  │  │- Correction hints│
 └──┬───┘  └────────┬─────────┘
    │               │
    │               ▼
    │      ┌────────────────┐
    │      │User corrects   │
    │      │and resubmits   │
    │      └────────┬───────┘
    │               │
    └───────────────┘
            │
            ▼
       ┌─────────────┐
       │     END     │
       └─────────────┘
```

**Responsible Parties:**
- **Primary:** System (automated validation engine)
- **Secondary:** User (correcting validation errors)
- **Expected Outcome:** Data integrity maintained, clean dataset

### 5.3 Use in System Process

```
┌─────────────┐
│   START     │
│(User creates│
│new course)  │
└──────┬──────┘
       │
       ▼
┌─────────────────────────┐
│ Course Creation Form    │
│ displays "Training Type"│
│ dropdown                │
└──────┬──────────────────┘
       │
       ▼
┌─────────────────────────┐
│ System queries:         │
│ - Fetch all ACTIVE      │
│   training types        │
│ - Order by name         │
│ - Filter by user's      │
│   department (if needed)│
└──────┬──────────────────┘
       │
       ▼
┌─────────────────────────┐
│ Display dropdown list:  │
│ [Select Training Type ▼]│
│  • Classroom Training   │
│  • E-Learning           │
│  • Virtual Training     │
│  • On-the-Job Training  │
│  • Workshop             │
└──────┬──────────────────┘
       │
       ▼
┌─────────────────────────┐
│ User selects a type     │
└──────┬──────────────────┘
       │
       ▼
┌─────────────────────────┐
│ System auto-fills:      │
│ - Default duration      │
│ - Cost categories       │
│ - Delivery mode         │
│ - Eligibility rules     │
└──────┬──────────────────┘
       │
       ▼
┌─────────────────────────┐
│ User completes course   │
│ creation with inherited │
│ training type attributes│
└──────┬──────────────────┘
       │
       ▼
┌─────────────────────────┐
│ Course saved with       │
│ training type reference │
└──────┬──────────────────┘
       │
       ▼
┌─────────────┐
│     END     │
└─────────────┘
```

**Responsible Parties:**
- **User:** Course creator selecting training type
- **System:** Auto-population of fields based on training type
- **Expected Outcome:** Standardized course data with consistent training type attributes

### 5.4 Maintenance Process

```
┌─────────────┐
│   START     │
│(Periodic    │
│ Review)     │
└──────┬──────┘
       │
       ▼
┌─────────────────────────┐
│ Review Trigger:         │
│ • Quarterly review      │
│ • Change request        │
│ • Usage analytics       │
│ • Audit findings        │
└──────┬──────────────────┘
       │
       ▼
┌─────────────────────────┐
│ Analyze Training Types: │
│ ─────────────────────── │
│ • Usage frequency       │
│ • Last used date        │
│ • Associated courses    │
│ • User feedback         │
└──────┬──────────────────┘
       │
       ▼
   Decision: Action Needed?
   ┌───────────────┐
   │               │
   ▼               ▼
[UPDATE]        [DEACTIVATE]
   │               │
   ▼               ▼
┌──────────┐  ┌────────────────┐
│Edit type │  │Check if used   │
│Update:   │  │in active courses│
│-Fields   │  └───────┬────────┘
│-Desc     │          │
│-Costs    │          ▼
└────┬─────┘  ┌────────────────┐
     │        │If not used:    │
     │        │Deactivate      │
     │        │               │
     │        │If used:        │
     │        │Keep active or  │
     │        │migrate courses │
     │        └───────┬────────┘
     │                │
     └────────┬───────┘
              │
              ▼
       ┌─────────────────┐
       │ Update audit log│
       │ - Who changed   │
       │ - What changed  │
       │ - When          │
       │ - Why (comment) │
       └──────┬──────────┘
              │
              ▼
       ┌─────────────────┐
       │ Notify affected │
       │ users (if needed)│
       └──────┬──────────┘
              │
              ▼
       ┌─────────────┐
       │     END     │
       └─────────────┘
```

**Responsible Parties:**
- **Primary:** Training Administrator (quarterly review)
- **Secondary:** Department Heads (change requests)
- **System:** Automated usage analytics
- **Expected Outcome:** Up-to-date, relevant training type catalog

### 5.5 Reporting Process

```
┌─────────────┐
│   START     │
│(User needs  │
│ report)     │
└──────┬──────┘
       │
       ▼
┌─────────────────────────┐
│ User selects            │
│ "View Report" or        │
│ "Export Data"           │
└──────┬──────────────────┘
       │
       ▼
┌─────────────────────────┐
│ Select Report Type:     │
│ • All Training Types    │
│ • Active Types Only     │
│ • Usage Statistics      │
│ • Cost Analysis         │
│ • Department Summary    │
└──────┬──────────────────┘
       │
       ▼
┌─────────────────────────┐
│ Apply Filters:          │
│ • Date range            │
│ • Department            │
│ • Delivery mode         │
│ • Status                │
└──────┬──────────────────┘
       │
       ▼
┌─────────────────────────┐
│ System generates report:│
│ • Query database        │
│ • Calculate metrics     │
│ • Format data           │
└──────┬──────────────────┘
       │
       ▼
┌─────────────────────────┐
│ Display/Export Options: │
│ • View on screen        │
│ • Export to Excel       │
│ • Export to PDF         │
│ • Schedule email        │
└──────┬──────────────────┘
       │
       ▼
┌─────────────────────────┐
│ User downloads/views    │
│ report                  │
└──────┬──────────────────┘
       │
       ▼
┌─────────────────────────┐
│ Log report access:      │
│ • Who accessed          │
│ • What data exported    │
│ • When                  │
└──────┬──────────────────┘
       │
       ▼
┌─────────────┐
│     END     │
└─────────────┘
```

**Responsible Parties:**
- **User:** Requesting and configuring report
- **System:** Generating and delivering report
- **Expected Outcome:** Actionable insights from training type data

---

## 6. CRUD Operations

### 6.1 CREATE Operation

**Purpose:** Add a new training type to the system

**User Action:**
1. Click "Add New Training Type" button
2. Fill in all mandatory fields
3. Select optional fields as needed
4. Click "Save" button

**System Action:**
1. Validate all inputs
2. Check for uniqueness (name, code)
3. Auto-populate system fields (Created By, Created Date)
4. Set default status (Active)
5. Save to database
6. Return success confirmation

**Success Message:**
"✓ Training Type created successfully! [View] [Create Another]"

**Error Handling:**
- Display field-specific errors
- Highlight invalid fields in red
- Prevent save until all errors resolved

**Permissions Required:**
- Training Administrator: Yes
- HR Manager: Yes (department-specific)
- Department Head: No

### 6.2 READ Operation

**Purpose:** View training type details

**User Action:**
1. Click on training type card (anywhere on card)
2. View inline details OR
3. Click "View" button for detailed modal

**System Action:**
1. Fetch complete record from database
2. Format data for display
3. Show audit trail
4. Display usage statistics (how many courses use this type)

**Display Options:**
- **Card View:** Summary information
- **List View:** Tabular format with key fields
- **Detail View:** Complete information in modal

**Permissions Required:**
- All users: Can view active training types
- Administrators: Can view active and inactive types

### 6.3 UPDATE Operation

**Purpose:** Modify existing training type

**User Action:**
1. Click on training type card to reveal buttons
2. Click "Edit" button
3. Modify fields as needed
4. Click "Save" button

**System Action:**
1. Load existing data into form
2. Validate changes
3. Check for conflicts (if changing name/code)
4. Update "Last Updated By" and "Last Updated Date"
5. Save changes to database
6. Update version history
7. Notify relevant users if major changes

**Success Message:**
"✓ Training Type updated successfully!"

**Business Rules:**
- Cannot change Code if used in active courses (show warning)
- Major changes trigger notification to users
- Version history maintained automatically

**Permissions Required:**
- Training Administrator: Yes (all fields)
- HR Manager: Limited (description, eligibility only)
- Department Head: No

### 6.4 DELETE Operation

**Purpose:** Permanently remove training type from system

**User Action:**
1. Click on training type card to reveal buttons
2. Click "Delete" button
3. Confirm deletion (2-step confirmation)

**System Action:**
1. Check if training type is used in any courses
2. If used: Prevent deletion, show error
3. If not used: Request confirmation
4. Second confirmation with typed confirmation code
5. Soft delete (mark as deleted, don't remove)
6. Log deletion in audit trail

**Confirmation Dialog:**
```
⚠️ Delete Training Type?

This action cannot be undone!

Training Type: [Name]
Code: [Code]

Type "DELETE" to confirm: [_______]

[Cancel]  [Confirm Delete]
```

**Error Message (if used):**
"❌ Cannot delete: This training type is used in 5 active courses. Please deactivate instead or reassign courses."

**Permissions Required:**
- System Administrator: Yes (only role with delete permission)
- Training Administrator: No (can deactivate only)

### 6.5 Additional Operations

#### DUPLICATE Operation

**Purpose:** Create a copy of existing training type for quick setup

**User Action:**
1. Click on training type card
2. Click "Duplicate" button

**System Action:**
1. Copy all fields from original
2. Append "(Copy)" to name
3. Generate new unique code
4. Open edit form with copied data
5. User reviews and modifies as needed
6. Save as new training type

**Success Message:**
"Training type duplicated. Review and save to create."

#### ACTIVATE/DEACTIVATE Operation

**Purpose:** Control availability without deleting

**User Action:**
1. Click on training type card
2. Click "Activate" or "Deactivate" button
3. Confirm action

**System Action:**
1. Toggle status flag
2. Update "Last Updated" fields
3. If deactivating: Remove from selection lists
4. If activating: Make available in selection lists
5. Log status change

**Confirmation Message:**
- Deactivate: "Deactivate this training type? It will no longer appear in course creation forms."
- Activate: "Activate this training type? It will be available for selection."

---

## 7. Validation Rules

### 7.1 Field-Level Validation Rules

| Field | Validation Rule | Error Message |
|-------|----------------|---------------|
| Training Type Name | Required, 3-100 characters, unique | "Name is required and must be unique" |
| Training Type Code | Required, 3-20 characters, alphanumeric, unique, uppercase | "Code must be unique and alphanumeric" |
| Description | Required, 20-500 characters | "Description must be between 20-500 characters" |
| Delivery Mode | Required, must select one option | "Please select a delivery mode" |
| Duration Value | Required, must be > 0, max 365 days equivalent | "Duration must be greater than 0" |
| Duration Unit | Required, must select Hours/Days/Weeks/Months | "Please select a duration unit" |
| Cost Type | At least one option must be selected | "Please select at least one cost type" |
| Eligibility | At least one role must be selected | "Please select eligible roles" |
| Status | Required, must be Active or Inactive | "Please select a status" |

### 7.2 Business Rule Validation

1. **Uniqueness Rules:**
   - Training Type Name must be unique (case-insensitive)
   - Training Type Code must be unique (case-sensitive)
   - Error: "A training type with this [name/code] already exists"

2. **Format Rules:**
   - Code format: XXX-YYY-### or custom format
   - No special characters in code except hyphen
   - Error: "Code must follow format: XXX-YYY-###"

3. **Dependency Rules:**
   - Cannot delete training type if used in courses
   - Must deactivate instead of delete
   - Error: "Cannot delete: Used in X active courses"

4. **Status Rules:**
   - New training types default to Active
   - Inactive types hidden from selection lists
   - Can reactivate deactivated types

5. **Duration Rules:**
   - Maximum duration: 365 days (or equivalent)
   - Decimals allowed up to 2 places
   - Auto-convert to hours for system calculations

### 7.3 Cross-Field Validation

1. **Cost Type vs. Delivery Mode:**
   - Warning if "Internal Training" selected with "External Vendor Fee"
   - Warning: "Cost types may not match delivery mode"

2. **Duration vs. Delivery Mode:**
   - Warning if Self-Paced has fixed duration
   - Info: "Self-paced training typically has flexible duration"

3. **Eligibility vs. Status:**
   - Warning if eligibility changes while used in active courses
   - Warning: "Changing eligibility affects X active courses"

### 7.4 Data Integrity Rules

1. **Audit Trail Integrity:**
   - Created By/Date: Auto-populated, never editable
   - Last Updated By/Date: Auto-updated on every save
   - Cannot be manually modified

2. **Version Control:**
   - Every update creates new version
   - Previous versions retained for audit
   - Can view version history

3. **Referential Integrity:**
   - Role references validated against Job Responsibilities
   - Invalid roles prevented or auto-removed
   - Error: "Role [Role Name] no longer exists"

---

## 8. Security & Access Control

### 8.1 Role-Based Permissions

| Role | Create | Read | Update | Delete | Activate/Deactivate |
|------|--------|------|--------|--------|---------------------|
| System Administrator | ✓ | ✓ | ✓ | ✓ | ✓ |
| Training Administrator | ✓ | ✓ | ✓ | ✗ | ✓ |
| HR Manager | ✓* | ✓ | ✓* | ✗ | ✗ |
| Department Head | ✗ | ✓ | ✗ | ✗ | ✗ |
| Regular User | ✗ | ✓** | ✗ | ✗ | ✗ |

*Limited: Can only modify description and eligibility fields
**Limited: Can only view active training types

### 8.2 Data Access Rules

1. **Department-Level Access:**
   - HR Managers see only their department's training types
   - Can be overridden by System Admin
   - Cross-department visibility optional

2. **Status-Based Access:**
   - Regular users see Active types only
   - Administrators see all statuses
   - Inactive types hidden from dropdowns

3. **Audit Log Access:**
   - All changes logged with user ID
   - Audit logs viewable by System Admin only
   - Includes: Who, What, When, Why (if comment provided)

### 8.3 Security Measures

1. **Input Sanitization:**
   - All text inputs sanitized to prevent XSS
   - SQL injection protection
   - Special character handling

2. **Session Management:**
   - Auto-populate Created By from authenticated session
   - Timeout after inactivity
   - Concurrent edit prevention

3. **Data Encryption:**
   - Sensitive audit data encrypted at rest
   - Secure transmission (HTTPS)

---

## 9. Reporting & Analytics

### 9.1 Standard Reports

#### Report 1: Training Types Master List
**Purpose:** Complete listing of all training types

**Content:**
- All 10 fields for each training type
- Sortable by any column
- Filterable by status, delivery mode, department

**Format:** Excel, PDF, CSV

**Frequency:** On-demand

#### Report 2: Training Type Usage Report
**Purpose:** Show which training types are most/least used

**Content:**
- Training Type Name & Code
- Number of courses using this type
- Total enrollments
- Last used date
- Usage trend (increasing/decreasing)

**Format:** Excel with charts, PDF

**Frequency:** Monthly

#### Report 3: Cost Analysis Report
**Purpose:** Analyze cost categories across training types

**Content:**
- Training Type
- Associated cost types
- Average course cost by type
- Total spend by training type
- Cost per learner

**Format:** Excel with pivot tables, PDF

**Frequency:** Quarterly

#### Report 4: Inactive Training Types Report
**Purpose:** Identify unused or deactivated types for cleanup

**Content:**
- Training Type Name & Code
- Status
- Last used date
- Number of associated courses (if any)
- Recommendation (keep/archive/delete)

**Format:** Excel, PDF

**Frequency:** Quarterly

### 9.2 Analytics Dashboard

**Key Metrics:**
1. Total Training Types: [Count]
2. Active vs. Inactive: [Pie Chart]
3. Most Used Training Type: [Name]
4. Average Duration: [Hours/Days]
5. Cost Distribution: [Bar Chart]
6. Delivery Mode Breakdown: [Pie Chart]

**Trend Analysis:**
- New training types added over time
- Usage trends by type
- Status changes over time

---

## 10. Technical Requirements

### 10.1 Database Schema

```sql
CREATE TABLE TrainingTypes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    trainingTypeName VARCHAR(100) NOT NULL UNIQUE,
    trainingTypeCode VARCHAR(20) NOT NULL UNIQUE,
    description TEXT NOT NULL,
    deliveryMode VARCHAR(50) NOT NULL,
    durationValue DECIMAL(5,2) NOT NULL,
    durationUnit VARCHAR(20) NOT NULL,
    costTypes JSON NOT NULL,
    eligibleRoles JSON NOT NULL,
    status ENUM('active', 'inactive') DEFAULT 'active',
    createdBy VARCHAR(100) NOT NULL,
    createdDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    lastUpdatedBy VARCHAR(100) NOT NULL,
    lastUpdatedDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    isDeleted BOOLEAN DEFAULT FALSE,
    INDEX idx_status (status),
    INDEX idx_deliveryMode (deliveryMode),
    INDEX idx_createdDate (createdDate)
);
```

### 10.2 API Endpoints

**GET /api/training-types**
- Fetch all training types (filtered by status for regular users)
- Query params: status, deliveryMode, search

**GET /api/training-types/:id**
- Fetch single training type by ID
- Returns full details including audit trail

**POST /api/training-types**
- Create new training type
- Body: All mandatory fields
- Returns: Created record with auto-generated ID

**PUT /api/training-types/:id**
- Update existing training type
- Body: Fields to update
- Returns: Updated record

**DELETE /api/training-types/:id**
- Soft delete training type
- Checks usage before deletion
- Returns: Success/error message

**PATCH /api/training-types/:id/status**
- Toggle active/inactive status
- Body: { status: 'active' | 'inactive' }
- Returns: Updated record

### 10.3 Performance Requirements

1. **Page Load Time:** < 2 seconds for list view
2. **Search Response:** < 500ms
3. **Save Operation:** < 1 second
4. **Export Report:** < 5 seconds for up to 1000 records
5. **Concurrent Users:** Support 50+ simultaneous users

### 10.4 Browser Compatibility

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (responsive design)

### 10.5 Integration Points

1. **Course Management Module:**
   - Training types appear in course creation dropdown
   - Auto-populate course fields from training type

2. **Job Responsibilities Module:**
   - Eligibility roles linked to job responsibilities
   - Real-time validation of role references

3. **Reporting Module:**
   - Training types data feeds into analytics
   - Usage metrics calculated automatically

4. **User Authentication:**
   - Created By/Updated By populated from user session
   - Role-based permissions enforced

---

## Appendix A: Sample Data

### Sample Training Type 1
- **Name:** Classroom Training
- **Code:** TRN-CLR-001
- **Description:** Traditional face-to-face training conducted in a physical classroom with an instructor present. Suitable for hands-on learning and group activities.
- **Delivery Mode:** In-Person / Classroom
- **Duration:** 2 Days (16 Hours)
- **Cost Types:** Venue Rental, Materials & Resources, Instructor Fee
- **Eligibility:** All Employees, Management Level
- **Status:** Active

### Sample Training Type 2
- **Name:** Virtual Instructor-Led Training (VILT)
- **Code:** TRN-VLT-002
- **Description:** Live online training sessions delivered via video conferencing platforms. Enables remote participation while maintaining instructor interaction.
- **Delivery Mode:** Virtual / Online Live
- **Duration:** 4 Hours
- **Cost Types:** Software/Platform Subscription, Instructor Fee
- **Eligibility:** All Employees, Remote Workers
- **Status:** Active

### Sample Training Type 3
- **Name:** Self-Paced E-Learning
- **Code:** TRN-EPL-003
- **Description:** Online courses that employees can complete at their own pace through a learning management system. Includes video lectures, quizzes, and interactive content.
- **Delivery Mode:** Self-Paced Online
- **Duration:** 8 Hours (flexible)
- **Cost Types:** Software/Platform Subscription, Content Development
- **Eligibility:** All Employees
- **Status:** Active

### Sample Training Type 4
- **Name:** On-the-Job Training (OJT)
- **Code:** TRN-OJT-004
- **Description:** Practical training conducted in the actual work environment under supervision. Focuses on hands-on skill development and real-world application.
- **Delivery Mode:** On-Site / Field Training
- **Duration:** 5 Days
- **Cost Types:** Internal Training (No external cost), Supervisor Time
- **Eligibility:** New Hires, Junior Staff
- **Status:** Active

### Sample Training Type 5
- **Name:** Professional Certification Program
- **Code:** TRN-CRT-005
- **Description:** Structured program leading to industry-recognized certification. Includes exam preparation and certification fee.
- **Delivery Mode:** Blended Learning
- **Duration:** 3 Months
- **Cost Types:** External Vendor Fee, Certification Fee, Study Materials
- **Eligibility:** Management Level, Senior Staff
- **Status:** Active

---

## Appendix B: Glossary

| Term | Definition |
|------|------------|
| **Training Type** | A categorized method of delivering training content to employees |
| **Delivery Mode** | The format or medium through which training is conducted |
| **Cost Type** | Categories of expenses associated with training delivery |
| **Eligibility** | Criteria defining which employees can participate in a training type |
| **Active Status** | Training type is available for selection and use in the system |
| **Inactive Status** | Training type is hidden from selection but retained for historical data |
| **CRUD** | Create, Read, Update, Delete - standard database operations |
| **Audit Trail** | Historical record of all changes made to a record |
| **Soft Delete** | Marking a record as deleted without physically removing it from database |
| **Version History** | Record of all previous versions of a training type |

---

## Appendix C: FAQ

**Q1: Can I delete a training type that's being used in active courses?**
A: No. The system prevents deletion of training types that are referenced in active courses. You must first deactivate the training type or reassign the courses to a different type.

**Q2: What happens to existing courses when I update a training type?**
A: Existing courses retain the original training type attributes captured at creation. They are not automatically updated. You must manually update each course if needed.

**Q3: Can I have multiple training types with the same name?**
A: No. Training type names must be unique to avoid confusion. However, you can have similar names with different codes.

**Q4: How do I reactivate an inactive training type?**
A: Click on the training type card, then click the "Activate" button. The training type will immediately become available for selection.

**Q5: Who can see inactive training types?**
A: Only Training Administrators and System Administrators can view inactive training types. Regular users see only active types.

**Q6: Can I change the training type code after creation?**
A: Yes, but with caution. If the training type is used in active courses, changing the code may cause reporting issues. The system will warn you before allowing the change.

**Q7: What's the difference between Duplicate and Edit?**
A: Edit modifies the existing training type. Duplicate creates a new training type with copied data, allowing you to quickly set up similar types.

**Q8: How far back does the audit trail go?**
A: The audit trail retains all changes indefinitely. System Administrators can access the complete history of any training type.

**Q9: Can I export the training types list?**
A: Yes. Click the "Export" button to download the list in Excel, PDF, or CSV format.

**Q10: What happens if I try to save without filling in required fields?**
A: The system will highlight missing fields in red and display error messages. You cannot save until all required fields are completed.

---

## Document Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | Oct 16, 2025 | Training Management System | Initial document creation |

---

## Document Approval

**Prepared By:** Training Management System Team
**Reviewed By:** [Name, Title]
**Approved By:** [Name, Title]
**Date:** October 16, 2025

---

**END OF DOCUMENT**
