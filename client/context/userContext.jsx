import axios from 'axios';
import { createContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const location = useLocation();
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get('/profile');
        setUser(data);
      } catch (error) {
        console.error('Error fetching profile:', error.response?.data || error.message);
      }
    };
  
    // Fetch data only when the user is not set
    if (!user && location.pathname === '/dashboard') {
      fetchData();
    }
  }, [location.pathname, user]);
  
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
} 