import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AdminHeader from '../components/AdminHeader';
import AdminProjectForm from '../components/AdminProjectForm';
import { useProjects } from '../context/ProjectsContext';

const AdminProjectEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { createProject, updateProject, getProjectById } = useProjects();
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const isEditMode = !!id;
  const project = isEditMode ? getProjectById(id) : null;

  const handleSubmit = (formData) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      if (isEditMode) {
        updateProject(id, formData);
        setSuccessMessage('Project updated successfully!');
      } else {
        createProject(formData);
        setSuccessMessage('Project created successfully!');
      }

      setIsLoading(false);

      // Redirect after 1.5 seconds
      setTimeout(() => {
        navigate('/admin/dashboard');
      }, 1500);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <AdminHeader />

      <main className="px-4 md:px-8 py-12 max-w-5xl mx-auto pt-24">
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-purple-400 to-purple-800">
            {isEditMode ? 'Edit Project' : 'Create New Project'}
          </h1>
          <p className="text-white/60 text-lg">
            {isEditMode ? 'Update your project details' : 'Add a new project to your portfolio'}
          </p>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="mb-6 p-4 bg-green-500/10 border border-green-500/50 rounded-lg text-green-400 text-center">
            {successMessage}
          </div>
        )}

        {/* Form */}
        <AdminProjectForm
          initialData={project}
          onSubmit={handleSubmit}
          isLoading={isLoading}
        />
      </main>
    </div>
  );
};

export default AdminProjectEditor;
