import React, { useState, useEffect } from 'react';
import { Zap, ChevronRight, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { ProductCard } from '../product/ProductCard';
import { FlashSaleVoucherBanner } from './FlashSaleVoucherBanner';

export const FlashSale: React.FC = () => {
  const navigate = useNavigate();
  const { allProducts, t } = useCart();
  const [timeLeft, setTimeLeft] = useState({
    hours: 8,
    minutes: 42,
    seconds: 19,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 12, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Filter 4 high-discount products for Flash Sale
  const flashSaleProducts = allProducts.filter(p => p.discountPercent >= 25 || p.isFlashSale).slice(0, 4);

  return (
    <section className="max-w-[1240px] mx-auto px-4 py-4">
      
      {/* 1. Flash Sale Voucher Banner with Free Shipping & Storewide Discount Coupons */}
      <FlashSaleVoucherBanner />

      {/* 2. Flash Sale Header Banner with Live Countdown */}
      <div className="bg-gradient-to-r from-red-600 via-rose-600 to-orange-500 rounded-xl p-5 text-white shadow-md mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-white text-[#F0471C] flex items-center justify-center shadow-md animate-bounce">
              <Zap className="w-6 h-6 fill-[#F0471C]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl md:text-2xl font-black tracking-tight uppercase">
                  {t.home.flashSaleTitle}
                </span>
                <span className="bg-yellow-400 text-gray-950 font-black text-xs px-2 py-0.5 rounded shadow-xs">
                  {t.home.flashSaleBadge}
                </span>
              </div>
              <p className="text-xs text-rose-100 font-medium">
                {t.home.flashSaleDesc}
              </p>
            </div>
          </div>

          {/* Countdown Clock */}
          <div className="flex items-center gap-2 bg-black/30 backdrop-blur-md px-4 py-2 rounded-lg border border-white/20 self-start sm:self-auto">
            <Clock className="w-4 h-4 text-yellow-300" />
            <span className="text-xs font-semibold text-gray-200">{t.home.endsIn}</span>
            <div className="flex items-center gap-1 font-mono font-bold text-sm">
              <span className="bg-white text-gray-900 px-1.5 py-0.5 rounded shadow-2xs">
                {String(timeLeft.hours).padStart(2, '0')}
              </span>
              <span>:</span>
              <span className="bg-white text-gray-900 px-1.5 py-0.5 rounded shadow-2xs">
                {String(timeLeft.minutes).padStart(2, '0')}
              </span>
              <span>:</span>
              <span className="bg-white text-rose-600 px-1.5 py-0.5 rounded shadow-2xs">
                {String(timeLeft.seconds).padStart(2, '0')}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Product Cards Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {flashSaleProducts.map((product, idx) => (
          <ProductCard key={product.id} product={product} rankBadge={idx + 1} />
        ))}
      </div>

      <div className="text-center mt-6">
        <button
          onClick={() => navigate('/search?q=all')}
          className="inline-flex items-center gap-1 text-sm font-bold text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-5 py-2.5 rounded-full transition-colors shadow-2xs cursor-pointer"
        >
          <span>{t.home.viewMoreFlashSale} &rsaquo;</span>
        </button>
      </div>
    </section>
  );
};
