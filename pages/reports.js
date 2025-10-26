import { useState } from 'react';
import Layout from '../components/Layout';
import { useAuth } from '../components/AuthContext';
import { PERMISSIONS, MODULES } from '../utils/rbac';

// Chart Component (Simple ASCII-style visualization)
const SimpleChart = ({ data, type = 'bar', title }) => {
  if (type === 'bar') {
    const maxValue = Math.max(...data.map(d => d.value));
    
    return (
      <div style={{ padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
        <h4 style={{ margin: '0 0 15px 0', textAlign: 'center' }}>{title}</h4>
        {data.map((item, index) => (
          <div key={index} style={{ marginBottom: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
              <span style={{ fontSize: '12px' }}>{item.label}</span>
              <span style={{ fontSize: '12px', fontWeight: 'bold' }}>{item.value}</span>
            </div>
            <div style={{ 
              width: '100%', 
              height: '20px', 
              backgroundColor: '#e9ecef', 
              borderRadius: '10px',
              overflow: 'hidden'
            }}>
              <div style={{
                width: `${(item.value / maxValue) * 100}%`,
                height: '100%',
                backgroundColor: item.color || '#007bff',
                borderRadius: '10px'
              }} />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (type === 'pie') {
    const total = data.reduce((sum, d) => sum + d.value, 0);
    
    return (
      <div style={{ padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
        <h4 style={{ margin: '0 0 15px 0', textAlign: 'center' }}>{title}</h4>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              background: `conic-gradient(${data.map((item, index) => {
                const percentage = (item.value / total) * 100;
                const startAngle = data.slice(0, index).reduce((sum, d) => sum + (d.value / total) * 360, 0);
                return `${item.color || '#007bff'} ${startAngle}deg ${startAngle + (percentage * 3.6)}deg`;
              }).join(', ')})`,
              position: 'relative'
            }}>
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '60px',
                height: '60px',
                backgroundColor: 'white',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px',
                fontWeight: 'bold'
              }}>
                {total}
              </div>
            </div>
          </div>
          <div>
            {data.map((item, index) => (
              <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                <div style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  backgroundColor: item.color || '#007bff',
                  marginRight: '8px'
                }} />
                <span style={{ fontSize: '12px', flex: 1 }}>{item.label}</span>
                <span style={{ fontSize: '12px', fontWeight: 'bold' }}>
                  {item.value} ({Math.round((item.value / total) * 100)}%)
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return <div>Chart type not supported</div>;
};

// Report Card Component
const ReportCard = ({ report, onGenerate, onView, onSchedule }) => {
  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '10px',
      padding: '20px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      border: '1px solid #e0e0e0'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
        <h3 style={{ margin: 0, fontSize: '18px' }}>{report.title}</h3>
        <span style={{
          padding: '4px 8px',
          borderRadius: '12px',
          fontSize: '12px',
          fontWeight: 'bold',
          backgroundColor: report.available ? '#28a745' : '#ffc107',
          color: 'white'
        }}>
          {report.available ? 'Available' : 'Coming Soon'}
        </span>
      </div>

      <p style={{ margin: '0 0 15px 0', fontSize: '14px', color: '#666', lineHeight: '1.4' }}>
        {report.description}
      </p>

      <div style={{ fontSize: '12px', color: '#666', marginBottom: '15px' }}>
        <div><strong>Format:</strong> {report.format}</div>
        <div><strong>Update Frequency:</strong> {report.frequency}</div>
        {report.lastGenerated && (
          <div><strong>Last Generated:</strong> {new Date(report.lastGenerated).toLocaleDateString()}</div>
        )}
      </div>

      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        {report.available && (
          <>
            <button
              onClick={() => onGenerate(report)}
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
              Generate Now
            </button>
            
            {report.lastGenerated && (
              <button
                onClick={() => onView(report)}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#28a745',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  fontSize: '12px',
                  cursor: 'pointer'
                }}
              >
                View Last Report
              </button>
            )}
            
            <button
              onClick={() => onSchedule(report)}
              style={{
                padding: '8px 16px',
                backgroundColor: '#17a2b8',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                fontSize: '12px',
                cursor: 'pointer'
              }}
            >
              Schedule
            </button>
          </>
        )}
      </div>
    </div>
  );
};

// Schedule Modal Component
const ScheduleModal = ({ report, onSave, onCancel }) => {
  const [scheduleData, setScheduleData] = useState({
    frequency: 'weekly',
    day: 'monday',
    time: '09:00',
    recipients: '',
    format: 'pdf'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...scheduleData, reportId: report.id, reportTitle: report.title });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ maxWidth: '500px', width: '90%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ margin: 0 }}>Schedule Report: {report.title}</h2>
          <button
            onClick={onCancel}
            style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer' }}
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Frequency
            </label>
            <select
              value={scheduleData.frequency}
              onChange={(e) => setScheduleData({ ...scheduleData, frequency: e.target.value })}
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '4px'
              }}
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="quarterly">Quarterly</option>
            </select>
          </div>

          {scheduleData.frequency === 'weekly' && (
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                Day of Week
              </label>
              <select
                value={scheduleData.day}
                onChange={(e) => setScheduleData({ ...scheduleData, day: e.target.value })}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #ddd',
                  borderRadius: '4px'
                }}
              >
                <option value="monday">Monday</option>
                <option value="tuesday">Tuesday</option>
                <option value="wednesday">Wednesday</option>
                <option value="thursday">Thursday</option>
                <option value="friday">Friday</option>
              </select>
            </div>
          )}

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Time
            </label>
            <input
              type="time"
              value={scheduleData.time}
              onChange={(e) => setScheduleData({ ...scheduleData, time: e.target.value })}
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '4px'
              }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Recipients (email addresses, comma-separated)
            </label>
            <textarea
              value={scheduleData.recipients}
              onChange={(e) => setScheduleData({ ...scheduleData, recipients: e.target.value })}
              placeholder="admin@company.com, manager@company.com"
              rows={3}
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                resize: 'vertical'
              }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Format
            </label>
            <select
              value={scheduleData.format}
              onChange={(e) => setScheduleData({ ...scheduleData, format: e.target.value })}
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '4px'
              }}
            >
              <option value="pdf">PDF</option>
              <option value="excel">Excel</option>
              <option value="csv">CSV</option>
            </select>
          </div>

          <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
            <button
              type="button"
              onClick={onCancel}
              style={{
                padding: '10px 20px',
                backgroundColor: '#6c757d',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{
                padding: '10px 20px',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Schedule Report
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default function Reports() {
  const { user, hasUserPermission } = useAuth();
  const [selectedReport, setSelectedReport] = useState(null);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [notification, setNotification] = useState(null);
  const [activeTab, setActiveTab] = useState('reports');

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const reports = [
    {
      id: 1,
      title: 'Training Completion Report',
      description: 'Detailed analysis of training completion rates across all departments and roles.',
      format: 'PDF, Excel',
      frequency: 'Weekly',
      available: true,
      lastGenerated: '2024-10-25'
    },
    {
      id: 2,
      title: 'Compliance Dashboard',
      description: 'Real-time overview of training compliance status and upcoming certification deadlines.',
      format: 'PDF, Excel',
      frequency: 'Daily',
      available: true,
      lastGenerated: '2024-10-26'
    },
    {
      id: 3,
      title: 'Skills Gap Analysis',
      description: 'Comprehensive analysis identifying skill gaps and training recommendations by department.',
      format: 'PDF, Excel',
      frequency: 'Monthly',
      available: true,
      lastGenerated: '2024-10-01'
    },
    {
      id: 4,
      title: 'Training ROI Report',
      description: 'Return on investment analysis for training programs including cost-benefit metrics.',
      format: 'PDF, Excel',
      frequency: 'Quarterly',
      available: true,
      lastGenerated: '2024-07-01'
    },
    {
      id: 5,
      title: 'Assessment Performance Report',
      description: 'Detailed analysis of assessment scores, trends, and performance by training category.',
      format: 'PDF, Excel',
      frequency: 'Weekly',
      available: true,
      lastGenerated: '2024-10-20'
    },
    {
      id: 6,
      title: 'Certification Status Report',
      description: 'Overview of all active, expired, and upcoming certificate renewals across the organization.',
      format: 'PDF, Excel',
      frequency: 'Monthly',
      available: true,
      lastGenerated: '2024-10-15'
    },
    {
      id: 7,
      title: 'Trainer Performance Analytics',
      description: 'Evaluation of trainer effectiveness based on participant feedback and completion rates.',
      format: 'PDF, Excel',
      frequency: 'Monthly',
      available: false
    },
    {
      id: 8,
      title: 'Material Usage Statistics',
      description: 'Analysis of training material usage patterns and effectiveness metrics.',
      format: 'PDF, Excel',
      frequency: 'Weekly',
      available: false
    }
  ];

  const handleGenerateReport = (report) => {
    if (!hasUserPermission(MODULES.REPORTS, PERMISSIONS.READ)) {
      showNotification('You do not have permission to generate reports.', 'error');
      return;
    }
    showNotification(`Generating ${report.title}... This may take a few minutes.`, 'info');
    // Simulate report generation
    setTimeout(() => {
      showNotification(`${report.title} has been generated successfully!`);
    }, 2000);
  };

  const handleViewReport = (report) => {
    showNotification(`Opening ${report.title}...`, 'info');
    // In a real app, this would open the report viewer or download the file
  };

  const handleScheduleReport = (report) => {
    setSelectedReport(report);
    setShowScheduleModal(true);
  };

  const handleSaveSchedule = (scheduleData) => {
    showNotification(`Report "${scheduleData.reportTitle}" has been scheduled successfully!`);
    setShowScheduleModal(false);
    setSelectedReport(null);
  };

  if (!hasUserPermission(MODULES.REPORTS, PERMISSIONS.READ)) {
    return (
      <Layout>
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <h2 style={{ color: '#dc3545' }}>Access Denied</h2>
          <p>You do not have permission to access Reports.</p>
        </div>
      </Layout>
    );
  }

  // Sample analytics data for dashboard
  const completionRateData = [
    { label: 'GMP Training', value: 85, color: '#28a745' },
    { label: 'Safety Procedures', value: 92, color: '#007bff' },
    { label: 'Quality Control', value: 78, color: '#ffc107' },
    { label: 'Validation', value: 88, color: '#17a2b8' }
  ];

  const departmentComplianceData = [
    { label: 'Production', value: 95, color: '#28a745' },
    { label: 'Quality Assurance', value: 98, color: '#007bff' },
    { label: 'R&D', value: 85, color: '#ffc107' },
    { label: 'Engineering', value: 82, color: '#dc3545' }
  ];

  const trainingStatusData = [
    { label: 'Completed', value: 245, color: '#28a745' },
    { label: 'In Progress', value: 42, color: '#ffc107' },
    { label: 'Not Started', value: 18, color: '#dc3545' },
    { label: 'Overdue', value: 8, color: '#6c757d' }
  ];

  return (
    <Layout>
      <div>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <div>
            <h2 style={{ margin: 0, color: '#333' }}>Reports & Analytics</h2>
            <p style={{ margin: '5px 0 0 0', color: '#666' }}>
              Generate reports and view training analytics
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

        {/* Tabs */}
        <div style={{ marginBottom: '30px' }}>
          <div style={{ display: 'flex', borderBottom: '2px solid #e0e0e0' }}>
            <button
              onClick={() => setActiveTab('dashboard')}
              style={{
                padding: '12px 24px',
                backgroundColor: activeTab === 'dashboard' ? '#007bff' : 'transparent',
                color: activeTab === 'dashboard' ? 'white' : '#666',
                border: 'none',
                borderRadius: '8px 8px 0 0',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              Analytics Dashboard
            </button>
            <button
              onClick={() => setActiveTab('reports')}
              style={{
                padding: '12px 24px',
                backgroundColor: activeTab === 'reports' ? '#007bff' : 'transparent',
                color: activeTab === 'reports' ? 'white' : '#666',
                border: 'none',
                borderRadius: '8px 8px 0 0',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              Reports Library
            </button>
          </div>
        </div>

        {/* Analytics Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div>
            {/* Key Metrics */}
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
                <h3 style={{ margin: '0 0 10px 0', color: '#666' }}>Total Trainees</h3>
                <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#007bff' }}>313</div>
                <div style={{ fontSize: '12px', color: '#28a745' }}>↑ 5.2% from last month</div>
              </div>
              
              <div style={{
                backgroundColor: 'white',
                padding: '20px',
                borderRadius: '8px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                border: '3px solid #28a745'
              }}>
                <h3 style={{ margin: '0 0 10px 0', color: '#666' }}>Completion Rate</h3>
                <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#28a745' }}>78.3%</div>
                <div style={{ fontSize: '12px', color: '#28a745' }}>↑ 2.1% from last month</div>
              </div>
              
              <div style={{
                backgroundColor: 'white',
                padding: '20px',
                borderRadius: '8px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                border: '3px solid #ffc107'
              }}>
                <h3 style={{ margin: '0 0 10px 0', color: '#666' }}>Avg. Score</h3>
                <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#ffc107' }}>86.7%</div>
                <div style={{ fontSize: '12px', color: '#dc3545' }}>↓ 1.2% from last month</div>
              </div>
              
              <div style={{
                backgroundColor: 'white',
                padding: '20px',
                borderRadius: '8px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                border: '3px solid #dc3545'
              }}>
                <h3 style={{ margin: '0 0 10px 0', color: '#666' }}>Overdue</h3>
                <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#dc3545' }}>8</div>
                <div style={{ fontSize: '12px', color: '#28a745' }}>↓ 60% from last month</div>
              </div>
            </div>

            {/* Charts */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '30px' }}>
              <SimpleChart
                data={completionRateData}
                type="bar"
                title="Training Completion Rates by Category"
              />
              
              <SimpleChart
                data={departmentComplianceData}
                type="bar"
                title="Department Compliance Rates"
              />
              
              <SimpleChart
                data={trainingStatusData}
                type="pie"
                title="Overall Training Status Distribution"
              />
              
              {/* Recent Activity */}
              <div style={{ padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
                <h4 style={{ margin: '0 0 15px 0', textAlign: 'center' }}>Recent Activity</h4>
                <div style={{ fontSize: '12px' }}>
                  <div style={{ marginBottom: '8px', padding: '8px', backgroundColor: 'white', borderRadius: '4px' }}>
                    <strong>Mike Wilson</strong> completed <em>GMP Fundamentals</em> - Score: 88%
                    <div style={{ color: '#666' }}>2 hours ago</div>
                  </div>
                  <div style={{ marginBottom: '8px', padding: '8px', backgroundColor: 'white', borderRadius: '4px' }}>
                    <strong>Jane Doe</strong> started <em>Laboratory Safety</em>
                    <div style={{ color: '#666' }}>4 hours ago</div>
                  </div>
                  <div style={{ marginBottom: '8px', padding: '8px', backgroundColor: 'white', borderRadius: '4px' }}>
                    <strong>Bob Smith</strong> certificate expired for <em>Quality Control</em>
                    <div style={{ color: '#666' }}>1 day ago</div>
                  </div>
                  <div style={{ padding: '8px', backgroundColor: 'white', borderRadius: '4px' }}>
                    <strong>Sarah Johnson</strong> uploaded new material: <em>New SOP Template</em>
                    <div style={{ color: '#666' }}>2 days ago</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Reports Library Tab */}
        {activeTab === 'reports' && (
          <div>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', 
              gap: '20px' 
            }}>
              {reports.map(report => (
                <ReportCard
                  key={report.id}
                  report={report}
                  onGenerate={handleGenerateReport}
                  onView={handleViewReport}
                  onSchedule={handleScheduleReport}
                />
              ))}
            </div>
          </div>
        )}

        {/* Schedule Modal */}
        {showScheduleModal && (
          <ScheduleModal
            report={selectedReport}
            onSave={handleSaveSchedule}
            onCancel={() => {
              setShowScheduleModal(false);
              setSelectedReport(null);
            }}
          />
        )}
      </div>
    </Layout>
  );
}