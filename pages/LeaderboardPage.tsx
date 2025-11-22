
import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Crown, Trophy, Medal, ArrowUp, ChevronDown } from '../components/Icons';
// @ts-ignore
import Papa from 'papaparse';

interface MemberData {
  Rank: string;
  Name: string;
  Role: string;
  Points: string;
  Badges: string;
  Movement: string; // 'UP', 'DOWN', 'SAME'
  Avatar: string;
}

const getPodiumStyle = (rank: number) => {
    switch(rank) {
        case 1: return { 
            height: 'h-72', 
            color: 'from-yellow-300 via-yellow-500 to-amber-600', 
            glow: 'shadow-[0_0_50px_rgba(234,179,8,0.4)]',
            border: 'border-yellow-400/50',
            icon: <Crown className="w-8 h-8 text-yellow-900" />
        };
        case 2: return { 
            height: 'h-56', 
            color: 'from-slate-300 via-slate-400 to-slate-500', 
            glow: 'shadow-[0_0_50px_rgba(148,163,184,0.3)]',
            border: 'border-slate-400/50',
            icon: <Medal className="w-6 h-6 text-slate-900" />
        };
        case 3: return { 
            height: 'h-48', 
            color: 'from-orange-300 via-orange-500 to-orange-700', 
            glow: 'shadow-[0_0_50px_rgba(249,115,22,0.3)]',
            border: 'border-orange-400/50',
            icon: <Trophy className="w-6 h-6 text-orange-900" />
        };
        default: return { height: 'h-40', color: 'from-gray-700 to-gray-900', glow: '', border: '', icon: null };
    }
}

const MovementIcon: React.FC<{ type: string }> = ({ type }) => {
    if (type === 'UP') return <ArrowUp className="w-4 h-4 text-green-500" />;
    if (type === 'DOWN') return <ArrowUp className="w-4 h-4 text-red-500 rotate-180" />;
    return <div className="w-2 h-2 rounded-full bg-gray-500" />; // SAME
};

export const LeaderboardPage: React.FC = () => {
  const [members, setMembers] = useState<MemberData[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<string>('');

  useEffect(() => {
    const fetchLeaderboard = async () => {
        try {
            const response = await fetch('/leaderboard.csv');
            const csvText = await response.text();
            
            Papa.parse(csvText, {
                header: true,
                skipEmptyLines: true,
                complete: (results: { data: MemberData[] }) => {
                    // Sort by Points descending just in case CSV isn't sorted
                    const sortedData = results.data.sort((a, b) => parseInt(b.Points) - parseInt(a.Points));
                    setMembers(sortedData);
                    setLoading(false);
                    setLastUpdated(new Date().toLocaleString()); // Ideally this comes from server metadata
                },
                error: (err: any) => {
                    console.error("CSV Parse Error:", err);
                    setLoading(false);
                }
            });
        } catch (error) {
            console.error("Fetch Error:", error);
            setLoading(false);
        }
    };

    fetchLeaderboard();
  }, []);

  const topThree = members.slice(0, 3);
  const restOfMembers = members.slice(3);
  
  // Reorder for podium: 2nd, 1st, 3rd
  const podiumOrder = [topThree[1], topThree[0], topThree[2]].filter(Boolean);
  
  // Safe max score calculation
  const maxScore = topThree[0] ? parseInt(topThree[0].Points) : 1000;

  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
        {/* Cyberpunk Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)] z-0 pointer-events-none"></div>
        
        <div className="relative z-10 pt-24 pb-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-32">
                    <motion.div 
                        initial={{ opacity: 0, y: -20 }} 
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center justify-center p-2 rounded-full bg-hcl-blue/10 border border-hcl-blue/30 mb-4"
                    >
                        <Trophy className="w-4 h-4 text-hcl-blue mr-2" />
                        <span className="text-xs font-bold tracking-widest uppercase text-hcl-blue">Elite Squad</span>
                    </motion.div>
                    <h1 className="font-space-grotesk text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500 mb-4">
                        Leaderboard
                    </h1>
                    <p className="text-gray-400 max-w-lg mx-auto">
                        Recognizing the visionaries and contributors shaping the future of AI.
                    </p>
                    {!loading && (
                        <p className="text-xs text-gray-600 mt-4 font-mono">Last Updated: {lastUpdated}</p>
                    )}
                </div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-hcl-blue"></div>
                    </div>
                ) : (
                    <>
                        {/* 3D Holographic Podium */}
                        <div className="flex justify-center items-end gap-4 md:gap-8 mb-24 h-[400px]">
                            {podiumOrder.map((member, index) => {
                                const actualIndex = members.indexOf(member);
                                const rank = actualIndex + 1;
                                const style = getPodiumStyle(rank);
                                
                                return (
                                    <motion.div
                                        key={member.Name}
                                        initial={{ opacity: 0, y: 100 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.2, type: "spring", stiffness: 120, damping: 20 }}
                                        className="flex flex-col items-center group w-1/3 max-w-[180px]"
                                    >
                                        {/* Floating Avatar */}
                                        <motion.div 
                                            animate={{ y: [0, -10, 0] }}
                                            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: index }}
                                            className="relative mb-6"
                                        >
                                            <div className={`w-24 h-24 md:w-32 md:h-32 rounded-full p-1 bg-gradient-to-b ${style.color} shadow-2xl`}>
                                                <img src={member.Avatar} alt={member.Name} className="w-full h-full rounded-full object-cover border-4 border-gray-900" />
                                            </div>
                                            {/* Rank Badge */}
                                            <div className={`absolute -bottom-4 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-gradient-to-br ${style.color} flex items-center justify-center border-4 border-gray-900 shadow-lg z-20`}>
                                                {style.icon}
                                            </div>
                                            {/* Glow effect behind head */}
                                            <div className={`absolute inset-0 bg-gradient-to-b ${style.color} opacity-20 blur-3xl rounded-full -z-10`}></div>
                                        </motion.div>

                                        {/* Name & Score */}
                                        <div className="text-center mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                                            <p className="font-bold text-white text-sm md:text-base truncate w-full">{member.Name}</p>
                                            <p className="font-mono text-xs text-hcl-blue">{member.Points} PTS</p>
                                            <div className="text-xs mt-1">{member.Badges}</div>
                                        </div>

                                        {/* The Pedestal */}
                                        <div className={`w-full ${style.height} bg-gradient-to-t ${style.color} opacity-90 rounded-t-2xl relative overflow-hidden border-t border-white/20 ${style.glow}`}>
                                            {/* Shininess */}
                                            <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.2)_50%,transparent_75%)] bg-[length:250%_250%] animate-[shimmer_3s_infinite_linear]"></div>
                                            
                                            {/* Rank Number on Podium */}
                                            <div className="absolute bottom-4 w-full text-center">
                                                <span className="text-6xl font-space-grotesk font-black text-black/20">{rank}</span>
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>

                        {/* Data Strip List */}
                        <div className="max-w-5xl mx-auto space-y-4">
                            <AnimatePresence mode='popLayout'>
                                {restOfMembers.map((member, index) => {
                                    const rank = index + 4;
                                    const scorePercentage = (parseInt(member.Points) / maxScore) * 100;
                                    
                                    return (
                                        <motion.div
                                            layout
                                            key={member.Name}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            transition={{ delay: index * 0.05 }}
                                            className="relative bg-gray-800/40 backdrop-blur-md border border-white/5 rounded-xl p-4 flex items-center gap-4 group hover:border-hcl-blue/40 hover:bg-gray-800/60 transition-all duration-300"
                                        >
                                            {/* Rank Hexagon */}
                                            <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center relative">
                                                <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full text-gray-700 group-hover:text-hcl-blue transition-colors duration-300 fill-current opacity-20">
                                                    <polygon points="50 1, 95 25, 95 75, 50 99, 5 75, 5 25" />
                                                </svg>
                                                <span className="font-space-grotesk font-bold text-gray-400 group-hover:text-white relative z-10">{rank}</span>
                                            </div>

                                            {/* Avatar & Info */}
                                            <div className="flex items-center gap-4 flex-grow min-w-0">
                                                <img src={member.Avatar} alt={member.Name} className="w-10 h-10 rounded-full border border-gray-600 group-hover:border-hcl-blue transition-colors object-cover" />
                                                <div className="min-w-0">
                                                    <div className="flex items-center gap-2">
                                                        <h4 className="font-bold text-gray-200 truncate group-hover:text-white transition-colors">{member.Name}</h4>
                                                        <span className="text-xs">{member.Badges}</span>
                                                    </div>
                                                    <p className="text-xs text-gray-500 uppercase tracking-wide flex items-center gap-2">
                                                        {member.Role}
                                                        <span className="text-gray-600">|</span>
                                                        <span className="flex items-center gap-1">
                                                            <MovementIcon type={member.Movement} />
                                                        </span>
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Score Visualization */}
                                            <div className="hidden md:flex flex-col items-end w-1/3 gap-1">
                                                <div className="flex items-center gap-2 w-full justify-end">
                                                    <span className="font-mono font-bold text-lg text-white">{member.Points}</span>
                                                    <span className="text-xs text-gray-500 font-mono">PTS</span>
                                                </div>
                                                <div className="w-full h-1.5 bg-gray-700 rounded-full overflow-hidden">
                                                    <motion.div 
                                                        initial={{ width: 0 }}
                                                        animate={{ width: `${scorePercentage}%` }}
                                                        transition={{ duration: 1, delay: 0.5 }}
                                                        className="h-full bg-gradient-to-r from-hcl-blue to-tech-purple"
                                                    />
                                                </div>
                                            </div>
                                            
                                            {/* Mobile Score (Simple) */}
                                            <div className="md:hidden font-mono font-bold text-white">
                                                {member.Points}
                                            </div>

                                            {/* Hover Glow Line */}
                                            <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-hcl-blue group-hover:w-full transition-all duration-500 ease-out" />
                                        </motion.div>
                                    );
                                })}
                            </AnimatePresence>
                        </div>
                    </>
                )}
            </div>
        </div>
    </div>
  );
};
