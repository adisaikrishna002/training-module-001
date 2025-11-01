# Training Management System - Source Code

This directory contains the core source code for the Training Management System application.

##  Directory Structure

```
src/
 index.js      # Main application entry point and configuration
 app.js        # Core application services and business logic
 models.js     # Data models and database configuration
 utils.js      # Utility functions and helper methods
 api.js        # API configuration and HTTP client services
 README.md     # This documentation file
```

##  File Descriptions

### `index.js` - Application Entry Point
- **Purpose**: Main application configuration and initialization
- **Key Components**:
  - `APP_CONFIG`: Comprehensive application configuration object
  - `TrainingManagementApp`: Main application class with initialization logic

### `app.js` - Core Services
- **Purpose**: Business logic and core application services
- **Key Components**:
  - `UserService`: User management and authentication
  - `TrainingService`: Training creation and management
  - `ApplicationCore`: Central service coordinator

### `models.js` - Data Models
- **Purpose**: Data structures and database configuration
- **Key Components**:
  - `User`: User model with role-based permissions
  - `Training`: Training content and metadata model
  - `Assessment`: Assessment and quiz model

### `utils.js` - Utility Functions
- **Purpose**: Common utility functions and helpers
- **Key Components**:
  - `DateUtils`: Date formatting and manipulation
  - `StringUtils`: String processing and validation
  - `ValidationUtils`: Form and data validation

### `api.js` - API Services
- **Purpose**: HTTP client and API communication
- **Key Components**:
  - `HttpClient`: Core HTTP client with retry logic
  - `API_CONFIG`: API endpoint configuration

##  Getting Started

### Prerequisites
- Node.js 18+ 
- Next.js 16.0.1
- Modern web browser with JavaScript enabled

### Installation
1. Install dependencies: `npm install`
2. Set up environment variables: `cp .env.example .env.local`
3. Configure application settings in `src/index.js`

### Development Usage

#### Initialize Application Core
```javascript
import { ApplicationCore } from './src/app.js';

const app = new ApplicationCore();
await app.initialize();
```

#### Use Individual Services
```javascript
import { UserService, TrainingService } from './src/app.js';

const userService = new UserService();
const trainingService = new TrainingService();
```

---

**Last Updated**: January 2025
**Version**: 1.0.0
**Maintainers**: Development Team
