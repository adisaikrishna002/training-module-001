import { useState } from 'react';
import Layout from '../../components/Layout';
import { useAuth } from '../../components/AuthContext';
import { TRAINING_CATEGORIES, TRAINING_TYPES, MOCK_USERS } from '../../data/mockData';
import { PERMISSIONS, MODULES, ROLES } from '../../utils/rbac';

// File Upload Component
const FileUpload = ({ files, onFilesChange, accept = "*/*", multiple = true }) => {
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    onFilesChange([...files, ...selectedFiles]);
  };

  const removeFile = (index) => {
    const newFiles = files.filter((_, i) => i !== index);
    onFilesChange(newFiles);
  };

  return (
    <div style={{
      border: '2px dashed #ddd',
      borderRadius: '8px',
      padding: '20px',
      textAlign: 'center',
      backgroundColor: '#f9f9f9'
    }}>
      <input
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={handleFileChange}
        style={{ display: 'none' }}
        id="file-upload"
      />
      <label htmlFor="file-upload" style={{
        display: 'inline-block',
        padding: '10px 20px',
        backgroundColor: '#007bff',
        color: 'white',
        borderRadius: '4px',
        cursor: 'pointer'
      }}>
        Choose Files
      </label>
      <p style={{ margin: '10px 0 0 0', color: '#666', fontSize: '14px' }}>
        Upload training materials (PDF, PPT, Video, SCORM packages)
      </p>
      
      {files.length > 0 && (
        <div style={{ marginTop: '15px' }}>
          <h4>Selected Files:</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {files.map((file, index) => (
              <div key={index} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '8px 12px',
                backgroundColor: 'white',
                borderRadius: '4px',
                border: '1px solid #ddd'
              }}>
                <span style={{ fontSize: '14px' }}>
                  {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                </span>
                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#dc3545',
                    cursor: 'pointer',
                    fontSize: '16px'
                  }}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Training Form Component
const TrainingForm = ({ onSubmit, onCancel }) => {
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
  const [files, setFiles] = useState([]);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const trainingData = {
        ...formData,
        id: Date.now(),
        status: 'Draft',
        createdBy: user.name,
        createdDate: new Date().toISOString(),
        materials: files.map(file => file.name),
        assignedCount: 0,
        completedCount: 0,
        overdueCount: 0
      };
      onSubmit(trainingData);
    }
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
    <form onSubmit={handleSubmit} style={{ maxWidth: '800px', margin: '0 auto' }}>
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
          
          <FileUpload
            files={files}
            onFilesChange={setFiles}
            accept=".pdf,.ppt,.pptx,.mp4,.avi,.scorm,.zip"
          />
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
            type="submit"
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
            type="submit"
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
            Create Training
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

        <TrainingForm onSubmit={handleSubmit} onCancel={handleCancel} />
      </div>
    </Layout>
  );
}