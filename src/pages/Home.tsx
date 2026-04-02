import { useEffect, useState } from 'react';
import { Post } from '../types';
import PostCard from '../components/PostCard';
import Input from '../components/ui/Input';
import Spinner from '../components/ui/Spinner';
import BannerCarousel from '../components/BannerCarousel';
import Seo from '../components/Seo';
import { SITE_NAME } from '../config/site';
import { Search } from 'lucide-react';

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then((data) => {
        setPosts(data.slice(0, 9)); // Show first 9 posts
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);
        setLoading(false);
      });
  }, []);

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.body.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-12">
      <Seo
        title={SITE_NAME}
        titleIsFull
        description="Browse the latest community updates, stories, and posts. Search and explore content from our home page."
      />
      <BannerCarousel />

      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
        <div className="space-y-4">
          <h2 className="text-5xl font-bold tracking-tight sm:text-7xl">Latest Updates</h2>
          <p className="text-xl text-gray-500 max-w-2xl leading-relaxed text-justify">
            Explore the latest thoughts and updates from our community. 
            Fetched in real-time from our external API.
          </p>
        </div>
        
        <div className="w-full lg:w-80">
          <Input 
            placeholder="Search updates..."
            icon={<Search size={18} />}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="!bg-white border-gray-100 shadow-sm"
          />
        </div>
      </div>

      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center space-y-4">
          <Spinner size="lg" />
          <p className="text-gray-400 font-medium animate-pulse">Loading updates...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))
          ) : (
            <div className="col-span-full py-20 text-center space-y-4 bg-gray-50 rounded-[32px] border border-dashed border-gray-200">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto shadow-sm">
                <Search className="text-gray-300" size={24} />
              </div>
              <div className="space-y-1">
                <p className="text-xl font-bold">No updates found</p>
                <p className="text-gray-400">Try adjusting your search query</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
