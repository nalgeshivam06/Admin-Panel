import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../config";

function Protected({ children }) {
  const [admin, setAdmin] = useState(null);

  const checkAdmin = async () => {
    const accessToken = localStorage.getItem('token');
    if (!accessToken) {
      return setAdmin(false); 
    }
    try {
      const response = await fetch(`${BASE_URL}/admin/profile`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = await response.json();
      setAdmin(data.isAdmin);
    } catch (error) {
      console.log(error);
      setAdmin(false); 
    }
  };

  useEffect(() => {
    checkAdmin();
  }, []);

  if (admin === null) {
    return null; // Render nothing while checking admin status
  }

  if (!admin) {
    return <Navigate to='/' replace={true} />;
  }

  return children;
}

export default Protected;
