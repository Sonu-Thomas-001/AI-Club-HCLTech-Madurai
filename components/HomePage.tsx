import React, { useRef, useState } from 'react';
import { Button } from './Button';
import { Card } from './Card';
import { Link } from './Link';
import { AnimatedSection } from './AnimatedSection';
import { Bot, BrainCircuit, Code, Users, Award, Calendar, Lightbulb, ChartBar, Robot, Cloud, Settings } from './Icons';
import { CountUpStat } from './CountUpStat';
import { TeamMemberCard } from './TeamMemberCard';
import { ScrollingTestimonials } from './ScrollingTestimonials';
import { motion, useScroll, useTransform } from 'framer-motion';

const teamMembers = [
    { name: 'Aravind Kumar', role: 'Club Lead', imageUrl: 'https://placehold.co/128x128/e0e0e0/333333?text=AK', linkedinUrl: '#' },
    { name: 'Priya Rajesh', role: 'Research Head', imageUrl: 'https://placehold.co/128x128/e0e0e0/333333?text=PR', linkedinUrl: '#' },
    { name: 'Karthik R', role: 'Technical Coordinator', imageUrl: 'https://placehold.co/128x128/e0e0e0/333333?text=KR', linkedinUrl: '#' },
    { name: 'Nivetha M', role: 'Creative Lead', imageUrl: 'https://placehold.co/128x128/e0e0e0/333333?text=NM', linkedinUrl: '#' },
];

const focusAreas = [
    { name: 'Artificial Intelligence', icon: <BrainCircuit className="w-full h-full" />, description: 'Exploring neural networks, deep learning, and generative models to build intelligent systems.' },
    { name: 'Data Science', icon: <ChartBar className="w-full h-full" />, description: 'Turning raw data into actionable insights through statistical analysis and visualization.' },
    { name: 'Robotics', icon: <Robot className="w-full h-full" />, description: 'Integrating AI with hardware to create autonomous systems and intelligent machines.' },
    { name: 'Cloud Computing', icon: <Cloud className="w-full h-full" />, description: 'Leveraging scalable cloud platforms for deploying and managing AI-powered applications.' },
    { name: 'Automation', icon: <Settings className="w-full h-full" />, description: 'Developing solutions to automate complex tasks and streamline business processes.' },
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
const allMarqueeWords = [...marqueeWords, ...marqueeWords];

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

const FocusAreaCard: React.FC<{ area: typeof focusAreas[0] }> = ({ area }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [glowPosition, setGlowPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    setRotate({
      x: yPct * -14, // Max rotation
      y: xPct * 14,
    });
    setGlowPosition({ x: mouseX, y: mouseY });
  };

  const handleMouseEnter = () => setIsHovered(true);

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotate({ x: 0, y: 0 });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
        transition: 'transform 0.1s ease-out',
        transformStyle: 'preserve-3d',
      }}
      className="group relative p-6 text-center glass-card rounded-3xl transition-all duration-300 overflow-hidden border-2 border-transparent hover:border-hcl-blue/30"
    >
      <div
        className="absolute -inset-px rounded-3xl transition-opacity duration-500"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(600px at ${glowPosition.x}px ${glowPosition.y}px, rgba(41, 171, 226, 0.15), transparent 80%)`,
        }}
      />
      
      <div className="relative z-10 flex flex-col items-center h-full">
        <div 
          className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-hcl-blue/10 dark:bg-hcl-blue/20 group-hover:bg-hcl-blue/20 transition-colors duration-300" 
          style={{ transform: 'translateZ(40px)' }}
        >
          <div className="h-10 w-10 text-hcl-blue animate-[pulse_4s_cubic-bezier(0.4,0,0.6,1)_infinite] group-hover:scale-110 transition-transform duration-300" style={{ transform: 'translateZ(20px)' }}>
            {area.icon}
          </div>
        </div>
        <h3 
          className="font-space-grotesk text-xl font-bold text-primary-text dark:text-white mb-2" 
          style={{ transform: 'translateZ(30px)' }}
        >
          {area.name}
        </h3>
        <p 
          className="text-sm text-gray-500 dark:text-gray-400 flex-grow"
          style={{ transform: 'translateZ(20px)' }}
        >
          {area.description}
        </p>
      </div>
    </div>
  );
};


export const HomePage: React.FC = () => {
  return (
    <div className="space-y-20 md:space-y-32">
        {/* Hero Section */}
        <div className="relative pt-20 pb-24 text-center">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-white to-teal-100 dark:from-gray-900 dark:via-gray-800 dark:to-hcl-teal/20"></div>
            <div className="absolute inset-0 bg-grid-gray-200/[0.2] dark:bg-grid-gray-700/[0.2] [mask-image:linear-gradient(to_bottom,white,transparent,white)]"></div>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
                <AnimatedSection>
                    <Parallax speed={-0.3}>
                      <Bot className="w-20 h-20 text-hcl-blue mx-auto mb-6 animate-float" />
                    </Parallax>
                    <Parallax speed={-0.15}>
                      <h1 className="font-space-grotesk text-4xl md:text-7xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-br from-hcl-blue via-tech-purple to-hcl-teal pb-4">
                          Supercharging Progress Through AI
                      </h1>
                    </Parallax>
                    <Parallax speed={0.05}>
                      <p className="text-gray-600 dark:text-gray-300 text-lg md:text-xl max-w-3xl mx-auto mt-4 leading-relaxed">
                          Welcome to the AI Club at HCLTech Madurai—a community of innovators, learners, and builders passionate about shaping the future with artificial intelligence.
                      </p>
                    </Parallax>
                    <Parallax speed={0.1}>
                      <div className="mt-10 flex justify-center items-center gap-4">
                          <Link to="/join"><Button>Join the Club</Button></Link>
                          <Link to="/projects"><Button variant="outline">View Projects</Button></Link>
                      </div>
                    </Parallax>
                </AnimatedSection>
            </div>
        </div>

        {/* Stats Section */}
        <AnimatedSection className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Parallax speed={0.1}>
            <div className="glass-card grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 p-6 md:p-8 rounded-2xl max-w-4xl mx-auto divide-x divide-gray-200/50 dark:divide-gray-700/50">
                <CountUpStat value={100} label="Members" />
                <CountUpStat value={15} label="Projects" />
                <CountUpStat value={25} label="Workshops" />
                <CountUpStat value={5} label="Hackathons" />
            </div>
          </Parallax>
        </AnimatedSection>
        
        {/* About the Club Section */}
        <AnimatedSection className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
                <Parallax speed={0.15} className="text-center md:text-left">
                    <h2 className="font-space-grotesk text-3xl sm:text-4xl font-semibold text-primary-text dark:text-white mb-4">
                        About the Club
                    </h2>
                    <p className="font-space-grotesk text-xl text-hcl-teal mb-6">
                        “Driven by Curiosity. United by Code.”
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-8 max-w-lg mx-auto md:mx-0">
                        Our mission is to cultivate a dynamic environment for AI enthusiasts at HCLTech Madurai. We aim to empower members by providing resources for learning, fostering collaboration on innovative projects, and connecting them with a network of peers and experts. Our vision is to be the central hub for AI excellence, driving technological growth and creative problem-solving within our community.
                    </p>
                    <Link to="/about">
                        <Button variant="outline">Learn More About Us</Button>
                    </Link>
                </Parallax>
                <Parallax speed={-0.1}>
                  <div className="grid grid-cols-2 grid-rows-2 gap-4 h-80 lg:h-96">
                      <div className="col-span-1 row-span-2 overflow-hidden rounded-2xl shadow-lg group">
                          <img src="https://placehold.co/400x600/008080/FFFFFF?text=Workshop" alt="AI workshop" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"/>
                      </div>
                      <div className="col-span-1 row-span-1 overflow-hidden rounded-2xl shadow-lg group">
                          <img src="https://placehold.co/400x300/29ABE2/FFFFFF?text=Teamwork" alt="Team collaboration" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"/>
                      </div>
                      <div className="col-span-1 row-span-1 overflow-hidden rounded-2xl shadow-lg group">
                          <img src="https://placehold.co/400x300/5F1EBE/FFFFFF?text=Innovation" alt="Innovation idea" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"/>
                      </div>
                  </div>
                </Parallax>
            </div>
        </AnimatedSection>

        {/* Our Focus Areas Section */}
        <AnimatedSection className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Parallax speed={0.1}>
            <div className="text-center mb-12">
                <h2 className="font-space-grotesk text-3xl sm:text-4xl font-semibold text-primary-text dark:text-white">Our Focus Areas</h2>
                <p className="font-space-grotesk text-xl text-hcl-teal mt-2">
                    “Innovate. Create. Collaborate.”
                </p>
            </div>
          </Parallax>
          <Parallax speed={-0.05}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
                {focusAreas.map(area => (
                    <FocusAreaCard key={area.name} area={area} />
                ))}
            </div>
          </Parallax>
        </AnimatedSection>

        {/* Marquee Section */}
        <div className="py-12 bg-gray-50 dark:bg-gray-800/50 my-20 md:my-32">
            <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]">
                <motion.div
                    className="flex items-center whitespace-nowrap"
                    initial={{ x: '0%' }}
                    animate={{ x: '-50%' }}
                    transition={{ ease: 'linear', duration: 40, repeat: Infinity }}
                >
                    {allMarqueeWords.map((word, index) => (
                        <div key={index} className="flex items-center">
                            <span className="mx-8 font-space-grotesk text-4xl md:text-5xl font-bold tracking-wider uppercase bg-clip-text text-transparent bg-gradient-to-br from-hcl-blue via-tech-purple to-hcl-teal">
                                {word}
                            </span>
                            <span className="text-4xl md:text-5xl text-gray-300 dark:text-gray-600">•</span>
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>

        {/* What We Do Section */}
        <AnimatedSection className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Parallax speed={0.1}>
            <div className="text-center mb-12">
                <h2 className="font-space-grotesk text-3xl sm:text-4xl font-semibold text-primary-text dark:text-white">What We Do</h2>
                <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto mt-4">We focus on three core pillars to foster AI innovation and growth.</p>
            </div>
          </Parallax>
          <Parallax speed={-0.05}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Card icon={<Lightbulb className="w-10 h-10 text-hcl-blue"/>} title="Learn & Upskill" description="We organize workshops, tech talks, and study groups on cutting-edge AI topics, from deep learning to generative AI." />
                <Card icon={<Code className="w-10 h-10 text-hcl-blue"/>} title="Build & Innovate" description="Members collaborate on real-world projects, building prototypes that solve business challenges and push technological boundaries." />
                <Card icon={<Users className="w-10 h-10 text-hcl-blue"/>} title="Connect & Collaborate" description="We provide a platform for networking with peers, mentors, and experts, fostering a vibrant and supportive AI community." />
            </div>
          </Parallax>
        </AnimatedSection>

        {/* Featured Projects Section */}
        <AnimatedSection className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Parallax speed={0.1}>
              <div className="text-center mb-12">
                  <h2 className="font-space-grotesk text-3xl sm:text-4xl font-semibold text-primary-text dark:text-white">Featured Projects</h2>
                  <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto mt-4">A glimpse into the innovative solutions being built by our members.</p>
              </div>
            </Parallax>
            <Parallax speed={-0.05}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <Card icon={<BrainCircuit className="w-10 h-10 text-hcl-blue"/>} title="NeuroLens" description="An AI-powered document summarizer that converts long reports into precise insights." />
                  <Card icon={<Bot className="w-10 h-10 text-hcl-blue"/>} title="SmartBot" description="A custom conversational AI assistant that integrates with internal tools to automate queries." />
                  <Card icon={<Award className="w-10 h-10 text-hcl-blue"/>} title="Visionary" description="A computer vision prototype for quality inspection, detecting surface defects in manufacturing." />
              </div>
            </Parallax>
            <Parallax speed={0.1}>
              <div className="text-center mt-12">
                  <Link to="/projects"><Button>Explore All Projects</Button></Link>
              </div>
            </Parallax>
        </AnimatedSection>

        {/* Meet the Team Section */}
        <AnimatedSection className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Parallax speed={0.1}>
              <div className="text-center mb-12">
                  <h2 className="font-space-grotesk text-3xl sm:text-4xl font-semibold text-primary-text dark:text-white">Meet the Leadership</h2>
                   <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto mt-4">The core team driving the club's vision and activities.</p>
              </div>
            </Parallax>
            <Parallax speed={-0.05}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                  {teamMembers.map(member => <TeamMemberCard key={member.name} member={member} />)}
              </div>
            </Parallax>
        </AnimatedSection>

        {/* Testimonials */}
        <AnimatedSection>
            <Parallax speed={0.1}>
              <div className="text-center mb-12">
                  <h2 className="font-space-grotesk text-3xl sm:text-4xl font-semibold text-primary-text dark:text-white">What Our Members Say</h2>
              </div>
            </Parallax>
            <ScrollingTestimonials />
        </AnimatedSection>

        {/* Join Us CTA */}
        <AnimatedSection className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Parallax speed={0.1}>
              <div className="relative glass-card p-10 md:p-16 rounded-3xl overflow-hidden text-center">
                  <div className="absolute inset-0 bg-gradient-to-br from-hcl-blue/10 to-hcl-teal/10 dark:from-hcl-blue/20 dark:to-hcl-teal/20"></div>
                  <div className="relative z-10">
                      <h2 className="font-space-grotesk text-3xl sm:text-4xl font-semibold text-primary-text dark:text-white">Ready to Shape the Future?</h2>
                      <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto mt-4 mb-8">Join a community of innovators and start your journey in AI today. Whether you're a beginner or an expert, there's a place for you here.</p>
                      <Link to="/join"><Button>Become a Member</Button></Link>
                  </div>
              </div>
            </Parallax>
        </AnimatedSection>
        
        {/* Our Partners Section */}
        <AnimatedSection>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <Parallax speed={0.1}>
                  <h2 className="font-space-grotesk text-3xl sm:text-4xl font-semibold text-primary-text dark:text-white mb-4">Our Esteemed Partners</h2>
                  <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto mb-12">
                      We are proud to collaborate with industry leaders to foster innovation and provide opportunities for our members.
                  </p>
                </Parallax>
                <Parallax speed={-0.1}>
                  <div className="w-full inline-block overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]">
                      <motion.div
                          className="flex items-center"
                          initial={{ x: '0%' }}
                          animate={{ x: '-50%' }}
                          transition={{ ease: 'linear', duration: 40, repeat: Infinity }}
                      >
                          {allPartners.map((partner, index) => (
                              <a
                                  key={index}
                                  href={partner.websiteUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex-shrink-0 mx-10"
                                  title={partner.name}
                              >
                                  <img
                                      src={partner.logoUrl}
                                      alt={`${partner.name} logo`}
                                      className="h-16 w-auto object-contain filter grayscale hover:grayscale-0 opacity-60 hover:opacity-100 dark:opacity-40 dark:hover:opacity-100 transition-all duration-300 ease-in-out"
                                  />
                              </a>
                          ))}
                      </motion.div>
                  </div>
                </Parallax>
            </div>
        </AnimatedSection>
    </div>
  );
};