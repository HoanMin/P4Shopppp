import React, { useState } from 'react';
import { HeroCarousel } from './HeroCarousel';
import { TodayDiscovery } from './TodayDiscovery';
import { FlashSale } from './FlashSale';
import { ProductCard } from '../product/ProductCard';
import { OrderTrackingWidget } from '../tracking/OrderTrackingWidget';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { 
  Sparkles, 
  Flame, 
  ChevronRight, 
  Laptop, 
  Coffee, 
  Flag,
  HeartPulse,
  Home,
  CheckCircle2
} from 'lucide-react';
import { ProductCategory } from '../../types';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { allProducts, language, t } = useCart();
  const [selectedCategoryTab, setSelectedCategoryTab] = useState<ProductCategory>('electronics');

  // Filter category products for the best-seller section
  const categoryProducts = allProducts.filter(p => p.category === selectedCategoryTab).slice(0, 8);
  
  // Recommend for you items
  const recommendedProducts = allProducts.slice(4, 12);

  const categoryTabs: { id: ProductCategory; label: string; icon: React.ReactNode }[] = [
    { id: 'electronics', label: t.header.categories.electronics, icon: <Laptop className="w-4 h-4" /> },
    { id: 'beauty', label: t.header.categories.beauty, icon: <Sparkles className="w-4 h-4" /> },
    { id: 'food', label: t.header.categories.food, icon: <Coffee className="w-4 h-4" /> },
    { id: 'houseware', label: t.header.categories.houseware, icon: <Home className="w-4 h-4" /> },
    { id: 'fashion_golf', label: t.header.categories.fashion_golf, icon: <Flag className="w-4 h-4" /> },
    { id: 'health', label: t.header.categories.health, icon: <HeartPulse className="w-4 h-4" /> },
  ];

  return (
    <div className="w-full bg-[#F5F6F8] pb-12 font-sans select-none">
      
      {/* 1. Hero Carousel */}
      <HeroCarousel />

      {/* 2. Order Tracking Quick Access Banner on Homepage */}
      <OrderTrackingWidget />

      {/* 3. Today's Discovery */}
      <TodayDiscovery />

      {/* 4. Flash Sale Section with Live Countdown & Vouchers */}
      <FlashSale />

      {/* 5. Best Sellers by Category */}
      <section className="max-w-[1240px] mx-auto px-4 py-6">
        <div className="bg-white rounded-xl p-6 border border-gray-200/80 shadow-2xs">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-gray-100 gap-3">
            <div>
              <div className="flex items-center gap-2">
                <Flame className="w-5 h-5 text-[#F0471C]" />
                <h2 className="text-xl font-black text-gray-900 tracking-tight">
                  {t.home.bestSellerTitle}
                </h2>
              </div>
              <p className="text-xs text-gray-500 mt-0.5">
                {t.home.bestSellerDesc}
              </p>
            </div>

            {/* Category Switch Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
              {categoryTabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedCategoryTab(tab.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 shrink-0 transition-all cursor-pointer ${
                    selectedCategoryTab === tab.id
                      ? 'bg-[#3B6EF5] text-white shadow-xs'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
            {categoryProducts.map((product, idx) => (
              <ProductCard key={product.id} product={product} rankBadge={idx + 1} />
            ))}
          </div>

        </div>
      </section>

      {/* 6. Suggestions For You */}
      <section className="max-w-[1240px] mx-auto px-4 py-6">
        <div className="flex items-baseline justify-between mb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-500" />
            <h2 className="text-xl font-black text-gray-900 tracking-tight">
              {t.home.recommendationTitle}
            </h2>
            <span className="text-xs text-gray-400 hidden sm:inline">• {t.home.recommendationDesc}</span>
          </div>
          <button
            onClick={() => navigate('/search?q=all')}
            className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-0.5 cursor-pointer"
          >
            <span>{t.home.exploreMore}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {recommendedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

    </div>
  );
};
