import React, { useState } from 'react';
import { PageHeader } from '../components/PageHeader';

const members = [
  { name: 'Aravind Kumar', role: 'Club Lead', skills: ['Python', 'TensorFlow', 'Cloud'], imageUrl: 'https://placehold.co/128x128/e0e0e0/333333?text=AK' },
  { name: 'Priya Rajesh', role: 'Research Head', skills: ['GenAI', 'Ethics', 'NLP'], imageUrl: 'https://placehold.co/128x128/e0e0e0/333333?text=PR' },
  { name: 'Karthik R', role: 'Technical Coordinator', skills: ['PyTorch', 'React', 'DevOps'], imageUrl: 'https://placehold.co/128x128/e0e0e0/333333?text=KR' },
  { name: 'Nivetha M', role: 'Creative Lead', skills: ['UI/UX', 'Figma', 'GenAI'], imageUrl: 'https://placehold.co/128x128/e0e0e0/333333?text=NM' },
  { name: 'Suresh P', role: 'Events Coordinator', skills: ['Management', 'Cloud'], imageUrl: 'https://placehold.co/128x128/e0e0e0/333333?text=SP' },
  { name: 'Anitha J', role: 'Community Manager', skills: ['Python', 'Community'], imageUrl: 'https://placehold.co/128x128/e0e0e0/333333?text=AJ' },
];

const MemberCard: React.FC<typeof members[0]> = ({ name, role, skills, imageUrl }) => (
    <div className="glass-card p-6 rounded-2xl text-center transition-transform transform hover:-translate-y-1 hover:shadow-xl">
        <img src={imageUrl} alt={name} className="w-24 h-24 mx-auto rounded-full mb-4 shadow-lg" />
        <h3 className="font-space-grotesk text-xl font-bold">{name}</h3>
        <p className="text-hcl-teal font-semibold">{role}</p>
        <div className="flex flex-wrap justify-center gap-2 mt-4">
            {skills.map(skill => (
                <span key={skill} className="bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs font-semibold px-2.5 py-1 rounded-full">{skill}</span>
            ))}
        </div>
    </div>
);

export const MembersPage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    
    const filteredMembers = members.filter(member => 
        member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <>
            <PageHeader title="Our Members" subtitle="Meet the talented individuals driving innovation at the AI Club." />
            <section className="py-16 sm:py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Search Bar */}
                    <div className="max-w-md mx-auto mb-12">
                        <input
                            type="text"
                            placeholder="Search by name or skill..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full px-5 py-3 rounded-full border border-gray-300 dark:border-gray-600 bg-transparent focus:outline-none focus:ring-2 focus:ring-hcl-blue transition"
                        />
                    </div>

                    {/* Members Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {filteredMembers.map(member => (
                            <MemberCard key={member.name} {...member} />
                        ))}
                    </div>
                    {filteredMembers.length === 0 && (
                        <p className="text-center text-gray-500 dark:text-gray-400 mt-8">No members found.</p>
                    )}
                </div>
            </section>
        </>
    );
};
