import React from 'react';
import { useNavigate } from 'react-router-dom';
import profile from '../assets/img/profile.jpg';


const Home = () => {
  const navigate = useNavigate();
  return (
    <section className="h-screen bg-black flex items-center justify-center">
    
      <div className="mt-125 md:mt-100 lg:mt-20  flex absolute flex-col xl:gap-15 lg:flex-row items-center gap-10 text-center lg:text-left bg-opacity-50 p-10 rounded-lg">
        <div className='fade-in-left lg:h-120 xl:h-127 backdrop-blur-md flex items-center ring-3 text-white'>
          <img className="size-70 md:size-90 lg:size-100 2xl:size-120" src={profile} alt="profile" />
        </div>
        
        <div className="fade-in-right text-white lg:ml-5 max-w-xl xl:max-w-3xl backdrop-blur-md ring-3 p-10">
          <h1 className="text-5xl font-bold lg:text-6xl lg:leading-18 mb-4 2xl:leading-22 leading-13 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-pink-500 to-purple-600">
            Hello, welcome to my portfolio
          </h1>
          <p className="mb-6 text-left lg:text-xl 2xl:text-2xl leading-8 xl:leading-10 text-lg">
          I am a passionate web and app developer with a strong background in cybersecurity, AI integration, and machine learning. I specialize in building secure, efficient, and user-friendly digital solutions. Whether it's crafting dynamic websites, developing powerful applications, or enhancing security with AI-driven technologies, I thrive on creating innovative and impactful solutions. Explore my work and discover how my expertise can bring value to your projects!
          </p>
          <div className="flex justify-center lg:justify-start gap-3 overflow-hidden">
            <button 
              className="hover:cursor-pointer from-indigo-400 p-1 via-pink-400 to-purple-500 bg-gradient-to-r"
              onClick={() => navigate('/projects')}
            >
              <span className='px-8 py-3 bg-white/50 text-black font-semibold text-lg hover:bg-transparent hover:text-white transition'>
                PROJECTS
              </span>
            </button>
            <button 
              className="from-indigo-400 px-1 py-3 via-pink-400 to-purple-500 bg-gradient-to-r hover:cursor-pointer"
              onClick={() => navigate('/Contact')}
            >
              <span className='px-8 py-3 bg-white/50 text-black font-semibold text-lg hover:bg-transparent hover:text-white transition'>
                HIRE ME
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
