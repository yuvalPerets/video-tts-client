// Global styles
export const globalStyles = `
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
    overflow-x: hidden;
  }

  .App {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  /* Custom scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.3);
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.5);
  }
`;

// Container styles
export const containerStyles = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-start',
  minHeight: '100vh',
  padding: '2rem 0',
  width: '100%',
  maxWidth: '100%'
};

// Card styles
export const cardStyles = {
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(20px)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  borderRadius: '1.5rem',
  padding: '2.5rem',
  boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15)',
  width: '100%',
  maxWidth: '800px',
  margin: '0 auto',
  position: 'relative',
  overflow: 'hidden'
};

// Form styles
export const formStyles = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem',
  width: '100%'
};

// Button base styles
export const buttonBaseStyles = {
  padding: '0.875rem 1.5rem',
  border: 'none',
  borderRadius: '0.75rem',
  fontSize: '0.875rem',
  fontWeight: '600',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '0.5rem',
  textDecoration: 'none',
  outline: 'none',
  position: 'relative',
  overflow: 'hidden'
};

// Primary button styles
export const primaryButtonStyles = {
  ...buttonBaseStyles,
  backgroundColor: 'rgba(139, 92, 246, 0.9)',
  color: 'white',
  boxShadow: '0 4px 15px rgba(139, 92, 246, 0.3)'
};

// Secondary button styles
export const secondaryButtonStyles = {
  ...buttonBaseStyles,
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  color: 'white',
  border: '1px solid rgba(255, 255, 255, 0.2)'
};

// Input base styles
export const inputBaseStyles = {
  padding: '0.875rem 1rem',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  borderRadius: '0.75rem',
  backgroundColor: 'rgba(255, 255, 255, 0.05)',
  color: 'white',
  fontSize: '0.875rem',
  transition: 'all 0.3s ease',
  outline: 'none',
  width: '100%'
};

// Hover effects
export const hoverEffects = {
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.2)'
  }
};

// Focus effects
export const focusEffects = {
  '&:focus': {
    borderColor: 'rgba(139, 92, 246, 0.5)',
    boxShadow: '0 0 0 3px rgba(139, 92, 246, 0.1)'
  }
};

// Animation keyframes
export const animations = `
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slideIn {
    from {
      transform: translateX(-100%);
    }
    to {
      transform: translateX(0);
    }
  }

  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.7;
    }
  }

  @keyframes shimmer {
    0% {
      background-position: -200px 0;
    }
    100% {
      background-position: calc(200px + 100%) 0;
    }
  }
`;

// Responsive breakpoints
export const breakpoints = {
  mobile: '480px',
  tablet: '768px',
  desktop: '1024px',
  wide: '1200px'
};

// Media query helpers
export const mediaQueries = {
  mobile: `@media (max-width: ${breakpoints.mobile})`,
  tablet: `@media (max-width: ${breakpoints.tablet})`,
  desktop: `@media (max-width: ${breakpoints.desktop})`,
  wide: `@media (max-width: ${breakpoints.wide})`
};
