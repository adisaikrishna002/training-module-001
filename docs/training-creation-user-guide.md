# Training Creation - User Guide
## Complete Guide to All 8 Enhanced Sections

---

## 🚀 Quick Start

### Opening the Training Creation Form
1. Navigate to **Training → Courses**
2. Click **➕ Add New Course** button
3. Fill in basic information:
   - Training Title
   - Training Code (auto-filled, editable)
   - Version
   - Description
   - Duration
   - Category
   - Delivery Mode

### Expanding Sections
All enhanced features are in **collapsible sections**. Click any section header to expand or collapse it.

**Visual Indicators**:
- 🔵 **Blue background** = Section is expanded
- ⚪ **Gray background** = Section is collapsed
- **Number badge** = Items selected in that section
- **▼ Arrow** = Click to toggle

---

## 1️⃣ Qualification Criteria

### What is it?
Define the minimum requirements a trainee must meet to successfully complete the training.

### When to use?
- For all trainings with assessment requirements
- When setting pass/fail criteria
- When practical demonstrations are needed

### How to use:

**Step 1: Expand the Section**
- Click "🧩 Qualification Criteria"

**Step 2: Set Pass Score**
```
Enter a number between 0-100
Example: 85 means trainee must score 85% or higher
```

**Step 3: Set Minimum Attendance**
```
Enter a number between 0-100
Example: 90 means trainee must attend 90% of sessions
```

**Step 4: Practical Demonstration**
- Check the box if hands-on demo is required
- Leave unchecked for theory-only trainings

**Step 5: Choose Evaluation Method**
- **Quiz**: Online/offline multiple choice/short answer
- **Practical**: Hands-on demonstration
- **Observation**: Supervisor observes work
- **Interview**: One-on-one assessment
- **Assignment**: Take-home project
- **Project**: Major work deliverable
- **Mixed**: Combination of methods

**Step 6: Choose Grading Type**
- **Pass/Fail**: Simple binary outcome
- **Percentage**: 0-100% score
- **Rating**: 1-5 star rating
- **Grade**: Letter grades (A, B, C, D, F)
- **Points**: Point-based scoring

### Example Configuration:
```
✅ Safety Training - Fire Drill
   Pass Score: 80%
   Minimum Attendance: 100% (mandatory for all sessions)
   Practical Required: ✓ Yes
   Evaluation: Mixed (Quiz + Practical)
   Grading: Pass/Fail
```

---

## 2️⃣ Trainer Profile

### What is it?
Assign qualified trainers who will conduct the training.

### When to use?
- For all instructor-led trainings
- When specific expertise is required
- When certification/license is needed

### How to use:

**Step 1: Expand the Section**
- Click "👨‍🏫 Trainer Profile"

**Step 2: Review Available Trainers**
Each trainer card shows:
- **Name** and **ID**
- **Qualification** (degree, certification)
- **Years of Experience**
- **Type**: Internal (employee) or External (contractor)
- **Approval Status**: 
  - ✓ Green = Approved
  - ⏳ Yellow = Pending
  - ✗ Red = Rejected
- **Certifications**: Professional certifications

**Step 3: Select Trainer(s)**
- Click the trainer card or checkbox
- Multiple trainers can be selected
- Badge shows count: "👨‍🏫 Trainer Profile (2)"

**Step 4: Verify Selection**
- Blue border indicates selected trainer
- Check at bottom shows count

### Example:
```
✅ Equipment Operation Training
   Selected Trainers:
   • John Doe - M.Tech Mechanical, 8 years, ISO Lead Auditor
   • Sarah Johnson - M.Sc Safety, 10 years, NEBOSH IGC
```

### Tips:
- ✅ Select trainers with relevant certifications
- ✅ Check approval status (only approved trainers)
- ✅ Mix internal/external for broader expertise
- ❌ Don't select trainers with rejected status

---

## 3️⃣ Equivalency Rules

### What is it?
Define which other trainings can substitute for this one.

### When to use?
- When similar trainings exist
- When employees have prior experience
- For role-specific variations

### How to use:

**Step 1: Expand the Section**
- Click "🔁 Equivalency Rules"

**Step 2: Select Equivalent Courses**
- Review list of other courses
- Check boxes for equivalent trainings
- Multiple courses can be selected

**Step 3: Set Equivalency Type**
- **Full Equivalency**: 100% substitution
  - Example: "Advanced Java" = "Java Fundamentals"
- **Partial Equivalency**: Partial credit given
  - Example: "Basic Safety" = 50% of "Advanced Safety"

**Step 4: Set Validity Period**
```
Enter months (1-120)
Example: 24 months = 2 years
After this period, training must be repeated
```

**Step 5: Approval Required**
- Check if manager/admin approval needed
- Useful for high-compliance trainings

### Example:
```
✅ Fire Safety Training v2.0
   Equivalent Courses:
   • Fire Safety Training v1.0 (Full Equivalency)
   • General Safety Training (Partial Equivalency)
   
   Validity: 24 months (2 years)
   Approval Required: ✓ Yes (for compliance)
```

### Use Cases:
1. **Version Updates**: Old version = new version
2. **Role Changes**: Manager safety = supervisor safety
3. **External Training**: Vendor course = internal course
4. **Cross-Department**: Different dept, same content

---

## 4️⃣ Role Transition / Promotion Rules

### What is it?
Automatic handling of training requirements when employees change roles.

### When to use?
- For all trainings in role-based systems
- During promotions/transfers
- When roles have overlapping requirements

### How to use:

**Step 1: Expand the Section**
- Click "🧑‍💼 Role Transition / Promotion Rules"

**Step 2: Configure Options**

**Option 1: Apply Role Transition Rule**
```
✓ Enabled (Recommended)
System automatically handles role changes
```

**Option 2: Carry Forward Completed Trainings**
```
✓ Enabled (Recommended)
Previously completed trainings remain valid
Employee doesn't repeat same training
```

**Option 3: Auto-Assign New Role-Specific Trainings**
```
✓ Enabled (Recommended)
New role requirements automatically assigned
Employee notified of new trainings
```

**Option 4: Notify Employee on Assignment**
```
✓ Enabled (Recommended)
Email/notification sent when new training assigned
```

### Real-World Example:

**Scenario**: John promoted from Operator to Supervisor

```
John's Previous Training (Operator):
• Safety Basics ✓ Completed
• Equipment Operation ✓ Completed
• Quality Standards ✓ Completed

New Role Requirements (Supervisor):
• Safety Basics (CARRIED FORWARD - No repeat)
• Equipment Operation (CARRIED FORWARD - No repeat)
• Quality Standards (CARRIED FORWARD - No repeat)
• Leadership Skills (NEW - AUTO-ASSIGNED)
• Team Management (NEW - AUTO-ASSIGNED)

Result:
✅ John keeps 3 completed trainings
✅ John assigned 2 new trainings only
✅ John receives notification email
```

### Best Practices:
- ✅ Enable all options for smooth transitions
- ✅ Use for role-based training matrices
- ✅ Configure equivalency rules first
- ❌ Don't disable if roles have training requirements

---

## 5️⃣ Training Category & Subcategory

### What is it?
Hierarchical organization of trainings for easy classification and searching.

### When to use?
- For all trainings
- When organizing training library
- For reporting and analytics

### How to use:

**Step 1: Expand the Section**
- Click "🗃️ Category & Subcategory"

**Step 2: Select Main Category**
```
Dropdown menu shows:
• Technical
• Compliance
• Soft Skills
• Safety
• Quality
• Operations
• etc.
```

**Step 3: Select Subcategory**
```
Subcategories populate based on main category
Example: Technical →
  • Software Development
  • Hardware Engineering
  • Networking
  • Database Management
```

**Step 4: Enter Category Code**
```
Auto-generated or manual
Format: CATEGORY-SUBCATEGORY-ID
Example: TEC-SW-JAVA-001
```

**Step 5: Verify Category Path**
Blue info box shows full hierarchy:
```
Technical → Software Development → Java
```

### Example Hierarchies:

**Technical Training**:
```
Technical
├── Software Development
│   ├── Java
│   ├── Python
│   └── React
└── Networking
    ├── Cisco
    └── Security
```

**Compliance Training**:
```
Compliance
├── Safety
│   ├── Fire Safety
│   ├── Lab Safety
│   └── PPE Usage
└── Quality
    └── ISO Standards
```

**Soft Skills Training**:
```
Soft Skills
├── Leadership
│   ├── Team Management
│   └── Decision Making
└── Communication
    └── Presentation Skills
```

### Tips:
- ✅ Use consistent naming conventions
- ✅ Create logical hierarchies
- ✅ Keep subcategories specific
- ✅ Use category codes for quick reference

---

## 6️⃣ Training Filter & Search

### What is it?
Dashboard feature to search and filter trainings.

### When to use?
- When searching training library
- Finding specific trainings
- Generating reports

### Available Filters:

**1. Category & Subcategory**
```
Example: Show only "Technical → Software" trainings
```

**2. Training Type**
```
• Instructor-led
• Self-paced
• E-learning
• Workshop
• Simulation
```

**3. Delivery Mode**
```
• Online
• Offline
• Hybrid
```

**4. Trainer Name**
```
Example: Show trainings by "John Doe"
```

**5. Status**
```
• Active
• Upcoming
• Completed
• Archived
```

### Example Searches:

**Search 1**: Find all online technical trainings
```
Category: Technical
Delivery Mode: Online
Status: Active
```

**Search 2**: Find trainings by specific trainer
```
Trainer: Sarah Johnson
Category: Safety
```

**Search 3**: Find upcoming compliance trainings
```
Category: Compliance
Status: Upcoming
Sort by: Start Date
```

---

## 7️⃣ Multi-Language Support

### What is it?
Provide training materials in multiple languages for diverse workforce.

### When to use?
- For multinational organizations
- Regional language requirements
- Compliance with local regulations

### How to use:

**Step 1: Expand the Section**
- Click "🌐 Multi-Language Support"

**Step 2: Select Languages**
```
Available Languages (15):
✓ English      □ Hindi         □ Marathi
□ Tamil        □ Telugu        □ Gujarati
□ Kannada      □ Malayalam     □ Bengali
□ Japanese     □ German        □ French
□ Spanish      □ Chinese       □ Arabic
```

Click checkboxes to select multiple languages.

**Step 3: Set Default Language**
```
Dropdown shows only selected languages
Choose primary language for training
Example: English (if operating in global context)
         Hindi (if operating in India)
```

**Step 4: Translation Required**
```
☐ Unchecked: Materials can be in any selected language
✓ Checked: All materials MUST be available in ALL languages
```

**Step 5: Verify Selection**
Blue info box shows:
```
Selected: English, Hindi, Japanese
```

### Example Configurations:

**Global Training**:
```
Languages: English (default), Japanese, German, Chinese
Translation Required: ✓ Yes
Result: All materials must exist in 4 languages
```

**Regional Training (India)**:
```
Languages: Hindi (default), English, Marathi, Gujarati
Translation Required: ✓ Yes
Result: Materials in 4 Indian languages
```

**Optional Multi-Language**:
```
Languages: English (default), Hindi, Tamil
Translation Required: ☐ No
Result: Materials can be in any of 3 languages
```

### Best Practices:
- ✅ At least one language required (system enforced)
- ✅ Set most common language as default
- ✅ Enable translation for compliance trainings
- ✅ Upload materials with language tags
- ❌ Don't select too many languages without resources

### Workflow for Translated Materials:

**Step 1**: Create training with languages
```
Languages: English, Hindi, Japanese
Default: English
```

**Step 2**: Upload materials (see Material Upload section)
```
File: Safety_Manual_EN.pdf → Material → Mark as English
File: Safety_Manual_HI.pdf → Material → Mark as Hindi
File: Safety_Manual_JP.pdf → Material → Mark as Japanese
```

**Step 3**: System displays materials based on user's language preference

---

## 8️⃣ Training Materials Upload

### What is it?
Upload comprehensive training materials with detailed metadata.

### When to use?
- For all trainings with materials
- SOPs, policies, presentations, videos
- Assessment materials

### How to use:

**Step 1: Expand the Section**
- Click "📚 Training Materials Upload"

**Step 2: Upload Files**
```
Click the upload area OR drag files
Supported formats:
• Documents: PDF, DOC, DOCX
• Presentations: PPT, PPTX
• Spreadsheets: XLS, XLSX
• Videos: MP4, AVI, MOV
• Audio: MP3, WAV
• Archives: ZIP

Max size: 50MB per file
Multiple files: Supported
```

**Step 3: Fill Material Metadata**

For each uploaded file, provide:

**A. Material Type** (Dropdown - Required)
```
• Presentation    • Video          • Document
• Assessment      • Reference      • Handout
• Quiz            • Case Study     • Simulation
• SOP             • Policy         • Work Instruction
```

**B. Version Number** (Text - Required)
```
Format: X.Y
Examples: 1.0, 2.1, 3.0
Default: 1.0
```

**C. Effective Date** (Date - Required)
```
When this material becomes active
Default: Today
Example: 2025-10-19
```

**D. Associated Document ID** (Text - Optional)
```
Link to DMS (Document Management System)
Example: DOC-12345, SOP-789
```

**E. Description/Notes** (Textarea - Optional)
```
Brief description of material
Language indicator (if multi-language)
Example: "Main training manual - English version"
```

**Step 4: Review Uploaded Materials**
```
Each material shows:
📄 Training_Manual_v2.0.pdf    [Remove]
2.45 MB

Material Type: [Document ▼]
Version: [2.0]    Effective Date: [2025-10-19]
Associated Doc: [DOC-12345]
Description: [Main training manual - English]
```

**Step 5: Remove Materials**
- Click **[Remove]** button to delete unwanted files
- No confirmation required

### Example: Complete Material Set

```
Training: Fire Safety Procedures

Materials Uploaded:
┌─────────────────────────────────────────┐
│ 📊 Fire_Safety_Presentation_v1.0.pptx  │
│ Type: Presentation, Version: 1.0       │
│ Effective: 2025-10-19                  │
│ Description: Main training slides       │
├─────────────────────────────────────────┤
│ 📄 Fire_Safety_SOP_v2.1.pdf            │
│ Type: SOP, Version: 2.1                │
│ Effective: 2025-10-15                  │
│ Associated Doc: SOP-FS-001             │
│ Description: Standard operating proc.   │
├─────────────────────────────────────────┤
│ 🎥 Fire_Drill_Demo_v1.0.mp4            │
│ Type: Video, Version: 1.0              │
│ Effective: 2025-10-19                  │
│ Description: Practical demonstration    │
├─────────────────────────────────────────┤
│ 📝 Fire_Safety_Quiz_v1.0.pdf           │
│ Type: Assessment, Version: 1.0         │
│ Effective: 2025-10-19                  │
│ Description: Post-training assessment   │
└─────────────────────────────────────────┘

Total: 4 materials, 15.7 MB
```

### Material Organization Tips:

**By Type**:
```
Presentations → Training delivery
Documents → Reference materials
SOPs/Policies → Compliance documents
Videos → Demonstrations
Assessments → Quizzes, tests
```

**By Language** (if multi-language):
```
Training_Manual_EN.pdf → English version
Training_Manual_HI.pdf → Hindi version
Training_Manual_JA.pdf → Japanese version
```

**By Version**:
```
Material_v1.0.pdf → Initial version
Material_v1.1.pdf → Minor update
Material_v2.0.pdf → Major revision
```

### File Icons Legend:
- 📄 PDF documents
- 📝 Word documents
- 📊 PowerPoint presentations
- 📈 Excel spreadsheets
- 🎥 Video files
- 🎵 Audio files
- 🗜️ ZIP archives
- 📎 Other files (auto-detected)

---

## 💾 Saving Your Training

### Before Saving - Checklist:

**Required Fields**:
- ✅ Training Title
- ✅ Training Code
- ✅ Description
- ✅ Duration
- ✅ Category

**Optional But Recommended**:
- ✅ Qualification Criteria (for assessed trainings)
- ✅ Trainer Profile (for instructor-led)
- ✅ Site/Location Mapping (for physical trainings)
- ✅ Training Materials (for all trainings)

**Click "Add Course" Button**:
- System validates all fields
- Checks capacity limits (if sites selected)
- Saves all section data
- Resets form to empty state
- Shows success message

---

## 📊 Example: Complete Training Setup

### Scenario: Creating "Advanced Java Programming" Training

**Basic Information**:
```
Title: Advanced Java Programming
Code: TRN-JAVA-002
Version: 1.0
Description: Advanced Java concepts for software developers
Duration: 40 hours
Category: Technical
Delivery Mode: Hybrid
```

**1️⃣ Qualification Criteria**:
```
Pass Score: 80%
Minimum Attendance: 85%
Practical Required: ✓ Yes
Evaluation: Mixed (Quiz + Project)
Grading: Percentage
```

**2️⃣ Trainer Profile**:
```
Selected: Mike Wilson
- B.Sc Computer Science, 5 years
- AWS Certified Solutions Architect
```

**3️⃣ Equivalency Rules**:
```
Equivalent: Java Fundamentals (Full, 24 months)
Approval Required: No
```

**4️⃣ Role Transition**:
```
✓ All options enabled
Automatic handling of role changes
```

**5️⃣ Category & Subcategory**:
```
Technical → Software Development → Java
Code: TEC-SW-JAVA-002
```

**7️⃣ Multi-Language**:
```
Languages: English (default), Hindi
Translation Required: No
```

**8️⃣ Materials Uploaded**:
```
• Java_Advanced_Slides.pptx (Presentation, 5.2 MB)
• Java_Reference_Manual.pdf (Document, 3.8 MB)
• Java_Code_Examples.zip (Reference, 2.1 MB)
• Java_Final_Project.pdf (Assessment, 0.8 MB)
Total: 4 materials, 11.9 MB
```

**Result**: Comprehensive training created with all metadata

---

## 🔍 Finding Your Training

After saving, you can find your training by:
1. **Search Bar**: Enter title or code
2. **Category Filter**: Select category
3. **Training Type**: Filter by delivery method
4. **Sort**: By title, code, date, duration

---

## ⚠️ Common Issues & Solutions

### Issue 1: Can't Save Training
**Problem**: "Required fields missing" error  
**Solution**: Check that Title, Code, Description filled

### Issue 2: Trainer Not Visible
**Problem**: Trainer doesn't appear in list  
**Solution**: Trainer must have "Approved" status

### Issue 3: Can't Remove Last Language
**Problem**: System blocks removing last language  
**Solution**: At least one language must be selected (system requirement)

### Issue 4: Material Won't Upload
**Problem**: File upload fails  
**Solution**: 
- Check file size (max 50MB)
- Check file format (must be supported)
- Try smaller file or different format

### Issue 5: Capacity Error
**Problem**: "Site exceeds capacity" error  
**Solution**: Reduce participant count or select different site

---

## 📞 Support

### Need Help?
- **Technical Issues**: Contact IT Support
- **Training Content**: Contact Training Manager
- **Trainer Assignment**: Contact HR
- **System Access**: Contact Admin

### Quick Reference Card

```
┌─────────────────────────────────────────┐
│ TRAINING CREATION - QUICK REFERENCE     │
├─────────────────────────────────────────┤
│ 🧩 Qualification: Pass score, attendance│
│ 👨‍🏫 Trainer: Assign qualified trainers  │
│ 🔁 Equivalency: Link similar trainings  │
│ 🧑‍💼 Role Transition: Auto-handle changes│
│ 🗃️ Category: Organize hierarchically    │
│ 🌐 Multi-Language: Support 15 languages │
│ 📚 Materials: Upload with metadata      │
├─────────────────────────────────────────┤
│ All sections are OPTIONAL               │
│ All sections are COLLAPSIBLE            │
│ All sections SAVE automatically         │
└─────────────────────────────────────────┘
```

---

## ✨ Tips for Success

1. **Start Simple**: Fill basic info first, add details later
2. **Use Templates**: Copy similar trainings and modify
3. **Organize Materials**: Name files consistently
4. **Set Realistic Criteria**: Don't make requirements too strict
5. **Plan Languages**: Only select languages you can support
6. **Update Regularly**: Keep materials current with versions
7. **Test First**: Create test training before production

---

*Last Updated: October 19, 2025*  
*User Guide Version: 1.0*  
*For Training Module v2.0*
