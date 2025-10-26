import Layout from '../components/Layout';

// Mock trainings data
const mockTrainings = [
  {
    id: 1,
    title: 'GMP Fundamentals',
    coordinator: 'John Smith',
    startDate: '2025-10-01',
    endDate: '2025-10-30',
    status: 'Active',
    assignments: 40,
    completionRate: 92,
  },
  {
    id: 2,
    title: 'Lab Safety',
    coordinator: 'Jane Doe',
    startDate: '2025-09-15',
    endDate: '2025-10-15',
    status: 'Completed',
    assignments: 30,
    completionRate: 100,
  },
  {
    id: 3,
    title: 'Equipment Validation',
    coordinator: 'Bob Smith',
    startDate: '2025-10-10',
    endDate: '2025-11-10',
    status: 'Active',
    assignments: 25,
    completionRate: 80,
  },
  {
    id: 4,
    title: 'Quality Control',
    coordinator: 'Alice Johnson',
    startDate: '2025-10-20',
    endDate: '2025-11-20',
    status: 'Planned',
    assignments: 15,
    completionRate: 0,
  },
];

const statusColors = {
  'Active': '#28a745',
  'Completed': '#007bff',
  'Planned': '#ffc107',
};

export default function TrainingsPage() {
  return (
    <Layout>
      <h1>My Trainings</h1>
      <table style={{ width: '100%', borderCollapse: 'collapse', background: 'white', borderRadius: 8, overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
        <thead style={{ background: '#f8f9fa' }}>
          <tr>
            <th style={{ padding: '12px', borderBottom: '2px solid #eee', textAlign: 'left' }}>Title</th>
            <th style={{ padding: '12px', borderBottom: '2px solid #eee', textAlign: 'left' }}>Coordinator</th>
            <th style={{ padding: '12px', borderBottom: '2px solid #eee', textAlign: 'left' }}>Start Date</th>
            <th style={{ padding: '12px', borderBottom: '2px solid #eee', textAlign: 'left' }}>End Date</th>
            <th style={{ padding: '12px', borderBottom: '2px solid #eee', textAlign: 'left' }}>Assignments</th>
            <th style={{ padding: '12px', borderBottom: '2px solid #eee', textAlign: 'left' }}>Completion Rate</th>
            <th style={{ padding: '12px', borderBottom: '2px solid #eee', textAlign: 'left' }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {mockTrainings.map(t => (
            <tr key={t.id} style={{ borderBottom: '1px solid #f0f0f0' }}>
              <td style={{ padding: '10px 12px' }}>{t.title}</td>
              <td style={{ padding: '10px 12px' }}>{t.coordinator}</td>
              <td style={{ padding: '10px 12px' }}>{t.startDate}</td>
              <td style={{ padding: '10px 12px' }}>{t.endDate}</td>
              <td style={{ padding: '10px 12px' }}>{t.assignments}</td>
              <td style={{ padding: '10px 12px' }}>{t.completionRate}%</td>
              <td style={{ padding: '10px 12px' }}>
                <span style={{
                  padding: '4px 12px',
                  borderRadius: '12px',
                  color: 'white',
                  background: statusColors[t.status] || '#6c757d',
                  fontWeight: 600,
                  fontSize: 13,
                }}>{t.status}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
}
