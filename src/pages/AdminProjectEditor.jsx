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
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white">
      <AdminHeader />

      <main className="px-4 md:px-8 py-12 max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">
            {isEditMode ? 'Edit Project' : 'Create New Project'}
          </h1>
          <p className="text-slate-400">
            {isEditMode
              ? 'Update project details and media'
              : 'Add a new project to your portfolio'}
          </p>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="mb-6 p-4 bg-green-500/10 border border-green-500 rounded-lg">
            <p className="text-green-400">{successMessage}</p>
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
