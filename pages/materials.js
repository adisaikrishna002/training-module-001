import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { useAuth } from '../components/AuthContext';
import { PERMISSIONS, MODULES } from '../utils/rbac';

// File Icon Component
const FileIcon = ({ fileType }) => {
  const getIconColor = (type) => {
    switch (type.toLowerCase()) {
      case 'pdf': return '#dc3545';
      case 'ppt':
      case 'pptx': return '#fd7e14';
      case 'doc':
      case 'docx': return '#0d6efd';
      case 'mp4':
      case 'avi':
      case 'mov': return '#6f42c1';
      case 'zip':
      case 'scorm': return '#198754';
      case 'jpg':
      case 'png':
      case 'gif': return '#20c997';
      default: return '#6c757d';
    }
  };

  return (
    <div style={{
      width: '40px',
      height: '40px',
      borderRadius: '8px',
      backgroundColor: getIconColor(fileType),
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '12px',
      fontWeight: 'bold'
    }}>
      {fileType.toUpperCase()}
    </div>
  );
};

// Material Card Component
const MaterialCard = ({ material, onView, onEdit, onDelete, onDownload, canEdit, canDelete }) => {
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return '#28a745';
      case 'Draft': return '#ffc107';
      case 'Archived': return '#6c757d';
      case 'Under Review': return '#17a2b8';
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
        <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
          <FileIcon fileType={material.fileType} />
          <div style={{ flex: 1 }}>
            <h3 style={{ margin: '0 0 5px 0', fontSize: '16px' }}>{material.title}</h3>
            <p style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#666', lineHeight: '1.4' }}>
              {material.description}
            </p>
          </div>
        </div>
        
        <span style={{
          padding: '4px 8px',
          borderRadius: '12px',
          fontSize: '12px',
          fontWeight: 'bold',
          backgroundColor: getStatusColor(material.status),
          color: 'white'
        }}>
          {material.status}
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '15px', fontSize: '14px' }}>
        <div>
          <strong>Category:</strong><br />
          <span style={{ color: '#007bff' }}>{material.category}</span>
        </div>
        <div>
          <strong>Version:</strong><br />
          v{material.version}
        </div>
        <div>
          <strong>Author:</strong><br />
          {material.author}
        </div>
        <div>
          <strong>Size:</strong><br />
          {formatFileSize(material.fileSize)}
        </div>
      </div>

      <div style={{ fontSize: '12px', color: '#666', marginBottom: '15px' }}>
        <div>Created: {new Date(material.createdDate).toLocaleDateString()}</div>
        <div>Last Modified: {new Date(material.lastModified).toLocaleDateString()}</div>
        {material.tags && material.tags.length > 0 && (
          <div style={{ marginTop: '8px' }}>
            <strong>Tags:</strong> {material.tags.map(tag => (
              <span key={tag} style={{
                display: 'inline-block',
                backgroundColor: '#e9ecef',
                color: '#495057',
                padding: '2px 6px',
                borderRadius: '4px',
                fontSize: '11px',
                marginLeft: '4px'
              }}>
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        <button
          onClick={() => onView(material)}
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
          View
        </button>
        
        <button
          onClick={() => onDownload(material)}
          style={{
            padding: '8px 16px',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontSize: '12px',
            cursor: 'pointer'
          }}
        >
          Download
        </button>
        
        {canEdit && (
          <button
            onClick={() => onEdit(material)}
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
        
        {canDelete && material.status !== 'Active' && (
          <button
            onClick={() => onDelete(material)}
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

// Material Form Component
const MaterialForm = ({ material, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    title: material?.title || '',
    description: material?.description || '',
    category: material?.category || '',
    tags: material?.tags?.join(', ') || '',
    status: material?.status || 'Draft',
    file: null
  });

  const categories = [
    'SOPs', 'Guidelines', 'Forms', 'Templates', 'Presentations',
    'Videos', 'Interactive Content', 'Reference Materials', 'Compliance Documents'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const materialData = {
      ...material,
      ...formData,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      lastModified: new Date().toISOString(),
      version: material ? material.version + 0.1 : 1.0
    };
    
    if (!material) {
      materialData.id = Date.now();
      materialData.createdDate = new Date().toISOString();
      materialData.author = 'Current User'; // Would be dynamic in real app
      materialData.fileSize = formData.file ? formData.file.size : 0;
      materialData.fileType = formData.file ? formData.file.name.split('.').pop() : 'unknown';
    }
    
    onSave(materialData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ maxWidth: '600px', width: '90%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ margin: 0 }}>{material ? 'Edit Material' : 'Add New Material'}</h2>
          <button
            onClick={onCancel}
            style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer' }}
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '4px'
              }}
            />
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

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                Category *
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                required
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #ddd',
                  borderRadius: '4px'
                }}
              >
                <option value="">Select Category</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
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
                <option value="Under Review">Under Review</option>
                <option value="Active">Active</option>
                <option value="Archived">Archived</option>
              </select>
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

          {!material && (
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                File *
              </label>
              <input
                type="file"
                onChange={(e) => setFormData({ ...formData, file: e.target.files[0] })}
                required
                accept=".pdf,.ppt,.pptx,.doc,.docx,.mp4,.avi,.mov,.zip,.jpg,.png,.gif"
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #ddd',
                  borderRadius: '4px'
                }}
              />
              <small style={{ color: '#666' }}>
                Supported formats: PDF, PPT, DOC, Video, Images, ZIP/SCORM
              </small>
            </div>
          )}

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
              {material ? 'Update' : 'Add'} Material
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default function Materials() {
  const { user, hasUserPermission } = useAuth();
  const [materials, setMaterials] = useState([
    {
      id: 1,
      title: 'GMP Guidelines Document',
      description: 'Comprehensive guidelines for Good Manufacturing Practices in pharmaceutical environments.',
      category: 'Guidelines',
      author: 'John Smith',
      fileType: 'pdf',
      fileSize: 2048000, // 2MB
      version: 2.1,
      status: 'Active',
      createdDate: '2024-09-01',
      lastModified: '2024-10-15',
      tags: ['gmp', 'guidelines', 'manufacturing', 'compliance']
    },
    {
      id: 2,
      title: 'Laboratory Safety Training Video',
      description: 'Interactive video training module covering essential laboratory safety procedures.',
      category: 'Videos',
      author: 'Sarah Johnson',
      fileType: 'mp4',
      fileSize: 15728640, // 15MB
      version: 1.0,
      status: 'Active',
      createdDate: '2024-09-15',
      lastModified: '2024-09-15',
      tags: ['safety', 'laboratory', 'training', 'video']
    },
    {
      id: 3,
      title: 'Quality Control SOP Template',
      description: 'Standard Operating Procedure template for quality control processes.',
      category: 'Templates',
      author: 'Lisa Chen',
      fileType: 'docx',
      fileSize: 524288, // 512KB
      version: 1.5,
      status: 'Under Review',
      createdDate: '2024-10-01',
      lastModified: '2024-10-20',
      tags: ['sop', 'quality', 'template', 'process']
    },
    {
      id: 4,
      title: 'SCORM Training Package - Validation',
      description: 'Interactive SCORM package for validation process training.',
      category: 'Interactive Content',
      author: 'Mike Wilson',
      fileType: 'scorm',
      fileSize: 31457280, // 30MB
      version: 1.2,
      status: 'Active',
      createdDate: '2024-08-20',
      lastModified: '2024-09-10',
      tags: ['scorm', 'validation', 'interactive', 'elearning']
    },
    {
      id: 5,
      title: 'Equipment Maintenance Form',
      description: 'Standardized form for recording equipment maintenance activities.',
      category: 'Forms',
      author: 'Bob Smith',
      fileType: 'pdf',
      fileSize: 204800, // 200KB
      version: 3.0,
      status: 'Draft',
      createdDate: '2024-10-18',
      lastModified: '2024-10-25',
      tags: ['maintenance', 'equipment', 'form', 'documentation']
    }
  ]);

  const [filteredMaterials, setFilteredMaterials] = useState(materials);
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [notification, setNotification] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    status: '',
    fileType: ''
  });

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  // Apply filters
  useEffect(() => {
    let filtered = materials.filter(material => {
      const matchesSearch = material.title.toLowerCase().includes(filters.search.toLowerCase()) ||
                           material.description.toLowerCase().includes(filters.search.toLowerCase()) ||
                           material.author.toLowerCase().includes(filters.search.toLowerCase()) ||
                           material.tags.some(tag => tag.toLowerCase().includes(filters.search.toLowerCase()));
      const matchesCategory = !filters.category || material.category === filters.category;
      const matchesStatus = !filters.status || material.status === filters.status;
      const matchesFileType = !filters.fileType || material.fileType === filters.fileType;
      
      return matchesSearch && matchesCategory && matchesStatus && matchesFileType;
    });

    setFilteredMaterials(filtered);
  }, [materials, filters]);

  const handleAddMaterial = () => {
    if (!hasUserPermission(MODULES.MATERIALS, PERMISSIONS.CREATE)) {
      showNotification('You do not have permission to add materials.', 'error');
      return;
    }
    setSelectedMaterial(null);
    setShowForm(true);
  };

  const handleEditMaterial = (material) => {
    if (!hasUserPermission(MODULES.MATERIALS, PERMISSIONS.UPDATE)) {
      showNotification('You do not have permission to edit materials.', 'error');
      return;
    }
    setSelectedMaterial(material);
    setShowForm(true);
  };

  const handleDeleteMaterial = (material) => {
    if (!hasUserPermission(MODULES.MATERIALS, PERMISSIONS.DELETE)) {
      showNotification('You do not have permission to delete materials.', 'error');
      return;
    }

    if (confirm(`Are you sure you want to delete "${material.title}"?`)) {
      setMaterials(prev => prev.filter(m => m.id !== material.id));
      showNotification('Material deleted successfully!');
    }
  };

  const handleSaveMaterial = (materialData) => {
    if (selectedMaterial) {
      setMaterials(prev => prev.map(m => m.id === selectedMaterial.id ? materialData : m));
      showNotification('Material updated successfully!');
    } else {
      setMaterials(prev => [...prev, materialData]);
      showNotification('Material added successfully!');
    }
    setShowForm(false);
    setSelectedMaterial(null);
  };

  const handleViewMaterial = (material) => {
    showNotification(`Opening ${material.title}...`, 'info');
    // In a real app, this would open the file viewer
  };

  const handleDownloadMaterial = (material) => {
    showNotification(`Downloading ${material.title}...`, 'info');
    // In a real app, this would trigger the download
  };

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({ ...prev, [filterName]: value }));
  };

  const clearFilters = () => {
    setFilters({ search: '', category: '', status: '', fileType: '' });
  };

  if (!hasUserPermission(MODULES.MATERIALS, PERMISSIONS.READ)) {
    return (
      <Layout>
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <h2 style={{ color: '#dc3545' }}>Access Denied</h2>
          <p>You do not have permission to access Materials.</p>
        </div>
      </Layout>
    );
  }

  const categories = [...new Set(materials.map(m => m.category))];
  const fileTypes = [...new Set(materials.map(m => m.fileType))];
  const activeMaterials = materials.filter(m => m.status === 'Active');
  const draftMaterials = materials.filter(m => m.status === 'Draft');

  return (
    <Layout>
      <div>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <div>
            <h2 style={{ margin: 0, color: '#333' }}>Materials Library</h2>
            <p style={{ margin: '5px 0 0 0', color: '#666' }}>
              Manage training materials and learning resources
            </p>
          </div>
          
          {hasUserPermission(MODULES.MATERIALS, PERMISSIONS.CREATE) && (
            <button
              onClick={handleAddMaterial}
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
              + Add Material
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
            <h3 style={{ margin: '0 0 10px 0', color: '#666' }}>Total Materials</h3>
            <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#007bff' }}>
              {materials.length}
            </div>
          </div>
          
          <div style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            border: '3px solid #28a745'
          }}>
            <h3 style={{ margin: '0 0 10px 0', color: '#666' }}>Active Materials</h3>
            <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#28a745' }}>
              {activeMaterials.length}
            </div>
          </div>
          
          <div style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            border: '3px solid #ffc107'
          }}>
            <h3 style={{ margin: '0 0 10px 0', color: '#666' }}>Draft Materials</h3>
            <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#ffc107' }}>
              {draftMaterials.length}
            </div>
          </div>
          
          <div style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            border: '3px solid #17a2b8'
          }}>
            <h3 style={{ margin: '0 0 10px 0', color: '#666' }}>Categories</h3>
            <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#17a2b8' }}>
              {categories.length}
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
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
            <input
              type="text"
              placeholder="Search materials..."
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              style={{
                padding: '8px',
                border: '1px solid #ddd',
                borderRadius: '4px'
              }}
            />
            
            <select
              value={filters.category}
              onChange={(e) => handleFilterChange('category', e.target.value)}
              style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            
            <select
              value={filters.status}
              onChange={(e) => handleFilterChange('status', e.target.value)}
              style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
            >
              <option value="">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Draft">Draft</option>
              <option value="Under Review">Under Review</option>
              <option value="Archived">Archived</option>
            </select>
            
            <select
              value={filters.fileType}
              onChange={(e) => handleFilterChange('fileType', e.target.value)}
              style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
            >
              <option value="">All File Types</option>
              {fileTypes.map(type => (
                <option key={type} value={type}>{type.toUpperCase()}</option>
              ))}
            </select>
          </div>
          
          <div style={{ marginTop: '10px', fontSize: '14px', color: '#666' }}>
            Showing {filteredMaterials.length} of {materials.length} materials
          </div>
        </div>

        {/* Materials Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', 
          gap: '20px' 
        }}>
          {filteredMaterials.map(material => (
            <MaterialCard
              key={material.id}
              material={material}
              onView={handleViewMaterial}
              onEdit={handleEditMaterial}
              onDelete={handleDeleteMaterial}
              onDownload={handleDownloadMaterial}
              canEdit={hasUserPermission(MODULES.MATERIALS, PERMISSIONS.UPDATE)}
              canDelete={hasUserPermission(MODULES.MATERIALS, PERMISSIONS.DELETE)}
            />
          ))}
        </div>

        {filteredMaterials.length === 0 && (
          <div style={{
            backgroundColor: 'white',
            padding: '50px',
            borderRadius: '8px',
            textAlign: 'center',
            color: '#666'
          }}>
            <h3>No materials found</h3>
            <p>No materials match your current filter criteria.</p>
          </div>
        )}

        {/* Material Form Modal */}
        {showForm && (
          <MaterialForm
            material={selectedMaterial}
            onSave={handleSaveMaterial}
            onCancel={() => {
              setShowForm(false);
              setSelectedMaterial(null);
            }}
          />
        )}
      </div>
    </Layout>
  );
}