import React from 'react';
import { PageHeader } from '../components/PageHeader';
import { Button } from '../components/Button';
import { Bot } from '../components/Icons';

export const PortalPage: React.FC = () => {
    return (
        <>
            <PageHeader title="AI Prototype Repository" subtitle="A dedicated space for members to store, manage, and collaborate on AI projects." />
            <section className="py-24 text-center">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <Bot className="w-24 h-24 text-hcl-blue mx-auto mb-6 animate-float" />
                    <h2 className="font-space-grotesk text-4xl font-bold mb-4">Coming Soon!</h2>
                    <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto mb-8">
                        We are currently building this members-only portal. Soon, you'll be able to log in, upload your prototypes, and explore AI agents built by the community.
                    </p>
                    <div className="flex justify-center gap-4">
                        <Button disabled>Login</Button>
                        <Button variant="outline" disabled>Upload Prototype</Button>
                    </div>
                </div>
            </section>
        </>
    );
};
