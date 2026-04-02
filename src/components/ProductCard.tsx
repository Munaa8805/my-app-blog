import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { Product } from '../types';
import { useWishlist } from '../contexts/WishlistContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { toggleWishlist, isInWishlist } = useWishlist();
  const isFavorite = isInWishlist(product.id);

  return (
    <div className="group relative space-y-4">
      <Link 
        to={`/products/${product.id}`}
        className="block"
      >
        <div className="aspect-square bg-gray-100 rounded-2xl overflow-hidden">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            referrerPolicy="no-referrer"
          />
        </div>
      </Link>
      
      <button 
        onClick={(e) => {
          e.preventDefault();
          toggleWishlist(product);
        }}
        className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-sm transition-all shadow-sm ${
          isFavorite 
            ? 'bg-red-500 text-white' 
            : 'bg-white/80 text-gray-400 hover:text-red-500'
        }`}
      >
        <Heart size={18} fill={isFavorite ? "currentColor" : "none"} />
      </button>

      <div className="space-y-1">
        <Link to={`/products/${product.id}`} className="hover:underline">
          <h3 className="font-semibold text-gray-900">{product.name}</h3>
        </Link>
        <p className="text-sm text-gray-500">{product.category}</p>
        <p className="font-medium text-black">${product.price}</p>
      </div>
    </div>
  );
};

export default ProductCard;
