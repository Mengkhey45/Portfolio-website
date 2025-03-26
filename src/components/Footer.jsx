import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import lord from '../assets/img/blacklord.jpg';

const Footer = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_111k4dd', 'template_blyfgtl', form.current, 'HRfEZK-q4371GEnYU')
      .then((result) => {
          console.log(result.text);
          alert("Message sent successfully!");
      }, (error) => {
          console.log(error.text);
          alert("Failed to send message.");
      });
  };

  return (
    <footer id="footer" className="flex justify-center items-center h-screen relative bg-cover bg-center" style={{ backgroundImage: `url(${lord})` }}>
      <div className="absolute inset-0 bg-black/65  z-0"></div>
      <div className="flex z-30 relative flex-col gap-5 text-white w-full animate-fade-down">
        <h1 className="text-5xl md:mb-3 lg:text-5xl self-center font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-blue-300 to-indigo-400">
          Contact Me
        </h1>

        {/* Contact Form */}
        <form ref={form} onSubmit={sendEmail} className="flex justify-center mb-10 flex-col self-center md:w-130 md:px-8 lg:w-200 lg:rounded-lg lg:p-10 md:h-120 h-100 w-90 gap-3 backdrop-blur-md bg-white/20 p-5 lg:px-15 shadow-lg">
          <input className="p-2 rounded outline-none" type="text" name="first_name" placeholder="First Name" required />
          <input className="p-2 rounded outline-none" type="text" name="last_name" placeholder="Last Name" required />
          <input className="p-2 rounded outline-none" type="email" name="email" placeholder="Email" required />
          <input className="p-2 rounded outline-none" type="password" name="password" placeholder="Password" required />
          <input className="p-2 rounded outline-none no-spinner" type="number" name="phone" placeholder="Phone Number" required />
          <textarea className="p-2 bg-black/40 max-h-40 min-h-10 rounded outline-none" name="message" cols="30" rows="5" placeholder="Message" required></textarea>
          <button type="submit" className="bg-gradient-to-r hover:cusor-pointer text-lg font-semibold from-cyan-400 via-blue-300 to-indigo-500 md:mt-2 text-white py-2 px-4 w-40 self-center rounded transition">
            Send
          </button>
        </form>
      </div>

      {/* Social Media Links and Copyright */}
      <div className="absolute bottom-0 z-30 py-6 w-full border-t-[1px] border-white/10 backdrop-blur-lg lg:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-400 flex flex-col lg:flex-row-reverse items-center justify-around gap-3">
        <div className="flex justify-between items-center w-full max-w-60 bg-gradient-to-r bg-clip-text from-cyan-200 via-blue-300 to-indigo-400">
          <a className=" transition-transform duration-300 hover:-translate-y-1" href="https://web.facebook.com/profile.php?id=100094491694329">
            <i className="bx bxl-facebook hover:text-white text-transparent text-2xl"></i>
          </a>
          <a className=" transition-transform duration-300 hover:-translate-y-1" href="https://www.instagram.com/khornmengkhey/profilecard/?igsh=am44MGl3OWtxeGkwttps://www.instagram.com/">
            <i className="bx bxl-instagram hover:text-white text-transparent text-2xl"></i>
          </a>
          <a className="transition-transform duration-300 hover:-translate-y-1" href="https://x.com/mengkhey45?s=21">
            <i className="bx bxl-twitter hover:text-white text-transparent text-2xl"></i>
          </a>
          <a className=" transition-transform duration-300 hover:-translate-y-1" href="https://github.com/Mengkhey45">
            <i className="bx bxl-github hover:text-white text-transparent text-2xl"></i>
          </a>
          <a className=" transition-transform duration-300 hover:-translate-y-1" href="https://web.telegram.org/k/">
            <i class='bx bxl-telegram hover:text-white text-transparent text-2xl'></i>
          </a>
        </div>
        <span className="text-white text-md text-center">
          &#169; Phone Number : 011 359 292
        </span>
      </div>
    </footer>
  );
};

export default Footer;
