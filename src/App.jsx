import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import "./App.css";
import "./styles/components.css";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import { Footer, Header } from "./components";
import { Outlet } from "react-router-dom";
import { ThemeProvider } from "./components/ThemeProvider";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return !loading ? (
    <ThemeProvider>
      <div className="app-container">
        <div className="w-full block">
          <Header />
          <main className="container mx-auto px-4 py-8">
            <div className="max-w-7xl mx-auto">
              <Outlet />
            </div>
          </main>
          <Footer />
        </div>
      </div>
    </ThemeProvider>
  ) : (
    <div className="app-loading">
      <div className="app-spinner"></div>
    </div>
  );
}

export default App;
