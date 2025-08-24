import React, { useState } from 'react';

const LoginModal = ({ isOpen, onLogin, onClose, onSkip }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login process
    setTimeout(() => {
      setIsLoading(false);
      onLogin({ email, id: Date.now() });
    }, 1000);
  };

  if (!isOpen) return null;

  const modalStyles = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: '1rem'
  };

  const contentStyles = {
    backgroundColor: '#1f2937',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '1rem',
    padding: '2rem',
    maxWidth: '400px',
    width: '100%',
    textAlign: 'center',
    position: 'relative'
  };

  const inputStyles = {
    width: '100%',
    padding: '0.875rem 1rem',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '0.75rem',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    color: 'white',
    fontSize: '0.875rem',
    marginBottom: '1rem',
    outline: 'none',
    transition: 'all 0.3s ease'
  };

  const buttonStyles = {
    width: '100%',
    padding: '0.875rem 1.5rem',
    backgroundColor: '#8b5cf6',
    color: 'white',
    border: 'none',
    borderRadius: '0.75rem',
    fontSize: '0.875rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    marginBottom: '1rem'
  };

  const skipButtonStyles = {
    ...buttonStyles,
    backgroundColor: 'transparent',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    color: '#9ca3af'
  };

  return (
    <div style={modalStyles} onClick={onClose}>
      <div style={contentStyles} onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{ 
            color: 'white', 
            fontSize: '1.5rem', 
            fontWeight: 'bold', 
            marginBottom: '0.5rem' 
          }}>
            Login to Continue
          </h2>
          <p style={{ color: '#9ca3af', fontSize: '0.875rem' }}>
            Create an account to unlock premium features and better ad experience
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyles}
            required
          />
          
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyles}
            required
          />

          <button
            type="submit"
            disabled={isLoading}
            style={{
              ...buttonStyles,
              opacity: isLoading ? 0.7 : 1,
              cursor: isLoading ? 'not-allowed' : 'pointer'
            }}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        {/* Skip Option */}
        <button
          onClick={onSkip}
          style={skipButtonStyles}
        >
          Continue without login
        </button>

        {/* Benefits */}
        <div style={{ 
          marginTop: '1.5rem', 
          padding: '1rem', 
          backgroundColor: 'rgba(139, 92, 246, 0.1)', 
          borderRadius: '0.5rem',
          border: '1px solid rgba(139, 92, 246, 0.3)'
        }}>
          <h3 style={{ color: '#8b5cf6', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem' }}>
            Benefits of Login:
          </h3>
          <ul style={{ color: '#9ca3af', fontSize: '0.75rem', textAlign: 'left', paddingLeft: '1rem' }}>
            <li>✓ Higher quality ads (3x more revenue)</li>
            <li>✓ Personalized experience</li>
            <li>✓ Save your video history</li>
            <li>✓ Premium features access</li>
          </ul>
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            backgroundColor: 'transparent',
            border: 'none',
            color: '#9ca3af',
            fontSize: '1.5rem',
            cursor: 'pointer',
            padding: '0.25rem'
          }}
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default LoginModal;
