// Common styles and animations
export const globalStyles = `
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;

export const containerStyles = {
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '1rem',
  background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)'
};

export const cardStyles = {
  width: '100%',
  maxWidth: '42rem',
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  borderRadius: '1rem',
  padding: '2rem',
  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
};

export const formStyles = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem'
};
