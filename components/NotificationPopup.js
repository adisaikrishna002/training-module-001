// components/NotificationPopup.js
import React from 'react';

export default function NotificationPopup({ open, title, message, onClose }) {
  if (!open) return null;
  return (
    <div style={{
      position: 'fixed',
      top: 20,
      right: 20,
      zIndex: 9999,
      background: '#fff',
      border: '1px solid #1976d2',
      borderRadius: 8,
      boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
      padding: 20,
      minWidth: 300,
    }}>
      <strong style={{ color: '#1976d2' }}>{title}</strong>
      <div style={{ margin: '10px 0' }}>{message}</div>
      <button onClick={onClose} style={{ background: '#1976d2', color: '#fff', border: 'none', borderRadius: 4, padding: '6px 16px', cursor: 'pointer' }}>Close</button>
    </div>
  );
}
