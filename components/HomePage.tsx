
import React, { useRef, useState, useEffect } from 'react';
import { Button } from './Button';
import { Card } from './Card';
import { Link } from './Link';
import { AnimatedSection } from './AnimatedSection';
import { Bot, BrainCircuit, Code, Users, Award, Lightbulb, ChartBar, Robot, Cloud, Settings } from './Icons';
import { CountUpStat } from './CountUpStat';
import { TeamMemberCard } from './TeamMemberCard';
import { ScrollingTestimonials } from './ScrollingTestimonials';
import { HeroBackground } from './HeroBackground';
import { Typewriter } from './Typewriter';
import { motion, useScroll, useTransform } from 'framer-motion';
// @ts-ignore
import Papa from 'papaparse';

const focusAreas = [
    { name: 'Artificial Intelligence', icon: <BrainCircuit className="w-full h-full" />, description: 'Exploring neural networks, deep learning, and generative models to build intelligent systems.', span: 'md:col-span-2 md:row-span-2' },
    { name: 'Data Science', icon: <ChartBar className="w-full h-full" />, description: 'Turning raw data into actionable insights through statistical analysis.', span: 'md:col-span-1 md:row-span-1' },
    { name: 'Robotics', icon: <Robot className="w-full h-full" />, description: 'Integrating AI with hardware for autonomous systems.', span: 'md:col-span-1 md:row-span-2' },
    { name: 'Cloud Computing', icon: <Cloud className="w-full h-full" />, description: 'Scalable platforms for deploying AI applications.', span: 'md:col-span-1 md:row-span-1' },
    { name: 'Automation', icon: <Settings className="w-full h-full" />, description: 'Automating complex tasks to streamline business processes.', span: 'md:col-span-2 md:row-span-1' },
];

const partners = [
    { name: 'Google', logoUrl: 'https://placehold.co/200x100/fafafa/333333?text=Google', websiteUrl: '#' },
    { name: 'NVIDIA', logoUrl: 'https://placehold.co/200x100/fafafa/333333?text=NVIDIA', websiteUrl: '#' },
    { name: 'Microsoft', logoUrl: 'https://placehold.co/200x100/fafafa/333333?text=Microsoft', websiteUrl: '#' },
    { name: 'AWS', logoUrl: 'https://placehold.co/200x100/fafafa/333333?text=AWS', websiteUrl: '#' },
    { name: 'Hugging Face', logoUrl: 'https://placehold.co/200x100/fafafa/333333?text=Hugging+Face', websiteUrl: '#' },
    { name: 'OpenAI', logoUrl: 'https://placehold.co/200x100/fafafa/333333?text=OpenAI', websiteUrl: '#' },
];
const allPartners = [...partners, ...partners];

const marqueeWords = [
  'Innovation', 'Intelligence', 'Creativity', 'Automation', 'Technology',
  'Future', 'Learning', 'Collaboration', 'Discovery', 'Evolution'
];
// Quadruple the array to ensure smooth infinite scrolling on wide screens
const allMarqueeWords = [...marqueeWords, ...marqueeWords, ...marqueeWords, ...marqueeWords];

const Parallax: React.FC<{ children: React.ReactNode; speed: number; className?: string }> = ({ children, speed, className }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [`${speed * -80}px`, `${speed * 80}px`]);

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
};

const BentoCard: React.FC<{ area: typeof focusAreas[0]; index: number }> = ({ area, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1, type: 'spring', stiffness: 100 }}
      className={`group relative overflow-hidden rounded-[2rem] p-8 transition-all duration-500 ${area.span} bg-white dark:bg-[#111] border border-gray-200 dark:border-white/5 hover:border-hcl-blue/50 dark:hover:border-hcl-blue/50 shadow-sm hover:shadow-2xl hover:shadow-hcl-blue/10`}
    >
       {/* Hover Gradient Overlay */}
       <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-hcl-blue/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
       
       {/* Technical Corner Accents (HUD Style) */}
       <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
            <div className="absolute top-6 right-6 w-2 h-2 border-t-2 border-r-2 border-gray-300 dark:border-gray-700 group-hover:border-hcl-blue group-hover:w-6 group-hover:h-6 transition-all duration-300 ease-out" />
            <div className="absolute bottom-6 left-6 w-2 h-2 border-b-2 border-l-2 border-gray-300 dark:border-gray-700 group-hover:border-hcl-blue group-hover:w-6 group-hover:h-6 transition-all duration-300 ease-out" />
       </div>

       <div className="relative z-10 h-full flex flex-col justify-between">
          {/* Icon Container */}
          <div className="w-14 h-14 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 flex items-center justify-center text-hcl-blue group-hover:scale-110 group-hover:bg-hcl-blue group-hover:text-white transition-all duration-500 shadow-sm">
             {React.cloneElement(area.icon as React.ReactElement<{ className?: string }>, { className: "w-7 h-7" })}
          </div>
          
          <div className="mt-8">
             <h3 className="font-space-grotesk text-2xl font-bold text-primary-text dark:text-white mb-3 group-hover:text-hcl-blue transition-colors duration-300">
               {area.name}
             </h3>
             <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed line-clamp-3 group-hover:text-gray-900 dark:group-hover:text-gray-200 transition-colors duration-300">
               {area.description}
             </p>
          </div>
          
          {/* Decorative ID Number */}
          <div className="absolute top-6 right-10 text-[10px] font-mono text-gray-300 dark:text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-x-2 group-hover:translate-x-0">
             SYS_0{index + 1}
          </div>
       </div>
    </motion.div>
  );
}

interface CoreMember {
    name: string;
    role: string;
    imageUrl: string;
    linkedinUrl: string;
}

export const HomePage: React.FC = () => {
  const [coreTeam, setCoreTeam] = useState<CoreMember[]>([]);

  useEffect(() => {
    const fetchCoreTeam = async () => {
      try {
        const response = await fetch('/core_team.csv', { cache: 'no-cache' });
        if (!response.ok) throw new Error('Failed to fetch core team data');
        
        const csvText = await response.text();
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (results: { data: any[] }) => {
            const members = results.data.map((row: any) => ({
              name: row.Name,
              role: row.Role,
              imageUrl: row.ImageUrl,
              linkedinUrl: row.LinkedinUrl
            }));
            setCoreTeam(members);
          },
          error: (err: any) => {
             console.error("Error parsing core team CSV:", err);
          }
        });
      } catch (error) {
        console.error("Error loading core team:", error);
      }
    };

    fetchCoreTeam();
  }, []);

  return (
    <div className="overflow-hidden">
        {/* Immersive Hero Section */}
        <div className="relative min-h-screen flex items-center justify-center pt-20 pb-40 overflow-hidden">
             {/* Dynamic Backgrounds */}
            <div className="absolute inset-0 bg-gradient-to-b from-gray-50 via-white to-blue-50 dark:from-black dark:via-[#0a0a0a] dark:to-[#111827] z-0"></div>
            <div className="absolute inset-0 bg-grid-pattern bg-[length:30px_30px] opacity-50 z-0"></div>
            <HeroBackground />
            
            {/* Glowing Orbs */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-hcl-blue/20 rounded-full blur-[128px] animate-pulse-slow z-0"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-tech-purple/20 rounded-full blur-[128px] animate-pulse-slow animation-delay-2000 z-0"></div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                <AnimatedSection>
                    <div className="inline-flex items-center justify-center p-1 mb-8 rounded-full bg-white/40 dark:bg-gray-800/40 backdrop-blur-md border border-white/20 dark:border-white/10 shadow-sm">
                       <span className="px-4 py-1 text-sm font-medium text-hcl-blue tracking-wide uppercase">
                         Innovate • Build • Inspire
                       </span>
                    </div>

                    <h1 className="font-space-grotesk text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-primary-text dark:text-white mb-6 leading-tight">
                        Building the <br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-hcl-blue via-tech-purple to-hcl-teal">
                          <Typewriter words={['Future', 'Intelligence', 'Next Gen']} />
                        </span>
                        <span className="text-hcl-blue">.</span>
                    </h1>
                    
                    <p className="text-gray-600 dark:text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
                        The official AI Club at HCLTech Madurai. We are a collective of dreamers and doers harnessing the power of Artificial Intelligence.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link to="/join">
                           <button className="px-8 py-4 bg-primary-text dark:bg-white text-white dark:text-black font-bold rounded-full hover:scale-105 transition-transform shadow-lg shadow-hcl-blue/20">
                             Start Building
                           </button>
                        </Link>
                        <Link to="/projects">
                            <button className="px-8 py-4 bg-transparent border border-gray-300 dark:border-gray-700 text-primary-text dark:text-white font-bold rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                              View Projects
                            </button>
                        </Link>
                    </div>
                </AnimatedSection>
            </div>
        </div>

        {/* Floating Stats HUD */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-20">
           <Parallax speed={0.05}>
              <div className="glass-panel rounded-3xl p-8 border-t border-white/50 dark:border-white/10 shadow-2xl">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-gray-200/50 dark:divide-gray-800/50">
                      <CountUpStat value={100} label="Active Members" />
                      <CountUpStat value={15} label="Shipped Projects" />
                      <CountUpStat value={25} label="Workshops Held" />
                      <CountUpStat value={5} label="Hackathons" />
                  </div>
              </div>
           </Parallax>
        </div>
        
        {/* Re-Designed Focus Areas (Futuristic HUD Style) */}
        <div className="py-32 bg-gray-50 dark:bg-[#050505] relative overflow-hidden">
             {/* Cyber Grid Background */}
             <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] opacity-30 pointer-events-none"></div>
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-hcl-blue/5 rounded-full blur-3xl pointer-events-none"></div>
             
             <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <AnimatedSection>
                  <div className="mb-20 text-center max-w-3xl mx-auto">
                      <h2 className="font-space-grotesk text-4xl md:text-6xl font-bold mb-6 dark:text-white tracking-tight">Our Focus Areas</h2>
                      <p className="text-lg text-gray-600 dark:text-gray-400">
                          We dive deep into the technologies shaping tomorrow. Our core pillars of research and development include:
                      </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-[minmax(240px,auto)]">
                      {focusAreas.map((area, index) => (
                          <BentoCard key={area.name} area={area} index={index} />
                      ))}
                  </div>
                </AnimatedSection>
             </div>
        </div>

        {/* Modern Marquee Section */}
        <section className="relative py-12 overflow-hidden z-20 bg-gray-50 dark:bg-[#050505]">
            {/* Background Strip with Blur */}
            <div className="absolute inset-0 bg-hcl-blue/5 dark:bg-hcl-blue/5 -skew-y-1 transform origin-left scale-110 blur-3xl pointer-events-none"></div>

            {/* Glass Container */}
            <div className="relative border-y border-gray-200/50 dark:border-white/5 bg-white/30 dark:bg-black/20 backdrop-blur-md">
                {/* Fade Masks for Smooth Entry/Exit */}
                <div className="absolute left-0 top-0 bottom-0 w-24 md:w-48 z-10 bg-gradient-to-r from-gray-50 dark:from-[#050505] to-transparent pointer-events-none"></div>
                <div className="absolute right-0 top-0 bottom-0 w-24 md:w-48 z-10 bg-gradient-to-l from-gray-50 dark:from-[#050505] to-transparent pointer-events-none"></div>

                <motion.div
                    className="flex items-center py-6 whitespace-nowrap"
                    initial={{ x: 0 }}
                    animate={{ x: "-25%" }} // Animate less distance because the list is quadrupled
                    transition={{
                        repeat: Infinity,
                        ease: "linear",
                        duration: 40, // Smooth, slow speed
                    }}
                >
                    {allMarqueeWords.map((word, index) => (
                        <div key={index} className="flex items-center gap-8 mx-6 group cursor-default select-none">
                             {/* Tech Separator */}
                            <span className="text-hcl-blue/30 text-xl group-hover:text-hcl-blue group-hover:rotate-90 transition-all duration-500">
                                ✦
                            </span>
                            {/* Text with refined styling */}
                            <span className="font-space-grotesk font-bold text-3xl md:text-5xl uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-gray-400 to-gray-600 dark:from-gray-500 dark:to-gray-700 group-hover:from-hcl-blue group-hover:to-hcl-teal transition-all duration-500">
                                {word}
                            </span>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>

        {/* What We Do Section (Classic Layout Refined) */}
        <div className="py-24 md:py-32 bg-gray-50 dark:bg-[#0f0f0f]">
          <AnimatedSection className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row gap-16 items-start">
               <div className="md:w-1/3 sticky top-24">
                  <h2 className="font-space-grotesk text-4xl md:text-5xl font-bold text-primary-text dark:text-white mb-6">
                    Three Pillars of<br/> <span className="text-hcl-blue">Excellence</span>
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed mb-8">
                    Our community thrives on a cycle of learning, building, and connecting. Each pillar supports the next, creating a robust ecosystem for growth.
                  </p>
                  <Link to="/about"><Button variant="outline">Read Our Manifesto</Button></Link>
               </div>
               <div className="md:w-2/3 grid gap-8">
                  <Card icon={<Lightbulb className="w-8 h-8 text-hcl-blue"/>} title="Learn & Upskill" description="We organize workshops, tech talks, and study groups on cutting-edge AI topics, from deep learning to generative AI." />
                  <Card icon={<Code className="w-8 h-8 text-hcl-blue"/>} title="Build & Innovate" description="Members collaborate on real-world projects, building prototypes that solve business challenges and push technological boundaries." />
                  <Card icon={<Users className="w-8 h-8 text-hcl-blue"/>} title="Connect & Collaborate" description="We provide a platform for networking with peers, mentors, and experts, fostering a vibrant and supportive AI community." />
               </div>
            </div>
          </AnimatedSection>
        </div>

        {/* Featured Projects Section */}
        <div className="py-24 md:py-32 relative">
             {/* Abstract background shapes */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-hcl-blue/5 to-transparent pointer-events-none"></div>

            <AnimatedSection className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="flex justify-between items-end mb-12">
                  <div>
                      <h2 className="font-space-grotesk text-4xl md:text-5xl font-bold text-primary-text dark:text-white">Featured Projects</h2>
                  </div>
                  <Link to="/projects" className="hidden md:block text-hcl-blue hover:text-hcl-teal font-semibold transition-colors">View All &rarr;</Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="group relative rounded-2xl overflow-hidden h-80 md:h-96 cursor-pointer shadow-xl">
                      <img src="https://placehold.co/600x800/29ABE2/FFFFFF?text=NeuroLens" alt="NeuroLens" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
                      <div className="absolute bottom-0 left-0 p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                          <div className="text-hcl-blue text-sm font-bold mb-2">Machine Learning</div>
                          <h3 className="text-white text-2xl font-bold mb-2">NeuroLens</h3>
                          <p className="text-gray-300 text-sm line-clamp-2">An AI-powered document summarizer that converts long reports into precise insights.</p>
                      </div>
                  </div>
                  
                  <div className="group relative rounded-2xl overflow-hidden h-80 md:h-96 cursor-pointer shadow-xl md:-mt-8">
                      <img src="https://placehold.co/600x800/008080/FFFFFF?text=SmartBot" alt="SmartBot" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
                      <div className="absolute bottom-0 left-0 p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                          <div className="text-hcl-teal text-sm font-bold mb-2">Generative AI</div>
                          <h3 className="text-white text-2xl font-bold mb-2">SmartBot</h3>
                          <p className="text-gray-300 text-sm line-clamp-2">A custom conversational AI assistant that integrates with internal tools.</p>
                      </div>
                  </div>

                  <div className="group relative rounded-2xl overflow-hidden h-80 md:h-96 cursor-pointer shadow-xl">
                      <img src="https://placehold.co/600x800/5F1EBE/FFFFFF?text=Visionary" alt="Visionary" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
                      <div className="absolute bottom-0 left-0 p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                          <div className="text-tech-purple text-sm font-bold mb-2">Computer Vision</div>
                          <h3 className="text-white text-2xl font-bold mb-2">Visionary</h3>
                          <p className="text-gray-300 text-sm line-clamp-2">A computer vision prototype for quality inspection and defect detection.</p>
                      </div>
                  </div>
              </div>
              
              <div className="mt-8 text-center md:hidden">
                  <Link to="/projects"><Button>View All Projects</Button></Link>
              </div>
            </AnimatedSection>
        </div>

        {/* Leadership Section */}
        <div className="py-24 bg-gray-50 dark:bg-[#0f0f0f]">
           <AnimatedSection className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                  <h2 className="font-space-grotesk text-4xl font-bold dark:text-white">Meet the Core</h2>
                  <p className="text-gray-500 mt-4">The minds orchestrating the movement.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                  {coreTeam.map(member => <TeamMemberCard key={member.name} member={member} />)}
                  {coreTeam.length === 0 && (
                    <div className="col-span-full text-center text-gray-500">
                       <p>Loading core team...</p>
                    </div>
                  )}
              </div>
           </AnimatedSection>
        </div>

        {/* Testimonials */}
        <div className="py-24 overflow-hidden">
            <AnimatedSection>
              <div className="text-center mb-12">
                  <h2 className="font-space-grotesk text-4xl font-bold dark:text-white">Voices of the Community</h2>
              </div>
              <ScrollingTestimonials />
            </AnimatedSection>
        </div>

        {/* CTA */}
        <div className="py-24 container mx-auto px-4 sm:px-6 lg:px-8">
            <Parallax speed={0.1}>
              <div className="relative rounded-[2.5rem] overflow-hidden p-12 md:p-24 text-center">
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black z-0"></div>
                  <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] z-0"></div>
                  {/* Abstract gradient blobs */}
                  <div className="absolute top-0 left-0 w-64 h-64 bg-hcl-blue/40 blur-[80px]"></div>
                  <div className="absolute bottom-0 right-0 w-64 h-64 bg-tech-purple/40 blur-[80px]"></div>
                  
                  <div className="relative z-10">
                      <h2 className="font-space-grotesk text-4xl md:text-6xl font-bold text-white mb-6">Ready to shape the future?</h2>
                      <p className="text-gray-300 text-xl max-w-2xl mx-auto mb-10">Join a community of innovators. Access resources, mentorship, and the platform you need to build what's next.</p>
                      <div className="flex flex-col sm:flex-row gap-4 justify-center">
                         <Link to="/join"><button className="px-8 py-4 bg-hcl-blue text-white font-bold rounded-full hover:bg-hcl-teal transition-colors shadow-lg shadow-hcl-blue/30">Become a Member</button></Link>
                         <Link to="/contact"><button className="px-8 py-4 bg-transparent border border-white/30 text-white font-bold rounded-full hover:bg-white/10 transition-colors">Partner With Us</button></Link>
                      </div>
                  </div>
              </div>
            </Parallax>
        </div>
        
        {/* Partners */}
        <div className="py-12 border-t border-gray-200 dark:border-gray-800">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                 <div className="text-center mb-10">
                    <h2 className="font-space-grotesk text-3xl font-bold dark:text-white mb-3">Our Esteemed Partners</h2>
                    <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        We are proud to collaborate with industry leaders to foster innovation and provide opportunities for our members.
                    </p>
                 </div>
                 <div className="w-full inline-block overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
                      <motion.div
                          className="flex items-center"
                          initial={{ x: '0%' }}
                          animate={{ x: '-50%' }}
                          transition={{ ease: 'linear', duration: 20, repeat: Infinity }}
                      >
                          {allPartners.map((partner, index) => (
                              <a
                                  key={index}
                                  href={partner.websiteUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex-shrink-0 mx-12 opacity-40 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0"
                              >
                                  <img
                                      src={partner.logoUrl}
                                      alt={`${partner.name} logo`}
                                      className="h-12 w-auto object-contain"
                                  />
                              </a>
                          ))}
                      </motion.div>
                  </div>
            </div>
        </div>
    </div>
  );
};
