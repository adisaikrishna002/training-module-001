// Notification Bell Component with dropdown panel
import React, { useState, useRef, useEffect } from 'react';
import { useNotifications } from './NotificationContext';

const NotificationBell = () => {
  const {
    notifications,
    unreadCount,
    showNotificationPanel,
    setShowNotificationPanel,
    markAsRead,
    markAllAsRead
  } = useNotifications();

  const [filter, setFilter] = useState('all'); // all, unread, high, medium, low
  const panelRef = useRef(null);

  // Close panel when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (panelRef.current && !panelRef.current.contains(event.target)) {
        setShowNotificationPanel(false);
      }
    };

    if (showNotificationPanel) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showNotificationPanel, setShowNotificationPanel]);

  // Filter notifications based on selected filter
  const filteredNotifications = notifications.filter(notification => {
    switch (filter) {
      case 'unread':
        return !notification.read;
      case 'high':
      case 'medium':
      case 'low':
        return notification.priority === filter;
      default:
        return true;
    }
  });

  // Get priority color
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return '#dc3545';
      case 'medium': return '#ffc107';
      case 'low': return '#28a745';
      default: return '#6c757d';
    }
  };

  // Get category icon
  const getCategoryIcon = (category) => {
    switch (category) {
      case 'training_assignment': return '📚';
      case 'due_date_reminder': return '⏰';
      case 'training_completion': return '✅';
      case 'assessment': return '📝';
      case 'extension_request': return '📋';
      case 'escalation': return '🚨';
      case 'feedback': return '💬';
      case 'system_update': return '🔄';
      default: return '📢';
    }
  };

  // Format time ago
  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const notificationTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - notificationTime) / (1000 * 60));

    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  return (
    <div style={{ position: 'relative' }} ref={panelRef}>
      {/* Notification Bell Icon */}
      <button
        onClick={() => setShowNotificationPanel(!showNotificationPanel)}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          position: 'relative',
          padding: '8px',
          fontSize: '20px',
          color: '#333'
        }}
      >
        🔔
        {unreadCount > 0 && (
          <span style={{
            position: 'absolute',
            top: '2px',
            right: '2px',
            background: '#dc3545',
            color: 'white',
            borderRadius: '50%',
            width: '18px',
            height: '18px',
            fontSize: '11px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold'
          }}>
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
      </button>

      {/* Notification Panel */}
      {showNotificationPanel && (
        <div style={{
          position: 'absolute',
          top: '100%',
          right: 0,
          width: '400px',
          maxHeight: '500px',
          background: 'white',
          border: '1px solid #ddd',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          zIndex: 1000,
          overflow: 'hidden'
        }}>
          {/* Header */}
          <div style={{
            padding: '16px',
            borderBottom: '1px solid #eee',
            background: '#f8f9fa'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '12px'
            }}>
              <h3 style={{ margin: 0, fontSize: '16px' }}>Notifications</h3>
              <button
                onClick={markAllAsRead}
                disabled={unreadCount === 0}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#007bff',
                  fontSize: '12px',
                  cursor: unreadCount > 0 ? 'pointer' : 'not-allowed',
                  opacity: unreadCount > 0 ? 1 : 0.5
                }}
              >
                Mark all read
              </button>
            </div>

            {/* Filter Tabs */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {['all', 'unread', 'high', 'medium', 'low'].map(filterOption => (
                <button
                  key={filterOption}
                  onClick={() => setFilter(filterOption)}
                  style={{
                    padding: '4px 8px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    fontSize: '11px',
                    cursor: 'pointer',
                    background: filter === filterOption ? '#007bff' : 'white',
                    color: filter === filterOption ? 'white' : '#333'
                  }}
                >
                  {filterOption === 'all' ? 'All' : filterOption.charAt(0).toUpperCase() + filterOption.slice(1)}
                  {filterOption === 'unread' && unreadCount > 0 && ` (${unreadCount})`}
                </button>
              ))}
            </div>
          </div>

          {/* Notifications List */}
          <div style={{
            maxHeight: '350px',
            overflowY: 'auto'
          }}>
            {filteredNotifications.length === 0 ? (
              <div style={{
                padding: '32px',
                textAlign: 'center',
                color: '#666'
              }}>
                <div style={{ fontSize: '24px', marginBottom: '8px' }}>📭</div>
                <div>No notifications</div>
              </div>
            ) : (
              filteredNotifications.map(notification => (
                <div
                  key={notification.id}
                  onClick={() => !notification.read && markAsRead(notification.id)}
                  style={{
                    padding: '12px 16px',
                    borderBottom: '1px solid #f0f0f0',
                    cursor: 'pointer',
                    background: notification.read ? 'white' : '#f8f9ff',
                    position: 'relative'
                  }}
                >
                  {/* Priority indicator */}
                  <div style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: '3px',
                    background: getPriorityColor(notification.priority)
                  }} />

                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                    {/* Category icon */}
                    <div style={{ fontSize: '16px', marginTop: '2px' }}>
                      {getCategoryIcon(notification.category)}
                    </div>

                    <div style={{ flex: 1 }}>
                      {/* Title and time */}
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        marginBottom: '4px'
                      }}>
                        <h4 style={{
                          margin: 0,
                          fontSize: '13px',
                          fontWeight: notification.read ? 'normal' : 'bold',
                          color: '#333'
                        }}>
                          {notification.title}
                        </h4>
                        <span style={{
                          fontSize: '11px',
                          color: '#999',
                          whiteSpace: 'nowrap'
                        }}>
                          {formatTimeAgo(notification.timestamp)}
                        </span>
                      </div>

                      {/* Message */}
                      <p style={{
                        margin: 0,
                        fontSize: '12px',
                        color: '#666',
                        lineHeight: '1.4'
                      }}>
                        {notification.message}
                      </p>

                      {/* Channels indicator */}
                      <div style={{ marginTop: '6px', display: 'flex', gap: '4px' }}>
                        {notification.channels.map(channel => (
                          <span
                            key={channel}
                            style={{
                              fontSize: '10px',
                              padding: '2px 6px',
                              borderRadius: '8px',
                              background: '#e9ecef',
                              color: '#495057'
                            }}
                          >
                            {channel}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Unread indicator */}
                    {!notification.read && (
                      <div style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        background: '#007bff',
                        marginTop: '4px'
                      }} />
                    )}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div style={{
            padding: '12px 16px',
            borderTop: '1px solid #eee',
            background: '#f8f9fa',
            textAlign: 'center'
          }}>
            <button
              onClick={() => setShowNotificationPanel(false)}
              style={{
                background: 'none',
                border: 'none',
                color: '#007bff',
                fontSize: '12px',
                cursor: 'pointer'
              }}
            >
              View All Notifications →
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationBell;