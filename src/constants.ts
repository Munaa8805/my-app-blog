import { Product, Order } from './types';

export const DEMO_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Minimalist Watch',
    price: 120,
    description: 'A sleek, timeless timepiece for the modern professional.',
    category: 'Accessories',
    image: 'https://picsum.photos/seed/watch/600/600',
  },
  {
    id: '2',
    name: 'Leather Backpack',
    price: 180,
    description: 'Durable and stylish, perfect for daily commutes or weekend trips.',
    category: 'Bags',
    image: 'https://picsum.photos/seed/bag/600/600',
  },
  {
    id: '3',
    name: 'Wireless Headphones',
    price: 250,
    description: 'Immersive sound quality with industry-leading noise cancellation.',
    category: 'Electronics',
    image: 'https://picsum.photos/seed/audio/600/600',
  },
  {
    id: '4',
    name: 'Ceramic Coffee Mug',
    price: 25,
    description: 'Handcrafted ceramic mug for your morning ritual.',
    category: 'Home',
    image: 'https://picsum.photos/seed/mug/600/600',
  },
];

export const DEMO_ORDERS: Order[] = [
  {
    id: 'ORD-7721',
    date: '2024-03-15',
    status: 'Delivered',
    total: 145.00,
    items: [
      {
        productId: '1',
        name: 'Minimalist Watch',
        quantity: 1,
        price: 120.00,
        image: 'https://picsum.photos/seed/watch/100/100',
      },
      {
        productId: '4',
        name: 'Ceramic Coffee Mug',
        quantity: 1,
        price: 25.00,
        image: 'https://picsum.photos/seed/mug/100/100',
      }
    ]
  },
  {
    id: 'ORD-8832',
    date: '2024-03-28',
    status: 'Shipped',
    total: 250.00,
    items: [
      {
        productId: '3',
        name: 'Wireless Headphones',
        quantity: 1,
        price: 250.00,
        image: 'https://picsum.photos/seed/audio/100/100',
      }
    ]
  },
  {
    id: 'ORD-9943',
    date: '2024-04-01',
    status: 'Processing',
    total: 180.00,
    items: [
      {
        productId: '2',
        name: 'Leather Backpack',
        quantity: 1,
        price: 180.00,
        image: 'https://picsum.photos/seed/bag/100/100',
      }
    ]
  }
];
