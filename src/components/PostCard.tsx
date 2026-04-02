import React from 'react';
import { Post } from '../types';
import { MessageSquare, User, ArrowRight } from 'lucide-react';

import { Link } from 'react-router-dom';

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <Link to={`/posts/${post.id}`} className="block group h-full">
      <article 
        className="h-full border border-gray-100 rounded-[32px] bg-white hover:border-black transition-all duration-300 flex flex-col sm:flex-row overflow-hidden group"
      >
        <div className="flex-1 p-8 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-widest text-gray-400">
              <User size={12} />
              <span>Author {post.userId}</span>
            </div>
            <h3 className="text-2xl font-bold leading-tight group-hover:underline decoration-2 underline-offset-4 tracking-tight">
              {post.title}
            </h3>
            <p className="text-gray-500 line-clamp-2 text-sm leading-relaxed text-justify">
              {post.body}
            </p>
          </div>
          
          <div className="flex items-center justify-between pt-4 border-t border-gray-50">
            <div className="flex items-center space-x-2 text-gray-400">
              <MessageSquare size={14} />
              <span className="text-[10px] font-bold uppercase tracking-widest">12 Comments</span>
            </div>
            <div className="p-2 bg-gray-50 rounded-full group-hover:bg-black group-hover:text-white transition-colors">
              <ArrowRight size={14} />
            </div>
          </div>
        </div>
        
        <div className="w-full sm:w-2/5 min-h-[200px] relative overflow-hidden">
          <img 
            src={`https://picsum.photos/seed/${post.id}/800/800`} 
            alt={post.title}
            className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
            referrerPolicy="no-referrer"
          />
        </div>
      </article>
    </Link>
  );
};

export default PostCard;
