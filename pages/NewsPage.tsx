import React from 'react';
import { PageHeader } from '../components/PageHeader';

const newsItems = [
  { title: "AI Club Launches 'NeuroLens' Internally", date: 'October 28, 2025', category: 'Project Launch', excerpt: 'Our flagship project for document summarization is now available for internal use, marking a major milestone...', image: 'https://placehold.co/600x400/29ABE2/FFFFFF?text=NeuroLens' },
  { title: "Hackathon 2025 Winners Announced", date: 'October 15, 2025', category: 'Event', excerpt: 'Team "Visionaries" took home the grand prize for their innovative computer vision solution for manufacturing...', image: 'https://placehold.co/600x400/008080/FFFFFF?text=Winners' },
  { title: "Member Spotlight: Priya Rajesh on AI Ethics", date: 'September 22, 2025', category: 'Interview', excerpt: 'Our research head, Priya, shares her insights on the importance of ethical considerations in AI development...', image: 'https://placehold.co/600x400/5F1EBE/FFFFFF?text=Spotlight' },
  { title: "New Workshop Series: Intro to Generative AI", date: 'September 5, 2025', category: 'Learning', excerpt: 'Join our new 4-week workshop series designed to take you from zero to hero in generative AI concepts and tools...', image: 'https://placehold.co/600x400/e0e0e0/333333?text=Workshop' },
];

export const NewsPage: React.FC = () => {
  return (
    <>
      <PageHeader title="News & Announcements" subtitle="Stay updated with the latest happenings, achievements, and news from the AI Club." />
      <section className="py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {newsItems.map((item, index) => (
              <div key={index} className="glass-card rounded-2xl overflow-hidden shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col">
                <div className="overflow-hidden">
                    <img src={item.image} alt={item.title} className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                    <p className="text-sm text-hcl-teal font-semibold mb-2">{item.category}</p>
                    <h3 className="font-space-grotesk text-2xl font-bold mb-3">{item.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 flex-grow">{item.excerpt}</p>
                    <div className="flex justify-between items-center mt-auto">
                        <p className="text-sm text-gray-500 dark:text-gray-400">{item.date}</p>
                        <a href="#" className="font-semibold text-hcl-blue hover:underline">Read More &rarr;</a>
                    </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
