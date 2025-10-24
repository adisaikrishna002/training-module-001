import { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import { useAuth } from '../../components/AuthContext';
import { MOCK_TRAININGS, MOCK_USERS, MOCK_USER_TRAININGS } from '../../data/mockData';
import { PERMISSIONS, MODULES, ROLES, ROLE_LABELS } from '../../utils/rbac';

// Assignment Modal Component
const AssignmentModal = ({ isOpen, onClose, training, onAssign }) => {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [notifications, setNotifications] = useState({
    email: true,
    inApp: true,
    reminder30: true,
    reminder15: true,
    reminder3: true
  });
  const [filterRole, setFilterRole] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (training) {
      setDueDate(training.endDate || '');
    }
  }, [training]);

  if (!isOpen || !training) return null;

  const availableUsers = MOCK_USERS.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = !filterRole || user.role === filterRole;
    const matchesDepartment = !filterDepartment || user.department === filterDepartment;
    
    return user.active && matchesSearch && matchesRole && matchesDepartment;
  });

  const handleUserSelect = (userId) => {
    setSelectedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const handleSelectAll = () => {
    if (selectedUsers.length === availableUsers.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(availableUsers.map(user => user.id));
    }
  };

  const handleAssign = () => {
    if (selectedUsers.length === 0) {
      alert('Please select at least one user to assign.');
      return;
    }
    if (!dueDate) {
      alert('Please select a due date.');
      return;
    }

    const assignmentData = {
      trainingId: training.id,
      userIds: selectedUsers,
      dueDate,
      priority,
      notifications,
      assignedBy: 'Current User',
      assignedDate: new Date().toISOString()
    };

    onAssign(assignmentData);
    onClose();
  };

  const departments = [...new Set(MOCK_USERS.map(user => user.department))];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '800px', width: '90%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ margin: 0 }}>Assign Training: {training.title}</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer' }}>×</button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
          {/* User Selection */}
          <div>
            <h3>Select Users</h3>
            
            {/* Filters */}
            <div style={{ marginBottom: '20px' }}>
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  marginBottom: '10px'
                }}
              />
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <select
                  value={filterRole}
                  onChange={(e) => setFilterRole(e.target.value)}
                  style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                >
                  <option value="">All Roles</option>
                  {Object.entries(ROLE_LABELS).map(([value, label]) => (
                    <option key={value} value={value}>{label}</option>
                  ))}
                </select>
                
                <select
                  value={filterDepartment}
                  onChange={(e) => setFilterDepartment(e.target.value)}
                  style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                >
                  <option value="">All Departments</option>
                  {departments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Select All */}
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', fontWeight: 'bold' }}>
                <input
                  type="checkbox"
                  checked={selectedUsers.length === availableUsers.length && availableUsers.length > 0}
                  onChange={handleSelectAll}
                  style={{ marginRight: '8px' }}
                />
                Select All ({availableUsers.length} users)
              </label>
            </div>

            {/* User List */}
            <div style={{ 
              maxHeight: '300px', 
              overflowY: 'auto', 
              border: '1px solid #ddd', 
              borderRadius: '4px',
              padding: '10px'
            }}>
              {availableUsers.map(user => (
                <label
                  key={user.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '8px',
                    cursor: 'pointer',
                    borderRadius: '4px',
                    backgroundColor: selectedUsers.includes(user.id) ? '#e3f2fd' : 'transparent'
                  }}
                  onMouseOver={(e) => e.target.style.backgroundColor = '#f5f5f5'}
                  onMouseOut={(e) => e.target.style.backgroundColor = selectedUsers.includes(user.id) ? '#e3f2fd' : 'transparent'}
                >
                  <input
                    type="checkbox"
                    checked={selectedUsers.includes(user.id)}
                    onChange={() => handleUserSelect(user.id)}
                    style={{ marginRight: '10px' }}
                  />
                  <div>
                    <div style={{ fontWeight: 'bold' }}>{user.name}</div>
                    <div style={{ fontSize: '12px', color: '#666' }}>
                      {ROLE_LABELS[user.role]} • {user.department}
                    </div>
                  </div>
                </label>
              ))}
              
              {availableUsers.length === 0 && (
                <div style={{ textAlign: 'center', color: '#666', padding: '20px' }}>
                  No users found matching your criteria.
                </div>
              )}
            </div>

            <div style={{ marginTop: '10px', fontSize: '14px', color: '#666' }}>
              {selectedUsers.length} user(s) selected
            </div>
          </div>

          {/* Assignment Configuration */}
          <div>
            <h3>Assignment Settings</h3>
            
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Due Date *</label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #ddd',
                  borderRadius: '4px'
                }}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Priority</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
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
                <option value="Critical">Critical</option>
              </select>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ marginBottom: '10px' }}>Notification Settings</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={notifications.email}
                    onChange={(e) => setNotifications(prev => ({ ...prev, email: e.target.checked }))}
                    style={{ marginRight: '8px' }}
                  />
                  Send Email Notification
                </label>
                <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={notifications.inApp}
                    onChange={(e) => setNotifications(prev => ({ ...prev, inApp: e.target.checked }))}
                    style={{ marginRight: '8px' }}
                  />
                  Send In-App Notification
                </label>
                <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={notifications.reminder30}
                    onChange={(e) => setNotifications(prev => ({ ...prev, reminder30: e.target.checked }))}
                    style={{ marginRight: '8px' }}
                  />
                  30-day Reminder
                </label>
                <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={notifications.reminder15}
                    onChange={(e) => setNotifications(prev => ({ ...prev, reminder15: e.target.checked }))}
                    style={{ marginRight: '8px' }}
                  />
                  15-day Reminder
                </label>
                <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={notifications.reminder3}
                    onChange={(e) => setNotifications(prev => ({ ...prev, reminder3: e.target.checked }))}
                    style={{ marginRight: '8px' }}
                  />
                  3-day Final Reminder
                </label>
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '30px', borderTop: '1px solid #e0e0e0', paddingTop: '20px' }}>
          <button
            onClick={onClose}
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
            onClick={handleAssign}
            style={{
              padding: '10px 20px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            Assign Training ({selectedUsers.length} users)
          </button>
        </div>
      </div>
    </div>
  );
};

// Training Card Component
const TrainingCard = ({ training, onAssign, onEdit, onDelete, userRole }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return '#28a745';
      case 'Draft': return '#6c757d';
      case 'Completed': return '#17a2b8';
      case 'Archived': return '#ffc107';
      default: return '#6c757d';
    }
  };

  const getCompletionRate = () => {
    if (training.assignedCount === 0) return 0;
    return Math.round((training.completedCount / training.assignedCount) * 100);
  };

  const isOverdue = new Date(training.endDate) < new Date();

  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '10px',
      padding: '20px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      border: isOverdue && training.status === 'Active' ? '2px solid #dc3545' : '1px solid #e0e0e0',
      position: 'relative'
    }}>
      {isOverdue && training.status === 'Active' && (
        <div style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          backgroundColor: '#dc3545',
          color: 'white',
          padding: '4px 8px',
          borderRadius: '12px',
          fontSize: '12px',
          fontWeight: 'bold'
        }}>
          OVERDUE
        </div>
      )}

      <div style={{ marginBottom: '15px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
          <h3 style={{ margin: 0, fontSize: '18px', color: '#333' }}>{training.title}</h3>
          <span style={{
            padding: '4px 12px',
            borderRadius: '12px',
            fontSize: '12px',
            fontWeight: 'bold',
            backgroundColor: getStatusColor(training.status),
            color: 'white'
          }}>
            {training.status}
          </span>
        </div>
        
        <p style={{ 
          margin: '0 0 10px 0', 
          color: '#666', 
          fontSize: '14px',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden'
        }}>
          {training.description}
        </p>
        
        <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', fontSize: '12px', color: '#888' }}>
          <span>📚 {training.category}</span>
          <span>🎓 {training.type}</span>
          <span>⏱️ {training.duration} min</span>
          <span>👨‍🏫 {training.trainer}</span>
        </div>
      </div>

      <div style={{ marginBottom: '15px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '5px' }}>
          <span>Progress</span>
          <span>{getCompletionRate()}% Complete</span>
        </div>
        <div style={{
          width: '100%',
          height: '6px',
          backgroundColor: '#e9ecef',
          borderRadius: '3px',
          overflow: 'hidden'
        }}>
          <div style={{
            width: `${getCompletionRate()}%`,
            height: '100%',
            backgroundColor: getCompletionRate() >= 80 ? '#28a745' : getCompletionRate() >= 50 ? '#ffc107' : '#dc3545',
            transition: 'width 0.3s ease'
          }} />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', marginBottom: '15px', fontSize: '14px' }}>
        <div style={{ textAlign: 'center', padding: '8px', backgroundColor: '#f8f9fa', borderRadius: '4px' }}>
          <div style={{ fontWeight: 'bold', color: '#007bff' }}>{training.assignedCount}</div>
          <div style={{ fontSize: '12px', color: '#666' }}>Assigned</div>
        </div>
        <div style={{ textAlign: 'center', padding: '8px', backgroundColor: '#f8f9fa', borderRadius: '4px' }}>
          <div style={{ fontWeight: 'bold', color: '#28a745' }}>{training.completedCount}</div>
          <div style={{ fontSize: '12px', color: '#666' }}>Completed</div>
        </div>
        <div style={{ textAlign: 'center', padding: '8px', backgroundColor: '#f8f9fa', borderRadius: '4px' }}>
          <div style={{ fontWeight: 'bold', color: '#dc3545' }}>{training.overdueCount}</div>
          <div style={{ fontSize: '12px', color: '#666' }}>Overdue</div>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', color: '#666', marginBottom: '15px' }}>
        <span>Due: {new Date(training.endDate).toLocaleDateString()}</span>
        <span>Created: {new Date(training.startDate).toLocaleDateString()}</span>
      </div>

      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        <button
          onClick={() => onAssign(training)}
          style={{
            padding: '8px 16px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontSize: '12px',
            cursor: 'pointer',
            flex: 1,
            minWidth: '100px'
          }}
        >
          Assign Users
        </button>
        
        {(userRole === ROLES.SYSTEM_ADMIN || userRole === ROLES.TRAINING_COORDINATOR) && (
          <>
            <button
              onClick={() => onEdit(training)}
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
            
            <button
              onClick={() => onDelete(training)}
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
          </>
        )}
      </div>
    </div>
  );
};

export default function TrainingAssignments() {
  const { user, hasUserPermission } = useAuth();
  const [trainings, setTrainings] = useState(MOCK_TRAININGS);
  const [filteredTrainings, setFilteredTrainings] = useState(MOCK_TRAININGS);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedTraining, setSelectedTraining] = useState(null);
  const [notification, setNotification] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    type: '',
    status: '',
    trainer: ''
  });

  useEffect(() => {
    // Apply filters
    let filtered = trainings.filter(training => {
      const matchesSearch = training.title.toLowerCase().includes(filters.search.toLowerCase()) ||
                           training.description.toLowerCase().includes(filters.search.toLowerCase());
      const matchesCategory = !filters.category || training.category === filters.category;
      const matchesType = !filters.type || training.type === filters.type;
      const matchesStatus = !filters.status || training.status === filters.status;
      const matchesTrainer = !filters.trainer || training.trainer === filters.trainer;
      
      return matchesSearch && matchesCategory && matchesType && matchesStatus && matchesTrainer;
    });

    setFilteredTrainings(filtered);
  }, [trainings, filters]);

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleAssign = (training) => {
    if (!hasUserPermission(MODULES.TRAINING_ASSIGNMENTS, PERMISSIONS.CREATE)) {
      showNotification('You do not have permission to assign trainings.', 'error');
      return;
    }
    setSelectedTraining(training);
    setShowAssignModal(true);
  };

  const handleAssignmentSubmit = (assignmentData) => {
    // Here you would typically send the assignment data to your backend
    console.log('Assignment Data:', assignmentData);
    
    // Update training statistics (mock)
    setTrainings(prev => prev.map(training => 
      training.id === assignmentData.trainingId 
        ? { ...training, assignedCount: training.assignedCount + assignmentData.userIds.length }
        : training
    ));
    
    showNotification(`Training assigned to ${assignmentData.userIds.length} user(s) successfully!`);
    setShowAssignModal(false);
    setSelectedTraining(null);
  };

  const handleEdit = (training) => {
    // Redirect to edit page
    window.location.href = `/training/edit/${training.id}`;
  };

  const handleDelete = (training) => {
    if (!hasUserPermission(MODULES.TRAINING_ASSIGNMENTS, PERMISSIONS.DELETE)) {
      showNotification('You do not have permission to delete trainings.', 'error');
      return;
    }
    
    if (confirm(`Are you sure you want to delete "${training.title}"? This action cannot be undone.`)) {
      setTrainings(prev => prev.filter(t => t.id !== training.id));
      showNotification('Training deleted successfully!');
    }
  };

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({ ...prev, [filterName]: value }));
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      category: '',
      type: '',
      status: '',
      trainer: ''
    });
  };

  if (!hasUserPermission(MODULES.TRAINING_ASSIGNMENTS, PERMISSIONS.READ)) {
    return (
      <Layout>
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <h2 style={{ color: '#dc3545' }}>Access Denied</h2>
          <p>You do not have permission to access Training Assignments.</p>
        </div>
      </Layout>
    );
  }

  const categories = [...new Set(trainings.map(t => t.category))];
  const types = [...new Set(trainings.map(t => t.type))];
  const statuses = [...new Set(trainings.map(t => t.status))];
  const trainers = [...new Set(trainings.map(t => t.trainer))];

  return (
    <Layout>
      <div>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <div>
            <h2 style={{ margin: 0, color: '#333' }}>Training Assignments</h2>
            <p style={{ margin: '5px 0 0 0', color: '#666' }}>
              Manage and assign training programs to users
            </p>
          </div>
          {hasUserPermission(MODULES.TRAINING_CREATION, PERMISSIONS.CREATE) && (
            <button
              onClick={() => window.location.href = '/training/create'}
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
              + Create New Training
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
            <h3 style={{ margin: '0 0 10px 0', color: '#666' }}>Total Trainings</h3>
            <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#007bff' }}>
              {trainings.length}
            </div>
          </div>
          
          <div style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            border: '3px solid #28a745'
          }}>
            <h3 style={{ margin: '0 0 10px 0', color: '#666' }}>Active Trainings</h3>
            <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#28a745' }}>
              {trainings.filter(t => t.status === 'Active').length}
            </div>
          </div>
          
          <div style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            border: '3px solid #ffc107'
          }}>
            <h3 style={{ margin: '0 0 10px 0', color: '#666' }}>Total Assignments</h3>
            <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#ffc107' }}>
              {trainings.reduce((sum, t) => sum + t.assignedCount, 0)}
            </div>
          </div>
          
          <div style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            border: '3px solid #dc3545'
          }}>
            <h3 style={{ margin: '0 0 10px 0', color: '#666' }}>Overdue</h3>
            <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#dc3545' }}>
              {trainings.reduce((sum, t) => sum + t.overdueCount, 0)}
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
              placeholder="Search trainings..."
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
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            
            <select
              value={filters.type}
              onChange={(e) => handleFilterChange('type', e.target.value)}
              style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
            >
              <option value="">All Types</option>
              {types.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            
            <select
              value={filters.status}
              onChange={(e) => handleFilterChange('status', e.target.value)}
              style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
            >
              <option value="">All Statuses</option>
              {statuses.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
            
            <select
              value={filters.trainer}
              onChange={(e) => handleFilterChange('trainer', e.target.value)}
              style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
            >
              <option value="">All Trainers</option>
              {trainers.map(trainer => (
                <option key={trainer} value={trainer}>{trainer}</option>
              ))}
            </select>
          </div>
          
          <div style={{ marginTop: '10px', fontSize: '14px', color: '#666' }}>
            Showing {filteredTrainings.length} of {trainings.length} trainings
          </div>
        </div>

        {/* Training Cards Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', 
          gap: '20px' 
        }}>
          {filteredTrainings.map(training => (
            <TrainingCard
              key={training.id}
              training={training}
              onAssign={handleAssign}
              onEdit={handleEdit}
              onDelete={handleDelete}
              userRole={user.role}
            />
          ))}
        </div>

        {filteredTrainings.length === 0 && (
          <div style={{
            backgroundColor: 'white',
            padding: '50px',
            borderRadius: '8px',
            textAlign: 'center',
            color: '#666'
          }}>
            <h3>No trainings found</h3>
            <p>Try adjusting your filters or create a new training.</p>
            {hasUserPermission(MODULES.TRAINING_CREATION, PERMISSIONS.CREATE) && (
              <button
                onClick={() => window.location.href = '/training/create'}
                style={{
                  padding: '12px 24px',
                  backgroundColor: '#007bff',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  marginTop: '15px'
                }}
              >
                Create Your First Training
              </button>
            )}
          </div>
        )}

        {/* Assignment Modal */}
        <AssignmentModal
          isOpen={showAssignModal}
          onClose={() => setShowAssignModal(false)}
          training={selectedTraining}
          onAssign={handleAssignmentSubmit}
        />
      </div>
    </Layout>
  );
}