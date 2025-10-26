// utils/dataHandlers.js
// Centralized data handler functions for dashboard, notifications, and training detail pages

export async function fetchDashboardMetrics() {
  // Example: Replace with real API call
  // return fetch('/api/dashboard/metrics').then(res => res.json());
  return Promise.resolve({ metrics: [], lastUpdated: new Date().toISOString() });
}

export async function fetchNotifications() {
  // Example: Replace with real API call
  // return fetch('/api/notifications').then(res => res.json());
  return Promise.resolve({ notifications: [], lastUpdated: new Date().toISOString() });
}

export async function fetchTrainingDetails(trainingId) {
  // Example: Replace with real API call
  // return fetch(`/api/trainings/${trainingId}`).then(res => res.json());
  return Promise.resolve({ training: null, lastUpdated: new Date().toISOString() });
}

// Add error handling, loading state, and metadata normalization as needed
