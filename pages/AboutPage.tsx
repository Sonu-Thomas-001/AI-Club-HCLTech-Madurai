import React from 'react';
import { PageHeader } from '../components/PageHeader';
import { Bot, Python, Tensorflow, Pytorch, Firebase, OpenAI, HuggingFace, Building } from '../components/Icons';
import { Card } from '../components/Card';

const teamMembers = [
  { name: 'Aravind Kumar', role: 'Club Lead', imageUrl: 'https://placehold.co/128x128/e0e0e0/333333?text=AK' },
  { name: 'Priya Rajesh', role: 'Research Head', imageUrl: 'https://placehold.co/128x128/e0e0e0/333333?text=PR' },
  { name: 'Karthik R', role: 'Technical Coordinator', imageUrl: 'https://placehold.co/128x128/e0e0e0/333333?text=KR' },
  { name: 'Nivetha M', role: 'Creative Lead', imageUrl: 'https://placehold.co/128x128/e0e0e0/333333?text=NM' },
  { name: 'Suresh P', role: 'Events Coordinator', imageUrl: 'https://placehold.co/128x128/e0e0e0/333333?text=SP' },
  { name: 'Anitha J', role: 'Community Manager', imageUrl: 'https://placehold.co/128x128/e0e0e0/333333?text=AJ' },
];

const timelineEvents = [
  { year: '2023', title: 'Club Inception', description: 'A small group of AI enthusiasts at HCLTech Madurai founded the club to create a space for innovation.' },
  { year: '2024', title: 'First Hackathon', description: 'Hosted our first-ever AI Hackathon, "InnovateAI," attracting over 50 participants.' },
  { year: '2024', title: 'Community Growth', description: 'Reached a milestone of 100+ active members from various departments.' },
  { year: '2025', title: 'Launch of NeuroLens', description: 'Our flagship project, NeuroLens, was deployed internally for document summarization.' },
];

const coreValues = [
    { title: 'Curiosity', description: 'We question, explore, and learn continuously, pushing the boundaries of what is possible.' },
    { title: 'Collaboration', description: 'We believe the best ideas are born from diverse minds working together.' },
    { title: 'Integrity', description: 'We build AI responsibly, with a strong commitment to ethics and transparency.' },
    { title: 'Innovation', description: 'We transform creative ideas into tangible solutions that create value.' },
];

const techStack = [
    { name: 'Python', icon: <Python className="w-10 h-10" /> },
    { name: 'TensorFlow', icon: <Tensorflow className="w-10 h-10" /> },
    { name: 'PyTorch', icon: <Pytorch className="w-10 h-10" /> },
    { name: 'Firebase', icon: <Firebase className="w-10 h-10" /> },
    { name: 'OpenAI', icon: <OpenAI className="w-10 h-10" /> },
    { name: 'Hugging Face', icon: <HuggingFace className="w-10 h-10" /> },
];

const partners = [
    { name: 'HCLTech AI Force', description: 'Internal AI Center of Excellence providing mentorship and resources.' },
    { name: 'Google for Developers', description: 'Access to workshops and cloud credits for our projects.' },
    { name: 'Local Universities', description: 'Collaborating on research and talent development initiatives.' },
];

export const AboutPage: React.FC = () => {
  return (
    <>
      <PageHeader title="About Our Club" subtitle="Our story, mission, and the vision that drives our innovation." />
      
      {/* Mission and Vision Section */}
      <section className="py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="glass-card p-8 rounded-2xl">
              <h2 className="font-space-grotesk text-3xl font-semibold mb-4">Our Mission</h2>
              <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">To foster a vibrant community of AI enthusiasts, empowering members to learn, collaborate, and build innovative solutions that solve real-world challenges.</p>
            </div>
            <div className="glass-card p-8 rounded-2xl">
              <h2 className="font-space-grotesk text-3xl font-semibold mb-4">Our Vision</h2>
              <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">To be the epicenter of AI innovation within HCLTech Madurai, driving a culture of continuous learning and technological excellence.</p>
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
              <div key={value.title} className="glass-card p-6 rounded-2xl text-center">
                 <h3 className="font-space-grotesk text-2xl font-bold text-primary-text dark:text-white mb-3">{value.title}</h3>
                 <p className="text-gray-600 dark:text-gray-300">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Journey Timeline Section */}
      <section className="py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-space-grotesk text-3xl sm:text-4xl font-semibold text-center mb-12">Our Journey</h2>
          <div className="relative max-w-2xl mx-auto">
            <div className="absolute left-1/2 w-0.5 h-full bg-hcl-blue/20 -translate-x-1/2"></div>
            {timelineEvents.map((event, index) => (
              <div key={index} className={`relative mb-8 flex items-center w-full ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                 <div className="hidden md:block w-5/12"></div>
                 <div className="z-10 flex items-center justify-center bg-hcl-blue shadow-xl w-12 h-12 rounded-full absolute left-1/2 -translate-x-1/2">
                  <h3 className="font-semibold text-sm text-white">{event.year}</h3>
                </div>
                <div className="md:w-5/12 w-full p-4 rounded-lg shadow-lg bg-white dark:bg-gray-800">
                  <h4 className="font-bold text-lg text-hcl-blue">{event.title}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
        {/* Tech Stack Section */}
        <section className="py-16 sm:py-20 bg-gray-50 dark:bg-gray-800/50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="font-space-grotesk text-3xl sm:text-4xl font-semibold text-center mb-12">Tech Stack & Tools We Use</h2>
                <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
                    {techStack.map(tech => (
                        <div key={tech.name} className="flex flex-col items-center gap-2 text-center text-gray-600 dark:text-gray-300 group">
                            <div className="text-gray-500 dark:text-gray-400 group-hover:text-hcl-blue transition-colors duration-300">{tech.icon}</div>
                            <p className="font-semibold">{tech.name}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>

      {/* Leadership Team Section */}
      <section className="py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-space-grotesk text-3xl sm:text-4xl font-semibold text-center mb-12">Meet the Leadership</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 text-center">
            {teamMembers.map(member => (
              <div key={member.name} className="group">
                <img src={member.imageUrl} alt={member.name} className="w-24 h-24 md:w-32 md:h-32 mx-auto mb-4 rounded-full bg-gray-200 transition-transform duration-300 group-hover:scale-105 shadow-lg" />
                <h4 className="font-space-grotesk text-lg font-bold">{member.name}</h4>
                <p className="text-hcl-teal font-semibold text-sm">{member.role}</p>
              </div>
            ))}
          </div>
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
