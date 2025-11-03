import React from 'react';
import { Bot, LinkedIn, GitHub, YouTube } from './Icons';
import { Link } from './Link';

export const Footer: React.FC = () => {
  const quickLinks = [
    { name: 'About', path: '/about' },
    { name: 'Projects', path: '/projects' },
    { name: 'Events', path: '/events' },
    { name: 'Learn', path: '/learn' },
    { name: 'Contact', path: '/contact' },
    { name: 'FAQ', path: '/faq' },
  ];

  const socialLinks = [
    { name: 'LinkedIn', icon: <LinkedIn />, path: '#' },
    { name: 'GitHub', icon: <GitHub />, path: '#' },
    { name: 'YouTube', icon: <YouTube />, path: '#' },
  ]

  return (
    <footer className="glass-card border-t-2 border-hcl-blue/30 relative mt-20">
       <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-transparent via-hcl-blue to-transparent animate-pulse"></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center md:items-start">
              <div className="flex items-center">
                <Bot className="h-8 w-8 text-hcl-blue" />
                <span className="font-space-grotesk font-bold text-xl ml-2">
                  AI Club – HCLTech Madurai
                </span>
              </div>
              <p className="text-gray-500 dark:text-gray-400 mt-4 text-center md:text-left text-sm">
                Supercharging Progress through AI at HCLTech Madurai
              </p>
               <div className="flex space-x-4 mt-6">
                {socialLinks.map(link => (
                   <a key={link.name} href={link.path} className="text-gray-500 dark:text-gray-400 hover:text-hcl-blue" aria-label={link.name}>{link.icon}</a>
                ))}
              </div>
            </div>
            <div className="md:col-span-2 grid grid-cols-2 md:grid-cols-3 gap-8 text-center md:text-left">
              <div>
                  <h4 className="font-space-grotesk font-bold text-lg mb-4">Quick Links</h4>
                  <ul className="space-y-2">
                      {quickLinks.map(link => (
                          <li key={link.name}>
                              <Link to={link.path} className="text-gray-500 dark:text-gray-400 hover:text-hcl-blue">{link.name}</Link>
                          </li>
                      ))}
                  </ul>
              </div>
               <div>
                  <h4 className="font-space-grotesk font-bold text-lg mb-4">Get Involved</h4>
                  <ul className="space-y-2">
                      <li><Link to="/join" className="text-gray-500 dark:text-gray-400 hover:text-hcl-blue">Join the Club</Link></li>
                      <li><Link to="/contact" className="text-gray-500 dark:text-gray-400 hover:text-hcl-blue">Partner With Us</Link></li>
                  </ul>
              </div>
               <div>
                  <h4 className="font-space-grotesk font-bold text-lg mb-4">Contact</h4>
                  <p className="text-gray-500 dark:text-gray-400">HCLTech, Madurai</p>
                  <a href="mailto:aiclub.madurai@hcltech.com" className="text-gray-500 dark:text-gray-400 hover:text-hcl-blue">aiclub.madurai@hcltech.com</a>
              </div>
            </div>
        </div>
        <div className="mt-12 border-t border-gray-200 dark:border-gray-700 pt-8 text-center text-sm text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} AI Club – HCLTech Madurai. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
