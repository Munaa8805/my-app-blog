import { Link } from 'react-router-dom';
import { useWishlist } from '../contexts/WishlistContext';
import { Heart } from 'lucide-react';
import WishlistItem from '../components/WishlistItem';
import Seo from '../components/Seo';

export default function Wishlist() {
  const { wishlist, removeFromWishlist } = useWishlist();

  return (
    <div className="space-y-8">
      <Seo
        title="Wishlist"
        description="Products you have saved for later."
        noindex
      />
      <div className="space-y-2">
        <h2 className="text-4xl font-bold tracking-tight">My Wishlist</h2>
        <p className="text-gray-500">Items you've saved for later.</p>
      </div>

      {wishlist.length === 0 ? (
        <div className="text-center py-20 border-2 border-dashed border-gray-100 rounded-3xl space-y-4">
          <Heart size={48} className="mx-auto text-gray-200" />
          <p className="text-gray-500">Your wishlist is empty.</p>
          <Link 
            to="/products" 
            className="inline-block px-6 py-2 bg-black text-white rounded-xl font-medium hover:bg-gray-800 transition-colors"
          >
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {wishlist.map((product) => (
            <WishlistItem 
              key={product.id} 
              product={product} 
              onRemove={removeFromWishlist} 
            />
          ))}
        </div>
      )}
    </div>
  );
}
