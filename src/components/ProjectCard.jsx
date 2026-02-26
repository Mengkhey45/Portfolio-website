import React from 'react';

const ProjectCard = ({ project }) => {
  return (
    <div className="group bg-slate-800 rounded-lg overflow-hidden hover:shadow-xl hover:shadow-blue-500/20 transition-all duration-300 hover:scale-105">
      {/* Thumbnail */}
      {project.thumbnail && (
        <div className="h-48 overflow-hidden bg-slate-700">
          <img
            src={project.thumbnail}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        </div>
      )}

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-bold text-white mb-2 line-clamp-2">
          {project.title}
        </h3>
        <p className="text-slate-300 text-sm mb-4 line-clamp-3">
          {project.shortDescription || project.description}
        </p>

        {/* Tags */}
        {project.tags && project.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-slate-700 text-slate-200 text-xs rounded"
              >
                {tag}
              </span>
            ))}
            {project.tags.length > 3 && (
              <span className="px-2 py-1 bg-slate-700 text-slate-200 text-xs rounded">
                +{project.tags.length - 3}
              </span>
            )}
          </div>
        )}

        {/* View Button */}
        <button className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors text-sm font-medium">
          View Project →
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;
