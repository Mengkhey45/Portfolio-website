import React from 'react';
import { Link } from 'react-router-dom';
import { useProjects } from '../context/ProjectsContext';
import ProjectCard from '../components/ProjectCard';

const PublicHome = () => {
  const { projects, loading } = useProjects();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl">Loading projects...</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Hero Section */}
      <section className="px-4 md:px-8 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            My Portfolio
          </h1>
          <p className="text-lg md:text-xl text-slate-300 mb-8">
            Showcasing my best work and creative projects
          </p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="px-4 md:px-8 py-12 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center">Featured Projects</h2>
        
        {projects.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-slate-300 text-lg">No projects yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <Link
                key={project.id}
                to={`/project/${project.id}`}
                className="group"
              >
                <ProjectCard project={project} />
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Footer CTA */}
      <section className="px-4 md:px-8 py-20 text-center border-t border-slate-700">
        <p className="text-slate-400">
          Interested in working together? Let's talk!
        </p>
      </section>
    </main>
  );
};

export default PublicHome;
