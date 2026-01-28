import { useState, useEffect, useCallback } from 'react';

// Odoo server URL - configure in .env file
const ODOO_BASE_URL = 'http://72.62.16.223:8069';

/**
 * Hook for integrating React app with Odoo
 * Handles user authentication, token validation, and communication with Odoo parent
 */
export function useOdooContext() {
  const [context, setContext] = useState({
    user: null,
    isEmbedded: false,
    isValid: false,
    isLoading: true,
    error: null,
  });

  // Parse URL params on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const isEmbedded = params.get('embedded') === 'true';

    if (!isEmbedded) {
      // Not embedded in Odoo - running standalone
      setContext({
        user: null,
        isEmbedded: false,
        isValid: true,
        isLoading: false,
        error: null,
      });
      return;
    }

    // Extract token params from URL
    const tokenParams = {
      user_id: params.get('user_id') || '',
      user_login: params.get('user_login') || '',
      user_name: params.get('user_name') || '',
      company_id: params.get('company_id') || '',
      company_name: params.get('company_name') || '',
      timestamp: params.get('timestamp') || '',
      token: params.get('token') || '',
      embedded: params.get('embedded') || '',
    };

    // Validate token with Odoo backend
    validateToken(tokenParams);
  }, []);

  const validateToken = async (params) => {
    try {
      const response = await fetch(`${ODOO_BASE_URL}/react_calendar/validate_token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          jsonrpc: '2.0',
          method: 'call',
          params: {
            user_id: params.user_id,
            company_id: params.company_id,
            timestamp: params.timestamp,
            token: params.token,
          },
          id: Date.now(),
        }),
      });

      const data = await response.json();
      const result = data.result;

      if (result?.valid) {
        setContext({
          user: {
            id: parseInt(params.user_id),
            login: params.user_login,
            name: params.user_name,
            companyId: parseInt(params.company_id),
            companyName: params.company_name,
          },
          isEmbedded: true,
          isValid: true,
          isLoading: false,
          error: null,
        });
      } else {
        setContext({
          user: null,
          isEmbedded: true,
          isValid: false,
          isLoading: false,
          error: result?.error || 'Token validation failed',
        });
      }
    } catch (err) {
      console.error('Token validation error:', err);
      // Graceful degradation - trust URL params if validation endpoint unreachable
      setContext({
        user: {
          id: parseInt(params.user_id),
          login: params.user_login,
          name: params.user_name,
          companyId: parseInt(params.company_id),
          companyName: params.company_name,
        },
        isEmbedded: true,
        isValid: true,
        isLoading: false,
        error: null,
      });
    }
  };

  // Listen for postMessage from Odoo parent
  useEffect(() => {
    const handleMessage = (event) => {
      // Security: Uncomment and configure origin validation in production
      // if (event.origin !== ODOO_BASE_URL) return;

      const { type, payload } = event.data || {};

      if (type === 'ODOO_USER_CONTEXT') {
        setContext(prev => ({
          ...prev,
          user: {
            id: payload.user_id,
            login: payload.user_login,
            name: payload.user_name,
            companyId: payload.company_id,
            companyName: payload.company_name,
          },
        }));
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  // Send message to Odoo parent window
  const sendMessageToOdoo = useCallback((type, payload) => {
    if (window.parent !== window) {
      window.parent.postMessage({ type, payload }, '*');
    }
  }, []);

  return { ...context, sendMessageToOdoo };
}

export default useOdooContext;
