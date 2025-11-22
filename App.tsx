
import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HomePage } from './components/HomePage';
import { Footer } from './components/Footer';
import { AboutPage } from './pages/AboutPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { JoinUsPage } from './pages/JoinUsPage';
import { ContactPage } from './pages/ContactPage';
import { EventsPage } from './pages/EventsPage';
import { LearnPage } from './pages/LearnPage';
import { MembersPage } from './pages/MembersPage';
import { GalleryPage } from './pages/GalleryPage';
import { PortalPage } from './pages/PortalPage';
import { NewsPage } from './pages/NewsPage';
import { FAQPage } from './pages/FAQPage';
import { CommunityPage } from './pages/CommunityPage';
import { PartnerPage } from './pages/PartnerPage';
import { LeaderboardPage } from './pages/LeaderboardPage';
import { BackToTopButton } from './components/BackToTopButton';
import { ChatbotIcon } from './components/ChatbotIcon';
import { AIAssistant } from './components/AIAssistant';
import { CustomCursor } from './components/CustomCursor';
import { ScrollProgress } from './components/ScrollProgress';
import { Preloader } from './components/Preloader';
import { AnimatePresence } from 'framer-motion';
import { ThemeContext } from './contexts/ThemeContext';

const routes: { [key: string]: React.ComponentType } = {
  '/': HomePage,
  '/about': AboutPage,
  '/projects': ProjectsPage,
  '/events': EventsPage,
  '/learn': LearnPage,
  '/members': MembersPage,
  '/gallery': GalleryPage,
  '/community': CommunityPage,
  '/contact': ContactPage,
  '/portal': PortalPage,
  '/join': JoinUsPage,
  '/news': NewsPage,
  '/faq': FAQPage,
  '/partner': PartnerPage,
  '/leaderboard': LeaderboardPage,
};

const App: React.FC = () => {
  const [currentPath, setCurrentPath] = useState(window.location.hash.slice(1) || '/');
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);
  
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const toggleAssistant = () => {
    setIsAssistantOpen(!isAssistantOpen);
  };

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentPath(window.location.hash.slice(1) || '/');
      window.scrollTo(0, 0);
    };

    window.addEventListener('hashchange', handleHashChange);
    // Set initial path
    handleHashChange();
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const CurrentPage = routes[currentPath] || HomePage; // Fallback to HomePage

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
       <AnimatePresence mode='wait'>
        {loading ? (
          <Preloader key="preloader" onComplete={() => setLoading(false)} />
        ) : (
          <div key="app" className="min-h-screen bg-white dark:bg-gray-900 flex flex-col transition-colors duration-500 relative">
            {/* Global Noise Texture */}
            <div className="bg-noise"></div>
            
            <CustomCursor />
            <ScrollProgress />
            <Header />
            <main className="flex-grow relative z-10">
              <CurrentPage />
            </main>
            <Footer />
            <BackToTopButton />
            <ChatbotIcon onClick={toggleAssistant} />
            <AnimatePresence>
              {isAssistantOpen && <AIAssistant onClose={toggleAssistant} />}
            </AnimatePresence>
          </div>
        )}
      </AnimatePresence>
    </ThemeContext.Provider>
  );
};

export default App;
