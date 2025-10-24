import { useState } from 'react';
import Layout from '../components/Layout';
import { useAuth } from '../components/AuthContext';
import { MOCK_USERS, TRAINING_CATEGORIES } from '../data/mockData';
import { ROLES, ROLE_LABELS, PERMISSIONS, MODULES } from '../utils/rbac';

// Modal Component
const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ margin: 0 }}>{title}</h2>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '24px',
              cursor: 'pointer',
              color: '#666'
            }}
          >
            ×
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

// User Form Component
const UserForm = ({ user, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    username: user?.username || '',
    role: user?.role || ROLES.TRAINEE,
    department: user?.department || '',
    site: user?.site || '',
    active: user?.active !== undefined ? user.active : true
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.username.trim()) newErrors.username = 'Username is required';
    if (!formData.department.trim()) newErrors.department = 'Department is required';
    if (!formData.site.trim()) newErrors.site = 'Site is required';
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSave({
        ...user,
        ...formData,
        id: user?.id || Date.now(),
        lastLogin: user?.lastLogin || null
      });
    }
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '14px',
    marginBottom: '5px'
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '5px',
    fontWeight: 'bold',
    color: '#333'
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
        <div>
          <label style={labelStyle}>Name *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            style={{
              ...inputStyle,
              borderColor: errors.name ? '#dc3545' : '#ddd'
            }}
            placeholder="Enter full name"
          />
          {errors.name && <div style={{ color: '#dc3545', fontSize: '12px' }}>{errors.name}</div>}
        </div>

        <div>
          <label style={labelStyle}>Email *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            style={{
              ...inputStyle,
              borderColor: errors.email ? '#dc3545' : '#ddd'
            }}
            placeholder="Enter email address"
          />
          {errors.email && <div style={{ color: '#dc3545', fontSize: '12px' }}>{errors.email}</div>}
        </div>

        <div>
          <label style={labelStyle}>Username *</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            style={{
              ...inputStyle,
              borderColor: errors.username ? '#dc3545' : '#ddd'
            }}
            placeholder="Enter username"
          />
          {errors.username && <div style={{ color: '#dc3545', fontSize: '12px' }}>{errors.username}</div>}
        </div>

        <div>
          <label style={labelStyle}>Role *</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            style={inputStyle}
          >
            {Object.entries(ROLE_LABELS).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </div>

        <div>
          <label style={labelStyle}>Department *</label>
          <input
            type="text"
            name="department"
            value={formData.department}
            onChange={handleChange}
            style={{
              ...inputStyle,
              borderColor: errors.department ? '#dc3545' : '#ddd'
            }}
            placeholder="Enter department"
          />
          {errors.department && <div style={{ color: '#dc3545', fontSize: '12px' }}>{errors.department}</div>}
        </div>

        <div>
          <label style={labelStyle}>Site *</label>
          <input
            type="text"
            name="site"
            value={formData.site}
            onChange={handleChange}
            style={{
              ...inputStyle,
              borderColor: errors.site ? '#dc3545' : '#ddd'
            }}
            placeholder="Enter site location"
          />
          {errors.site && <div style={{ color: '#dc3545', fontSize: '12px' }}>{errors.site}</div>}
        </div>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
          <input
            type="checkbox"
            name="active"
            checked={formData.active}
            onChange={handleChange}
            style={{ marginRight: '8px' }}
          />
          <span>Active User</span>
        </label>
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
          {user ? 'Update User' : 'Create User'}
        </button>
      </div>
    </form>
  );
};

// User Table Component
const UserTable = ({ users, onEdit, onToggleStatus, currentUser }) => {
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  const [filterRole, setFilterRole] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Filtering and sorting logic
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.username.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = !filterRole || user.role === filterRole;
    const matchesStatus = !filterStatus || user.active.toString() === filterStatus;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];
    
    if (sortDirection === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getSortIcon = (field) => {
    if (sortField !== field) return '↕️';
    return sortDirection === 'asc' ? '↑' : '↓';
  };

  return (
    <div>
      {/* Filters */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: '15px', 
        marginBottom: '20px',
        padding: '20px',
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
      }}>
        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Search Users</label>
          <input
            type="text"
            placeholder="Search by name, email, or username..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #ddd',
              borderRadius: '4px'
            }}
          />
        </div>
        
        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Filter by Role</label>
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #ddd',
              borderRadius: '4px'
            }}
          >
            <option value="">All Roles</option>
            {Object.entries(ROLE_LABELS).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Filter by Status</label>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #ddd',
              borderRadius: '4px'
            }}
          >
            <option value="">All Statuses</option>
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>
        </div>
      </div>

      {/* Results Summary */}
      <div style={{ marginBottom: '20px', fontSize: '14px', color: '#666' }}>
        Showing {sortedUsers.length} of {users.length} users
      </div>

      {/* Table */}
      <div style={{ 
        backgroundColor: 'white', 
        borderRadius: '8px', 
        overflow: 'hidden',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
      }}>
        <table style={{ width: '100%' }}>
          <thead>
            <tr style={{ backgroundColor: '#f8f9fa' }}>
              <th 
                style={{ cursor: 'pointer', userSelect: 'none' }}
                onClick={() => handleSort('name')}
              >
                Name {getSortIcon('name')}
              </th>
              <th 
                style={{ cursor: 'pointer', userSelect: 'none' }}
                onClick={() => handleSort('email')}
              >
                Email {getSortIcon('email')}
              </th>
              <th 
                style={{ cursor: 'pointer', userSelect: 'none' }}
                onClick={() => handleSort('role')}
              >
                Role {getSortIcon('role')}
              </th>
              <th 
                style={{ cursor: 'pointer', userSelect: 'none' }}
                onClick={() => handleSort('department')}
              >
                Department {getSortIcon('department')}
              </th>
              <th 
                style={{ cursor: 'pointer', userSelect: 'none' }}
                onClick={() => handleSort('site')}
              >
                Site {getSortIcon('site')}
              </th>
              <th 
                style={{ cursor: 'pointer', userSelect: 'none' }}
                onClick={() => handleSort('active')}
              >
                Status {getSortIcon('active')}
              </th>
              <th>Last Login</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedUsers.map((user) => (
              <tr key={user.id}>
                <td style={{ fontWeight: user.id === currentUser.id ? 'bold' : 'normal' }}>
                  {user.name}
                  {user.id === currentUser.id && <span style={{ color: '#007bff', fontSize: '12px' }}> (You)</span>}
                </td>
                <td>{user.email}</td>
                <td>
                  <span className={`badge ${user.role === ROLES.SYSTEM_ADMIN ? 'danger' : 
                                          user.role === ROLES.TRAINING_COORDINATOR ? 'primary' :
                                          user.role === ROLES.TRAINER ? 'success' : 'secondary'}`}>
                    {ROLE_LABELS[user.role]}
                  </span>
                </td>
                <td>{user.department}</td>
                <td>{user.site}</td>
                <td>
                  <span className={`badge ${user.active ? 'success' : 'secondary'}`}>
                    {user.active ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td>
                  {user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : 'Never'}
                </td>
                <td>
                  <div style={{ display: 'flex', gap: '5px' }}>
                    <button
                      onClick={() => onEdit(user)}
                      style={{
                        padding: '5px 10px',
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
                    {user.id !== currentUser.id && (
                      <button
                        onClick={() => onToggleStatus(user)}
                        style={{
                          padding: '5px 10px',
                          backgroundColor: user.active ? '#dc3545' : '#28a745',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          fontSize: '12px',
                          cursor: 'pointer'
                        }}
                      >
                        {user.active ? 'Deactivate' : 'Activate'}
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {sortedUsers.length === 0 && (
          <div style={{ padding: '40px', textAlign: 'center', color: '#666' }}>
            No users found matching your criteria.
          </div>
        )}
      </div>
    </div>
  );
};

export default function UserManagement() {
  const { user: currentUser, hasUserPermission } = useAuth();
  const [users, setUsers] = useState(MOCK_USERS);
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [notification, setNotification] = useState(null);

  // Check permissions
  const canCreate = hasUserPermission(MODULES.USER_MANAGEMENT, PERMISSIONS.CREATE);
  const canUpdate = hasUserPermission(MODULES.USER_MANAGEMENT, PERMISSIONS.UPDATE);
  const canDelete = hasUserPermission(MODULES.USER_MANAGEMENT, PERMISSIONS.DELETE);

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleCreateUser = () => {
    if (!canCreate) {
      showNotification('You do not have permission to create users.', 'error');
      return;
    }
    setEditingUser(null);
    setShowModal(true);
  };

  const handleEditUser = (user) => {
    if (!canUpdate) {
      showNotification('You do not have permission to edit users.', 'error');
      return;
    }
    setEditingUser(user);
    setShowModal(true);
  };

  const handleSaveUser = (userData) => {
    if (editingUser) {
      // Update existing user
      setUsers(prev => prev.map(u => u.id === editingUser.id ? userData : u));
      showNotification('User updated successfully!');
    } else {
      // Create new user
      setUsers(prev => [...prev, { ...userData, id: Date.now() }]);
      showNotification('User created successfully!');
    }
    setShowModal(false);
    setEditingUser(null);
  };

  const handleToggleStatus = (user) => {
    if (!canUpdate) {
      showNotification('You do not have permission to modify user status.', 'error');
      return;
    }
    
    setUsers(prev => prev.map(u => 
      u.id === user.id ? { ...u, active: !u.active } : u
    ));
    showNotification(`User ${user.active ? 'deactivated' : 'activated'} successfully!`);
  };

  if (!hasUserPermission(MODULES.USER_MANAGEMENT, PERMISSIONS.READ)) {
    return (
      <Layout>
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <h2 style={{ color: '#dc3545' }}>Access Denied</h2>
          <p>You do not have permission to access User Management.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div>
        {/* Header */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          marginBottom: '30px' 
        }}>
          <div>
            <h2 style={{ margin: 0, color: '#333' }}>User Management</h2>
            <p style={{ margin: '5px 0 0 0', color: '#666' }}>
              Manage system users, roles, and permissions
            </p>
          </div>
          {canCreate && (
            <button
              onClick={handleCreateUser}
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
              + Add New User
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

        {/* User Statistics */}
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
            <h3 style={{ margin: '0 0 10px 0', color: '#666' }}>Total Users</h3>
            <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#007bff' }}>
              {users.length}
            </div>
          </div>
          
          <div style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            border: '3px solid #28a745'
          }}>
            <h3 style={{ margin: '0 0 10px 0', color: '#666' }}>Active Users</h3>
            <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#28a745' }}>
              {users.filter(u => u.active).length}
            </div>
          </div>
          
          <div style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            border: '3px solid #ffc107'
          }}>
            <h3 style={{ margin: '0 0 10px 0', color: '#666' }}>Administrators</h3>
            <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#ffc107' }}>
              {users.filter(u => u.role === ROLES.SYSTEM_ADMIN).length}
            </div>
          </div>
          
          <div style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            border: '3px solid #17a2b8'
          }}>
            <h3 style={{ margin: '0 0 10px 0', color: '#666' }}>Trainees</h3>
            <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#17a2b8' }}>
              {users.filter(u => u.role === ROLES.TRAINEE).length}
            </div>
          </div>
        </div>

        {/* User Table */}
        <UserTable
          users={users}
          onEdit={handleEditUser}
          onToggleStatus={handleToggleStatus}
          currentUser={currentUser}
        />

        {/* Modal */}
        <Modal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          title={editingUser ? 'Edit User' : 'Create New User'}
        >
          <UserForm
            user={editingUser}
            onSave={handleSaveUser}
            onCancel={() => setShowModal(false)}
          />
        </Modal>
      </div>
    </Layout>
  );
}