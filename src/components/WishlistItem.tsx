import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, ShoppingBag } from 'lucide-react';
import { Product } from '../types';
import Button from './ui/Button';

interface WishlistItemProps {
  product: Product;
  onRemove: (id: string) => void;
}

const WishlistItem: React.FC<WishlistItemProps> = ({ product, onRemove }) => {
  return (
    <div className="group border border-gray-100 rounded-3xl p-4 hover:border-gray-200 transition-colors bg-white">
      <div className="relative aspect-square bg-gray-50 rounded-2xl overflow-hidden mb-4">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />
        <button 
          onClick={() => onRemove(product.id)}
          className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-sm"
          title="Remove from wishlist"
        >
          <Trash2 size={18} />
        </button>
      </div>
      
      <div className="space-y-4">
        <div className="space-y-1">
          <Link to={`/products/${product.id}`} className="font-semibold text-gray-900 hover:underline block">
            {product.name}
          </Link>
          <p className="text-sm text-gray-500">{product.category}</p>
          <p className="font-bold text-black">${product.price}</p>
        </div>
        
        <Button variant="outline" className="w-full py-3" icon={<ShoppingBag size={18} />}>
          Add to Bag
        </Button>
      </div>
    </div>
  );
};

export default WishlistItem;
