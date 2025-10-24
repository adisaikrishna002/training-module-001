# Site/Location Mapping - User Guide

## 🎯 Purpose
Link training courses to specific physical locations (plants, offices, labs) with automatic capacity validation to prevent overbooking.

---

## 🚀 Quick Start

### Step 1: Open Course Creation Form
1. Navigate to **Training → Courses**
2. Click **➕ Add New Course** button
3. Fill in basic course information (Code, Title, Description, etc.)

### Step 2: Expand Site Mapping Section
1. Scroll to **🏢 Site / Location Mapping** section
2. Click to expand the section
3. You'll see a list of all available training sites

### Step 3: Select Training Sites
1. Review available sites with their capacity information:
   - **Site Name & Code**
   - **Current Enrollment** (how many are already enrolled)
   - **Total Capacity** (maximum allowed)
   - **Available Slots** (remaining space)
   - **Trainer** assigned to that site

2. Click the **checkbox** or **site card** to select a site
3. Selected sites will appear in the "Selected Sites" section below

### Step 4: Enter Participant Count
For each selected site:
1. Enter the **number of participants** you plan to enroll
2. Choose **Training Applicability**:
   - Mandatory (required for all)
   - Optional (trainee can choose)
   - Recommended (suggested but not required)

3. Watch the **capacity indicator**:
   - 🟢 **Green**: Safe - plenty of space
   - 🟡 **Yellow**: Near capacity (75-90% full)
   - 🔴 **Red**: Over capacity - **CANNOT SAVE**

### Step 5: Validate Capacity
1. Click **🔢 Check Total Capacity** button
2. System will validate all selected sites
3. Alert will show:
   - ✓ Sites that are within capacity
   - ⚠️ Sites that exceed capacity

### Step 6: Save Course
1. Click **Add Course** button
2. If any site exceeds capacity:
   - **Save will be blocked**
   - Alert will show which sites have issues
   - Adjust participant counts and try again
3. If all sites are valid:
   - Course will be saved successfully
   - Site mappings will be stored with the course

---

## 📊 Understanding Capacity Display

### Capacity Bar Colors
```
█████████████████████ 100% FULL    [RED]
██████████████████░░░  90% FULL    [RED]
███████████████░░░░░░  75% FULL    [YELLOW]
█████████░░░░░░░░░░░░  50% FULL    [GREEN]
████░░░░░░░░░░░░░░░░░  20% FULL    [GREEN]
```

### Status Messages

#### ✓ Within Capacity (Green)
```
✓ Within capacity: 18/20 enrolled (2 remaining)
```
**Meaning**: Safe to save. You have space for these participants.

#### ⚠️ Near Capacity (Yellow)
```
⚠️ Near capacity: 19/20 (95% full)
```
**Meaning**: Very close to limit. Be cautious with additional enrollments.

#### ⚠️ EXCEEDS CAPACITY (Red)
```
⚠️ EXCEEDS CAPACITY! Adding 5 to 8 enrolled = 13 (Limit: 10)
```
**Meaning**: **CANNOT SAVE!** Reduce participant count or choose different site.

---

## 💡 Example Scenarios

### Scenario 1: Single Site Training
**Course**: Fire Safety Training  
**Site**: Plant 1 – Production Area

```
Site Details:
- Capacity: 20 participants
- Currently Enrolled: 15 participants
- Available Slots: 5 slots

Your Action:
- Select: Plant 1
- Enter: 4 participants
- Applicability: Mandatory

Result:
✓ Within capacity: 19/20 enrolled (1 remaining)
[Save Successful]
```

### Scenario 2: Multi-Site Training
**Course**: Equipment Operation Training  
**Sites**: Plant 1, Plant 2, Warehouse

```
Plant 1:
- Capacity: 20 | Enrolled: 15 | Available: 5
- Your planned: 3 participants
- Status: ✓ Within capacity (18/20)

Plant 2:
- Capacity: 30 | Enrolled: 25 | Available: 5
- Your planned: 4 participants
- Status: ⚠️ Near capacity (29/30)

Warehouse:
- Capacity: 25 | Enrolled: 20 | Available: 5
- Your planned: 5 participants
- Status: ✓ Within capacity (25/25)

Total Participants: 12 across 3 sites
[Save Successful]
```

### Scenario 3: Over Capacity (ERROR)
**Course**: Lab Safety Training  
**Site**: Lab – Research Facility

```
Site Details:
- Capacity: 10 participants
- Currently Enrolled: 8 participants
- Available Slots: 2 slots

Your Action:
- Select: Lab
- Enter: 5 participants (TOO MANY!)
- Status: ⚠️ EXCEEDS CAPACITY! (13/10)

Error Message:
"Cannot save course! One or more sites exceed capacity limits."

Solution:
1. Reduce participants to 2 or less, OR
2. Select additional site with more capacity
```

---

## 🎯 Best Practices

### ✅ DO's
1. **Check available slots** before entering participant count
2. **Use "Check Capacity" button** before saving
3. **Select multiple sites** if one site doesn't have enough capacity
4. **Plan ahead** - consider future enrollments when near capacity
5. **Set correct applicability** - Mandatory vs Optional affects planning

### ❌ DON'Ts
1. **Don't ignore red warnings** - system will block save anyway
2. **Don't max out capacity** - leave buffer for last-minute changes
3. **Don't forget to validate** - always check before saving
4. **Don't select inactive sites** - they may not be available

---

## 🔧 Troubleshooting

### Problem: "Site exceeds capacity" error when saving
**Solution**:
1. Review the red-bordered site(s)
2. Reduce participant count to fit within available slots
3. Or select additional sites with more capacity
4. Click "Check Capacity" to verify
5. Try saving again

### Problem: Can't see available sites
**Solution**:
1. Click to expand "Site / Location Mapping" section
2. Scroll down in the "Available Sites" list
3. Check that sites exist in the system
4. Contact admin if sites are missing

### Problem: Capacity bar shows red but I haven't added participants
**Solution**:
- Site may already be at or near capacity
- Check "Currently Enrolled" number
- If site is full, choose a different location
- Contact coordinator to increase site capacity if needed

### Problem: Changes not saving
**Solution**:
1. Check for any red-bordered sites
2. Click "Check Capacity" to identify issues
3. Verify all required fields are filled
4. Check console for error messages
5. Try refreshing page and re-entering data

---

## 📋 Field Descriptions

| Field | Required | Description |
|-------|----------|-------------|
| **Site Selection** | Yes | Choose one or more training locations |
| **Planned Participants** | Yes | Number of people you plan to enroll at this site |
| **Training Applicability** | Yes | Mandatory, Optional, or Recommended |
| **Site Code** | Auto | Automatically displayed (LOC-001, LOC-002, etc.) |
| **Capacity** | Display | Maximum number of participants allowed |
| **Currently Enrolled** | Display | Number already enrolled at this site |
| **Available Slots** | Display | Remaining capacity (Capacity - Enrolled) |
| **Trainer** | Display | Instructor assigned to this site |
| **Status** | Display | Active or Inactive |

---

## 🎓 Training Tips

### For Training Coordinators
1. **Plan capacity in advance**: Review site utilization before scheduling
2. **Balance across sites**: Distribute participants evenly when possible
3. **Monitor trends**: Track which sites fill up quickly
4. **Communicate changes**: Notify trainees if site changes are needed
5. **Keep buffer space**: Don't max out every site - leave room for flexibility

### For Site Administrators
1. **Update capacity regularly**: Adjust as rooms/facilities change
2. **Assign qualified trainers**: Ensure each site has appropriate instructor
3. **Mark inactive sites**: Disable sites under maintenance or renovation
4. **Review utilization**: Identify underused or overbooked locations
5. **Coordinate with HR**: Align site capacity with workforce distribution

---

## 🔄 Common Workflows

### Workflow 1: Standard Course Setup
```
1. Create new course
2. Fill basic details
3. Select one primary site
4. Enter expected participant count
5. Verify capacity is sufficient
6. Save course
7. Notify participants of location
```

### Workflow 2: High-Demand Training
```
1. Create new course
2. Fill basic details
3. Select multiple sites (3-5)
4. Distribute participants evenly
5. Check total capacity across all sites
6. Adjust distribution if needed
7. Save course
8. Assign participants to specific sites
```

### Workflow 3: Capacity Adjustment
```
1. Open existing course (Edit mode)
2. Review current site mappings
3. Identify over-booked sites
4. Add new sites with available capacity
5. Move participants to new sites
6. Remove old over-capacity sites
7. Check total capacity
8. Save changes
```

---

## 📞 Support

### Need Help?
- **Technical Issues**: Contact IT Support
- **Capacity Questions**: Contact Training Coordinator
- **Site Availability**: Contact Site Administrator
- **Course Content**: Contact Training Manager

### Quick Reference
- **Capacity Formula**: Current Enrolled + Planned ≤ Site Capacity
- **Warning Threshold**: 75% capacity (Yellow indicator)
- **Critical Threshold**: 90% capacity (Red indicator)
- **Save Blocked**: When any site exceeds 100% capacity

---

## ✨ Tips for Success

1. **Always check capacity first** - Review available slots before planning
2. **Use realistic numbers** - Don't over-estimate participant count
3. **Leave buffer space** - Plan for 80-90% capacity, not 100%
4. **Verify before saving** - Use "Check Capacity" button
5. **Update promptly** - Adjust counts if participants drop out
6. **Communicate clearly** - Inform trainees of their assigned site
7. **Monitor continuously** - Check site utilization regularly

---

*Last Updated: [Current Date]*  
*For additional help, contact Training Administration*
