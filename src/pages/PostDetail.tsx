import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Post, Comment } from '../types';
import { ArrowLeft, User, MessageSquare, Share2, Bookmark, Mail, Send } from 'lucide-react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Textarea from '../components/ui/Textarea';
import Spinner from '../components/ui/Spinner';

export default function PostDetail() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  
  // New comment form state
  const [showForm, setShowForm] = useState(false);
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newBody, setNewBody] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchPost = fetch(`https://jsonplaceholder.typicode.com/posts/${id}`).then(res => res.json());
    const fetchComments = fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`).then(res => res.json());

    Promise.all([fetchPost, fetchComments])
      .then(([postData, commentsData]) => {
        setPost(postData);
        setComments(commentsData);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, [id]);

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newEmail || !newBody) return;

    setIsSubmitting(true);
    
    // Mocking the API call
    setTimeout(() => {
      const newComment: Comment = {
        postId: Number(id),
        id: comments.length + 1,
        name: newName,
        email: newEmail,
        body: newBody
      };

      setComments([newComment, ...comments]);
      setNewName('');
      setNewEmail('');
      setNewBody('');
      setShowForm(false);
      setIsSubmitting(false);
    }, 800);
  };

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto py-20 flex flex-col items-center justify-center space-y-6">
        <Spinner size="lg" />
        <div className="space-y-2 text-center">
          <p className="text-xl font-bold tracking-tight">Fetching update...</p>
          <p className="text-gray-400 text-sm">Please wait while we load the content.</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="text-center py-20 space-y-4">
        <h2 className="text-2xl font-bold">Post not found</h2>
        <Link to="/" className="text-black font-bold hover:underline">Return Home</Link>
      </div>
    );
  }

  return (
    <article className="max-w-3xl mx-auto py-12 space-y-12">
      <Link 
        to="/" 
        className="inline-flex items-center space-x-2 text-sm font-bold uppercase tracking-widest text-gray-400 hover:text-black transition-colors group"
      >
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
        <span>Back to Updates</span>
      </Link>

      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-gray-400">
            <User size={14} />
            <span>Author {post.userId}</span>
          </div>
          <span className="text-gray-200">•</span>
          <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-gray-400">
            <MessageSquare size={14} />
            <span>{comments.length} Comments</span>
          </div>
        </div>
        
        <h1 className="text-5xl font-bold tracking-tight leading-tight sm:text-6xl">
          {post.title}
        </h1>
      </div>

      <div className="aspect-[16/9] bg-gray-100 rounded-[40px] overflow-hidden">
        <img 
          src={`https://picsum.photos/seed/${post.id}/1200/800`} 
          alt="Post cover" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_200px] gap-12">
        <div className="space-y-12">
          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-gray-600 leading-relaxed text-justify first-letter:text-5xl first-letter:font-bold first-letter:mr-3 first-letter:float-left">
              {post.body.repeat(5)}
            </p>
            <p className="text-gray-500 leading-relaxed mt-8 text-justify">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>

          <section className="space-y-8 pt-12 border-t border-gray-100">
            <div className="flex items-center justify-between gap-4">
              <h3 className="text-2xl font-bold tracking-tight shrink-0">Comments ({comments.length})</h3>
              <Button 
                variant={showForm ? "outline" : "secondary"} 
                className="w-auto px-6 py-2 h-auto text-[10px] shrink-0"
                onClick={() => setShowForm(!showForm)}
              >
                {showForm ? "Cancel" : "Add Comment"}
              </Button>
            </div>

            {showForm && (
              <form 
                onSubmit={handleCommentSubmit}
                className="p-10 bg-black text-white rounded-[40px] space-y-8 animate-in fade-in slide-in-from-top-4 duration-500 shadow-2xl shadow-black/20"
              >
                <div className="space-y-2">
                  <h4 className="text-2xl font-bold tracking-tight">Join the conversation</h4>
                  <p className="text-gray-400 text-sm">Share your thoughts on this update.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <Input 
                    label="Your Name"
                    placeholder="Jane Doe"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    containerClassName="space-y-3"
                    className="!bg-gray-900 !border-gray-800 !text-white focus:!bg-gray-800 focus:!border-gray-700 placeholder:text-gray-600"
                    required
                  />
                  <Input 
                    label="Email Address"
                    type="email"
                    placeholder="jane@example.com"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    containerClassName="space-y-3"
                    className="!bg-gray-900 !border-gray-800 !text-white focus:!bg-gray-800 focus:!border-gray-700 placeholder:text-gray-600"
                    required
                  />
                </div>

                <Textarea 
                  label="Comment"
                  placeholder="What's on your mind?"
                  value={newBody}
                  onChange={(e) => setNewBody(e.target.value)}
                  containerClassName="space-y-3"
                  className="!bg-gray-900 !border-gray-800 !text-white focus:!bg-gray-800 focus:!border-gray-700 placeholder:text-gray-600"
                  required
                />

                <div className="pt-4">
                  <Button 
                    type="submit" 
                    className="w-full sm:w-auto px-12 bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                    disabled={isSubmitting}
                    icon={isSubmitting ? null : <Send size={16} />}
                  >
                    {isSubmitting ? "Posting..." : "Post Comment"}
                  </Button>
                </div>
              </form>
            )}

            <div className="space-y-6">
              {comments.map((comment) => (
                <div key={comment.id} className="p-6 bg-gray-50 rounded-3xl space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-white font-bold text-xs">
                        {comment.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold leading-none">{comment.name}</h4>
                        <div className="flex items-center space-x-1 mt-1 text-gray-400">
                          <Mail size={10} />
                          <span className="text-[10px] font-medium">{comment.email}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed italic text-justify">
                    "{comment.body}"
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>

        <aside className="space-y-8">
          <div className="p-6 bg-gray-50 rounded-3xl space-y-6">
            <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400">Actions</h4>
            <div className="space-y-3">
              <Button variant="outline" icon={<Share2 size={16} />} className="w-full !justify-between px-6 py-3 h-auto">
                Share
              </Button>
              <Button variant="outline" icon={<Bookmark size={16} />} className="w-full !justify-between px-6 py-3 h-auto">
                Save
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400">Tags</h4>
            <div className="flex flex-wrap gap-2">
              {['Technology', 'Design', 'Community'].map(tag => (
                <span key={tag} className="px-3 py-1 bg-white border border-gray-100 rounded-full text-[10px] font-bold uppercase tracking-wider">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </article>
  );
}
