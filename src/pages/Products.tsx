import { useEffect, useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { Product } from '../types';
import ProductCard from '../components/ProductCard';
import Spinner from '../components/ui/Spinner';
import Seo from '../components/Seo';

export default function Products() {
  const { id } = useParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://electronicrestapi.munaa.dev/api/v1/products?page=1&limit=10');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        
        // The API returns { data: [...] } or just [...]
        const projectsData = data.data || (Array.isArray(data) ? data : []);
        
        // Map API fields to our Product interface
        const mappedProducts: Product[] = projectsData.map((item: any) => ({
          id: item._id || item.id,
          name: item.name || item.title,
          price: item.price || 0,
          description: item.description || '',
          category: item.category || 'General',
          image: item.image || `https://picsum.photos/seed/${item._id || item.id}/400/400`
        }));

        setProducts(mappedProducts);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (!id) {
      fetchProducts();
    }
  }, [id]);

  // If we have an ID, we are in the detail view
  if (id) {
    return <Outlet />;
  }

  if (loading) {
    return (
      <div className="py-20 flex flex-col items-center justify-center space-y-4">
        <Seo title="Products" description="Loading curated products and essentials." />
        <Spinner size="lg" />
        <p className="text-gray-400 font-medium animate-pulse">Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-20 text-center space-y-4">
        <Seo
          title="Products error"
          description="We could not load the product catalog. Try again in a moment."
        />
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-50 text-red-500 mb-4">
          <span className="text-2xl font-bold">!</span>
        </div>
        <h3 className="text-xl font-bold text-gray-900">Error Loading Products</h3>
        <p className="text-gray-500 max-w-md mx-auto">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="px-6 py-2 bg-black text-white rounded-xl font-bold uppercase tracking-widest text-[10px] hover:bg-gray-800 transition-all"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <Seo
        title="Products"
        description="Browse curated essentials and electronics. Find details, pricing, and add items to your wishlist."
      />
      <div className="space-y-2">
        <h2 className="text-4xl font-bold tracking-tight">Our Products</h2>
        <p className="text-gray-500">Curated essentials for your lifestyle.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <div className="col-span-full py-20 text-center bg-gray-50 rounded-[32px] border border-dashed border-gray-200">
            <p className="text-gray-500">No products found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
