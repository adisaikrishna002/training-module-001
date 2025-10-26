import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import { MOCK_ASSESSMENTS } from '../../data/mockData';

export default function AssessmentDetail() {
  const router = useRouter();
  const { id } = router.query;
  const assessment = MOCK_ASSESSMENTS?.find(a => String(a.id) === String(id));

  if (!assessment) {
    return (
      <Layout>
        <div style={{ padding: 40, textAlign: 'center' }}>
          <h2>Assessment Not Found</h2>
          <p>No assessment found for ID: {id}</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div style={{ maxWidth: 700, margin: '40px auto', background: '#fff', borderRadius: 10, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', padding: 32 }}>
        <h2 style={{ color: '#17a2b8', marginBottom: 8 }}>{assessment.title}</h2>
        <div style={{ color: '#666', marginBottom: 16 }}>{assessment.description}</div>
        <div style={{ marginBottom: 16 }}>
          <strong>Type:</strong> {assessment.type} <br />
          <strong>Status:</strong> {assessment.status} <br />
          <strong>Due Date:</strong> {assessment.dueDate ? new Date(assessment.dueDate).toLocaleDateString() : 'N/A'} <br />
        </div>
        <div style={{ marginBottom: 16 }}>
          <strong>Score:</strong> {assessment.score != null ? assessment.score : 'Not Attempted'} <br />
        </div>
        <button onClick={() => router.back()} style={{ background: '#17a2b8', color: '#fff', border: 'none', borderRadius: 4, padding: '8px 24px', cursor: 'pointer' }}>Back</button>
      </div>
    </Layout>
  );
}
