import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import { useAuth } from '../components/AuthContext';
import { PERMISSIONS, MODULES } from '../utils/rbac';

// Notification Card Component
const NotificationCard = ({ notification, onMarkRead, onMarkUnread, onDelete, canDelete }) => {
  const router = useRouter();
  const getTypeIcon = (type) => {
    switch (type) {
      case 'Training': return '📚';
      case 'Assessment': return '📝';
      case 'Certificate': return '🏆';
      case 'System': return '⚙️';
      case 'Reminder': return '⏰';
      case 'Alert': return '⚠️';
      default: return '📋';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'Training': return '#007bff';
      case 'Assessment': return '#17a2b8';
      case 'Certificate': return '#28a745';
      case 'System': return '#6c757d';
      case 'Reminder': return '#ffc107';
      case 'Alert': return '#dc3545';
      default: return '#6c757d';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return '#dc3545';
      case 'Medium': return '#ffc107';
      case 'Low': return '#28a745';
      default: return '#6c757d';
    }
  };

  return (
    <div style={{
      backgroundColor: notification.read ? '#f8f9fa' : 'white',
      borderRadius: '8px',
      padding: '16px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      border: `1px solid ${notification.read ? '#e0e0e0' : getTypeColor(notification.type)}`,
      borderLeft: `4px solid ${getTypeColor(notification.type)}`,
      position: 'relative'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '20px' }}>{getTypeIcon(notification.type)}</span>
          <span style={{
            padding: '2px 8px',
            borderRadius: '12px',
            fontSize: '11px',
            fontWeight: 'bold',
            backgroundColor: getTypeColor(notification.type),
            color: 'white'
          }}>
            {notification.type}
          </span>
          <span style={{
            padding: '2px 6px',
            borderRadius: '8px',
            fontSize: '10px',
            fontWeight: 'bold',
            backgroundColor: getPriorityColor(notification.priority),
            color: 'white'
          }}>
            {notification.priority}
          </span>
        </div>
        
        <div style={{ fontSize: '12px', color: '#666' }}>
          {new Date(notification.timestamp).toLocaleString()}
        </div>
      </div>

      <h4 style={{
        margin: '0 0 8px 0',
        fontSize: '16px',
        fontWeight: notification.read ? 'normal' : 'bold',
        color: notification.read ? '#666' : '#333'
      }}>
        {notification.title}
      </h4>

      <p style={{
        margin: '0 0 12px 0',
        fontSize: '14px',
        color: '#666',
        lineHeight: '1.4'
      }}>
        {notification.message}
      </p>

      {notification.actionUrl && (
        <div style={{ marginBottom: '12px' }}>
          <a
            href={notification.actionUrl}
            style={{
              color: getTypeColor(notification.type),
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
            onClick={e => {
              // For training assignment, assessment, or certificate detail, use client-side navigation
              if (
                (notification.actionUrl && notification.actionUrl.startsWith('/training/assignments/')) ||
                (notification.actionUrl && notification.actionUrl.startsWith('/assessments/')) ||
                (notification.actionUrl && notification.actionUrl.startsWith('/certificates/'))
              ) {
                e.preventDefault();
                router.push(notification.actionUrl);
              }
            }}
          >
            {notification.actionText || 'View Details'} →
          </a>
        </div>
      )}

      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        {!notification.read ? (
          <button
            onClick={() => onMarkRead(notification.id)}
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
            Mark as Read
          </button>
        ) : (
          <button
            onClick={() => onMarkUnread(notification.id)}
            style={{
              padding: '4px 8px',
              backgroundColor: '#17a2b8',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              fontSize: '12px',
              cursor: 'pointer'
            }}
          >
            Mark as Unread
          </button>
        )}
        
        {canDelete && (
          <button
            onClick={() => onDelete(notification.id)}
            style={{
              padding: '4px 8px',
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

        <div style={{ fontSize: '11px', color: '#999' }}>
          {notification.sender && `From: ${notification.sender}`}
        </div>
      </div>
    </div>
  );
};

// Send Notification Modal
const SendNotificationModal = ({ onSend, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    message: '',
    type: 'System',
    priority: 'Medium',
    recipients: 'all', // all, role, specific
    roleRecipients: [],
    specificRecipients: '',
    actionUrl: '',
    actionText: '',
    scheduleDate: '',
    scheduleTime: ''
  });

  const roles = [
    'System Admin', 'Training Coordinator', 'Trainer', 'Trainee',
    'HOD', 'QA Officer', 'HR', 'Auditor', 'Guest Trainer'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const notificationData = {
      ...formData,
      id: Date.now(),
      timestamp: formData.scheduleDate && formData.scheduleTime 
        ? new Date(`${formData.scheduleDate}T${formData.scheduleTime}`).toISOString()
        : new Date().toISOString(),
      read: false,
      sender: 'System Administrator' // Would be dynamic in real app
    };
    
    onSend(notificationData);
  };

  const handleRoleChange = (role, checked) => {
    if (checked) {
      setFormData({ ...formData, roleRecipients: [...formData.roleRecipients, role] });
    } else {
      setFormData({ ...formData, roleRecipients: formData.roleRecipients.filter(r => r !== role) });
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ maxWidth: '600px', width: '90%', maxHeight: '90vh', overflow: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ margin: 0 }}>Send Notification</h2>
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
              Message *
            </label>
            <textarea
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              required
              rows={4}
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
                Type
              </label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #ddd',
                  borderRadius: '4px'
                }}
              >
                <option value="System">System</option>
                <option value="Training">Training</option>
                <option value="Assessment">Assessment</option>
                <option value="Certificate">Certificate</option>
                <option value="Reminder">Reminder</option>
                <option value="Alert">Alert</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                Priority
              </label>
              <select
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
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
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>
              Recipients
            </label>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                <input
                  type="radio"
                  name="recipients"
                  value="all"
                  checked={formData.recipients === 'all'}
                  onChange={(e) => setFormData({ ...formData, recipients: e.target.value })}
                  style={{ marginRight: '8px' }}
                />
                All Users
              </label>
              <label style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                <input
                  type="radio"
                  name="recipients"
                  value="role"
                  checked={formData.recipients === 'role'}
                  onChange={(e) => setFormData({ ...formData, recipients: e.target.value })}
                  style={{ marginRight: '8px' }}
                />
                Specific Roles
              </label>
              <label style={{ display: 'flex', alignItems: 'center' }}>
                <input
                  type="radio"
                  name="recipients"
                  value="specific"
                  checked={formData.recipients === 'specific'}
                  onChange={(e) => setFormData({ ...formData, recipients: e.target.value })}
                  style={{ marginRight: '8px' }}
                />
                Specific Users
              </label>
            </div>

            {formData.recipients === 'role' && (
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                  Select Roles
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
                  {roles.map(role => (
                    <label key={role} style={{ display: 'flex', alignItems: 'center', fontSize: '14px' }}>
                      <input
                        type="checkbox"
                        checked={formData.roleRecipients.includes(role)}
                        onChange={(e) => handleRoleChange(role, e.target.checked)}
                        style={{ marginRight: '8px' }}
                      />
                      {role}
                    </label>
                  ))}
                </div>
              </div>
            )}

            {formData.recipients === 'specific' && (
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                  User IDs or Emails (comma-separated)
                </label>
                <textarea
                  value={formData.specificRecipients}
                  onChange={(e) => setFormData({ ...formData, specificRecipients: e.target.value })}
                  placeholder="user1@company.com, user2@company.com"
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
            )}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px', marginBottom: '20px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                Action URL (optional)
              </label>
              <input
                type="url"
                value={formData.actionUrl}
                onChange={(e) => setFormData({ ...formData, actionUrl: e.target.value })}
                placeholder="https://example.com/action"
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
                Action Text
              </label>
              <input
                type="text"
                value={formData.actionText}
                onChange={(e) => setFormData({ ...formData, actionText: e.target.value })}
                placeholder="View Details"
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #ddd',
                  borderRadius: '4px'
                }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                Schedule Date (optional)
              </label>
              <input
                type="date"
                value={formData.scheduleDate}
                onChange={(e) => setFormData({ ...formData, scheduleDate: e.target.value })}
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
                Schedule Time
              </label>
              <input
                type="time"
                value={formData.scheduleTime}
                onChange={(e) => setFormData({ ...formData, scheduleTime: e.target.value })}
                disabled={!formData.scheduleDate}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #ddd',
                  borderRadius: '4px'
                }}
              />
            </div>
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
              {formData.scheduleDate ? 'Schedule' : 'Send'} Notification
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default function Notifications() {
  const { user, hasUserPermission } = useAuth();
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'Training Assignment: GMP Fundamentals',
      message: 'You have been assigned to complete the GMP Fundamentals training. Please complete it by October 30, 2024.',
      type: 'Training',
      priority: 'High',
      read: false,
      timestamp: '2024-10-26T09:00:00Z',
      sender: 'Training Coordinator',
      actionUrl: '/training/assignments/1',
      actionText: 'View Training'
    },
    {
      id: 2,
      title: 'Assessment Reminder',
      message: 'Your assessment for Laboratory Safety Procedures is due tomorrow. Please complete it before the deadline.',
      type: 'Assessment',
      priority: 'High',
      read: false,
      timestamp: '2024-10-26T08:30:00Z',
      sender: 'System',
      actionUrl: '/assessments/2',
      actionText: 'Take Assessment'
    },
    {
      id: 3,
      title: 'Certificate Expiring Soon',
      message: 'Your Quality Control Basics certificate will expire in 7 days. Please renew your training to maintain compliance.',
      type: 'Certificate',
      priority: 'Medium',
      read: false,
      timestamp: '2024-10-26T07:45:00Z',
      sender: 'System',
      actionUrl: '/certificates/1',
      actionText: 'View Certificate'
    },
    {
      id: 4,
      title: 'New Training Material Available',
      message: 'A new SOP template has been added to the materials library for Quality Control processes.',
      type: 'Training',
      priority: 'Low',
      read: true,
      timestamp: '2024-10-25T16:20:00Z',
      sender: 'Sarah Johnson',
      actionUrl: '/materials',
      actionText: 'View Materials'
    },
    {
      id: 5,
      title: 'System Maintenance Scheduled',
      message: 'The training management system will undergo maintenance on October 28, 2024, from 2:00 AM to 4:00 AM.',
      type: 'System',
      priority: 'Medium',
      read: true,
      timestamp: '2024-10-25T14:00:00Z',
      sender: 'IT Department',
      actionUrl: null,
      actionText: null
    },
    {
      id: 6,
      title: 'Training Completed Successfully',
      message: 'Congratulations! You have successfully completed the Laboratory Safety Procedures training with a score of 92%.',
      type: 'Training',
      priority: 'Low',
      read: true,
      timestamp: '2024-10-24T11:30:00Z',
      sender: 'System',
      actionUrl: '/certificates',
      actionText: 'View Certificate'
    },
    {
      id: 7,
      title: 'Urgent: Compliance Deadline Approaching',
      message: 'Multiple employees in your department have overdue training requirements. Please ensure compliance by October 30, 2024.',
      type: 'Alert',
      priority: 'High',
      read: false,
      timestamp: '2024-10-24T09:15:00Z',
      sender: 'Compliance Officer',
      actionUrl: '/reports',
      actionText: 'View Report'
    }
  ]);

  const [filteredNotifications, setFilteredNotifications] = useState(notifications);
  const [showSendModal, setShowSendModal] = useState(false);
  const [notification, setNotification] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    type: '',
    priority: '',
    read: ''
  });

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  // Apply filters
  useEffect(() => {
    let filtered = notifications.filter(notif => {
      const matchesSearch = notif.title.toLowerCase().includes(filters.search.toLowerCase()) ||
                           notif.message.toLowerCase().includes(filters.search.toLowerCase());
      const matchesType = !filters.type || notif.type === filters.type;
      const matchesPriority = !filters.priority || notif.priority === filters.priority;
      const matchesRead = filters.read === '' || 
                         (filters.read === 'read' && notif.read) ||
                         (filters.read === 'unread' && !notif.read);
      
      return matchesSearch && matchesType && matchesPriority && matchesRead;
    });

    // Sort by timestamp (newest first)
    filtered.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    setFilteredNotifications(filtered);
  }, [notifications, filters]);

  const handleMarkRead = (id) => {
    setNotifications(prev => prev.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const handleMarkUnread = (id) => {
    setNotifications(prev => prev.map(notif => 
      notif.id === id ? { ...notif, read: false } : notif
    ));
  };

  const handleDeleteNotification = (id) => {
    if (confirm('Are you sure you want to delete this notification?')) {
      setNotifications(prev => prev.filter(notif => notif.id !== id));
      showNotification('Notification deleted successfully!');
    }
  };

  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
    showNotification('All notifications marked as read!');
  };

  const handleSendNotification = (notificationData) => {
    setNotifications(prev => [notificationData, ...prev]);
    setShowSendModal(false);
    showNotification('Notification sent successfully!');
  };

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({ ...prev, [filterName]: value }));
  };

  const clearFilters = () => {
    setFilters({ search: '', type: '', priority: '', read: '' });
  };

  if (!hasUserPermission(MODULES.NOTIFICATIONS, PERMISSIONS.READ)) {
    return (
      <Layout>
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <h2 style={{ color: '#dc3545' }}>Access Denied</h2>
          <p>You do not have permission to access Notifications.</p>
        </div>
      </Layout>
    );
  }

  const unreadCount = notifications.filter(n => !n.read).length;
  const todayCount = notifications.filter(n => 
    new Date(n.timestamp).toDateString() === new Date().toDateString()
  ).length;
  const highPriorityCount = notifications.filter(n => n.priority === 'High' && !n.read).length;

  return (
    <Layout>
      <div>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <div>
            <h2 style={{ margin: 0, color: '#333' }}>Notifications</h2>
            <p style={{ margin: '5px 0 0 0', color: '#666' }}>
              Manage and view system notifications
            </p>
          </div>
          
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={handleMarkAllRead}
              style={{
                padding: '10px 20px',
                backgroundColor: '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              Mark All Read
            </button>
            
            {hasUserPermission(MODULES.NOTIFICATIONS, PERMISSIONS.CREATE) && (
              <button
                onClick={() => setShowSendModal(true)}
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
                + Send Notification
              </button>
            )}
          </div>
        </div>

        {/* Notification Banner */}
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
            <h3 style={{ margin: '0 0 10px 0', color: '#666' }}>Total Notifications</h3>
            <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#007bff' }}>
              {notifications.length}
            </div>
          </div>
          
          <div style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            border: '3px solid #dc3545'
          }}>
            <h3 style={{ margin: '0 0 10px 0', color: '#666' }}>Unread</h3>
            <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#dc3545' }}>
              {unreadCount}
            </div>
          </div>
          
          <div style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            border: '3px solid #28a745'
          }}>
            <h3 style={{ margin: '0 0 10px 0', color: '#666' }}>Today</h3>
            <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#28a745' }}>
              {todayCount}
            </div>
          </div>
          
          <div style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            border: '3px solid #ffc107'
          }}>
            <h3 style={{ margin: '0 0 10px 0', color: '#666' }}>High Priority</h3>
            <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#ffc107' }}>
              {highPriorityCount}
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
              placeholder="Search notifications..."
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              style={{
                padding: '8px',
                border: '1px solid #ddd',
                borderRadius: '4px'
              }}
            />
            
            <select
              value={filters.type}
              onChange={(e) => handleFilterChange('type', e.target.value)}
              style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
            >
              <option value="">All Types</option>
              <option value="Training">Training</option>
              <option value="Assessment">Assessment</option>
              <option value="Certificate">Certificate</option>
              <option value="System">System</option>
              <option value="Reminder">Reminder</option>
              <option value="Alert">Alert</option>
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
            
            <select
              value={filters.read}
              onChange={(e) => handleFilterChange('read', e.target.value)}
              style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
            >
              <option value="">All</option>
              <option value="unread">Unread</option>
              <option value="read">Read</option>
            </select>
          </div>
          
          <div style={{ marginTop: '10px', fontSize: '14px', color: '#666' }}>
            Showing {filteredNotifications.length} of {notifications.length} notifications
          </div>
        </div>

        {/* Notifications List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {filteredNotifications.map(notification => (
            <NotificationCard
              key={notification.id}
              notification={notification}
              onMarkRead={handleMarkRead}
              onMarkUnread={handleMarkUnread}
              onDelete={handleDeleteNotification}
              canDelete={hasUserPermission(MODULES.NOTIFICATIONS, PERMISSIONS.DELETE)}
            />
          ))}
        </div>

        {filteredNotifications.length === 0 && (
          <div style={{
            backgroundColor: 'white',
            padding: '50px',
            borderRadius: '8px',
            textAlign: 'center',
            color: '#666'
          }}>
            <h3>No notifications found</h3>
            <p>No notifications match your current filter criteria.</p>
          </div>
        )}

        {/* Send Notification Modal */}
        {showSendModal && (
          <SendNotificationModal
            onSend={handleSendNotification}
            onCancel={() => setShowSendModal(false)}
          />
        )}
      </div>
    </Layout>
  );
}