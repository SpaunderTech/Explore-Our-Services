import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Search, Bell, HelpCircle, MoonStar, Bluetooth, RefreshCw, ArrowRightLeft, CheckCircle2, GraduationCap, CreditCard, Shield, LineChart, Grid3x3 } from 'lucide-react';

interface AppCard {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  category: 'Treatment' | 'Workflow' | 'Admin' | 'Access';
  status: 'Live' | 'Coming Soon' | 'Beta';
  accentColor: string;
}

const apps: AppCard[] = [
  {
    id: 'sleep',
    name: 'Sleep',
    description: 'Sleep treatment and diagnostics',
    icon: <MoonStar className="w-8 h-8 text-white" />,
    category: 'Treatment',
    status: 'Live',
    accentColor: 'bg-category-sleep',
  },
  {
    id: 'implant',
    name: 'Implant',
    description: 'Dental implant workflow navigation',
    icon: <Bluetooth className="w-8 h-8 text-white" />,
    category: 'Treatment',
    status: 'Live',
    accentColor: 'bg-category-implant',
  },
  {
    id: 'rcm',
    name: 'RCM',
    description: 'Billing, coding, and claim tracking',
    icon: <RefreshCw className="w-8 h-8 text-white" />,
    category: 'Workflow',
    status: 'Coming Soon',
    accentColor: 'bg-category-rcm',
  },
  {
    id: 'referral',
    name: 'Referral',
    description: 'Referral App for patients',
    icon: <ArrowRightLeft className="w-8 h-8 text-white" />,
    category: 'Workflow',
    status: 'Live',
    accentColor: 'bg-category-referral',
  },
  {
    id: 'credentialing',
    name: 'Credentialing',
    description: 'Provider license tracking',
    icon: <CheckCircle2 className="w-8 h-8 text-white" />,
    category: 'Admin',
    status: 'Coming Soon',
    accentColor: 'bg-category-credentialing',
  },
  {
    id: 'edai',
    name: 'EdAI',
    description: 'Internal training and onboarding',
    icon: <GraduationCap className="w-8 h-8 text-white" />,
    category: 'Admin',
    status: 'Coming Soon',
    accentColor: 'bg-category-edai',
  },
  {
    id: 'payables',
    name: 'Payables',
    description: 'Payor management',
    icon: <CreditCard className="w-8 h-8 text-white" />,
    category: 'Admin',
    status: 'Beta',
    accentColor: 'bg-category-payables',
  },
  {
    id: 'authnz',
    name: 'AuthN&Z',
    description: 'Authentication & Authorization',
    icon: <Shield className="w-8 h-8 text-white" />,
    category: 'Access',
    status: 'Live',
    accentColor: 'bg-category-auth',
  },
  {
    id: 'reporting',
    name: 'Analytics',
    description: 'Reporting and data visualization',
    icon: <LineChart className="w-8 h-8 text-white" />,
    category: 'Admin',
    status: 'Beta',
    accentColor: 'bg-category-reporting',
  },
];

function App() {
  const [activeFilter, setActiveFilter] = useState<string>('All Apps');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);

  const filters = [
    'All Apps',
    'Treatment',
    'Workflow',
    'Admin',
    'Access',
    'Coming Soon',
    'Live',
  ];

  const filteredApps = apps.filter(app => {
    if (searchQuery) {
      const searchLower = searchQuery.toLowerCase();
      return (
        app.name.toLowerCase().includes(searchLower) ||
        app.description.toLowerCase().includes(searchLower) ||
        app.category.toLowerCase().includes(searchLower)
      );
    }

    if (activeFilter === 'All Apps') return true;
    if (activeFilter === 'Coming Soon') return app.status === 'Coming Soon';
    if (activeFilter === 'Live') return app.status === 'Live';
    return app.category === activeFilter;
  });

  const createRipple = (event: React.MouseEvent<HTMLButtonElement>) => {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.classList.add('ripple');

    button.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  };

  return (
    <div className="min-h-screen bg-brand-secondary">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Moon className="h-8 w-8 text-brand-primary" />
              <span className="ml-2 text-xl font-bold text-gray-900">Dedicare</span>
            </div>

            <div className="flex-1 max-w-2xl mx-8">
              <div className={`relative transition-all duration-200 ${searchFocused ? 'scale-105' : ''}`}>
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search apps..."
                  className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-200 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 transition-all"
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setSearchFocused(false)}
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <motion.button 
                className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Grid3x3 className="h-6 w-6 text-gray-600" />
              </motion.button>
              <button className="relative p-2 hover:bg-gray-100 rounded-full transition-colors">
                <Bell className="h-6 w-6 text-gray-600" />
                <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                  3
                </span>
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <HelpCircle className="h-6 w-6 text-gray-600" />
              </button>
              <img
                src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=100"
                alt="Profile"
                className="h-8 w-8 rounded-full border-2 border-white shadow-sm"
              />
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col space-y-8">
          <div>
            <h1 className="text-2xl font-bold text-brand-primary mb-4">App Hub</h1>
            
            {/* Filters */}
            <div className="flex flex-wrap gap-2 pb-4">
              {filters.map((filter) => (
                <motion.button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`
                    filter-chip px-4 py-2 rounded-full text-sm font-medium
                    ${activeFilter === filter
                      ? 'bg-brand-primary text-white shadow-lg'
                      : 'bg-white text-gray-600 hover:bg-gray-50'}
                    transition-all duration-200
                  `}
                >
                  {filter}
                </motion.button>
              ))}
            </div>
          </div>

          {/* App Grid */}
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredApps.map((app, index) => (
                <motion.button
                  key={app.id}
                  layout
                  initial={{ opacity: 0, scale: 0.3, rotate: -15 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1, 
                    rotate: 0,
                    transition: {
                      type: "spring",
                      stiffness: 300,
                      damping: 20,
                      delay: index * 0.05
                    }
                  }}
                  exit={{ 
                    opacity: 0,
                    scale: 0.3,
                    rotate: 15,
                    transition: { duration: 0.2 }
                  }}
                  whileHover={{ 
                    scale: 1.02,
                    rotate: 0,
                    transition: { type: "spring", stiffness: 400 }
                  }}
                  onClick={createRipple}
                  className={`
                    relative overflow-hidden
                    h-[220px] p-6 rounded-2xl
                    bg-white shadow-lg
                    focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2
                    text-left
                  `}
                >
                  <div className="flex flex-col h-full">
                    <motion.div 
                      className={`p-3 ${app.accentColor} rounded-xl w-fit`}
                      whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                      transition={{ duration: 0.5 }}
                    >
                      {app.icon}
                    </motion.div>
                    
                    <div className="mt-4 flex-1">
                      <h3 className="text-lg font-semibold text-gray-900">{app.name}</h3>
                      <p className="text-sm text-gray-500 mt-1">{app.description}</p>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <span className="text-xs font-medium text-gray-500">
                        {app.category}
                      </span>
                      <motion.span
                        whileHover={{ scale: 1.1 }}
                        className={`
                          px-2 py-1 rounded-full text-xs font-medium
                          ${app.status === 'Live'
                            ? 'bg-green-100 text-green-800'
                            : app.status === 'Beta'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-amber-100 text-amber-800 shimmer-container'}
                        `}
                      >
                        {app.status}
                      </motion.span>
                    </div>
                  </div>
                </motion.button>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      {/* Floating Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute w-64 h-64 bg-brand-primary/5 rounded-full blur-3xl animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${i * 2}s`,
              animationDuration: `${20 + Math.random() * 10}s`
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default App;