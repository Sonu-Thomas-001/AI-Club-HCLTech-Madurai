import React from 'react';
import { PageHeader } from '../components/PageHeader';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Users, Star, Zap } from '../components/Icons';

const partnershipBenefits = [
    { icon: <Users className="w-8 h-8 text-hcl-blue" />, title: "Access Top Talent", description: "Connect with a pool of passionate and skilled AI enthusiasts, ready to tackle real-world challenges." },
    { icon: <Star className="w-8 h-8 text-hcl-blue" />, title: "Enhance Brand Visibility", description: "Showcase your brand to our community of tech professionals and future leaders through events and workshops." },
    { icon: <Zap className="w-8 h-8 text-hcl-blue" />, title: "Drive Innovation", description: "Collaborate on cutting-edge projects, gain fresh perspectives, and influence the next generation of AI solutions." },
];

const collaborationOpportunities = [
    { title: "Event Sponsorship", description: "Sponsor our hackathons, workshops, or tech talks to gain prominent brand exposure." },
    { title: "Guest Speaking", description: "Share your industry expertise and insights with our members as a guest speaker." },
    { title: "Mentorship Programs", description: "Guide our members and project teams, helping to shape their skills and careers." },
    { title: "Project Collaboration", description: "Partner with our teams on specific projects that align with your business goals." },
];


export const PartnerPage: React.FC = () => {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert("Thank you for your interest! We will be in touch shortly.");
        (e.target as HTMLFormElement).reset();
    };

    return (
        <>
            <PageHeader title="Partner With Us" subtitle="Collaborate with the AI Club to drive innovation, access talent, and shape the future of technology." />

            {/* Why Partner Section */}
            <section className="py-16 sm:py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="font-space-grotesk text-3xl sm:text-4xl font-semibold text-center mb-12">Why Partner With the AI Club?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {partnershipBenefits.map(benefit => (
                            <Card key={benefit.title} icon={benefit.icon} title={benefit.title} description={benefit.description} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Opportunities Section */}
            <section className="py-16 sm:py-20 bg-gray-50 dark:bg-gray-800/50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="font-space-grotesk text-3xl sm:text-4xl font-semibold text-center mb-12">Ways to Collaborate</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
                        {collaborationOpportunities.map(opp => (
                             <div key={opp.title} className="glass-card p-6 rounded-2xl text-center transition-transform transform hover:-translate-y-1 hover:shadow-xl">
                                <h3 className="font-space-grotesk text-xl font-bold mb-3">{opp.title}</h3>
                                <p className="text-gray-600 dark:text-gray-300">{opp.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            
            {/* Contact Form Section */}
            <section className="py-16 sm:py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl mx-auto glass-card p-8 md:p-12 rounded-3xl">
                        <h2 className="font-space-grotesk text-3xl font-semibold text-center mb-8">Let's Start a Conversation</h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid sm:grid-cols-2 gap-6">
                                <input type="text" placeholder="Your Name" className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-transparent focus:outline-none focus:ring-2 focus:ring-hcl-blue transition" required />
                                <input type="text" placeholder="Company Name" className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-transparent focus:outline-none focus:ring-2 focus:ring-hcl-blue transition" required />
                            </div>
                             <input type="email" placeholder="Work Email" className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-transparent focus:outline-none focus:ring-2 focus:ring-hcl-blue transition" required />
                            <select defaultValue="" className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-primary-text dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-hcl-blue transition" required>
                                <option value="" disabled>Area of Interest</option>
                                {collaborationOpportunities.map(opp => <option key={opp.title} value={opp.title}>{opp.title}</option>)}
                                <option value="Other">Other</option>
                            </select>
                            <textarea placeholder="Your Message" rows={5} className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-transparent focus:outline-none focus:ring-2 focus:ring-hcl-blue transition"></textarea>
                            <div className="text-center">
                                <Button type="submit">Submit Inquiry</Button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
};