import React, { useState, useEffect, useMemo } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { 
  Search, 
  Package, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  Truck, 
  AlertCircle, 
  Phone, 
  ShieldCheck, 
  Home, 
  ChevronRight,
  ArrowRight,
  ShoppingCart,
  Navigation,
  Info,
  Calendar,
  Building2,
  User,
  RefreshCw
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { Order, OrderTrackingInfo, OrderTrackingStatus } from '../../types';
import { DeliveryMap } from './DeliveryMap';
import { formatVND } from '../../utils/pricing';
import { buildTrackingInfoFromOrder } from '../../utils/orderTrackingHelper';

export const OrderTrackingPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { allOrders, language, t } = useCart();

  const [orderQuery, setOrderQuery] = useState<string>('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [notFoundQuery, setNotFoundQuery] = useState<string | null>(null);
  
  // Custom manual stage simulation for the selected order
  const [simulatedStatus, setSimulatedStatus] = useState<OrderTrackingStatus | null>(null);

  // Parse order ID from URL query (?id=...)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const idParam = params.get('id');

    if (idParam) {
      setOrderQuery(idParam);
      const match = allOrders.find(
        o => o.orderNumber.toLowerCase() === idParam.toLowerCase() || 
             o.id.toLowerCase() === idParam.toLowerCase()
      );
      if (match) {
        setSelectedOrder(match);
        setNotFoundQuery(null);
        setSimulatedStatus(null);
      } else {
        setSelectedOrder(null);
        setNotFoundQuery(idParam);
      }
    } else if (allOrders.length > 0) {
      // Default to user's latest placed order
      setSelectedOrder(allOrders[0]);
      setNotFoundQuery(null);
      setSimulatedStatus(null);
    } else {
      setSelectedOrder(null);
      setNotFoundQuery(null);
    }
  }, [location.search, allOrders]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = orderQuery.trim();
    if (!query) return;

    const match = allOrders.find(
      o => o.orderNumber.toLowerCase() === query.toLowerCase() || 
           o.id.toLowerCase() === query.toLowerCase()
    );

    if (match) {
      setSelectedOrder(match);
      setNotFoundQuery(null);
      setSimulatedStatus(null);
      navigate(`/tracking?id=${encodeURIComponent(match.orderNumber)}`, { replace: true });
    } else {
      setSelectedOrder(null);
      setNotFoundQuery(query);
    }
  };

  // Build full tracking info for the active order
  const trackingInfo: OrderTrackingInfo | null = useMemo(() => {
    if (!selectedOrder) return null;
    const base = buildTrackingInfoFromOrder(selectedOrder, language);

    // If customer interacted with stage switcher
    if (simulatedStatus) {
      const stageMap: Record<OrderTrackingStatus, { labelVi: string; labelEn: string; loc: string; lat: number; lng: number }> = {
        placed: { labelVi: 'Đã tiếp nhận đơn hàng', labelEn: 'Order Placed', loc: 'Hệ thống P4Shop', lat: 20.9388, lng: 106.3145 },
        confirmed: { labelVi: 'Đã xác nhận đơn hàng', labelEn: 'Order Confirmed', loc: 'Trung tâm kiểm duyệt P4Shop', lat: 20.9388, lng: 106.3145 },
        packaging: { labelVi: 'Đã đóng gói đơn hàng', labelEn: 'Packaging Completed', loc: 'Tổng Kho P4Shop TP. Hải Dương (128 Nguyễn Lương Bằng)', lat: 20.9388, lng: 106.3145 },
        pickup: { labelVi: 'Đang lấy hàng tại kho Hải Dương', labelEn: 'Carrier Pickup', loc: 'Kho xuất hàng Hải Dương', lat: 20.9420, lng: 106.3200 },
        shipping: { labelVi: 'Đang vận chuyển liên tỉnh (Hải Dương ➔ Hà Nội)', labelEn: 'Interprovincial Transit', loc: 'Quốc Lộ 5A (Km 35 Hải Dương - Hà Nội)', lat: 21.0100, lng: 105.8800 },
        transit_hub: { labelVi: 'Đã đến kho trung chuyển Cầu Giấy (Hà Nội)', labelEn: 'Arrived at Hanoi Transit Hub', loc: 'Bưu cục trung chuyển Cầu Giấy, Hà Nội', lat: 21.0320, lng: 105.7850 },
        delivering: { labelVi: 'Đang giao hàng (Cách bạn ~1.2 km)', labelEn: 'Out for Delivery', loc: 'Đường Hồ Tùng Mậu ➔ Điểm nhận', lat: 21.0350, lng: 105.7760 },
        delivered: { labelVi: 'Giao hàng thành công', labelEn: 'Delivered Successfully', loc: base.destinationAddress, lat: 21.0366, lng: 105.7744 },
      };

      const stageOrder: OrderTrackingStatus[] = ['confirmed', 'packaging', 'pickup', 'shipping', 'transit_hub', 'delivering', 'delivered'];
      const targetIdx = stageOrder.indexOf(simulatedStatus);

      return {
        ...base,
        status: simulatedStatus,
        statusLabel: stageMap[simulatedStatus].labelVi,
        statusLabelEn: stageMap[simulatedStatus].labelEn,
        currentLocationName: stageMap[simulatedStatus].loc,
        courierLat: stageMap[simulatedStatus].lat,
        courierLng: stageMap[simulatedStatus].lng,
        milestones: base.milestones.map(m => {
          const mIdx = stageOrder.indexOf(m.status);
          return {
            ...m,
            completed: mIdx <= targetIdx,
            current: m.status === simulatedStatus,
          };
        }),
      };
    }

    return base;
  }, [selectedOrder, simulatedStatus, language]);

  return (
    <div className="min-h-screen bg-[#F5F6F8] pb-16 font-sans">
      
      {/* 1. Header Hero Banner */}
      <div className="bg-gradient-to-r from-[#0B2A5B] via-[#1E3A8A] to-[#2563EB] text-white py-8 md:py-12 border-b border-blue-900 shadow-md">
        <div className="max-w-[1240px] mx-auto px-4">
          
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-blue-200 mb-4">
            <Link to="/" className="hover:text-white flex items-center gap-1">
              <Home className="w-3.5 h-3.5" />
              <span>{t.common.appName}</span>
            </Link>
            <ChevronRight className="w-3.5 h-3.5 opacity-60" />
            <span className="text-white font-bold">{t.common.trackOrder}</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-xs px-3 py-1 rounded-full text-xs font-semibold text-blue-200 border border-white/15 mb-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Hệ thống giám sát vận đơn P4Shop Express • Tuyến Hải Dương ➔ Hà Nội</span>
              </div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tight">
                {t.tracking.title}
              </h1>
              <p className="text-xs md:text-sm text-blue-100 mt-1 max-w-xl">
                Cập nhật vị trí bưu gửi, thời gian thực và hành trình di chuyển trực tiếp từ Tổng Kho Logistics Hải Dương.
              </p>
            </div>
          </div>

          {/* Search Box */}
          <div className="mt-6 bg-white p-2.5 rounded-2xl shadow-xl max-w-[720px]">
            <form onSubmit={handleSearch} className="flex items-center gap-2">
              <div className="relative flex-1 flex items-center pl-3">
                <Search className="w-5 h-5 text-gray-400 mr-2 shrink-0" />
                <input
                  type="text"
                  value={orderQuery}
                  onChange={(e) => setOrderQuery(e.target.value)}
                  placeholder="Nhập mã đơn hàng của bạn (VD: #P4S-2026...)"
                  className="w-full text-xs sm:text-sm font-semibold text-gray-800 placeholder-gray-400 outline-none py-2"
                />
              </div>
              <button
                type="submit"
                className="bg-[#3B6EF5] hover:bg-blue-600 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-xl transition-colors cursor-pointer shrink-0 shadow-sm"
              >
                Tra cứu ngay
              </button>
            </form>
          </div>

          {/* User's Placed Orders Chips (ONLY REAL ORDERS PLACED BY USER) */}
          {allOrders.length > 0 && (
            <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
              <span className="font-semibold text-white/90">Đơn hàng của bạn ({allOrders.length}):</span>
              {allOrders.map((ord) => {
                const isCurrent = selectedOrder?.orderNumber === ord.orderNumber;
                return (
                  <button
                    key={ord.orderNumber}
                    type="button"
                    onClick={() => {
                      setOrderQuery(ord.orderNumber);
                      setSelectedOrder(ord);
                      setNotFoundQuery(null);
                      setSimulatedStatus(null);
                      navigate(`/tracking?id=${encodeURIComponent(ord.orderNumber)}`, { replace: true });
                    }}
                    className={`font-bold px-3 py-1.5 rounded-lg border transition-all cursor-pointer flex items-center gap-1.5 ${
                      isCurrent
                        ? 'bg-emerald-500 text-white border-emerald-400 shadow-xs'
                        : 'bg-white/15 hover:bg-white/25 text-blue-100 border-white/20'
                    }`}
                  >
                    <Package className="w-3.5 h-3.5" />
                    <span>{ord.orderNumber}</span>
                    <span className="text-[11px] opacity-80">
                      ({ord.items.length} món • {formatVND(ord.totalAmount)})
                    </span>
                  </button>
                );
              })}
            </div>
          )}

        </div>
      </div>

      {/* 2. Main Tracking Content */}
      <div className="max-w-[1240px] mx-auto px-4 py-8">
        
        {/* Case 1: Order query not found */}
        {notFoundQuery && (
          <div className="bg-white rounded-2xl p-8 sm:p-12 text-center border border-gray-200 shadow-sm max-w-[560px] mx-auto my-6">
            <div className="w-16 h-16 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-8 h-8" />
            </div>
            <h2 className="text-lg font-bold text-gray-900">
              Không tìm thấy đơn hàng "{notFoundQuery}"
            </h2>
            <p className="text-xs text-gray-500 mt-2 mb-6 leading-relaxed">
              Vui lòng kiểm tra lại mã vận đơn trong thông báo đặt hàng của bạn. Nếu bạn vừa đặt hàng, mã đơn hàng sẽ được lưu trong mục tài khoản.
            </p>
            {allOrders.length > 0 ? (
              <button
                onClick={() => {
                  setSelectedOrder(allOrders[0]);
                  setNotFoundQuery(null);
                  setOrderQuery(allOrders[0].orderNumber);
                }}
                className="bg-[#3B6EF5] text-white font-bold text-xs px-6 py-2.5 rounded-xl cursor-pointer hover:bg-blue-600 transition-colors"
              >
                Xem đơn hàng gần nhất của bạn ({allOrders[0].orderNumber})
              </button>
            ) : (
              <button
                onClick={() => navigate('/')}
                className="bg-[#3B6EF5] text-white font-bold text-xs px-6 py-2.5 rounded-xl cursor-pointer hover:bg-blue-600 transition-colors"
              >
                Khám phá & Mua sắm ngay
              </button>
            )}
          </div>
        )}

        {/* Case 2: No orders placed yet */}
        {!selectedOrder && !notFoundQuery && (
          <div className="bg-white rounded-3xl p-8 md:p-14 text-center border border-gray-200/80 shadow-md max-w-[680px] mx-auto my-6">
            <div className="w-20 h-20 bg-blue-50 text-[#3B6EF5] rounded-full flex items-center justify-center mx-auto mb-5 shadow-xs">
              <Package className="w-10 h-10" />
            </div>
            <h2 className="text-xl md:text-2xl font-black text-gray-900 mb-2">
              Bạn chưa có đơn hàng nào cần theo dõi
            </h2>
            <p className="text-xs md:text-sm text-gray-600 mb-6 leading-relaxed max-w-lg mx-auto">
              Thông tin vận chuyển và hành trình trực tiếp chỉ hiển thị sau khi bạn đã đặt mua sản phẩm thành công trên P4Shop. Bưu phẩm sẽ được điều phối xuất kho từ Tổng Kho Logistics TP. Hải Dương và chuyển phát nhanh về địa chỉ của bạn!
            </p>
            <button
              onClick={() => navigate('/')}
              className="bg-[#F0471C] hover:bg-[#d83c13] text-white font-bold text-xs md:text-sm px-8 py-3.5 rounded-xl transition-all shadow-md cursor-pointer inline-flex items-center gap-2 uppercase tracking-wide"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Mua sắm & Đặt hàng ngay</span>
            </button>
          </div>
        )}

        {/* Case 3: Order found & tracking loaded */}
        {selectedOrder && trackingInfo && (
          <div className="space-y-6">
            
            {/* Disclaimer & Transparency Banner */}
            <div className="p-3.5 bg-blue-50/80 border border-blue-200/80 rounded-xl text-xs text-blue-900 flex items-start gap-2.5 shadow-2xs">
              <Info className="w-4 h-4 text-[#3B6EF5] shrink-0 mt-0.5" />
              <div className="leading-relaxed">
                <span className="font-bold">Lưu ý minh bạch: </span>
                <span>
                  {trackingInfo.disclaimerText}
                </span>
              </div>
            </div>

            {/* Top Status Card: Order Info + Current Location */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-xs space-y-6">
              
              {/* Top row */}
              <div className="flex flex-col md:flex-row md:items-center justify-between pb-5 border-b border-gray-100 gap-4">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">MÃ ĐƠN HÀNG:</span>
                    <span className="font-mono text-base sm:text-lg font-black text-blue-800 bg-blue-50 px-3 py-1 rounded-md border border-blue-200">
                      {trackingInfo.orderNumber}
                    </span>
                    <span className="bg-emerald-50 text-emerald-700 text-xs font-bold px-2.5 py-1 rounded-full border border-emerald-200">
                      ✓ Đã xác nhận &amp; Bảo vệ Escrow
                    </span>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-black text-gray-900 mt-2">
                    {trackingInfo.statusLabel}
                  </h2>
                  
                  <p className="text-xs text-gray-500 mt-1 flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5 text-blue-600" />
                    <span>Đơn vị: <strong>{trackingInfo.shippingProvider}</strong></span>
                  </p>
                </div>

                <div className="bg-[#FAFBFD] p-4 rounded-xl border border-gray-200 text-xs space-y-1.5 shrink-0">
                  <div className="flex items-center gap-1.5 text-gray-500">
                    <Clock className="w-3.5 h-3.5 text-amber-600" />
                    <span>Dự kiến giao hàng:</span>
                  </div>
                  <p className="font-bold text-gray-900 text-sm">
                    {trackingInfo.estimatedDelivery}
                  </p>
                  <p className="text-[11px] text-emerald-600 font-semibold">
                    Cam kết giao hỏa tốc 24 giờ P4Shop Rocket
                  </p>
                </div>
              </div>

              {/* 3-Column Route Info: Điểm xuất phát ➔ Vị trí hiện tại ➔ Điểm đến */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                {/* 1. Điểm xuất phát */}
                <div className="bg-gray-50/80 p-4 rounded-xl border border-gray-200/80 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-gray-500 uppercase">
                    <Building2 className="w-3.5 h-3.5 text-[#0B2A5B]" />
                    <span>Điểm xuất phát:</span>
                  </div>
                  <p className="text-xs font-bold text-gray-900 leading-snug">
                    {trackingInfo.originAddress}
                  </p>
                  <p className="text-[11px] text-gray-500">
                    Kho trung tâm Logistics P4Shop Hải Dương
                  </p>
                </div>

                {/* 2. Vị trí hiện tại */}
                <div className="bg-blue-50/60 p-4 rounded-xl border border-blue-200/80 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#3B6EF5] uppercase">
                    <Navigation className="w-3.5 h-3.5 text-[#3B6EF5] animate-pulse" />
                    <span>Vị trí hiện tại:</span>
                  </div>
                  <p className="text-xs font-bold text-blue-900 leading-snug">
                    {trackingInfo.currentLocationName}
                  </p>
                  <p className="text-[11px] text-blue-600 flex items-center gap-1">
                    <RefreshCw className="w-3 h-3 animate-spin" />
                    <span>Cập nhật gần nhất: {trackingInfo.lastUpdatedAt}</span>
                  </p>
                </div>

                {/* 3. Điểm đến */}
                <div className="bg-gray-50/80 p-4 rounded-xl border border-gray-200/80 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#F0471C] uppercase">
                    <MapPin className="w-3.5 h-3.5 text-[#F0471C]" />
                    <span>Điểm đến (Người nhận):</span>
                  </div>
                  <p className="text-xs font-bold text-gray-900 leading-snug">
                    {selectedOrder.shippingAddress.fullName} ({selectedOrder.shippingAddress.phone})
                  </p>
                  <p className="text-[11px] text-gray-600 truncate">
                    {trackingInfo.destinationAddress}
                  </p>
                </div>

              </div>

              {/* Stage Switcher Controls (Mô phỏng hành trình trực quan) */}
              <div className="pt-2 border-t border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-gray-700 uppercase flex items-center gap-1">
                    <span>Mô phỏng các trạng thái vận chuyển:</span>
                  </span>
                  <span className="text-[11px] text-gray-400">
                    Nhấn vào từng mốc để xem sự thay đổi hành trình trực quan
                  </span>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {[
                    { id: 'confirmed', label: '1. Đã xác nhận' },
                    { id: 'packaging', label: '2. Đã đóng gói' },
                    { id: 'pickup', label: '3. Đang lấy hàng' },
                    { id: 'shipping', label: '4. Đang vận chuyển' },
                    { id: 'transit_hub', label: '5. Đến kho trung chuyển' },
                    { id: 'delivering', label: '6. Đang giao hàng' },
                    { id: 'delivered', label: '7. Giao thành công' },
                  ].map((st) => (
                    <button
                      key={st.id}
                      type="button"
                      onClick={() => setSimulatedStatus(st.id as OrderTrackingStatus)}
                      className={`text-xs font-semibold px-2.5 py-1.5 rounded-lg border transition-all cursor-pointer ${
                        trackingInfo.status === st.id
                          ? 'bg-[#3B6EF5] text-white border-[#3B6EF5] font-bold shadow-xs'
                          : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border-gray-200'
                      }`}
                    >
                      {st.label}
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Interactive GPS Leaflet Map Component */}
            <DeliveryMap trackingInfo={trackingInfo} />

            {/* 2-Column: Shipment Milestones Timeline & Ordered Items List */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              
              {/* Left Column: 7 Stages Timeline (7 cols) */}
              <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-gray-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                  <h3 className="font-bold text-sm text-gray-900 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#3B6EF5]" />
                    <span>Lịch trình vận chuyển chi tiết</span>
                  </h3>
                  <span className="text-xs text-gray-400 font-mono">
                    7 Trạng thái chuẩn
                  </span>
                </div>

                <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-gray-200">
                  {trackingInfo.milestones.map((m, idx) => (
                    <div key={idx} className="relative group">
                      
                      {/* Indicator Dot */}
                      <div className={`absolute -left-6 top-0.5 w-5 h-5 rounded-full flex items-center justify-center ring-4 ring-white ${
                        m.current
                          ? 'bg-[#3B6EF5] text-white shadow-md animate-pulse'
                          : m.completed
                          ? 'bg-emerald-500 text-white'
                          : 'bg-gray-200 text-gray-400'
                      }`}>
                        {m.completed ? (
                          <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.5]" />
                        ) : (
                          <div className="w-1.5 h-1.5 rounded-full bg-current" />
                        )}
                      </div>

                      {/* Content */}
                      <div>
                        <div className="flex items-baseline justify-between gap-2">
                          <h4 className={`text-xs font-bold ${
                            m.current 
                              ? 'text-[#3B6EF5] text-sm' 
                              : m.completed 
                              ? 'text-gray-900' 
                              : 'text-gray-400'
                          }`}>
                            {m.title}
                          </h4>
                          <span className="text-[11px] font-mono text-gray-400 shrink-0">
                            {m.time}
                          </span>
                        </div>
                        <p className="text-xs text-gray-600 mt-0.5 leading-normal">
                          {m.description}
                        </p>
                        <p className="text-[11px] text-gray-400 mt-0.5 flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-gray-400" />
                          <span>{m.locationName}</span>
                        </p>
                      </div>

                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Ordered Items Summary (5 cols) */}
              <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-gray-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                  <h3 className="font-bold text-sm text-gray-900 flex items-center gap-2">
                    <Package className="w-4 h-4 text-[#3B6EF5]" />
                    <span>Sản phẩm trong đơn ({trackingInfo.items.length})</span>
                  </h3>
                  <span className="text-xs font-bold text-[#F0471C]">
                    {formatVND(selectedOrder.totalAmount)}
                  </span>
                </div>

                <div className="divide-y divide-gray-100">
                  {trackingInfo.items.map((it, idx) => (
                    <div key={idx} className="py-3 first:pt-0 last:pb-0 flex items-center gap-3">
                      <div className="w-14 h-14 rounded-lg overflow-hidden border border-gray-200 bg-gray-50 shrink-0">
                        <img src={it.image} alt={it.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0 text-xs">
                        <h4 className="font-semibold text-gray-900 truncate">
                          {it.name}
                        </h4>
                        {it.variantName && (
                          <p className="text-[11px] text-gray-400 mt-0.5">
                            Phân loại: {it.variantName}
                          </p>
                        )}
                        <div className="flex items-center justify-between mt-1 text-gray-500">
                          <span>Số lượng: x{it.quantity}</span>
                          <span className="font-bold text-gray-900">
                            {formatVND(it.price * it.quantity)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Recipient & Payment Method info */}
                <div className="pt-4 border-t border-gray-100 space-y-2 text-xs text-gray-600 bg-gray-50/60 p-3 rounded-xl">
                  <div className="flex justify-between">
                    <span>Người nhận:</span>
                    <strong className="text-gray-900">{selectedOrder.shippingAddress.fullName}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Số điện thoại:</span>
                    <strong className="text-gray-900">{selectedOrder.shippingAddress.phone}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Thanh toán:</span>
                    <span className="font-semibold text-blue-700 uppercase">
                      {selectedOrder.paymentMethod === 'e-wallet' && 'Ví điện tử'}
                      {selectedOrder.paymentMethod === 'bank-card' && 'Thẻ ngân hàng'}
                      {selectedOrder.paymentMethod === 'cod' && 'Thanh toán COD'}
                    </span>
                  </div>
                  <div className="flex justify-between border-t border-gray-200/60 pt-2 font-bold text-gray-900">
                    <span>Tổng tiền thanh toán:</span>
                    <span className="text-[#F0471C] text-sm">
                      {formatVND(selectedOrder.totalAmount)}
                    </span>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="pt-2 flex items-center gap-2">
                  <button
                    onClick={() => navigate('/')}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs py-2.5 px-4 rounded-xl transition-colors cursor-pointer text-center"
                  >
                    Tiếp tục mua hàng
                  </button>
                  <Link
                    to="/terms"
                    className="text-xs text-blue-600 hover:underline px-2"
                  >
                    Điều khoản ›
                  </Link>
                </div>

              </div>

            </div>

          </div>
        )}

      </div>

    </div>
  );
};
