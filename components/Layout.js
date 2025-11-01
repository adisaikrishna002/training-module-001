import { useState } from 'react';
import { useAuth } from './AuthContext';
import { useRouter } from 'next/router';
import { MODULES, ROLE_LABELS } from '../utils/rbac';
import NotificationBell from './NotificationBell';

export default function Layout({ children }) {
  const { user, logout, canUserAccessModule } = useAuth();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  if (!user) {
    return null; // Will be handled by auth protection
  }

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', module: MODULES.DASHBOARD, icon: '📊' },
    { name: 'User Management', href: '/users', module: MODULES.USER_MANAGEMENT, icon: '👥' },
    { name: 'Training Creation', href: '/training/create', module: MODULES.TRAINING_CREATION, icon: '📚' },
    { name: 'Training Assignments', href: '/training/assignments', module: MODULES.TRAINING_ASSIGNMENTS, icon: '📋' },
    { name: 'Assessments', href: '/assessments', module: MODULES.ASSESSMENTS, icon: '📝' },
    { name: 'Certificates', href: '/certificates', module: MODULES.CERTIFICATES, icon: '🏆' },
    { name: 'Materials Library', href: '/materials', module: MODULES.MATERIAL_LIBRARY, icon: '📁' },
    { name: 'Analytics & Reports', href: '/reports', module: MODULES.ANALYTICS_REPORTS, icon: '📈' },
    { name: 'Categories', href: '/categories', module: MODULES.CATEGORIES, icon: '🏷️' },
    { name: 'Notifications', href: '/notifications', module: MODULES.NOTIFICATIONS, icon: '🔔' }
  ];

  const accessibleNavigation = navigation.filter(item => canUserAccessModule(item.module));

  return (
    <div style={{ display: 'flex', height: '100vh', fontFamily: 'Arial, sans-serif' }}>
      {/* Sidebar */}
      <div style={{
        width: sidebarOpen ? '250px' : '60px',
        backgroundColor: '#2c3e50',
        color: 'white',
        transition: 'width 0.3s',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Logo/Header */}
        <div style={{
          padding: '20px',
          borderBottom: '1px solid #34495e',
          display: 'flex',
          alignItems: 'center',
          justifyContent: sidebarOpen ? 'space-between' : 'center'
        }}>
          {sidebarOpen && <h2 style={{ margin: 0, fontSize: '18px' }}>TMS</h2>}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            style={{
              background: 'none',
              border: 'none',
              color: 'white',
              fontSize: '18px',
              cursor: 'pointer'
            }}
          >
            {sidebarOpen ? '◄' : '►'}
          </button>
        </div>

        {/* Navigation */}
        <nav style={{ flex: 1, padding: '20px 0' }}>
          {accessibleNavigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: sidebarOpen ? '12px 20px' : '12px',
                color: 'white',
                textDecoration: 'none',
                transition: 'background-color 0.2s',
                backgroundColor: router.pathname === item.href ? '#34495e' : 'transparent'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#34495e'}
              onMouseOut={(e) => e.target.style.backgroundColor = router.pathname === item.href ? '#34495e' : 'transparent'}
            >
              <span style={{ fontSize: '18px', marginRight: sidebarOpen ? '12px' : '0' }}>
                {item.icon}
              </span>
              {sidebarOpen && <span>{item.name}</span>}
            </a>
          ))}
        </nav>

        {/* User Info */}
        <div style={{
          padding: '20px',
          borderTop: '1px solid #34495e'
        }}>
          {sidebarOpen ? (
            <div>
              <div style={{ fontSize: '14px', marginBottom: '5px' }}>{user.name}</div>
              <div style={{ fontSize: '12px', color: '#bdc3c7', marginBottom: '10px' }}>
                {ROLE_LABELS[user.role]}
              </div>
              <button
                onClick={handleLogout}
                style={{
                  width: '100%',
                  padding: '8px',
                  backgroundColor: '#e74c3c',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '12px'
                }}
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={handleLogout}
              style={{
                width: '100%',
                padding: '8px',
                backgroundColor: '#e74c3c',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '18px'
              }}
            >
              🚪
            </button>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Top Bar */}
        <header style={{
          backgroundColor: 'white',
          borderBottom: '1px solid #e0e0e0',
          padding: '0 30px',
          height: '60px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <h1 style={{ margin: 0, fontSize: '24px', color: '#333' }}>
            Training Management System
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <NotificationBell />
            <div style={{ fontSize: '14px', color: '#666' }}>
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </div>
            <div style={{
              padding: '8px 16px',
              backgroundColor: '#f8f9fa',
              borderRadius: '20px',
              fontSize: '12px',
              color: '#666'
            }}>
              {user.site}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main style={{
          flex: 1,
          padding: '30px',
          backgroundColor: '#f8f9fa',
          overflow: 'auto'
        }}>
          {children}
        </main>
      </div>
    </div>
  );
}