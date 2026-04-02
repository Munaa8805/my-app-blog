import { DEMO_ORDERS } from '../constants';
import { Package } from 'lucide-react';
import OrderCard from '../components/OrderCard';

export default function Orders() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h2 className="text-4xl font-bold tracking-tight">Order History</h2>
        <p className="text-gray-500">Track and manage your recent purchases.</p>
      </div>

      <div className="space-y-6">
        {DEMO_ORDERS.length === 0 ? (
          <div className="text-center py-20 border-2 border-dashed border-gray-100 rounded-3xl">
            <Package size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500">You haven't placed any orders yet.</p>
          </div>
        ) : (
          DEMO_ORDERS.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))
        )}
      </div>
    </div>
  );
}
