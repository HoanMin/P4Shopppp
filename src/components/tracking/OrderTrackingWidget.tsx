import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Truck, Search, MapPin, Navigation, ArrowRight, ShieldCheck, Clock } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export const OrderTrackingWidget: React.FC = () => {
  const navigate = useNavigate();
  const { lastCompletedOrder, language, t } = useCart();
  const [orderId, setOrderId] = useState('');

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = orderId.trim();
    if (trimmed) {
      navigate(`/tracking?id=${encodeURIComponent(trimmed)}`);
    } else {
      navigate('/tracking');
    }
  };

  return (
    <section className="max-w-[1240px] mx-auto px-4 py-4">
      <div className="bg-gradient-to-r from-[#0B2A5B] via-[#1E3A8A] to-[#2563EB] rounded-2xl p-6 md:p-8 text-white shadow-lg border border-blue-400/20 relative overflow-hidden">
        {/* Background Decorative Rings */}
        <div className="absolute -right-12 -bottom-12 w-64 h-64 rounded-full bg-blue-500/10 blur-2xl pointer-events-none" />
        <div className="absolute right-1/4 -top-10 w-48 h-48 rounded-full bg-emerald-500/10 blur-2xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          
          {/* Left info column */}
          <div className="lg:col-span-7 space-y-3">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-blue-200 border border-white/15">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Tuyến vận chuyển: Tổng kho Hải Dương ➔ Hà Nội &amp; Toàn Quốc</span>
            </div>

            <h2 className="text-xl md:text-2xl lg:text-3xl font-black tracking-tight text-white">
              {t.home.orderTrackingBannerTitle}
            </h2>

            <p className="text-xs md:text-sm text-blue-100 max-w-xl leading-relaxed">
              Theo dõi trực tiếp hành trình đơn hàng xuất phát từ Tổng Kho Logistics TP. Hải Dương qua Quốc Lộ 5A về Trường Đại học Thương Mại và các tỉnh thành trên bản đồ GPS.
            </p>

            {/* User Real Placed Order Link (if any order exists) */}
            <div className="pt-1 flex flex-wrap items-center gap-2 text-xs">
              {lastCompletedOrder ? (
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-blue-200 text-xs font-medium">Đơn hàng gần nhất của bạn:</span>
                  <button
                    type="button"
                    onClick={() => navigate(`/tracking?id=${encodeURIComponent(lastCompletedOrder.orderNumber)}`)}
                    className="bg-emerald-500/30 hover:bg-emerald-500/40 text-emerald-200 text-xs font-bold px-3 py-1.5 rounded-lg border border-emerald-400/40 transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <Clock className="w-3.5 h-3.5" />
                    <span>{lastCompletedOrder.orderNumber} (Xem hành trình)</span>
                  </button>
                </div>
              ) : (
                <span className="text-blue-200/90 text-xs italic">
                  * Nhập mã đơn hàng đã nhận khi hoàn tất thanh toán để xem lộ trình chi tiết.
                </span>
              )}
            </div>
          </div>

          {/* Right Input card */}
          <div className="lg:col-span-5 bg-white rounded-2xl p-5 shadow-2xl text-gray-800 border border-white/20">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-full bg-blue-50 text-[#3B6EF5] flex items-center justify-center">
                <Truck className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-extrabold text-sm text-gray-900">
                  {language === 'en' ? 'Quick Order Tracking' : 'Tra cứu nhanh vận đơn'}
                </h3>
                <p className="text-[11px] text-gray-500">Xem shipper di chuyển trên bản đồ</p>
              </div>
            </div>

            <form onSubmit={handleTrack} className="space-y-3">
              <div className="relative">
                <input
                  type="text"
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  placeholder={t.home.enterOrderNumberPlaceholder}
                  className="w-full pl-3 pr-10 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-xs font-semibold text-gray-800 placeholder-gray-400 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                />
                <Search className="w-4 h-4 text-gray-400 absolute right-3 top-3 pointer-events-none" />
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="submit"
                  className="flex-1 bg-[#3B6EF5] hover:bg-blue-600 text-white font-bold text-xs py-2.5 px-4 rounded-xl flex items-center justify-center gap-1.5 transition-colors shadow-sm cursor-pointer"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>{t.home.trackNow}</span>
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/tracking')}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs py-2.5 px-3 rounded-xl transition-colors cursor-pointer"
                  title="Mở toàn màn hình bản đồ"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>

            <div className="mt-3 pt-2.5 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-500">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                Đảm bảo an toàn 100%
              </span>
              <span className="text-[#3B6EF5] font-semibold cursor-pointer hover:underline" onClick={() => navigate('/tracking')}>
                Bản đồ lộ trình ›
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
