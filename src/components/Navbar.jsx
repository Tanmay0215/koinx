import React from 'react';
import logo from '../assets/logo.png';
import { MenuIcon, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  const { theme, toggleTheme } = useTheme(); // Get toggleTheme function
  return (
    <div className={`px-4 md:px-8 py-3 flex justify-between items-center shadow-md ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
      <div><img src={logo} alt="logo image" className='h-8' /></div>

      <div className="flex items-center">
        <button
          onClick={toggleTheme}
          className={`p-2 rounded-full ${theme == "dark" ? 'hover:bg-gray-600' : 'hover:bg-gray-200'} transition-colors mr-2 md:mr-4`}
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        <div className='md:hidden'><MenuIcon /></div>
      </div>
    </div>
  );
};

export default Navbar;
