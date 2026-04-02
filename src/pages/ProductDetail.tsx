import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Product } from '../types';
import { ArrowLeft, ShoppingBag, Heart } from 'lucide-react';
import { useWishlist } from '../contexts/WishlistContext';
import Spinner from '../components/ui/Spinner';
import Seo from '../components/Seo';
import { DEFAULT_DESCRIPTION, truncateMeta, ensureAbsoluteUrl } from '../config/site';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://electronicrestapi.munaa.dev/api/v1/products/${id}`);
        if (!response.ok) {
          throw new Error('Product not found');
        }
        const data = await response.json();
        
        // The API might return { product: {...} } or { data: {...} } or just {...}
        const projectData = data.product || data.data || data;
        
        const mappedProduct: Product = {
          id: projectData._id || projectData.id,
          name: projectData.name || projectData.title,
          price: projectData.price || 0,
          description: projectData.description || '',
          category: projectData.category || 'General',
          image: projectData.image || `https://picsum.photos/seed/${projectData._id || projectData.id}/800/800`
        };

        setProduct(mappedProduct);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="py-20 flex flex-col items-center justify-center space-y-4">
        <Seo title="Product" description={DEFAULT_DESCRIPTION} />
        <Spinner size="lg" />
        <p className="text-gray-400 font-medium animate-pulse">Loading product details...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="text-center py-20 space-y-4">
        <Seo
          title="Product not found"
          description="This product could not be loaded. Browse the shop for available items."
        />
        <h2 className="text-2xl font-bold">Product not found</h2>
        <button 
          onClick={() => navigate('/products')}
          className="text-black underline font-medium"
        >
          Back to products
        </button>
      </div>
    );
  }

  const isFavorite = isInWishlist(product.id);

  return (
    <div className="space-y-12">
      <Seo
        title={product.name}
        description={truncateMeta(
          `${product.description} Category: ${product.category}. Price: $${product.price}.`
        )}
        ogImage={ensureAbsoluteUrl(product.image)}
      />
      <button 
        onClick={() => navigate('/products')}
        className="flex items-center space-x-2 text-sm text-gray-500 hover:text-black transition-colors group"
      >
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
        <span>Back to products</span>
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        <div className="aspect-square bg-gray-100 rounded-3xl overflow-hidden relative">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <button 
            onClick={() => toggleWishlist(product)}
            className={`absolute top-6 right-6 p-3 rounded-full shadow-lg transition-all ${
              isFavorite ? 'bg-red-500 text-white' : 'bg-white text-gray-400 hover:text-red-500'
            }`}
          >
            <Heart size={24} fill={isFavorite ? "currentColor" : "none"} />
          </button>
        </div>

        <div className="space-y-8">
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-widest text-gray-400">
              {product.category}
            </p>
            <h2 className="text-4xl font-bold tracking-tight">{product.name}</h2>
            <p className="text-2xl font-medium text-black">${product.price}</p>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900">Description</h3>
            <p className="text-lg text-gray-600 leading-relaxed">
              {product.description}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button className="flex-grow px-8 py-4 bg-black text-white rounded-2xl font-semibold flex items-center justify-center space-x-3 hover:bg-gray-800 transition-colors">
              <ShoppingBag size={20} />
              <span>Add to Bag</span>
            </button>
            <button 
              onClick={() => toggleWishlist(product)}
              className={`px-8 py-4 border rounded-2xl font-semibold flex items-center justify-center space-x-3 transition-all ${
                isFavorite 
                  ? 'border-red-500 text-red-500 bg-red-50' 
                  : 'border-gray-200 text-gray-600 hover:border-black hover:text-black'
              }`}
            >
              <Heart size={20} fill={isFavorite ? "currentColor" : "none"} />
              <span>{isFavorite ? 'Saved to Wishlist' : 'Save for Later'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
