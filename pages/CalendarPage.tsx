
import React, { useState, useEffect } from 'react';
import { PageHeader } from '../components/PageHeader';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Clock, MapPin, CalendarPlus, Calendar } from '../components/Icons';

type EventType = 'Workshop' | 'Hackathon' | 'Meetup' | 'Webinar';

interface CalendarEvent {
  id: number;
  title: string;
  date: Date;
  type: EventType;
  time: string;
  location: string;
  description: string;
}

// Mock Data Generator
const generateMockEvents = (year: number, month: number): CalendarEvent[] => {
    const events: CalendarEvent[] = [
        { id: 1, title: 'GenAI Bootcamp', date: new Date(year, month, 5), type: 'Workshop', time: '10:00 AM - 2:00 PM', location: 'Lab 3, HCLTech Campus', description: 'Hands-on session on building LLM applications.' },
        { id: 2, title: 'InnovateAI Hackathon', date: new Date(year, month, 12), type: 'Hackathon', time: '9:00 AM (48h)', location: 'Main Auditorium', description: 'Annual hackathon focusing on sustainable AI solutions.' },
        { id: 3, title: 'Tech Talk: Future of Vision', date: new Date(year, month, 18), type: 'Meetup', time: '4:00 PM - 5:30 PM', location: 'Conference Room A', description: 'Guest speaker session on computer vision advancements.' },
        { id: 4, title: 'Cloud AI Webinar', date: new Date(year, month, 25), type: 'Webinar', time: '11:00 AM - 12:30 PM', location: 'Online (Teams)', description: 'Deep dive into deploying AI models on GCP.' },
        { id: 5, title: 'Project Demo Day', date: new Date(year, month, 28), type: 'Meetup', time: '3:00 PM - 5:00 PM', location: 'Innovation Center', description: 'Showcase of member projects from the last quarter.' },
        { id: 6, title: 'Code & Coffee', date: new Date(year, month, 8), type: 'Meetup', time: '9:00 AM - 10:30 AM', location: 'Cafeteria', description: 'Casual networking and code review session.' },
    ];
    return events;
};

const eventColors: Record<EventType, string> = {
    'Workshop': 'bg-hcl-blue',
    'Hackathon': 'bg-tech-purple',
    'Meetup': 'bg-hcl-teal',
    'Webinar': 'bg-orange-500',
};

export const CalendarPage: React.FC = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
    const [events, setEvents] = useState<CalendarEvent[]>([]);

    useEffect(() => {
        setEvents(generateMockEvents(currentDate.getFullYear(), currentDate.getMonth()));
    }, [currentDate]);

    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

    const handlePrevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
        setSelectedDate(null);
    };

    const handleNextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
        setSelectedDate(null);
    };

    const handleDateClick = (day: number) => {
        setSelectedDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day));
    };

    const getEventsForDay = (day: number) => {
        return events.filter(e => e.date.getDate() === day);
    };

    const selectedEvents = selectedDate ? getEventsForDay(selectedDate.getDate()) : [];

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0a] pb-20 relative overflow-hidden">
             {/* Ambient Background */}
             <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(41,171,226,0.1),transparent_50%)] pointer-events-none"></div>
             
            <PageHeader title="Our Calendar" subtitle="Stay in sync with our workshops, hackathons, and community gatherings." />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-12">
                <div className="flex flex-col lg:flex-row gap-8">
                    
                    {/* Main Calendar View */}
                    <div className="lg:w-2/3">
                        <div className="glass-card p-6 rounded-3xl shadow-2xl relative overflow-hidden border border-gray-200 dark:border-gray-700">
                            {/* Header */}
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-2xl md:text-3xl font-space-grotesk font-bold text-primary-text dark:text-white">
                                    {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
                                </h2>
                                <div className="flex gap-2">
                                    <button onClick={handlePrevMonth} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                                        <ChevronLeft className="w-6 h-6 text-gray-600 dark:text-gray-300" />
                                    </button>
                                    <button onClick={handleNextMonth} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                                        <ChevronRight className="w-6 h-6 text-gray-600 dark:text-gray-300" />
                                    </button>
                                </div>
                            </div>

                            {/* Grid Header */}
                            <div className="grid grid-cols-7 mb-4 text-center">
                                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                                    <div key={day} className="text-xs font-bold text-gray-400 uppercase tracking-widest py-2">
                                        {day}
                                    </div>
                                ))}
                            </div>

                            {/* Calendar Grid */}
                            <div className="grid grid-cols-7 gap-2 md:gap-4">
                                {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                                    <div key={`empty-${i}`} className="aspect-square"></div>
                                ))}
                                
                                {Array.from({ length: daysInMonth }).map((_, i) => {
                                    const day = i + 1;
                                    const dayEvents = getEventsForDay(day);
                                    const isToday = day === new Date().getDate() && currentDate.getMonth() === new Date().getMonth();
                                    const isSelected = selectedDate?.getDate() === day;

                                    return (
                                        <motion.button
                                            key={day}
                                            onClick={() => handleDateClick(day)}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className={`
                                                aspect-square rounded-2xl relative flex flex-col items-center justify-start pt-3 transition-all duration-300
                                                ${isSelected 
                                                    ? 'bg-hcl-blue text-white shadow-lg shadow-hcl-blue/30' 
                                                    : 'bg-white dark:bg-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-800 border border-gray-100 dark:border-gray-700/50'}
                                                ${isToday && !isSelected ? 'ring-2 ring-hcl-blue ring-inset' : ''}
                                            `}
                                        >
                                            <span className={`text-sm font-bold ${isSelected ? 'text-white' : 'text-gray-700 dark:text-gray-300'}`}>{day}</span>
                                            
                                            {/* Event Dots */}
                                            <div className="flex gap-1 mt-2 flex-wrap justify-center px-2">
                                                {dayEvents.map((ev) => (
                                                    <div 
                                                        key={ev.id} 
                                                        className={`w-1.5 h-1.5 rounded-full ${eventColors[ev.type]} ${isSelected ? 'ring-1 ring-white' : ''}`}
                                                    />
                                                ))}
                                            </div>
                                        </motion.button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Details Sidebar */}
                    <div className="lg:w-1/3">
                        <div className="sticky top-24 h-full min-h-[400px]">
                            <h3 className="text-xl font-space-grotesk font-bold text-gray-500 dark:text-gray-400 mb-4 uppercase tracking-widest">
                                {selectedDate ? selectedDate.toLocaleDateString('default', { weekday: 'long', month: 'long', day: 'numeric' }) : 'Select a date'}
                            </h3>

                            <div className="space-y-4">
                                <AnimatePresence mode='wait'>
                                    {selectedEvents.length > 0 ? (
                                        selectedEvents.map(event => (
                                            <motion.div
                                                key={event.id}
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -20 }}
                                                className="glass-card p-5 rounded-2xl border-l-4 border-l-hcl-blue shadow-md group hover:shadow-lg transition-all"
                                                style={{ borderLeftColor: event.type === 'Hackathon' ? '#5F1EBE' : event.type === 'Workshop' ? '#29ABE2' : '#008080' }}
                                            >
                                                <div className="flex justify-between items-start mb-2">
                                                    <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded-md text-white ${eventColors[event.type]}`}>
                                                        {event.type}
                                                    </span>
                                                    <button className="text-gray-400 hover:text-hcl-blue transition-colors" title="Add to Google Calendar">
                                                        <CalendarPlus className="w-5 h-5" />
                                                    </button>
                                                </div>
                                                <h4 className="text-lg font-bold text-primary-text dark:text-white mb-1 group-hover:text-hcl-blue transition-colors">
                                                    {event.title}
                                                </h4>
                                                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">{event.description}</p>
                                                
                                                <div className="flex flex-col gap-2 text-sm text-gray-500 dark:text-gray-400">
                                                    <div className="flex items-center gap-2">
                                                        <Clock className="w-4 h-4" />
                                                        {event.time}
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <MapPin className="w-4 h-4" />
                                                        {event.location}
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))
                                    ) : (
                                        <motion.div 
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="flex flex-col items-center justify-center py-12 text-center opacity-50"
                                        >
                                            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-full mb-4">
                                                <Calendar className="w-8 h-8 text-gray-400" />
                                            </div>
                                            <p className="text-gray-500 dark:text-gray-400">No events scheduled for this day.</p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};
