
import React, { useState, useRef, useEffect } from 'react';
import { PageHeader } from '../components/PageHeader';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, LinkedIn, GitHub, Mail } from '../components/Icons';
// @ts-ignore
import Papa from 'papaparse';

interface Member {
  id: string;
  name: string;
  role: string;
  dept: string;
  skills: string[];
  imageUrl: string;
}

interface MemberCardProps {
    member: Member;
    index: number;
}

const MemberCard: React.FC<MemberCardProps> = ({ member, index }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [rotate, setRotate] = useState({ x: 0, y: 0 });
    const [glow, setGlow] = useState({ x: 0, y: 0, opacity: 0 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const mouseX = e.clientX;
        const mouseY = e.clientY;

        // Calculate rotation based on mouse position relative to center
        const rotateX = ((mouseY - centerY) / (rect.height / 2)) * -10; // Max tilt 10deg
        const rotateY = ((mouseX - centerX) / (rect.width / 2)) * 10;

        setRotate({ x: rotateX, y: rotateY });
        setGlow({ x: mouseX - rect.left, y: mouseY - rect.top, opacity: 1 });
    };

    const handleMouseLeave = () => {
        setRotate({ x: 0, y: 0 });
        setGlow({ ...glow, opacity: 0 });
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            viewport={{ once: true }}
            className="perspective-1000"
        >
            <motion.div
                ref={ref}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                animate={{ rotateX: rotate.x, rotateY: rotate.y }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                style={{ transformStyle: 'preserve-3d' }}
                className="relative w-full bg-white dark:bg-gray-900/80 backdrop-blur-xl border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden shadow-xl group hover:border-hcl-blue/50 dark:hover:border-hcl-blue/50 transition-colors duration-500"
            >
                {/* Holographic Gradient Glow on Hover */}
                <div 
                    className="absolute pointer-events-none -inset-px rounded-2xl transition-opacity duration-500 z-0"
                    style={{
                        background: `radial-gradient(400px circle at ${glow.x}px ${glow.y}px, rgba(41, 171, 226, 0.15), transparent 80%)`,
                        opacity: glow.opacity
                    }}
                />

                {/* Decorative Tech Lines */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-hcl-blue to-transparent opacity-50" />
                <div className="absolute bottom-0 right-0 w-24 h-24 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5" />

                <div className="relative z-10 p-6 flex flex-col items-center">
                    {/* Avatar Section with Spinning Ring */}
                    <div className="relative w-28 h-28 mb-5">
                        <div className="absolute inset-0 rounded-full border-2 border-dashed border-hcl-blue/30 group-hover:border-hcl-blue/80 animate-[spin_10s_linear_infinite] transition-colors" />
                        <div className="absolute -inset-2 rounded-full border border-transparent group-hover:border-tech-purple/40 transition-colors duration-500" />
                        <img 
                            src={member.imageUrl} 
                            alt={member.name} 
                            className="w-full h-full rounded-full object-cover p-1.5 bg-white dark:bg-gray-900"
                        />
                        {/* Online Status Dot */}
                        <div className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 border-2 border-white dark:border-gray-900 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
                    </div>

                    {/* Info Section */}
                    <div className="text-center w-full">
                        <h3 className="text-xl font-bold font-space-grotesk text-primary-text dark:text-white group-hover:text-hcl-blue transition-colors">
                            {member.name}
                        </h3>
                        <p className="text-xs uppercase tracking-widest text-hcl-teal font-semibold mt-1 mb-4">
                            {member.role} <span className="text-gray-400 mx-1">|</span> {member.dept}
                        </p>

                        {/* Skills Chips */}
                        <div className="flex flex-wrap justify-center gap-2 mb-6">
                            {member.skills.map(skill => (
                                <span key={skill} className="px-2 py-1 text-[10px] font-medium uppercase tracking-wider rounded-md border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300 group-hover:border-hcl-blue/30 group-hover:text-hcl-blue transition-all">
                                    {skill}
                                </span>
                            ))}
                        </div>

                        {/* Action Bar (Reveals on Hover) */}
                        <div className="flex justify-center gap-4 opacity-60 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                            <button className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-hcl-blue hover:text-white transition-colors text-gray-600 dark:text-gray-400">
                                <LinkedIn className="w-4 h-4" />
                            </button>
                            <button className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-black hover:text-white transition-colors text-gray-600 dark:text-gray-400">
                                <GitHub className="w-4 h-4" />
                            </button>
                            <button className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-tech-purple hover:text-white transition-colors text-gray-600 dark:text-gray-400">
                                <Mail className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export const MembersPage: React.FC = () => {
    const [members, setMembers] = useState<Member[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const response = await fetch('/members.csv', { cache: 'no-cache' });
                if (!response.ok) throw new Error('Failed to fetch members data');

                const csvText = await response.text();
                Papa.parse(csvText, {
                    header: true,
                    skipEmptyLines: true,
                    complete: (results: { data: any[] }) => {
                        const parsedMembers = results.data.map((row: any) => ({
                            id: row.id,
                            name: row.name,
                            role: row.role,
                            dept: row.dept,
                            // Assume skills are semicolon separated in CSV
                            skills: row.skills ? row.skills.split(';').map((s: string) => s.trim()) : [],
                            imageUrl: row.imageUrl
                        }));
                        setMembers(parsedMembers);
                        setLoading(false);
                    },
                    error: (err: any) => {
                        console.error("Error parsing members CSV:", err);
                        setLoading(false);
                    }
                });
            } catch (error) {
                console.error("Error loading members:", error);
                setLoading(false);
            }
        };

        fetchMembers();
    }, []);
    
    const filteredMembers = members.filter(member => 
        member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0a] relative overflow-hidden">
            {/* Abstract Background Elements */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-hcl-blue/10 rounded-full blur-[128px] pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-tech-purple/10 rounded-full blur-[128px] pointer-events-none" />

            <PageHeader title="Our Squad" subtitle="Meet the visionaries, builders, and innovators driving the AI revolution at HCLTech." />
            
            <section className="py-12 sm:py-20 relative z-10">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    
                    {/* Futuristic Search Bar */}
                    <div className="max-w-xl mx-auto mb-16 relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-hcl-blue to-tech-purple rounded-full blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
                        <div className="relative flex items-center bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-gray-200 dark:border-gray-700 rounded-full px-6 py-4 shadow-2xl">
                            <Search className="w-6 h-6 text-gray-400 group-focus-within:text-hcl-blue transition-colors" />
                            <input
                                type="text"
                                placeholder="Search by name, role, or skill..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full ml-4 bg-transparent border-none focus:outline-none text-lg text-primary-text dark:text-white placeholder-gray-400"
                            />
                            <div className="hidden sm:flex items-center gap-2 ml-4">
                                <div className="w-px h-6 bg-gray-300 dark:bg-gray-700"></div>
                                <span className="text-xs font-mono text-gray-400 px-2">{loading ? '...' : filteredMembers.length} FOUND</span>
                            </div>
                        </div>
                    </div>

                    {loading ? (
                         <div className="flex justify-center py-20">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-hcl-blue"></div>
                        </div>
                    ) : (
                        /* Members Grid */
                        <motion.div 
                            layout
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                        >
                            <AnimatePresence>
                                {filteredMembers.map((member, index) => (
                                    <MemberCard key={member.id} member={member} index={index} />
                                ))}
                            </AnimatePresence>
                        </motion.div>
                    )}

                    {!loading && filteredMembers.length === 0 && (
                        <motion.div 
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                            className="text-center py-20"
                        >
                            <div className="inline-block p-6 rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
                                <Search className="w-8 h-8 text-gray-400" />
                            </div>
                            <p className="text-xl text-gray-500 dark:text-gray-400">No members found matching your criteria.</p>
                            <button 
                                onClick={() => setSearchTerm('')}
                                className="mt-4 text-hcl-blue hover:underline font-semibold"
                            >
                                Clear Search
                            </button>
                        </motion.div>
                    )}
                </div>
            </section>
        </div>
    );
};
