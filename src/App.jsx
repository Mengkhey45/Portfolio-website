import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AdminAuthProvider, useAdminAuth } from "./context/AdminAuthContext";
import { ProjectsProvider } from "./context/ProjectsContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import About from "./pages/About";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Services from "./pages/Services";
import PublicHome from "./pages/PublicHome";
import ProjectDetail from "./pages/ProjectDetail";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminProjectEditor from "./pages/AdminProjectEditor";
import AdminProjectPreview from "./pages/AdminProjectPreview";

import "./assets/index.css";

// Protected route component
const ProtectedRoute = ({ element }) => {
  const { isLoggedIn, loading } = useAdminAuth();
  
  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return isLoggedIn ? element : <Navigate to="/admin" />;
};

function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<><Navbar /><PublicHome /></>} />
      <Route path="/project/:id" element={<><Navbar /><ProjectDetail /></>} />
      <Route path="/about" element={<><Navbar /><About/></>} />
      <Route path="/services" element={<><Navbar /><Services /></>} />
      <Route path="/contact" element={<><Navbar /><Footer /></>} />
      <Route path="/projects" element={<><Navbar /><Projects /></>} />
      
      {/* Admin Routes */}
      <Route path="/admin" element={<AdminLogin />} />
      <Route 
        path="/admin/dashboard" 
        element={<ProtectedRoute element={<AdminDashboard />} />} 
      />
      <Route 
        path="/admin/project/new" 
        element={<ProtectedRoute element={<AdminProjectEditor />} />} 
      />
      <Route 
        path="/admin/project/:id/edit" 
        element={<ProtectedRoute element={<AdminProjectEditor />} />} 
      />
      <Route 
        path="/admin/project/:id" 
        element={<ProtectedRoute element={<AdminProjectPreview />} />} 
      />
    </Routes>
  );
}

function App() {
  return (
    <AdminAuthProvider>
      <ProjectsProvider>
        <Router>
          <AppRoutes />
        </Router>
      </ProjectsProvider>
    </AdminAuthProvider>
  );
}

export default App;
