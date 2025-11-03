import React, { useState } from 'react';
import { PageHeader } from '../components/PageHeader';
import { Button } from '../components/Button';
import { GitHub, Code, Tensorflow, Python, Bot, Firebase, Pytorch, Eye, BrainCircuit, Cpu } from '../components/Icons';

const allProjects = [
  { title: '🧠 NeuroLens', category: 'ML', description: 'An AI-powered document summarizer that converts long reports into precise insights.', image: 'https://placehold.co/600x400/29ABE2/FFFFFF?text=NeuroLens', techStack: ['TensorFlow', 'Python', 'Flask'], githubUrl: '#', demoUrl: '#' },
  { title: '🤖 SmartBot', category: 'GenAI', description: 'A custom conversational AI assistant that integrates with internal tools to automate queries.', image: 'https://placehold.co/600x400/008080/FFFFFF?text=SmartBot', techStack: ['Gemini API', 'React', 'Firebase'], githubUrl: '#', demoUrl: '#' },
  { title: '🧬 Visionary', category: 'Vision', description: 'A computer vision prototype for quality inspection, detecting surface defects in manufacturing.', image: 'https://placehold.co/600x400/5F1EBE/FFFFFF?text=Visionary', techStack: ['PyTorch', 'OpenCV', 'GCP'], githubUrl: '#', demoUrl: '#' },
  { title: '🎨 GenCreate', category: 'GenAI', description: 'An AI art generator merging data and creativity to produce unique visuals from text prompts.', image: 'https://placehold.co/600x400/FF6347/FFFFFF?text=GenCreate', techStack: ['Stable Diffusion', 'Python'], githubUrl: '#', demoUrl: '#' },
  { title: '📈 Predicta', category: 'ML', description: 'A time-series forecasting model to predict IT ticket volumes, helping optimize resource allocation.', image: 'https://placehold.co/600x400/4682B4/FFFFFF?text=Predicta', techStack: ['Scikit-learn', 'Pandas'], githubUrl: '#', demoUrl: '#' },
  { title: '🛡️ Sentinel', category: 'Cloud', description: 'An anomaly detection system that monitors network traffic for suspicious patterns using machine learning.', image: 'https://placehold.co/600x400/32CD32/FFFFFF?text=Sentinel', techStack: ['AWS SageMaker', 'Kinesis'], githubUrl: '#', demoUrl: '#' },
];

const categories = ['All', 'GenAI', 'ML', 'Cloud', 'Vision'];

const techIconMap: { [key: string]: React.ReactNode } = {
  'TensorFlow': <Tensorflow className="w-6 h-6" />,
  'Python': <Python className="w-6 h-6" />,
  'Flask': <Code className="w-6 h-6" />,
  'Gemini API': <Bot className="w-6 h-6" />,
  'React': <Code className="w-6 h-6" />,
  'Firebase': <Firebase className="w-6 h-6" />,
  'PyTorch': <Pytorch className="w-6 h-6" />,
  'OpenCV': <Eye className="w-6 h-6" />,
  'GCP': <Code className="w-6 h-6" />,
  'Stable Diffusion': <BrainCircuit className="w-6 h-6" />,
  'Scikit-learn': <Cpu className="w-6 h-6" />,
  'Pandas': <Code className="w-6 h-6" />,
  'AWS SageMaker': <Code className="w-6 h-6" />,
  'Kinesis': <Code className="w-6 h-6" />,
};

export const ProjectsPage: React.FC = () => {
  const [filter, setFilter] = useState('All');

  const filteredProjects = filter === 'All'
    ? allProjects
    : allProjects.filter(p => p.category === filter);

  return (
    <>
      <PageHeader title="Our AI Projects" subtitle="A showcase of the AI-powered projects and prototypes built by our members." />
      
      <section className="py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter Buttons */}
          <div className="flex justify-center flex-wrap gap-4 mb-12">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-6 py-2 font-semibold rounded-full text-md transition-all duration-300 transform hover:scale-105 ${
                  filter === category
                    ? 'bg-hcl-blue text-white shadow-md'
                    : 'bg-white dark:bg-gray-700 text-secondary-text dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map(project => (
              <div key={project.title} className="glass-card rounded-2xl overflow-hidden shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col">
                  <div className="relative">
                      <img src={project.image} alt={project.title} className="w-full h-56 object-cover" />
                      <div className="absolute top-4 right-4 bg-hcl-teal/80 text-white text-xs font-bold px-2.5 py-1 rounded-full">{project.category}</div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                      <h3 className="font-space-grotesk text-2xl font-bold text-primary-text dark:text-white mb-3">{project.title}</h3>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4 flex-grow">{project.description}</p>
                      <div className="mb-4">
                          <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">Tech Stack:</p>
                          <div className="flex flex-wrap items-center gap-3">
                              {project.techStack.map(tech => (
                                  <div key={tech} className="text-gray-500 dark:text-gray-400 hover:text-hcl-blue transition-colors" title={tech}>
                                      {techIconMap[tech] || <Code className="w-6 h-6" />}
                                  </div>
                              ))}
                          </div>
                      </div>
                      <div className="mt-auto pt-4 border-t border-gray-200 dark:border-gray-700 flex gap-4">
                          <a href={project.demoUrl} className="flex-1">
                            <Button variant="primary" className="w-full">
                              <Code className="w-5 h-5 mr-2 inline-block"/> Demo
                            </Button>
                          </a>
                          <a href={project.githubUrl} className="flex-1">
                            <Button variant="outline" className="w-full">
                              <GitHub className="w-5 h-5 mr-2 inline-block"/> GitHub
                            </Button>
                          </a>
                      </div>
                  </div>
              </div>
            ))}
          </div>
           {filteredProjects.length === 0 && (
            <div className="text-center py-16">
              <p className="text-secondary-text dark:text-gray-400 text-xl">No projects found in this category.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
};