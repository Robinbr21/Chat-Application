import { useState, useEffect } from 'react';

function UseAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState( localStorage.getItem('token') ? true : false);

  useEffect(() => {

    const token = localStorage.getItem('token');
    const userIsAuthenticated = token ? true : false;

    setIsAuthenticated(userIsAuthenticated);
  }, [isAuthenticated]);
  return isAuthenticated
}

export default UseAuth