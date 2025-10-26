import Layout from '../components/Layout';

// Mock active trainings data
const activeTrainings = [
  { id: 1, title: 'GMP Fundamentals', coordinator: 'John Smith', startDate: '2025-10-01', endDate: '2025-10-30', assignments: 40, completionRate: 92 },
  { id: 2, title: 'Equipment Validation', coordinator: 'Bob Smith', startDate: '2025-10-10', endDate: '2025-11-10', assignments: 25, completionRate: 80 },
];

export default function ActiveTrainingsPage() {
  return (
    <Layout>
      <h1>Active Trainings</h1>
      <table style={{ width: '100%', borderCollapse: 'collapse', background: 'white', borderRadius: 8, overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
        <thead style={{ background: '#f8f9fa' }}>
          <tr>
            <th style={{ padding: '12px', borderBottom: '2px solid #eee', textAlign: 'left' }}>Title</th>
            <th style={{ padding: '12px', borderBottom: '2px solid #eee', textAlign: 'left' }}>Coordinator</th>
            <th style={{ padding: '12px', borderBottom: '2px solid #eee', textAlign: 'left' }}>Start Date</th>
            <th style={{ padding: '12px', borderBottom: '2px solid #eee', textAlign: 'left' }}>End Date</th>
            <th style={{ padding: '12px', borderBottom: '2px solid #eee', textAlign: 'left' }}>Assignments</th>
            <th style={{ padding: '12px', borderBottom: '2px solid #eee', textAlign: 'left' }}>Completion Rate</th>
          </tr>
        </thead>
        <tbody>
          {activeTrainings.map(t => (
            <tr key={t.id} style={{ borderBottom: '1px solid #f0f0f0' }}>
              <td style={{ padding: '10px 12px' }}>{t.title}</td>
              <td style={{ padding: '10px 12px' }}>{t.coordinator}</td>
              <td style={{ padding: '10px 12px' }}>{t.startDate}</td>
              <td style={{ padding: '10px 12px' }}>{t.endDate}</td>
              <td style={{ padding: '10px 12px' }}>{t.assignments}</td>
              <td style={{ padding: '10px 12px' }}>{t.completionRate}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
}
