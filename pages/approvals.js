import Layout from '../components/Layout';

// Mock approvals data
const mockApprovals = [
  {
    id: 1,
    training: 'GMP Fundamentals',
    requestedBy: 'Mike Wilson',
    requestDate: '2025-10-20',
    status: 'Pending',
  },
  {
    id: 2,
    training: 'Lab Safety',
    requestedBy: 'Jane Doe',
    requestDate: '2025-10-18',
    status: 'Pending',
  },
  {
    id: 3,
    training: 'Equipment Validation',
    requestedBy: 'Bob Smith',
    requestDate: '2025-10-22',
    status: 'Pending',
  },
  {
    id: 4,
    training: 'Quality Control',
    requestedBy: 'Alice Johnson',
    requestDate: '2025-10-21',
    status: 'Pending',
  },
  {
    id: 5,
    training: 'Technical Skills',
    requestedBy: 'Sam Lee',
    requestDate: '2025-10-19',
    status: 'Pending',
  },
];

export default function ApprovalsPage() {
  return (
    <Layout>
      <h1>Pending Approvals</h1>
      <table style={{ width: '100%', borderCollapse: 'collapse', background: 'white', borderRadius: 8, overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
        <thead style={{ background: '#f8f9fa' }}>
          <tr>
            <th style={{ padding: '12px', borderBottom: '2px solid #eee', textAlign: 'left' }}>Training</th>
            <th style={{ padding: '12px', borderBottom: '2px solid #eee', textAlign: 'left' }}>Requested By</th>
            <th style={{ padding: '12px', borderBottom: '2px solid #eee', textAlign: 'left' }}>Request Date</th>
            <th style={{ padding: '12px', borderBottom: '2px solid #eee', textAlign: 'left' }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {mockApprovals.map(a => (
            <tr key={a.id} style={{ borderBottom: '1px solid #f0f0f0' }}>
              <td style={{ padding: '10px 12px' }}>{a.training}</td>
              <td style={{ padding: '10px 12px' }}>{a.requestedBy}</td>
              <td style={{ padding: '10px 12px' }}>{a.requestDate}</td>
              <td style={{ padding: '10px 12px' }}>
                <span style={{
                  padding: '4px 12px',
                  borderRadius: '12px',
                  color: 'white',
                  background: '#6f42c1',
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
