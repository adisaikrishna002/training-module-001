/**
 * Training Management System - Core Application Module
 */

export class UserService {
  constructor() {
    this.users = new Map();
  }
  
  async createUser(userData) {
    const user = {
      id: Date.now(),
      ...userData,
      createdAt: new Date().toISOString(),
      active: true
    };
    
    this.users.set(user.id, user);
    console.log(` User created: ${user.name} (${user.role})`);
    return user;
  }
  
  async getUserById(userId) {
    return this.users.get(userId);
  }
}

export class TrainingService {
  constructor() {
    this.trainings = new Map();
  }
  
  async createTraining(trainingData) {
    const training = {
      id: Date.now(),
      ...trainingData,
      createdAt: new Date().toISOString(),
      status: 'draft'
    };
    
    this.trainings.set(training.id, training);
    console.log(` Training created: ${training.title}`);
    return training;
  }
}

export class ApplicationCore {
  constructor() {
    this.userService = new UserService();
    this.trainingService = new TrainingService();
  }
  
  async initialize() {
    console.log(' Initializing Application Core Services...');
    console.log(' Application Core Services ready');
  }
}

export default ApplicationCore;
