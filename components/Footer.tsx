
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
    { name: 'LinkedIn', icon: <LinkedIn className="w-5 h-5" />, path: '#' },
    { name: 'GitHub', icon: <GitHub className="w-5 h-5" />, path: '#' },
    { name: 'YouTube', icon: <YouTube className="w-5 h-5" />, path: '#' },
  ]

  return (
    <footer className="relative bg-black text-gray-400 overflow-hidden pt-24 pb-12 border-t border-white/10">
      {/* Giant Watermark */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full flex justify-center items-center pointer-events-none select-none overflow-hidden">
          <h1 className="text-[20vw] font-bold text-white/[0.03] whitespace-nowrap font-space-grotesk tracking-tighter">
              AI CLUB
          </h1>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          
          {/* Brand Column */}
          <div className="md:col-span-4 flex flex-col items-start">
             <Link to="/" className="flex items-center mb-6 group">
                <div className="p-2 bg-white/5 rounded-lg border border-white/10 group-hover:border-hcl-blue/50 transition-colors">
                   <Bot className="h-8 w-8 text-hcl-blue" />
                </div>
                <span className="font-space-grotesk font-bold text-2xl ml-3 text-white tracking-tight">
                  AI Club HCLTech
                </span>
              </Link>
              <p className="text-gray-500 mb-8 leading-relaxed">
                  Empowering the next generation of innovators through Artificial Intelligence, collaboration, and continuous learning.
              </p>
              <div className="flex gap-4">
                  {socialLinks.map(link => (
                      <a 
                        key={link.name} 
                        href={link.path} 
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 hover:bg-hcl-blue hover:border-hcl-blue hover:text-white transition-all duration-300"
                        aria-label={link.name}
                      >
                          {link.icon}
                      </a>
                  ))}
              </div>
          </div>

          {/* Links Columns */}
          <div className="md:col-span-2 md:col-start-6">
              <h4 className="font-space-grotesk font-bold text-white mb-6">Club</h4>
              <ul className="space-y-4">
                  {clubLinks.map(link => (
                      <li key={link.name}>
                          <Link to={link.path} className="hover:text-hcl-blue transition-colors duration-300 text-sm">{link.name}</Link>
                      </li>
                  ))}
              </ul>
          </div>
          <div className="md:col-span-2">
              <h4 className="font-space-grotesk font-bold text-white mb-6">Engage</h4>
              <ul className="space-y-4">
                  {engageLinks.map(link => (
                      <li key={link.name}>
                          <Link to={link.path} className="hover:text-hcl-blue transition-colors duration-300 text-sm">{link.name}</Link>
                      </li>
                  ))}
              </ul>
          </div>
          <div className="md:col-span-2">
              <h4 className="font-space-grotesk font-bold text-white mb-6">Support</h4>
              <ul className="space-y-4">
                  {supportLinks.map(link => (
                      <li key={link.name}>
                          <Link to={link.path} className="hover:text-hcl-blue transition-colors duration-300 text-sm">{link.name}</Link>
                      </li>
                  ))}
              </ul>
          </div>
        </div>
        
        {/* Newsletter & Copyright */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-sm text-gray-600">© {new Date().getFullYear()} AI Club HCLTech Madurai. All rights reserved.</p>
            
            <div className="flex items-center gap-2 bg-white/5 p-1 pl-4 rounded-full border border-white/10 max-w-xs w-full">
                 <input 
                    type="email" 
                    placeholder="Subscribe to newsletter" 
                    className="bg-transparent border-none outline-none text-sm text-white placeholder-gray-600 w-full"
                 />
                 <button className="w-8 h-8 rounded-full bg-hcl-blue flex items-center justify-center text-white hover:bg-hcl-teal transition-colors">
                    <span className="text-lg leading-none pb-1">&rarr;</span>
                 </button>
            </div>
        </div>
      </div>
    </footer>
  );
};
