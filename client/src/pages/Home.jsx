import React from 'react'
import { Navigate } from 'react-router-dom';

function Home() {
  // Redirect to login page
  return <Navigate to="/login" />;
}
export default Home;