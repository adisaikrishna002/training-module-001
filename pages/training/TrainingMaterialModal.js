import React from 'react';

const TrainingMaterialModal = ({ isOpen, onClose, material, onComplete, minTime }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Training Material</h2>
        <div style={{ margin: '20px 0', minHeight: '200px' }}>
          <h3>{material?.title || 'Default Title'}</h3>
          <p>{material?.description || 'Default Description'}</p>
          {material?.fileUrl && (
            <a href={material.fileUrl} target="_blank" rel="noopener noreferrer">View Material File</a>
          )}
        </div>
        <button
          onClick={onComplete}
          style={{
            padding: '10px 24px',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: 'pointer',
          }}
        >
          Complete Training
        </button>
        <button
          onClick={onClose}
          style={{
            padding: '10px 24px',
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: 'pointer',
            marginLeft: '10px',
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default TrainingMaterialModal;