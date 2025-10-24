# Functional Specification: Job Responsibilities List View Action Buttons

## Document Information
- **Component Name:** Job Responsibilities List View Component
- **Version:** 1.0
- **Date:** October 16, 2025
- **Status:** Approved
- **Author:** UI Design Team

---

## 1. Component Overview

### 1.1 Component Name
**Job Responsibilities Action Button Bar**

### 1.2 Purpose
The Job Responsibilities List View Component displays a grid of job responsibility cards, each containing essential information and a set of action buttons that allow users to perform operations on individual job records.

### 1.3 Location
- **Page:** Job Responsibilities (`/training/job-responsibilities`)
- **Section:** Main content area, below search/filter toolbar
- **Layout:** Responsive grid layout (auto-fill, minimum 350px per card)

---

## 2. List View Description

### 2.1 Card Layout Structure
Each job responsibility is displayed as a card containing:

**Header Section:**
- Job icon (dynamically assigned based on job title)
- Job title (h4 heading, bold)
- Status badge (Active/Inactive with color coding)
- Job code (color-coded tag)

**Content Section:**
- Job purpose summary (truncated text)
- Department information
- Reports To information

**Action Section:**
- Action button bar with 5 buttons (see section 3)

### 2.2 Visual Hierarchy
```
┌─────────────────────────────────────────┐
│ 💼 Quality Inspector          ✓ Active │
│    QC-101                               │
│ ─────────────────────────────────────── │
│ Ensure product quality meets...        │
│ Department: Quality Control             │
│ Reports To: Production Manager          │
│ ─────────────────────────────────────── │
│ [Edit][Duplicate][Deactivate][View][Del]│
└─────────────────────────────────────────┘
```

### 2.3 Card Behavior
- **Default State:** White background, light gray border (#e5e7eb)
- **Hover State:** Elevated shadow (0 4px 12px rgba(0,0,0,0.15))
- **Responsive:** Grid auto-adjusts to screen size
- **Minimum Width:** 350px per card
- **Gap:** 1.5rem between cards

---

## 3. Visible Action Buttons

### 3.1 Complete Button List
The following 5 action buttons are displayed on every job responsibility card:

#### 3.1.1 Edit Button
- **Icon:** ✏️
- **Label:** "Edit"
- **Color:** Blue (#3b82f6)
- **Function:** Opens edit form with pre-filled data
- **Position:** First button (leftmost)

#### 3.1.2 Duplicate Button
- **Icon:** 📋
- **Label:** "Duplicate"
- **Color:** Purple (#8b5cf6)
- **Function:** Creates a copy of the job with "(Copy)" suffix
- **Position:** Second button

#### 3.1.3 Deactivate/Activate Button
- **Icon:** ⏸️ (Deactivate) / ✓ (Activate)
- **Label:** "Deactivate" or "Activate" (dynamic)
- **Color:** 
  - Orange (#f59e0b) for Deactivate
  - Green (#10b981) for Activate
- **Function:** Toggles job status between Active and Inactive
- **Position:** Third button (center)

#### 3.1.4 View Button
- **Icon:** 👁
- **Label:** "View"
- **Color:** Cyan (#06b6d4)
- **Function:** Opens detailed modal with all job information
- **Position:** Fourth button

#### 3.1.5 Delete Button
- **Icon:** 🗑
- **Label:** "Delete"
- **Color:** Red (#ef4444)
- **Function:** Deletes job after confirmation dialog
- **Position:** Fifth button (rightmost)

### 3.2 Button Layout
- **Display:** Flex container with wrap
- **Flex Behavior:** `flex: 1 1 auto` (equal width, flexible)
- **Gap:** 0.5rem between buttons
- **Padding:** 0.5rem 0.75rem
- **Border Radius:** 6px
- **Font Size:** 0.75rem
- **Font Weight:** 600

---

## 4. Conditions for Display

### 4.1 Primary Display Condition
**Condition:** User is viewing the Job Responsibilities list view page

**Requirements:**
- User must be on `/training/job-responsibilities` route
- At least one job responsibility record exists in the system
- User must have successfully loaded the page

### 4.2 Button Visibility Matrix

| Button | Always Visible | Conditional | Notes |
|--------|---------------|-------------|-------|
| Edit | ✓ | - | Available for all records |
| Duplicate | ✓ | - | Available for all records |
| Deactivate/Activate | ✓ | Status-dependent | Label changes based on current status |
| View | ✓ | - | Available for all records |
| Delete | ✓ | - | Available for all records |

### 4.3 User Permissions and Roles

**Permission Level: Standard User (View/Edit Access)**
- ✓ Edit Button: Visible and functional
- ✓ Duplicate Button: Visible and functional
- ✓ Deactivate/Activate Button: Visible and functional
- ✓ View Button: Visible and functional
- ✓ Delete Button: Visible and functional

**Permission Level: Read-Only User** *(Future Implementation)*
- ✗ Edit Button: Hidden or disabled
- ✗ Duplicate Button: Hidden or disabled
- ✗ Deactivate/Activate Button: Hidden or disabled
- ✓ View Button: Visible and functional
- ✗ Delete Button: Hidden or disabled

**Permission Level: Administrator** *(Current Default)*
- ✓ All buttons: Visible and functional
- ✓ No restrictions

### 4.4 Empty State Behavior
**When No Records Exist:**
- Action buttons are NOT displayed
- Empty state message shown: "💼 No job responsibilities yet. Click 'Add Job Responsibility' to create your first one!"
- No cards rendered

**When Filtered Results Are Empty:**
- Action buttons are NOT displayed
- Filtered empty state message: "🔍 No job responsibilities match your filters"
- Filter reset available via Refresh button

---

## 5. Interaction Design Details

### 5.1 Hover States

#### 5.1.1 Card Hover
```css
Default: box-shadow: 0 1px 3px rgba(0,0,0,0.1)
Hover:   box-shadow: 0 4px 12px rgba(0,0,0,0.15)
Transition: all 0.2s ease
```

#### 5.1.2 Button Hover States

| Button | Default Color | Hover Color | Transition |
|--------|---------------|-------------|------------|
| Edit | #3b82f6 | #2563eb | 0.2s ease |
| Duplicate | #8b5cf6 | #7c3aed | 0.2s ease |
| Deactivate | #f59e0b | #d97706 | 0.2s ease |
| Activate | #10b981 | #059669 | 0.2s ease |
| View | #06b6d4 | #0891b2 | 0.2s ease |
| Delete | #ef4444 | #dc2626 | 0.2s ease |

#### 5.1.3 Visual Feedback
- **Cursor:** Changes to pointer on hover
- **Background:** Darkens slightly (see hover colors above)
- **Shadow:** Card elevation increases on hover
- **Animation:** Smooth 0.2s ease transition

### 5.2 Tooltip Descriptions

Each button includes a native HTML `title` attribute for accessibility:

| Button | Tooltip Text |
|--------|--------------|
| Edit | "Edit this job responsibility" |
| Duplicate | "Create a copy of this job" |
| Deactivate | "Deactivate this job" |
| Activate | "Activate this job" |
| View | "View full details" |
| Delete | "Delete this job responsibility" |

**Tooltip Behavior:**
- Appears after 0.5-1 second hover (browser default)
- Displays near cursor position
- Disappears on mouse leave
- Accessible via keyboard navigation

### 5.3 Focus States (Keyboard Navigation)

**Tab Order:**
1. Card becomes focusable container
2. Buttons within card follow left-to-right order:
   - Edit → Duplicate → Deactivate/Activate → View → Delete

**Focus Styling:**
```css
outline: 2px solid #3b82f6
outline-offset: 2px
```

**Keyboard Actions:**
- **Tab:** Move to next button
- **Shift+Tab:** Move to previous button
- **Enter/Space:** Activate button
- **Esc:** Close any open modals/forms

### 5.4 Click Actions & Confirmations

#### 5.4.1 Edit Button
- **Action:** Opens edit form
- **Confirmation:** None required
- **Result:** Form populated with existing data
- **User Feedback:** Form slides into view with animation

#### 5.4.2 Duplicate Button
- **Action:** Creates copy immediately
- **Confirmation:** None required
- **Result:** New card appears with "(Copy)" suffix in title
- **User Feedback:** Success (new record created)

#### 5.4.3 Deactivate/Activate Button
- **Action:** Toggles status
- **Confirmation:** None required
- **Result:** Status badge updates, button label changes
- **User Feedback:** Visual status change in real-time

#### 5.4.4 View Button
- **Action:** Opens modal overlay
- **Confirmation:** None required
- **Result:** Full-screen modal with all job details
- **User Feedback:** Modal fades in with backdrop

#### 5.4.5 Delete Button
- **Action:** Deletes record
- **Confirmation:** **REQUIRED** - Browser confirm dialog
- **Confirmation Message:** "Are you sure you want to delete this job responsibility?"
- **Result:** Card removed from list
- **User Feedback:** Card fades out, list re-flows

---

## 6. Responsive Behavior

### 6.1 Desktop View (≥1200px)
- **Grid Columns:** 3-4 cards per row
- **Button Layout:** Single row, 5 buttons
- **Button Text:** Full labels visible

### 6.2 Tablet View (768px - 1199px)
- **Grid Columns:** 2 cards per row
- **Button Layout:** May wrap to 2 rows (3+2 buttons)
- **Button Text:** Full labels visible

### 6.3 Mobile View (≤767px)
- **Grid Columns:** 1 card per row (full width)
- **Button Layout:** Wraps to multiple rows as needed
- **Button Text:** Full labels remain visible
- **Minimum Touch Target:** 44px height maintained

### 6.4 Button Wrapping Behavior
```css
display: flex
flex-wrap: wrap
gap: 0.5rem
```
- Buttons wrap naturally when card width insufficient
- Maintain equal width within same row (`flex: 1 1 auto`)
- Minimum button width ensures text readability

---

## 7. Accessibility Requirements

### 7.1 WCAG 2.1 Compliance

#### Level AA Requirements:
- ✓ **Color Contrast:** All button colors meet 4.5:1 contrast ratio
- ✓ **Keyboard Navigation:** All buttons accessible via keyboard
- ✓ **Focus Indicators:** Clear visible focus states
- ✓ **Touch Targets:** Minimum 44x44px on mobile
- ✓ **Text Alternatives:** Icons paired with text labels

#### Level AAA Goals:
- ✓ **Color Contrast:** Buttons exceed 7:1 ratio where possible
- ✓ **Tooltips:** Additional context for screen readers

### 7.2 Screen Reader Support

**Button Announcement Format:**
```
"Edit button, Edit this job responsibility"
"Duplicate button, Create a copy of this job"
"Deactivate button, Deactivate this job"
"View button, View full details"
"Delete button, Delete this job responsibility"
```

**ARIA Labels:**
```html
<button 
  aria-label="Edit Quality Inspector job"
  title="Edit this job responsibility"
>
  ✏️ Edit
</button>
```

### 7.3 Keyboard Shortcuts (Future Enhancement)

| Shortcut | Action |
|----------|--------|
| E | Edit focused card |
| D | Duplicate focused card |
| V | View focused card |
| Delete | Delete focused card (with confirmation) |
| Space | Toggle status of focused card |

---

## 8. Error Handling

### 8.1 Failed Actions

**Edit Action Failure:**
- Display error message: "Unable to load job data. Please try again."
- Log error to console
- Keep user on list view

**Duplicate Action Failure:**
- Display error message: "Failed to create duplicate. Please try again."
- Do not create partial record
- Log error to console

**Status Toggle Failure:**
- Display error message: "Failed to update status. Please try again."
- Revert visual status change
- Log error to console

**Delete Action Failure:**
- Display error message: "Failed to delete job. Please try again."
- Keep record in list
- Log error to console

### 8.2 Network Issues
- Show loading state for actions requiring server communication
- Timeout after 10 seconds
- Display user-friendly error message
- Provide retry option

---

## 9. Performance Considerations

### 9.1 Rendering Optimization
- **Virtual Scrolling:** Not required unless >500 records
- **Memoization:** Filter functions use useMemo hook
- **Event Handlers:** Inline handlers acceptable for <100 cards
- **Re-renders:** Minimize unnecessary re-renders via React.memo (future)

### 9.2 Button Performance
- **CSS Transitions:** Hardware-accelerated (transform, opacity)
- **Hover Effects:** Lightweight color changes only
- **Click Handlers:** Debounced for delete action (prevent double-click)

---

## 10. Testing Requirements

### 10.1 Functional Tests

**Test Case 1: Button Visibility**
- ✓ All 5 buttons display on every card
- ✓ Buttons appear in correct order
- ✓ Buttons have correct labels and icons

**Test Case 2: Edit Functionality**
- ✓ Click Edit opens form
- ✓ Form pre-fills with correct data
- ✓ Cancel returns to list view

**Test Case 3: Duplicate Functionality**
- ✓ Click Duplicate creates new record
- ✓ New record has "(Copy)" suffix
- ✓ All fields copied except ID
- ✓ New record appears in list

**Test Case 4: Status Toggle**
- ✓ Active job shows Deactivate button
- ✓ Inactive job shows Activate button
- ✓ Click toggles status correctly
- ✓ Badge updates immediately

**Test Case 5: View Functionality**
- ✓ Click View opens modal
- ✓ Modal shows all job fields
- ✓ Close modal returns to list
- ✓ Click backdrop closes modal

**Test Case 6: Delete Functionality**
- ✓ Click Delete shows confirmation
- ✓ Cancel keeps record
- ✓ Confirm removes record
- ✓ List updates correctly

### 10.2 Visual Regression Tests
- Compare screenshots across browsers
- Verify hover states
- Check responsive layouts
- Validate color contrast

### 10.3 Accessibility Tests
- Screen reader navigation
- Keyboard-only navigation
- Color blind mode testing
- High contrast mode compatibility

---

## 11. Browser Support

### 11.1 Supported Browsers

| Browser | Minimum Version | Notes |
|---------|----------------|-------|
| Chrome | 90+ | Full support |
| Firefox | 88+ | Full support |
| Safari | 14+ | Full support |
| Edge | 90+ | Full support |
| Opera | 76+ | Full support |

### 11.2 Mobile Browsers

| Browser | Minimum Version | Notes |
|---------|----------------|-------|
| Chrome Mobile | 90+ | Full support |
| Safari iOS | 14+ | Full support |
| Samsung Internet | 14+ | Full support |

---

## 12. Future Enhancements

### 12.1 Planned Features
- **Batch Actions:** Add checkbox selection for bulk operations (removed in current version)
- **Drag-and-Drop:** Reorder jobs via drag-and-drop
- **Quick Actions:** Right-click context menu
- **Custom Button Sets:** User-configurable button visibility
- **Role-Based Buttons:** Show/hide based on permissions

### 12.2 Accessibility Improvements
- Keyboard shortcuts for common actions
- Enhanced ARIA live regions for status updates
- Voice command integration
- High contrast theme support

---

## 13. Implementation Notes

### 13.1 Technical Stack
- **Framework:** React 18.2.0 with Next.js 14.0.0
- **State Management:** React Context API (AppContext)
- **Styling:** Inline styles (CSS-in-JS)
- **Icons:** Unicode emoji characters

### 13.2 Key Components
```javascript
// Button component structure
<button 
  onClick={actionHandler}
  title="Tooltip text"
  style={{ ...buttonStyles }}
  onMouseEnter={hoverHandler}
  onMouseLeave={unhoverHandler}
>
  {icon} {label}
</button>
```

### 13.3 State Management
- No checkbox selection state required
- No bulk action state required
- Individual card hover states managed locally
- Modal state (`viewingJob`) managed at page level

---

## 14. Design Tokens

### 14.1 Colors

**Button Colors:**
```javascript
{
  edit: { bg: '#3b82f6', hover: '#2563eb' },
  duplicate: { bg: '#8b5cf6', hover: '#7c3aed' },
  deactivate: { bg: '#f59e0b', hover: '#d97706' },
  activate: { bg: '#10b981', hover: '#059669' },
  view: { bg: '#06b6d4', hover: '#0891b2' },
  delete: { bg: '#ef4444', hover: '#dc2626' }
}
```

**Status Colors:**
```javascript
{
  active: { bg: '#d1fae5', text: '#065f46' },
  inactive: { bg: '#fee2e2', text: '#991b1b' }
}
```

### 14.2 Typography
```javascript
{
  buttonFont: '0.75rem',
  buttonWeight: 600,
  jobTitleFont: '1.1rem',
  jobTitleWeight: 700
}
```

### 14.3 Spacing
```javascript
{
  buttonPadding: '0.5rem 0.75rem',
  buttonGap: '0.5rem',
  cardPadding: '1.5rem',
  cardGap: '1.5rem'
}
```

---

## 15. Sign-Off

**Approved By:**
- UI/UX Design Team: ✓
- Development Team: ✓
- QA Team: ✓
- Product Owner: ✓

**Date Approved:** October 16, 2025

**Next Review Date:** January 16, 2026

---

**Document Version:** 1.0  
**Last Updated:** October 16, 2025  
**Status:** ✅ Production Ready
