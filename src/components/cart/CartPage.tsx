import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Trash2, 
  ArrowRight, 
  ShieldCheck, 
  ShoppingBag, 
  Tag, 
  Rocket, 
  Check, 
  ChevronRight,
  Ticket,
  Truck
} from 'lucide-react';
import { useCart, DEFAULT_VOUCHERS } from '../../context/CartContext';
import { formatVND } from '../../utils/pricing';
import { getLocalizedProduct } from '../../utils/productLocalization';

export const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    cart,
    updateQuantity,
    toggleSelect,
    toggleSelectAll,
    removeFromCart,
    cartTotals,
    applyVoucher,
    activeVoucher,
    discountCode,
    appliedDiscount,
    claimedVouchers,
    isFreeShippingActive,
    language,
    t,
  } = useCart();

  const [inputCoupon, setInputCoupon] = useState('');

  const allSelected = cart.length > 0 && cart.every(item => item.selected);
  const someSelected = cart.some(item => item.selected);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCoupon.trim()) return;
    applyVoucher(inputCoupon);
    setInputCoupon('');
  };

  const handleProceedToCheckout = () => {
    if (!someSelected) {
      alert(language === 'en' ? 'Please select at least 1 item to proceed to checkout!' : 'Vui lòng chọn ít nhất 1 sản phẩm để thanh toán!');
      return;
    }
    navigate('/checkout');
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-[1240px] mx-auto px-4 py-16 text-center font-sans">
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">{t.cart.emptyCartTitle}</h2>
        <p className="text-xs text-gray-500 max-w-sm mx-auto mb-6">
          {t.cart.emptyCartDesc}
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-[#3B6EF5] hover:bg-blue-600 text-white font-bold px-6 py-3 rounded-xl text-xs transition-colors shadow-sm"
        >
          <span>{t.common.continueShopping}</span>
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-[1240px] mx-auto px-4 py-6 font-sans">
      
      {/* Page Title */}
      <div className="flex items-baseline justify-between mb-6 pb-3 border-b border-gray-200">
        <h1 className="text-2xl font-black text-gray-900 tracking-tight">
          {t.cart.title} <span className="text-[#3B6EF5] text-lg font-bold">({cart.length})</span>
        </h1>
        <Link to="/" className="text-xs font-semibold text-blue-600 hover:underline">
          &larr; {t.common.continueShopping}
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left 8 cols: Cart Items Table */}
        <div className="lg:col-span-8 bg-white border border-gray-200 rounded-xl overflow-hidden shadow-2xs">
          {/* Header row with Select All */}
          <div className="bg-gray-50/80 px-4 py-3 border-b border-gray-200 flex items-center justify-between text-xs font-bold text-gray-700">
            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={allSelected}
                onChange={(e) => toggleSelectAll(e.target.checked)}
                className="w-4 h-4 rounded text-blue-600 accent-[#3B6EF5] cursor-pointer"
              />
              <span>{t.cart.selectAll} ({cart.length} {language === 'en' ? 'products' : 'sản phẩm'})</span>
            </label>
            <span className="text-gray-400 hidden sm:inline">P4Shop TMU Đảm bảo chất lượng</span>
          </div>

          {/* Cart Item list */}
          <div className="divide-y divide-gray-100">
            {cart.map((item) => {
              const localized = getLocalizedProduct(item.product, language);

              return (
                <div key={item.id} className="p-4 flex items-start gap-3 sm:gap-4 hover:bg-gray-50/50 transition-colors">
                  {/* Checkbox */}
                  <input
                    type="checkbox"
                    checked={item.selected}
                    onChange={() => toggleSelect(item.id)}
                    className="w-4 h-4 rounded text-blue-600 accent-[#3B6EF5] mt-3 cursor-pointer shrink-0"
                  />

                  {/* Thumbnail */}
                  <div 
                    onClick={() => navigate(`/product/${item.product.id}`)}
                    className="w-20 h-20 rounded-lg overflow-hidden border border-gray-200 shrink-0 bg-gray-50 cursor-pointer"
                  >
                    <img
                      src={item.product.image}
                      alt={localized.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h3 
                        onClick={() => navigate(`/product/${item.product.id}`)}
                        className="text-xs sm:text-sm font-semibold text-gray-900 line-clamp-2 hover:text-blue-600 cursor-pointer leading-snug"
                      >
                        {localized.name}
                      </h3>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-gray-400 hover:text-red-500 p-1 transition-colors shrink-0 cursor-pointer"
                        title="Xóa sản phẩm"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <p className="text-xs text-gray-500 mt-0.5">
                      Phân loại: <span className="font-medium text-gray-700">{language === 'en' && item.variant.nameEn ? item.variant.nameEn : item.variant.name}</span>
                    </p>

                    {/* Fast delivery badge */}
                    {item.product.fastDelivery && (
                      <div className="flex items-center gap-1 text-[11px] font-bold text-blue-600 mt-1">
                        <Rocket className="w-3.5 h-3.5 text-[#3B6EF5] fill-[#3B6EF5]" />
                        <span>{localized.deliveryDateText}</span>
                      </div>
                    )}

                    {/* Price & Quantity Controls */}
                    <div className="flex flex-wrap items-center justify-between gap-3 mt-3 pt-2 border-t border-gray-100">
                      <div className="flex items-baseline gap-2">
                        <span className="text-sm sm:text-base font-extrabold text-[#E02020]">
                          {formatVND(item.variant.price || item.product.currentPrice)}
                        </span>
                        {item.product.originalPrice > item.product.currentPrice && (
                          <span className="text-xs text-gray-400 line-through">
                            {formatVND(item.product.originalPrice)}
                          </span>
                        )}
                      </div>

                      {/* Quantity stepper */}
                      <div className="flex items-center border border-gray-300 rounded-md overflow-hidden bg-white">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-2.5 py-1 text-gray-500 hover:bg-gray-100 text-xs font-bold cursor-pointer"
                        >
                          -
                        </button>
                        <span className="px-3 py-1 text-xs font-bold text-gray-800">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-2.5 py-1 text-gray-500 hover:bg-gray-100 text-xs font-bold cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right 4 cols: Order Summary & Vouchers */}
        <div className="lg:col-span-4 bg-white border border-gray-200 rounded-xl p-5 shadow-2xs space-y-4">
          <h2 className="text-base font-bold text-gray-900 pb-3 border-b border-gray-100">
            {t.cart.orderSummary}
          </h2>

          {/* Coupon Code Input */}
          <form onSubmit={handleApplyCoupon} className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-700 flex items-center gap-1">
              <Tag className="w-3.5 h-3.5 text-orange-500" />
              <span>{t.cart.voucherCode}</span>
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="VD: FLASHSALE50K"
                value={inputCoupon}
                onChange={(e) => setInputCoupon(e.target.value)}
                className="flex-1 px-3 py-1.5 border border-gray-300 rounded-lg text-xs outline-none focus:border-blue-500 uppercase font-mono"
              />
              <button
                type="submit"
                className="bg-gray-800 hover:bg-black text-white px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer"
              >
                {t.cart.apply}
              </button>
            </div>

            {/* Quick Available Vouchers Chips */}
            <div className="pt-2">
              <span className="text-[11px] text-gray-400 font-bold block mb-1">
                {t.cart.availableVouchers}
              </span>
              <div className="flex flex-wrap gap-1.5">
                {DEFAULT_VOUCHERS.map(v => {
                  const isCurrent = discountCode === v.code;
                  return (
                    <button
                      key={v.code}
                      type="button"
                      onClick={() => applyVoucher(v.code)}
                      className={`text-[10px] font-bold px-2 py-1 rounded border transition-all cursor-pointer ${
                        isCurrent
                          ? 'bg-emerald-600 text-white border-emerald-600 shadow-2xs'
                          : 'bg-gray-50 hover:bg-blue-50 text-gray-700 border-gray-200 hover:border-blue-300'
                      }`}
                    >
                      {v.code} {v.discountType === 'free_shipping' ? '(Free ship)' : `(-${formatVND(v.discountAmount)})`}
                    </button>
                  );
                })}
              </div>
            </div>

            {appliedDiscount > 0 && (
              <p className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1 mt-1 pt-1">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
                <span>
                  {isFreeShippingActive
                    ? 'Đã áp dụng mã Miễn Phí Vận Chuyển 25.000 ₫!'
                    : `Đã áp dụng mã ${discountCode}: Giảm ${formatVND(appliedDiscount)}!`}
                </span>
              </p>
            )}
          </form>

          {/* Fee breakdown */}
          <div className="space-y-2 text-xs pt-2 border-t border-gray-100">
            <div className="flex justify-between text-gray-600">
              <span>{t.cart.subtotal} ({cartTotals.itemCount} {language === 'en' ? 'items' : 'mục'}):</span>
              <span className="font-semibold text-gray-900">{formatVND(cartTotals.subtotal)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>{t.cart.shippingFee}</span>
              <span className="font-semibold text-gray-900">
                {cartTotals.shippingFee === 0 ? (
                  <span className="text-emerald-700 font-bold">MIỄN PHÍ</span>
                ) : (
                  formatVND(cartTotals.shippingFee)
                )}
              </span>
            </div>
            {cartTotals.discountAmount > 0 && (
              <div className="flex justify-between text-[#F0471C] font-semibold">
                <span>{t.cart.discount} ({discountCode}):</span>
                <span>-{formatVND(cartTotals.discountAmount)}</span>
              </div>
            )}
          </div>

          {/* Total */}
          <div className="pt-3 border-t border-gray-200 flex items-baseline justify-between">
            <span className="text-sm font-bold text-gray-800">{t.cart.totalPayment}</span>
            <span className="text-2xl font-black text-[#F0471C]">
              {formatVND(cartTotals.totalAmount)}
            </span>
          </div>

          {/* Order Checkout Button */}
          <button
            disabled={!someSelected}
            onClick={handleProceedToCheckout}
            className="w-full bg-[#F0471C] hover:bg-[#d63a12] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md text-sm cursor-pointer"
          >
            <span>{t.cart.checkoutBtn.toUpperCase()}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <div className="pt-2 flex items-center gap-2 text-[11px] text-gray-500 justify-center">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Thanh toán an toàn • Bảo vệ người tiêu dùng TMU</span>
          </div>
        </div>

      </div>
    </div>
  );
};
