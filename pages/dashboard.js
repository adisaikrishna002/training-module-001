import { useAuth } from '../components/AuthContext';
import Layout from '../components/Layout';
import { ROLES } from '../utils/rbac';
import { DASHBOARD_METRICS, MOCK_USER_TRAININGS, MOCK_TRAININGS } from '../data/mockData';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

// Dashboard Card Component
const DashboardCard = ({ title, value, subtitle, color, icon, trend, onClick }) => (
  <div
    style={{
      backgroundColor: 'white',
      borderRadius: '10px',
      padding: '25px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      border: `3px solid ${color}`,
      position: 'relative',
      overflow: 'hidden',
      cursor: onClick ? 'pointer' : 'default',
      transition: 'box-shadow 0.2s',
    }}
    onClick={onClick}
    tabIndex={onClick ? 0 : undefined}
    role={onClick ? 'button' : undefined}
    onKeyPress={onClick ? (e) => { if (e.key === 'Enter') onClick(); } : undefined}
    title={onClick ? `View details for ${title}` : undefined}
  >
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
      <div>
        <h3 style={{ margin: '0 0 10px 0', fontSize: '16px', color: '#666' }}>{title}</h3>
        <div style={{ fontSize: '32px', fontWeight: 'bold', color: color, marginBottom: '5px' }}>
          {value}
        </div>
        {subtitle && <p style={{ margin: 0, fontSize: '14px', color: '#888' }}>{subtitle}</p>}
        {trend && (
          <div style={{ 
            fontSize: '12px', 
            color: trend.type === 'up' ? '#28a745' : '#dc3545',
            marginTop: '5px'
          }}>
            {trend.type === 'up' ? '↗️' : '↘️'} {trend.value}
          </div>
        )}
      </div>
      <div style={{ fontSize: '48px', opacity: 0.3 }}>{icon}</div>
    </div>
  </div>
);


// Countdown Timer Component
const CountdownTimer = ({ dueDate, title }) => {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const due = new Date(dueDate).getTime();
      const difference = due - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        setTimeLeft(`${days}d ${hours}h ${minutes}m`);
      } else {
        setTimeLeft('OVERDUE');
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [dueDate]);

  const isOverdue = timeLeft === 'OVERDUE';
  const isDueSoon = timeLeft && !isOverdue && parseInt(timeLeft) <= 3;

  return (
    <div style={{
      padding: '15px',
      backgroundColor: isOverdue ? '#ffe6e6' : isDueSoon ? '#fff3cd' : '#e6f3ff',
      borderRadius: '8px',
      border: `1px solid ${isOverdue ? '#ff6b6b' : isDueSoon ? '#ffc107' : '#007bff'}`,
      marginBottom: '10px'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontWeight: 'bold', fontSize: '14px' }}>{title}</span>
        <span style={{ 
          color: isOverdue ? '#dc3545' : isDueSoon ? '#856404' : '#007bff',
          fontWeight: 'bold'
        }}>
          {timeLeft}
        </span>
      </div>
    </div>
  );
};

// Simple TrainingProgress component for dashboard
const TrainingProgress = ({ training }) => {
  if (!training) return null;
  return (
    <div style={{
      border: '1px solid #e0e0e0',
      borderRadius: 8,
      padding: 16,
      marginBottom: 16,
      background: '#fafbfc',
    }}>
      <div style={{ fontWeight: 'bold', fontSize: 16 }}>{training.title}</div>
      <div style={{ color: '#666', fontSize: 14 }}>{training.status} | Due: {training.dueDate || training.endDate}</div>
      <div style={{ marginTop: 8 }}>
        Progress: {training.progress != null ? training.progress + '%' : 'N/A'}
      </div>
      {training.score != null && (
        <div>Score: {training.score}</div>
      )}
    </div>
  );
};

// Role-specific Dashboard Components
const AdminDashboard = () => {
  const metrics = DASHBOARD_METRICS[ROLES.SYSTEM_ADMIN];
  const router = useRouter();
  return (
    <div>
      <h2 style={{ marginBottom: '30px', color: '#333' }}>System Administrator Dashboard</h2>
      {/* Key Metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '30px' }}>
        <DashboardCard
          title="Total Users"
          value={metrics.totalUsers}
          subtitle="Active system users"
          color="#007bff"
          icon="👥"
          trend={{ type: 'up', value: '+12 this month' }}
          onClick={() => router.push('/users')}
        />
        <DashboardCard
          title="Active Trainings"
          value={metrics.activeTrainings}
          subtitle="Currently running"
          color="#28a745"
          icon="📚"
          trend={{ type: 'up', value: '+3 new this week' }}
          onClick={() => router.push('/trainings?filter=active')}
        />
        <DashboardCard
          title="Total Completions"
          value={metrics.totalCompletions}
          subtitle="All time completions"
          color="#17a2b8"
          icon="✅"
          trend={{ type: 'up', value: '+89 this month' }}
          onClick={() => router.push('/reports?type=completion')}
        />
        <DashboardCard
          title="Compliance Rate"
          value={`${metrics.complianceRate}%`}
          subtitle="Overall compliance"
          color="#ffc107"
          icon="📊"
          trend={{ type: 'up', value: '+2.3% from last month' }}
          onClick={() => router.push('/reports?type=compliance')}
        />
        <DashboardCard
          title="Overdue Trainings"
          value={metrics.overdueTrainings}
          subtitle="Require attention"
          color="#dc3545"
          icon="⚠️"
          trend={{ type: 'down', value: '-5 from last week' }}
          onClick={() => router.push('/trainings?filter=overdue')}
        />
        <DashboardCard
          title="Pending Approvals"
          value={metrics.pendingApprovals}
          subtitle="Awaiting approval"
          color="#6f42c1"
          icon="📋"
          onClick={() => router.push('/approvals')}
        />
      </div>

      {/* Recent Activities */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '30px' }}>
        <div style={{ backgroundColor: 'white', borderRadius: '10px', padding: '25px' }}>
          <h3 style={{ marginBottom: '20px' }}>Recent System Activities</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {[
              { action: 'New training created', user: 'John Smith', time: '2 hours ago', type: 'create' },
              { action: 'User account activated', user: 'System Admin', time: '4 hours ago', type: 'update' },
              { action: 'Training assignment completed', user: 'Mike Wilson', time: '6 hours ago', type: 'complete' },
              { action: 'Extension request approved', user: 'Lisa Chen', time: '1 day ago', type: 'approve' }
            ].map((activity, index) => (
              <div key={index} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '10px',
                backgroundColor: '#f8f9fa',
                borderRadius: '6px'
              }}>
                <div>
                  <div style={{ fontWeight: 'bold', fontSize: '14px' }}>{activity.action}</div>
                  <div style={{ fontSize: '12px', color: '#666' }}>by {activity.user}</div>
                </div>
                <div style={{ fontSize: '12px', color: '#888' }}>{activity.time}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ backgroundColor: 'white', borderRadius: '10px', padding: '25px' }}>
          <h3 style={{ marginBottom: '20px' }}>System Alerts</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{
              padding: '12px',
              backgroundColor: '#ffe6e6',
              borderLeft: '4px solid #dc3545',
              borderRadius: '4px'
            }}>
              <div style={{ fontWeight: 'bold', fontSize: '14px', color: '#721c24' }}>23 Overdue Trainings</div>
              <div style={{ fontSize: '12px', color: '#721c24' }}>Require immediate attention</div>
            </div>
            <div style={{
              padding: '12px',
              backgroundColor: '#fff3cd',
              borderLeft: '4px solid #ffc107',
              borderRadius: '4px'
            }}>
              <div style={{ fontWeight: 'bold', fontSize: '14px', color: '#856404' }}>12 Pending Approvals</div>
              <div style={{ fontSize: '12px', color: '#856404' }}>Training assignments awaiting approval</div>
            </div>
            <div style={{
              padding: '12px',
              backgroundColor: '#d1ecf1',
              borderLeft: '4px solid #17a2b8',
              borderRadius: '4px'
            }}>
              <div style={{ fontWeight: 'bold', fontSize: '14px', color: '#0c5460' }}>System Backup</div>
              <div style={{ fontSize: '12px', color: '#0c5460' }}>Completed successfully at 2:00 AM</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const TraineeDashboard = () => {
  const { user } = useAuth();
  const userTrainings = MOCK_USER_TRAININGS[user.id] || [];
  const metrics = DASHBOARD_METRICS[ROLES.TRAINEE];

  const pendingTrainings = userTrainings.filter(t => t.status === 'Pending');
  const inProgressTrainings = userTrainings.filter(t => t.status === 'In Progress');
  const completedTrainings = userTrainings.filter(t => t.status === 'Completed');
  const overdueTrainings = userTrainings.filter(t => {
    const now = new Date();
    const dueDate = new Date(t.dueDate);
    return t.status !== 'Completed' && dueDate < now;
  });

  return (
    <div>
      <h2 style={{ marginBottom: '30px', color: '#333' }}>My Training Dashboard</h2>
      
      {/* Key Metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '30px' }}>
        <DashboardCard
          title="Pending"
          value={pendingTrainings.length}
          subtitle="Not started"
          color="#6c757d"
          icon="⏳"
        />
        <DashboardCard
          title="In Progress"
          value={inProgressTrainings.length}
          subtitle="Currently learning"
          color="#007bff"
          icon="📖"
        />
        <DashboardCard
          title="Completed"
          value={completedTrainings.length}
          subtitle="Successfully finished"
          color="#28a745"
          icon="✅"
        />
        <DashboardCard
          title="Overdue"
          value={overdueTrainings.length}
          subtitle="Past due date"
          color="#dc3545"
          icon="⚠️"
        />
        <DashboardCard
          title="Certificates"
          value={metrics.certificatesEarned}
          subtitle="Earned certificates"
          color="#ffc107"
          icon="🏆"
        />
      </div>

      {/* Training Progress and Due Dates */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '30px' }}>
        <div style={{ backgroundColor: 'white', borderRadius: '10px', padding: '25px' }}>
          <h3 style={{ marginBottom: '20px' }}>My Trainings</h3>
          <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
            {userTrainings.map((training) => {
              const fullTraining = MOCK_TRAININGS.find(t => t.id === training.trainingId);
              return (
                <TrainingProgress
                  key={training.trainingId}
                  training={{
                    ...fullTraining,
                    ...training,
                    title: fullTraining?.title || 'Unknown Training'
                  }}
                />
              );
            })}
          </div>
        </div>

        <div style={{ backgroundColor: 'white', borderRadius: '10px', padding: '25px' }}>
          <h3 style={{ marginBottom: '20px' }}>Upcoming Deadlines</h3>
          <div>
            {userTrainings
              .filter(t => t.status !== 'Completed')
              .map((training) => {
                const fullTraining = MOCK_TRAININGS.find(t => t.id === training.trainingId);
                return (
                  <CountdownTimer
                    key={training.trainingId}
                    dueDate={training.dueDate}
                    title={fullTraining?.title || 'Unknown Training'}
                  />
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

const CoordinatorDashboard = () => {
  const metrics = DASHBOARD_METRICS[ROLES.TRAINING_COORDINATOR];
  const router = useRouter();
  return (
    <div>
      <h2 style={{ marginBottom: '30px', color: '#333' }}>Training Coordinator Dashboard</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '30px' }}>
        <DashboardCard
          title="My Trainings"
          value={metrics.myTrainings}
          subtitle="Managed trainings"
          color="#007bff"
          icon="📚"
          onClick={() => router.push('/trainings')}
        />
        <DashboardCard
          title="Active Assignments"
          value={metrics.activeAssignments}
          subtitle="Current assignments"
          color="#28a745"
          icon="📋"
          onClick={() => router.push('/assignments')}
        />
        <DashboardCard
          title="Completion Rate"
          value={`${metrics.completionRate}%`}
          subtitle="Overall completion"
          color="#17a2b8"
          icon="📊"
          onClick={() => router.push('/reports?type=completion')}
        />
        <DashboardCard
          title="Overdue"
          value={metrics.overdueAssignments}
          subtitle="Need attention"
          color="#dc3545"
          icon="⚠️"
          onClick={() => router.push('/assignments?filter=overdue')}
        />
        <DashboardCard
          title="Pending Approvals"
          value={metrics.pendingApprovals}
          subtitle="Awaiting approval"
          color="#6f42c1"
          icon="✋"
          onClick={() => router.push('/approvals')}
        />
      </div>

      {/* Training Management Overview */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
        <div style={{ backgroundColor: 'white', borderRadius: '10px', padding: '25px' }}>
          <h3 style={{ marginBottom: '20px' }}>Recent Training Activities</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[
              { training: 'GMP Fundamentals', action: 'Assignment completed', user: 'Mike Wilson', status: 'success' },
              { training: 'Lab Safety', action: 'Extension requested', user: 'Jane Doe', status: 'warning' },
              { training: 'Equipment Validation', action: 'Assessment failed', user: 'Bob Smith', status: 'danger' },
              { training: 'Quality Control', action: 'Started training', user: 'Alice Johnson', status: 'info' }
            ].map((activity, index) => (
              <div key={index} style={{
                padding: '12px',
                borderRadius: '6px',
                backgroundColor: '#f8f9fa',
                borderLeft: `4px solid ${
                  activity.status === 'success' ? '#28a745' :
                  activity.status === 'warning' ? '#ffc107' :
                  activity.status === 'danger' ? '#dc3545' : '#17a2b8'
                }`
              }}>
                <div style={{ fontWeight: 'bold', fontSize: '14px' }}>{activity.training}</div>
                <div style={{ fontSize: '12px', color: '#666' }}>{activity.action} - {activity.user}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ backgroundColor: 'white', borderRadius: '10px', padding: '25px' }}>
          <h3 style={{ marginBottom: '20px' }}>Training Statistics</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                <span>GMP Compliance</span>
                <span>85%</span>
              </div>
              <div style={{ width: '100%', height: '8px', backgroundColor: '#e9ecef', borderRadius: '4px' }}>
                <div style={{ width: '85%', height: '100%', backgroundColor: '#28a745', borderRadius: '4px' }} />
              </div>
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                <span>Safety Training</span>
                <span>92%</span>
              </div>
              <div style={{ width: '100%', height: '8px', backgroundColor: '#e9ecef', borderRadius: '4px' }}>
                <div style={{ width: '92%', height: '100%', backgroundColor: '#007bff', borderRadius: '4px' }} />
              </div>
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                <span>Technical Skills</span>
                <span>78%</span>
              </div>
              <div style={{ width: '100%', height: '8px', backgroundColor: '#e9ecef', borderRadius: '4px' }}>
                <div style={{ width: '78%', height: '100%', backgroundColor: '#ffc107', borderRadius: '4px' }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const TrainerDashboard = () => {
  const metrics = DASHBOARD_METRICS[ROLES.TRAINER];
  
  return (
    <div>
      <h2 style={{ marginBottom: '30px', color: '#333' }}>Trainer Dashboard</h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '30px' }}>
        <DashboardCard
          title="Assigned Trainings"
          value={metrics.assignedTrainings}
          subtitle="My training sessions"
          color="#007bff"
          icon="📚"
        />
        <DashboardCard
          title="Active Trainees"
          value={metrics.activeTrainees}
          subtitle="Current learners"
          color="#28a745"
          icon="👨‍🎓"
        />
        <DashboardCard
          title="Completion Rate"
          value={`${metrics.completionRate}%`}
          subtitle="Success rate"
          color="#17a2b8"
          icon="📈"
        />
        <DashboardCard
          title="Pending Evaluations"
          value={metrics.pendingEvaluations}
          subtitle="Need grading"
          color="#ffc107"
          icon="📝"
        />
        <DashboardCard
          title="Upcoming Sessions"
          value={metrics.upcomingSessions}
          subtitle="Scheduled sessions"
          color="#6f42c1"
          icon="📅"
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
        <div style={{ backgroundColor: 'white', borderRadius: '10px', padding: '25px' }}>
          <h3 style={{ marginBottom: '20px' }}>My Training Sessions</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {MOCK_TRAININGS.slice(0, 3).map((training) => (
              <div key={training.id} style={{
                padding: '15px',
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                backgroundColor: '#f8f9fa'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <h4 style={{ margin: 0, fontSize: '16px' }}>{training.title}</h4>
                  <span style={{
                    padding: '4px 8px',
                    borderRadius: '12px',
                    fontSize: '12px',
                    backgroundColor: training.status === 'Active' ? '#28a745' : '#6c757d',
                    color: 'white'
                  }}>
                    {training.status}
                  </span>
                </div>
                <div style={{ fontSize: '14px', color: '#666', marginBottom: '10px' }}>
                  {training.assignedCount} trainees • {training.completedCount} completed
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button style={{
                    padding: '6px 12px',
                    backgroundColor: '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    fontSize: '12px',
                    cursor: 'pointer'
                  }}>
                    View Details
                  </button>
                  <button style={{
                    padding: '6px 12px',
                    backgroundColor: '#28a745',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    fontSize: '12px',
                    cursor: 'pointer'
                  }}>
                    Manage
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ backgroundColor: 'white', borderRadius: '10px', padding: '25px' }}>
          <h3 style={{ marginBottom: '20px' }}>Trainee Performance</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[
              { name: 'Mike Wilson', training: 'GMP Fundamentals', progress: 85, score: 88 },
              { name: 'Jane Doe', training: 'Lab Safety', progress: 65, score: null },
              { name: 'Bob Smith', training: 'Equipment Validation', progress: 45, score: 72 },
              { name: 'Alice Johnson', training: 'Quality Control', progress: 90, score: 95 }
            ].map((trainee, index) => (
              <div key={index} style={{
                padding: '12px',
                border: '1px solid #e0e0e0',
                borderRadius: '6px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                  <span style={{ fontWeight: 'bold', fontSize: '14px' }}>{trainee.name}</span>
                  {trainee.score && <span style={{ fontSize: '12px', color: '#28a745' }}>Score: {trainee.score}%</span>}
                </div>
                <div style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>{trainee.training}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ flex: 1, height: '6px', backgroundColor: '#e9ecef', borderRadius: '3px' }}>
                    <div style={{
                      width: `${trainee.progress}%`,
                      height: '100%',
                      backgroundColor: trainee.progress >= 80 ? '#28a745' : trainee.progress >= 50 ? '#ffc107' : '#dc3545',
                      borderRadius: '3px'
                    }} />
                  </div>
                  <span style={{ fontSize: '12px', color: '#666' }}>{trainee.progress}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Dashboard() {
  const { user } = useAuth();

  if (!user) {
    return <div>Loading...</div>;
  }

  const renderDashboard = () => {
    switch (user.role) {
      case ROLES.SYSTEM_ADMIN:
        return <AdminDashboard />;
      case ROLES.TRAINING_COORDINATOR:
        return <CoordinatorDashboard />;
      case ROLES.TRAINER:
        return <TrainerDashboard />;
      case ROLES.TRAINEE:
        return <TraineeDashboard />;
      case ROLES.HOD:
        return <AdminDashboard />; // HOD can see admin-like dashboard
      default:
        return <TraineeDashboard />; // Default to trainee dashboard
    }
  };

  return (
    <Layout>
      {renderDashboard()}
    </Layout>
  );
}