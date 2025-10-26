import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { useAuth } from '../components/AuthContext';
import { MOCK_TRAININGS, MOCK_USERS } from '../data/mockData';
import { PERMISSIONS, MODULES } from '../utils/rbac';

// Certificate Template Component
const CertificateTemplate = ({ certificate, onClose }) => {
  if (!certificate) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()}
        style={{ 
          maxWidth: '800px', 
          width: '90%',
          backgroundColor: 'white',
          padding: '0',
          borderRadius: '10px',
          overflow: 'hidden'
        }}
      >
        {/* Certificate Design */}
        <div style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          padding: '40px',
          textAlign: 'center',
          color: 'white',
          position: 'relative'
        }}>
          {/* Decorative Border */}
          <div style={{
            position: 'absolute',
            top: '20px',
            left: '20px',
            right: '20px',
            bottom: '20px',
            border: '3px solid rgba(255,255,255,0.3)',
            borderRadius: '10px'
          }} />
          
          <div style={{ position: 'relative', zIndex: 1 }}>
            <h1 style={{ 
              fontSize: '48px', 
              margin: '0 0 20px 0', 
              fontFamily: 'serif',
              fontWeight: 'normal'
            }}>
              Certificate of Completion
            </h1>
            
            <div style={{ fontSize: '18px', marginBottom: '30px', opacity: 0.9 }}>
              This is to certify that
            </div>
            
            <div style={{ 
              fontSize: '36px', 
              fontWeight: 'bold', 
              margin: '20px 0',
              borderBottom: '2px solid rgba(255,255,255,0.5)',
              paddingBottom: '10px',
              display: 'inline-block',
              minWidth: '300px'
            }}>
              {certificate.recipientName}
            </div>
            
            <div style={{ fontSize: '18px', margin: '30px 0', opacity: 0.9 }}>
              has successfully completed the training program
            </div>
            
            <div style={{ 
              fontSize: '28px', 
              fontWeight: 'bold', 
              margin: '20px 0',
              color: '#fff3cd'
            }}>
              {certificate.trainingTitle}
            </div>
            
            <div style={{ fontSize: '16px', margin: '30px 0', opacity: 0.8 }}>
              Completed on {new Date(certificate.completionDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>
            
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: '1fr 1fr', 
              gap: '40px', 
              marginTop: '40px',
              fontSize: '14px'
            }}>
              <div>
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.5)', paddingTop: '10px' }}>
                  <div style={{ fontWeight: 'bold' }}>Training Coordinator</div>
                  <div style={{ opacity: 0.8 }}>{certificate.coordinator}</div>
                </div>
              </div>
              <div>
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.5)', paddingTop: '10px' }}>
                  <div style={{ fontWeight: 'bold' }}>Certificate ID</div>
                  <div style={{ opacity: 0.8 }}>{certificate.certificateId}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Certificate Footer */}
        <div style={{ 
          padding: '20px', 
          backgroundColor: '#f8f9fa', 
          textAlign: 'center',
          fontSize: '12px',
          color: '#666'
        }}>
          <p style={{ margin: '0 0 10px 0' }}>
            Score: {certificate.score}% | Duration: {certificate.duration} hours | 
            Validity: {certificate.validityPeriod}
          </p>
          <p style={{ margin: 0 }}>
            This certificate is digitally signed and verified by the Training Management System
          </p>
        </div>
        
        {/* Action Buttons */}
        <div style={{ 
          padding: '20px', 
          borderTop: '1px solid #e0e0e0',
          display: 'flex', 
          gap: '10px', 
          justifyContent: 'center' 
        }}>
          <button
            onClick={() => window.print()}
            style={{
              padding: '10px 20px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Print Certificate
          </button>
          <button
            onClick={() => {
              // Create a download link for the certificate
              const element = document.createElement('a');
              element.href = 'data:text/html;charset=utf-8,' + encodeURIComponent(document.documentElement.outerHTML);
              element.download = `Certificate_${certificate.recipientName}_${certificate.trainingTitle}.html`;
              element.click();
            }}
            style={{
              padding: '10px 20px',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Download PDF
          </button>
          <button
            onClick={onClose}
            style={{
              padding: '10px 20px',
              backgroundColor: '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

// Certificate Card Component
const CertificateCard = ({ certificate, onView, onRevoke, canRevoke }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Valid': return '#28a745';
      case 'Expired': return '#dc3545';
      case 'Revoked': return '#6c757d';
      default: return '#6c757d';
    }
  };

  const isExpired = new Date(certificate.expiryDate) < new Date();
  const status = certificate.status === 'Revoked' ? 'Revoked' : isExpired ? 'Expired' : 'Valid';

  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '10px',
      padding: '20px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      border: '1px solid #e0e0e0',
      position: 'relative'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
        <h3 style={{ margin: 0, fontSize: '18px' }}>{certificate.trainingTitle}</h3>
        <span style={{
          padding: '4px 12px',
          borderRadius: '12px',
          fontSize: '12px',
          fontWeight: 'bold',
          backgroundColor: getStatusColor(status),
          color: 'white'
        }}>
          {status}
        </span>
      </div>

      <div style={{ marginBottom: '15px' }}>
        <div style={{ fontWeight: 'bold', fontSize: '16px', color: '#333' }}>
          {certificate.recipientName}
        </div>
        <div style={{ fontSize: '14px', color: '#666' }}>
          {certificate.recipientEmail}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px', fontSize: '14px' }}>
        <div>
          <strong>Completion Date:</strong><br />
          {new Date(certificate.completionDate).toLocaleDateString()}
        </div>
        <div>
          <strong>Score:</strong><br />
          {certificate.score}%
        </div>
        <div>
          <strong>Certificate ID:</strong><br />
          {certificate.certificateId}
        </div>
        <div>
          <strong>Validity:</strong><br />
          {certificate.validityPeriod}
        </div>
      </div>

      {certificate.expiryDate && (
        <div style={{ 
          fontSize: '12px', 
          color: isExpired ? '#dc3545' : '#666',
          marginBottom: '15px'
        }}>
          {isExpired ? 'Expired' : 'Expires'} on: {new Date(certificate.expiryDate).toLocaleDateString()}
        </div>
      )}

      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        <button
          onClick={() => onView(certificate)}
          style={{
            padding: '8px 16px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontSize: '12px',
            cursor: 'pointer'
          }}
        >
          View Certificate
        </button>
        
        {canRevoke && certificate.status !== 'Revoked' && (
          <button
            onClick={() => onRevoke(certificate)}
            style={{
              padding: '8px 16px',
              backgroundColor: '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              fontSize: '12px',
              cursor: 'pointer'
            }}
          >
            Revoke
          </button>
        )}
      </div>
    </div>
  );
};

export default function Certificates() {
  const { user, hasUserPermission } = useAuth();
  const [certificates, setCertificates] = useState([
    {
      id: 1,
      certificateId: 'CERT-2024-001',
      trainingTitle: 'GMP Fundamentals',
      recipientName: 'Mike Wilson',
      recipientEmail: 'mike.wilson@company.com',
      completionDate: '2024-09-28',
      expiryDate: '2025-09-28',
      score: 88,
      duration: 2,
      validityPeriod: '1 Year',
      coordinator: 'John Smith',
      status: 'Valid'
    },
    {
      id: 2,
      certificateId: 'CERT-2024-002',
      trainingTitle: 'Laboratory Safety Procedures',
      recipientName: 'Jane Doe',
      recipientEmail: 'jane.doe@company.com',
      completionDate: '2024-10-15',
      expiryDate: '2026-10-15',
      score: 92,
      duration: 4,
      validityPeriod: '2 Years',
      coordinator: 'Sarah Johnson',
      status: 'Valid'
    },
    {
      id: 3,
      certificateId: 'CERT-2024-003',
      trainingTitle: 'Quality Control Basics',
      recipientName: 'Bob Smith',
      recipientEmail: 'bob.smith@company.com',
      completionDate: '2023-08-20',
      expiryDate: '2024-08-20',
      score: 85,
      duration: 3,
      validityPeriod: '1 Year',
      coordinator: 'Lisa Chen',
      status: 'Valid'
    }
  ]);

  const [filteredCertificates, setFilteredCertificates] = useState(certificates);
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [showCertificate, setShowCertificate] = useState(false);
  const [notification, setNotification] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    status: '',
    training: ''
  });

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  // Apply filters
  useEffect(() => {
    let filtered = certificates.filter(cert => {
      const isExpired = new Date(cert.expiryDate) < new Date();
      const status = cert.status === 'Revoked' ? 'Revoked' : isExpired ? 'Expired' : 'Valid';
      
      const matchesSearch = cert.recipientName.toLowerCase().includes(filters.search.toLowerCase()) ||
                           cert.trainingTitle.toLowerCase().includes(filters.search.toLowerCase()) ||
                           cert.certificateId.toLowerCase().includes(filters.search.toLowerCase());
      const matchesStatus = !filters.status || status === filters.status;
      const matchesTraining = !filters.training || cert.trainingTitle === filters.training;
      
      return matchesSearch && matchesStatus && matchesTraining;
    });

    setFilteredCertificates(filtered);
  }, [certificates, filters]);

  const handleViewCertificate = (certificate) => {
    setSelectedCertificate(certificate);
    setShowCertificate(true);
  };

  const handleRevokeCertificate = (certificate) => {
    if (!hasUserPermission(MODULES.CERTIFICATES, PERMISSIONS.UPDATE)) {
      showNotification('You do not have permission to revoke certificates.', 'error');
      return;
    }

    if (confirm(`Are you sure you want to revoke the certificate for "${certificate.recipientName}"?`)) {
      setCertificates(prev => prev.map(cert => 
        cert.id === certificate.id ? { ...cert, status: 'Revoked' } : cert
      ));
      showNotification('Certificate revoked successfully!');
    }
  };

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({ ...prev, [filterName]: value }));
  };

  const clearFilters = () => {
    setFilters({ search: '', status: '', training: '' });
  };

  if (!hasUserPermission(MODULES.CERTIFICATES, PERMISSIONS.READ)) {
    return (
      <Layout>
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <h2 style={{ color: '#dc3545' }}>Access Denied</h2>
          <p>You do not have permission to access Certificates.</p>
        </div>
      </Layout>
    );
  }

  const trainings = [...new Set(certificates.map(cert => cert.trainingTitle))];
  const validCerts = certificates.filter(cert => {
    const isExpired = new Date(cert.expiryDate) < new Date();
    return cert.status !== 'Revoked' && !isExpired;
  });
  const expiredCerts = certificates.filter(cert => {
    const isExpired = new Date(cert.expiryDate) < new Date();
    return cert.status !== 'Revoked' && isExpired;
  });
  const revokedCerts = certificates.filter(cert => cert.status === 'Revoked');

  return (
    <Layout>
      <div>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <div>
            <h2 style={{ margin: 0, color: '#333' }}>Certificates</h2>
            <p style={{ margin: '5px 0 0 0', color: '#666' }}>
              View and manage training certificates
            </p>
          </div>
        </div>

        {/* Notification */}
        {notification && (
          <div className={`notification ${notification.type}`} style={{ marginBottom: '20px' }}>
            {notification.message}
            <button
              onClick={() => setNotification(null)}
              style={{ background: 'none', border: 'none', fontSize: '18px', cursor: 'pointer' }}
            >
              ×
            </button>
          </div>
        )}

        {/* Statistics */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '20px', 
          marginBottom: '30px' 
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            border: '3px solid #007bff'
          }}>
            <h3 style={{ margin: '0 0 10px 0', color: '#666' }}>Total Certificates</h3>
            <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#007bff' }}>
              {certificates.length}
            </div>
          </div>
          
          <div style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            border: '3px solid #28a745'
          }}>
            <h3 style={{ margin: '0 0 10px 0', color: '#666' }}>Valid Certificates</h3>
            <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#28a745' }}>
              {validCerts.length}
            </div>
          </div>
          
          <div style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            border: '3px solid #ffc107'
          }}>
            <h3 style={{ margin: '0 0 10px 0', color: '#666' }}>Expired</h3>
            <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#ffc107' }}>
              {expiredCerts.length}
            </div>
          </div>
          
          <div style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            border: '3px solid #dc3545'
          }}>
            <h3 style={{ margin: '0 0 10px 0', color: '#666' }}>Revoked</h3>
            <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#dc3545' }}>
              {revokedCerts.length}
            </div>
          </div>
        </div>

        {/* Filters */}
        <div style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          marginBottom: '30px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
            <h3 style={{ margin: 0 }}>Filters</h3>
            <button
              onClick={clearFilters}
              style={{
                padding: '6px 12px',
                backgroundColor: '#6c757d',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                fontSize: '12px',
                cursor: 'pointer'
              }}
            >
              Clear All
            </button>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px' }}>
            <input
              type="text"
              placeholder="Search by name, training, or certificate ID..."
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              style={{
                padding: '8px',
                border: '1px solid #ddd',
                borderRadius: '4px'
              }}
            />
            
            <select
              value={filters.status}
              onChange={(e) => handleFilterChange('status', e.target.value)}
              style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
            >
              <option value="">All Statuses</option>
              <option value="Valid">Valid</option>
              <option value="Expired">Expired</option>
              <option value="Revoked">Revoked</option>
            </select>
            
            <select
              value={filters.training}
              onChange={(e) => handleFilterChange('training', e.target.value)}
              style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
            >
              <option value="">All Trainings</option>
              {trainings.map(training => (
                <option key={training} value={training}>{training}</option>
              ))}
            </select>
          </div>
          
          <div style={{ marginTop: '10px', fontSize: '14px', color: '#666' }}>
            Showing {filteredCertificates.length} of {certificates.length} certificates
          </div>
        </div>

        {/* Certificates Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', 
          gap: '20px' 
        }}>
          {filteredCertificates.map(certificate => (
            <CertificateCard
              key={certificate.id}
              certificate={certificate}
              onView={handleViewCertificate}
              onRevoke={handleRevokeCertificate}
              canRevoke={hasUserPermission(MODULES.CERTIFICATES, PERMISSIONS.UPDATE)}
            />
          ))}
        </div>

        {filteredCertificates.length === 0 && (
          <div style={{
            backgroundColor: 'white',
            padding: '50px',
            borderRadius: '8px',
            textAlign: 'center',
            color: '#666'
          }}>
            <h3>No certificates found</h3>
            <p>No certificates match your current filter criteria.</p>
          </div>
        )}

        {/* Certificate Preview Modal */}
        {showCertificate && (
          <CertificateTemplate
            certificate={selectedCertificate}
            onClose={() => {
              setShowCertificate(false);
              setSelectedCertificate(null);
            }}
          />
        )}
      </div>
    </Layout>
  );
}