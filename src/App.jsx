import './App.css'
import { Routes, Route } from 'react-router-dom'
import { useState, useEffect } from "react";
import {useDispatch,useSelector} from "react-redux"
import LoginPage from './Pages/LoginPage'
import Protected from "./Features/Protected";
import AdminPanel from "./Pages/AdminPanel";
import AdminProductDetailPage from "./Pages/AdminProductDetailPage";
import AdminProductFormPage from "./Pages/AdminProductFormPage";
import AdminOrdersPage from "./Pages/AdminOrdersPage";
import { fetchAllProductsAsync } from './Features/Product/productSlice';

export default function App() {

  const [width, setWidth] = useState(window.innerWidth);

  const handleSize = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleSize);

    return () => {
      window.removeEventListener("resize", handleSize);
    };
  }, []);

  // ******** fetch wishlist ********
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllProductsAsync())
  }, [dispatch])

  return (
    <>
      <Routes>
        <Route path="*" element={<div>Page not found</div>}></Route>
        <Route exact path="/login" element={<LoginPage />}></Route>
        <Route exact path="/admin" element={
          <Protected>
            <AdminPanel currentWidth={width} />
          </Protected>
        }>
        </Route>
      </Routes>
    </> 
  )
}