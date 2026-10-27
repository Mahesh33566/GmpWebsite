export interface Product {
  id: string;
  name: string;
  category: 'Apparel' | 'Footwear' | 'Accessories';
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  badge?: string;
  image: string;
}

export interface MenuItem {
  id: string;
  name: string;
  category: 'Brunch' | 'Mains' | 'Beverages' | 'Desserts';
  price: number;
  description: string;
  tag?: string;
  calories?: number;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: 'Web App' | 'Branding' | 'Mobile' | 'Design System';
  client: string;
  year: string;
  metric: string;
  image: string;
  description: string;
}

export const SAMPLE_PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Minimalist Chrono Watch',
    category: 'Accessories',
    price: 185,
    originalPrice: 220,
    rating: 4.9,
    reviewsCount: 142,
    badge: 'Best Seller',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 'p2',
    name: 'Merino Wool Overshirt',
    category: 'Apparel',
    price: 130,
    rating: 4.8,
    reviewsCount: 89,
    badge: 'Organic',
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 'p3',
    name: 'Canvas Commuter Runner',
    category: 'Footwear',
    price: 110,
    originalPrice: 140,
    rating: 4.7,
    reviewsCount: 204,
    badge: 'Sale',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 'p4',
    name: 'Everyday Leather Cardfold',
    category: 'Accessories',
    price: 45,
    rating: 4.9,
    reviewsCount: 310,
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=600&auto=format&fit=crop&q=80',
  },
];

export const SAMPLE_MENU: MenuItem[] = [
  {
    id: 'm1',
    name: 'Truffle & Forest Mushroom Risotto',
    category: 'Mains',
    price: 26,
    description: 'Acquerello aged carnaroli rice, black winter truffle essence, parmigiano crisps.',
    tag: "Chef's Pick",
    calories: 580,
  },
  {
    id: 'm2',
    name: 'Avocado Tartine with Poached Duck Egg',
    category: 'Brunch',
    price: 18,
    description: 'Artisan sourdough, whipped goat curd, pickled shallots, dukkah spice.',
    tag: 'Popular',
    calories: 460,
  },
  {
    id: 'm3',
    name: 'Cardamom Nitro Cold Brew',
    category: 'Beverages',
    price: 7.5,
    description: 'Single-origin Ethiopian Yirgacheffe steeped for 24h, oat cold foam.',
    calories: 110,
  },
  {
    id: 'm4',
    name: 'Smoked Vanilla Bean Crème Brûlée',
    category: 'Desserts',
    price: 13,
    description: 'Torched raw sugar crust, fresh raspberries, candied rosemary.',
    calories: 420,
  },
];

export const SAMPLE_PROJECTS: ProjectItem[] = [
  {
    id: 'pr1',
    title: 'Aura Fintech Neobank Interface',
    category: 'Web App',
    client: 'Aura Labs',
    year: '2025',
    metric: '+142% Signup Conversion',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=700&auto=format&fit=crop&q=80',
    description: 'End-to-end multi-currency wallet with real-time biometric authorization and AI expense budgeting.',
  },
  {
    id: 'pr2',
    title: 'Kinetic Sound Brand Architecture',
    category: 'Branding',
    client: 'Kinetic Audio',
    year: '2024',
    metric: 'Red Dot Design Winner',
    image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=700&auto=format&fit=crop&q=80',
    description: 'Complete visual identity system and bespoke kinetic 3D typography guidelines for an acoustic brand.',
  },
  {
    id: 'pr3',
    title: 'Orbit Autonomous Fleet Telematics',
    category: 'Design System',
    client: 'Orbit Mobility',
    year: '2025',
    metric: '99.98% Mission Uptime',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=700&auto=format&fit=crop&q=80',
    description: 'High-density spatial dashboard monitoring 4,000+ unmanned delivery pods in real-time.',
  },
];
