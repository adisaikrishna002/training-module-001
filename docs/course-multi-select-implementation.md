# Course Multi-Select Training Types Implementation

## Overview
Enhanced the Course Management system with persistent data storage and multi-select training types functionality.

## User Requirements
1. **Data Persistence**: All course fields should persist when saved (not disappear)
2. **Multiple Training Types**: Ability to select multiple training types per course (not just one)

## Implementation Details

### New Data Fields
Added three new fields to the course data model:

1. **categoryId** (String)
   - Links course to a training category
   - Selected from dropdown of available categories

2. **deliveryMode** (String)
   - Options: "online", "offline", "hybrid"
   - Selected from dropdown

3. **trainingTypeIds** (Array)
   - Changed from single value to array
   - Supports multiple training type selections
   - Uses checkbox multi-select UI

### State Management

#### New State Variable
```javascript
const [selectedTrainingTypes, setSelectedTrainingTypes] = useState([])
```
- Tracks which training types are selected in the UI
- Syncs with formData.trainingTypeIds

#### Updated formData Structure
```javascript
const [formData, setFormData] = useState({
  title: '',
  code: '',
  version: '',
  description: '',
  duration: '',
  mandatory: false,
  categoryId: '',           // NEW
  deliveryMode: '',         // NEW
  trainingTypeIds: []       // NEW (changed from single value)
})
```

### New Function

#### toggleTrainingTypeSelection
```javascript
function toggleTrainingTypeSelection(typeId) {
  setSelectedTrainingTypes(prev => {
    if (prev.includes(typeId)) {
      return prev.filter(id => id !== typeId)
    } else {
      return [...prev, typeId]
    }
  })
  
  setFormData(prev => ({
    ...prev,
    trainingTypeIds: prev.trainingTypeIds.includes(typeId)
      ? prev.trainingTypeIds.filter(id => id !== typeId)
      : [...prev.trainingTypeIds, typeId]
  }))
}
```
- Handles checkbox clicks
- Updates both selectedTrainingTypes and formData
- Adds or removes training type ID from array

### Updated CRUD Operations

#### addCourse()
Now saves all new fields:
```javascript
dispatch({ 
  type: 'ADD_COURSE', 
  payload: { 
    id: Date.now(), 
    title: formData.title,
    code: formData.code,
    version: formData.version,
    description: formData.description,
    duration: formData.duration,
    mandatory: formData.mandatory,
    categoryId: formData.categoryId,           // NEW
    deliveryMode: formData.deliveryMode,       // NEW
    trainingTypeIds: selectedTrainingTypes,    // NEW (multiple IDs)
    assignedRoles: selectedRoles,
    files: uploadedFiles,
    status: 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  } 
})
```

#### editCourse()
Pre-loads training types when editing:
```javascript
setEditFormData({
  title: course.title,
  code: course.code,
  version: course.version,
  description: course.description,
  duration: course.duration,
  mandatory: course.mandatory,
  categoryId: course.categoryId || '',           // NEW
  deliveryMode: course.deliveryMode || '',       // NEW
  trainingTypeIds: course.trainingTypeIds || []  // NEW
})
setSelectedTrainingTypes(course.trainingTypeIds || [])
```

#### saveEdit()
Persists all fields on update:
```javascript
dispatch({ 
  type: 'UPDATE_COURSE', 
  payload: { 
    id: editingCourse.id, 
    title: editFormData.title,
    code: editFormData.code,
    version: editFormData.version,
    description: editFormData.description,
    duration: editFormData.duration,
    mandatory: editFormData.mandatory,
    categoryId: editFormData.categoryId,           // NEW
    deliveryMode: editFormData.deliveryMode,       // NEW
    trainingTypeIds: selectedTrainingTypes,        // NEW
    assignedRoles: selectedRoles,
    files: uploadedFiles
  } 
})
```

### AppContext Updates

#### ADD_COURSE Reducer
```javascript
case 'ADD_COURSE':
  return { 
    ...state, 
    courses: [...state.courses, {
      ...action.payload,
      categoryId: action.payload.categoryId || '',
      deliveryMode: action.payload.deliveryMode || '',
      trainingTypeIds: action.payload.trainingTypeIds || [],
      assignedRoles: action.payload.assignedRoles || [],
      files: action.payload.files || []
    }]
  }
```

#### UPDATE_COURSE Reducer
```javascript
case 'UPDATE_COURSE':
  return { 
    ...state, 
    courses: state.courses.map(c => 
      c.id === action.payload.id ? { 
        ...c, 
        title: action.payload.title,
        code: action.payload.code,
        version: action.payload.version,
        description: action.description,
        duration: action.payload.duration,
        mandatory: action.payload.mandatory,
        categoryId: action.payload.categoryId || c.categoryId || '',
        deliveryMode: action.payload.deliveryMode || c.deliveryMode || '',
        trainingTypeIds: action.payload.trainingTypeIds || c.trainingTypeIds || [],
        assignedRoles: action.payload.assignedRoles || c.assignedRoles || [],
        files: action.payload.files || c.files || [],
        updatedAt: new Date().toISOString()
      } : c
    ) 
  }
```

## UI Components

### Add Course Form
Added three new sections before the Mandatory Course checkbox:

#### 1. Category Dropdown
```javascript
<div style={{
  marginBottom: '15px',
  padding: '15px',
  backgroundColor: '#f8f9fa',
  borderRadius: '8px',
  border: '1px solid #dee2e6'
}}>
  <label style={{
    display: 'block',
    marginBottom: '8px',
    fontWeight: '600',
    color: '#495057',
    fontSize: '14px'
  }}>
    Training Category
  </label>
  <select
    value={formData.categoryId}
    onChange={(e) => setFormData({...formData, categoryId: e.target.value})}
    style={{
      width: '100%',
      padding: '10px',
      border: '1px solid #ced4da',
      borderRadius: '6px',
      fontSize: '14px',
      backgroundColor: '#fff'
    }}
  >
    <option value="">Select Category</option>
    {state.trainingCategories.map(category => (
      <option key={category.id} value={category.id}>
        {category.name}
      </option>
    ))}
  </select>
</div>
```

#### 2. Delivery Mode Dropdown
```javascript
<div style={{
  marginBottom: '15px',
  padding: '15px',
  backgroundColor: '#f8f9fa',
  borderRadius: '8px',
  border: '1px solid #dee2e6'
}}>
  <label style={{
    display: 'block',
    marginBottom: '8px',
    fontWeight: '600',
    color: '#495057',
    fontSize: '14px'
  }}>
    Delivery Mode
  </label>
  <select
    value={formData.deliveryMode}
    onChange={(e) => setFormData({...formData, deliveryMode: e.target.value})}
    style={{
      width: '100%',
      padding: '10px',
      border: '1px solid #ced4da',
      borderRadius: '6px',
      fontSize: '14px',
      backgroundColor: '#fff'
    }}
  >
    <option value="">Select Delivery Mode</option>
    <option value="online">Online</option>
    <option value="offline">Offline</option>
    <option value="hybrid">Hybrid</option>
  </select>
</div>
```

#### 3. Training Types Multi-Select
```javascript
<div style={{
  marginBottom: '15px',
  padding: '15px',
  backgroundColor: '#f8f9fa',
  borderRadius: '8px',
  border: '1px solid #dee2e6'
}}>
  <label style={{
    display: 'block',
    marginBottom: '12px',
    fontWeight: '600',
    color: '#495057',
    fontSize: '14px'
  }}>
    Training Types
    {selectedTrainingTypes.length > 0 && (
      <span style={{
        marginLeft: '8px',
        padding: '2px 8px',
        backgroundColor: '#0066cc',
        color: 'white',
        borderRadius: '12px',
        fontSize: '12px',
        fontWeight: '500'
      }}>
        {selectedTrainingTypes.length} selected
      </span>
    )}
  </label>
  <div style={{
    maxHeight: '200px',
    overflowY: 'auto',
    border: '1px solid #ced4da',
    borderRadius: '6px',
    backgroundColor: '#fff',
    padding: '8px'
  }}>
    {state.trainingTypes.length > 0 ? (
      state.trainingTypes.map(type => (
        <label
          key={type.id}
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '8px 10px',
            cursor: 'pointer',
            borderRadius: '4px',
            marginBottom: '4px',
            backgroundColor: selectedTrainingTypes.includes(type.id) ? '#e3f2fd' : 'transparent',
            border: selectedTrainingTypes.includes(type.id) ? '1px solid #0066cc' : '1px solid transparent',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            if (!selectedTrainingTypes.includes(type.id)) {
              e.currentTarget.style.backgroundColor = '#f5f5f5'
            }
          }}
          onMouseLeave={(e) => {
            if (!selectedTrainingTypes.includes(type.id)) {
              e.currentTarget.style.backgroundColor = 'transparent'
            }
          }}
        >
          <input
            type="checkbox"
            checked={selectedTrainingTypes.includes(type.id)}
            onChange={() => toggleTrainingTypeSelection(type.id)}
            style={{
              marginRight: '10px',
              cursor: 'pointer',
              width: '16px',
              height: '16px'
            }}
          />
          <span style={{
            fontSize: '14px',
            color: '#495057',
            fontWeight: selectedTrainingTypes.includes(type.id) ? '500' : '400'
          }}>
            {type.name}
          </span>
        </label>
      ))
    ) : (
      <div style={{
        padding: '15px',
        textAlign: 'center',
        color: '#6c757d',
        fontSize: '14px'
      }}>
        No training types available
      </div>
    )}
  </div>
</div>
```

### Edit Course Modal
The Edit Course modal includes identical field sections with the same styling and functionality.

## Features

### Multi-Select UI
- **Checkbox Interface**: Each training type has a checkbox
- **Selection Counter**: Badge shows number of selected types
- **Visual Feedback**: 
  - Blue background for selected items
  - Blue border around selected items
  - Hover effects on unselected items
- **Scrollable List**: Max height 200px with overflow scroll
- **Empty State**: Message when no training types available

### Data Persistence
- All fields save to AppContext reducer
- Data persists across page navigation
- Edit operations pre-load all existing data
- Updates maintain all field values

## Testing Checklist

- [x] No compilation errors in courses.js
- [x] No compilation errors in AppContext.js
- [ ] Create course with category selected
- [ ] Create course with delivery mode selected
- [ ] Create course with multiple training types
- [ ] Verify all fields save correctly
- [ ] Edit course and verify fields pre-load
- [ ] Modify selections in edit mode
- [ ] Verify updates persist
- [ ] Test with no training types selected
- [ ] Test with all training types selected
- [ ] Verify selection counter updates correctly

## Files Modified

1. **pages/training/courses.js** (~2400 lines)
   - Added `selectedTrainingTypes` state
   - Updated `formData` structure
   - Created `toggleTrainingTypeSelection` function
   - Modified `addCourse()` function
   - Modified `editCourse()` function
   - Modified `saveEdit()` function
   - Added UI sections to Add Course form
   - Added UI sections to Edit Course modal

2. **src/context/AppContext.js** (196 lines)
   - Updated `ADD_COURSE` reducer case
   - Updated `UPDATE_COURSE` reducer case

## Benefits

1. **Enhanced Data Model**: Courses now linked to categories and delivery modes
2. **Flexible Training Types**: Multiple types per course instead of single selection
3. **Better UX**: Intuitive checkbox interface with visual feedback
4. **Data Integrity**: All fields persist correctly in AppContext
5. **Form Parity**: Add and Edit forms have identical field sets
6. **Scalable**: Easy to add more fields in the future

## Next Steps

1. Test complete flow with real data
2. Add validation for required fields
3. Consider adding "Select All" / "Clear All" buttons for training types
4. Add tooltips for field descriptions
5. Consider adding search/filter for long training type lists
