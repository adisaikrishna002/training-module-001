import { useState } from 'react';
import { useAuth } from '../components/AuthContext';
import { useRouter } from 'next/router';
import { ROLE_LABELS } from '../utils/rbac';

export default function Login() {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await login(credentials.username, credentials.password);
      if (result.success) {
        router.push('/dashboard');
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  // Demo credentials
  const demoUsers = [
    { username: 'admin', password: 'admin123', role: 'System Administrator' },
    { username: 'coordinator', password: 'coord123', role: 'Training Coordinator' },
    { username: 'trainer', password: 'trainer123', role: 'Trainer' },
    { username: 'trainee', password: 'trainee123', role: 'Trainee' },
    { username: 'hod', password: 'hod123', role: 'HOD / Approver' }
  ];

  const fillCredentials = (username, password) => {
    setCredentials({ username, password });
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f5f5f5',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '40px',
        borderRadius: '10px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        width: '100%',
        maxWidth: '400px'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h1 style={{ color: '#333', marginBottom: '10px' }}>Training Management System</h1>
          <p style={{ color: '#666', fontSize: '14px' }}>Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', color: '#333', fontSize: '14px', fontWeight: 'bold' }}>
              Username
            </label>
            <input
              type="text"
              name="username"
              value={credentials.username}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #ddd',
                borderRadius: '5px',
                fontSize: '14px',
                boxSizing: 'border-box'
              }}
              placeholder="Enter your username"
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', color: '#333', fontSize: '14px', fontWeight: 'bold' }}>
              Password
            </label>
            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #ddd',
                borderRadius: '5px',
                fontSize: '14px',
                boxSizing: 'border-box'
              }}
              placeholder="Enter your password"
            />
          </div>

          {error && (
            <div style={{
              backgroundColor: '#ffe6e6',
              color: '#d8000c',
              padding: '10px',
              borderRadius: '5px',
              marginBottom: '20px',
              fontSize: '14px'
            }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: loading ? '#ccc' : '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: loading ? 'not-allowed' : 'pointer',
              marginBottom: '20px'
            }}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <div style={{ borderTop: '1px solid #eee', paddingTop: '20px' }}>
          <h3 style={{ fontSize: '14px', color: '#666', marginBottom: '15px' }}>Demo Credentials:</h3>
          <div style={{ display: 'grid', gap: '8px' }}>
            {demoUsers.map((user, index) => (
              <button
                key={index}
                type="button"
                onClick={() => fillCredentials(user.username, user.password)}
                style={{
                  padding: '8px 12px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  backgroundColor: '#f8f9fa',
                  fontSize: '12px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  display: 'flex',
                  justifyContent: 'space-between'
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#e9ecef'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#f8f9fa'}
              >
                <span style={{ fontWeight: 'bold' }}>{user.username}</span>
                <span style={{ color: '#666' }}>{user.role}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}