/**
 * Shared Design System for Training Management Pages
 * Consistent visual components and styles
 */

import React from 'react';

// Design System Constants
export const DESIGN_TOKENS = {
  colors: {
    primary: '#2563eb',
    primaryHover: '#1d4ed8',
    secondary: '#64748b',
    success: '#059669',
    warning: '#d97706',
    danger: '#dc2626',
    light: '#f8fafc',
    dark: '#1e293b',
    border: '#e2e8f0',
    borderLight: '#f1f5f9',
    text: {
      primary: '#0f172a',
      secondary: '#475569',
      muted: '#94a3b8'
    },
    background: {
      main: '#ffffff',
      light: '#f8fafc',
      card: '#ffffff'
    }
  },
  spacing: {
    xs: '0.25rem',    // 4px
    sm: '0.5rem',     // 8px
    md: '1rem',       // 16px
    lg: '1.5rem',     // 24px
    xl: '2rem',       // 32px
    '2xl': '3rem',    // 48px
    '3xl': '4rem'     // 64px
  },
  borderRadius: {
    sm: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem'
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
  },
  typography: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem'
    },
    fontWeight: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700
    }
  }
};

// Shared Components

// Page Container
export const PageContainer = ({ children, className = '', ...props }) => (
  <div
    className={`training-page-container ${className}`}
    style={{
      minHeight: '100vh',
      backgroundColor: DESIGN_TOKENS.colors.background.light,
      padding: DESIGN_TOKENS.spacing['2xl'],
      fontFamily: DESIGN_TOKENS.typography.fontFamily,
      ...props.style
    }}
    {...props}
  >
    {children}
  </div>
);

// Card Component
export const Card = ({ children, className = '', padding = 'xl', shadow = 'md', ...props }) => (
  <div
    className={`training-card ${className}`}
    style={{
      backgroundColor: DESIGN_TOKENS.colors.background.card,
      borderRadius: DESIGN_TOKENS.borderRadius.lg,
      border: `1px solid ${DESIGN_TOKENS.colors.border}`,
      boxShadow: DESIGN_TOKENS.shadows[shadow],
      padding: DESIGN_TOKENS.spacing[padding],
      marginBottom: DESIGN_TOKENS.spacing.lg,
      ...props.style
    }}
    {...props}
  >
    {children}
  </div>
);

// Page Header
export const PageHeader = ({ title, subtitle, actions, className = '', ...props }) => (
  <div
    className={`training-page-header ${className}`}
    style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: DESIGN_TOKENS.spacing['2xl'],
      ...props.style
    }}
    {...props}
  >
    <div>
      <h1 style={{
        fontSize: DESIGN_TOKENS.typography.fontSize['3xl'],
        fontWeight: DESIGN_TOKENS.typography.fontWeight.bold,
        color: DESIGN_TOKENS.colors.text.primary,
        margin: 0,
        marginBottom: subtitle ? DESIGN_TOKENS.spacing.xs : 0
      }}>
        {title}
      </h1>
      {subtitle && (
        <p style={{
          fontSize: DESIGN_TOKENS.typography.fontSize.lg,
          color: DESIGN_TOKENS.colors.text.secondary,
          margin: 0
        }}>
          {subtitle}
        </p>
      )}
    </div>
    {actions && (
      <div style={{ display: 'flex', gap: DESIGN_TOKENS.spacing.md }}>
        {actions}
      </div>
    )}
  </div>
);

// Section Header
export const SectionHeader = ({ title, description, className = '', ...props }) => (
  <div
    className={`training-section-header ${className}`}
    style={{
      marginBottom: DESIGN_TOKENS.spacing.xl,
      paddingBottom: DESIGN_TOKENS.spacing.md,
      borderBottom: `2px solid ${DESIGN_TOKENS.colors.borderLight}`,
      ...props.style
    }}
    {...props}
  >
    <h3 style={{
      fontSize: DESIGN_TOKENS.typography.fontSize.xl,
      fontWeight: DESIGN_TOKENS.typography.fontWeight.semibold,
      color: DESIGN_TOKENS.colors.text.primary,
      margin: 0,
      marginBottom: description ? DESIGN_TOKENS.spacing.xs : 0
    }}>
      {title}
    </h3>
    {description && (
      <p style={{
        fontSize: DESIGN_TOKENS.typography.fontSize.sm,
        color: DESIGN_TOKENS.colors.text.muted,
        margin: 0
      }}>
        {description}
      </p>
    )}
  </div>
);

// Form Grid
export const FormGrid = ({ children, columns = 2, gap = 'lg', className = '', ...props }) => (
  <div
    className={`training-form-grid ${className}`}
    style={{
      display: 'grid',
      gridTemplateColumns: `repeat(${columns}, 1fr)`,
      gap: DESIGN_TOKENS.spacing[gap],
      marginBottom: DESIGN_TOKENS.spacing.lg,
      ...props.style
    }}
    {...props}
  >
    {children}
  </div>
);

// Form Group
export const FormGroup = ({ children, className = '', fullWidth = false, ...props }) => (
  <div
    className={`training-form-group ${className}`}
    style={{
      display: 'flex',
      flexDirection: 'column',
      gap: DESIGN_TOKENS.spacing.xs,
      gridColumn: fullWidth ? '1 / -1' : 'auto',
      ...props.style
    }}
    {...props}
  >
    {children}
  </div>
);

// Label
export const Label = ({ children, required = false, className = '', ...props }) => (
  <label
    className={`training-label ${className}`}
    style={{
      fontSize: DESIGN_TOKENS.typography.fontSize.sm,
      fontWeight: DESIGN_TOKENS.typography.fontWeight.medium,
      color: DESIGN_TOKENS.colors.text.primary,
      marginBottom: DESIGN_TOKENS.spacing.xs,
      ...props.style
    }}
    {...props}
  >
    {children}
    {required && (
      <span style={{ color: DESIGN_TOKENS.colors.danger, marginLeft: DESIGN_TOKENS.spacing.xs }}>
        *
      </span>
    )}
  </label>
);

// Input
export const Input = ({ error, className = '', ...props }) => (
  <input
    className={`training-input ${className}`}
    style={{
      width: '100%',
      padding: `${DESIGN_TOKENS.spacing.md} ${DESIGN_TOKENS.spacing.md}`,
      border: `1px solid ${error ? DESIGN_TOKENS.colors.danger : DESIGN_TOKENS.colors.border}`,
      borderRadius: DESIGN_TOKENS.borderRadius.md,
      fontSize: DESIGN_TOKENS.typography.fontSize.sm,
      fontFamily: DESIGN_TOKENS.typography.fontFamily,
      backgroundColor: DESIGN_TOKENS.colors.background.main,
      transition: 'all 0.2s ease-in-out',
      outline: 'none',
      ...props.style
    }}
    onFocus={(e) => {
      e.target.style.borderColor = DESIGN_TOKENS.colors.primary;
      e.target.style.boxShadow = `0 0 0 3px ${DESIGN_TOKENS.colors.primary}20`;
      props.onFocus && props.onFocus(e);
    }}
    onBlur={(e) => {
      e.target.style.borderColor = error ? DESIGN_TOKENS.colors.danger : DESIGN_TOKENS.colors.border;
      e.target.style.boxShadow = 'none';
      props.onBlur && props.onBlur(e);
    }}
    {...props}
  />
);

// Select
export const Select = ({ error, children, className = '', ...props }) => (
  <select
    className={`training-select ${className}`}
    style={{
      width: '100%',
      padding: `${DESIGN_TOKENS.spacing.md} ${DESIGN_TOKENS.spacing.md}`,
      border: `1px solid ${error ? DESIGN_TOKENS.colors.danger : DESIGN_TOKENS.colors.border}`,
      borderRadius: DESIGN_TOKENS.borderRadius.md,
      fontSize: DESIGN_TOKENS.typography.fontSize.sm,
      fontFamily: DESIGN_TOKENS.typography.fontFamily,
      backgroundColor: DESIGN_TOKENS.colors.background.main,
      transition: 'all 0.2s ease-in-out',
      outline: 'none',
      cursor: 'pointer',
      ...props.style
    }}
    onFocus={(e) => {
      e.target.style.borderColor = DESIGN_TOKENS.colors.primary;
      e.target.style.boxShadow = `0 0 0 3px ${DESIGN_TOKENS.colors.primary}20`;
      props.onFocus && props.onFocus(e);
    }}
    onBlur={(e) => {
      e.target.style.borderColor = error ? DESIGN_TOKENS.colors.danger : DESIGN_TOKENS.colors.border;
      e.target.style.boxShadow = 'none';
      props.onBlur && props.onBlur(e);
    }}
    {...props}
  >
    {children}
  </select>
);

// Textarea
export const Textarea = ({ error, rows = 4, className = '', ...props }) => (
  <textarea
    rows={rows}
    className={`training-textarea ${className}`}
    style={{
      width: '100%',
      padding: `${DESIGN_TOKENS.spacing.md} ${DESIGN_TOKENS.spacing.md}`,
      border: `1px solid ${error ? DESIGN_TOKENS.colors.danger : DESIGN_TOKENS.colors.border}`,
      borderRadius: DESIGN_TOKENS.borderRadius.md,
      fontSize: DESIGN_TOKENS.typography.fontSize.sm,
      fontFamily: DESIGN_TOKENS.typography.fontFamily,
      backgroundColor: DESIGN_TOKENS.colors.background.main,
      transition: 'all 0.2s ease-in-out',
      outline: 'none',
      resize: 'vertical',
      minHeight: '100px',
      ...props.style
    }}
    onFocus={(e) => {
      e.target.style.borderColor = DESIGN_TOKENS.colors.primary;
      e.target.style.boxShadow = `0 0 0 3px ${DESIGN_TOKENS.colors.primary}20`;
      props.onFocus && props.onFocus(e);
    }}
    onBlur={(e) => {
      e.target.style.borderColor = error ? DESIGN_TOKENS.colors.danger : DESIGN_TOKENS.colors.border;
      e.target.style.boxShadow = 'none';
      props.onBlur && props.onBlur(e);
    }}
    {...props}
  />
);

// Button
export const Button = ({ 
  variant = 'primary', 
  size = 'md', 
  children, 
  disabled = false,
  loading = false,
  className = '', 
  ...props 
}) => {
  const variants = {
    primary: {
      backgroundColor: disabled ? DESIGN_TOKENS.colors.border : DESIGN_TOKENS.colors.primary,
      color: DESIGN_TOKENS.colors.background.main,
      border: 'none',
      hoverColor: DESIGN_TOKENS.colors.primaryHover
    },
    secondary: {
      backgroundColor: 'transparent',
      color: DESIGN_TOKENS.colors.secondary,
      border: `1px solid ${DESIGN_TOKENS.colors.border}`,
      hoverColor: DESIGN_TOKENS.colors.background.light
    },
    success: {
      backgroundColor: disabled ? DESIGN_TOKENS.colors.border : DESIGN_TOKENS.colors.success,
      color: DESIGN_TOKENS.colors.background.main,
      border: 'none'
    },
    danger: {
      backgroundColor: disabled ? DESIGN_TOKENS.colors.border : DESIGN_TOKENS.colors.danger,
      color: DESIGN_TOKENS.colors.background.main,
      border: 'none'
    }
  };

  const sizes = {
    sm: {
      padding: `${DESIGN_TOKENS.spacing.sm} ${DESIGN_TOKENS.spacing.md}`,
      fontSize: DESIGN_TOKENS.typography.fontSize.sm
    },
    md: {
      padding: `${DESIGN_TOKENS.spacing.md} ${DESIGN_TOKENS.spacing.lg}`,
      fontSize: DESIGN_TOKENS.typography.fontSize.sm
    },
    lg: {
      padding: `${DESIGN_TOKENS.spacing.lg} ${DESIGN_TOKENS.spacing.xl}`,
      fontSize: DESIGN_TOKENS.typography.fontSize.base
    }
  };

  const variantStyle = variants[variant];
  const sizeStyle = sizes[size];

  return (
    <button
      className={`training-button training-button-${variant} training-button-${size} ${className}`}
      disabled={disabled || loading}
      style={{
        ...variantStyle,
        ...sizeStyle,
        borderRadius: DESIGN_TOKENS.borderRadius.md,
        fontWeight: DESIGN_TOKENS.typography.fontWeight.medium,
        fontFamily: DESIGN_TOKENS.typography.fontFamily,
        cursor: disabled || loading ? 'not-allowed' : 'pointer',
        transition: 'all 0.2s ease-in-out',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: DESIGN_TOKENS.spacing.sm,
        opacity: disabled || loading ? 0.6 : 1,
        ...props.style
      }}
      onMouseEnter={(e) => {
        if (!disabled && !loading && variantStyle.hoverColor) {
          e.target.style.backgroundColor = variantStyle.hoverColor;
        }
        props.onMouseEnter && props.onMouseEnter(e);
      }}
      onMouseLeave={(e) => {
        if (!disabled && !loading) {
          e.target.style.backgroundColor = variantStyle.backgroundColor;
        }
        props.onMouseLeave && props.onMouseLeave(e);
      }}
      {...props}
    >
      {loading && (
        <span style={{
          width: '16px',
          height: '16px',
          border: '2px solid transparent',
          borderTop: '2px solid currentColor',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }} />
      )}
      {children}
    </button>
  );
};

// Error Message
export const ErrorMessage = ({ children, className = '', ...props }) => (
  <div
    className={`training-error-message ${className}`}
    style={{
      color: DESIGN_TOKENS.colors.danger,
      fontSize: DESIGN_TOKENS.typography.fontSize.xs,
      marginTop: DESIGN_TOKENS.spacing.xs,
      ...props.style
    }}
    {...props}
  >
    {children}
  </div>
);

// Success Message
export const SuccessMessage = ({ children, className = '', ...props }) => (
  <div
    className={`training-success-message ${className}`}
    style={{
      color: DESIGN_TOKENS.colors.success,
      fontSize: DESIGN_TOKENS.typography.fontSize.sm,
      padding: DESIGN_TOKENS.spacing.md,
      backgroundColor: `${DESIGN_TOKENS.colors.success}10`,
      border: `1px solid ${DESIGN_TOKENS.colors.success}30`,
      borderRadius: DESIGN_TOKENS.borderRadius.md,
      marginBottom: DESIGN_TOKENS.spacing.lg,
      ...props.style
    }}
    {...props}
  >
    {children}
  </div>
);

// Badge
export const Badge = ({ children, variant = 'default', className = '', ...props }) => {
  const variants = {
    default: { backgroundColor: DESIGN_TOKENS.colors.border, color: DESIGN_TOKENS.colors.text.secondary },
    primary: { backgroundColor: DESIGN_TOKENS.colors.primary, color: DESIGN_TOKENS.colors.background.main },
    success: { backgroundColor: DESIGN_TOKENS.colors.success, color: DESIGN_TOKENS.colors.background.main },
    warning: { backgroundColor: DESIGN_TOKENS.colors.warning, color: DESIGN_TOKENS.colors.background.main },
    danger: { backgroundColor: DESIGN_TOKENS.colors.danger, color: DESIGN_TOKENS.colors.background.main }
  };

  return (
    <span
      className={`training-badge training-badge-${variant} ${className}`}
      style={{
        ...variants[variant],
        fontSize: DESIGN_TOKENS.typography.fontSize.xs,
        fontWeight: DESIGN_TOKENS.typography.fontWeight.medium,
        padding: `${DESIGN_TOKENS.spacing.xs} ${DESIGN_TOKENS.spacing.sm}`,
        borderRadius: DESIGN_TOKENS.borderRadius.sm,
        display: 'inline-block',
        ...props.style
      }}
      {...props}
    >
      {children}
    </span>
  );
};

// Loading Spinner
export const LoadingSpinner = ({ size = 'md', className = '', ...props }) => {
  const sizes = {
    sm: '16px',
    md: '24px',
    lg: '32px'
  };

  return (
    <div
      className={`training-loading-spinner ${className}`}
      style={{
        width: sizes[size],
        height: sizes[size],
        border: '2px solid transparent',
        borderTop: `2px solid ${DESIGN_TOKENS.colors.primary}`,
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
        ...props.style
      }}
      {...props}
    />
  );
};

// Add CSS animation for loading spinner
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;
  document.head.appendChild(style);
}

export default {
  DESIGN_TOKENS,
  PageContainer,
  Card,
  PageHeader,
  SectionHeader,
  FormGrid,
  FormGroup,
  Label,
  Input,
  Select,
  Textarea,
  Button,
  ErrorMessage,
  SuccessMessage,
  Badge,
  LoadingSpinner
};