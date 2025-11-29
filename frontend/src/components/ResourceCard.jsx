import React from 'react';
import './ResourceCard.css';

const ResourceCard = ({ resource, onView, onEdit, onDelete, isAdmin }) => {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={i <= rating ? 'star filled' : 'star'}>
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <div className="resource-card">
      <div className="resource-type-badge">{resource.type}</div>
      
      <h3 className="resource-title">{resource.title}</h3>
      
      <p className="resource-subject">{resource.subject}</p>
      
      <p className="resource-description">{resource.description}</p>
      
      {resource.tags && resource.tags.length > 0 && (
        <div className="resource-tags">
          {resource.tags.map((tag, index) => (
            <span key={index} className="tag">{tag}</span>
          ))}
        </div>
      )}
      
      <div className="resource-stats">
        <div className="stat">
          <span className="stat-label">Rating:</span>
          <div className="rating">
            {renderStars(Math.round(resource.averageRating))}
            <span className="rating-value">
              {resource.averageRating > 0 ? resource.averageRating.toFixed(1) : 'N/A'}
            </span>
          </div>
        </div>
        <div className="stat">
          <span className="stat-label">Downloads:</span>
          <span className="stat-value">{resource.downloadCount}</span>
        </div>
      </div>
      
      <div className="resource-meta">
        <small>Uploaded by: {resource.uploadedByName}</small>
        <small>{formatDate(resource.createdAt)}</small>
        {resource.fileSize && <small>Size: {formatFileSize(resource.fileSize)}</small>}
      </div>
      
      <div className="resource-actions">
        <button onClick={onView} className="btn btn-primary">
          View Details
        </button>
        
        {isAdmin && (
          <>
            <button onClick={onEdit} className="btn btn-secondary">
              Edit
            </button>
            <button onClick={onDelete} className="btn btn-danger">
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ResourceCard;
