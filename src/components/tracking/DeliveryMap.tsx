import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Truck, MapPin, Navigation, Compass, Phone } from 'lucide-react';
import { OrderTrackingInfo } from '../../types';
import { useCart } from '../../context/CartContext';

interface DeliveryMapProps {
  trackingInfo: OrderTrackingInfo;
}

export const DeliveryMap: React.FC<DeliveryMapProps> = ({ trackingInfo }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const { language, t } = useCart();

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Clean up prior map instance if any
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    const { warehouseLat, warehouseLng, courierLat, courierLng, destinationLat, destinationLng } = trackingInfo;

    // Center map around courier or mid-point
    const midLat = (warehouseLat + destinationLat) / 2;
    const midLng = (warehouseLng + destinationLng) / 2;

    const map = L.map(mapContainerRef.current, {
      center: [midLat, midLng],
      zoom: 14,
      zoomControl: true,
      scrollWheelZoom: false,
    });

    mapInstanceRef.current = map;

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors | P4Shop TMU Logistics',
      maxZoom: 19,
    }).addTo(map);

    // Custom Warehouse Icon
    const warehouseIcon = L.divIcon({
      className: 'custom-warehouse-icon',
      html: `
        <div style="background:#0B2A5B;color:white;width:38px;height:38px;border-radius:50%;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 10px rgba(0,0,0,0.3);border:3px solid #ffffff;font-size:18px;">
          🏢
        </div>
      `,
      iconSize: [38, 38],
      iconAnchor: [19, 19],
    });

    // Custom Courier Icon with Pulsing Radar
    const courierIcon = L.divIcon({
      className: 'custom-courier-icon',
      html: `
        <div style="position:relative;width:46px;height:46px;display:flex;align-items:center;justify-content:center;">
          <div style="position:absolute;inset:0;background:rgba(59,110,245,0.35);border-radius:50%;animation:ping 1.5s cubic-bezier(0,0,0.2,1) infinite;"></div>
          <div style="position:relative;background:#3B6EF5;color:white;width:38px;height:38px;border-radius:50%;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 12px rgba(59,110,245,0.6);border:3px solid #ffffff;font-size:18px;">
            🛵
          </div>
        </div>
      `,
      iconSize: [46, 46],
      iconAnchor: [23, 23],
    });

    // Custom Destination Icon
    const destinationIcon = L.divIcon({
      className: 'custom-dest-icon',
      html: `
        <div style="background:#F0471C;color:white;width:38px;height:38px;border-radius:50%;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 10px rgba(240,71,28,0.4);border:3px solid #ffffff;font-size:18px;">
          📍
        </div>
      `,
      iconSize: [38, 38],
      iconAnchor: [19, 19],
    });

    // Markers
    const warehouseMarker = L.marker([warehouseLat, warehouseLng], { icon: warehouseIcon }).addTo(map);
    warehouseMarker.bindPopup(`
      <div style="font-family:sans-serif;padding:3px;min-width:180px;">
        <span style="background:#0B2A5B;color:white;font-size:9px;font-weight:bold;padding:1px 6px;border-radius:4px;display:inline-block;margin-bottom:3px;">ĐIỂM XUẤT PHÁT</span>
        <strong style="color:#0B2A5B;font-size:12px;display:block;">${language === 'en' ? 'P4Shop Logistics Hub - Hai Duong' : 'Tổng Kho Logistics P4Shop (TP. Hải Dương)'}</strong>
        <p style="margin:2px 0 0;font-size:11px;color:#555;">Số 1 Đại lộ Bạch Đằng, Trung tâm TP. Hải Dương</p>
      </div>
    `);

    const courierMarker = L.marker([courierLat, courierLng], { icon: courierIcon }).addTo(map);
    courierMarker.bindPopup(`
      <div style="font-family:sans-serif;padding:3px;min-width:180px;">
        <span style="background:#3B6EF5;color:white;font-size:9px;font-weight:bold;padding:1px 6px;border-radius:4px;display:inline-block;margin-bottom:3px;">SHIPPER TRÊN ĐƯỜNG</span>
        <strong style="color:#3B6EF5;font-size:12px;display:block;">${language === 'en' ? 'Courier: ' : 'Shipper: '}${trackingInfo.courierName}</strong>
        <p style="margin:2px 0 0;font-size:11px;color:#333;">Biển số: <strong>${trackingInfo.courierVehiclePlate}</strong></p>
        <p style="margin:2px 0 0;font-size:11px;color:#16a34a;font-weight:bold;">${language === 'en' ? 'En route • Live tracking' : 'Đang di chuyển trên tuyến Hải Dương ➔ TMU'}</p>
      </div>
    `).openPopup();

    const destMarker = L.marker([destinationLat, destinationLng], { icon: destinationIcon }).addTo(map);
    destMarker.bindPopup(`
      <div style="font-family:sans-serif;padding:3px;min-width:180px;">
        <span style="background:#F0471C;color:white;font-size:9px;font-weight:bold;padding:1px 6px;border-radius:4px;display:inline-block;margin-bottom:3px;">ĐIỂM NHẬN HÀNG</span>
        <strong style="color:#F0471C;font-size:12px;display:block;">${language === 'en' ? 'Thuongmai University (TMU)' : 'Trường Đại học Thương Mại'}</strong>
        <p style="margin:2px 0 0;font-size:11px;color:#555;">Số 79 Đường Hồ Tùng Mậu, Phường Mai Dịch, Cầu Giấy, Hà Nội</p>
      </div>
    `);

    // Route Polyline (Hai Duong Center -> QL5A -> Gia Lam -> Hanoi -> TMU)
    const latlngs: [number, number][] = [
      [warehouseLat, warehouseLng], // Hai Duong: 20.9388, 106.3145
      [20.9420, 106.2850],          // QL5 junction
      [20.9480, 106.1850],          // Lai Cach / Cam Giang
      [20.9650, 106.0420],          // Pho Noi, Hung Yen
      [20.9850, 105.9750],          // Nhu Quynh
      [20.9980, 105.9150],          // Gia Lam, Hanoi
      [21.0020, 105.8750],          // Vinh Tuy / Ring Road 3
      [courierLat, courierLng],      // Live courier location
      [destinationLat, destinationLng], // TMU: 21.0366, 105.7744
    ];

    const polyline = L.polyline(latlngs, {
      color: '#3B6EF5',
      weight: 5,
      opacity: 0.85,
      dashArray: '8, 8',
    }).addTo(map);

    // Fit bounds to show entire route from Hai Duong to TMU
    map.fitBounds(polyline.getBounds(), { padding: [50, 50] });

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, [trackingInfo, language]);

  const handleCenterOnCourier = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setView([trackingInfo.courierLat, trackingInfo.courierLng], 15, {
        animate: true,
      });
    }
  };

  const handleFitAll = () => {
    if (mapInstanceRef.current) {
      const bounds = L.latLngBounds([
        [trackingInfo.warehouseLat, trackingInfo.warehouseLng],
        [trackingInfo.destinationLat, trackingInfo.destinationLng],
      ]);
      mapInstanceRef.current.fitBounds(bounds, { padding: [50, 50], animate: true });
    }
  };

  const handleCenterOnWarehouse = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setView([trackingInfo.warehouseLat, trackingInfo.warehouseLng], 15, {
        animate: true,
      });
    }
  };

  const handleCenterOnDestination = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setView([trackingInfo.destinationLat, trackingInfo.destinationLng], 15, {
        animate: true,
      });
    }
  };

  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-gray-200 shadow-md bg-white">
      {/* Map Header Overlay */}
      <div className="p-4 bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-xs">
            <Compass className="w-5 h-5 text-blue-300 animate-spin-slow" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <h3 className="font-extrabold text-sm tracking-wide">
                {t.tracking.deliveryMap}
              </h3>
              <span className="bg-blue-500/30 text-blue-200 text-[10px] font-bold px-2 py-0.5 rounded">
                Live GPS 24h
              </span>
            </div>
            <p className="text-xs text-blue-200/80 mt-0.5">
              {t.tracking.routeInfo}
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleCenterOnCourier}
            className="bg-white/15 hover:bg-white/25 text-white text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer backdrop-blur-xs"
          >
            <Navigation className="w-3.5 h-3.5 text-blue-300" />
            <span>{language === 'en' ? 'Locate Driver' : 'Vị trí Shipper'}</span>
          </button>
          <button
            onClick={handleFitAll}
            className="bg-white/15 hover:bg-white/25 text-white text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer backdrop-blur-xs"
          >
            <MapPin className="w-3.5 h-3.5 text-orange-300" />
            <span>{language === 'en' ? 'View Entire Route' : 'Xem toàn tuyến'}</span>
          </button>
        </div>
      </div>

      {/* Real Leaflet Map Container */}
      <div 
        ref={mapContainerRef} 
        className="w-full h-[360px] md:h-[420px] z-10" 
      />

      {/* Floating Driver Status Bar */}
      <div className="p-4 bg-white border-t border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <img
            src={trackingInfo.courierAvatar}
            alt={trackingInfo.courierName}
            className="w-12 h-12 rounded-full object-cover border-2 border-blue-500 shadow-xs"
          />
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-gray-900 text-sm">{trackingInfo.courierName}</span>
              <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-200">
                ⭐ 4.9 (1.2k+ lượt giao)
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-0.5">
              {t.tracking.courierPlate}: <strong className="text-gray-800">{trackingInfo.courierVehiclePlate}</strong> • {trackingInfo.shippingProvider}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <a
            href={`tel:${trackingInfo.courierPhone}`}
            onClick={(e) => {
              e.preventDefault();
              alert(language === 'en' ? `Calling courier ${trackingInfo.courierName} at ${trackingInfo.courierPhone}` : `Đang kết nối cuộc gọi tới Shipper ${trackingInfo.courierName} (${trackingInfo.courierPhone})`);
            }}
            className="flex-1 sm:flex-none bg-[#3B6EF5] hover:bg-blue-600 text-white font-bold text-xs py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>{t.tracking.callCourier} ({trackingInfo.courierPhone})</span>
          </a>
        </div>
      </div>

      {/* Live Notice Banner */}
      <div className="px-4 py-2.5 bg-blue-50/80 border-t border-blue-100 text-xs text-blue-900 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Truck className="w-4 h-4 text-[#3B6EF5] shrink-0" />
          <span>{t.tracking.liveLocationDesc}</span>
        </div>
        <span className="font-extrabold text-[#3B6EF5] shrink-0 hidden sm:inline">
          {trackingInfo.estimatedDelivery}
        </span>
      </div>
    </div>
  );
};
