// Notification Context for React components
import React, { createContext, useContext, useState, useEffect } from 'react';
import { notificationService, USER_ROLES } from '../utils/notifications';
import { useAuth } from './AuthContext';

const NotificationContext = createContext();

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

export const NotificationProvider = ({ children }) => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showNotificationPanel, setShowNotificationPanel] = useState(false);

  // Subscribe to real-time notifications
  useEffect(() => {
    if (!user?.role) return;

    const unsubscribe = notificationService.subscribe((newNotification) => {
      if (newNotification.recipients.includes(user.role.toLowerCase())) {
        setNotifications(prev => [newNotification, ...prev]);
        setUnreadCount(prev => prev + 1);
      }
    });

    // Load existing notifications for user role
    const existingNotifications = notificationService.getNotificationsForRole(user.role.toLowerCase());
    setNotifications(existingNotifications);
    setUnreadCount(notificationService.getUnreadCount(user.role.toLowerCase()));

    return unsubscribe;
  }, [user?.role]);

  // Mark notification as read
  const markAsRead = (notificationId) => {
    notificationService.markAsRead(notificationId);
    setNotifications(prev => 
      prev.map(n => n.id === notificationId ? { ...n, read: true } : n)
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  // Mark all notifications as read
  const markAllAsRead = () => {
    notifications.forEach(notification => {
      if (!notification.read) {
        notificationService.markAsRead(notification.id);
      }
    });
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    setUnreadCount(0);
  };

  // Get notifications by category
  const getNotificationsByCategory = (category) => {
    return notifications.filter(n => n.category === category);
  };

  // Get notifications by priority
  const getNotificationsByPriority = (priority) => {
    return notifications.filter(n => n.priority === priority);
  };

  // Send notification (wrapper for service)
  const sendNotification = async (templateKey, data, customRecipients = null) => {
    return await notificationService.sendNotification(templateKey, data, customRecipients);
  };

  const value = {
    notifications,
    unreadCount,
    showNotificationPanel,
    setShowNotificationPanel,
    markAsRead,
    markAllAsRead,
    getNotificationsByCategory,
    getNotificationsByPriority,
    sendNotification
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;