import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProjects } from '../context/ProjectsContext';
import { useAdminAuth } from '../context/AdminAuthContext';
import { motion } from 'framer-motion';
import AdminHeader from '../components/AdminHeader';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { projects, deleteProject } = useProjects();
  const { logout } = useAdminAuth();
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const handleDelete = (id) => {
    deleteProject(id);
    setDeleteConfirm(null);
  };

  return (
    <div className="flex justify-center bg-black items-center h-auto relative min-h-screen">
      <AdminHeader />
      
      <section className="flex z-20 my-20 lg:mt-30 flex-col items-center gap-10 p-5 w-full pt-20">
        <div className='px-5 md:px-16 animate-fade-down w-full'>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
            <div>
              <h1 className="text-center md:text-left mb-5 text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-purple-400 to-purple-800">
                My Projects
              </h1>
              <p className='text-white/80 leading-7 lg:text-lg max-w-80 md:max-w-168 xl:max-w-255'>
                Manage your portfolio projects. Create, edit, or delete projects to showcase your work.
              </p>
            </div>
            <button
              onClick={() => navigate('/admin/project/new')}
              className="px-8 py-3 bg-gradient-to-r from-indigo-400 via-pink-400 to-purple-500 rounded-lg font-semibold text-white hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center gap-2 whitespace-nowrap"
            >
              <i className="bx bx-plus text-2xl"></i>
              Add Project
            </button>
          </div>
        </div>

        {projects.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 w-full">
            <i className="bx bx-folder-open text-6xl text-white/50 mb-4"></i>
            <p className="text-white/60 text-lg mb-6">No projects yet. Create your first project!</p>
            <button
              onClick={() => navigate('/admin/project/new')}
              className="px-6 py-3 bg-gradient-to-r from-indigo-400 via-pink-400 to-purple-500 rounded-lg font-semibold text-white hover:shadow-lg transition"
            >
              Create Project
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-y-8 md:gap-x-5 xl:gap-y-10 w-full px-5">
            {projects.map((project, index) => (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: -40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="flex flex-col w-80 bg-gradient-to-r from-zinc-800 via-stone-800 to-zinc-800 p-5 rounded-lg shadow-lg relative group"
              >
                {/* Project Thumbnail */}
                <div className="relative overflow-hidden rounded">
                  {project.thumbnail ? (
                    <img 
                      className="w-full h-50 lg:h-60 object-cover group-hover:scale-110 transition-transform duration-300" 
                      src={project.thumbnail} 
                      alt={project.title} 
                    />
                  ) : (
                    <div className="w-full h-50 lg:h-60 bg-gray-700 flex items-center justify-center rounded">
                      <i className="bx bx-image text-4xl text-white/50"></i>
                    </div>
                  )}
                  {/* Action Buttons Overlay */}
                  <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                    <button
                      onClick={() => navigate(`/admin/project/${project.id}/edit`)}
                      className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg font-semibold text-white transition flex items-center gap-2"
                      title="Edit project"
                    >
                      <i className="bx bx-edit"></i>
                      Edit
                    </button>
                    <button
                      onClick={() => setDeleteConfirm(project.id)}
                      className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg font-semibold text-white transition flex items-center gap-2"
                      title="Delete project"
                    >
                      <i className="bx bx-trash"></i>
                      Delete
                    </button>
                  </div>
                </div>

                <div className="mt-3">
                  <h3 className="text-lg font-semibold text-white truncate">{project.title}</h3>
                  <p className="text-white/80 text-sm line-clamp-2">{project.description}</p>

                  {/* Tags/Technologies */}
                  {project.tags && project.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {project.tags.slice(0, 3).map((tag, idx) => (
                        <span 
                          key={idx} 
                          className="text-xs px-2 py-1 bg-purple-500/30 text-purple-200 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 3 && (
                        <span className="text-xs px-2 py-1 bg-purple-500/30 text-purple-200 rounded-full">
                          +{project.tags.length - 3}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </section>

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-gradient-to-r from-zinc-800 via-stone-800 to-zinc-800 border border-purple-500/30 rounded-lg p-6 max-w-sm w-full"
          >
            <h3 className="text-xl font-bold text-white mb-2">Delete Project?</h3>
            <p className="text-white/60 mb-6">
              Are you sure you want to delete this project? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white transition"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white transition"
              >
                Delete
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
