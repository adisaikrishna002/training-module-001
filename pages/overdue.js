import Layout from '../components/Layout';

// Mock overdue assignments data
const overdueAssignments = [
  { id: 1, training: 'Lab Safety', assignedTo: 'Jane Doe', dueDate: '2025-10-18', status: 'Overdue' },
  { id: 2, training: 'GMP Fundamentals', assignedTo: 'Mike Wilson', dueDate: '2025-10-20', status: 'Overdue' },
  { id: 3, training: 'Quality Control', assignedTo: 'Alice Johnson', dueDate: '2025-10-21', status: 'Overdue' },
];

export default function OverduePage() {
  return (
    <Layout>
      <h1>Overdue Assignments</h1>
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
          {overdueAssignments.map(a => (
            <tr key={a.id} style={{ borderBottom: '1px solid #f0f0f0' }}>
              <td style={{ padding: '10px 12px' }}>{a.training}</td>
              <td style={{ padding: '10px 12px' }}>{a.assignedTo}</td>
              <td style={{ padding: '10px 12px' }}>{a.dueDate}</td>
              <td style={{ padding: '10px 12px' }}>
                <span style={{
                  padding: '4px 12px',
                  borderRadius: '12px',
                  color: 'white',
                  background: '#dc3545',
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
