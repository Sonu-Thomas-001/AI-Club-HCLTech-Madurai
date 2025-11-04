import React, { useState, useEffect } from 'react';
import { PageHeader } from '../components/PageHeader';
import { AnimatePresence, motion } from 'framer-motion';
import { Play, Maximize, X } from '../components/Icons';

type MediaType = 'Photo' | 'Video' | 'Poster';

interface GalleryItem {
  id: number;
  type: MediaType;
  src: string;
  thumbnail: string;
  caption: string;
}

const galleryItems: GalleryItem[] = [
  { id: 1, type: 'Photo', src: 'https://placehold.co/1280x720/29ABE2/FFFFFF?text=Hackathon+Team', thumbnail: 'https://placehold.co/600x400/29ABE2/FFFFFF?text=Hackathon+Team', caption: 'Hackathon Winners 2024' },
  { id: 2, type: 'Video', src: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1', thumbnail: 'https://placehold.co/600x800/008080/FFFFFF?text=Workshop+Session', caption: 'Generative AI Workshop Highlights' },
  { id: 3, type: 'Poster', src: 'https://placehold.co/800x1200/5F1EBE/FFFFFF?text=Tech+Talk+Poster', thumbnail: 'https://placehold.co/600x800/5F1EBE/FFFFFF?text=Tech+Talk', caption: 'Poster for Expert Tech Talk on Cloud AI' },
  { id: 4, type: 'Photo', src: 'https://placehold.co/1280x800/29ABE2/FFFFFF?text=Collaboration', thumbnail: 'https://placehold.co/600x600/29ABE2/FFFFFF?text=Collaboration', caption: 'Collaborative Coding Session' },
  { id: 5, type: 'Photo', src: 'https://placehold.co/1280x720/008080/FFFFFF?text=Community+Meetup', thumbnail: 'https://placehold.co/600x400/008080/FFFFFF?text=Community+Meetup', caption: 'Our quarterly community meetup' },
  { id: 6, type: 'Video', src: 'https://www.youtube.com/embed/videoseries?list=PLx0sYbCqOb8TBPRdmBHs5Iftvv9TPboYG&autoplay=1', thumbnail: 'https://placehold.co/600x800/5F1EBE/FFFFFF?text=Project+Demo', caption: 'Project Demo Day Reel' },
  { id: 7, type: 'Poster', src: 'https://placehold.co/800x1200/e0e0e0/333333?text=Join+Us+Poster', thumbnail: 'https://placehold.co/600x800/e0e0e0/333333?text=Join+Us', caption: 'Membership Drive Poster' },
  { id: 8, type: 'Photo', src: 'https://placehold.co/1280x720/29ABE2/FFFFFF?text=Another+Photo', thumbnail: 'https://placehold.co/600x400/29ABE2/FFFFFF?text=Photo', caption: 'A cool photo from an event.' },
];

const filters: ('All' | MediaType)[] = ['All', 'Photo', 'Video', 'Poster'];

const Lightbox: React.FC<{ 
    item: GalleryItem; 
    onClose: () => void; 
    onNext: () => void;
    onPrev: () => void;
}> = ({ item, onClose, onNext, onPrev }) => {
    
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowRight') onNext();
            if (e.key === 'ArrowLeft') onPrev();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose, onNext, onPrev]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
            <motion.div 
              layoutId={`gallery-item-${item.id}`}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl h-full max-h-[80vh] flex flex-col items-center justify-center"
            >
                {item.type === 'Video' ? (
                    <iframe 
                        src={item.src}
                        className="w-full h-full rounded-lg"
                        frameBorder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowFullScreen
                        title={item.caption}
                    ></iframe>
                ) : (
                    <img src={item.src} alt={item.caption} className="max-w-full max-h-full object-contain rounded-lg" />
                )}
                <p className="text-white mt-4 text-center">{item.caption}</p>
            </motion.div>

            <button onClick={onClose} className="absolute top-4 right-4 text-white text-2xl p-2 rounded-full bg-black/30 hover:bg-black/60" aria-label="Close">
              <X className="w-6 h-6" />
            </button>
            <button onClick={onPrev} className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-2xl p-2 rounded-full bg-black/30 hover:bg-black/60" aria-label="Previous">
              &#8592;
            </button>
            <button onClick={onNext} className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-2xl p-2 rounded-full bg-black/30 hover:bg-black/60" aria-label="Next">
              &#8594;
            </button>
        </motion.div>
    );
};


export const GalleryPage: React.FC = () => {
    const [activeFilter, setActiveFilter] = useState<'All' | MediaType>('All');
    const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

    const filteredItems = activeFilter === 'All'
        ? galleryItems
        : galleryItems.filter(item => item.type === activeFilter);
        
    const openLightbox = (item: GalleryItem) => setSelectedItem(item);
    const closeLightbox = () => setSelectedItem(null);

    const handleNext = () => {
        if (!selectedItem) return;
        const currentIndex = filteredItems.findIndex(item => item.id === selectedItem.id);
        const nextIndex = (currentIndex + 1) % filteredItems.length;
        setSelectedItem(filteredItems[nextIndex]);
    };
    
    const handlePrev = () => {
        if (!selectedItem) return;
        const currentIndex = filteredItems.findIndex(item => item.id === selectedItem.id);
        const prevIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
        setSelectedItem(filteredItems[prevIndex]);
    };

    return (
        <>
            <PageHeader title="Media Gallery" subtitle="A visual journey through our events, workshops, and community moments." />
            <section className="py-16 sm:py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Filter Buttons */}
                    <div className="flex justify-center flex-wrap gap-4 mb-12">
                        {filters.map(filter => (
                            <button
                                key={filter}
                                onClick={() => setActiveFilter(filter)}
                                className={`px-6 py-2 font-semibold rounded-full text-md transition-all duration-300 transform hover:scale-105 ${
                                    activeFilter === filter
                                    ? 'bg-hcl-blue text-white shadow-md'
                                    : 'bg-white dark:bg-gray-700 text-secondary-text dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
                                }`}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>

                    {/* Gallery Grid */}
                    <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        <AnimatePresence>
                            {filteredItems.map(item => (
                                <motion.div
                                    layout
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                                    key={item.id}
                                    className="relative overflow-hidden rounded-2xl group shadow-lg cursor-pointer aspect-w-1 aspect-h-1"
                                    onClick={() => openLightbox(item)}
                                >
                                    <motion.img
                                        layoutId={`gallery-item-${item.id}`}
                                        src={item.thumbnail}
                                        alt={item.caption}
                                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        {item.type === 'Video' 
                                            ? <Play className="w-12 h-12 text-white" /> 
                                            : <Maximize className="w-12 h-12 text-white" />}
                                    </div>
                                    <div className="absolute bottom-0 left-0 p-2 bg-gradient-to-t from-black/60 to-transparent w-full">
                                        <p className="text-white text-sm font-semibold truncate">{item.caption}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </section>
            
            <AnimatePresence>
                {selectedItem && (
                    <Lightbox 
                        item={selectedItem} 
                        onClose={closeLightbox}
                        onNext={handleNext}
                        onPrev={handlePrev}
                    />
                )}
            </AnimatePresence>
        </>
    );
};