import React from 'react';
import { VideoUsageTracker } from '../utils/videoUsageTracker';

const UsageIndicator = () => {
  const stats = VideoUsageTracker.getStats();

  const containerStyles = {
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    borderRadius: '1rem',
    padding: '1.25rem',
    marginBottom: '1.5rem',
    backdropFilter: 'blur(10px)',
    transition: 'all 0.3s ease'
  };

  const progressBarStyles = {
    width: '100%',
    height: '6px',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '3px',
    overflow: 'hidden',
    marginTop: '0.75rem',
    position: 'relative'
  };

  const progressFillStyles = {
    height: '100%',
    backgroundColor: stats.needsAd ? '#ef4444' : '#22c55e',
    width: `${Math.min(100, (stats.totalVideos / 3) * 100)}%`,
    transition: 'width 0.5s ease',
    borderRadius: '3px',
    boxShadow: stats.needsAd 
      ? '0 0 10px rgba(239, 68, 68, 0.3)' 
      : '0 0 10px rgba(34, 197, 94, 0.3)'
  };

  const getStatusColor = () => {
    if (stats.needsAd) return '#ef4444';
    if (stats.remainingFree <= 1) return '#fbbf24';
    return '#22c55e';
  };

  const getStatusText = () => {
    if (stats.needsAd) return 'Watch ad to continue';
    if (stats.remainingFree <= 1) return 'Last free video';
    return `${stats.remainingFree} free videos left`;
  };

  const getStatusIcon = () => {
    if (stats.needsAd) return '⚠️';
    if (stats.remainingFree <= 1) return '⚡';
    return '🎬';
  };

  return (
    <div style={containerStyles}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '1rem' }}>{getStatusIcon()}</span>
          <div style={{ color: 'white', fontSize: '0.875rem', fontWeight: '500' }}>
            Free Videos Used
          </div>
        </div>
        <div style={{ 
          color: getStatusColor(), 
          fontSize: '0.75rem', 
          fontWeight: '600',
          backgroundColor: `${getStatusColor()}15`,
          padding: '0.375rem 0.75rem',
          borderRadius: '0.5rem',
          border: `1px solid ${getStatusColor()}30`
        }}>
          {stats.totalVideos}/3
        </div>
      </div>

      <div style={progressBarStyles}>
        <div style={progressFillStyles} />
      </div>

      <div style={{ 
        color: getStatusColor(), 
        fontSize: '0.75rem', 
        marginTop: '0.75rem',
        textAlign: 'center',
        fontWeight: '500',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.25rem'
      }}>
        <span>{getStatusIcon()}</span>
        {getStatusText()}
      </div>

      {stats.needsAd && (
        <div style={{ 
          backgroundColor: 'rgba(239, 68, 68, 0.08)', 
          border: '1px solid rgba(239, 68, 68, 0.2)', 
          borderRadius: '0.75rem', 
          padding: '1rem', 
          marginTop: '1rem',
          textAlign: 'center',
          backdropFilter: 'blur(5px)'
        }}>
          <div style={{ color: '#fca5a5', fontSize: '0.75rem', fontWeight: '500', marginBottom: '0.25rem' }}>
            ⚠️ You've used all free videos
          </div>
          <div style={{ color: '#fca5a5', fontSize: '0.625rem', opacity: 0.8 }}>
            Watch a short ad to continue processing
          </div>
        </div>
      )}
    </div>
  );
};

export default UsageIndicator;
