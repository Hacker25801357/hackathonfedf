import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { resourceAPI } from '../utils/api';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import './ResourceDetail.css';

const ResourceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [resource, setResource] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [feedback, setFeedback] = useState({ rating: 5, comment: '' });
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchResource();
  }, [id]);

  const fetchResource = async () => {
    try {
      setLoading(true);
      const response = await resourceAPI.getById(id);
      setResource(response.data.data);
      setError('');
    } catch (err) {
      setError('Failed to load resource');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    try {
      await resourceAPI.incrementDownload(id);
      
      // Handle both full URLs and relative paths
      let downloadUrl = resource.fileUrl;
      if (downloadUrl.startsWith('/uploads/')) {
        downloadUrl = `${import.meta.env.VITE_API_URL}${downloadUrl}`;
      }
      
      window.open(downloadUrl, '_blank');
      fetchResource(); // Refresh to update download count
    } catch (err) {
      console.error('Error tracking download:', err);
      
      // Handle both full URLs and relative paths
      let downloadUrl = resource.fileUrl;
      if (downloadUrl.startsWith('/uploads/')) {
        downloadUrl = `${import.meta.env.VITE_API_URL}${downloadUrl}`;
      }
      
      window.open(downloadUrl, '_blank');
    }
  };

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    
    if (!feedback.rating) {
      setMessage('Please provide a rating');
      return;
    }

    setSubmitting(true);
    setMessage('');

    try {
      await resourceAPI.addFeedback(id, feedback);
      setMessage('Feedback submitted successfully!');
      setFeedback({ rating: 5, comment: '' });
      fetchResource(); // Refresh to show new feedback
    } catch (err) {
      setMessage('Failed to submit feedback');
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return 'N/A';
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  };

  const renderStars = (rating, interactive = false, onChange = null) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={i <= rating ? 'star filled' : 'star'}
          onClick={interactive ? () => onChange(i) : undefined}
          style={{ cursor: interactive ? 'pointer' : 'default' }}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="loading">Loading resource...</div>
      </div>
    );
  }

  if (error || !resource) {
    return (
      <div>
        <Navbar />
        <div className="error-message">{error || 'Resource not found'}</div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      
      <div className="resource-detail-container">
        <button onClick={() => navigate(-1)} className="btn-back">
          ← Back
        </button>

        <div className="resource-detail">
          <div className="resource-header">
            <div className="resource-type-badge">{resource.type}</div>
            <h1>{resource.title}</h1>
            <p className="resource-subject">{resource.subject}</p>
          </div>

          <div className="resource-info">
            <div className="info-section">
              <h3>Description</h3>
              <p>{resource.description}</p>
            </div>

            {resource.tags && resource.tags.length > 0 && (
              <div className="info-section">
                <h3>Tags</h3>
                <div className="resource-tags">
                  {resource.tags.map((tag, index) => (
                    <span key={index} className="tag">{tag}</span>
                  ))}
                </div>
              </div>
            )}

            <div className="info-section">
              <h3>Details</h3>
              <div className="detail-grid">
                <div className="detail-item">
                  <span className="detail-label">Uploaded by:</span>
                  <span>{resource.uploadedByName}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Upload date:</span>
                  <span>{formatDate(resource.createdAt)}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">File size:</span>
                  <span>{formatFileSize(resource.fileSize)}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Downloads:</span>
                  <span>{resource.downloadCount}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Average rating:</span>
                  <div className="rating">
                    {renderStars(Math.round(resource.averageRating))}
                    <span className="rating-value">
                      {resource.averageRating > 0 ? resource.averageRating.toFixed(1) : 'N/A'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="download-section">
              <button onClick={handleDownload} className="btn btn-primary btn-large">
                📥 Download Resource
              </button>
            </div>
          </div>

          <div className="feedback-section">
            <h2>Feedback</h2>
            
            <form onSubmit={handleFeedbackSubmit} className="feedback-form">
              <h3>Leave Your Feedback</h3>
              
              {message && (
                <div className={`alert ${message.includes('success') ? 'alert-success' : 'alert-error'}`}>
                  {message}
                </div>
              )}

              <div className="form-group">
                <label>Rating</label>
                <div className="rating-input">
                  {renderStars(feedback.rating, true, (rating) => 
                    setFeedback(prev => ({ ...prev, rating }))
                  )}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="comment">Comment (optional)</label>
                <textarea
                  id="comment"
                  value={feedback.comment}
                  onChange={(e) => setFeedback(prev => ({ ...prev, comment: e.target.value }))}
                  placeholder="Share your thoughts about this resource..."
                  rows="4"
                />
              </div>

              <button type="submit" className="btn btn-primary" disabled={submitting}>
                {submitting ? 'Submitting...' : 'Submit Feedback'}
              </button>
            </form>

            <div className="feedback-list">
              <h3>User Feedback ({resource.feedback?.length || 0})</h3>
              
              {resource.feedback && resource.feedback.length > 0 ? (
                resource.feedback.map((fb, index) => (
                  <div key={index} className="feedback-item">
                    <div className="feedback-header">
                      <strong>{fb.userName}</strong>
                      <div className="rating">
                        {renderStars(fb.rating)}
                      </div>
                    </div>
                    {fb.comment && <p className="feedback-comment">{fb.comment}</p>}
                    <small className="feedback-date">
                      {formatDate(fb.createdAt)}
                    </small>
                  </div>
                ))
              ) : (
                <p className="no-feedback">No feedback yet. Be the first to share your thoughts!</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourceDetail;
