import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAdminAuth } from '../context/AdminAuthContext';
import { useProjects } from '../context/ProjectsContext';
import AdminHeader from '../components/AdminHeader';

const AdminDashboard = () => {
  const { currentEmail } = useAdminAuth();
  const { projects, deleteProject } = useProjects();
  const [confirmDelete, setConfirmDelete] = useState(null);

  const handleDeleteProject = (id) => {
    deleteProject(id);
    setConfirmDelete(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white">
      <AdminHeader />

      <main className="px-4 md:px-8 py-12 max-w-7xl mx-auto">
        {/* Welcome Section */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
          <p className="text-slate-400">
            Logged in as <span className="font-semibold text-blue-400">{currentEmail}</span>
          </p>
        </div>

        {/* Create New Project Button */}
        <div className="mb-8">
          <Link
            to="/admin/project/new"
            className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors"
          >
            + Create New Project
          </Link>
        </div>

        {/* Projects List */}
        <div className="bg-slate-800 rounded-lg border border-slate-700 overflow-hidden">
          {projects.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-slate-400 mb-4">No projects yet.</p>
              <Link
                to="/admin/project/new"
                className="text-blue-400 hover:text-blue-300 underline"
              >
                Create your first project
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-slate-700 bg-slate-700/50">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold">Title</th>
                    <th className="px-6 py-4 text-left font-semibold">Tags</th>
                    <th className="px-6 py-4 text-left font-semibold">Updated</th>
                    <th className="px-6 py-4 text-right font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map((project) => (
                    <tr
                      key={project.id}
                      className="border-b border-slate-700 hover:bg-slate-700/30 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-semibold text-white">{project.title}</p>
                          <p className="text-slate-400 text-sm">
                            {project.shortDescription || project.description}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                          {project.tags && project.tags.slice(0, 2).map((tag, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-slate-600 text-xs rounded"
                            >
                              {tag}
                            </span>
                          ))}
                          {project.tags && project.tags.length > 2 && (
                            <span className="px-2 py-1 bg-slate-600 text-xs rounded">
                              +{project.tags.length - 2}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-slate-400 text-sm">
                        {new Date(project.updatedAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <Link
                            to={`/admin/project/${project.id}`}
                            className="px-3 py-1 bg-slate-600 hover:bg-slate-500 text-sm rounded transition-colors"
                          >
                            Preview
                          </Link>
                          <Link
                            to={`/admin/project/${project.id}/edit`}
                            className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-sm rounded transition-colors"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => setConfirmDelete(project.id)}
                            className="px-3 py-1 bg-red-600 hover:bg-red-700 text-sm rounded transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <p className="text-slate-400 text-sm">Total Projects</p>
            <p className="text-3xl font-bold text-white mt-2">{projects.length}</p>
          </div>
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <p className="text-slate-400 text-sm">With Images</p>
            <p className="text-3xl font-bold text-white mt-2">
              {projects.filter((p) => p.images && p.images.length > 0).length}
            </p>
          </div>
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <p className="text-slate-400 text-sm">With Links</p>
            <p className="text-3xl font-bold text-white mt-2">
              {projects.filter((p) => p.links && p.links.length > 0).length}
            </p>
          </div>
        </div>
      </main>

      {/* Delete Confirmation Modal */}
      {confirmDelete && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center px-4 z-50">
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 max-w-sm w-full">
            <h3 className="text-xl font-bold text-white mb-4">Delete Project?</h3>
            <p className="text-slate-400 mb-6">
              This action cannot be undone. Are you sure you want to delete this project?
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => handleDeleteProject(confirmDelete)}
                className="flex-1 py-2 bg-red-600 hover:bg-red-700 text-white rounded font-semibold transition-colors"
              >
                Delete
              </button>
              <button
                onClick={() => setConfirmDelete(null)}
                className="flex-1 py-2 bg-slate-600 hover:bg-slate-500 text-white rounded font-semibold transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
