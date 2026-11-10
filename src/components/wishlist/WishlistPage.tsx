import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Heart, 
  Trash2, 
  ShoppingCart, 
  Sparkles, 
  ArrowLeft, 
  ShoppingBag,
  CheckCircle2,
  Filter
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { ProductCard } from '../product/ProductCard';
import { ProductCategory } from '../../types';

export const WishlistPage: React.FC = () => {
  const navigate = useNavigate();
  const { 
    allProducts, 
    wishlist, 
    clearWishlist, 
    addToCart, 
    showToast,
    language, 
    t 
  } = useCart();

  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'all'>('all');

  // Find products that are in wishlist
  const savedProducts = allProducts.filter(p => wishlist.includes(p.id));

  // Filter by category if selected
  const filteredProducts = selectedCategory === 'all' 
    ? savedProducts 
    : savedProducts.filter(p => p.category === selectedCategory);

  // Recommendations for empty or bottom discovery
  const recommendations = allProducts.slice(0, 4);

  const handleAddAllToCart = () => {
    if (savedProducts.length === 0) return;
    savedProducts.forEach(prod => {
      addToCart(prod, prod.variants[0], 1);
    });
    showToast(
      language === 'en' 
        ? `Added all ${savedProducts.length} saved items to your cart!`
        : `Đã thêm tất cả ${savedProducts.length} sản phẩm yêu thích vào giỏ hàng!`
    );
  };

  const categoriesList: { id: ProductCategory | 'all'; label: string }[] = [
    { id: 'all', label: t.common.all },
    { id: 'electronics', label: t.header.categories.electronics },
    { id: 'beauty', label: t.header.categories.beauty },
    { id: 'food', label: t.header.categories.food },
    { id: 'houseware', label: t.header.categories.houseware },
    { id: 'fashion_golf', label: t.header.categories.fashion_golf },
    { id: 'health', label: t.header.categories.health },
  ];

  return (
    <div className="min-h-screen bg-[#F5F6F8] pb-16 font-sans">
      
      {/* Header Bar */}
      <div className="bg-white border-b border-gray-200 py-6 px-4">
        <div className="max-w-[1240px] mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center">
                <Heart className="w-5 h-5 fill-rose-500" />
              </div>
              <div>
                <h1 className="text-2xl font-black text-gray-900 tracking-tight">
                  {t.wishlist.title}
                </h1>
                <p className="text-xs text-gray-500 mt-0.5">
                  {savedProducts.length} {t.wishlist.totalSaved}
                </p>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          {savedProducts.length > 0 && (
            <div className="flex items-center gap-2.5">
              <button
                onClick={handleAddAllToCart}
                className="bg-[#3B6EF5] hover:bg-blue-600 text-white font-bold text-xs py-2 px-4 rounded-xl flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
              >
                <ShoppingCart className="w-3.5 h-3.5" />
                <span>{t.wishlist.addAllToCart}</span>
              </button>
              <button
                onClick={clearWishlist}
                className="bg-gray-100 hover:bg-rose-50 text-gray-600 hover:text-rose-600 font-bold text-xs py-2 px-3.5 rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer border border-gray-200"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>{t.wishlist.clearAll}</span>
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-[1240px] mx-auto px-4 py-6">
        
        {/* Category Filters */}
        {savedProducts.length > 0 && (
          <div className="mb-6 flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
            <span className="text-xs text-gray-400 font-bold flex items-center gap-1 mr-1">
              <Filter className="w-3 h-3" />
              Lọc:
            </span>
            {categoriesList.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`text-xs font-bold px-3 py-1.5 rounded-lg shrink-0 transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-[#0B2A5B] text-white shadow-xs'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        )}

        {/* Saved Items Grid */}
        {savedProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="bg-white rounded-2xl p-10 md:p-14 text-center border border-gray-200/80 shadow-xs max-w-lg mx-auto my-8">
            <div className="w-16 h-16 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-4 ring-8 ring-rose-50/50">
              <Heart className="w-8 h-8" />
            </div>
            <h2 className="text-lg font-bold text-gray-900">
              {t.wishlist.emptyTitle}
            </h2>
            <p className="text-xs text-gray-500 max-w-xs mx-auto mt-1.5 mb-6 leading-relaxed">
              {t.wishlist.emptyDesc}
            </p>
            <button
              onClick={() => navigate('/search?q=all')}
              className="inline-flex items-center gap-2 bg-[#3B6EF5] hover:bg-blue-600 text-white font-bold text-xs py-3 px-6 rounded-xl shadow-md transition-all cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Khám phá sản phẩm ngay</span>
            </button>
          </div>
        )}

        {/* Discovery recommendations at the bottom */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-amber-500" />
            <h3 className="text-lg font-black text-gray-900 tracking-tight">
              Sản phẩm có thể bạn sẽ thích
            </h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {recommendations.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
