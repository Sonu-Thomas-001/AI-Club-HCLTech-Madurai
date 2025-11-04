import React, { useState, useEffect, useContext } from 'react';
import { Bot, Sun, Moon, ChevronDown } from './Icons';
import { ThemeContext } from '../contexts/ThemeContext';
import { Link } from './Link';
import { Button } from './Button';
import { AnimatePresence, motion } from 'framer-motion';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <button onClick={toggleTheme} className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 transition-colors">
      {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
    </button>
  );
};

type NavLinkItem = {
  name: string;
  path?: string;
  children?: { name: string; path: string }[];
};

export const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openMobileSubMenu, setOpenMobileSubMenu] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const navLinks: NavLinkItem[] = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Projects', path: '/projects' },
    { name: 'Events', path: '/events' },
    { name: 'Learn', path: '/learn' },
    { name: 'Members', path: '/members' },
    { 
      name: 'Pages', 
      children: [
        { name: 'Gallery', path: '/gallery' },
        { name: 'Community', path: '/community' },
        { name: 'News', path: '/news' },
      ]
    },
    { name: 'Contact', path: '/contact' },
  ];

  const toggleMobileSubMenu = (name: string) => {
    setOpenMobileSubMenu(openMobileSubMenu === name ? null : name);
  };

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-md' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center">
            <Bot className="h-8 w-8 text-hcl-blue" />
            <span className="font-space-grotesk font-bold text-xl ml-2 text-primary-text dark:text-white">
              AI Club HCLTech
            </span>
          </Link>
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              link.children ? (
                <div key={link.name} className="relative group">
                  <button className="flex items-center font-medium text-secondary-text dark:text-gray-300 hover:text-hcl-blue dark:hover:text-hcl-blue transition-colors duration-300">
                    {link.name}
                    <ChevronDown className="w-4 h-4 ml-1 transition-transform duration-300 group-hover:rotate-180" />
                  </button>
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-2 w-48 border border-gray-200 dark:border-gray-700">
                      {link.children.map((child) => (
                        <Link
                          key={child.name}
                          to={child.path}
                          className="block px-4 py-2 text-sm text-secondary-text dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md hover:text-hcl-blue"
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={link.name}
                  to={link.path!}
                  className="font-medium text-secondary-text dark:text-gray-300 hover:text-hcl-blue dark:hover:text-hcl-blue transition-colors duration-300"
                >
                  {link.name}
                </Link>
              )
            ))}
          </nav>
          <div className="hidden lg:flex items-center space-x-4">
            <ThemeToggle />
            <Link to="/join">
              <Button>Join Us</Button>
            </Link>
          </div>
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-secondary-text dark:text-gray-300 hover:text-hcl-blue focus:outline-none"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16m-7 6h7'} />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white dark:bg-gray-800 overflow-hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                link.children ? (
                  <div key={link.name}>
                    <button onClick={() => toggleMobileSubMenu(link.name)} className="w-full flex justify-between items-center px-3 py-2 rounded-md text-base font-medium text-secondary-text dark:text-gray-300 hover:text-white hover:bg-hcl-teal">
                      <span>{link.name}</span>
                      <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${openMobileSubMenu === link.name ? 'rotate-180' : ''}`} />
                    </button>
                    <AnimatePresence>
                      {openMobileSubMenu === link.name && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="pl-4 mt-1 space-y-1 overflow-hidden"
                        >
                          {link.children.map(child => (
                            <Link
                              key={child.name}
                              to={child.path}
                              onClick={() => setIsOpen(false)}
                              className="block px-3 py-2 rounded-md text-base font-medium text-secondary-text dark:text-gray-300 hover:text-white hover:bg-hcl-teal/50"
                            >
                              {child.name}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    key={link.name}
                    to={link.path!}
                    onClick={() => setIsOpen(false)}
                    className="block px-3 py-2 rounded-md text-base font-medium text-secondary-text dark:text-gray-300 hover:text-white hover:bg-hcl-teal"
                  >
                    {link.name}
                  </Link>
                )
              ))}
               <div className="border-t border-gray-200 dark:border-gray-700 my-4"></div>
               <div className="px-3 py-2 flex items-center justify-between">
                  <Link to="/join" onClick={() => setIsOpen(false)}>
                    <Button>Join Us</Button>
                  </Link>
                  <ThemeToggle />
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};