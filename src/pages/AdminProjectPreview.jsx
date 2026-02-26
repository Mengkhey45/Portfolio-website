import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import AdminHeader from '../components/AdminHeader';
import { useProjects } from '../context/ProjectsContext';

const AdminProjectPreview = () => {
  const { id } = useParams();
  const { getProjectById } = useProjects();
  const navigate = useNavigate();

  const project = getProjectById(id);

  if (!project) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
        <AdminHeader />
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)]">
          <h1 className="text-4xl font-bold text-white mb-4">Project Not Found</h1>
          <Link
            to="/admin/dashboard"
            className="text-blue-400 hover:text-blue-300 underline"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white">
      <AdminHeader />

      <main className="px-4 md:px-8 py-12 max-w-5xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="text-slate-400 hover:text-white transition-colors flex items-center gap-2 mb-8"
        >
          ← Back
        </button>

        {/* Header */}
        <div className="mb-8 pb-8 border-b border-slate-700">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{project.title}</h1>
          <p className="text-lg text-slate-300 mb-6">{project.description}</p>

          {/* Tags */}
          {project.tags && project.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-600 text-white rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Links */}
          {project.links && project.links.length > 0 && (
            <div className="flex flex-wrap gap-4">
              {project.links.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors capitalize"
                >
                  {link.type} →
                </a>
              ))}
            </div>
          )}
        </div>

        {/* Thumbnail */}
        {project.thumbnail && (
          <div className="mb-12 rounded-lg overflow-hidden">
            <img
              src={project.thumbnail}
              alt={project.title}
              className="w-full h-auto object-cover"
            />
          </div>
        )}

        {/* Additional Images */}
        {project.images && project.images.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Project Gallery</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {project.images.map((image, index) => (
                <div key={index} className="rounded-lg overflow-hidden">
                  <img
                    src={image}
                    alt={`${project.title} ${index + 1}`}
                    className="w-full h-auto object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Project Details */}
        <div className="bg-slate-800 rounded-lg p-8 border border-slate-700">
          <h2 className="text-2xl font-bold mb-6">Project Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-slate-400 text-sm uppercase tracking-wide mb-2">
                Short Description
              </h3>
              <p className="text-white">{project.shortDescription}</p>
            </div>
            <div>
              <h3 className="text-slate-400 text-sm uppercase tracking-wide mb-2">
                Created Date
              </h3>
              <p className="text-white">
                {new Date(project.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div>
              <h3 className="text-slate-400 text-sm uppercase tracking-wide mb-2">
                Last Updated
              </h3>
              <p className="text-white">
                {new Date(project.updatedAt).toLocaleDateString()}
              </p>
            </div>
            <div>
              <h3 className="text-slate-400 text-sm uppercase tracking-wide mb-2">
                Number of Links
              </h3>
              <p className="text-white">
                {project.links ? project.links.length : 0}
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex gap-4">
          <Link
            to={`/admin/project/${id}/edit`}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            Edit Project
          </Link>
          <Link
            to="/admin/dashboard"
            className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
          >
            Back to Dashboard
          </Link>
        </div>
      </main>
    </div>
  );
};

export default AdminProjectPreview;
