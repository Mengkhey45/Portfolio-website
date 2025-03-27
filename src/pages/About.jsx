import React from 'react';
import profile from '../assets/img/profile.jpg';
import lord from '../assets/img/blacklord.jpg';
import python from '../assets/img/python.png';
import django from '../assets/img/django.png';
import flutter from '../assets/img/flutter.png';
import dart from '../assets/img/dart.png';
import typescript from '../assets/img/typescript.png';

const About = () => {
  return (
    <section
      className="relative h-auto lg:h-screen flex items-center justify-center"
      style={{ backgroundImage: `url(${lord})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      {/* Dark Overlay Covering Entire Screen */}
      <div className="fixed top-0 left-0 w-full h-full bg-black/70 z-0"></div>

      {/* Content with Clear Image, Skills, and Text */}
      <div className="animate-fade-down  relative z-10 mt-30 mb-20 lg:mt-40 lg:ring-2 md:p-10 rounded-2xl backdrop-blur-xs flex flex-col items-center lg:flex-row gap-8 lg:items-center text-white">
        
        {/* Profile Image & Skills Section */}
        <div className="flex flex-col items-center">
          <img className="size-70 rounded-lg shadow-lg" src={profile} alt="Profile" />
          
          {/* Skills Section */}
          <article className="bg-black ring-2 p-4 mt-6 rounded-sm shadow-lg">
            <h3 className="text-white font-bold text-lg mb-3 text-start">My Skills</h3>
            <div className="grid grid-cols-6 items-center gap-2">
              <i className='bx bxl-html5 text-2xl text-orange-600 transition-transform duration-300 hover:-translate-y-1'></i>
              <i className='bx bxl-css3 text-2xl text-blue-600 transition-transform duration-300 hover:-translate-y-1'></i>
              <i className='bx bxl-javascript text-2xl text-yellow-400 transition-transform duration-300 hover:-translate-y-1'></i>
              <i className="fa-brands fa-react text-2xl text-sky-400 transition-transform duration-300 hover:-translate-y-1"></i>
              <img className='size-6 transition-transform duration-300 hover:-translate-y-1' src="https://img.icons8.com/?size=100&id=CIAZz2CYc6Kc&format=png&color=000000" alt="Vue.js" />
              <img className='size-6 transition-transform duration-300 hover:-translate-y-1' src={python} alt="Python" />
              <img className='size-5 transition-transform duration-300 hover:-translate-y-1' src={django} alt="Django" />
              <img className='size-5 transition-transform duration-300 hover:-translate-y-1' src={flutter} alt="Flutter" />
              <img className='size-5 transition-transform duration-300 hover:-translate-y-1' src={dart} alt="Dart" />
              <img className='size-8 transition-transform duration-300 hover:-translate-y-1' src={typescript} alt="TypeScript" />
            </div>
          </article>
        </div>

        {/* About Me Section */}
        <div className="flex flex-col text-center lg:text-left max-w-lg xl:max-w-2xl">
          <h1 className="text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-purple-600 to-purple-900">About Me</h1>
          <p className="text-gray-300 text-lg text-start lg:text-start mx-10 lg:mx-0">
            I am currently a second years software engineering student at Kirirom Institute of Technology, where I have been developing my technical skills and gaining hands-on experience in web development, cybersecurity, cloud computing, and AI integration. Studying at KIT has been both rewarding and challenging, as the curriculum is rigorous, requiring me to balance multiple projects, research tasks, and technical assignments.

            Throughout my academic journey, I have faced challenges such as tight deadlines, complex programming concepts, and the need to constantly improve my English communication skills for presentations and discussions. However, these challenges have pushed me to become a more resilient, self-motivated, and adaptive learner. I have also improved my problem-solving abilities by tackling various software development projects, debugging complex code, and collaborating with teams on innovative solutions.
          </p>
        </div>

      </div>
    </section>
  );
};

export default About;
