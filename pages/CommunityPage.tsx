
import React, { useState, useEffect, useRef } from 'react';
import { PageHeader } from '../components/PageHeader';
import { Button } from '../components/Button';
import { ThumbsUp, MessageCircle, Share, Settings, Send, X } from '../components/Icons';
import { AnimatePresence, motion } from 'framer-motion';
// @ts-ignore
import Papa from 'papaparse';

// ----- Types -----
interface Comment {
  id: number;
  authorName: string;
  content: string;
  timestamp: string;
}

interface Post {
  id: number;
  author: {
    name: string;
    avatarUrl: string;
  };
  timestamp: string;
  content: string;
  likes: number;
  commentsCount: number;
  commentsData: Comment[]; // New field to store actual comments
}

// ----- Components -----

const CommentSection: React.FC<{ 
    postId: number; 
    comments: Comment[]; 
    onAddComment: (postId: number, text: string) => void;
    onClose: () => void;
}> = ({ postId, comments, onAddComment, onClose }) => {
    const [text, setText] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!text.trim()) return;
        onAddComment(postId, text);
        setText('');
    };

    return (
        <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 border border-gray-100 dark:border-gray-700"
        >
            <div className="flex justify-between items-center mb-4">
                <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wide">Discussion</h4>
                <button onClick={onClose} className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full">
                    <X className="w-4 h-4" />
                </button>
            </div>

            <div className="space-y-3 mb-4 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                {comments.length === 0 && (
                    <p className="text-sm text-gray-400 italic text-center py-2">No comments yet. Be the first!</p>
                )}
                {comments.map(comment => (
                    <div key={comment.id} className="text-sm">
                        <div className="flex items-center gap-2 mb-1">
                            <span className="font-bold text-primary-text dark:text-gray-200">{comment.authorName}</span>
                            <span className="text-xs text-gray-400">{comment.timestamp}</span>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300">{comment.content}</p>
                    </div>
                ))}
            </div>

            <form onSubmit={handleSubmit} className="relative">
                <input 
                    type="text" 
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Write a comment..." 
                    className="w-full pl-4 pr-12 py-3 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-hcl-blue"
                />
                <button 
                    type="submit" 
                    disabled={!text.trim()}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-hcl-blue text-white rounded-lg disabled:opacity-50 disabled:bg-gray-400 hover:bg-hcl-teal transition-colors"
                >
                    <Send className="w-4 h-4" />
                </button>
            </form>
        </motion.div>
    );
};

const PostCard: React.FC<{ 
    post: Post; 
    onLike: (id: number) => void; 
    onShare: (content: string) => void;
    onAddComment: (postId: number, text: string) => void;
}> = ({ post, onLike, onShare, onAddComment }) => {
  const [showComments, setShowComments] = useState(false);

  return (
    <motion.div
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-6 rounded-2xl shadow-lg border-l-4 border-l-transparent hover:border-l-hcl-blue transition-all duration-300"
    >
      <div className="flex items-start gap-4">
        <img src={post.author.avatarUrl} alt={post.author.name} className="w-12 h-12 rounded-full flex-shrink-0 object-cover ring-2 ring-gray-100 dark:ring-gray-700" />
        <div className="flex-grow">
          <div className="flex items-center gap-2">
            <p className="font-bold text-primary-text dark:text-white font-space-grotesk">{post.author.name}</p>
            <span className="text-xs text-gray-400">&bull;</span>
            <p className="text-xs text-gray-500 dark:text-gray-400">{post.timestamp}</p>
          </div>
          <p className="mt-3 text-gray-700 dark:text-gray-300 leading-relaxed text-base">{post.content}</p>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200/50 dark:border-gray-700/50 flex items-center justify-between">
        <div className="flex gap-4">
            <button 
                onClick={() => onLike(post.id)}
                className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-hcl-blue dark:hover:text-hcl-blue transition-colors group"
            >
            <ThumbsUp className="w-5 h-5 group-active:scale-125 transition-transform" />
            <span className="text-sm font-semibold">{post.likes}</span>
            </button>
            <button 
                onClick={() => setShowComments(!showComments)}
                className={`flex items-center gap-2 transition-colors ${showComments ? 'text-hcl-blue' : 'text-gray-500 dark:text-gray-400 hover:text-hcl-blue'}`}
            >
            <MessageCircle className="w-5 h-5" />
            <span className="text-sm font-semibold">{post.commentsData?.length || post.commentsCount}</span>
            </button>
        </div>
        <button 
            onClick={() => onShare(post.content)}
            className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-hcl-blue transition-colors"
        >
          <span className="text-sm font-semibold">Share</span>
          <Share className="w-5 h-5" />
        </button>
      </div>

      <AnimatePresence>
        {showComments && (
            <CommentSection 
                postId={post.id} 
                comments={post.commentsData || []} 
                onAddComment={onAddComment}
                onClose={() => setShowComments(false)}
            />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export const CommunityPage: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [newPostContent, setNewPostContent] = useState('');
    const [authorName, setAuthorName] = useState('');
    const [loading, setLoading] = useState(true);
    const [showAdmin, setShowAdmin] = useState(false);
    
    // Admin Stats
    const totalPosts = posts.length;
    const totalLikes = posts.reduce((acc, curr) => acc + curr.likes, 0);

    const loadData = async () => {
        try {
            // Fetch Latest CSV Data
            const response = await fetch('/community_posts.csv', { cache: 'no-cache' });
            if (!response.ok) throw new Error('Failed to fetch CSV');
            const csvText = await response.text();
            
            Papa.parse(csvText, {
                header: true,
                skipEmptyLines: true,
                complete: (results: { data: any[] }) => {
                    // Parse CSV Posts
                    const serverPosts: Post[] = results.data.map((row: any) => {
                        let parsedComments = [];
                        try {
                            parsedComments = row.commentsData ? JSON.parse(row.commentsData) : [];
                        } catch (e) { parsedComments = []; }

                        return {
                            id: parseInt(row.id),
                            author: {
                                name: row.authorName,
                                avatarUrl: row.authorAvatar
                            },
                            timestamp: row.timestamp,
                            content: row.content,
                            likes: parseInt(row.likes) || 0,
                            commentsCount: parseInt(row.commentsCount) || 0,
                            commentsData: parsedComments
                        };
                    });

                    // Merge with Local Storage (User's unsaved posts)
                    const localData = localStorage.getItem('local_community_posts');
                    let localPosts: Post[] = [];
                    if (localData) {
                        localPosts = JSON.parse(localData);
                    }

                    // Simple merge: If ID doesn't exist in Server, it's a new Local post
                    const serverIds = new Set(serverPosts.map(p => p.id));
                    const newLocalPosts = localPosts.filter(p => !serverIds.has(p.id));
                    
                    // Combine and Sort
                    const mergedPosts = [...newLocalPosts, ...serverPosts].sort((a, b) => b.id - a.id);
                    setPosts(mergedPosts);
                    setLoading(false);
                }
            });
        } catch (error) {
            console.error("Error loading posts:", error);
            setLoading(false);
        }
    };

    // Initial Load & Auto-Polling
    useEffect(() => {
        loadData();
        // Poll every 10 seconds to simulate real-time updates from server CSV
        const interval = setInterval(loadData, 10000); 
        return () => clearInterval(interval);
    }, []);

    const saveToLocal = (updatedPosts: Post[]) => {
        // Save ONLY the posts that are created by THIS user session (mock logic)
        // In reality, we just dump the whole state to local to persist user changes
        // until they export and admin merges.
        localStorage.setItem('local_community_posts', JSON.stringify(updatedPosts));
    };

    const handlePostSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(!newPostContent.trim() || !authorName.trim()) return;

        const initials = authorName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0,2) || '??';

        const newPost: Post = {
            id: Date.now(),
            author: { 
                name: authorName, 
                avatarUrl: `https://placehold.co/128x128/333333/FFFFFF?text=${initials}` 
            },
            timestamp: 'Just now',
            content: newPostContent,
            likes: 0,
            commentsCount: 0,
            commentsData: []
        };
        
        const updatedPosts = [newPost, ...posts];
        setPosts(updatedPosts);
        saveToLocal(updatedPosts);
        setNewPostContent('');
    };

    const handleLike = (id: number) => {
        const updatedPosts = posts.map(post => 
            post.id === id ? { ...post, likes: post.likes + 1 } : post
        );
        setPosts(updatedPosts);
        saveToLocal(updatedPosts);
    };

    const handleAddComment = (postId: number, text: string) => {
        const updatedPosts = posts.map(post => {
            if (post.id === postId) {
                const newComment: Comment = {
                    id: Date.now(),
                    authorName: authorName || 'Anonymous', // Fallback if they haven't typed name in top box
                    content: text,
                    timestamp: 'Just now'
                };
                return {
                    ...post,
                    commentsCount: post.commentsCount + 1,
                    commentsData: [newComment, ...(post.commentsData || [])]
                };
            }
            return post;
        });
        setPosts(updatedPosts);
        saveToLocal(updatedPosts);
    };

    const handleShare = (content: string) => {
        navigator.clipboard.writeText(content).then(() => {
            alert("Post content copied to clipboard!");
        });
    };

    const handleAdminExport = () => {
        // Format data back to CSV structure suitable for public/community_posts.csv
        const csvData = posts.map(post => ({
            id: post.id,
            authorName: post.author.name,
            authorAvatar: post.author.avatarUrl,
            timestamp: post.timestamp,
            content: post.content,
            likes: post.likes,
            commentsCount: post.commentsCount,
            commentsData: JSON.stringify(post.commentsData || []) // Serialize array
        }));

        const csv = Papa.unparse(csvData);
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', 'community_posts.csv'); // Name it correctly for easy replacement
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

  return (
    <>
      <PageHeader title="Community Hub" subtitle="Engage in discussions, share ideas, and collaborate with fellow AI enthusiasts." />
      
      <section className="py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl relative">
            
            {/* New Post Form */}
            <div className="mb-12 relative z-20">
                <form onSubmit={handlePostSubmit} className="glass-card p-6 rounded-3xl shadow-xl space-y-4 border border-white/20">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-hcl-blue to-tech-purple flex items-center justify-center text-white font-bold">
                           {authorName ? authorName[0].toUpperCase() : '?'}
                        </div>
                        <input
                            type="text"
                            value={authorName}
                            onChange={(e) => setAuthorName(e.target.value)}
                            className="flex-grow bg-transparent border-none focus:outline-none text-lg font-space-grotesk font-bold placeholder-gray-400 text-primary-text dark:text-white"
                            placeholder="Your Name"
                        />
                    </div>
                    <div className="h-px w-full bg-gray-200 dark:bg-gray-700"></div>
                    <textarea
                        value={newPostContent}
                        onChange={(e) => setNewPostContent(e.target.value)}
                        className="w-full bg-transparent border-none focus:outline-none text-base resize-none placeholder-gray-400 text-gray-700 dark:text-gray-200"
                        rows={3}
                        placeholder="What's on your mind? Share an update, idea, or question..."
                    />
                    <div className="flex justify-between items-center pt-2">
                        <p className="text-xs text-gray-400">Updates are saved locally until Admin sync.</p>
                        <Button type="submit" disabled={!newPostContent.trim() || !authorName.trim()} className="rounded-full px-6">
                            Post Update
                        </Button>
                    </div>
                </form>
            </div>
          
            {/* Posts Feed */}
            <div className="space-y-8 relative z-10">
                {loading ? (
                     <div className="flex justify-center py-10">
                        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-hcl-blue"></div>
                    </div>
                ) : (
                    <AnimatePresence mode='popLayout'>
                        {posts.map(post => (
                            <PostCard 
                                key={post.id} 
                                post={post} 
                                onLike={handleLike}
                                onShare={handleShare}
                                onAddComment={handleAddComment}
                            />
                        ))}
                    </AnimatePresence>
                )}
            </div>

            {/* Admin Floating Action Button */}
            <div className="fixed bottom-20 left-5 z-40">
                <AnimatePresence>
                    {showAdmin && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, x: -20 }}
                            animate={{ opacity: 1, scale: 1, x: 0 }}
                            exit={{ opacity: 0, scale: 0.9, x: -20 }}
                            className="absolute bottom-16 left-0 mb-2 w-72 glass-card p-4 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 backdrop-blur-xl"
                        >
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="font-space-grotesk font-bold text-primary-text dark:text-white">Admin Dashboard</h3>
                                <div className="flex items-center gap-2">
                                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                                    <span className="text-[10px] uppercase text-gray-500 font-bold">Live Sync</span>
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-2 mb-4">
                                <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded-lg text-center">
                                    <p className="text-xl font-bold text-hcl-blue">{totalPosts}</p>
                                    <p className="text-[10px] text-gray-500 uppercase">Total Posts</p>
                                </div>
                                <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded-lg text-center">
                                    <p className="text-xl font-bold text-tech-purple">{totalLikes}</p>
                                    <p className="text-[10px] text-gray-500 uppercase">Total Likes</p>
                                </div>
                            </div>

                            <p className="text-xs text-gray-500 mb-3">
                                To publish changes to all users, download the updated CSV and replace the file in your project's <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">public/</code> folder.
                            </p>

                            <button 
                                onClick={handleAdminExport}
                                className="w-full flex items-center justify-center gap-2 bg-primary-text dark:bg-white text-white dark:text-black py-2 rounded-xl text-sm font-bold hover:scale-105 transition-transform"
                            >
                                <Settings className="w-4 h-4" />
                                Export Master CSV
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
                
                <button 
                    onClick={() => setShowAdmin(!showAdmin)}
                    className={`p-3 rounded-full shadow-lg transition-all duration-300 ${showAdmin ? 'bg-gray-200 text-gray-800' : 'bg-white dark:bg-gray-800 text-gray-500 hover:text-hcl-blue'}`}
                    title="Admin Tools"
                >
                    <Settings className={`w-6 h-6 ${showAdmin ? 'animate-spin' : ''}`} />
                </button>
            </div>

        </div>
      </section>
    </>
  );
};
