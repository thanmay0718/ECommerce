// App.jsx
import React from "react";
import Products from "./components/products/Products";
import Home from "./components/home/Home";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/shared/NavBar";
import About from "./components/About";
import Contact from "./components/Contact";
import { Toaster } from "react-hot-toast";
import Cart from "./components/cart/Cart";
import LogIn from "./components/auth/LogIn";
import Register from "./components/auth/Register";
import PrivateRoute from "./components/PrivateRoute";
import Checkout from "./components/checkout/Checkout";
import { ThemeProvider, useTheme } from "./context/ThemeContext";

// Premium toast configuration — matches brand design tokens
const PremiumToaster = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <Toaster
      position="top-center"
      toastOptions={{
        duration: 3500,
        style: {
          fontFamily: 'Arial, "Helvetica Neue", Helvetica, sans-serif',
          fontSize: "11px",
          fontWeight: "600",
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          borderRadius: "8px",
          padding: "12px 16px",
          background: isDark ? "#1C1C1C" : "#1A1A1A",
          color: "#F2F1EE",
          border: `1px solid ${isDark ? "#2A2A2A" : "transparent"}`,
          boxShadow: "0 8px 24px rgba(0,0,0,0.18)",
          maxWidth: "380px",
        },
        success: {
          iconTheme: {
            primary: "#C9A961",
            secondary: "#1A1A1A",
          },
        },
        error: {
          iconTheme: {
            primary: "#f87171",
            secondary: "#1A1A1A",
          },
        },
      }}
    />
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <React.Fragment>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<PrivateRoute publicPage />}>
            <Route path="/login" element={<LogIn />} />
          </Route>
        </Routes>

        <PremiumToaster />
      </React.Fragment>
    </ThemeProvider>
  );
};

export default App;

/*
Install :
1. npm install @headlessui/react
2. npm install @heroicons/react
3. npm install @tailwindcss search in website 
4. npm install react-hot-toast
5. material ui : npm install @mui/material @emotion/react @emotion/styled
*/
