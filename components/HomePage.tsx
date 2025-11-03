import React from 'react';
import { Button } from './Button';
import { Card } from './Card';
import { Link } from './Link';
import { AnimatedSection } from './AnimatedSection';
import { Bot, BrainCircuit, Code, Users, Award, Calendar, Lightbulb } from './Icons';
import { CountUpStat } from './CountUpStat';
import { TeamMemberCard } from './TeamMemberCard';
import { ScrollingTestimonials } from './ScrollingTestimonials';

const teamMembers = [
    { name: 'Aravind Kumar', role: 'Club Lead', imageUrl: 'https://placehold.co/128x128/e0e0e0/333333?text=AK', linkedinUrl: '#' },
    { name: 'Priya Rajesh', role: 'Research Head', imageUrl: 'https://placehold.co/128x128/e0e0e0/333333?text=PR', linkedinUrl: '#' },
    { name: 'Karthik R', role: 'Technical Coordinator', imageUrl: 'https://placehold.co/128x128/e0e0e0/333333?text=KR', linkedinUrl: '#' },
    { name: 'Nivetha M', role: 'Creative Lead', imageUrl: 'https://placehold.co/128x128/e0e0e0/333333?text=NM', linkedinUrl: '#' },
];

export const HomePage: React.FC = () => {
  return (
    <div className="space-y-20 md:space-y-32 overflow-x-hidden">
        {/* Hero Section */}
        <div className="relative pt-20 pb-24 text-center">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-white to-teal-100 dark:from-gray-900 dark:via-gray-800 dark:to-hcl-teal/20"></div>
            <div className="absolute inset-0 bg-grid-gray-200/[0.2] dark:bg-grid-gray-700/[0.2] [mask-image:linear-gradient(to_bottom,white,transparent,white)]"></div>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
                <AnimatedSection>
                    <Bot className="w-20 h-20 text-hcl-blue mx-auto mb-6 animate-float" />
                    <h1 className="font-space-grotesk text-4xl md:text-7xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-br from-hcl-blue via-tech-purple to-hcl-teal pb-4">
                        Supercharging Progress Through AI
                    </h1>
                    <p className="text-gray-600 dark:text-gray-300 text-lg md:text-xl max-w-3xl mx-auto mt-4 leading-relaxed">
                        Welcome to the AI Club at HCLTech Madurai—a community of innovators, learners, and builders passionate about shaping the future with artificial intelligence.
                    </p>
                    <div className="mt-10 flex justify-center items-center gap-4">
                        <Link to="/join"><Button>Join the Club</Button></Link>
                        <Link to="/projects"><Button variant="outline">View Projects</Button></Link>
                    </div>
                </AnimatedSection>
            </div>
        </div>

        {/* Stats Section */}
        <AnimatedSection className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="glass-card grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 p-6 md:p-8 rounded-2xl max-w-4xl mx-auto divide-x divide-gray-200/50 dark:divide-gray-700/50">
                <CountUpStat value={100} label="Members" />
                <CountUpStat value={15} label="Projects" />
                <CountUpStat value={25} label="Workshops" />
                <CountUpStat value={5} label="Hackathons" />
            </div>
        </AnimatedSection>
        
        {/* What We Do Section */}
        <AnimatedSection className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
                <h2 className="font-space-grotesk text-3xl sm:text-4xl font-semibold text-primary-text dark:text-white">What We Do</h2>
                <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto mt-4">We focus on three core pillars to foster AI innovation and growth.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Card icon={<Lightbulb className="w-10 h-10 text-hcl-blue"/>} title="Learn & Upskill" description="We organize workshops, tech talks, and study groups on cutting-edge AI topics, from deep learning to generative AI." />
                <Card icon={<Code className="w-10 h-10 text-hcl-blue"/>} title="Build & Innovate" description="Members collaborate on real-world projects, building prototypes that solve business challenges and push technological boundaries." />
                <Card icon={<Users className="w-10 h-10 text-hcl-blue"/>} title="Connect & Collaborate" description="We provide a platform for networking with peers, mentors, and experts, fostering a vibrant and supportive AI community." />
            </div>
        </AnimatedSection>

        {/* Featured Projects Section */}
        <AnimatedSection className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
                <h2 className="font-space-grotesk text-3xl sm:text-4xl font-semibold text-primary-text dark:text-white">Featured Projects</h2>
                <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto mt-4">A glimpse into the innovative solutions being built by our members.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Card icon={<BrainCircuit className="w-10 h-10 text-hcl-blue"/>} title="NeuroLens" description="An AI-powered document summarizer that converts long reports into precise insights." />
                <Card icon={<Bot className="w-10 h-10 text-hcl-blue"/>} title="SmartBot" description="A custom conversational AI assistant that integrates with internal tools to automate queries." />
                <Card icon={<Award className="w-10 h-10 text-hcl-blue"/>} title="Visionary" description="A computer vision prototype for quality inspection, detecting surface defects in manufacturing." />
            </div>
            <div className="text-center mt-12">
                <Link to="/projects"><Button>Explore All Projects</Button></Link>
            </div>
        </AnimatedSection>

        {/* Meet the Team Section */}
        <AnimatedSection className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
                <h2 className="font-space-grotesk text-3xl sm:text-4xl font-semibold text-primary-text dark:text-white">Meet the Leadership</h2>
                 <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto mt-4">The core team driving the club's vision and activities.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {teamMembers.map(member => <TeamMemberCard key={member.name} member={member} />)}
            </div>
        </AnimatedSection>

        {/* Testimonials */}
        <AnimatedSection>
            <div className="text-center mb-12">
                <h2 className="font-space-grotesk text-3xl sm:text-4xl font-semibold text-primary-text dark:text-white">What Our Members Say</h2>
            </div>
            <ScrollingTestimonials />
        </AnimatedSection>

        {/* Join Us CTA */}
        <AnimatedSection className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative glass-card p-10 md:p-16 rounded-3xl overflow-hidden text-center">
                <div className="absolute inset-0 bg-gradient-to-br from-hcl-blue/10 to-hcl-teal/10 dark:from-hcl-blue/20 dark:to-hcl-teal/20"></div>
                <div className="relative z-10">
                    <h2 className="font-space-grotesk text-3xl sm:text-4xl font-semibold text-primary-text dark:text-white">Ready to Shape the Future?</h2>
                    <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto mt-4 mb-8">Join a community of innovators and start your journey in AI today. Whether you're a beginner or an expert, there's a place for you here.</p>
                    <Link to="/join"><Button>Become a Member</Button></Link>
                </div>
            </div>
        </AnimatedSection>
    </div>
  );
};
