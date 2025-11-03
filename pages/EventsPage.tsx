import React, { useState, useEffect } from 'react';
import { PageHeader } from '../components/PageHeader';
import { Button } from '../components/Button';

const upcomingEvents = [
  { title: 'AI Hackathon 2025', date: '2025-11-25T09:00:00', description: 'A 48-hour innovation sprint where minds and machines unite to create groundbreaking prototypes.' },
  { title: 'Generative AI Bootcamp', date: '2025-12-10T14:00:00', description: 'An intensive workshop covering the fundamentals and advanced techniques of generative AI models.' },
  { title: 'Google Cloud Tech Talk', date: '2025-12-18T11:00:00', description: 'An expert session on leveraging Google Cloud for scalable AI solutions.' },
];

const pastEvents = [
    { title: 'Intro to Machine Learning', year: 2024, type: 'Workshop', image: 'https://placehold.co/600x400/29ABE2/FFFFFF?text=ML+Workshop' },
    { title: 'InnovateAI Hackathon', year: 2024, type: 'Hackathon', image: 'https://placehold.co/600x400/008080/FFFFFF?text=Hackathon+2024' },
    { title: 'AI Ethics Debate', year: 2023, type: 'Talk', image: 'https://placehold.co/600x400/5F1EBE/FFFFFF?text=Ethics+Debate' },
]

const Countdown: React.FC<{ targetDate: string }> = ({ targetDate }) => {
    const calculateTimeLeft = () => {
        const difference = +new Date(targetDate) - +new Date();
        let timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        }
        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);
        return () => clearTimeout(timer);
    });

    return (
        <div className="flex space-x-4 text-center">
            {Object.entries(timeLeft).map(([unit, value]) => (
                <div key={unit} className="glass-card p-2 rounded-lg w-16">
                    <div className="text-2xl font-bold text-hcl-blue">{String(value).padStart(2, '0')}</div>
                    <div className="text-xs uppercase">{unit}</div>
                </div>
            ))}
        </div>
    );
};

export const EventsPage: React.FC = () => {
    return (
        <>
            <PageHeader title="Events" subtitle="Join our workshops, hackathons, and tech talks to learn, build, and connect." />
            
            {/* Upcoming Events Section */}
            <section className="py-16 sm:py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="font-space-grotesk text-3xl sm:text-4xl font-semibold text-center mb-12">Upcoming Events</h2>
                    <div className="space-y-8 max-w-4xl mx-auto">
                        {upcomingEvents.map(event => (
                            <div key={event.title} className="glass-card p-8 rounded-2xl flex flex-col md:flex-row items-center gap-8">
                                <div className="flex-grow text-center md:text-left">
                                    <h3 className="font-space-grotesk text-2xl font-bold mb-2">{event.title}</h3>
                                    <p className="text-gray-600 dark:text-gray-300 mb-4">{event.description}</p>
                                    <p className="font-semibold text-hcl-teal mb-4">{new Date(event.date).toLocaleString()}</p>
                                    <Button>Register Now</Button>
                                </div>
                                <div className="flex-shrink-0">
                                    <Countdown targetDate={event.date} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Past Events Section */}
            <section className="py-16 sm:py-20 bg-gray-50 dark:bg-gray-800/50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="font-space-grotesk text-3xl sm:text-4xl font-semibold text-center mb-12">Past Events</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {pastEvents.map((event, i) => (
                            <div key={i} className="relative rounded-2xl overflow-hidden group shadow-lg">
                                <img src={event.image} alt={event.title} className="w-full h-64 object-cover" />
                                <div className="absolute inset-0 bg-black/50 flex items-end p-4">
                                    <div>
                                        <h3 className="font-space-grotesk text-xl font-bold text-white">{event.title}</h3>
                                        <p className="text-white/80">{event.type} - {event.year}</p>
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
