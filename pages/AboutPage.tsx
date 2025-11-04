import React from 'react';
import { PageHeader } from '../components/PageHeader';
import { Bot, Python, Tensorflow, Pytorch, Firebase, OpenAI, HuggingFace, Building, Target, Eye, Lightbulb, Users, BrainCircuit, Shield } from '../components/Icons';
import { Card } from '../components/Card';
// FIX: Import Variants type from framer-motion to resolve type error.
import { motion, Variants } from 'framer-motion';

const timelineEvents = [
  { year: '2023', title: 'Club Inception', description: 'A small group of AI enthusiasts at HCLTech Madurai founded the club to create a space for innovation.' },
  { year: '2024', title: 'First Hackathon', description: 'Hosted our first-ever AI Hackathon, "InnovateAI," attracting over 50 participants.' },
  { year: '2024', title: 'Community Growth', description: 'Reached a milestone of 100+ active members from various departments.' },
  { year: '2025', title: 'Launch of NeuroLens', description: 'Our flagship project, NeuroLens, was deployed internally for document summarization.' },
];

const coreValues = [
    { title: 'Curiosity', description: 'We question, explore, and learn continuously, pushing the boundaries of what is possible.', icon: <Lightbulb className="w-10 h-10" /> },
    { title: 'Collaboration', description: 'We believe the best ideas are born from diverse minds working together.', icon: <Users className="w-10 h-10" /> },
    { title: 'Integrity', description: 'We build AI responsibly, with a strong commitment to ethics and transparency.', icon: <Shield className="w-10 h-10" /> },
    { title: 'Innovation', description: 'We transform creative ideas into tangible solutions that create value.', icon: <BrainCircuit className="w-10 h-10" /> },
];

const techStack = [
    { name: 'Python', icon: <Python className="w-12 h-12" /> },
    { name: 'TensorFlow', icon: <Tensorflow className="w-12 h-12" /> },
    { name: 'PyTorch', icon: <Pytorch className="w-12 h-12" /> },
    { name: 'Firebase', icon: <Firebase className="w-12 h-12" /> },
    { name: 'OpenAI', icon: <OpenAI className="w-12 h-12" /> },
    { name: 'Hugging Face', icon: <HuggingFace className="w-12 h-12" /> },
];

const partners = [
    { name: 'HCLTech AI Force', description: 'Internal AI Center of Excellence providing mentorship and resources.' },
    { name: 'Google for Developers', description: 'Access to workshops and cloud credits for our projects.' },
    { name: 'Local Universities', description: 'Collaborating on research and talent development initiatives.' },
];

const TechCard: React.FC<{ tech: typeof techStack[0] }> = ({ tech }) => {
    const ref = React.useRef<HTMLDivElement>(null);
    const [rotate, setRotate] = React.useState({ x: 0, y: 0 });
    const [glowPosition, setGlowPosition] = React.useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = React.useState(false);

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
            x: yPct * -10,
            y: xPct * 10,
        });
        setGlowPosition({ x: mouseX, y: mouseY });
    };

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => {
        setIsHovered(false);
        setRotate({ x: 0, y: 0 });
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{
                transform: `perspective(800px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
                transition: 'transform 0.1s ease-out',
                transformStyle: 'preserve-3d',
            }}
            className="group relative p-6 text-center glass-card rounded-3xl transition-all duration-300 overflow-hidden border-2 border-transparent hover:border-hcl-blue/30 aspect-square flex flex-col justify-center items-center"
        >
            <div
                className="absolute -inset-px rounded-3xl transition-opacity duration-500"
                style={{
                    opacity: isHovered ? 1 : 0,
                    background: `radial-gradient(300px at ${glowPosition.x}px ${glowPosition.y}px, rgba(41, 171, 226, 0.15), transparent 80%)`,
                }}
            />
            <div className="relative z-10 flex flex-col items-center justify-center h-full">
                <div 
                    className="text-gray-500 dark:text-gray-400 group-hover:text-hcl-blue transition-colors duration-300 group-hover:scale-110"
                    style={{ transform: 'translateZ(30px)', transition: 'transform 0.2s' }}
                >
                    {tech.icon}
                </div>
                <p 
                    className="font-semibold mt-4 text-primary-text dark:text-gray-200"
                    style={{ transform: 'translateZ(15px)' }}
                >
                    {tech.name}
                </p>
            </div>
        </motion.div>
    );
};

// FIX: Explicitly type variants with the Variants type from framer-motion.
const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

// FIX: Explicitly type variants with the Variants type from framer-motion.
const itemVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 120 } }
};


export const AboutPage: React.FC = () => {
  return (
    <>
      <PageHeader title="About Our Club" subtitle="Our story, mission, and the vision that drives our innovation." />
      
      {/* Our Story Section */}
      <section className="py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                >
                    <h2 className="font-space-grotesk text-3xl sm:text-4xl font-semibold text-primary-text dark:text-white mb-6">
                    Our Story
                    </h2>
                    <div className="space-y-4 text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                    <p>
                        Founded with a passion for transforming ideas into intelligent solutions, the AI Club at HCLTech Madurai aims to bridge creativity and technology.
                    </p>
                    <p>
                        We are a multidisciplinary group of professionals and learners united by curiosity for data, algorithms, and the impact of AI in shaping the future.
                    </p>
                    <p>
                        Our initiatives focus on hands-on learning, knowledge sharing, and building real-world AI applications that make a difference.
                    </p>
                    </div>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="overflow-hidden rounded-2xl shadow-lg"
                >
                    <img src="https://placehold.co/600x400/008080/FFFFFF?text=Genesis" alt="The beginning of the AI Club" className="w-full h-full object-cover"/>
                </motion.div>
            </div>
        </div>
      </section>

      {/* Mission and Vision Section */}
      <section className="py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative glass-card p-8 md:p-12 rounded-3xl overflow-hidden">
                <div className="absolute inset-0 bg-grid-gray-200/[0.05] dark:bg-grid-gray-700/[0.05] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
                <div className="grid md:grid-cols-2 gap-8 md:gap-12 relative z-10">
                    {/* Mission */}
                    <div className="text-center md:text-left">
                        <div className="inline-flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 bg-hcl-blue/10 dark:bg-hcl-blue/20 rounded-lg flex items-center justify-center">
                               <Target className="w-7 h-7 text-hcl-blue" />
                            </div>
                            <h2 className="font-space-grotesk text-3xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-hcl-blue to-hcl-teal">Our Mission</h2>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                            To foster a vibrant community of AI enthusiasts, empowering members to learn, collaborate, and build innovative solutions that solve real-world challenges.
                        </p>
                    </div>
                    
                    {/* Vision */}
                    <div className="text-center md:text-left md:border-l md:border-gray-200/50 dark:md:border-gray-700/50 md:pl-12">
                         <div className="inline-flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 bg-tech-purple/10 dark:bg-tech-purple/20 rounded-lg flex items-center justify-center">
                               <Eye className="w-7 h-7 text-tech-purple" />
                            </div>
                            <h2 className="font-space-grotesk text-3xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-tech-purple to-hcl-teal">Our Vision</h2>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                           To be the epicenter of AI innovation within HCLTech Madurai, driving a culture of continuous learning and technological excellence.
                        </p>
                    </div>
                </div>
            </div>
        </div>
      </section>

       {/* Core Values Section */}
      <section className="py-16 sm:py-20 bg-gray-50 dark:bg-gray-800/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-space-grotesk text-3xl sm:text-4xl font-semibold text-center mb-12">Our Core Values</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {coreValues.map(value => (
              <div key={value.title} className="relative p-8 text-center bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg border border-white/20 rounded-3xl transition-all duration-300 overflow-hidden group transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-hcl-blue/10">
                <div className="absolute inset-0 bg-gradient-to-br from-hcl-blue/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10 flex flex-col items-center h-full">
                  <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-hcl-blue/10 dark:bg-hcl-blue/20 group-hover:scale-105 transition-transform duration-300">
                    <div className="text-hcl-blue">
                      {value.icon}
                    </div>
                  </div>
                  <h3 className="font-space-grotesk text-2xl font-bold mb-3 gradient-text from-hcl-blue to-hcl-teal">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {value.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Journey Timeline Section */}
      <section className="py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-space-grotesk text-3xl sm:text-4xl font-semibold text-center mb-20">Our Journey So Far</h2>
            <div className="relative max-w-4xl mx-auto">
                {/* The vertical timeline path */}
                <div className="absolute left-4 md:left-1/2 top-0 w-1 h-full bg-hcl-blue/20 -translate-x-1/2" aria-hidden="true"></div>

                <div className="space-y-12">
                    {timelineEvents.map((event, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.4 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                        >
                            <div className={`md:flex items-center ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''} relative`}>
                                {/* The Content Card */}
                                <div className="md:w-1/2 w-full">
                                    <div className={`ml-10 md:ml-0 glass-card p-6 rounded-2xl shadow-lg border-2 border-transparent hover:border-hcl-blue/40 transition-colors duration-300`}>
                                        <p className="font-space-grotesk text-xl font-bold text-hcl-teal mb-1">{event.year}</p>
                                        <h3 className="text-lg font-bold text-primary-text dark:text-white mb-2">{event.title}</h3>
                                        <p className="text-gray-600 dark:text-gray-300 text-sm">{event.description}</p>
                                    </div>
                                </div>
                                
                                {/* Spacer for desktop layout */}
                                <div className="hidden md:block w-1/2"></div>
                                
                                 {/* The timeline marker */}
                                <div className="absolute left-4 md:left-1/2 top-4 -translate-x-1/2 z-10">
                                    <motion.div 
                                        className="w-5 h-5 bg-white dark:bg-gray-800 rounded-full border-4 border-hcl-blue"
                                        initial={{ scale: 0 }}
                                        whileInView={{ scale: 1 }}
                                        viewport={{ once: true, amount: 0.5 }}
                                        transition={{ duration: 0.3, delay: 0.2, type: 'spring', stiffness: 200 }}
                                    ></motion.div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
      </section>
      
        {/* Tech Stack Section */}
        <section className="py-16 sm:py-20 bg-gray-50 dark:bg-gray-800/50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="font-space-grotesk text-3xl sm:text-4xl font-semibold text-center mb-12">Tech Stack & Tools We Use</h2>
                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8 max-w-4xl mx-auto"
                >
                    {techStack.map(tech => (
                       <motion.div key={tech.name} variants={itemVariants}>
                           <TechCard tech={tech} />
                       </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>

       {/* Collaborations & Partners Section */}
       <section className="py-16 sm:py-20 bg-gray-50 dark:bg-gray-800/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-space-grotesk text-3xl sm:text-4xl font-semibold text-center mb-12">Collaborations & Partners</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {partners.map(partner => (
                    <Card key={partner.name} icon={<Building className="w-8 h-8 text-hcl-blue" />} title={partner.name} description={partner.description} />
                ))}
            </div>
          </div>
        </section>
    </>
  );
};
