import React from 'react';
import { motion } from 'framer-motion';
import web from '../assets/img/website.png';
import design from '../assets/img/web-design.png';
import cyber from '../assets/img/internet.png';
import app from '../assets/img/mobile-development.png';
import marketing from '../assets/img/digital-marketing.png';

const services = [
  { image: web, title: "Web Development", description: "Creating modern and responsive websites." },
  { image: app, title: "App Development", description: "Building mobile and web applications." },
  { image: cyber, title: "Cyber Security", description: "Protecting your systems from digital threats." },
  { image: design, title: "Graphic Design", description: "Designing eye-catching visuals for brands." },
  { image: marketing, title: "Digital Marketing", description: "Boosting online presence and brand awareness." },
];

const Services = () => {
  return (
    <section className='flex relative justify-center items-center min-h-screen'>
      <div className='flex relative flex-col items-center p-5 my-25 lg:mt-30 z-20 w-full h-full'>
        <motion.h1 
          initial={{ opacity: 0, y: -50 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8 }}
          className='text-center text-5xl lg:text-5xl font-bold mb-10 text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-purple-400 to-purple-800'
        >
          My Services
        </motion.h1>
        
        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8 px-4'>
          {services.map((service, index) => (
            <motion.article 
              key={index} 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className='ring-2 text-white/30 flex flex-col items-center justify-center bg-gradient-to-r from-zinc-800 via-stone-600 to-zinc-900 text-center w-80 h-80 p-5 rounded-lg shadow-lg'
            >
              <div className='w-18 h-18 bg-gray-300 drop-shadow-lg ring-2 text-amber-600 flex items-center justify-center rounded-full mb-5'>
                <img src={service.image} alt={service.title} className='w-13 h-13'/>
              </div>
              <h1 className="text-xl font-semibold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-purple-400 to-purple-800">{service.title}</h1>
              <p className="text-white text-lg">{service.description}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
