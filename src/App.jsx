import './App.css'
import { Routes, Route } from 'react-router-dom'
import { useState, useEffect } from "react";
import LoginPage from './Pages/LoginPage'
import Protected from "./Features/Protected";
import AdminPanel from "./Pages/AdminPanel";
import HomePage from './Pages/HomePage';
import AdminProductFormPage from './Pages/AdminProductFormPage';

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

  return (
    <>
      <Routes>
        <Route path="*" element={<div>Page not found</div>}></Route>
        <Route exact path="/" element={<LoginPage />}></Route>
        <Route exact path="/admin" element={
          <Protected>
            <AdminPanel currentWidth={width} />
          </Protected>
        }>
        </Route>
        <Route exact path="/create-product" element={
          <Protected>
            <AdminProductFormPage />
          </Protected>
        }>
        </Route>
        <Route exact path="/homePage" element={
          <Protected>
            <HomePage currentWidth={width} />
          </Protected>
        }>
        </Route>
      </Routes>
    </>
  )
}