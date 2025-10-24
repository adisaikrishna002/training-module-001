# Assessment Module - Complete Guide

## 🎉 What's New

The Assessment module has been completely redesigned with a professional UI and comprehensive features!

## 📍 Access

- **URL**: http://localhost:3000/training/assessments
- **Navigation**: Click "Assessments" in the sidebar

## ✨ Key Features

### 📋 Form Sections

#### 1. Basic Assessment Details
- **Assessment Title*** - Name of the assessment
- **Assessment Type*** - Pre-Training, Post-Training, Final Evaluation, Quiz
- **Training/Course Name*** - Links to specific courses
- **Category** - Technical, Soft Skills, Compliance, Safety
- **Assessment Mode*** - Online, Offline, Hybrid
- **Description** - Summary or purpose

#### 2. Scoring & Duration
- **Duration (Minutes)** - Time allowed for assessment
- **Total Marks** - Maximum achievable score
- **Passing Marks*** - Minimum required to pass
- **Attempt Limit** - Number of tries allowed per user

#### 3. Scheduling / Access Details
- **Start Date & Time** - When assessment becomes available
- **End Date & Time** - Deadline to complete
- **Status** - Active, Inactive, Draft
- **Assessment Instructions** - Guidelines for participants

#### 4. Question Settings
- **Question Bank/Source** - Choose from existing question sets
- **Total Questions** - Number of questions in assessment
- **Shuffle Questions** - Randomize order for each user
- **Shuffle Options** - Randomize answers per question
- **Show Result Immediately** - Instant feedback after submission
- **Allow Review/Retake** - Let learners retake or review answers

#### 5. Metadata (Auto-filled when editing)
- **Created By** - Admin who created the assessment
- **Created Date** - Timestamp of creation
- **Last Updated** - Last modification timestamp

## 🎯 Action Buttons

### Top Bar Buttons
- **➕ Add Assessment** - Create new assessment
- **📤 Export** - Export assessment data
- **📥 Import Questions** - Bulk import question banks
- **📊 View Results** - See submissions and scores

### Per-Assessment Buttons (Click to Show)
1. **✏️ Edit** (Orange) - Modify assessment details
2. **📄 Duplicate** (Purple) - Clone existing assessment
3. **🔘 Activate/Deactivate** (Green/Red) - Toggle status
4. **👁️ View Details** (Blue) - Open summary view
5. **➕ Add Questions** (Green) - Add/import questions
6. **👥 Assign Users** (Indigo) - Assign participants
7. **👁️ Preview** (Teal) - Preview before publishing
8. **🗑️ Delete** (Red) - Remove assessment

## 🔍 Search & Filter

- **Search Bar** - Find assessments by title
- **Type Filter** - Filter by assessment type
- **Status Filter** - Filter by Active/Inactive/Draft

## 📊 Assessment Card Display

Each assessment card shows:
- Assessment title with status badge
- Assessment type badge
- Linked course name
- Duration
- Passing marks / Total marks
- Number of attempts allowed

## 🎨 UI Highlights

- ✅ Clean, modern design
- ✅ Professional color scheme
- ✅ Click-to-expand action buttons
- ✅ Comprehensive modal forms
- ✅ Status badges with colors
- ✅ Hover effects and animations
- ✅ Professional SVG icons
- ✅ Responsive layout

## 🚀 Usage Examples

### Creating a New Assessment

1. Click **"➕ Add Assessment"** button
2. Fill in required fields (marked with *)
3. Configure scoring and duration
4. Set scheduling details (optional)
5. Configure question settings
6. Click **"Create Assessment"**

### Editing an Assessment

1. Click on an assessment card to expand
2. Click the **✏️ Edit** button
3. Modify desired fields
4. Click **"Save Changes"**

### Activating an Assessment

1. Click on assessment card to expand
2. Click **🔘 Activate** button
3. Assessment status changes to Active

## 📝 Validation

Required fields:
- Assessment Title
- Assessment Type
- Training/Course Name
- Passing Marks

The form will show alerts if required fields are missing.

## 🔐 Permissions

Access requires the `canManageAssessments` permission in your role.

## 📁 File Structure

```
pages/
  training/
    assessments.js - Enhanced assessment module (NEW)
    assessments-backup.js - Original backup
    assessments-enhanced.js - Also available
```

## 🎓 Best Practices

1. **Always link to a course** - Better organization
2. **Set realistic durations** - Based on question count
3. **Use descriptive titles** - Easy to identify
4. **Add clear instructions** - Help participants understand
5. **Test before activating** - Use Preview feature
6. **Start with Draft status** - Test thoroughly first

## 💡 Tips

- Use the **Duplicate** button to quickly create similar assessments
- Filter by **Draft** status to see work-in-progress
- Use **Question Bank** to reuse question sets
- Enable **Shuffle Questions** for fairness
- Set **Attempt Limit** to control retakes

---

**Last Updated**: October 18, 2025
**Version**: 2.0 Enhanced
