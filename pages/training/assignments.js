import { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import { MOCK_USERS, ROLES, ROLE_LABELS } from '../../data/mockData';
import { useAuth } from '../../components/AuthContext';

// Training Material Modal Component
const TrainingMaterialModal = ({ isOpen, onClose, material, onComplete, minTime = 30 }) => {
  const [secondsLeft, setSecondsLeft] = useState(minTime);
  const [canComplete, setCanComplete] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    setSecondsLeft(minTime);
    setCanComplete(false);
  }, [isOpen, minTime]);

  useEffect(() => {
    if (!isOpen) return;
    if (secondsLeft <= 0) {
      setCanComplete(true);
      return;
    }
    const timer = setTimeout(() => setSecondsLeft(s => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [secondsLeft, isOpen]);

  if (!isOpen) return null;
  const handleCancel = () => {
    if (typeof onClose === 'function') {
      onClose();
    } else {
      // fallback: navigate to dashboard or previous page
      if (typeof window !== 'undefined') {
        window.location.href = '/dashboard';
      }
    }
  };
  return (
    <div className="modal-overlay" onClick={handleCancel}>
      <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '800px', width: '90%' }}>
        <h2>Training Material</h2>
        <div style={{ margin: '20px 0', minHeight: '200px' }}>
          {material ? (
            <div>
              <h3>{material.title}</h3>
              <p>{material.description}</p>
              {material.fileUrl && (
                <a href={material.fileUrl} target="_blank" rel="noopener noreferrer">View Material File</a>
              )}
            </div>
          ) : (
            <div>No material found.</div>
          )}
        </div>
        <div style={{ margin: '20px 0', fontWeight: 'bold' }}>
          Time Remaining: {secondsLeft > 0 ? `${secondsLeft}s` : 'You can now complete training!'}
        </div>
        <button
          onClick={canComplete ? onComplete : undefined}
          disabled={!canComplete}
          style={{
            padding: '10px 24px',
            backgroundColor: canComplete ? '#28a745' : '#ccc',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: canComplete ? 'pointer' : 'not-allowed',
            marginRight: '10px'
          }}
        >
          Complete Training
        </button>
        <button
          onClick={handleCancel}
          style={{
            padding: '10px 24px',
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

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

  // Robust defensive fallback for ROLES and ROLE_LABELS
  const safeROLES = (ROLES && typeof ROLES === 'object') ? ROLES : {};
  const safeROLE_LABELS = (ROLE_LABELS && typeof ROLE_LABELS === 'object') ? ROLE_LABELS : {};
  const roleOptions = Array.isArray(Object.values(safeROLES)) ? Object.values(safeROLES) : [];
  // Helper to get label safely
  const getRoleLabel = (role) => {
    if (safeROLE_LABELS && typeof safeROLE_LABELS === 'object' && Object.prototype.hasOwnProperty.call(safeROLE_LABELS, role)) {
      return safeROLE_LABELS[role];
    }
    return role || 'Unknown Role';
  };

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
        {/* User Selection and Filters */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
          <div>
            <h3>Select Users</h3>
            <div style={{ marginBottom: '20px' }}>
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px', marginBottom: '10px' }}
              />
              <select value={filterRole} onChange={e => setFilterRole(e.target.value)} style={{ width: '100%', marginBottom: '10px' }}>
                <option value="">All Roles</option>
                {roleOptions.length > 0 && roleOptions.map(role => (
                  <option key={role} value={role}>{getRoleLabel(role)}</option>
                ))}
              </select>
              <select value={filterDepartment} onChange={e => setFilterDepartment(e.target.value)} style={{ width: '100%' }}>
                <option value="">All Departments</option>
                {departments.map(dep => (
                  <option key={dep} value={dep}>{dep}</option>
                ))}
              </select>
            </div>
            <div style={{ maxHeight: '200px', overflowY: 'auto', border: '1px solid #eee', borderRadius: '4px', marginBottom: '10px' }}>
              <label style={{ display: 'block', padding: '8px', borderBottom: '1px solid #f0f0f0', cursor: 'pointer' }}>
                <input type="checkbox" checked={selectedUsers.length === availableUsers.length && availableUsers.length > 0} onChange={handleSelectAll} /> Select All
              </label>
              {availableUsers.map(user => (
                <label key={user.id} style={{ display: 'block', padding: '8px', borderBottom: '1px solid #f0f0f0', cursor: 'pointer' }}>
                  <input type="checkbox" checked={selectedUsers.includes(user.id)} onChange={() => handleUserSelect(user.id)} />
                  {user.name} <span style={{ color: '#888', fontSize: '12px' }}>({user.email})</span>
                  <div style={{ fontSize: '12px', color: '#666' }}>{getRoleLabel(user.role)} • {user.department}</div>
                </label>
              ))}
              {availableUsers.length === 0 && (
                <div style={{ textAlign: 'center', color: '#666', padding: '20px' }}>No users found matching your criteria.</div>
              )}
            </div>
            <div style={{ marginTop: '10px', fontSize: '14px', color: '#666' }}>{selectedUsers.length} user(s) selected</div>
          </div>
          {/* Assignment Settings */}
          <div>
            <h3>Assignment Settings</h3>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Due Date *</label>
              <input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }} />
            </div>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Priority</label>
              <select value={priority} onChange={e => setPriority(e.target.value)} style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }}>
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
                  <input type="checkbox" checked={notifications.email} onChange={e => setNotifications(prev => ({ ...prev, email: e.target.checked }))} style={{ marginRight: '8px' }} />
                  Send Email Notification
                </label>
                <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                  <input type="checkbox" checked={notifications.inApp} onChange={e => setNotifications(prev => ({ ...prev, inApp: e.target.checked }))} style={{ marginRight: '8px' }} />
                  Send In-App Notification
                </label>
                <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                  <input type="checkbox" checked={notifications.reminder30} onChange={e => setNotifications(prev => ({ ...prev, reminder30: e.target.checked }))} style={{ marginRight: '8px' }} />
                  30-day Reminder
                </label>
                <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                  <input type="checkbox" checked={notifications.reminder15} onChange={e => setNotifications(prev => ({ ...prev, reminder15: e.target.checked }))} style={{ marginRight: '8px' }} />
                  15-day Reminder
                </label>
                <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                  <input type="checkbox" checked={notifications.reminder3} onChange={e => setNotifications(prev => ({ ...prev, reminder3: e.target.checked }))} style={{ marginRight: '8px' }} />
                  3-day Final Reminder
                </label>
              </div>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '30px', borderTop: '1px solid #e0e0e0', paddingTop: '20px' }}>
          <button onClick={onClose} style={{ padding: '10px 20px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Cancel</button>
          <button onClick={handleAssign} style={{ padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Assign Training ({selectedUsers.length} users)</button>
        </div>
      </div>
    </div>
  );
};

// Main page component
export default function TrainingAssignments() {
  const { user, isTrainee } = useAuth();
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedTraining, setSelectedTraining] = useState(null);

  // Example list of trainings (replace with your real data source)
  const trainings = [
    { id: 1, title: 'GMP Fundamentals', endDate: '2024-10-30', description: 'Basic GMP principles', fileUrl: '/materials/GMP_Guidelines.pdf' },
    { id: 2, title: 'Laboratory Safety', endDate: '2024-11-15', description: 'Lab safety training', fileUrl: '/materials/Lab_Safety_Manual.pdf' }
  ];

  const handleViewTraining = (training) => {
    setSelectedTraining(training);
    setShowAssignModal(true);
  };

  const handleCloseAssignModal = () => {
    setShowAssignModal(false);
    setSelectedTraining(null);
  };

  // If trainee, show only the material viewer for the first available training (or selected)
  const [showTraineeModal, setShowTraineeModal] = useState(true);
  if (isTrainee && user) {
    // For demo, just show the first training; in real app, filter by assigned trainings
    const traineeTraining = selectedTraining || trainings[0];
    return (
      <Layout>
        <div style={{ padding: '40px' }}>
          <h2>Training Material</h2>
          <TrainingMaterialModal
            isOpen={showTraineeModal}
            onClose={() => {
              setShowTraineeModal(false);
              // Optionally, redirect after closing
              setTimeout(() => { window.location.href = '/dashboard'; }, 300);
            }}
            material={traineeTraining}
            onComplete={() => alert('Training completed!')}
            minTime={30}
          />
        </div>
      </Layout>
    );
  }

  // Non-trainee: show assignment UI
  return (
    <Layout>
      <div style={{ padding: '40px' }}>
        <h2>Training Assignments</h2>
        {/* List of trainings with View Training button */}
        <div style={{ marginBottom: '30px' }}>
          {trainings.map(training => (
            <div key={training.id} style={{ border: '1px solid #eee', borderRadius: '8px', padding: '20px', marginBottom: '16px' }}>
              <div style={{ fontWeight: 'bold', fontSize: '18px' }}>{training.title}</div>
              <div style={{ margin: '8px 0' }}>Due: {training.endDate}</div>
              <button
                style={{ background: '#007bff', color: 'white', border: 'none', borderRadius: '4px', padding: '8px 16px', cursor: 'pointer' }}
                onClick={() => handleViewTraining(training)}
              >
                View Training
              </button>
            </div>
          ))}
        </div>
        {/* Assignment Modal */}
        <AssignmentModal
          isOpen={showAssignModal}
          onClose={handleCloseAssignModal}
          training={selectedTraining}
          onAssign={handleCloseAssignModal}
        />
      </div>
    </Layout>
  );
}
