import React from 'react';
import { Bot, LinkedIn, GitHub, YouTube } from './Icons';
import { Link } from './Link';
import { Button } from './Button';

export const Footer: React.FC = () => {
  const clubLinks = [
    { name: 'About', path: '/about' },
    { name: 'Members', path: '/members' },
    { name: 'News', path: '/news' },
    { name: 'Gallery', path: '/gallery' },
  ];
  
  const engageLinks = [
    { name: 'Projects', path: '/projects' },
    { name: 'Events', path: '/events' },
    { name: 'Learn', path: '/learn' },
    { name: 'Community', path: '/community' },
    { name: 'Leaderboard', path: '/leaderboard' },
  ];

  const supportLinks = [
    { name: 'Contact', path: '/contact' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Partner With Us', path: '/partner' },
    { name: 'Join Us', path: '/join' },
  ];

  const socialLinks = [
    { name: 'LinkedIn', icon: <LinkedIn className="w-6 h-6" />, path: '#' },
    { name: 'GitHub', icon: <GitHub className="w-6 h-6" />, path: '#' },
    { name: 'YouTube', icon: <YouTube className="w-6 h-6" />, path: '#' },
  ]

  return (
    <footer className="relative bg-gray-900 dark:bg-black text-gray-400 mt-20 overflow-hidden border-t-2 border-hcl-blue/20">
      <div className="absolute inset-0 bg-grid-gray-700/[0.1] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-[60%] -translate-y-1/2 rounded-full bg-hcl-blue/10 dark:bg-hcl-blue/20 blur-3xl" aria-hidden="true"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        
        {/* Top section: Brand and Newsletter */}
        <div className="grid md:grid-cols-2 gap-10 mb-12 border-b border-gray-700/50 pb-12">
          {/* Left: Brand Info */}
          <div>
            <div className="flex items-center mb-4">
              <Bot className="h-10 w-10 text-hcl-blue" />
              <span className="font-space-grotesk font-bold text-2xl ml-3 text-white">
                AI Club HCLTech
              </span>
            </div>
            <p className="max-w-md">
              A community of innovators, learners, and builders passionate about shaping the future with artificial intelligence.
            </p>
            <div className="flex space-x-4 mt-6">
              {socialLinks.map(link => (
                 <a 
                    key={link.name} 
                    href={link.path} 
                    className="p-3 bg-gray-800/50 rounded-full hover:bg-hcl-blue/20 hover:text-hcl-blue transition-all duration-300" 
                    aria-label={link.name}
                >
                    {link.icon}
                </a>
              ))}
            </div>
          </div>
          {/* Right: Newsletter */}
          <div>
            <h4 className="font-space-grotesk font-bold text-lg text-white mb-3">Stay Updated</h4>
            <p className="mb-4">Subscribe to our newsletter for the latest news, events, and project updates.</p>
            <form className="flex flex-col sm:flex-row gap-2">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-grow w-full px-4 py-3 rounded-xl border border-gray-600 bg-gray-800/50 focus:outline-none focus:ring-2 focus:ring-hcl-blue transition text-white placeholder-gray-500"
                required
              />
              <Button type="submit" className="flex-shrink-0">Subscribe</Button>
            </form>
          </div>
        </div>

        {/* Bottom section: Link columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
              <h4 className="font-space-grotesk font-bold text-lg text-white mb-4">Club</h4>
              <ul className="space-y-3">
                  {clubLinks.map(link => (
                      <li key={link.name}>
                          <Link to={link.path} className="hover:text-hcl-blue transition-colors duration-300">{link.name}</Link>
                      </li>
                  ))}
              </ul>
          </div>
          <div>
              <h4 className="font-space-grotesk font-bold text-lg text-white mb-4">Engage</h4>
              <ul className="space-y-3">
                  {engageLinks.map(link => (
                      <li key={link.name}>
                          <Link to={link.path} className="hover:text-hcl-blue transition-colors duration-300">{link.name}</Link>
                      </li>
                  ))}
              </ul>
          </div>
          <div>
              <h4 className="font-space-grotesk font-bold text-lg text-white mb-4">Support</h4>
              <ul className="space-y-3">
                  {supportLinks.map(link => (
                      <li key={link.name}>
                          <Link to={link.path} className="hover:text-hcl-blue transition-colors duration-300">{link.name}</Link>
                      </li>
                  ))}
              </ul>
          </div>
          <div>
            <h4 className="font-space-grotesk font-bold text-lg text-white mb-4">Contact</h4>
            <p>HCLTech, Madurai, Tamil Nadu</p>
            <a href="mailto:aiclub.madurai@hcltech.com" className="hover:text-hcl-blue transition-colors duration-300 break-all">aiclub.madurai@hcltech.com</a>
          </div>
        </div>
      </div>

      {/* Copyright bar */}
      <div className="border-t border-gray-700/50 py-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm">
            <p>© {new Date().getFullYear()} AI Club – HCLTech Madurai. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};