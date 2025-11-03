import React from 'react';
import { PageHeader } from '../components/PageHeader';
import { Button } from '../components/Button';
import { Mail, MapPin, Phone, LinkedIn, GitHub, YouTube } from '../components/Icons';

const ContactInfoCard: React.FC<{ icon: React.ReactNode; title: string; children: React.ReactNode }> = ({ icon, title, children }) => (
    <div className="glass-card p-6 rounded-2xl text-center">
        <div className="w-16 h-16 bg-hcl-blue/10 dark:bg-hcl-blue/20 rounded-full flex items-center justify-center mx-auto mb-4 text-hcl-blue">
            {icon}
        </div>
        <h3 className="font-space-grotesk text-xl font-bold">{title}</h3>
        <div className="text-gray-600 dark:text-gray-300">{children}</div>
    </div>
);

export const ContactPage: React.FC = () => {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert("Message sent successfully!");
        (e.target as HTMLFormElement).reset();
    };

    return (
        <>
            <PageHeader title="Get In Touch" subtitle="Let's build the future together. Reach out to collaborate, share ideas, or partner with us." />

            {/* Contact Info Section */}
            <section className="py-16 sm:py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                        <ContactInfoCard icon={<MapPin className="w-8 h-8" />} title="Our Location">
                            HCLTech Campus<br />Madurai, Tamil Nadu
                        </ContactInfoCard>
                        <ContactInfoCard icon={<Mail className="w-8 h-8" />} title="Email Us">
                            <a href="mailto:aiclub.madurai@hcltech.com" className="hover:underline">aiclub.madurai@hcltech.com</a>
                        </ContactInfoCard>
                        <ContactInfoCard icon={<Phone className="w-8 h-8" />} title="Call Us">
                            Internal Ext: 12345
                        </ContactInfoCard>
                    </div>
                </div>
            </section>

            {/* Form and Map Section */}
            <section className="py-16 sm:py-20 bg-gray-50 dark:bg-gray-800/50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto glass-card p-8 md:p-12 rounded-3xl">
                        <h2 className="font-space-grotesk text-3xl font-semibold text-center mb-8">Send Us a Message</h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid sm:grid-cols-2 gap-6">
                                <input type="text" placeholder="Your Name" className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-transparent focus:outline-none focus:ring-2 focus:ring-hcl-blue transition" required />
                                <input type="email" placeholder="Your Email" className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-transparent focus:outline-none focus:ring-2 focus:ring-hcl-blue transition" required />
                            </div>
                            <input type="text" placeholder="Subject" className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-transparent focus:outline-none focus:ring-2 focus:ring-hcl-blue transition" required />
                            <textarea placeholder="Your Message" rows={5} className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-transparent focus:outline-none focus:ring-2 focus:ring-hcl-blue transition" required></textarea>
                            <div className="text-center">
                                <Button type="submit">Send Message</Button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
};
