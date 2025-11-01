// Integration helpers for sending notifications from various training events
import { 
  notificationService, 
  sendTrainingAssignedNotification,
  sendDueDateReminder,
  sendExtensionNotification,
  sendTrainingCompletionNotification,
  sendAssessmentNotification
} from '../utils/notifications';

// Training Event Handlers
export const trainingEventHandlers = {
  
  // When a training is created
  onTrainingCreated: async (trainingData, createdBy) => {
    await notificationService.sendNotification('TRAINING_CREATED', {
      trainingTitle: trainingData.title,
      trainingId: trainingData.id,
      createdBy: createdBy.name,
      startDate: trainingData.startDate
    });
  },

  // When a training is assigned
  onTrainingAssigned: async (trainingData, assignedBy, assignedTo) => {
    await sendTrainingAssignedNotification({
      trainingTitle: trainingData.title,
      trainingId: trainingData.id,
      assignedBy: assignedBy.name,
      assignedTo: assignedTo.name,
      startDate: trainingData.startDate,
      dueDate: trainingData.dueDate
    }, assignedBy.role);
  },

  // When training start date is reached
  onTrainingStarted: async (trainingData) => {
    await notificationService.sendNotification('TRAINING_START_DATE_REACHED', {
      trainingTitle: trainingData.title,
      trainingId: trainingData.id
    });
  },

  // When training is completed by trainee
  onTrainingCompleted: async (trainingData, traineeData) => {
    await sendTrainingCompletionNotification({
      trainingTitle: trainingData.title,
      trainingId: trainingData.id,
      traineeName: traineeData.name,
      completionDate: new Date().toISOString().split('T')[0]
    }, 'trainee');
  },

  // When trainer verifies completion
  onTrainingVerified: async (trainingData, trainerData) => {
    await sendTrainingCompletionNotification({
      trainingTitle: trainingData.title,
      trainingId: trainingData.id,
      trainerName: trainerData.name,
      verificationDate: new Date().toISOString().split('T')[0]
    }, 'trainer');
  },

  // When completion is reverted
  onCompletionReverted: async (trainingData, reason) => {
    await notificationService.sendNotification('TRAINING_COMPLETION_REVERTED', {
      trainingTitle: trainingData.title,
      trainingId: trainingData.id,
      reason: reason
    });
  },

  // When training is cancelled
  onTrainingCancelled: async (trainingData, cancelledBy, reason) => {
    await notificationService.sendNotification('TRAINING_CANCELLED', {
      trainingTitle: trainingData.title,
      trainingId: trainingData.id,
      cancelledBy: cancelledBy.name,
      reason: reason
    });
  },

  // When training is reassigned
  onTrainingReassigned: async (trainingData, fromUser, toUser, reassignedBy) => {
    await notificationService.sendNotification('TRAINING_REASSIGNED', {
      trainingTitle: trainingData.title,
      trainingId: trainingData.id,
      fromUser: fromUser.name,
      toUser: toUser.name,
      reassignedBy: reassignedBy.name
    });
  }
};

// Extension Event Handlers
export const extensionEventHandlers = {
  
  // When extension is requested
  onExtensionRequested: async (trainingData, traineeData, extensionDays, reason) => {
    await sendExtensionNotification({
      trainingTitle: trainingData.title,
      trainingId: trainingData.id,
      traineeName: traineeData.name,
      extensionDays: extensionDays,
      reason: reason,
      requestDate: new Date().toISOString().split('T')[0]
    }, 'requested');
  },

  // When extension is approved
  onExtensionApproved: async (trainingData, approvedBy, newDueDate) => {
    await sendExtensionNotification({
      trainingTitle: trainingData.title,
      trainingId: trainingData.id,
      approvedBy: approvedBy.name,
      newDueDate: newDueDate
    }, 'approved');
  },

  // When extension is rejected
  onExtensionRejected: async (trainingData, rejectedBy, reason) => {
    await sendExtensionNotification({
      trainingTitle: trainingData.title,
      trainingId: trainingData.id,
      rejectedBy: rejectedBy.name,
      reason: reason
    }, 'rejected');
  }
};

// Assessment Event Handlers
export const assessmentEventHandlers = {
  
  // When assessment is published
  onAssessmentPublished: async (assessmentData, trainingData) => {
    await sendAssessmentNotification({
      assessmentTitle: assessmentData.title,
      trainingTitle: trainingData.title,
      assessmentId: assessmentData.id,
      dueDate: assessmentData.dueDate
    }, 'published');
  },

  // Assessment reminder
  onAssessmentReminder: async (assessmentData, trainingData, daysLeft) => {
    await sendAssessmentNotification({
      assessmentTitle: assessmentData.title,
      trainingTitle: trainingData.title,
      assessmentId: assessmentData.id,
      daysLeft: daysLeft
    }, 'reminder');
  },

  // When assessment result is released
  onAssessmentResultReleased: async (assessmentData, trainingData, result) => {
    await sendAssessmentNotification({
      assessmentTitle: assessmentData.title,
      trainingTitle: trainingData.title,
      assessmentId: assessmentData.id,
      score: result.score,
      passed: result.passed
    }, 'result_released');
  },

  // When assessment fails 3 times
  onAssessmentFailedThreeTimes: async (assessmentData, trainingData, traineeData) => {
    await notificationService.sendNotification('ASSESSMENT_FAILED_3_ATTEMPTS', {
      assessmentTitle: assessmentData.title,
      trainingTitle: trainingData.title,
      traineeName: traineeData.name,
      attempts: 3
    });
  }
};

// Feedback Event Handlers
export const feedbackEventHandlers = {
  
  // When trainer submits feedback
  onTrainerFeedbackSubmitted: async (trainingData, trainerData, feedback) => {
    await notificationService.sendNotification('TRAINER_FEEDBACK_SUBMITTED', {
      trainingTitle: trainingData.title,
      trainingId: trainingData.id,
      trainerName: trainerData.name,
      feedbackRating: feedback.rating,
      feedbackDate: new Date().toISOString().split('T')[0]
    });
  },

  // When trainee submits feedback
  onTraineeFeedbackSubmitted: async (trainingData, traineeData, feedback) => {
    await notificationService.sendNotification('TRAINEE_FEEDBACK_SUBMITTED', {
      trainingTitle: trainingData.title,
      trainingId: trainingData.id,
      traineeName: traineeData.name,
      feedbackRating: feedback.rating,
      feedbackDate: new Date().toISOString().split('T')[0]
    });
  }
};

// Certificate Event Handlers
export const certificateEventHandlers = {
  
  // When certificate is generated
  onCertificateGenerated: async (trainingData, traineeData, certificateData) => {
    await notificationService.sendNotification('CERTIFICATE_GENERATED', {
      trainingTitle: trainingData.title,
      trainingId: trainingData.id,
      traineeName: traineeData.name,
      certificateId: certificateData.id,
      issueDate: certificateData.issueDate
    });
  }
};

// HR/System Event Handlers
export const systemEventHandlers = {
  
  // When new employee is onboarded
  onNewEmployeeOnboarded: async (employeeData) => {
    await notificationService.sendNotification('NEW_EMPLOYEE_ONBOARDED', {
      employeeName: employeeData.name,
      employeeId: employeeData.id,
      department: employeeData.department,
      joinDate: employeeData.joinDate
    });
  },

  // When induction is completed
  onInductionCompleted: async (trainingData, traineeData) => {
    await notificationService.sendNotification('INDUCTION_COMPLETED', {
      trainingTitle: trainingData.title,
      traineeName: traineeData.name,
      completionDate: new Date().toISOString().split('T')[0]
    });
  }
};

// Due Date Reminder Scheduler
export const scheduleReminderCheck = (trainings) => {
  // This would typically be called by a cron job or scheduled task
  const today = new Date();
  
  trainings.forEach(training => {
    if (!training.dueDate || training.status === 'completed') return;
    
    const dueDate = new Date(training.dueDate);
    const daysDifference = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));
    
    // Send appropriate reminders based on days left
    if (daysDifference === 30) {
      sendDueDateReminder({
        trainingTitle: training.title,
        trainingId: training.id,
        dueDate: training.dueDate
      }, 30);
    } else if (daysDifference === 15) {
      sendDueDateReminder({
        trainingTitle: training.title,
        trainingId: training.id,
        dueDate: training.dueDate
      }, 15);
    } else if (daysDifference === 3) {
      sendDueDateReminder({
        trainingTitle: training.title,
        trainingId: training.id,
        dueDate: training.dueDate
      }, 3);
    } else if (daysDifference <= 0) {
      // Training is overdue
      notificationService.sendNotification('TRAINING_OVERDUE', {
        trainingTitle: training.title,
        trainingId: training.id,
        daysOverdue: Math.abs(daysDifference)
      });
    }
  });
};

// Sample usage examples for testing
export const sampleNotifications = {
  
  // Test training assignment
  testTrainingAssignment: async () => {
    await trainingEventHandlers.onTrainingAssigned(
      { 
        id: 1, 
        title: 'GMP Fundamentals', 
        startDate: '2025-11-15', 
        dueDate: '2025-12-15' 
      },
      { name: 'John Coordinator', role: 'coordinator' },
      { name: 'Jane Trainee', role: 'trainee' }
    );
  },

  // Test due date reminder
  testDueDateReminder: async () => {
    await sendDueDateReminder({
      trainingTitle: 'Laboratory Safety',
      trainingId: 2,
      dueDate: '2025-11-18'
    }, 3);
  },

  // Test assessment notification
  testAssessmentNotification: async () => {
    await sendAssessmentNotification({
      assessmentTitle: 'Safety Quiz',
      trainingTitle: 'Laboratory Safety',
      assessmentId: 1,
      dueDate: '2025-11-20'
    }, 'published');
  },

  // Test extension request
  testExtensionRequest: async () => {
    await extensionEventHandlers.onExtensionRequested(
      { id: 1, title: 'GMP Fundamentals' },
      { name: 'Jane Trainee' },
      5,
      'Need more time to complete practical exercises'
    );
  },

  // Test training completion
  testTrainingCompletion: async () => {
    await trainingEventHandlers.onTrainingCompleted(
      { id: 1, title: 'GMP Fundamentals' },
      { name: 'Jane Trainee' }
    );
  }
};

export default {
  trainingEventHandlers,
  extensionEventHandlers,
  assessmentEventHandlers,
  feedbackEventHandlers,
  certificateEventHandlers,
  systemEventHandlers,
  scheduleReminderCheck,
  sampleNotifications
};