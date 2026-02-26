import React, { createContext, useState, useEffect } from 'react';
import { getProjects, saveProjects } from '../utils/storage';
import { mockProjects } from '../utils/mockData';

export const ProjectsContext = createContext();

export const ProjectsProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load projects from storage on mount
  useEffect(() => {
    const storedProjects = getProjects();
    if (storedProjects.length === 0) {
      // Initialize with mock data if no projects exist
      setProjects(mockProjects);
      saveProjects(mockProjects);
    } else {
      setProjects(storedProjects);
    }
    setLoading(false);
  }, []);

  const createProject = (projectData) => {
    const newProject = {
      id: Date.now().toString(),
      ...projectData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const updatedProjects = [...projects, newProject];
    setProjects(updatedProjects);
    saveProjects(updatedProjects);
    return newProject;
  };

  const updateProject = (id, projectData) => {
    const updatedProjects = projects.map((project) =>
      project.id === id
        ? { ...project, ...projectData, updatedAt: new Date().toISOString() }
        : project
    );
    setProjects(updatedProjects);
    saveProjects(updatedProjects);
  };

  const deleteProject = (id) => {
    const updatedProjects = projects.filter((project) => project.id !== id);
    setProjects(updatedProjects);
    saveProjects(updatedProjects);
  };

  const getProjectById = (id) => {
    return projects.find((project) => project.id === id);
  };

  return (
    <ProjectsContext.Provider
      value={{
        projects,
        loading,
        createProject,
        updateProject,
        deleteProject,
        getProjectById,
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};

export const useProjects = () => {
  const context = React.useContext(ProjectsContext);
  if (!context) {
    throw new Error('useProjects must be used within ProjectsProvider');
  }
  return context;
};
