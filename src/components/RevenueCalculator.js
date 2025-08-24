import React, { useState } from 'react';
import { RevenueOptimizer } from '../utils/userAuth';

const RevenueCalculator = () => {
  const [userCount, setUserCount] = useState(1000);
  const [loginRate, setLoginRate] = useState(30);
  const [days, setDays] = useState(30);

  const calculateRevenue = () => {
    const loggedInUsers = Math.floor(userCount * (loginRate / 100));
    const anonymousUsers = userCount - loggedInUsers;
    
    const loggedInCPM = 8; // $8 CPM for logged-in users
    const anonymousCPM = 3; // $3 CPM for anonymous users
    
    const loggedInRevenue = (loggedInUsers * loggedInCPM * days) / 1000;
    const anonymousRevenue = (anonymousUsers * anonymousCPM * days) / 1000;
    
    return {
      total: loggedInRevenue + anonymousRevenue,
      loggedIn: loggedInRevenue,
      anonymous: anonymousRevenue,
      breakdown: {
        loggedInUsers,
        anonymousUsers,
        loggedInCPM,
        anonymousCPM
      }
    };
  };

  const revenue = calculateRevenue();

  const containerStyles = {
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    borderRadius: '1rem',
    padding: '1.5rem',
    marginBottom: '1.5rem',
    backdropFilter: 'blur(10px)'
  };

  const inputStyles = {
    width: '100%',
    padding: '0.75rem',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '0.5rem',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    color: 'white',
    fontSize: '0.875rem',
    marginBottom: '1rem'
  };

  const labelStyles = {
    color: 'white',
    fontSize: '0.875rem',
    fontWeight: '500',
    marginBottom: '0.5rem',
    display: 'block'
  };

  const resultStyles = {
    backgroundColor: 'rgba(139, 92, 246, 0.1)',
    border: '1px solid rgba(139, 92, 246, 0.3)',
    borderRadius: '0.75rem',
    padding: '1rem',
    marginTop: '1rem'
  };

  return (
    <div style={containerStyles}>
      <h3 style={{ color: 'white', fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem' }}>
        💰 Revenue Calculator
      </h3>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
        <div>
          <label style={labelStyles}>Total Users</label>
          <input
            type="number"
            value={userCount}
            onChange={(e) => setUserCount(parseInt(e.target.value) || 0)}
            style={inputStyles}
            min="100"
            max="100000"
          />
        </div>

        <div>
          <label style={labelStyles}>Login Rate (%)</label>
          <input
            type="number"
            value={loginRate}
            onChange={(e) => setLoginRate(parseInt(e.target.value) || 0)}
            style={inputStyles}
            min="0"
            max="100"
          />
        </div>

        <div>
          <label style={labelStyles}>Time Period (Days)</label>
          <input
            type="number"
            value={days}
            onChange={(e) => setDays(parseInt(e.target.value) || 0)}
            style={inputStyles}
            min="1"
            max="365"
          />
        </div>
      </div>

      <div style={resultStyles}>
        <h4 style={{ color: '#8b5cf6', fontSize: '1rem', fontWeight: '600', marginBottom: '0.75rem' }}>
          Revenue Projection
        </h4>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem' }}>
          <div>
            <div style={{ color: '#22c55e', fontSize: '1.5rem', fontWeight: 'bold' }}>
              ${revenue.total.toFixed(2)}
            </div>
            <div style={{ color: '#9ca3af', fontSize: '0.75rem' }}>Total Revenue</div>
          </div>
          
          <div>
            <div style={{ color: '#8b5cf6', fontSize: '1.25rem', fontWeight: '600' }}>
              ${revenue.loggedIn.toFixed(2)}
            </div>
            <div style={{ color: '#9ca3af', fontSize: '0.75rem' }}>From Logged Users</div>
          </div>
          
          <div>
            <div style={{ color: '#fbbf24', fontSize: '1.25rem', fontWeight: '600' }}>
              ${revenue.anonymous.toFixed(2)}
            </div>
            <div style={{ color: '#9ca3af', fontSize: '0.75rem' }}>From Anonymous Users</div>
          </div>
        </div>

        <div style={{ marginTop: '1rem', padding: '0.75rem', backgroundColor: 'rgba(255, 255, 255, 0.05)', borderRadius: '0.5rem' }}>
          <div style={{ color: '#9ca3af', fontSize: '0.75rem', marginBottom: '0.5rem' }}>Breakdown:</div>
          <div style={{ color: 'white', fontSize: '0.75rem' }}>
            • {revenue.breakdown.loggedInUsers} logged-in users (${revenue.breakdown.loggedInCPM} CPM)
          </div>
          <div style={{ color: 'white', fontSize: '0.75rem' }}>
            • {revenue.breakdown.anonymousUsers} anonymous users (${revenue.breakdown.anonymousCPM} CPM)
          </div>
        </div>
      </div>

      <div style={{ marginTop: '1rem', padding: '0.75rem', backgroundColor: 'rgba(34, 197, 94, 0.1)', borderRadius: '0.5rem', border: '1px solid rgba(34, 197, 94, 0.3)' }}>
        <div style={{ color: '#22c55e', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.25rem' }}>
          💡 Pro Tip: User Login = 3x Higher Revenue!
        </div>
        <div style={{ color: '#9ca3af', fontSize: '0.75rem' }}>
          Encourage users to create accounts for better ad targeting and higher CPM rates.
        </div>
      </div>
    </div>
  );
};

export default RevenueCalculator;
