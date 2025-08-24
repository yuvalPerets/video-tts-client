import React from 'react';

const AdStrategy = () => {
  const adPlacements = [
    {
      location: 'Pre-Processing',
      description: 'Show ad before video processing starts',
      revenue: 'High',
      userExperience: 'Medium',
      implementation: 'Easy'
    },
    {
      location: 'Processing Page',
      description: 'Banner ads during video processing',
      revenue: 'Medium',
      userExperience: 'Good',
      implementation: 'Easy'
    },
    {
      location: 'Download Page',
      description: 'Ad before download starts',
      revenue: 'High',
      userExperience: 'Good',
      implementation: 'Medium'
    },
    {
      location: 'Sidebar',
      description: 'Non-intrusive sidebar ads',
      revenue: 'Low',
      userExperience: 'Excellent',
      implementation: 'Easy'
    }
  ];

  const revenueProjections = [
    {
      users: 1000,
      monthlyRevenue: '$50-150',
      cpm: '$2-5',
      notes: 'Starting phase'
    },
    {
      users: 5000,
      monthlyRevenue: '$250-750',
      cpm: '$3-6',
      notes: 'Growth phase'
    },
    {
      users: 20000,
      monthlyRevenue: '$1000-3000',
      cpm: '$4-8',
      notes: 'Scale phase'
    }
  ];

  return (
    <div style={{ marginTop: '2rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h2 style={{ 
          fontSize: '1.5rem', 
          fontWeight: 'bold', 
          color: 'white', 
          marginBottom: '0.5rem' 
        }}>
          Ad-Based Revenue Strategy
        </h2>
        <p style={{ color: '#9ca3af' }}>
          Start with ads, then add premium subscriptions later
        </p>
      </div>

      {/* Ad Placement Strategy */}
      <div style={{ marginBottom: '2rem' }}>
        <h3 style={{ 
          fontSize: '1.25rem', 
          fontWeight: 'bold', 
          color: 'white', 
          marginBottom: '1rem' 
        }}>
          📍 Ad Placement Strategy
        </h3>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
          gap: '1rem' 
        }}>
          {adPlacements.map((placement, index) => (
            <div
              key={index}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '0.75rem',
                padding: '1rem'
              }}
            >
              <h4 style={{ 
                fontSize: '1rem', 
                fontWeight: '600', 
                color: 'white', 
                marginBottom: '0.5rem' 
              }}>
                {placement.location}
              </h4>
              <p style={{ 
                color: '#9ca3af', 
                fontSize: '0.875rem', 
                marginBottom: '0.75rem' 
              }}>
                {placement.description}
              </p>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                <span style={{
                  backgroundColor: placement.revenue === 'High' ? 'rgba(34, 197, 94, 0.2)' : 
                                 placement.revenue === 'Medium' ? 'rgba(251, 191, 36, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                  color: placement.revenue === 'High' ? '#22c55e' : 
                         placement.revenue === 'Medium' ? '#fbbf24' : '#ef4444',
                  padding: '0.25rem 0.5rem',
                  borderRadius: '0.25rem',
                  fontSize: '0.75rem',
                  fontWeight: '500'
                }}>
                  Revenue: {placement.revenue}
                </span>
                <span style={{
                  backgroundColor: placement.userExperience === 'Excellent' ? 'rgba(34, 197, 94, 0.2)' : 
                                 placement.userExperience === 'Good' ? 'rgba(251, 191, 36, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                  color: placement.userExperience === 'Excellent' ? '#22c55e' : 
                         placement.userExperience === 'Good' ? '#fbbf24' : '#ef4444',
                  padding: '0.25rem 0.5rem',
                  borderRadius: '0.25rem',
                  fontSize: '0.75rem',
                  fontWeight: '500'
                }}>
                  UX: {placement.userExperience}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Revenue Projections */}
      <div style={{ marginBottom: '2rem' }}>
        <h3 style={{ 
          fontSize: '1.25rem', 
          fontWeight: 'bold', 
          color: 'white', 
          marginBottom: '1rem' 
        }}>
          💰 Revenue Projections
        </h3>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '1rem' 
        }}>
          {revenueProjections.map((projection, index) => (
            <div
              key={index}
              style={{
                backgroundColor: 'rgba(139, 92, 246, 0.1)',
                border: '1px solid rgba(139, 92, 246, 0.3)',
                borderRadius: '0.75rem',
                padding: '1rem',
                textAlign: 'center'
              }}
            >
              <div style={{ 
                fontSize: '1.5rem', 
                fontWeight: 'bold', 
                color: '#8b5cf6', 
                marginBottom: '0.5rem' 
              }}>
                {projection.users.toLocaleString()}
              </div>
              <div style={{ 
                fontSize: '1.125rem', 
                fontWeight: '600', 
                color: 'white', 
                marginBottom: '0.25rem' 
              }}>
                {projection.monthlyRevenue}
              </div>
              <div style={{ 
                color: '#9ca3af', 
                fontSize: '0.875rem', 
                marginBottom: '0.5rem' 
              }}>
                CPM: {projection.cpm}
              </div>
              <div style={{ 
                color: '#8b5cf6', 
                fontSize: '0.75rem', 
                fontWeight: '500' 
              }}>
                {projection.notes}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Implementation Plan */}
      <div style={{ marginBottom: '2rem' }}>
        <h3 style={{ 
          fontSize: '1.25rem', 
          fontWeight: 'bold', 
          color: 'white', 
          marginBottom: '1rem' 
        }}>
          🚀 Implementation Plan
        </h3>
        <div style={{
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: '0.75rem',
          padding: '1.5rem'
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
            <div>
              <h4 style={{ color: 'white', marginBottom: '0.75rem', fontWeight: '600' }}>Phase 1: Basic Ads (Week 1-2)</h4>
              <ul style={{ color: '#9ca3af', fontSize: '0.875rem', paddingLeft: '1rem' }}>
                <li>Google AdSense integration</li>
                <li>Sidebar banner ads</li>
                <li>Processing page ads</li>
                <li>Basic analytics setup</li>
              </ul>
            </div>
            <div>
              <h4 style={{ color: 'white', marginBottom: '0.75rem', fontWeight: '600' }}>Phase 2: Premium Features (Month 2-3)</h4>
              <ul style={{ color: '#9ca3af', fontSize: '0.875rem', paddingLeft: '1rem' }}>
                <li>Ad-free premium tier</li>
                <li>Higher quality processing</li>
                <li>Priority processing</li>
                <li>No watermarks</li>
              </ul>
            </div>
            <div>
              <h4 style={{ color: 'white', marginBottom: '0.75rem', fontWeight: '600' }}>Phase 3: Optimization (Month 3-6)</h4>
              <ul style={{ color: '#9ca3af', fontSize: '0.875rem', paddingLeft: '1rem' }}>
                <li>A/B test ad placements</li>
                <li>Optimize CPM rates</li>
                <li>User feedback integration</li>
                <li>Advanced analytics</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Pros and Cons */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
        <div>
          <h3 style={{ 
            fontSize: '1.125rem', 
            fontWeight: 'bold', 
            color: '#22c55e', 
            marginBottom: '1rem' 
          }}>
            ✅ Advantages
          </h3>
          <ul style={{ color: '#9ca3af', fontSize: '0.875rem', paddingLeft: '1rem' }}>
            <li>Immediate revenue generation</li>
            <li>Lower barrier to user acquisition</li>
            <li>No payment processing complexity</li>
            <li>Easier to scale quickly</li>
            <li>Proven model (YouTube, Spotify)</li>
            <li>Can add premium tier later</li>
          </ul>
        </div>
        <div>
          <h3 style={{ 
            fontSize: '1.125rem', 
            fontWeight: 'bold', 
            color: '#ef4444', 
            marginBottom: '1rem' 
          }}>
            ⚠️ Challenges
          </h3>
          <ul style={{ color: '#9ca3af', fontSize: '0.875rem', paddingLeft: '1rem' }}>
            <li>Lower revenue per user</li>
            <li>Need high traffic for good revenue</li>
            <li>Ad blockers can reduce revenue</li>
            <li>User experience concerns</li>
            <li>Dependent on ad market conditions</li>
            <li>Requires careful ad placement</li>
          </ul>
        </div>
      </div>

      <div style={{ 
        textAlign: 'center', 
        marginTop: '2rem', 
        padding: '1rem', 
        backgroundColor: 'rgba(139, 92, 246, 0.1)', 
        borderRadius: '0.5rem',
        border: '1px solid rgba(139, 92, 246, 0.3)'
      }}>
        <p style={{ color: '#8b5cf6', fontSize: '0.875rem', margin: 0, fontWeight: '500' }}>
          💡 Recommendation: Start with ads, then add premium subscriptions once you have 5,000+ users
        </p>
      </div>
    </div>
  );
};

export default AdStrategy;
