import React, { useState } from 'react';
import { PageHeader } from '../components/PageHeader';
import { Button } from '../components/Button';
import { ThumbsUp, MessageCircle, Share } from '../components/Icons';
import { AnimatePresence, motion } from 'framer-motion';

interface Post {
  id: number;
  author: {
    name: string;
    avatarUrl: string;
  };
  timestamp: string;
  content: string;
  likes: number;
  comments: number;
}

const initialPosts: Post[] = [
  {
    id: 1,
    author: { name: 'Aravind Kumar', avatarUrl: 'https://placehold.co/128x128/e0e0e0/333333?text=AK' },
    timestamp: '2 hours ago',
    content: 'Excited to announce our next big event: The Generative AI Bootcamp! We will be covering everything from the basics of GANs to advanced diffusion models. Who is excited?',
    likes: 15,
    comments: 4,
  },
  {
    id: 2,
    author: { name: 'Priya Rajesh', avatarUrl: 'https://placehold.co/128x128/e0e0e0/333333?text=PR' },
    timestamp: '1 day ago',
    content: 'Has anyone experimented with the new multimodal features in the Gemini API? I am working on a project that combines image and text inputs and would love to exchange ideas.',
    likes: 22,
    comments: 8,
  },
    {
    id: 3,
    author: { name: 'Karthik R', avatarUrl: 'https://placehold.co/128x128/e0e0e0/333333?text=KR' },
    timestamp: '3 days ago',
    content: 'Just pushed a new update to the NeuroLens project on our GitHub. We have improved the summarization accuracy by 12%. Check it out and let us know your feedback!',
    likes: 31,
    comments: 12,
  },
];

const PostCard: React.FC<{ post: Post }> = ({ post }) => {
  return (
    <motion.div
        layout
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5, type: 'spring' }}
        className="glass-card p-6 rounded-2xl shadow-lg"
    >
      <div className="flex items-start gap-4">
        <img src={post.author.avatarUrl} alt={post.author.name} className="w-12 h-12 rounded-full flex-shrink-0" />
        <div className="flex-grow">
          <div className="flex items-center gap-2">
            <p className="font-bold text-primary-text dark:text-white">{post.author.name}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">&bull; {post.timestamp}</p>
          </div>
          <p className="mt-2 text-gray-700 dark:text-gray-300 leading-relaxed">{post.content}</p>
        </div>
      </div>
      <div className="mt-4 pt-4 border-t border-gray-200/50 dark:border-gray-700/50 flex items-center justify-between text-gray-500 dark:text-gray-400">
        <button className="flex items-center gap-2 hover:text-hcl-blue transition-colors p-2 rounded-md -ml-2">
          <ThumbsUp className="w-5 h-5" />
          <span className="text-sm font-semibold">{post.likes}</span>
        </button>
        <button className="flex items-center gap-2 hover:text-hcl-blue transition-colors p-2 rounded-md">
          <MessageCircle className="w-5 h-5" />
          <span className="text-sm font-semibold">{post.comments}</span>
        </button>
        <button className="flex items-center gap-2 hover:text-hcl-blue transition-colors p-2 rounded-md">
          <Share className="w-5 h-5" />
          <span className="text-sm font-semibold">Share</span>
        </button>
      </div>
    </motion.div>
  );
};

export const CommunityPage: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>(initialPosts);
    const [newPostContent, setNewPostContent] = useState('');
    const [authorName, setAuthorName] = useState('');

    const handlePostSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(!newPostContent.trim() || !authorName.trim()) return;

        const initials = authorName.split(' ').map(n => n[0]).join('').toUpperCase() || '??';

        const newPost: Post = {
            id: Date.now(),
            author: { 
                name: authorName, 
                avatarUrl: `https://placehold.co/128x128/333333/FFFFFF?text=${initials}` 
            },
            timestamp: 'Just now',
            content: newPostContent,
            likes: 0,
            comments: 0,
        };
        setPosts([newPost, ...posts]);
        setNewPostContent('');
        setAuthorName('');
    };

  return (
    <>
      <PageHeader title="Community Hub" subtitle="Engage in discussions, share ideas, and collaborate with fellow AI enthusiasts." />
      <section className="py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl">
            {/* New Post Form */}
            <div className="mb-12">
                <form onSubmit={handlePostSubmit} className="glass-card p-6 rounded-2xl shadow-lg space-y-4">
                    <input
                        type="text"
                        value={authorName}
                        onChange={(e) => setAuthorName(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-transparent focus:outline-none focus:ring-2 focus:ring-hcl-blue transition text-primary-text dark:text-gray-200"
                        placeholder="Your Name"
                    />
                    <textarea
                        value={newPostContent}
                        onChange={(e) => setNewPostContent(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-transparent focus:outline-none focus:ring-2 focus:ring-hcl-blue transition text-primary-text dark:text-gray-200"
                        rows={3}
                        placeholder="What's on your mind? Share an update or ask a question..."
                    />
                    <div className="text-right">
                        <Button type="submit" disabled={!newPostContent.trim() || !authorName.trim()}>Post</Button>
                    </div>
                </form>
            </div>
          
            {/* Posts Feed */}
            <div className="space-y-8">
                <AnimatePresence>
                    {posts.map(post => (
                        <PostCard key={post.id} post={post} />
                    ))}
                </AnimatePresence>
            </div>
        </div>
      </section>
    </>
  );
};