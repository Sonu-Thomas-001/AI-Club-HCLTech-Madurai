
import React from 'react';
import { Bot, LinkedIn, GitHub, YouTube, Send, ArrowUp, MapPin, Mail } from './Icons';
import { Link } from './Link';
import { Button } from './Button';

export const Footer: React.FC = () => {
  const clubLinks = [
    { name: 'About Protocol', path: '/about' },
    { name: 'Members Directory', path: '/members' },
    { name: 'Transmission Log', path: '/news' }, // News
    { name: 'Visual Database', path: '/gallery' }, // Gallery
  ];
  
  const engageLinks = [
    { name: 'Projects', path: '/projects' },
    { name: 'Hackathons & Events', path: '/events' },
    { name: 'Learning Hub', path: '/learn' },
    { name: 'Community Grid', path: '/community' },
    { name: 'Leaderboard', path: '/leaderboard' },
  ];

  const socialLinks = [
    { name: 'LinkedIn', icon: <LinkedIn className="w-5 h-5" />, path: '#' },
    { name: 'GitHub', icon: <GitHub className="w-5 h-5" />, path: '#' },
    { name: 'YouTube', icon: <YouTube className="w-5 h-5" />, path: '#' },
  ]

  return (
    <footer className="relative bg-[#020202] pt-24 pb-8 overflow-hidden border-t border-white/5">
       {/* Futuristic Top Border Glow */}
       <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[1px] bg-gradient-to-r from-transparent via-hcl-blue/50 to-transparent shadow-[0_0_30px_rgba(41,171,226,0.6)]"></div>
       
       {/* Ambient Background Glow */}
       <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-hcl-blue/5 blur-[120px] rounded-full pointer-events-none"></div>
       <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-tech-purple/5 blur-[120px] rounded-full pointer-events-none"></div>

       <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
             {/* Brand Column */}
             <div className="lg:col-span-5 space-y-8">
                <Link to="/" className="inline-flex items-center gap-3 group">
                   <div className="p-3 bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl group-hover:border-hcl-blue/50 transition-all duration-300 shadow-lg group-hover:shadow-hcl-blue/20">
                      <Bot className="w-8 h-8 text-hcl-blue group-hover:scale-110 transition-transform duration-300" />
                   </div>
                   <div className="flex flex-col">
                       <span className="text-2xl font-bold font-space-grotesk tracking-tight text-white leading-none">AI CLUB</span>
                       <span className="text-sm font-space-grotesk text-gray-500 tracking-widest">HCLTECH MADURAI</span>
                   </div>
                </Link>
                
                <p className="text-gray-400 leading-relaxed max-w-md text-lg font-light">
                   Architecting the intelligence of tomorrow. We are a collective of innovators bridging the gap between human creativity and artificial intelligence.
                </p>
                
                <div className="flex gap-4 pt-2">
                  {socialLinks.map((link) => (
                      <a 
                        key={link.name} 
                        href={link.path}
                        className="w-12 h-12 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-gray-400 hover:bg-hcl-blue hover:border-hcl-blue hover:text-white hover:scale-110 transition-all duration-300 shadow-lg shadow-black/50"
                        aria-label={link.name}
                      >
                          {link.icon}
                      </a>
                  ))}
                </div>
             </div>

             {/* Navigation Links */}
             <div className="lg:col-span-2 lg:col-start-7">
                <h4 className="font-space-grotesk font-bold text-white text-lg mb-6 flex items-center gap-2">
                    <span className="w-2 h-2 bg-hcl-blue rounded-full"></span> 
                    Club
                </h4>
                <ul className="space-y-4">
                    {clubLinks.map(link => (
                        <li key={link.name}>
                            <Link to={link.path} className="text-gray-500 hover:text-hcl-blue hover:translate-x-1 transition-all duration-300 text-sm block">
                                {link.name}
                            </Link>
                        </li>
                    ))}
                </ul>
             </div>

             <div className="lg:col-span-2">
                <h4 className="font-space-grotesk font-bold text-white text-lg mb-6 flex items-center gap-2">
                    <span className="w-2 h-2 bg-tech-purple rounded-full"></span>
                    Explore
                </h4>
                <ul className="space-y-4">
                    {engageLinks.map(link => (
                        <li key={link.name}>
                            <Link to={link.path} className="text-gray-500 hover:text-tech-purple hover:translate-x-1 transition-all duration-300 text-sm block">
                                {link.name}
                            </Link>
                        </li>
                    ))}
                </ul>
             </div>

             {/* Newsletter */}
             <div className="lg:col-span-2">
                <h4 className="font-space-grotesk font-bold text-white text-lg mb-6">Join the Signal</h4>
                <div className="relative group">
                   <div className="absolute -inset-0.5 bg-gradient-to-r from-hcl-blue to-tech-purple rounded-xl blur opacity-20 group-hover:opacity-60 transition duration-500"></div>
                   <div className="relative bg-gray-900 rounded-xl p-1.5 flex items-center border border-gray-800 group-focus-within:border-gray-700">
                      <input 
                        type="email" 
                        placeholder="Enter email..." 
                        className="bg-transparent border-none focus:outline-none text-white placeholder-gray-600 px-3 w-full text-sm py-2" 
                      />
                      <button className="p-2 bg-white/5 hover:bg-hcl-blue rounded-lg text-white transition-colors">
                         <Send className="w-4 h-4" />
                      </button>
                   </div>
                </div>
                <p className="text-xs text-gray-600 mt-4">
                    Subscribe for high-priority updates, hackathon alerts, and breakthroughs.
                </p>
             </div>
          </div>

          {/* Footer Divider */}
          <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent my-8"></div>

          {/* Bottom Bar */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-gray-600">
             <p>&copy; {new Date().getFullYear()} AI Club HCLTech Madurai. All systems nominal.</p>
             
             <div className="flex flex-wrap justify-center items-center gap-6 md:gap-8">
                <Link to="/contact" className="hover:text-white transition-colors">Contact Protocol</Link>
                <Link to="/faq" className="hover:text-white transition-colors">FAQ</Link>
                
                {/* System Status Indicator */}
                <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-900 rounded-full border border-gray-800 shadow-inner">
                   <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                   </span>
                   <span className="text-[10px] font-mono text-gray-400 tracking-wider">SYSTEM ONLINE</span>
                </div>
             </div>
          </div>
       </div>
    </footer>
  );
};
