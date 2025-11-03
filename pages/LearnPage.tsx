import React from 'react';
import { PageHeader } from '../components/PageHeader';
import { Card } from '../components/Card';

const resources = [
    { title: "Introduction to Neural Networks", category: "Articles", description: "A beginner-friendly guide to understanding the core concepts of neural networks." },
    { title: "Building a Chatbot with Gemini", category: "Tutorials", description: "A step-by-step tutorial on creating your first conversational AI using the Gemini API." },
    { title: "Machine Learning Crash Course", category: "Courses", description: "A curated list of lectures and materials from Google's popular ML course." },
    { title: "Awesome Generative AI", category: "Tools", description: "A collection of the best tools and frameworks for working with generative AI." },
    { title: "The CIFAR-10 dataset", category: "Datasets", description: "A classic dataset for computer vision tasks, consisting of 60,000 32x32 colour images." },
    { title: "Understanding Transformers", category: "Articles", description: "Dive deep into the architecture that powers models like BERT and GPT." },
];

const categories = ['All', 'Articles', 'Tutorials', 'Courses', 'Datasets', 'Tools'];

export const LearnPage: React.FC = () => {
    const [filter, setFilter] = React.useState('All');
    const filteredResources = filter === 'All' ? resources : resources.filter(r => r.category === filter);

    return (
        <>
            <PageHeader title="AI Learning Hub" subtitle="Your central hub for AI learning resources, tutorials, and tools." />
            <section className="py-16 sm:py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Search and Filter */}
                    <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-12">
                         <div className="flex justify-center flex-wrap gap-4">
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
                    </div>

                    {/* Resources Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredResources.map(res => (
                            <Card key={res.title} title={res.title} description={res.description}>
                                <div className="mt-4">
                                    <span className="bg-hcl-teal/10 text-hcl-teal text-xs font-bold mr-2 px-2.5 py-0.5 rounded-full">{res.category}</span>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};
