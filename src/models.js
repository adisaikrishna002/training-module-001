/**
 * Database Models and Configuration
 */

export class User {
  constructor(data) {
    this.id = data.id || null;
    this.username = data.username;
    this.name = data.name;
    this.email = data.email;
    this.role = data.role;
    this.active = data.active !== undefined ? data.active : true;
    this.createdAt = data.createdAt || new Date().toISOString();
  }

  hasPermission(permission) {
    const rolePermissions = {
      admin: ['all'],
      hod: ['department_manage', 'approve_trainings', 'view_reports'],
      hr: ['user_manage', 'training_manage', 'view_reports'],
      coordinator: ['training_coordinate', 'assign_trainings', 'view_progress'],
      trainer: ['create_content', 'conduct_training', 'grade_assessments'],
      trainee: ['take_training', 'view_assignments', 'submit_assessments']
    };

    const permissions = rolePermissions[this.role] || [];
    return permissions.includes('all') || permissions.includes(permission);
  }
}

export class Training {
  constructor(data) {
    this.id = data.id || null;
    this.title = data.title;
    this.description = data.description;
    this.category = data.category;
    this.duration = data.duration;
    this.status = data.status || 'draft';
    this.createdAt = data.createdAt || new Date().toISOString();
  }
}

export class Assessment {
  constructor(data) {
    this.id = data.id || null;
    this.title = data.title;
    this.questions = data.questions || [];
    this.passingScore = data.passingScore || 70;
    this.timeLimit = data.timeLimit || null;
    this.createdAt = data.createdAt || new Date().toISOString();
  }
}

export default {
  User,
  Training,
  Assessment
};
