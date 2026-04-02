import React from 'react';
import { Clock, CheckCircle2, Truck, XCircle, ChevronRight } from 'lucide-react';
import { Order } from '../types';
import Button from './ui/Button';

const StatusIcon = ({ status }: { status: string }) => {
  switch (status) {
    case 'Processing': return <Clock size={16} className="text-blue-500" />;
    case 'Shipped': return <Truck size={16} className="text-purple-500" />;
    case 'Delivered': return <CheckCircle2 size={16} className="text-green-500" />;
    case 'Cancelled': return <XCircle size={16} className="text-red-500" />;
    default: return null;
  }
};

export const StatusBadge = ({ status }: { status: string }) => {
  const colors: Record<string, string> = {
    Processing: 'bg-blue-50 text-blue-700 border-blue-100',
    Shipped: 'bg-purple-50 text-purple-700 border-purple-100',
    Delivered: 'bg-green-50 text-green-700 border-green-100',
    Cancelled: 'bg-red-50 text-red-700 border-red-100',
  };

  return (
    <span className={`inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${colors[status]}`}>
      <StatusIcon status={status} />
      <span>{status}</span>
    </span>
  );
};

interface OrderCardProps {
  order: Order;
}

const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
  return (
    <div className="border border-gray-200 rounded-3xl overflow-hidden bg-white hover:border-gray-300 transition-colors">
      <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-8">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-0.5">Order ID</p>
            <p className="text-sm font-mono font-medium">{order.id}</p>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-0.5">Date Placed</p>
            <p className="text-sm font-medium">{new Date(order.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-0.5">Total Amount</p>
            <p className="text-sm font-bold text-black">${order.total.toFixed(2)}</p>
          </div>
        </div>
        <StatusBadge status={order.status} />
      </div>

      <div className="p-6 space-y-6">
        <div className="space-y-4">
          {order.items.map((item, idx) => (
            <div key={idx} className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex-grow">
                <h4 className="text-sm font-semibold text-gray-900">{item.name}</h4>
                <p className="text-xs text-gray-500">Qty: {item.quantity} × ${item.price.toFixed(2)}</p>
              </div>
              <button className="text-xs font-semibold text-black hover:underline flex items-center space-x-1">
                <span>View Product</span>
                <ChevronRight size={12} />
              </button>
            </div>
          ))}
        </div>
        
        <div className="pt-4 border-t border-gray-100 flex justify-end space-x-4">
          <Button variant="outline" className="w-auto px-4 py-2 h-auto text-[10px]">
            Track Order
          </Button>
          <Button className="w-auto px-4 py-2 h-auto text-[10px]">
            Order Details
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
