# Training Types - Complete User Guide

## 📋 Overview
Training Types define **how training is delivered** (the delivery method). This helps you plan and track different training approaches.

**Examples:** Instructor-led, Self-paced, Webinar, On-the-job

---

## ✨ **ALL FEATURES & HOW TO USE THEM**

---

## 1️⃣ **CREATE NEW TRAINING TYPE**

### Step-by-Step Guide:

1. **Click "+ Add New Training Type" button** (top right)
2. **Fill in Required Fields:**

   #### ✅ **Training Type Name*** (Required)
   - Enter the name of the training delivery method
   - Examples: "Instructor-led", "Self-paced", "Webinar", "On-the-job"
   - Must not be empty

   #### ✅ **Code*** (Required)
   - Enter a unique identifier (will be converted to uppercase)
   - Examples: "ILT", "SP", "WEB", "OJT"
   - Must not be empty

   #### ✅ **Description*** (Required)
   - Enter a detailed description
   - Example: "Classroom training with an instructor present"
   - Must not be empty

   #### ✅ **Delivery Mode*** (Required)
   - **Select from dropdown:** Online OR Offline
   - This field is MANDATORY
   - Online: Internet-based training
   - Offline: In-person training

   #### ✅ **Duration*** (Required)
   - Enter a number (e.g., 2, 4, 8)
   - This is MANDATORY
   - Represents the typical length of this type of training

   #### ✅ **Duration Unit*** (Required)
   - Select: Hours, Days, Weeks, or Months
   - Default is "Hours"

   #### 🔧 **Eligibility / Applicable Roles** (Optional)
   - Select which roles this training type is suitable for
   - Options: All Employees, Management Level, New Hires, Senior Staff, Junior Staff
   - You can select multiple roles
   - **This is now OPTIONAL** - you can skip it

   #### 🎯 **Status*** (Required)
   - Choose: Active ✓ or Inactive ✗
   - Default is "Active"

3. **Click "📋 Create Training Type" button**

### Common Errors:
- ❌ "Training Type Name and Code are required!" → Fill in both name and code
- ❌ "Delivery Mode and Duration are required!" → Select delivery mode AND enter duration
- ❌ "Description is required!" → Enter a description

---

## 2️⃣ **VIEW ALL TRAINING TYPES**

### Features:

#### 📊 **Statistics Dashboard**
At the top, you'll see three cards:
- **Total Training Types** - Total count (blue)
- **Active Types** - Currently active (green)
- **Inactive Types** - Deactivated types (red)

#### 🔍 **Search & Filter Bar**
- **Search Box** - Type keywords to search by name, code, or description
- **Delivery Mode Filter** - Filter by All Modes, Online, or Offline
- **Status Filter** - Filter by All, Active, or Inactive
- **Sort By** - Sort by Name, Code, or Duration

#### 📇 **Training Type Cards**
Each card shows:
- **Type Icon** - Visual indicator for delivery mode
- **Name & Code** - Training type identification
- **Description** - Brief description
- **Delivery Mode** - Badge showing Online/Offline
- **Duration** - Length with unit
- **Status** - Active (green) or Inactive (red)
- **Eligible Roles** - If assigned
- **Action Buttons** - Quick actions on hover

---

## 3️⃣ **VIEW DETAILS** (Click-to-Show Pattern)

### How to Use:
1. **Click anywhere on a Training Type card**
2. The card expands to show full details

### Expanded View Shows:
- ✅ Full description
- ✅ Delivery mode with icon
- ✅ Duration value and unit
- ✅ Eligible roles (if any)
- ✅ Audit information (Created by, Updated by)
- ✅ Action buttons (Edit, Toggle Status, Delete)

### To Collapse:
- **Click the card again** to minimize

---

## 4️⃣ **EDIT TRAINING TYPE**

### Method 1: From Expanded Card
1. Click on a Training Type card to expand
2. Click the "✏️ Edit" button
3. Modal popup opens with current data
4. Modify any fields
5. Click "💾 Save Changes"

### Method 2: Direct Edit Button
1. Hover over a Training Type card
2. Click the "✏️" (Edit) button in the top right
3. Modal opens
4. Make changes
5. Save

### What You Can Edit:
- ✅ Name
- ✅ Code
- ✅ Description
- ✅ Delivery Mode
- ✅ Duration Value
- ✅ Duration Unit
- ✅ Eligible Roles
- ✅ Status

---

## 5️⃣ **DELETE TRAINING TYPE**

### How to Delete:
1. Expand the Training Type card (click on it)
2. Click the "🗑️ Delete" button (red button)
3. **Confirm deletion** when prompted

### Important Notes:
- ⚠️ Deletion is permanent
- ⚠️ Consider using "Deactivate" instead (toggle status)
- ⚠️ Deleted types cannot be recovered

---

## 6️⃣ **ACTIVATE / DEACTIVATE**

### How to Toggle Status:

#### Method 1: From Expanded Card
1. Click on Training Type to expand
2. Click "Toggle Status" button
3. Status changes immediately
   - Active → Inactive (turns red)
   - Inactive → Active (turns green)

#### Method 2: Quick Toggle
1. Hover over Training Type card
2. Click the status button in top right
3. Status toggles instantly

### Use Cases:
- 📌 **Deactivate** - Temporarily disable without deleting
- 📌 **Activate** - Re-enable a previously disabled type
- 📌 **Filtering** - Use status filter to view only active/inactive

---

## 7️⃣ **SEARCH FUNCTIONALITY**

### How to Search:
1. Type in the **Search box** at the top
2. Results filter in real-time
3. Search looks in: Name, Code, Description

### Search Tips:
- 🔍 Case-insensitive (works with any case)
- 🔍 Partial matches work (e.g., "inst" finds "Instructor-led")
- 🔍 Searches across all text fields
- 🔍 Clear search box to see all types again

---

## 8️⃣ **FILTER BY DELIVERY MODE**

### How to Filter:
1. Click **Delivery Mode** dropdown
2. Select:
   - **All Modes** - Show everything
   - **Online** - Show only online training types
   - **Offline** - Show only offline training types

### Result:
- Cards filter instantly
- Statistics update to match filtered results
- Combine with other filters for precise results

---

## 9️⃣ **FILTER BY STATUS**

### How to Filter:
1. Click **Status** dropdown
2. Select:
   - **All** - Show both active and inactive
   - **Active** - Show only active types
   - **Inactive** - Show only deactivated types

### Result:
- Immediate filtering
- Statistics update accordingly
- Useful for cleanup and maintenance

---

## 🔟 **SORT TRAINING TYPES**

### How to Sort:
1. Click **Sort By** dropdown
2. Select:
   - **Name** - Alphabetical by name
   - **Code** - Alphabetical by code
   - **Duration** - Numerical by duration value

### Result:
- List reorders instantly
- Maintains current filters
- Helps find types quickly

---

## 1️⃣1️⃣ **COMBINE FILTERS**

### Advanced Filtering:
You can combine multiple filters at once:

**Example 1:** Find active online training types
- Status: Active
- Delivery Mode: Online
- Result: Only active online types shown

**Example 2:** Search for "instructor" types that are offline
- Search: "instructor"
- Delivery Mode: Offline
- Result: Offline instructor-based training only

**Example 3:** Sort inactive types by duration
- Status: Inactive
- Sort By: Duration
- Result: All inactive types sorted by length

---

## 1️⃣2️⃣ **VIEW STATISTICS**

### Dashboard Metrics:

#### Total Training Types
- Shows total count
- Updates in real-time
- Blue color indicator

#### Active Types
- Shows count of active types
- Green color (positive)
- Quickly see available options

#### Inactive Types
- Shows deactivated count
- Red color (warning)
- Useful for cleanup

### When Statistics Update:
- ✅ After creating new type
- ✅ After deleting type
- ✅ After toggling status
- ✅ When filters are applied (filtered count shown)

---

## 1️⃣3️⃣ **AUDIT INFORMATION**

### What's Tracked:
Each Training Type stores:

#### Created Information
- **Created By** - Who created it (e.g., "Admin User")
- **Created Date** - When it was created (formatted date)

#### Update Information
- **Last Updated By** - Who made the last change
- **Last Updated Date** - When it was last modified

### Where to View:
- Expand a Training Type card
- Scroll to the bottom
- Look for "📋 Audit Information" section

### Use Cases:
- 👤 Track who created what
- 📅 See when types were added
- 🔍 Audit changes for compliance
- 📊 Understand data history

---

## 1️⃣4️⃣ **ELIGIBLE ROLES ASSIGNMENT**

### How to Assign Roles:
1. When creating or editing a Training Type
2. Scroll to "Eligibility / Applicable Roles"
3. Check the boxes for applicable roles:
   - ☑️ All Employees
   - ☑️ Management Level
   - ☑️ New Hires
   - ☑️ Senior Staff
   - ☑️ Junior Staff

### Important:
- ✅ **This is now OPTIONAL** (no asterisk)
- ✅ You can select multiple roles
- ✅ Selection counter shows "X selected"
- ✅ Can be left empty (no validation error)

### Use Cases:
- 🎯 Restrict certain training types to specific roles
- 🎯 Indicate which roles typically use this type
- 🎯 Filter training options by role eligibility

---

## 1️⃣5️⃣ **CLICK-TO-SHOW PATTERN**

### How It Works:
The interface uses a space-saving design:

#### Collapsed State (Default)
- Shows summary information
- Compact card view
- List multiple types efficiently

#### Expanded State (On Click)
- Click any card to expand
- Shows full details
- Action buttons appear
- Click again to collapse

### Benefits:
- 💡 Save screen space
- 💡 Show only what you need
- 💡 Quick overview of all types
- 💡 Detailed view on demand

---

## 1️⃣6️⃣ **RESPONSIVE DESIGN**

### Works On:
- 💻 **Desktop** - Full-featured interface
- 📱 **Tablet** - Optimized layout
- 📱 **Mobile** - Touch-friendly controls

### Features:
- ✅ Grid adapts to screen size
- ✅ Touch-friendly buttons
- ✅ Mobile-optimized modals
- ✅ Scrollable lists

---

## 1️⃣7️⃣ **KEYBOARD NAVIGATION**

### Keyboard Shortcuts:
- **Tab** - Move between fields
- **Enter** - Submit form / Confirm action
- **Escape** - Close modal / Cancel
- **Space** - Toggle checkboxes

### Accessibility:
- ✅ Full keyboard support
- ✅ Focus indicators visible
- ✅ Screen reader friendly
- ✅ Logical tab order

---

## 🎯 **COMMON USE CASES**

### Use Case 1: Create Standard Training Types
**Goal:** Set up basic training delivery methods

**Steps:**
1. Create "Instructor-led" (Offline, 8 Hours)
2. Create "Self-paced" (Online, 4 Hours)
3. Create "Webinar" (Online, 2 Hours)
4. Create "On-the-job" (Offline, 40 Hours)

**Result:** Basic training types ready for course assignment

---

### Use Case 2: Filter Active Online Training
**Goal:** See only currently available online training options

**Steps:**
1. Status Filter: Select "Active"
2. Delivery Mode: Select "Online"
3. Review filtered list

**Result:** Only active online training types shown

---

### Use Case 3: Temporarily Disable a Training Type
**Goal:** Stop using a type without deleting it

**Steps:**
1. Find the Training Type
2. Click to expand
3. Click "Toggle Status"
4. Status changes to "Inactive"

**Result:** Type is preserved but not actively used

---

### Use Case 4: Update Training Duration
**Goal:** Change the typical length of a training type

**Steps:**
1. Click the Training Type card
2. Click "Edit" button
3. Change "Duration Value" (e.g., 4 → 8)
4. Optionally change "Duration Unit"
5. Click "Save Changes"

**Result:** Duration updated for future reference

---

### Use Case 5: Search and Sort
**Goal:** Find a specific type quickly

**Steps:**
1. Use search box to narrow down (e.g., "web")
2. Use sort to organize (e.g., by Duration)
3. Click to view details

**Result:** Quick access to needed information

---

## 🎨 **VISUAL INDICATORS**

### Color Coding:
- 🟢 **Green** - Active status, positive actions
- 🔴 **Red** - Inactive status, delete actions
- 🔵 **Blue** - Primary buttons, statistics
- ⚪ **Gray** - Neutral, inactive elements
- 🟡 **Yellow/Orange** - Warnings, important info

### Icons:
- 🎓 **Graduation Cap** - Education/Training
- 💻 **Computer** - Online delivery
- 🏢 **Building** - Offline/In-person
- ✏️ **Pencil** - Edit action
- 🗑️ **Trash** - Delete action
- 👁️ **Eye** - View details
- 🔄 **Arrows** - Toggle/Switch status

---

## 📊 **BEST PRACTICES**

### Naming Conventions:
✅ **Good Examples:**
- "Instructor-led Training"
- "Self-Paced Online"
- "Live Webinar"
- "Hands-On Workshop"

❌ **Avoid:**
- Vague names like "Type 1", "Training A"
- Overly long names
- Special characters in codes

### Code Recommendations:
✅ **Good Examples:**
- "ILT" (Instructor-Led Training)
- "SP" (Self-Paced)
- "WEB" (Webinar)
- "OJT" (On-the-Job Training)

❌ **Avoid:**
- Codes longer than 5 characters
- Spaces in codes
- Duplicate codes

### Duration Guidelines:
- **Hours** - For short sessions (1-8 hours)
- **Days** - For multi-day courses (1-5 days)
- **Weeks** - For extended programs (1-12 weeks)
- **Months** - For long-term training (1-6 months)

---

## ⚠️ **TROUBLESHOOTING**

### Error: "Delivery Mode and Duration are required!"
**Problem:** You didn't select delivery mode or enter duration

**Solution:**
1. Click the **Delivery Mode** dropdown
2. Select either "Online" or "Offline"
3. Enter a number in the **Duration Value** field
4. Try submitting again

---

### Error: "Training Type Name and Code are required!"
**Problem:** Name or code field is empty

**Solution:**
1. Enter text in **Training Type Name** field
2. Enter text in **Code** field
3. Both fields must have content
4. Try submitting again

---

### Error: "Description is required!"
**Problem:** Description field is empty

**Solution:**
1. Enter a description in the **Description** field
2. Must be meaningful text (not just spaces)
3. Try submitting again

---

### Issue: Can't see all training types
**Problem:** Filters are applied

**Solution:**
1. Check **Search** box - clear if has text
2. Set **Delivery Mode** to "All Modes"
3. Set **Status** to "All"
4. All types should now be visible

---

### Issue: Card won't expand
**Problem:** Click-to-show not working

**Solution:**
1. Make sure you're clicking on the card body (not buttons)
2. Avoid clicking on action buttons
3. Try clicking the card header area
4. Refresh page if issue persists

---

## 📝 **FIELD REFERENCE**

### Complete Field List:

| Field Name | Type | Required | Description |
|------------|------|----------|-------------|
| Training Type Name | Text | ✅ Yes | Name of the delivery method |
| Code | Text | ✅ Yes | Unique identifier (uppercase) |
| Description | Textarea | ✅ Yes | Detailed explanation |
| Delivery Mode | Dropdown | ✅ Yes | Online or Offline |
| Duration Value | Number | ✅ Yes | Numeric duration |
| Duration Unit | Dropdown | ✅ Yes | Hours/Days/Weeks/Months |
| Eligible Roles | Checkboxes | ❌ No | Optional role assignments |
| Status | Radio | ✅ Yes | Active or Inactive |

---

## 🎓 **TRAINING TYPE EXAMPLES**

### Example 1: Instructor-Led Training
```
Name: Instructor-Led Training
Code: ILT
Description: Traditional classroom training with an instructor present to guide learning
Delivery Mode: Offline
Duration: 8 Hours
Eligible Roles: All Employees, New Hires
Status: Active
```

### Example 2: Self-Paced Learning
```
Name: Self-Paced Online Learning
Code: SP
Description: Independent online learning that employees complete at their own pace
Delivery Mode: Online
Duration: 4 Hours
Eligible Roles: All Employees
Status: Active
```

### Example 3: Live Webinar
```
Name: Live Webinar Session
Code: WEB
Description: Interactive online session with live instructor and Q&A
Delivery Mode: Online
Duration: 2 Hours
Eligible Roles: All Employees, Management Level
Status: Active
```

### Example 4: On-the-Job Training
```
Name: On-the-Job Training
Code: OJT
Description: Hands-on practical training in the actual work environment
Delivery Mode: Offline
Duration: 5 Days
Eligible Roles: New Hires, Junior Staff
Status: Active
```

---

## 🔗 **INTEGRATION WITH COURSES**

### How Training Types Connect to Courses:

When creating a course in **Course Management**, you can:
1. Select **multiple Training Types** for that course
2. Use checkboxes to select all applicable delivery methods
3. A course can have multiple types (e.g., both "Instructor-led" and "Self-paced")

### Benefits:
- 📊 Track how courses are delivered
- 🎯 Filter courses by delivery method
- 📈 Analyze training type effectiveness
- 🔄 Support blended learning approaches

---

## 💡 **PRO TIPS**

### Tip 1: Start with Common Types
Create these basic types first:
- Instructor-Led (Offline)
- Self-Paced (Online)
- Webinar (Online)
- Workshop (Offline)

### Tip 2: Use Consistent Naming
Keep names descriptive and consistent across your organization.

### Tip 3: Review Inactive Types
Periodically review inactive types and delete if no longer needed.

### Tip 4: Use Filters for Reporting
Combine filters to generate quick reports (e.g., all active online types).

### Tip 5: Document Eligible Roles
Assign roles when creating types to help with course planning.

### Tip 6: Keep Codes Short
Use 2-5 character codes for easy reference.

### Tip 7: Update Durations
Review and update typical durations as training evolves.

### Tip 8: Deactivate Before Deleting
Use inactive status first - you can always delete later if needed.

---

## 📞 **SUPPORT**

### Need Help?
- 📖 Review this guide
- 🔍 Use search to find specific topics
- 💡 Check examples for reference
- ⚙️ Try different filters and combinations

### Common Questions:

**Q: Can I have duplicate names?**
A: Yes, but use unique codes to differentiate.

**Q: Can I change a code after creation?**
A: Yes, edit the Training Type and change the code.

**Q: What happens if I delete a type used in courses?**
A: The type reference remains in courses but won't appear in selection lists.

**Q: Can I export training types?**
A: Export functionality can be added if needed.

**Q: Is there a limit on training types?**
A: No practical limit - create as many as needed.

---

## ✅ **QUICK START CHECKLIST**

### Getting Started:
- [ ] Click "+ Add New Training Type"
- [ ] Enter Training Type Name
- [ ] Enter Code
- [ ] Write Description
- [ ] Select Delivery Mode (Online/Offline)
- [ ] Enter Duration Value
- [ ] Select Duration Unit
- [ ] Optionally select Eligible Roles
- [ ] Keep Status as "Active"
- [ ] Click "Create Training Type"
- [ ] Verify type appears in list

### You're Done! 🎉

Now you can:
- Create more training types
- Edit existing types
- Search and filter
- Use types when creating courses

---

**Last Updated:** October 17, 2025
**Version:** 1.0.0
**Page:** Training Types Management
