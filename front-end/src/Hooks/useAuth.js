import { useState, useEffect } from 'react';

function UseAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {

    const token = localStorage.getItem('token');
    const userIsAuthenticated = token ? true : false;

    setIsAuthenticated(userIsAuthenticated);
  }, []);

  return isAuthenticated
}

export default UseAuth