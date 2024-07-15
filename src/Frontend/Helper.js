
export const getToken = () => {
    return localStorage.getItem('token');
  };
  
  export const getUserRole = () => {
    const role = localStorage.getItem('role'); 
    return role;
  };
  