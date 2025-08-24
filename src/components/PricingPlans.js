import React from 'react';

const PricingPlans = ({ onSelectPlan, currentPlan = null }) => {
  const plans = [
    {
      id: 'free',
      name: 'Free',
      price: '$0',
      period: 'forever',
      features: [
        '3 videos per month',
        'Low quality processing',
        'Basic TTS voices',
        '5MB max file size',
        'Community support'
      ],
      limitations: [
        'Watermark on videos',
        'Limited voice options',
        'No priority processing'
      ],
      popular: false
    },
    {
      id: 'pro',
      name: 'Pro',
      price: '$9.99',
      period: 'per month',
      features: [
        '50 videos per month',
        'High quality processing',
        'Premium TTS voices',
        '50MB max file size',
        'Priority processing',
        'No watermarks',
        'Email support'
      ],
      limitations: [],
      popular: true
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: '$29.99',
      period: 'per month',
      features: [
        'Unlimited videos',
        'Highest quality processing',
        'All TTS voices',
        '100MB max file size',
        'Instant processing',
        'Custom branding',
        'Priority support',
        'API access'
      ],
      limitations: [],
      popular: false
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
          Choose Your Plan
        </h2>
        <p style={{ color: '#9ca3af' }}>
          Start free and upgrade as you grow
        </p>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
        gap: '1.5rem' 
      }}>
        {plans.map((plan) => (
          <div
            key={plan.id}
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              border: `2px solid ${plan.popular ? '#8b5cf6' : 'rgba(255, 255, 255, 0.2)'}`,
              borderRadius: '1rem',
              padding: '1.5rem',
              position: 'relative',
              transition: 'all 0.3s ease'
            }}
          >
            {plan.popular && (
              <div style={{
                position: 'absolute',
                top: '-12px',
                left: '50%',
                transform: 'translateX(-50%)',
                backgroundColor: '#8b5cf6',
                color: 'white',
                padding: '0.25rem 1rem',
                borderRadius: '1rem',
                fontSize: '0.75rem',
                fontWeight: '500'
              }}>
                Most Popular
              </div>
            )}

            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ 
                fontSize: '1.25rem', 
                fontWeight: 'bold', 
                color: 'white', 
                marginBottom: '0.5rem' 
              }}>
                {plan.name}
              </h3>
              <div style={{ marginBottom: '0.5rem' }}>
                <span style={{ 
                  fontSize: '2rem', 
                  fontWeight: 'bold', 
                  color: '#8b5cf6' 
                }}>
                  {plan.price}
                </span>
                <span style={{ color: '#9ca3af', fontSize: '0.875rem' }}>
                  /{plan.period}
                </span>
              </div>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h4 style={{ 
                fontSize: '0.875rem', 
                fontWeight: '500', 
                color: 'white', 
                marginBottom: '0.75rem' 
              }}>
                ✅ What's included:
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {plan.features.map((feature, index) => (
                  <li key={index} style={{ 
                    color: '#9ca3af', 
                    fontSize: '0.875rem', 
                    marginBottom: '0.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    <span style={{ color: '#34d399' }}>✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {plan.limitations.length > 0 && (
              <div style={{ marginBottom: '1.5rem' }}>
                <h4 style={{ 
                  fontSize: '0.875rem', 
                  fontWeight: '500', 
                  color: 'white', 
                  marginBottom: '0.75rem' 
                }}>
                  ⚠️ Limitations:
                </h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {plan.limitations.map((limitation, index) => (
                    <li key={index} style={{ 
                      color: '#fca5a5', 
                      fontSize: '0.875rem', 
                      marginBottom: '0.5rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}>
                      <span>⚠</span>
                      {limitation}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <button
              onClick={() => onSelectPlan(plan.id)}
              disabled={currentPlan === plan.id}
              style={{
                width: '100%',
                padding: '0.75rem',
                backgroundColor: currentPlan === plan.id ? 
                  'rgba(255, 255, 255, 0.1)' : 
                  plan.popular ? '#8b5cf6' : 'rgba(255, 255, 255, 0.1)',
                color: 'white',
                border: 'none',
                borderRadius: '0.5rem',
                fontSize: '0.875rem',
                fontWeight: '500',
                cursor: currentPlan === plan.id ? 'not-allowed' : 'pointer',
                opacity: currentPlan === plan.id ? 0.5 : 1,
                transition: 'all 0.3s ease'
              }}
            >
              {currentPlan === plan.id ? 'Current Plan' : 
               plan.id === 'free' ? 'Start Free' : 'Subscribe Now'}
            </button>
          </div>
        ))}
      </div>

      <div style={{ 
        textAlign: 'center', 
        marginTop: '2rem', 
        padding: '1rem', 
        backgroundColor: 'rgba(255, 255, 255, 0.05)', 
        borderRadius: '0.5rem' 
      }}>
        <p style={{ color: '#9ca3af', fontSize: '0.875rem', margin: 0 }}>
          💳 Secure payment powered by Stripe • Cancel anytime • 30-day money-back guarantee
        </p>
      </div>
    </div>
  );
};

export default PricingPlans;
