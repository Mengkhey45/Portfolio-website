import React from 'react';
import { motion } from 'framer-motion';
import lord from '../assets/img/blacklord.jpg';
import project1 from '../assets/img/project1.png';
import project2 from '../assets/img/project2.png';
import project3 from '../assets/img/project3.png';
import project4 from '../assets/img/project4.png';
import project5 from '../assets/img/project5.png';
import project6 from '../assets/img/project6.png';
import project7 from '../assets/img/project7.png';
import project8 from '../assets/img/project8.png';

const projects = [
  { title: "Travel website", description: "Explore your desired destination through this Travel website!", img: project1, link: "https://mengkhey45.github.io/Travel-website/", technologies: [{ icon: "bxl-html5", color: "text-orange-600" }, { icon: "bxl-css3", color: "text-blue-600" }, { icon: "bxl-javascript", color: "text-yellow-400" }, { icon: "bxl-react", color: "text-sky-400" }] },
  { title: "Project 2", description: "Description of project 2", img: project2, link: "https://example.com/project2", technologies: [{ icon: "bxl-python", color: "text-blue-400" }, { icon: "bxl-django", color: "text-green-600" }, { icon: "bxl-html5", color: "text-orange-600" }, { icon: "bxl-css3", color: "text-blue-600" }, { icon: "bxl-javascript", color: "text-yellow-400" }, { icon: "bxl-react", color: "text-sky-400" }] },
  { title: "Project 3", description: "Description of project 3", img: project3, link: "https://example.com/project3", technologies: [{ icon: "bxl-java", color: "text-red-600" }, { icon: "bxl-spring-boot", color: "text-green-500" }] },
  { title: "Project 4", description: "Description of project 4", img: project4, link: "https://example.com/project4", technologies: [{ icon: "bxl-java", color: "text-red-600" }, { icon: "bxl-spring-boot", color: "text-green-500" }] },
  { title: "Project 5", description: "Description of project 5", img: project5, link: "https://example.com/project5", technologies: [{ icon: "bxl-java", color: "text-red-600" }, { icon: "bxl-spring-boot", color: "text-green-500" }] },
  { title: "Project 6", description: "Description of project 6", img: project6, link: "https://example.com/project6", technologies: [{ icon: "bxl-java", color: "text-red-600" }, { icon: "bxl-spring-boot", color: "text-green-500" }] },
  { title: "Project 7", description: "Description of project 7", img: project7, link: "https://example.com/project7", technologies: [{ icon: "bxl-java", color: "text-red-600" }, { icon: "bxl-spring-boot", color: "text-green-500" }] },
  { title: "Project 8", description: "Description of project 8", img: project8, link: "https://example.com/project8", technologies: [{ icon: "bxl-java", color: "text-red-600" }, { icon: "bxl-spring-boot", color: "text-green-500" }] },
];

const Project = () => {
  return (
    <div className="flex justify-center bg-black items-center h-auto relative">
      <section className="flex z-20 my-20 lg:mt-30 flex-col items-center gap-10 p-5 w-full">
        <div className='px-16 animate-fade-down md:text-left'>
          <h1 className="text-center mb-5 text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-purple-400 to-purple-800">
            My Projects
          </h1>
          <p className='text-white/80 leading-7 lg:text-lg max-w-80 md:max-w-168 xl:max-w-255'>
            As a software engineering student, I’ve worked on projects in web development, App development, and cybersecurity. Key projects include the Slogos Project, Travel Website, a Python-learning game, and research on cybersecurity and emerging technologies. These experiences enhance my problem-solving, technical skills, and ability to create impactful solutions.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-y-8 md:gap-x-5 xl:gap-y-10">
          {projects.map((project, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: -40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.5 }} // Staggered animation
              className="flex flex-col w-80 bg-gradient-to-r from-zinc-800 via-stone-800 to-zinc-800 p-5 rounded-lg shadow-lg"
            >
              <img className="w-full h-50 lg:h-60 object-cover" src={project.img} alt={project.title} />
              <div className="mt-3">
                <h3 className="text-lg font-semibold text-white">{project.title}</h3>
                <p className="text-white/80">{project.description}</p>

                {/* Technologies Used */}
                <div className="grid grid-cols-8 gap-2  mt-2">
                  {project.technologies.map((tech, idx) => (
                    <i key={idx} className={`bx ${tech.icon} text-2xl ${tech.color} transition-transform duration-300 hover:-translate-y-1`}></i>
                  ))}
                </div>

                {/* View Project Link */}
                <p className="mt-3 flex items-center gap-2 cursor-pointer hover:text-white/80 text-white">
                  <a href={project.link} target="_blank" rel="noopener noreferrer">
                    <i className="bx bx-link-alt"></i> View project
                  </a>
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Project;
