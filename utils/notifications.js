// Notification System for Training Management
// Based on comprehensive notification matrix for all user roles

// Notification Types
export const NOTIFICATION_TYPES = {
  EMAIL: 'email',
  SYSTEM: 'system',
  PUSH: 'push',
  CALENDAR: 'calendar'
};

// Notification Categories
export const NOTIFICATION_CATEGORIES = {
  TRAINING_ASSIGNMENT: 'training_assignment',
  DUE_DATE_REMINDER: 'due_date_reminder',
  TRAINING_COMPLETION: 'training_completion',
  ASSESSMENT: 'assessment',
  EXTENSION_REQUEST: 'extension_request',
  ESCALATION: 'escalation',
  FEEDBACK: 'feedback',
  SYSTEM_UPDATE: 'system_update'
};

// User Roles
export const USER_ROLES = {
  ADMIN: 'admin',
  HOD: 'hod',
  HR: 'hr',
  COORDINATOR: 'coordinator',
  TRAINER: 'trainer',
  TRAINEE: 'trainee'
};

// Escalation Levels
export const ESCALATION_LEVELS = {
  LEVEL_1: { days: 30, recipients: ['trainee'] },
  LEVEL_2: { days: 15, recipients: ['trainee', 'coordinator'] },
  LEVEL_3: { days: 3, recipients: ['trainee', 'coordinator', 'hod'] },
  LEVEL_4: { days: 0, recipients: ['trainee', 'coordinator', 'hod', 'admin'] }
};

// Notification Templates
export const NOTIFICATION_TEMPLATES = {
  // Training Creation & Assignment
  TRAINING_CREATED: {
    category: NOTIFICATION_CATEGORIES.TRAINING_ASSIGNMENT,
    channels: [NOTIFICATION_TYPES.EMAIL, NOTIFICATION_TYPES.SYSTEM, NOTIFICATION_TYPES.PUSH],
    template: (data) => ({
      title: 'New Training Created',
      message: `New training "${data.trainingTitle}" has been created and assigned.`,
      recipients: ['coordinator', 'trainer', 'trainee']
    })
  },

  TRAINING_ASSIGNED_BY_ADMIN: {
    category: NOTIFICATION_CATEGORIES.TRAINING_ASSIGNMENT,
    channels: [NOTIFICATION_TYPES.EMAIL, NOTIFICATION_TYPES.PUSH],
    template: (data) => ({
      title: 'Training Assigned by Admin',
      message: `Admin assigned "${data.trainingTitle}" to you. Please review details.`,
      recipients: ['coordinator', 'trainer', 'trainee']
    })
  },

  TRAINING_ASSIGNED_BY_COORDINATOR: {
    category: NOTIFICATION_CATEGORIES.TRAINING_ASSIGNMENT,
    channels: [NOTIFICATION_TYPES.EMAIL, NOTIFICATION_TYPES.PUSH],
    template: (data) => ({
      title: 'Training Assignment',
      message: `You've been assigned "${data.trainingTitle}" scheduled on ${data.startDate}.`,
      recipients: ['trainer', 'trainee']
    })
  },

  TRAINING_ASSIGNED_BY_TRAINER: {
    category: NOTIFICATION_CATEGORIES.TRAINING_ASSIGNMENT,
    channels: [NOTIFICATION_TYPES.EMAIL, NOTIFICATION_TYPES.PUSH],
    template: (data) => ({
      title: 'Training Assignment',
      message: `Trainer ${data.trainerName} has assigned "${data.trainingTitle}".`,
      recipients: ['coordinator', 'trainee']
    })
  },

  // Due Date Reminders
  TRAINING_START_DATE_REACHED: {
    category: NOTIFICATION_CATEGORIES.DUE_DATE_REMINDER,
    channels: [NOTIFICATION_TYPES.PUSH, NOTIFICATION_TYPES.EMAIL],
    template: (data) => ({
      title: 'Training Now Active',
      message: `Your training "${data.trainingTitle}" is now active.`,
      recipients: ['trainee']
    })
  },

  DUE_DATE_REMINDER_30_DAYS: {
    category: NOTIFICATION_CATEGORIES.DUE_DATE_REMINDER,
    channels: [NOTIFICATION_TYPES.EMAIL, NOTIFICATION_TYPES.PUSH],
    template: (data) => ({
      title: '30-Day Reminder',
      message: `Reminder: You have 30 days left to complete "${data.trainingTitle}".`,
      recipients: ['trainee']
    })
  },

  DUE_DATE_REMINDER_15_DAYS: {
    category: NOTIFICATION_CATEGORIES.DUE_DATE_REMINDER,
    channels: [NOTIFICATION_TYPES.EMAIL, NOTIFICATION_TYPES.PUSH],
    template: (data) => ({
      title: '15-Day Reminder',
      message: `15 days left for "${data.trainingTitle}". Please complete soon.`,
      recipients: ['trainee', 'coordinator']
    })
  },

  DUE_DATE_REMINDER_3_DAYS: {
    category: NOTIFICATION_CATEGORIES.DUE_DATE_REMINDER,
    channels: [NOTIFICATION_TYPES.EMAIL, NOTIFICATION_TYPES.PUSH],
    template: (data) => ({
      title: '3-Day Final Reminder',
      message: `Training "${data.trainingTitle}" is due in 3 days — final reminder.`,
      recipients: ['trainee', 'coordinator', 'hod']
    })
  },

  TRAINING_OVERDUE: {
    category: NOTIFICATION_CATEGORIES.ESCALATION,
    channels: [NOTIFICATION_TYPES.EMAIL, NOTIFICATION_TYPES.PUSH],
    template: (data) => ({
      title: 'Training Overdue',
      message: `Training "${data.trainingTitle}" is now overdue.`,
      recipients: ['trainee', 'coordinator', 'hod']
    })
  },

  // Extension Requests
  EXTENSION_REQUESTED: {
    category: NOTIFICATION_CATEGORIES.EXTENSION_REQUEST,
    channels: [NOTIFICATION_TYPES.EMAIL, NOTIFICATION_TYPES.SYSTEM],
    template: (data) => ({
      title: 'Extension Request',
      message: `Trainee requested an extension: "${data.trainingTitle}" needs +${data.extensionDays} days.`,
      recipients: ['trainer', 'coordinator', 'hod']
    })
  },

  EXTENSION_APPROVED: {
    category: NOTIFICATION_CATEGORIES.EXTENSION_REQUEST,
    channels: [NOTIFICATION_TYPES.EMAIL, NOTIFICATION_TYPES.PUSH],
    template: (data) => ({
      title: 'Extension Approved',
      message: `Your extension for "${data.trainingTitle}" approved. New due: ${data.newDueDate}.`,
      recipients: ['trainee', 'coordinator']
    })
  },

  EXTENSION_REJECTED: {
    category: NOTIFICATION_CATEGORIES.EXTENSION_REQUEST,
    channels: [NOTIFICATION_TYPES.EMAIL, NOTIFICATION_TYPES.PUSH],
    template: (data) => ({
      title: 'Extension Rejected',
      message: `Your extension request for "${data.trainingTitle}" was rejected.`,
      recipients: ['trainee', 'coordinator']
    })
  },

  // Training Completion
  TRAINING_COMPLETED_BY_TRAINEE: {
    category: NOTIFICATION_CATEGORIES.TRAINING_COMPLETION,
    channels: [NOTIFICATION_TYPES.EMAIL, NOTIFICATION_TYPES.SYSTEM],
    template: (data) => ({
      title: 'Training Completed',
      message: `Trainee ${data.traineeName} completed "${data.trainingTitle}" on ${data.completionDate}.`,
      recipients: ['trainer', 'coordinator']
    })
  },

  TRAINING_COMPLETION_VERIFIED: {
    category: NOTIFICATION_CATEGORIES.TRAINING_COMPLETION,
    channels: [NOTIFICATION_TYPES.EMAIL, NOTIFICATION_TYPES.PUSH],
    template: (data) => ({
      title: 'Training Completion Verified',
      message: `Your training "${data.trainingTitle}" marked as completed.`,
      recipients: ['trainee', 'coordinator']
    })
  },

  TRAINING_COMPLETION_REVERTED: {
    category: NOTIFICATION_CATEGORIES.TRAINING_COMPLETION,
    channels: [NOTIFICATION_TYPES.EMAIL],
    template: (data) => ({
      title: 'Training Completion Reverted',
      message: `Your training "${data.trainingTitle}" requires revision — see comments.`,
      recipients: ['trainee']
    })
  },

  // Assessment Notifications
  ASSESSMENT_PUBLISHED: {
    category: NOTIFICATION_CATEGORIES.ASSESSMENT,
    channels: [NOTIFICATION_TYPES.SYSTEM, NOTIFICATION_TYPES.EMAIL],
    template: (data) => ({
      title: 'Assessment Available',
      message: `Assessment for "${data.trainingTitle}" is now open.`,
      recipients: ['trainee']
    })
  },

  ASSESSMENT_REMINDER: {
    category: NOTIFICATION_CATEGORIES.ASSESSMENT,
    channels: [NOTIFICATION_TYPES.PUSH, NOTIFICATION_TYPES.EMAIL],
    template: (data) => ({
      title: 'Assessment Reminder',
      message: `Reminder: Assessment for "${data.trainingTitle}" due soon.`,
      recipients: ['trainee']
    })
  },

  ASSESSMENT_RESULT_RELEASED: {
    category: NOTIFICATION_CATEGORIES.ASSESSMENT,
    channels: [NOTIFICATION_TYPES.EMAIL],
    template: (data) => ({
      title: 'Assessment Result Available',
      message: `Your result for "${data.trainingTitle}" is now available.`,
      recipients: ['trainee', 'trainer']
    })
  },

  ASSESSMENT_FAILED_3_ATTEMPTS: {
    category: NOTIFICATION_CATEGORIES.ESCALATION,
    channels: [NOTIFICATION_TYPES.EMAIL, NOTIFICATION_TYPES.PUSH],
    template: (data) => ({
      title: 'Assessment Failed - Escalation',
      message: `${data.traineeName} failed "${data.trainingTitle}" 3 times — escalation to HOD.`,
      recipients: ['trainee', 'hod', 'coordinator']
    })
  },

  // Feedback
  TRAINER_FEEDBACK_SUBMITTED: {
    category: NOTIFICATION_CATEGORIES.FEEDBACK,
    channels: [NOTIFICATION_TYPES.EMAIL],
    template: (data) => ({
      title: 'Trainer Feedback Submitted',
      message: `Trainer feedback for "${data.trainingTitle}" submitted.`,
      recipients: ['coordinator', 'hr']
    })
  },

  TRAINEE_FEEDBACK_SUBMITTED: {
    category: NOTIFICATION_CATEGORIES.FEEDBACK,
    channels: [NOTIFICATION_TYPES.EMAIL],
    template: (data) => ({
      title: 'Trainee Feedback Submitted',
      message: `Feedback for "${data.trainingTitle}" submitted by ${data.traineeName}.`,
      recipients: ['trainer', 'coordinator']
    })
  },

  // System Updates
  TRAINING_CANCELLED: {
    category: NOTIFICATION_CATEGORIES.SYSTEM_UPDATE,
    channels: [NOTIFICATION_TYPES.EMAIL, NOTIFICATION_TYPES.PUSH],
    template: (data) => ({
      title: 'Training Cancelled',
      message: `Training "${data.trainingTitle}" has been cancelled.`,
      recipients: ['trainer', 'trainee']
    })
  },

  TRAINING_REASSIGNED: {
    category: NOTIFICATION_CATEGORIES.SYSTEM_UPDATE,
    channels: [NOTIFICATION_TYPES.EMAIL, NOTIFICATION_TYPES.PUSH],
    template: (data) => ({
      title: 'Training Reassigned',
      message: `You've been reassigned to "${data.trainingTitle}" session.`,
      recipients: ['trainer', 'trainee', 'hod']
    })
  },

  CERTIFICATE_GENERATED: {
    category: NOTIFICATION_CATEGORIES.TRAINING_COMPLETION,
    channels: [NOTIFICATION_TYPES.EMAIL],
    template: (data) => ({
      title: 'Certificate Available',
      message: `Certificate for "${data.trainingTitle}" available for download.`,
      recipients: ['trainee', 'hr']
    })
  },

  INDUCTION_COMPLETED: {
    category: NOTIFICATION_CATEGORIES.TRAINING_COMPLETION,
    channels: [NOTIFICATION_TYPES.EMAIL, NOTIFICATION_TYPES.SYSTEM],
    template: (data) => ({
      title: 'Induction Training Completed',
      message: `New joiner induction completed by ${data.traineeName}.`,
      recipients: ['hr']
    })
  },

  NEW_EMPLOYEE_ONBOARDED: {
    category: NOTIFICATION_CATEGORIES.SYSTEM_UPDATE,
    channels: [NOTIFICATION_TYPES.EMAIL],
    template: (data) => ({
      title: 'New Employee Onboarded',
      message: `New employee ${data.employeeName} added — assign induction training.`,
      recipients: ['coordinator']
    })
  }
};

// Notification Service Class
class NotificationService {
  constructor() {
    this.notifications = [];
    this.subscribers = [];
  }

  // Send notification based on template
  async sendNotification(templateKey, data, customRecipients = null) {
    const template = NOTIFICATION_TEMPLATES[templateKey];
    if (!template) {
      console.error(`Notification template ${templateKey} not found`);
      return;
    }

    const notification = template.template(data);
    const recipients = customRecipients || notification.recipients;

    // Create notification object
    const notificationObj = {
      id: Date.now(),
      templateKey,
      title: notification.title,
      message: notification.message,
      category: template.category,
      channels: template.channels,
      recipients,
      data,
      timestamp: new Date().toISOString(),
      read: false,
      priority: this.getPriority(template.category)
    };

    // Add to notifications store
    this.notifications.unshift(notificationObj);

    // Send through different channels
    await this.processChannels(notificationObj);

    // Notify subscribers (for real-time updates)
    this.notifySubscribers(notificationObj);

    return notificationObj;
  }

  // Process notification through different channels
  async processChannels(notification) {
    for (const channel of notification.channels) {
      switch (channel) {
        case NOTIFICATION_TYPES.EMAIL:
          await this.sendEmail(notification);
          break;
        case NOTIFICATION_TYPES.SYSTEM:
          this.addSystemNotification(notification);
          break;
        case NOTIFICATION_TYPES.PUSH:
          await this.sendPushNotification(notification);
          break;
        case NOTIFICATION_TYPES.CALENDAR:
          await this.addCalendarEvent(notification);
          break;
      }
    }
  }

  // Email notification (placeholder - integrate with actual email service)
  async sendEmail(notification) {
    console.log('Email sent:', {
      to: notification.recipients,
      subject: notification.title,
      body: notification.message
    });
    // Integrate with actual email service (SendGrid, AWS SES, etc.)
  }

  // System notification (in-app)
  addSystemNotification(notification) {
    // This will be displayed in the notification bell icon
    console.log('System notification added:', notification);
  }

  // Push notification (placeholder - integrate with FCM or similar)
  async sendPushNotification(notification) {
    console.log('Push notification sent:', notification);
    // Integrate with Firebase Cloud Messaging or similar service
  }

  // Calendar event (placeholder - integrate with Outlook/Teams)
  async addCalendarEvent(notification) {
    console.log('Calendar event added:', notification);
    // Integrate with Microsoft Graph API or Google Calendar API
  }

  // Get notification priority based on category
  getPriority(category) {
    const highPriority = [
      NOTIFICATION_CATEGORIES.ESCALATION,
      NOTIFICATION_CATEGORIES.EXTENSION_REQUEST
    ];
    
    const mediumPriority = [
      NOTIFICATION_CATEGORIES.DUE_DATE_REMINDER,
      NOTIFICATION_CATEGORIES.ASSESSMENT
    ];

    if (highPriority.includes(category)) return 'high';
    if (mediumPriority.includes(category)) return 'medium';
    return 'low';
  }

  // Subscribe to real-time notifications
  subscribe(callback) {
    this.subscribers.push(callback);
    return () => {
      this.subscribers = this.subscribers.filter(sub => sub !== callback);
    };
  }

  // Notify all subscribers
  notifySubscribers(notification) {
    this.subscribers.forEach(callback => callback(notification));
  }

  // Get notifications for a specific user role
  getNotificationsForRole(role, unreadOnly = false) {
    return this.notifications.filter(notification => {
      const roleMatch = notification.recipients.includes(role);
      const readFilter = unreadOnly ? !notification.read : true;
      return roleMatch && readFilter;
    });
  }

  // Mark notification as read
  markAsRead(notificationId) {
    const notification = this.notifications.find(n => n.id === notificationId);
    if (notification) {
      notification.read = true;
    }
  }

  // Get unread count for a role
  getUnreadCount(role) {
    return this.getNotificationsForRole(role, true).length;
  }

  // Escalation helper - check due dates and send reminders
  checkDueDateReminders(trainings) {
    const today = new Date();
    
    trainings.forEach(training => {
      if (!training.dueDate || training.status === 'completed') return;
      
      const dueDate = new Date(training.dueDate);
      const daysDifference = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));
      
      // Check escalation levels
      Object.entries(ESCALATION_LEVELS).forEach(([level, config]) => {
        if (daysDifference === config.days) {
          const templateKey = daysDifference > 0 
            ? `DUE_DATE_REMINDER_${daysDifference}_DAYS`
            : 'TRAINING_OVERDUE';
          
          this.sendNotification(templateKey, {
            trainingTitle: training.title,
            dueDate: training.dueDate,
            traineeName: training.assignedTo
          }, config.recipients);
        }
      });
    });
  }
}

// Create singleton instance
export const notificationService = new NotificationService();

// Export helper functions
export const sendTrainingAssignedNotification = (trainingData, assignedBy) => {
  const templateKey = `TRAINING_ASSIGNED_BY_${assignedBy.toUpperCase()}`;
  return notificationService.sendNotification(templateKey, trainingData);
};

export const sendDueDateReminder = (trainingData, daysLeft) => {
  const templateKey = `DUE_DATE_REMINDER_${daysLeft}_DAYS`;
  return notificationService.sendNotification(templateKey, trainingData);
};

export const sendExtensionNotification = (trainingData, action) => {
  const templateKey = `EXTENSION_${action.toUpperCase()}`;
  return notificationService.sendNotification(templateKey, trainingData);
};

export const sendTrainingCompletionNotification = (trainingData, completedBy) => {
  const templateKey = completedBy === 'trainee' 
    ? 'TRAINING_COMPLETED_BY_TRAINEE'
    : 'TRAINING_COMPLETION_VERIFIED';
  return notificationService.sendNotification(templateKey, trainingData);
};

export const sendAssessmentNotification = (assessmentData, type) => {
  const templateKey = `ASSESSMENT_${type.toUpperCase()}`;
  return notificationService.sendNotification(templateKey, assessmentData);
};

// Escalation scheduler (would be called by a cron job or similar)
export const runDueDateCheck = (trainings) => {
  notificationService.checkDueDateReminders(trainings);
};

export default notificationService;