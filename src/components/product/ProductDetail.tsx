import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  Star, 
  Rocket, 
  ShieldCheck, 
  RotateCcw, 
  ShoppingCart, 
  Zap, 
  CheckCircle2, 
  ChevronRight,
  Heart,
  Share2
} from 'lucide-react';
import { formatVND } from '../../utils/pricing';
import { useCart } from '../../context/CartContext';
import { getLocalizedProduct } from '../../utils/productLocalization';
import { ProductReviewsSection } from './ProductReviewsSection';

export const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { allProducts, addToCart, buyNow, isInWishlist, toggleWishlist, language, t } = useCart();

  const product = allProducts.find(p => p.id === id) || allProducts[0];
  const localized = getLocalizedProduct(product, language);

  const [selectedVariant, setSelectedVariant] = useState(product.variants[0] || {
    id: 'default',
    name: 'Tiêu chuẩn',
    nameEn: 'Standard',
    price: product.currentPrice,
    inStock: true,
  });
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const isFavorite = isInWishlist(product.id);
  const images = product.images.length > 0 ? product.images : [product.image];

  const handleAddToCart = () => {
    addToCart(product, selectedVariant, quantity);
  };

  const handleBuyNow = () => {
    buyNow(product, selectedVariant, quantity);
    navigate('/checkout');
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      alert(language === 'en' ? 'Product link copied to clipboard!' : 'Đã sao chép liên kết sản phẩm vào bộ nhớ đệm!');
    }
  };

  return (
    <div className="max-w-[1240px] mx-auto px-4 py-6 font-sans">
      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-6">
        <Link to="/" className="hover:text-blue-600">{t.common.backToHome}</Link>
        <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
        <Link to={`/search?cat=${product.category}`} className="hover:text-blue-600 font-bold">
          {localized.categoryLabel}
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
        <span className="font-semibold text-gray-800 truncate max-w-sm">{localized.name}</span>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-xs grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* Left Column: Image Gallery (5 cols) */}
        <div className="md:col-span-5 flex flex-col gap-4">
          <div className="aspect-square bg-gray-50 border border-gray-200 rounded-xl overflow-hidden relative group">
            <img 
              src={images[activeImageIndex] || product.image} 
              alt={localized.name}
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
            />
            {product.discountPercent > 0 && (
              <span className="absolute top-3 left-3 bg-[#E02020] text-white text-xs font-black px-2.5 py-1 rounded shadow-sm">
                -{product.discountPercent}%
              </span>
            )}

            {/* Wishlist Heart on Product Image */}
            <button
              onClick={() => toggleWishlist(product)}
              className={`absolute top-3 right-3 w-10 h-10 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-md ${
                isFavorite 
                  ? 'bg-rose-500 text-white scale-105' 
                  : 'bg-white/90 hover:bg-white text-gray-600 hover:text-rose-500 backdrop-blur-xs'
              }`}
              title={isFavorite ? 'Bỏ yêu thích' : 'Lưu vào yêu thích'}
            >
              <Heart className={`w-5 h-5 ${isFavorite ? 'fill-white stroke-white' : 'stroke-[2]'}`} />
            </button>
          </div>

          {/* Thumbnail list */}
          {images.length > 1 && (
            <div className="flex items-center gap-2 overflow-x-auto">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-16 h-16 rounded-lg border-2 overflow-hidden shrink-0 transition-all cursor-pointer ${
                    idx === activeImageIndex ? 'border-[#3B6EF5] ring-2 ring-blue-100' : 'border-gray-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Verification certificate badge */}
          <div className={`p-4 rounded-xl border text-xs flex items-center gap-3 ${
            product.verified 
              ? 'bg-emerald-50/80 border-emerald-200 text-emerald-900' 
              : 'bg-gray-50 border-gray-200 text-gray-700'
          }`}>
            <ShieldCheck className="w-7 h-7 text-emerald-600 shrink-0" />
            <div>
              <p className="font-bold text-emerald-800">
                {product.verified ? 'Chứng nhận Kiểm duyệt Sàn P4Shop TMU' : 'Đang trong quy trình kiểm duyệt'}
              </p>
              <p className="text-[11px] text-emerald-700 mt-0.5">
                Xuất xứ, an toàn tiêu dùng và điều khoản bảo hành minh bạch 100%.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Information & Purchase Actions (7 cols) */}
        <div className="md:col-span-7 flex flex-col justify-between">
          <div>
            {/* Brand & Category */}
            <div className="flex items-center justify-between text-xs text-gray-500 pb-2 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <span className="font-bold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded">
                  {product.brand}
                </span>
                <span>•</span>
                <span>{localized.subcategory}</span>
              </div>
              <button
                onClick={handleShare}
                className="hover:text-blue-600 flex items-center gap-1 transition-colors cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Chia sẻ</span>
              </button>
            </div>

            {/* Product Title */}
            <h1 className="text-xl md:text-2xl font-black text-gray-900 mt-3 mb-2 leading-snug">
              {localized.name}
            </h1>

            {/* Rating & Reviews */}
            <div className="flex items-center gap-3 text-xs mb-4">
              <div className="flex items-center text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating) ? 'fill-amber-400 stroke-amber-400' : 'stroke-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="font-bold text-gray-800">{product.rating.toFixed(1)}</span>
              <span className="text-gray-400">({product.reviewCount.toLocaleString()} {language === 'en' ? 'reviews' : 'đánh giá'})</span>
              <span className="text-gray-300">|</span>
              <span className="text-emerald-700 font-semibold">{t.common.approvedProduct}</span>
            </div>

            {/* Price section */}
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200/80 mb-6">
              {product.discountPercent > 0 && (
                <div className="flex items-center gap-2 text-xs text-gray-400 line-through">
                  <span>{formatVND(product.originalPrice)}</span>
                </div>
              )}
              <div className="flex items-baseline gap-3 mt-1">
                {product.discountPercent > 0 && (
                  <span className="text-2xl font-black text-[#E02020]">
                    {product.discountPercent}%
                  </span>
                )}
                <span className="text-3xl font-black text-[#E02020]">
                  {formatVND(selectedVariant.price || product.currentPrice)}
                </span>
              </div>

              {/* Delivery info */}
              <div className="mt-3 pt-3 border-t border-gray-200/60 flex items-center gap-2 text-xs font-bold text-blue-600">
                <Rocket className="w-4 h-4 text-[#3B6EF5] fill-[#3B6EF5]" />
                <span className="text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded text-[10px] font-black">
                  P4Shop Rocket
                </span>
                <span>{localized.deliveryDateText}</span>
              </div>
            </div>

            {/* Variants Picker */}
            {product.variants.length > 0 && (
              <div className="mb-6">
                <label className="block text-xs font-bold text-gray-700 uppercase mb-2">
                  Phân loại / Tùy chọn: <span className="text-blue-600">{language === 'en' && selectedVariant.nameEn ? selectedVariant.nameEn : selectedVariant.name}</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map((v) => (
                    <button
                      key={v.id}
                      onClick={() => setSelectedVariant(v)}
                      className={`text-xs font-semibold px-3.5 py-2 rounded-lg border transition-all cursor-pointer ${
                        selectedVariant.id === v.id
                          ? 'border-[#3B6EF5] bg-blue-50 text-blue-700 font-bold ring-2 ring-blue-100 shadow-xs'
                          : 'border-gray-200 text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      {language === 'en' && v.nameEn ? v.nameEn : v.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="mb-6 flex items-center gap-4">
              <span className="text-xs font-bold text-gray-700 uppercase">{t.cart.quantity}:</span>
              <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden bg-white">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1.5 hover:bg-gray-100 text-gray-600 font-bold text-xs cursor-pointer"
                >
                  -
                </button>
                <span className="px-4 py-1.5 text-xs font-bold text-gray-800">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1.5 hover:bg-gray-100 text-gray-600 font-bold text-xs cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>

            {/* Specs Table */}
            {Object.keys(product.specs).length > 0 && (
              <div className="mb-6 bg-gray-50/60 rounded-xl p-4 border border-gray-200/60">
                <h3 className="text-xs font-bold text-gray-800 uppercase mb-2">Thông số kỹ thuật</h3>
                <div className="grid grid-cols-2 gap-y-2 text-xs">
                  {Object.entries(product.specs).map(([key, val]) => (
                    <div key={key} className="text-gray-600">
                      <span className="font-semibold text-gray-800">{key}:</span> {val}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Detailed Description */}
            <div className="mb-6 text-xs text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
              <h3 className="text-xs font-bold text-gray-800 uppercase mb-2">Mô tả sản phẩm</h3>
              <p>{localized.description}</p>
            </div>
          </div>

          {/* Action Buttons (Add to Cart / Buy Now) */}
          <div className="pt-4 border-t border-gray-200 flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={handleAddToCart}
              className="w-full sm:w-1/2 bg-white hover:bg-blue-50 text-[#3B6EF5] border-2 border-[#3B6EF5] font-bold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer text-sm"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>{t.common.addToCart}</span>
            </button>
            <button
              onClick={handleBuyNow}
              className="w-full sm:w-1/2 bg-[#F0471C] hover:bg-[#d63a12] text-white font-bold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer text-sm"
            >
              <Zap className="w-4 h-4 fill-white" />
              <span>{t.common.buyNow}</span>
            </button>
          </div>
        </div>

      </div>

      {/* 5-Star Product Reviews Section with Customer Feedback Photos */}
      <ProductReviewsSection product={product} />

    </div>
  );
};

