import React, { useState, useMemo } from 'react';
import { PageHeader } from '../components/PageHeader';
import { motion, AnimatePresence } from 'framer-motion';
import { Crown } from '../components/Icons';

type Category = 'Overall Points' | 'Project Contributions' | 'Community Help';

interface MemberData {
  id: number;
  name: string;
  avatarUrl: string;
  scores: {
    'Overall Points': number;
    'Project Contributions': number;
    'Community Help': number;
  };
}

const leaderboardData: MemberData[] = [
  { id: 1, name: 'Aravind Kumar', avatarUrl: 'https://placehold.co/128x128/e0e0e0/333333?text=AK', scores: { 'Overall Points': 2450, 'Project Contributions': 1200, 'Community Help': 500 } },
  { id: 2, name: 'Priya Rajesh', avatarUrl: 'https://placehold.co/128x128/e0e0e0/333333?text=PR', scores: { 'Overall Points': 2200, 'Project Contributions': 950, 'Community Help': 800 } },
  { id: 3, name: 'Karthik R', avatarUrl: 'https://placehold.co/128x128/e0e0e0/333333?text=KR', scores: { 'Overall Points': 2600, 'Project Contributions': 1500, 'Community Help': 400 } },
  { id: 4, name: 'Nivetha M', avatarUrl: 'https://placehold.co/128x128/e0e0e0/333333?text=NM', scores: { 'Overall Points': 1950, 'Project Contributions': 800, 'Community Help': 650 } },
  { id: 5, name: 'Suresh P', avatarUrl: 'https://placehold.co/128x128/e0e0e0/333333?text=SP', scores: { 'Overall Points': 1800, 'Project Contributions': 700, 'Community Help': 700 } },
  { id: 6, name: 'Anitha J', avatarUrl: 'https://placehold.co/128x128/e0e0e0/333333?text=AJ', scores: { 'Overall Points': 1750, 'Project Contributions': 650, 'Community Help': 750 } },
  { id: 7, name: 'Member One', avatarUrl: 'https://placehold.co/128x128/e0e0e0/333333?text=M1', scores: { 'Overall Points': 1500, 'Project Contributions': 500, 'Community Help': 600 } },
  { id: 8, name: 'Member Two', avatarUrl: 'https://placehold.co/128x128/e0e0e0/333333?text=M2', scores: { 'Overall Points': 1400, 'Project Contributions': 450, 'Community Help': 550 } },
  { id: 9, name: 'Member Three', avatarUrl: 'https://placehold.co/128x128/e0e0e0/333333?text=M3', scores: { 'Overall Points': 1250, 'Project Contributions': 400, 'Community Help': 500 } },
  { id: 10, name: 'Member Four', avatarUrl: 'https://placehold.co/128x128/e0e0e0/333333?text=M4', scores: { 'Overall Points': 1100, 'Project Contributions': 350, 'Community Help': 450 } },
];

const filters: Category[] = ['Overall Points', 'Project Contributions', 'Community Help'];

export const LeaderboardPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<Category>('Community Help');

  const sortedMembers = useMemo(() => {
    return [...leaderboardData].sort((a, b) => b.scores[activeFilter] - a.scores[activeFilter]);
  }, [activeFilter]);

  const topThree = sortedMembers.slice(0, 3);
  const restOfMembers = sortedMembers.slice(3);

  const podiumOrder = [topThree[1], topThree[0], topThree[2]].filter(Boolean); // 2nd, 1st, 3rd

  const podiumStyles = [
    { rank: 2, height: 'h-48', color: 'bg-slate-300 dark:bg-slate-400', shadow: 'shadow-slate-400/30' },
    { rank: 1, height: 'h-64', color: 'bg-yellow-400 dark:bg-yellow-500', shadow: 'shadow-yellow-400/30' },
    { rank: 3, height: 'h-40', color: 'bg-amber-500 dark:bg-amber-600', shadow: 'shadow-amber-600/30' },
  ];

  return (
    <>
      <PageHeader title="Club Leaderboard" subtitle="Recognizing the top contributors and innovators in our community." />

      <section className="py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter Buttons */}
          <div className="flex justify-center flex-wrap gap-4 mb-48">
            {filters.map(filter => (
              <div key={filter} className="relative pt-4">
                {filter === 'Project Contributions' && (
                  <Crown className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-6 text-yellow-500" />
                )}
                <button
                  onClick={() => setActiveFilter(filter)}
                  className={`px-6 py-2 font-semibold rounded-full text-md transition-all duration-300 transform hover:scale-105 ${
                    activeFilter === filter
                      ? 'bg-hcl-blue text-white shadow-lg'
                      : 'bg-white dark:bg-gray-700 text-secondary-text dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
                  }`}
                >
                  {filter}
                </button>
              </div>
            ))}
          </div>

          {/* Podium Section */}
          <div className="relative flex justify-center items-end gap-4 max-w-2xl mx-auto mb-20 h-80">
            {podiumOrder.map((member, index) => {
              if (!member) return null;
              const style = podiumStyles[index];
              return (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 100 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2, type: 'spring', stiffness: 100 }}
                  className="w-1/3 flex flex-col items-center"
                >
                  <div className="relative mb-2">
                    <img src={member.avatarUrl} alt={member.name} className="w-24 h-24 bg-gray-200 rounded-full border-2 border-white dark:border-gray-800 shadow-lg" />
                    {style.rank === 1 && (
                      <motion.div
                        initial={{ scale: 0, rotate: -45 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: 0.8, type: 'spring', stiffness: 200 }}
                        className="absolute -top-4 -left-4 text-yellow-400"
                      >
                        <Crown className="w-8 h-8" />
                      </motion.div>
                    )}
                  </div>
                  <p className="font-bold text-lg text-primary-text dark:text-white truncate">{member.name}</p>
                  <p className="font-space-grotesk font-semibold text-xl text-hcl-blue">{member.scores[activeFilter].toLocaleString()}</p>
                  <div className={`w-full ${style.height} ${style.color} rounded-t-2xl flex items-center justify-center text-5xl font-bold text-white/60 shadow-2xl ${style.shadow}`}>
                    {style.rank}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Leaderboard List */}
          <div className="max-w-4xl mx-auto">
            <AnimatePresence>
            {restOfMembers.map((member, index) => (
              <motion.div
                key={member.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="grid grid-cols-12 items-center gap-4 p-4 mb-3 glass-card rounded-xl hover:bg-hcl-blue/5 dark:hover:bg-hcl-blue/10 transition-colors duration-200"
              >
                <div className="col-span-1 text-center font-bold text-lg text-gray-500 dark:text-gray-400">{index + 4}</div>
                <div className="col-span-6 md:col-span-5 flex items-center gap-4">
                  <img src={member.avatarUrl} alt={member.name} className="w-10 h-10 rounded-full" />
                  <span className="font-semibold text-primary-text dark:text-white truncate">{member.name}</span>
                </div>
                <div className="col-span-5 md:col-span-6 text-right font-space-grotesk font-bold text-xl gradient-text from-hcl-blue to-hcl-teal">
                  {member.scores[activeFilter].toLocaleString()}
                  <span className="text-sm text-gray-400 ml-1">pts</span>
                </div>
              </motion.div>
            ))}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </>
  );
};