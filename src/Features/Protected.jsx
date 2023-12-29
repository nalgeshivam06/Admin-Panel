import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectLoggedInAdmin } from "./Login/authSlice";
import { useEffect, useState } from "react";

function Protected({ children }) {
  const [admin, setAdmin] = useState(null);

  const checkAdmin = async () => {
    const accessToken = localStorage.getItem('token');
    if (!accessToken) {
      return setAdmin(false); 
    }
    try {
      const response = await fetch("http://localhost:8080/admin/profile", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = await response.json();
      console.log(data);
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
