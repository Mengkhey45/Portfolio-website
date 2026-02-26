import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useProjects } from '../context/ProjectsContext';

const ProjectDetail = () => {
  const { id } = useParams();
  const { projects, loading } = useProjects();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl">Loading...</p>
      </div>
    );
  }

  const project = projects.find((p) => p.id === id);

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-slate-900 to-slate-800">
        <h1 className="text-4xl font-bold text-white mb-4">Project Not Found</h1>
        <Link to="/" className="text-blue-400 hover:text-blue-300 underline">
          Back to Portfolio
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Back Button */}
      <div className="px-4 md:px-8 py-8 max-w-5xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="text-slate-400 hover:text-white transition-colors flex items-center gap-2"
        >
          ← Back
        </button>
      </div>

      {/* Project Header */}
      <section className="px-4 md:px-8 py-12 max-w-5xl mx-auto">
        <div className="mb-8">
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

        {/* Project Images */}
        {project.images && project.images.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
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
        )}
      </section>

      {/* Project Info */}
      <section className="px-4 md:px-8 py-12 max-w-5xl mx-auto border-t border-slate-700">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-2 text-slate-300">Created</h3>
            <p className="text-slate-400">
              {new Date(project.createdAt).toLocaleDateString()}
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2 text-slate-300">Last Updated</h3>
            <p className="text-slate-400">
              {new Date(project.updatedAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ProjectDetail;
