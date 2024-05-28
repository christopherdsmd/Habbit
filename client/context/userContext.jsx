import axios from 'axios';
import { createContext, useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';

//exports user context data from to dashboard
export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);  //user data
  const location = useLocation();    
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get('/profile');    //get request profile data 
        setUser(data);
      } catch (error) {  //error catch
        console.error('Error fetching profile:', error.response?.data || error.message);
      }
    };

    if (!user || location.pathname === '/dashboard') {
      // Fetch data when the component mounts or when navigating to the '/dashboard' route
      fetchData();
    }
  }, [location.pathname]);



  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
