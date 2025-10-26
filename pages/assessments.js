import { useState } from 'react';
import Layout from '../components/Layout';
import { useAuth } from '../components/AuthContext';
import { MOCK_TRAININGS } from '../data/mockData';
import { PERMISSIONS, MODULES } from '../utils/rbac';

// Assessment Questions Component
const AssessmentQuestions = ({ assessment, onSave, onCancel }) => {
  const [questions, setQuestions] = useState(assessment?.questions || []);
  const [currentQuestion, setCurrentQuestion] = useState({
    type: 'multiple-choice',
    question: '',
    options: ['', '', '', ''],
    correctAnswer: 0,
    points: 1,
    explanation: ''
  });

  const questionTypes = [
    { value: 'multiple-choice', label: 'Multiple Choice' },
    { value: 'true-false', label: 'True/False' },
    { value: 'short-answer', label: 'Short Answer' },
    { value: 'essay', label: 'Essay' }
  ];

  const addQuestion = () => {
    if (!currentQuestion.question.trim()) {
      alert('Please enter a question');
      return;
    }
    
    setQuestions([...questions, { ...currentQuestion, id: Date.now() }]);
    setCurrentQuestion({
      type: 'multiple-choice',
      question: '',
      options: ['', '', '', ''],
      correctAnswer: 0,
      points: 1,
      explanation: ''
    });
  };

  const removeQuestion = (index) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...currentQuestion.options];
    newOptions[index] = value;
    setCurrentQuestion({ ...currentQuestion, options: newOptions });
  };

  const handleSave = () => {
    const assessmentData = {
      ...assessment,
      questions,
      totalPoints: questions.reduce((sum, q) => sum + q.points, 0),
      questionCount: questions.length,
      lastModified: new Date().toISOString()
    };
    onSave(assessmentData);
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div style={{
        backgroundColor: 'white',
        padding: '30px',
        borderRadius: '10px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        marginBottom: '30px'
      }}>
        <h2 style={{ marginBottom: '20px' }}>Assessment: {assessment?.title}</h2>
        
        {/* Add New Question */}
        <div style={{ marginBottom: '30px', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
          <h3>Add New Question</h3>
          
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Question Type</label>
            <select
              value={currentQuestion.type}
              onChange={(e) => setCurrentQuestion({ ...currentQuestion, type: e.target.value })}
              style={{
                width: '100%',
                padding: '8px',
                border: '1px solid #ddd',
                borderRadius: '4px'
              }}
            >
              {questionTypes.map(type => (
                <option key={type.value} value={type.value}>{type.label}</option>
              ))}
            </select>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Question</label>
            <textarea
              value={currentQuestion.question}
              onChange={(e) => setCurrentQuestion({ ...currentQuestion, question: e.target.value })}
              rows="3"
              style={{
                width: '100%',
                padding: '8px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                resize: 'vertical'
              }}
              placeholder="Enter your question here..."
            />
          </div>

          {currentQuestion.type === 'multiple-choice' && (
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Answer Options</label>
              {currentQuestion.options.map((option, index) => (
                <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                  <input
                    type="radio"
                    name="correctAnswer"
                    checked={currentQuestion.correctAnswer === index}
                    onChange={() => setCurrentQuestion({ ...currentQuestion, correctAnswer: index })}
                    style={{ marginRight: '8px' }}
                  />
                  <input
                    type="text"
                    value={option}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                    placeholder={`Option ${index + 1}`}
                    style={{
                      flex: 1,
                      padding: '6px',
                      border: '1px solid #ddd',
                      borderRadius: '4px'
                    }}
                  />
                </div>
              ))}
            </div>
          )}

          {currentQuestion.type === 'true-false' && (
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Correct Answer</label>
              <div>
                <label style={{ marginRight: '15px' }}>
                  <input
                    type="radio"
                    name="tfAnswer"
                    checked={currentQuestion.correctAnswer === 0}
                    onChange={() => setCurrentQuestion({ ...currentQuestion, correctAnswer: 0 })}
                    style={{ marginRight: '5px' }}
                  />
                  True
                </label>
                <label>
                  <input
                    type="radio"
                    name="tfAnswer"
                    checked={currentQuestion.correctAnswer === 1}
                    onChange={() => setCurrentQuestion({ ...currentQuestion, correctAnswer: 1 })}
                    style={{ marginRight: '5px' }}
                  />
                  False
                </label>
              </div>
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Points</label>
              <input
                type="number"
                min="1"
                value={currentQuestion.points}
                onChange={(e) => setCurrentQuestion({ ...currentQuestion, points: parseInt(e.target.value) || 1 })}
                style={{
                  width: '100%',
                  padding: '8px',
                  border: '1px solid #ddd',
                  borderRadius: '4px'
                }}
              />
            </div>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Explanation (Optional)</label>
            <textarea
              value={currentQuestion.explanation}
              onChange={(e) => setCurrentQuestion({ ...currentQuestion, explanation: e.target.value })}
              rows="2"
              style={{
                width: '100%',
                padding: '8px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                resize: 'vertical'
              }}
              placeholder="Provide explanation for the correct answer..."
            />
          </div>

          <button
            onClick={addQuestion}
            style={{
              padding: '10px 20px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Add Question
          </button>
        </div>

        {/* Existing Questions */}
        <div style={{ marginBottom: '30px' }}>
          <h3>Questions ({questions.length})</h3>
          {questions.length === 0 ? (
            <p style={{ color: '#666', fontStyle: 'italic' }}>No questions added yet.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {questions.map((question, index) => (
                <div key={question.id} style={{
                  padding: '15px',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  backgroundColor: '#f9f9f9'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                    <h4 style={{ margin: 0 }}>Question {index + 1}</h4>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <span style={{ fontSize: '12px', color: '#666' }}>{question.points} point(s)</span>
                      <button
                        onClick={() => removeQuestion(index)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#dc3545',
                          cursor: 'pointer',
                          fontSize: '16px'
                        }}
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                  <p style={{ marginBottom: '10px' }}>{question.question}</p>
                  <div style={{ fontSize: '12px', color: '#666' }}>
                    Type: {questionTypes.find(t => t.value === question.type)?.label}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', borderTop: '1px solid #e0e0e0', paddingTop: '20px' }}>
          <button
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
            onClick={handleSave}
            disabled={questions.length === 0}
            style={{
              padding: '10px 20px',
              backgroundColor: questions.length === 0 ? '#ccc' : '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: questions.length === 0 ? 'not-allowed' : 'pointer'
            }}
          >
            Save Assessment ({questions.length} questions, {questions.reduce((sum, q) => sum + q.points, 0)} points)
          </button>
        </div>
      </div>
    </div>
  );
};

// Assessment Card Component
const AssessmentCard = ({ assessment, onEdit, onDelete, onManage }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return '#28a745';
      case 'Draft': return '#6c757d';
      case 'Completed': return '#17a2b8';
      default: return '#6c757d';
    }
  };

  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '10px',
      padding: '20px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      border: '1px solid #e0e0e0'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
        <h3 style={{ margin: 0, fontSize: '18px' }}>{assessment.title}</h3>
        <span style={{
          padding: '4px 12px',
          borderRadius: '12px',
          fontSize: '12px',
          fontWeight: 'bold',
          backgroundColor: getStatusColor(assessment.status),
          color: 'white'
        }}>
          {assessment.status}
        </span>
      </div>

      <p style={{ color: '#666', marginBottom: '15px' }}>{assessment.description}</p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px', fontSize: '14px' }}>
        <div>
          <strong>Questions:</strong> {assessment.questionCount || 0}
        </div>
        <div>
          <strong>Total Points:</strong> {assessment.totalPoints || 0}
        </div>
        <div>
          <strong>Passing Score:</strong> {assessment.passingScore}%
        </div>
        <div>
          <strong>Time Limit:</strong> {assessment.timeLimit || 'No limit'}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', marginBottom: '15px', fontSize: '14px' }}>
        <div style={{ textAlign: 'center', padding: '8px', backgroundColor: '#f8f9fa', borderRadius: '4px' }}>
          <div style={{ fontWeight: 'bold', color: '#007bff' }}>{assessment.assignedCount || 0}</div>
          <div style={{ fontSize: '12px', color: '#666' }}>Assigned</div>
        </div>
        <div style={{ textAlign: 'center', padding: '8px', backgroundColor: '#f8f9fa', borderRadius: '4px' }}>
          <div style={{ fontWeight: 'bold', color: '#28a745' }}>{assessment.completedCount || 0}</div>
          <div style={{ fontSize: '12px', color: '#666' }}>Completed</div>
        </div>
        <div style={{ textAlign: 'center', padding: '8px', backgroundColor: '#f8f9fa', borderRadius: '4px' }}>
          <div style={{ fontWeight: 'bold', color: '#ffc107' }}>{assessment.averageScore || 0}%</div>
          <div style={{ fontSize: '12px', color: '#666' }}>Avg Score</div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        <button
          onClick={() => onEdit(assessment)}
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
          Edit Questions
        </button>
        <button
          onClick={() => onManage(assessment)}
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
          Manage
        </button>
        <button
          onClick={() => onDelete(assessment)}
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
          Delete
        </button>
      </div>
    </div>
  );
};

export default function Assessments() {
  const { hasUserPermission } = useAuth();
  const [assessments, setAssessments] = useState([
    {
      id: 1,
      title: 'GMP Fundamentals Quiz',
      description: 'Basic knowledge assessment for Good Manufacturing Practices',
      trainingId: 1,
      status: 'Active',
      questionCount: 15,
      totalPoints: 20,
      passingScore: 80,
      timeLimit: '30 minutes',
      assignedCount: 45,
      completedCount: 32,
      averageScore: 87
    },
    {
      id: 2,
      title: 'Laboratory Safety Assessment',
      description: 'Comprehensive safety protocols and procedures evaluation',
      trainingId: 2,
      status: 'Active',
      questionCount: 25,
      totalPoints: 35,
      passingScore: 85,
      timeLimit: '45 minutes',
      assignedCount: 28,
      completedCount: 15,
      averageScore: 91
    },
    {
      id: 3,
      title: 'Equipment Validation Test',
      description: 'Technical assessment on validation processes and documentation',
      trainingId: 3,
      status: 'Draft',
      questionCount: 0,
      totalPoints: 0,
      passingScore: 80,
      timeLimit: 'No limit',
      assignedCount: 0,
      completedCount: 0,
      averageScore: 0
    }
  ]);

  const [showQuestionEditor, setShowQuestionEditor] = useState(false);
  const [selectedAssessment, setSelectedAssessment] = useState(null);
  const [notification, setNotification] = useState(null);

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleCreateAssessment = () => {
    if (!hasUserPermission(MODULES.ASSESSMENTS, PERMISSIONS.CREATE)) {
      showNotification('You do not have permission to create assessments.', 'error');
      return;
    }

    const newAssessment = {
      id: Date.now(),
      title: 'New Assessment',
      description: 'Assessment description',
      status: 'Draft',
      questionCount: 0,
      totalPoints: 0,
      passingScore: 80,
      timeLimit: 'No limit',
      questions: []
    };

    setSelectedAssessment(newAssessment);
    setShowQuestionEditor(true);
  };

  const handleEditAssessment = (assessment) => {
    if (!hasUserPermission(MODULES.ASSESSMENTS, PERMISSIONS.UPDATE)) {
      showNotification('You do not have permission to edit assessments.', 'error');
      return;
    }
    setSelectedAssessment(assessment);
    setShowQuestionEditor(true);
  };

  const handleSaveAssessment = (assessmentData) => {
    if (assessments.find(a => a.id === assessmentData.id)) {
      // Update existing
      setAssessments(prev => prev.map(a => a.id === assessmentData.id ? assessmentData : a));
      showNotification('Assessment updated successfully!');
    } else {
      // Create new
      setAssessments(prev => [...prev, assessmentData]);
      showNotification('Assessment created successfully!');
    }
    setShowQuestionEditor(false);
    setSelectedAssessment(null);
  };

  const handleDeleteAssessment = (assessment) => {
    if (!hasUserPermission(MODULES.ASSESSMENTS, PERMISSIONS.DELETE)) {
      showNotification('You do not have permission to delete assessments.', 'error');
      return;
    }

    if (confirm(`Are you sure you want to delete "${assessment.title}"?`)) {
      setAssessments(prev => prev.filter(a => a.id !== assessment.id));
      showNotification('Assessment deleted successfully!');
    }
  };

  const handleManageAssessment = (assessment) => {
    showNotification('Assessment management feature coming soon!', 'info');
  };

  if (!hasUserPermission(MODULES.ASSESSMENTS, PERMISSIONS.READ)) {
    return (
      <Layout>
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <h2 style={{ color: '#dc3545' }}>Access Denied</h2>
          <p>You do not have permission to access Assessments.</p>
        </div>
      </Layout>
    );
  }

  if (showQuestionEditor) {
    return (
      <Layout>
        <AssessmentQuestions
          assessment={selectedAssessment}
          onSave={handleSaveAssessment}
          onCancel={() => {
            setShowQuestionEditor(false);
            setSelectedAssessment(null);
          }}
        />
      </Layout>
    );
  }

  return (
    <Layout>
      <div>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <div>
            <h2 style={{ margin: 0, color: '#333' }}>Assessments</h2>
            <p style={{ margin: '5px 0 0 0', color: '#666' }}>
              Create and manage training assessments and quizzes
            </p>
          </div>
          {hasUserPermission(MODULES.ASSESSMENTS, PERMISSIONS.CREATE) && (
            <button
              onClick={handleCreateAssessment}
              style={{
                padding: '12px 24px',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: 'bold'
              }}
            >
              + Create Assessment
            </button>
          )}
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
            <h3 style={{ margin: '0 0 10px 0', color: '#666' }}>Total Assessments</h3>
            <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#007bff' }}>
              {assessments.length}
            </div>
          </div>
          
          <div style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            border: '3px solid #28a745'
          }}>
            <h3 style={{ margin: '0 0 10px 0', color: '#666' }}>Active Assessments</h3>
            <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#28a745' }}>
              {assessments.filter(a => a.status === 'Active').length}
            </div>
          </div>
          
          <div style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            border: '3px solid #ffc107'
          }}>
            <h3 style={{ margin: '0 0 10px 0', color: '#666' }}>Total Completions</h3>
            <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#ffc107' }}>
              {assessments.reduce((sum, a) => sum + (a.completedCount || 0), 0)}
            </div>
          </div>
          
          <div style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            border: '3px solid #17a2b8'
          }}>
            <h3 style={{ margin: '0 0 10px 0', color: '#666' }}>Average Score</h3>
            <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#17a2b8' }}>
              {Math.round(assessments.reduce((sum, a) => sum + (a.averageScore || 0), 0) / assessments.length) || 0}%
            </div>
          </div>
        </div>

        {/* Assessments Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', 
          gap: '20px' 
        }}>
          {assessments.map(assessment => (
            <AssessmentCard
              key={assessment.id}
              assessment={assessment}
              onEdit={handleEditAssessment}
              onDelete={handleDeleteAssessment}
              onManage={handleManageAssessment}
            />
          ))}
        </div>

        {assessments.length === 0 && (
          <div style={{
            backgroundColor: 'white',
            padding: '50px',
            borderRadius: '8px',
            textAlign: 'center',
            color: '#666'
          }}>
            <h3>No assessments found</h3>
            <p>Create your first assessment to get started.</p>
            {hasUserPermission(MODULES.ASSESSMENTS, PERMISSIONS.CREATE) && (
              <button
                onClick={handleCreateAssessment}
                style={{
                  padding: '12px 24px',
                  backgroundColor: '#007bff',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  marginTop: '15px'
                }}
              >
                Create Your First Assessment
              </button>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
}