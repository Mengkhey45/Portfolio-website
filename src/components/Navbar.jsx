import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/img/logo.png";

const Navbar = () => {
  const [active, setActive] = useState("Home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Projects", href: "/projects" },
    { name: "Services", href: "/services" },
    { name: "Contact", href: "/contact" },
  ];

  const handleClick = (name) => {
    setActive(name);
    setIsMenuOpen(false); // Close menu after clicking a link
  };

  return (
    <header className="fixed flex items-center justify-center w-full px-6 h-20 z-50 bg-white/30 backdrop-blur-xs shadow-md">
      <nav className="h-10 w-full  flex justify-between xl:max-w-[1320px] rounded-full items-center px-6 lg:pr-16 bg-linear-to-r from-blue-500 via-cyan-500 to-teal-500">
        {/* Logo Section */}
        <Link to="/" className="flex items-center" onClick={() => handleClick("Home")}>
          <img className="w-15 h-17 md:w-17 md:h-19 lg:size-20" src={logo} alt="logo" />
          <h1 className="hidden lg:flex text-lg px-4 py-[2px] bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-400 text-white font-bold">
            Khorn Mengkhey
          </h1>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex items-center text-center font-bold space-x-10 text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-pink-500 to-purple-600">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.href}
                className={`hover:text-gray-600 transition-all ${
                  active === item.name ? "text-black font-bold" : ""
                }`}
                onClick={() => handleClick(item.name)}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-black text-3xl focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <i className="bx bx-x"></i> : <i className="bx bx-menu"></i>}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <ul className="lg:hidden absolute top-20 left-0 w-full backdrop-blur-xl bg-black/50 shadow-md flex flex-col items-center transition-all duration-300">
          {navItems.map((item) => (
            <li key={item.name} className="w-full text-center">
              <Link
                to={item.href}
                className="block w-full py-3 text-white text-lg font-semibold hover:bg-linear-to-r from-blue-500 via-cyan-500 to-teal-500"
                onClick={() => handleClick(item.name)}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
};

export default Navbar;
