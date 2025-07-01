// Helper: Parse JWT token payload using atob (browser)
const parseJwt = (token) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    console.error('Failed to parse JWT token:', e);
    return null;
  }
};

// Get token from localStorage (or sessionStorage if you prefer)
export const getUserToken = () => {
  try {
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsed = JSON.parse(userData);
      return parsed?.token || null;
    }
    return null;
  } catch (error) {
    console.error('Error reading token from localStorage:', error);
    return null;
  }
};

// Get user ID from token
export const getUserId = () => {
  try {
    const token = getUserToken();
    if (!token) return null;
    const payload = parseJwt(token);
    return payload?.id || null;
  } catch (error) {
    console.error('Error getting user ID from token:', error);
    return null;
  }
};

// Get user name (optional)
export const getUserName = () => {
  try {
    const token = getUserToken();
    const payload = parseJwt(token);
    return payload?.name || 'Unknown';
  } catch (error) {
    console.error('Error getting user name from token:', error);
    return 'Unknown';
  }
};

// Get user role (optional)
export const getUserRole = () => {
  try {
    const token = getUserToken();
    const payload = parseJwt(token);
    return payload?.role || 'user';
  } catch (error) {
    console.error('Error getting user role from token:', error);
    return 'user';
  }
};

// Get all user data
export const getUserData = () => {
  try {
    const token = getUserToken();
    const payload = parseJwt(token);
    return payload ? { token, id: payload.id, name: payload.name, role: payload.role } : null;
  } catch (error) {
    console.error('Error getting user data:', error);
    return null;
  }
};

// Optional: Set user data (token etc.)
export const setUserData = (user) => {
  try {
    localStorage.setItem('user', JSON.stringify(user));
  } catch (error) {
    console.error('Error setting user data in localStorage:', error);
  }
};

// Optional: Clear user data on logout
export const clearUserData = () => {
  try {
    localStorage.removeItem('user');
  } catch (error) {
    console.error('Error clearing user data from localStorage:', error);
  }
};
