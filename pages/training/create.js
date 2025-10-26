import { useState } from 'react';
import Materials from '../materials';
import Layout from '../../components/Layout';
import { useAuth } from '../../components/AuthContext';
import { TRAINING_CATEGORIES, TRAINING_TYPES, MOCK_USERS } from '../../data/mockData';
import { PERMISSIONS, MODULES, ROLES } from '../../utils/rbac';


// Material Selection Modal
const MaterialSelectionModal = ({ materials, selected, onSelect, onClose }) => {
  const [localSelected, setLocalSelected] = useState(selected);
  const toggleMaterial = (material) => {
    setLocalSelected((prev) =>
      prev.some((m) => m.id === material.id)
        ? prev.filter((m) => m.id !== material.id)
        : [...prev, material]
    );
  };
  return (
    <div className="modal-overlay" style={{ position: 'fixed', top:0, left:0, right:0, bottom:0, background: 'rgba(0,0,0,0.3)', zIndex: 1000, display:'flex', alignItems:'center', justifyContent:'center' }}>
      <div className="modal-content" style={{ background: 'white', borderRadius: 8, padding: 24, minWidth: 400, maxWidth: 600, maxHeight: '80vh', overflowY: 'auto' }}>
        <h3>Select Materials from Library</h3>
        <div style={{ margin: '16px 0', maxHeight: 300, overflowY: 'auto' }}>
          {materials.map((mat) => (
            <div key={mat.id} style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
              <input type="checkbox" checked={localSelected.some((m) => m.id === mat.id)} onChange={() => toggleMaterial(mat)} />
              <span style={{ marginLeft: 8 }}>{mat.title} <span style={{ color: '#888', fontSize: 12 }}>({mat.fileType.toUpperCase()}, {mat.category})</span></span>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
          <button onClick={onClose} style={{ padding: '6px 16px', background: '#6c757d', color: 'white', border: 'none', borderRadius: 4 }}>Cancel</button>
          <button onClick={() => onSelect(localSelected)} style={{ padding: '6px 16px', background: '#007bff', color: 'white', border: 'none', borderRadius: 4 }}>Select</button>
        </div>
      </div>
    </div>
  );
};

// Training Form Component
const TrainingForm = ({ onSubmit, onCancel, showNotification }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    type: '',
    duration: '',
    startDate: '',
    endDate: '',
    trainer: user.name,
    passingScore: '80',
    maxAttempts: '3',
    certificateEnabled: true,
    assessmentRequired: true,
    materials: [],
    prerequisites: '',
    learningObjectives: '',
    targetAudience: '',
    notes: ''
  });

  const [errors, setErrors] = useState({});
  // Get materials from Materials Library (mock import)
  const [showMaterialModal, setShowMaterialModal] = useState(false);
  // Copy-paste the mock materials from materials.js for now
  const [libraryMaterials] = useState([
    {
      id: 1,
      title: 'GMP Guidelines Document',
      fileType: 'pdf',
      category: 'Guidelines',
    },
    {
      id: 2,
      title: 'Laboratory Safety Training Video',
      fileType: 'mp4',
      category: 'Videos',
    },
    {
      id: 3,
      title: 'Quality Control SOP Template',
      fileType: 'docx',
      category: 'Templates',
    },
    {
      id: 4,
      title: 'SCORM Training Package - Validation',
      fileType: 'scorm',
      category: 'Interactive Content',
    },
    {
      id: 5,
      title: 'Equipment Maintenance Form',
      fileType: 'pdf',
      category: 'Forms',
    },
  ]);
  const [selectedMaterials, setSelectedMaterials] = useState([]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.type) newErrors.type = 'Training type is required';
    if (!formData.duration || formData.duration <= 0) newErrors.duration = 'Duration must be greater than 0';
    if (!formData.startDate) newErrors.startDate = 'Start date is required';
    if (!formData.endDate) newErrors.endDate = 'End date is required';
    if (!formData.trainer.trim()) newErrors.trainer = 'Trainer is required';
    
    // Date validation
    if (formData.startDate && formData.endDate) {
      const startDate = new Date(formData.startDate);
      const endDate = new Date(formData.endDate);
      if (endDate <= startDate) {
        newErrors.endDate = 'End date must be after start date';
      }
    }

    if (formData.assessmentRequired) {
      if (!formData.passingScore || formData.passingScore < 0 || formData.passingScore > 100) {
        newErrors.passingScore = 'Passing score must be between 0 and 100';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Workflow button handlers
  const handleSaveDraft = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const trainingData = {
        ...formData,
        id: Date.now(),
        status: 'Draft',
        createdBy: user.name,
        createdDate: new Date().toISOString(),
        materials: selectedMaterials.map(mat => mat.title),
        assignedCount: 0,
        completedCount: 0,
        overdueCount: 0
      };
      showNotification('Training saved as draft!', 'success');
      onSubmit(trainingData);
    }
  };

  const handlePublish = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const trainingData = {
        ...formData,
        id: Date.now(),
        status: 'Published',
        createdBy: user.name,
        createdDate: new Date().toISOString(),
        materials: selectedMaterials.map(mat => mat.title),
        assignedCount: 0,
        completedCount: 0,
        overdueCount: 0
      };
      showNotification('Training published!', 'success');
      onSubmit(trainingData);
    }
  };

  const handleSubmitForApproval = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const trainingData = {
        ...formData,
        id: Date.now(),
        status: 'Pending Approval',
        createdBy: user.name,
        createdDate: new Date().toISOString(),
        materials: selectedMaterials.map(mat => mat.title),
        assignedCount: 0,
        completedCount: 0,
        overdueCount: 0
      };
      showNotification('Training submitted for approval!', 'info');
      onSubmit(trainingData);
    }
  };

  const handleUploadMaterial = (e) => {
    e.preventDefault();
    setShowMaterialModal(true);
    showNotification('Open material upload dialog.', 'info');
  };

  const handleAddTrainer = (e) => {
    e.preventDefault();
    showNotification('Add Trainer dialog (not implemented).', 'info');
  };

  const handleAssignAssessment = (e) => {
    e.preventDefault();
    showNotification('Assign Assessment dialog (not implemented).', 'info');
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '14px'
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '5px',
    fontWeight: 'bold',
    color: '#333'
  };

  return (
    <form style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div style={{
        backgroundColor: 'white',
        padding: '30px',
        borderRadius: '10px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{ marginBottom: '30px', color: '#333' }}>Create New Training</h2>
        
        {/* Basic Information */}
        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ marginBottom: '20px', color: '#666', borderBottom: '2px solid #f0f0f0', paddingBottom: '10px' }}>
            Basic Information
          </h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
            <div>
              <label style={labelStyle}>Training Title *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                style={{
                  ...inputStyle,
                  borderColor: errors.title ? '#dc3545' : '#ddd'
                }}
                placeholder="Enter training title"
              />
              {errors.title && <div style={{ color: '#dc3545', fontSize: '12px', marginTop: '5px' }}>{errors.title}</div>}
            </div>

            <div>
              <label style={labelStyle}>Trainer *</label>
              <input
                type="text"
                name="trainer"
                value={formData.trainer}
                onChange={handleChange}
                style={{
                  ...inputStyle,
                  borderColor: errors.trainer ? '#dc3545' : '#ddd'
                }}
                placeholder="Enter trainer name"
              />
              {errors.trainer && <div style={{ color: '#dc3545', fontSize: '12px', marginTop: '5px' }}>{errors.trainer}</div>}
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={labelStyle}>Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              style={{
                ...inputStyle,
                borderColor: errors.description ? '#dc3545' : '#ddd',
                resize: 'vertical'
              }}
              placeholder="Enter detailed training description"
            />
            {errors.description && <div style={{ color: '#dc3545', fontSize: '12px', marginTop: '5px' }}>{errors.description}</div>}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
            <div>
              <label style={labelStyle}>Category *</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                style={{
                  ...inputStyle,
                  borderColor: errors.category ? '#dc3545' : '#ddd'
                }}
              >
                <option value="">Select Category</option>
                {TRAINING_CATEGORIES.map(cat => (
                  <option key={cat.id} value={cat.name}>{cat.name}</option>
                ))}
              </select>
              {errors.category && <div style={{ color: '#dc3545', fontSize: '12px', marginTop: '5px' }}>{errors.category}</div>}
            </div>

            <div>
              <label style={labelStyle}>Training Type *</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                style={{
                  ...inputStyle,
                  borderColor: errors.type ? '#dc3545' : '#ddd'
                }}
              >
                <option value="">Select Type</option>
                {TRAINING_TYPES.map(type => (
                  <option key={type.id} value={type.name}>{type.name}</option>
                ))}
              </select>
              {errors.type && <div style={{ color: '#dc3545', fontSize: '12px', marginTop: '5px' }}>{errors.type}</div>}
            </div>

            <div>
              <label style={labelStyle}>Duration (minutes) *</label>
              <input
                type="number"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                min="1"
                style={{
                  ...inputStyle,
                  borderColor: errors.duration ? '#dc3545' : '#ddd'
                }}
                placeholder="120"
              />
              {errors.duration && <div style={{ color: '#dc3545', fontSize: '12px', marginTop: '5px' }}>{errors.duration}</div>}
            </div>
          </div>
        </div>

        {/* Schedule */}
        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ marginBottom: '20px', color: '#666', borderBottom: '2px solid #f0f0f0', paddingBottom: '10px' }}>
            Schedule
          </h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div>
              <label style={labelStyle}>Start Date *</label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                style={{
                  ...inputStyle,
                  borderColor: errors.startDate ? '#dc3545' : '#ddd'
                }}
              />
              {errors.startDate && <div style={{ color: '#dc3545', fontSize: '12px', marginTop: '5px' }}>{errors.startDate}</div>}
            </div>

            <div>
              <label style={labelStyle}>End Date (Due Date) *</label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                style={{
                  ...inputStyle,
                  borderColor: errors.endDate ? '#dc3545' : '#ddd'
                }}
              />
              {errors.endDate && <div style={{ color: '#dc3545', fontSize: '12px', marginTop: '5px' }}>{errors.endDate}</div>}
            </div>
          </div>
        </div>

        {/* Assessment Configuration */}
        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ marginBottom: '20px', color: '#666', borderBottom: '2px solid #f0f0f0', paddingBottom: '10px' }}>
            Assessment Configuration
          </h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
            <div>
              <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', marginBottom: '15px' }}>
                <input
                  type="checkbox"
                  name="assessmentRequired"
                  checked={formData.assessmentRequired}
                  onChange={handleChange}
                  style={{ marginRight: '8px' }}
                />
                <span>Assessment Required</span>
              </label>
              
              <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  name="certificateEnabled"
                  checked={formData.certificateEnabled}
                  onChange={handleChange}
                  style={{ marginRight: '8px' }}
                />
                <span>Certificate Enabled</span>
              </label>
            </div>

            {formData.assessmentRequired && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                <div>
                  <label style={labelStyle}>Passing Score (%)</label>
                  <input
                    type="number"
                    name="passingScore"
                    value={formData.passingScore}
                    onChange={handleChange}
                    min="0"
                    max="100"
                    style={{
                      ...inputStyle,
                      borderColor: errors.passingScore ? '#dc3545' : '#ddd'
                    }}
                  />
                  {errors.passingScore && <div style={{ color: '#dc3545', fontSize: '12px', marginTop: '5px' }}>{errors.passingScore}</div>}
                </div>

                <div>
                  <label style={labelStyle}>Max Attempts</label>
                  <input
                    type="number"
                    name="maxAttempts"
                    value={formData.maxAttempts}
                    onChange={handleChange}
                    min="1"
                    style={inputStyle}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Training Materials */}
        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ marginBottom: '20px', color: '#666', borderBottom: '2px solid #f0f0f0', paddingBottom: '10px' }}>
            Training Materials
          </h3>
          <button type="button" onClick={() => setShowMaterialModal(true)} style={{ padding: '10px 20px', background: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', marginBottom: 12 }}>
            Select from Materials Library
          </button>
          {selectedMaterials.length > 0 && (
            <div style={{ marginTop: 10 }}>
              <h4>Selected Materials:</h4>
              <ul>
                {selectedMaterials.map((mat) => (
                  <li key={mat.id}>{mat.title} <span style={{ color: '#888', fontSize: 12 }}>({mat.fileType.toUpperCase()}, {mat.category})</span></li>
                ))}
              </ul>
            </div>
          )}
          {showMaterialModal && (
            <MaterialSelectionModal
              materials={libraryMaterials}
              selected={selectedMaterials}
              onSelect={(mats) => { setSelectedMaterials(mats); setShowMaterialModal(false); }}
              onClose={() => setShowMaterialModal(false)}
            />
          )}
        </div>

        {/* Additional Information */}
        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ marginBottom: '20px', color: '#666', borderBottom: '2px solid #f0f0f0', paddingBottom: '10px' }}>
            Additional Information
          </h3>
          
          <div style={{ display: 'grid', gap: '20px' }}>
            <div>
              <label style={labelStyle}>Learning Objectives</label>
              <textarea
                name="learningObjectives"
                value={formData.learningObjectives}
                onChange={handleChange}
                rows="3"
                style={inputStyle}
                placeholder="What will trainees learn from this training?"
              />
            </div>

            <div>
              <label style={labelStyle}>Target Audience</label>
              <input
                type="text"
                name="targetAudience"
                value={formData.targetAudience}
                onChange={handleChange}
                style={inputStyle}
                placeholder="Who should take this training?"
              />
            </div>

            <div>
              <label style={labelStyle}>Prerequisites</label>
              <input
                type="text"
                name="prerequisites"
                value={formData.prerequisites}
                onChange={handleChange}
                style={inputStyle}
                placeholder="Any required training or qualifications"
              />
            </div>

            <div>
              <label style={labelStyle}>Additional Notes</label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows="3"
                style={inputStyle}
                placeholder="Any additional information or special instructions"
              />
            </div>
          </div>
        </div>

  {/* Form Actions */}
  <div style={{ display: 'flex', gap: '15px', justifyContent: 'flex-end', borderTop: '1px solid #e0e0e0', paddingTop: '20px' }}>
          <button
            type="button"
            onClick={onCancel}
            style={{
              padding: '12px 24px',
              backgroundColor: '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSaveDraft}
            style={{
              padding: '12px 24px',
              backgroundColor: '#ffc107',
              color: '#212529',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: 'bold'
            }}
          >
            Save as Draft
          </button>
          <button
            type="button"
            onClick={handleUploadMaterial}
            style={{
              padding: '12px 24px',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: 'bold'
            }}
          >
            Upload Material
          </button>
          <button
            type="button"
            onClick={handleAddTrainer}
            style={{
              padding: '12px 24px',
              backgroundColor: '#17a2b8',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: 'bold'
            }}
          >
            Add Trainer
          </button>
          <button
            type="button"
            onClick={handleAssignAssessment}
            style={{
              padding: '12px 24px',
              backgroundColor: '#6610f2',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: 'bold'
            }}
          >
            Assign Assessment
          </button>
          <button
            type="button"
            onClick={handlePublish}
            style={{
              padding: '12px 24px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: 'bold'
            }}
          >
            Publish
          </button>
          <button
            type="button"
            onClick={handleSubmitForApproval}
            style={{
              padding: '12px 24px',
              backgroundColor: '#ffc107',
              color: '#333',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: 'bold'
            }}
          >
            Submit for Approval
          </button>
        </div>
      </div>
    </form>
  );
};

export default function CreateTraining() {
  const { hasUserPermission } = useAuth();
  const [notification, setNotification] = useState(null);

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleSubmit = (trainingData) => {
    // Here you would typically send the data to your backend
    console.log('Training Created:', trainingData);
    showNotification('Training created successfully!');
    
    // Redirect to training management or assignments page
    setTimeout(() => {
      window.location.href = '/training/assignments';
    }, 2000);
  };

  const handleCancel = () => {
    if (confirm('Are you sure you want to cancel? All unsaved changes will be lost.')) {
      window.location.href = '/dashboard';
    }
  };

  if (!hasUserPermission(MODULES.TRAINING_CREATION, PERMISSIONS.CREATE)) {
    return (
      <Layout>
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <h2 style={{ color: '#dc3545' }}>Access Denied</h2>
          <p>You do not have permission to create trainings.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div>
        {/* Notification */}
        {notification && (
          <div className={`notification ${notification.type}`} style={{ marginBottom: '20px' }}>
            {notification.message}
            <button
              onClick={() => setNotification(null)}
              style={{ background: 'none', border: 'none', fontSize: '18px', cursor: 'pointer' }}
            >
              ×
            </button>
          </div>
        )}

  <TrainingForm onSubmit={handleSubmit} onCancel={handleCancel} showNotification={showNotification} />
      </div>
    </Layout>
  );
}