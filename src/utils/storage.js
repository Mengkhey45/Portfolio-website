const PROJECTS_KEY = 'portfolio_projects';

export const getProjects = () => {
  try {
    const data = localStorage.getItem(PROJECTS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error reading projects from storage:', error);
    return [];
  }
};

export const saveProjects = (projects) => {
  try {
    localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
  } catch (error) {
    console.error('Error saving projects to storage:', error);
  }
};

export const getProjectById = (id) => {
  const projects = getProjects();
  return projects.find((project) => project.id === id);
};

export const createProject = (projectData) => {
  const projects = getProjects();
  const newProject = {
    id: Date.now().toString(),
    ...projectData,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  projects.push(newProject);
  saveProjects(projects);
  return newProject;
};

export const updateProject = (id, projectData) => {
  const projects = getProjects();
  const updated = projects.map((project) =>
    project.id === id
      ? { ...project, ...projectData, updatedAt: new Date().toISOString() }
      : project
  );
  saveProjects(updated);
};

export const deleteProject = (id) => {
  const projects = getProjects();
  const filtered = projects.filter((project) => project.id !== id);
  saveProjects(filtered);
};
