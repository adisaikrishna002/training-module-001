/**
 * API Configuration and HTTP Client
 */

export const API_CONFIG = {
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
  timeout: 30000,
  
  endpoints: {
    login: '/auth/login',
    users: '/users',
    trainings: '/trainings',
    assessments: '/assessments',
    notifications: '/notifications'
  }
};

export class HttpClient {
  constructor(config = {}) {
    this.baseURL = config.baseURL || API_CONFIG.baseURL;
    this.timeout = config.timeout || API_CONFIG.timeout;
  }

  async request(config) {
    const { method = 'GET', endpoint, data } = config;
    const url = this.baseURL + endpoint;

    const requestOptions = {
      method: method.toUpperCase(),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    };

    if (data && ['POST', 'PUT', 'PATCH'].includes(method.toUpperCase())) {
      requestOptions.body = JSON.stringify(data);
    }

    try {
      console.log(` ${method.toUpperCase()} ${url}`);
      const response = await fetch(url, requestOptions);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Request failed:', error.message);
      throw error;
    }
  }

  async get(endpoint, options = {}) {
    return this.request({ method: 'GET', endpoint, ...options });
  }

  async post(endpoint, data, options = {}) {
    return this.request({ method: 'POST', endpoint, data, ...options });
  }
}

export const httpClient = new HttpClient();

export default {
  API_CONFIG,
  HttpClient,
  httpClient
};
