import React from 'react';
import { PageHeader } from '../components/PageHeader';

const galleryImages = [
  { src: 'https://placehold.co/600x400/29ABE2/FFFFFF?text=Hackathon+Team', caption: 'Hackathon Winners 2024' },
  { src: 'https://placehold.co/600x800/008080/FFFFFF?text=Workshop+Session', caption: 'Generative AI Workshop' },
  { src: 'https://placehold.co/600x400/5F1EBE/FFFFFF?text=Tech+Talk', caption: 'Expert Tech Talk on Cloud AI' },
  { src: 'https://placehold.co/600x600/29ABE2/FFFFFF?text=Collaboration', caption: 'Collaborative Coding Session' },
  { src: 'https://placehold.co/600x400/008080/FFFFFF?text=Community+Meetup', caption: 'Community Meetup' },
  { src: 'https://placehold.co/600x800/5F1EBE/FFFFFF?text=Project+Demo', caption: 'Project Demo Day' },
];

export const GalleryPage: React.FC = () => {
    // A simple masonry-like effect with column-count. A JS library would be better for perfect masonry.
    return (
        <>
            <PageHeader title="Gallery" subtitle="A visual journey through our events, workshops, and community moments." />
            <section className="py-16 sm:py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4">
                        {galleryImages.map((image, index) => (
                            <div key={index} className="relative overflow-hidden rounded-2xl group shadow-lg break-inside-avoid">
                                <img
                                    src={image.src}
                                    alt={image.caption}
                                    className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                                    <p className="text-white font-semibold">{image.caption}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};
