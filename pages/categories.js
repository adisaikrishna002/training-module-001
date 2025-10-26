import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { useAuth } from '../components/AuthContext';
import { PERMISSIONS, MODULES } from '../utils/rbac';

// Category Card Component
const CategoryCard = ({ category, onEdit, onDelete, onView, canEdit, canDelete }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return '#28a745';
      case 'Inactive': return '#6c757d';
      case 'Draft': return '#ffc107';
      default: return '#6c757d';
    }
  };

  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '10px',
      padding: '20px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      border: '1px solid #e0e0e0',
      position: 'relative'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
        <h3 style={{ margin: 0, fontSize: '18px', color: category.color || '#333' }}>{category.name}</h3>
        <span style={{
          padding: '4px 8px',
          borderRadius: '12px',
          fontSize: '12px',
          fontWeight: 'bold',
          backgroundColor: getStatusColor(category.status),
          color: 'white'
        }}>
          {category.status}
        </span>
      </div>

      <p style={{ margin: '0 0 15px 0', fontSize: '14px', color: '#666', lineHeight: '1.4' }}>
        {category.description}
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px', fontSize: '14px' }}>
        <div>
          <strong>Training Count:</strong><br />
          <span style={{ color: '#007bff' }}>{category.trainingCount}</span>
        </div>
        <div>
          <strong>Completion Rate:</strong><br />
          <span style={{ color: category.completionRate >= 80 ? '#28a745' : category.completionRate >= 60 ? '#ffc107' : '#dc3545' }}>
            {category.completionRate}%
          </span>
        </div>
        <div>
          <strong>Required For:</strong><br />
          {category.requiredRoles.slice(0, 2).join(', ')}
          {category.requiredRoles.length > 2 && ` +${category.requiredRoles.length - 2} more`}
        </div>
        <div>
          <strong>Priority:</strong><br />
          <span style={{
            color: category.priority === 'High' ? '#dc3545' :
                  category.priority === 'Medium' ? '#ffc107' : '#28a745'
          }}>
            {category.priority}
          </span>
        </div>
      </div>

      {category.tags && category.tags.length > 0 && (
        <div style={{ marginBottom: '15px' }}>
          <strong style={{ fontSize: '12px' }}>Tags:</strong>
          <div style={{ marginTop: '5px' }}>
            {category.tags.map(tag => (
              <span key={tag} style={{
                display: 'inline-block',
                backgroundColor: '#e9ecef',
                color: '#495057',
                padding: '2px 6px',
                borderRadius: '4px',
                fontSize: '11px',
                marginRight: '4px',
                marginBottom: '2px'
              }}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      <div style={{ fontSize: '12px', color: '#666', marginBottom: '15px' }}>
        <div>Created: {new Date(category.createdDate).toLocaleDateString()}</div>
        <div>Last Updated: {new Date(category.lastUpdated).toLocaleDateString()}</div>
      </div>

      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        <button
          onClick={() => onView(category)}
          style={{
            padding: '8px 16px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontSize: '12px',
            cursor: 'pointer'
          }}
        >
          View Details
        </button>
        
        {canEdit && (
          <button
            onClick={() => onEdit(category)}
            style={{
              padding: '8px 16px',
              backgroundColor: '#ffc107',
              color: '#212529',
              border: 'none',
              borderRadius: '4px',
              fontSize: '12px',
              cursor: 'pointer'
            }}
          >
            Edit
          </button>
        )}
        
        {canDelete && category.status !== 'Active' && (
          <button
            onClick={() => onDelete(category)}
            style={{
              padding: '8px 16px',
              backgroundColor: '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              fontSize: '12px',
              cursor: 'pointer'
            }}
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

// Category Form Component
const CategoryForm = ({ category, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: category?.name || '',
    description: category?.description || '',
    priority: category?.priority || 'Medium',
    status: category?.status || 'Draft',
    color: category?.color || '#007bff',
    requiredRoles: category?.requiredRoles || [],
    tags: category?.tags?.join(', ') || '',
    validityPeriod: category?.validityPeriod || 12,
    prerequisites: category?.prerequisites || [],
    learningObjectives: category?.learningObjectives || ['']
  });

  const roles = [
    'System Admin', 'Training Coordinator', 'Trainer', 'Trainee',
    'HOD', 'QA Officer', 'HR', 'Auditor', 'Guest Trainer'
  ];

  const allCategories = [
    'GMP Training', 'Safety Procedures', 'Quality Control', 'Validation',
    'Documentation', 'Equipment Training', 'Regulatory Compliance',
    'Software Training', 'Leadership Development'
  ];

  const handleRoleChange = (role, checked) => {
    if (checked) {
      setFormData({ ...formData, requiredRoles: [...formData.requiredRoles, role] });
    } else {
      setFormData({ ...formData, requiredRoles: formData.requiredRoles.filter(r => r !== role) });
    }
  };

  const handlePrerequisiteChange = (prerequisite, checked) => {
    if (checked) {
      setFormData({ ...formData, prerequisites: [...formData.prerequisites, prerequisite] });
    } else {
      setFormData({ ...formData, prerequisites: formData.prerequisites.filter(p => p !== prerequisite) });
    }
  };

  const addLearningObjective = () => {
    setFormData({ ...formData, learningObjectives: [...formData.learningObjectives, ''] });
  };

  const updateLearningObjective = (index, value) => {
    const newObjectives = [...formData.learningObjectives];
    newObjectives[index] = value;
    setFormData({ ...formData, learningObjectives: newObjectives });
  };

  const removeLearningObjective = (index) => {
    const newObjectives = formData.learningObjectives.filter((_, i) => i !== index);
    setFormData({ ...formData, learningObjectives: newObjectives });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const categoryData = {
      ...category,
      ...formData,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      learningObjectives: formData.learningObjectives.filter(obj => obj.trim()),
      lastUpdated: new Date().toISOString()
    };
    
    if (!category) {
      categoryData.id = Date.now();
      categoryData.createdDate = new Date().toISOString();
      categoryData.trainingCount = 0;
      categoryData.completionRate = 0;
    }
    
    onSave(categoryData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ maxWidth: '700px', width: '90%', maxHeight: '90vh', overflow: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ margin: 0 }}>{category ? 'Edit Category' : 'Create New Category'}</h2>
          <button
            onClick={onCancel}
            style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer' }}
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px', marginBottom: '20px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                Category Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #ddd',
                  borderRadius: '4px'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                Color Theme
              </label>
              <input
                type="color"
                value={formData.color}
                onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                style={{
                  width: '100%',
                  height: '42px',
                  padding: '2px',
                  border: '1px solid #ddd',
                  borderRadius: '4px'
                }}
              />
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                resize: 'vertical'
              }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', marginBottom: '20px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                Priority *
              </label>
              <select
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                required
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #ddd',
                  borderRadius: '4px'
                }}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #ddd',
                  borderRadius: '4px'
                }}
              >
                <option value="Draft">Draft</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                Validity (months)
              </label>
              <input
                type="number"
                value={formData.validityPeriod}
                onChange={(e) => setFormData({ ...formData, validityPeriod: parseInt(e.target.value) })}
                min="1"
                max="60"
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #ddd',
                  borderRadius: '4px'
                }}
              />
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Tags (comma-separated)
            </label>
            <input
              type="text"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              placeholder="e.g., safety, compliance, gmp"
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '4px'
              }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>
              Required for Roles
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
              {roles.map(role => (
                <label key={role} style={{ display: 'flex', alignItems: 'center', fontSize: '14px' }}>
                  <input
                    type="checkbox"
                    checked={formData.requiredRoles.includes(role)}
                    onChange={(e) => handleRoleChange(role, e.target.checked)}
                    style={{ marginRight: '8px' }}
                  />
                  {role}
                </label>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>
              Prerequisites
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
              {allCategories.filter(cat => cat !== formData.name).map(cat => (
                <label key={cat} style={{ display: 'flex', alignItems: 'center', fontSize: '14px' }}>
                  <input
                    type="checkbox"
                    checked={formData.prerequisites.includes(cat)}
                    onChange={(e) => handlePrerequisiteChange(cat, e.target.checked)}
                    style={{ marginRight: '8px' }}
                  />
                  {cat}
                </label>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <label style={{ fontWeight: 'bold' }}>Learning Objectives</label>
              <button
                type="button"
                onClick={addLearningObjective}
                style={{
                  padding: '4px 8px',
                  backgroundColor: '#28a745',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  fontSize: '12px',
                  cursor: 'pointer'
                }}
              >
                + Add Objective
              </button>
            </div>
            {formData.learningObjectives.map((objective, index) => (
              <div key={index} style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                <input
                  type="text"
                  value={objective}
                  onChange={(e) => updateLearningObjective(index, e.target.value)}
                  placeholder={`Learning objective ${index + 1}`}
                  style={{
                    flex: 1,
                    padding: '8px',
                    border: '1px solid #ddd',
                    borderRadius: '4px'
                  }}
                />
                {formData.learningObjectives.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeLearningObjective(index)}
                    style={{
                      padding: '8px 12px',
                      backgroundColor: '#dc3545',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
            <button
              type="button"
              onClick={onCancel}
              style={{
                padding: '10px 20px',
                backgroundColor: '#6c757d',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{
                padding: '10px 20px',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              {category ? 'Update' : 'Create'} Category
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Category Details Modal
const CategoryDetailsModal = ({ category, onClose }) => {
  if (!category) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '600px', width: '90%' }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ margin: 0, color: category.color }}>{category.name}</h2>
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer' }}
          >
            ×
          </button>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <h4>Description</h4>
          <p style={{ color: '#666', lineHeight: '1.5' }}>{category.description}</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
          <div>
            <h4>Category Details</h4>
            <div style={{ fontSize: '14px' }}>
              <p><strong>Priority:</strong> {category.priority}</p>
              <p><strong>Status:</strong> {category.status}</p>
              <p><strong>Training Count:</strong> {category.trainingCount}</p>
              <p><strong>Completion Rate:</strong> {category.completionRate}%</p>
              <p><strong>Validity Period:</strong> {category.validityPeriod} months</p>
            </div>
          </div>
          
          <div>
            <h4>Statistics</h4>
            <div style={{ fontSize: '14px' }}>
              <p><strong>Created:</strong> {new Date(category.createdDate).toLocaleDateString()}</p>
              <p><strong>Last Updated:</strong> {new Date(category.lastUpdated).toLocaleDateString()}</p>
              <p><strong>Total Enrollments:</strong> {category.trainingCount * 15}</p>
              <p><strong>Certificates Issued:</strong> {Math.floor(category.trainingCount * 15 * category.completionRate / 100)}</p>
            </div>
          </div>
        </div>

        {category.requiredRoles && category.requiredRoles.length > 0 && (
          <div style={{ marginBottom: '20px' }}>
            <h4>Required for Roles</h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {category.requiredRoles.map(role => (
                <span key={role} style={{
                  padding: '4px 8px',
                  backgroundColor: '#e9ecef',
                  borderRadius: '12px',
                  fontSize: '12px'
                }}>
                  {role}
                </span>
              ))}
            </div>
          </div>
        )}

        {category.prerequisites && category.prerequisites.length > 0 && (
          <div style={{ marginBottom: '20px' }}>
            <h4>Prerequisites</h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {category.prerequisites.map(prereq => (
                <span key={prereq} style={{
                  padding: '4px 8px',
                  backgroundColor: '#fff3cd',
                  borderRadius: '12px',
                  fontSize: '12px'
                }}>
                  {prereq}
                </span>
              ))}
            </div>
          </div>
        )}

        {category.learningObjectives && category.learningObjectives.length > 0 && (
          <div style={{ marginBottom: '20px' }}>
            <h4>Learning Objectives</h4>
            <ul style={{ paddingLeft: '20px' }}>
              {category.learningObjectives.map((objective, index) => (
                <li key={index} style={{ marginBottom: '5px', fontSize: '14px' }}>{objective}</li>
              ))}
            </ul>
          </div>
        )}

        {category.tags && category.tags.length > 0 && (
          <div style={{ marginBottom: '20px' }}>
            <h4>Tags</h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {category.tags.map(tag => (
                <span key={tag} style={{
                  padding: '4px 8px',
                  backgroundColor: '#d1ecf1',
                  borderRadius: '12px',
                  fontSize: '12px'
                }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default function Categories() {
  const { user, hasUserPermission } = useAuth();
  const [categories, setCategories] = useState([
    {
      id: 1,
      name: 'GMP Training',
      description: 'Good Manufacturing Practices training modules covering pharmaceutical and biotechnology manufacturing standards.',
      priority: 'High',
      status: 'Active',
      color: '#007bff',
      trainingCount: 8,
      completionRate: 85,
      requiredRoles: ['System Admin', 'Training Coordinator', 'Trainee', 'QA Officer'],
      tags: ['gmp', 'manufacturing', 'compliance', 'pharmaceutical'],
      validityPeriod: 12,
      prerequisites: [],
      learningObjectives: [
        'Understand fundamental GMP principles',
        'Apply GMP standards in manufacturing processes',
        'Identify and mitigate quality risks'
      ],
      createdDate: '2024-08-01',
      lastUpdated: '2024-10-15'
    },
    {
      id: 2,
      name: 'Safety Procedures',
      description: 'Comprehensive safety training covering laboratory, manufacturing, and office safety protocols.',
      priority: 'High',
      status: 'Active',
      color: '#dc3545',
      trainingCount: 12,
      completionRate: 92,
      requiredRoles: ['Trainee', 'Trainer', 'HOD', 'QA Officer'],
      tags: ['safety', 'emergency', 'procedures', 'health'],
      validityPeriod: 6,
      prerequisites: [],
      learningObjectives: [
        'Implement proper safety procedures',
        'Respond effectively to emergencies',
        'Use personal protective equipment correctly'
      ],
      createdDate: '2024-07-15',
      lastUpdated: '2024-09-20'
    },
    {
      id: 3,
      name: 'Quality Control',
      description: 'Training modules focused on quality control testing, documentation, and compliance requirements.',
      priority: 'High',
      status: 'Active',
      color: '#28a745',
      trainingCount: 6,
      completionRate: 78,
      requiredRoles: ['QA Officer', 'Trainee', 'Auditor'],
      tags: ['quality', 'testing', 'documentation', 'compliance'],
      validityPeriod: 18,
      prerequisites: ['GMP Training'],
      learningObjectives: [
        'Perform quality control tests accurately',
        'Document results according to standards',
        'Identify quality deviations and corrective actions'
      ],
      createdDate: '2024-08-10',
      lastUpdated: '2024-10-01'
    },
    {
      id: 4,
      name: 'Validation',
      description: 'Equipment, process, and system validation training modules for regulated environments.',
      priority: 'Medium',
      status: 'Active',
      color: '#17a2b8',
      trainingCount: 4,
      completionRate: 88,
      requiredRoles: ['System Admin', 'QA Officer', 'Auditor'],
      tags: ['validation', 'equipment', 'process', 'qualification'],
      validityPeriod: 24,
      prerequisites: ['GMP Training', 'Quality Control'],
      learningObjectives: [
        'Understand validation principles and requirements',
        'Execute validation protocols effectively',
        'Document validation activities properly'
      ],
      createdDate: '2024-09-01',
      lastUpdated: '2024-10-10'
    },
    {
      id: 5,
      name: 'Documentation',
      description: 'Training on proper documentation practices, record keeping, and regulatory requirements.',
      priority: 'Medium',
      status: 'Active',
      color: '#ffc107',
      trainingCount: 3,
      completionRate: 82,
      requiredRoles: ['Training Coordinator', 'Trainee', 'QA Officer', 'HR'],
      tags: ['documentation', 'records', 'regulatory', 'sop'],
      validityPeriod: 12,
      prerequisites: [],
      learningObjectives: [
        'Create and maintain accurate documentation',
        'Follow document control procedures',
        'Ensure regulatory compliance in record keeping'
      ],
      createdDate: '2024-08-20',
      lastUpdated: '2024-09-30'
    },
    {
      id: 6,
      name: 'Leadership Development',
      description: 'Management and leadership training for supervisors and department heads.',
      priority: 'Low',
      status: 'Draft',
      color: '#6f42c1',
      trainingCount: 0,
      completionRate: 0,
      requiredRoles: ['HOD', 'Training Coordinator', 'HR'],
      tags: ['leadership', 'management', 'communication', 'development'],
      validityPeriod: 36,
      prerequisites: [],
      learningObjectives: [
        'Develop effective leadership skills',
        'Improve team communication and collaboration',
        'Implement performance management strategies'
      ],
      createdDate: '2024-10-01',
      lastUpdated: '2024-10-25'
    }
  ]);

  const [filteredCategories, setFilteredCategories] = useState(categories);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [notification, setNotification] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    status: '',
    priority: ''
  });

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  // Apply filters
  useEffect(() => {
    let filtered = categories.filter(category => {
      const matchesSearch = category.name.toLowerCase().includes(filters.search.toLowerCase()) ||
                           category.description.toLowerCase().includes(filters.search.toLowerCase()) ||
                           category.tags.some(tag => tag.toLowerCase().includes(filters.search.toLowerCase()));
      const matchesStatus = !filters.status || category.status === filters.status;
      const matchesPriority = !filters.priority || category.priority === filters.priority;
      
      return matchesSearch && matchesStatus && matchesPriority;
    });

    setFilteredCategories(filtered);
  }, [categories, filters]);

  const handleAddCategory = () => {
    if (!hasUserPermission(MODULES.CATEGORIES, PERMISSIONS.CREATE)) {
      showNotification('You do not have permission to create categories.', 'error');
      return;
    }
    setSelectedCategory(null);
    setShowForm(true);
  };

  const handleEditCategory = (category) => {
    if (!hasUserPermission(MODULES.CATEGORIES, PERMISSIONS.UPDATE)) {
      showNotification('You do not have permission to edit categories.', 'error');
      return;
    }
    setSelectedCategory(category);
    setShowForm(true);
  };

  const handleDeleteCategory = (category) => {
    if (!hasUserPermission(MODULES.CATEGORIES, PERMISSIONS.DELETE)) {
      showNotification('You do not have permission to delete categories.', 'error');
      return;
    }

    if (confirm(`Are you sure you want to delete "${category.name}"?`)) {
      setCategories(prev => prev.filter(c => c.id !== category.id));
      showNotification('Category deleted successfully!');
    }
  };

  const handleViewCategory = (category) => {
    setSelectedCategory(category);
    setShowDetails(true);
  };

  const handleSaveCategory = (categoryData) => {
    if (selectedCategory) {
      setCategories(prev => prev.map(c => c.id === selectedCategory.id ? categoryData : c));
      showNotification('Category updated successfully!');
    } else {
      setCategories(prev => [...prev, categoryData]);
      showNotification('Category created successfully!');
    }
    setShowForm(false);
    setSelectedCategory(null);
  };

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({ ...prev, [filterName]: value }));
  };

  const clearFilters = () => {
    setFilters({ search: '', status: '', priority: '' });
  };

  if (!hasUserPermission(MODULES.CATEGORIES, PERMISSIONS.READ)) {
    return (
      <Layout>
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <h2 style={{ color: '#dc3545' }}>Access Denied</h2>
          <p>You do not have permission to access Categories.</p>
        </div>
      </Layout>
    );
  }

  const activeCategories = categories.filter(c => c.status === 'Active');
  const draftCategories = categories.filter(c => c.status === 'Draft');
  const highPriorityCategories = categories.filter(c => c.priority === 'High');

  return (
    <Layout>
      <div>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <div>
            <h2 style={{ margin: 0, color: '#333' }}>Training Categories</h2>
            <p style={{ margin: '5px 0 0 0', color: '#666' }}>
              Manage training categories and learning paths
            </p>
          </div>
          
          {hasUserPermission(MODULES.CATEGORIES, PERMISSIONS.CREATE) && (
            <button
              onClick={handleAddCategory}
              style={{
                padding: '10px 20px',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              + Create Category
            </button>
          )}
        </div>

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

        {/* Statistics */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '20px', 
          marginBottom: '30px' 
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            border: '3px solid #007bff'
          }}>
            <h3 style={{ margin: '0 0 10px 0', color: '#666' }}>Total Categories</h3>
            <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#007bff' }}>
              {categories.length}
            </div>
          </div>
          
          <div style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            border: '3px solid #28a745'
          }}>
            <h3 style={{ margin: '0 0 10px 0', color: '#666' }}>Active Categories</h3>
            <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#28a745' }}>
              {activeCategories.length}
            </div>
          </div>
          
          <div style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            border: '3px solid #ffc107'
          }}>
            <h3 style={{ margin: '0 0 10px 0', color: '#666' }}>Draft Categories</h3>
            <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#ffc107' }}>
              {draftCategories.length}
            </div>
          </div>
          
          <div style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            border: '3px solid #dc3545'
          }}>
            <h3 style={{ margin: '0 0 10px 0', color: '#666' }}>High Priority</h3>
            <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#dc3545' }}>
              {highPriorityCategories.length}
            </div>
          </div>
        </div>

        {/* Filters */}
        <div style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          marginBottom: '30px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
            <h3 style={{ margin: 0 }}>Filters</h3>
            <button
              onClick={clearFilters}
              style={{
                padding: '6px 12px',
                backgroundColor: '#6c757d',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                fontSize: '12px',
                cursor: 'pointer'
              }}
            >
              Clear All
            </button>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px' }}>
            <input
              type="text"
              placeholder="Search categories..."
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              style={{
                padding: '8px',
                border: '1px solid #ddd',
                borderRadius: '4px'
              }}
            />
            
            <select
              value={filters.status}
              onChange={(e) => handleFilterChange('status', e.target.value)}
              style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
            >
              <option value="">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Draft">Draft</option>
              <option value="Inactive">Inactive</option>
            </select>
            
            <select
              value={filters.priority}
              onChange={(e) => handleFilterChange('priority', e.target.value)}
              style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
            >
              <option value="">All Priorities</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
          
          <div style={{ marginTop: '10px', fontSize: '14px', color: '#666' }}>
            Showing {filteredCategories.length} of {categories.length} categories
          </div>
        </div>

        {/* Categories Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', 
          gap: '20px' 
        }}>
          {filteredCategories.map(category => (
            <CategoryCard
              key={category.id}
              category={category}
              onView={handleViewCategory}
              onEdit={handleEditCategory}
              onDelete={handleDeleteCategory}
              canEdit={hasUserPermission(MODULES.CATEGORIES, PERMISSIONS.UPDATE)}
              canDelete={hasUserPermission(MODULES.CATEGORIES, PERMISSIONS.DELETE)}
            />
          ))}
        </div>

        {filteredCategories.length === 0 && (
          <div style={{
            backgroundColor: 'white',
            padding: '50px',
            borderRadius: '8px',
            textAlign: 'center',
            color: '#666'
          }}>
            <h3>No categories found</h3>
            <p>No categories match your current filter criteria.</p>
          </div>
        )}

        {/* Category Form Modal */}
        {showForm && (
          <CategoryForm
            category={selectedCategory}
            onSave={handleSaveCategory}
            onCancel={() => {
              setShowForm(false);
              setSelectedCategory(null);
            }}
          />
        )}

        {/* Category Details Modal */}
        {showDetails && (
          <CategoryDetailsModal
            category={selectedCategory}
            onClose={() => {
              setShowDetails(false);
              setSelectedCategory(null);
            }}
          />
        )}
      </div>
    </Layout>
  );
}