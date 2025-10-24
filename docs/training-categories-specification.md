# Training Categories - Detailed Specification

## Overview
This document provides a comprehensive structure for training categories management, including all data fields, functionalities, and user interface elements required for effective training program organization.

---

## 📋 Training Category Data Fields

### Core Information Fields

| Field Name | Field Type | Required | Description |
|------------|-----------|----------|-------------|
| **Training Category Name** | Text | ✓ Mandatory | Full name of the training category |
| **Training Category Code / ID** | Alphanumeric | ✓ Mandatory | Unique identifier for the category (auto-generated or manual) |
| **Description of the Category** | Text Area | ✓ Mandatory | Detailed explanation of the category scope and purpose |
| **Department / Function** | Dropdown | ✓ Mandatory | Associated department or business function |
| **Training Type** | Dropdown | ✓ Mandatory | Type of training (e.g., Technical, Soft Skills, Compliance, Safety) |
| **Validity Period** | Date Range | Optional | Duration for which the category remains active |
| **Compliance Requirement** | Toggle/Checkbox | Optional | Indicates if training is mandatory for compliance |
| **Created By / Date** | System Generated | Auto | Username and timestamp of creation |
| **Last Updated By / Date** | System Generated | Auto | Username and timestamp of last modification |
| **Status (Active/Inactive)** | Toggle | ✓ Mandatory | Current operational status of the category |

---

## 🎯 Button Specifications

### 1. Core Management Buttons

#### ➕ Add Category
- **Button Label:** Add Category / New Category / Create Category
- **Purpose:** Opens a form to create a new training category with all required fields
- **Icon:** `➕` Plus icon / Add icon
- **Action Type:** Primary Action
- **Placement:** Top-right of category list page
- **Behavior:** Opens modal or navigates to creation form

#### ✏️ Edit
- **Button Label:** Edit / Modify
- **Purpose:** Modify existing category details including all editable fields
- **Icon:** `✏️` Pencil icon / Edit icon
- **Action Type:** Secondary Action
- **Placement:** Inline with each category row or detail page
- **Behavior:** Opens populated form with current category data

#### 🗑️ Delete
- **Button Label:** Delete / Remove
- **Purpose:** Permanently remove a training category from the system
- **Icon:** `🗑️` Trash icon / Delete icon
- **Action Type:** Destructive Action
- **Placement:** Inline with each category row or detail page
- **Behavior:** Shows confirmation dialog before deletion

#### 💾 Save
- **Button Label:** Save / Save Changes
- **Purpose:** Commit changes made to category data
- **Icon:** `💾` Disk icon / Check icon
- **Action Type:** Primary Action
- **Placement:** Bottom of edit/create forms
- **Behavior:** Validates data and saves to database

#### ❌ Cancel
- **Button Label:** Cancel / Discard
- **Purpose:** Exit edit/create mode without saving changes
- **Icon:** `❌` X icon / Close icon
- **Action Type:** Secondary Action
- **Placement:** Bottom of edit/create forms, adjacent to Save
- **Behavior:** Returns to previous view, may show confirmation if changes exist

---

### 2. Navigation & Utility Buttons

#### 🔍 Search / Filter
- **Button Label:** Search / Filter / Find
- **Purpose:** Find categories by keyword, department, type, status, or other criteria
- **Icon:** `🔍` Magnifying glass icon
- **Action Type:** Utility Action
- **Placement:** Top of category list page
- **Behavior:** Opens search panel or filters results in real-time

#### 🔄 Refresh
- **Button Label:** Refresh / Reload
- **Purpose:** Update the category list with latest data from the database
- **Icon:** `🔄` Circular arrows icon
- **Action Type:** Utility Action
- **Placement:** Top toolbar
- **Behavior:** Reloads current view without page refresh

#### 📊 Export
- **Button Label:** Export / Download
- **Purpose:** Export category data to external formats (Excel, CSV, PDF)
- **Icon:** `📊` Download icon / Export icon
- **Action Type:** Utility Action
- **Placement:** Top toolbar
- **Behavior:** Opens export options dialog or initiates download

#### 📥 Import
- **Button Label:** Import / Upload
- **Purpose:** Bulk upload categories from external files
- **Icon:** `📥` Upload icon / Import icon
- **Action Type:** Utility Action
- **Placement:** Top toolbar
- **Behavior:** Opens file selection dialog with format validation

#### 👁️ View Details
- **Button Label:** View / Details / More Info
- **Purpose:** Display comprehensive information about a specific category
- **Icon:** `👁️` Eye icon / Info icon
- **Action Type:** Secondary Action
- **Placement:** Inline with each category row
- **Behavior:** Opens detailed view panel or navigates to detail page

---

### 3. Status & Configuration Buttons

#### 🔘 Activate / Deactivate
- **Button Label:** Activate / Deactivate / Toggle Status
- **Purpose:** Change the operational status of a category between active and inactive
- **Icon:** `🔘` Toggle switch / Power icon
- **Action Type:** Status Change
- **Placement:** Inline with each category or detail page
- **Behavior:** Updates status with optional confirmation

#### ⚙️ Settings / Configure
- **Button Label:** Settings / Configure / Options
- **Purpose:** Access advanced configuration options for categories
- **Icon:** `⚙️` Gear icon / Settings icon
- **Action Type:** Configuration Action
- **Placement:** Top toolbar or detail page
- **Behavior:** Opens settings panel

#### 📋 Duplicate
- **Button Label:** Duplicate / Clone / Copy
- **Purpose:** Create a copy of an existing category with similar attributes
- **Icon:** `📋` Copy icon / Duplicate icon
- **Action Type:** Secondary Action
- **Placement:** Inline with each category or detail page
- **Behavior:** Opens create form with pre-filled data from source category

---

### 4. Advanced Options

#### 🔗 Link Courses
- **Button Label:** Link Courses / Associate Courses / Manage Courses
- **Purpose:** Connect training courses to the category
- **Icon:** `🔗` Link icon / Chain icon
- **Action Type:** Relationship Management
- **Placement:** Detail page or inline action
- **Behavior:** Opens course selection interface

#### 📈 View Analytics
- **Button Label:** Analytics / Reports / Statistics
- **Purpose:** Display usage statistics and analytics for the category
- **Icon:** `📈` Chart icon / Analytics icon
- **Action Type:** Reporting Action
- **Placement:** Detail page or toolbar
- **Behavior:** Opens analytics dashboard

#### 🕐 History / Audit Log
- **Button Label:** History / Audit Trail / Change Log
- **Purpose:** View complete change history and audit trail for the category
- **Icon:** `🕐` Clock icon / History icon
- **Action Type:** Audit Action
- **Placement:** Detail page
- **Behavior:** Opens chronological log of all changes

#### ↕️ Sort
- **Button Label:** Sort / Order By
- **Purpose:** Arrange categories by different criteria (name, date, department, etc.)
- **Icon:** `↕️` Sort icon / Arrows icon
- **Action Type:** Utility Action
- **Placement:** Column headers or toolbar
- **Behavior:** Toggles sort order (ascending/descending)

#### 🔔 Set Reminders
- **Button Label:** Set Reminder / Configure Alerts
- **Purpose:** Configure notifications related to category activities
- **Icon:** `🔔` Bell icon / Notification icon
- **Action Type:** Configuration Action
- **Placement:** Detail page or settings
- **Behavior:** Opens reminder configuration dialog

#### ✅ Bulk Actions
- **Button Label:** Bulk Actions / Multi-Select Actions
- **Purpose:** Perform actions on multiple categories simultaneously
- **Icon:** `✅` Checkmark icon / Select icon
- **Action Type:** Batch Operation
- **Placement:** Top toolbar (enabled when items are selected)
- **Behavior:** Shows available bulk operations menu

---

## 🎨 User Interface Layout Recommendations

### List View Layout
```
┌─────────────────────────────────────────────────────────────┐
│  Training Categories                    🔍 Search  ➕ Add    │
│  ───────────────────────────────────────────────────────────│
│  Filters: [Department ▼] [Type ▼] [Status ▼]  🔄 📊 📥      │
│  ───────────────────────────────────────────────────────────│
│  ☐ Category Name     │ Code  │ Dept    │ Type   │ Status │ │
│  ───────────────────────────────────────────────────────────│
│  ☐ Technical Skills  │ TS001 │ IT      │ Tech   │ Active │✏️│
│  ☐ Safety Training   │ SF002 │ Ops     │ Safety │ Active │✏️│
│  ☐ Compliance        │ CM003 │ Legal   │ Comp   │ Active │✏️│
└─────────────────────────────────────────────────────────────┘
```

### Detail View Layout
```
┌─────────────────────────────────────────────────────────────┐
│  ← Back                Training Category Details             │
│  ───────────────────────────────────────────────────────────│
│                                                               │
│  Category Name: Technical Skills Training                    │
│  Category Code: TS001                                        │
│  Status: ● Active                                            │
│                                                               │
│  Description: Comprehensive technical training programs...   │
│                                                               │
│  Department: Information Technology                          │
│  Training Type: Technical                                    │
│  Compliance: ☑ Yes                                           │
│  Validity: Jan 1, 2025 - Dec 31, 2025                       │
│                                                               │
│  Created By: John Doe | Jan 15, 2025                        │
│  Last Updated: Jane Smith | Oct 10, 2025                    │
│                                                               │
│  [✏️ Edit] [🗑️ Delete] [📋 Duplicate] [🔗 Link Courses]    │
│  [📈 Analytics] [🕐 History]                                 │
└─────────────────────────────────────────────────────────────┘
```

### Create/Edit Form Layout
```
┌─────────────────────────────────────────────────────────────┐
│  Add New Training Category                          ❌ Close  │
│  ───────────────────────────────────────────────────────────│
│                                                               │
│  *Category Name: [________________________]                  │
│                                                               │
│  *Category Code: [________________________]                  │
│                                                               │
│  *Description:                                               │
│  [____________________________________________]              │
│  [____________________________________________]              │
│                                                               │
│  *Department: [Select Department ▼]                          │
│                                                               │
│  *Training Type: [Select Type ▼]                             │
│                                                               │
│  Validity Period:                                            │
│  From: [Select Date] To: [Select Date]                      │
│                                                               │
│  Compliance Requirement: ☐ Mandatory                         │
│                                                               │
│  Status: ● Active  ○ Inactive                                │
│                                                               │
│  * Required fields                                           │
│                                                               │
│                            [❌ Cancel] [💾 Save Category]    │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔒 Validation Rules

### Mandatory Field Validation
- **Category Name:** Required, 3-100 characters, alphanumeric with spaces
- **Category Code:** Required, unique, 3-20 characters, alphanumeric
- **Description:** Required, 10-500 characters
- **Department:** Required, must select from predefined list
- **Training Type:** Required, must select from predefined list
- **Status:** Required, default to Active

### Optional Field Validation
- **Validity Period:** End date must be after start date
- **Compliance Requirement:** Boolean value
- **System Fields:** Auto-generated, non-editable

---

## 📱 Responsive Design Considerations

### Desktop View (>1024px)
- Full table layout with all columns visible
- All buttons displayed with labels and icons
- Side-by-side form fields

### Tablet View (768px - 1024px)
- Condensed table with priority columns
- Icon-only buttons with tooltips
- Stacked form fields

### Mobile View (<768px)
- Card-based layout instead of table
- Hamburger menu for actions
- Full-width form fields
- Bottom sheet for filters

---

## 🎯 Best Practices & Guidelines

### User Experience
1. **Clear Visual Hierarchy:** Use consistent spacing and typography
2. **Immediate Feedback:** Show success/error messages for all actions
3. **Confirmation Dialogs:** Required for destructive actions (delete, deactivate)
4. **Loading States:** Display spinners during data operations
5. **Empty States:** Provide helpful guidance when no categories exist

### Accessibility
1. **Keyboard Navigation:** All buttons accessible via keyboard
2. **Screen Reader Support:** Proper ARIA labels for all interactive elements
3. **Color Contrast:** Maintain WCAG AA standards
4. **Focus Indicators:** Clear visual focus states
5. **Error Announcements:** Accessible error messaging

### Performance
1. **Pagination:** Limit displayed results (25-50 per page)
2. **Lazy Loading:** Load details on demand
3. **Debounced Search:** Prevent excessive API calls
4. **Caching:** Cache frequently accessed data

---

## 📚 Related Documentation
- Training Courses Management Specification
- User Role & Permissions Matrix
- Assessment Management Guidelines
- Reporting & Analytics Framework

---

**Document Version:** 1.0  
**Last Updated:** October 16, 2025  
**Prepared By:** Instructional Design Team  
**Review Status:** Ready for Implementation
