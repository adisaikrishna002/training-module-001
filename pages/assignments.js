import Layout from '../components/Layout';
import { useRouter } from 'next/router';

// Mock assignments data
const mockAssignments = [
  {
    id: 1,
    training: 'GMP Fundamentals',
    assignedTo: 'Mike Wilson',
    dueDate: '2025-10-30',
    status: 'Active',
  },
  {
    id: 2,
    training: 'Lab Safety',
    assignedTo: 'Jane Doe',
    dueDate: '2025-10-28',
    status: 'Overdue',
  },
  {
    id: 3,
    training: 'Equipment Validation',
    assignedTo: 'Bob Smith',
    dueDate: '2025-11-05',
    status: 'Completed',
  },
  {
    id: 4,
    training: 'Quality Control',
    assignedTo: 'Alice Johnson',
    dueDate: '2025-11-01',
    status: 'Active',
  },
];

const statusColors = {
  'Active': '#28a745',
  'Overdue': '#dc3545',
  'Completed': '#007bff',
};

export default function AssignmentsPage() {
  const router = useRouter();
  // Dashboard summary values (mocked for demo)
  const summary = {
    totalTrainings: 3,
    activeTrainings: 2,
    totalAssignments: 93,
    overdue: 3,
  };
  return (
    <Layout>
      <h1>Training Assignments</h1>
      <p style={{ color: '#666', marginBottom: 24 }}>Manage and assign training programs to users</p>
      <div style={{ display: 'flex', gap: 24, marginBottom: 32 }}>
        <div onClick={() => router.push('/trainings')} style={{ flex: 1, border: '3px solid #007bff', borderRadius: 12, padding: 20, background: 'white', cursor: 'pointer', textAlign: 'center', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
          <div style={{ fontWeight: 600, color: '#555', fontSize: 20 }}>Total Trainings</div>
          <div style={{ fontSize: 32, color: '#007bff', fontWeight: 700 }}>{summary.totalTrainings}</div>
        </div>
        <div onClick={() => router.push('/trainings?filter=active')} style={{ flex: 1, border: '3px solid #28a745', borderRadius: 12, padding: 20, background: 'white', cursor: 'pointer', textAlign: 'center', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
          <div style={{ fontWeight: 600, color: '#555', fontSize: 20 }}>Active Trainings</div>
          <div style={{ fontSize: 32, color: '#28a745', fontWeight: 700 }}>{summary.activeTrainings}</div>
        </div>
        <div onClick={() => router.push('/assignments')} style={{ flex: 1, border: '3px solid #ffc107', borderRadius: 12, padding: 20, background: 'white', cursor: 'pointer', textAlign: 'center', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
          <div style={{ fontWeight: 600, color: '#555', fontSize: 20 }}>Total Assignments</div>
          <div style={{ fontSize: 32, color: '#ffc107', fontWeight: 700 }}>{summary.totalAssignments}</div>
        </div>
        <div onClick={() => router.push('/assignments?filter=overdue')} style={{ flex: 1, border: '3px solid #dc3545', borderRadius: 12, padding: 20, background: 'white', cursor: 'pointer', textAlign: 'center', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
          <div style={{ fontWeight: 600, color: '#555', fontSize: 20 }}>Overdue</div>
          <div style={{ fontSize: 32, color: '#dc3545', fontWeight: 700 }}>{summary.overdue}</div>
        </div>
      </div>
      <table style={{ width: '100%', borderCollapse: 'collapse', background: 'white', borderRadius: 8, overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
        <thead style={{ background: '#f8f9fa' }}>
          <tr>
            <th style={{ padding: '12px', borderBottom: '2px solid #eee', textAlign: 'left' }}>Training</th>
            <th style={{ padding: '12px', borderBottom: '2px solid #eee', textAlign: 'left' }}>Assigned To</th>
            <th style={{ padding: '12px', borderBottom: '2px solid #eee', textAlign: 'left' }}>Due Date</th>
            <th style={{ padding: '12px', borderBottom: '2px solid #eee', textAlign: 'left' }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {mockAssignments.map(a => (
            <tr key={a.id} style={{ borderBottom: '1px solid #f0f0f0' }}>
              <td style={{ padding: '10px 12px' }}>{a.training}</td>
              <td style={{ padding: '10px 12px' }}>{a.assignedTo}</td>
              <td style={{ padding: '10px 12px' }}>{a.dueDate}</td>
              <td style={{ padding: '10px 12px' }}>
                <span style={{
                  padding: '4px 12px',
                  borderRadius: '12px',
                  color: 'white',
                  background: statusColors[a.status] || '#6c757d',
                  fontWeight: 600,
                  fontSize: 13,
                }}>{a.status}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
}
