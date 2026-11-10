import { Order, OrderTrackingInfo, OrderMilestone, OrderTrackingStatus } from '../types';

/**
 * Builds realistic, compliant shipment tracking info for any actual customer order
 * Prioritizing route logistics from Hai Duong Central Hub to Hanoi / TMU and customer address
 */
export function buildTrackingInfoFromOrder(order: Order, language: 'vi' | 'en' | 'ko' = 'vi'): OrderTrackingInfo {
  const createdDate = new Date(order.createdAt);
  const now = new Date();
  const minutesSinceCreated = Math.max(0, Math.floor((now.getTime() - createdDate.getTime()) / (1000 * 60)));

  // Determine stage based on realistic progression or order status
  let currentStatus: OrderTrackingStatus = 'shipping';
  let statusLabelVi = 'Đang vận chuyển liên tỉnh (Hải Dương ➔ Hà Nội)';
  let statusLabelEn = 'Interprovincial Shipping (Hai Duong ➔ Hanoi)';
  let currentLocationName = 'Trục Quốc Lộ 5A (Hải Dương ➔ Hà Nội, Km 35)';
  let courierLat = 20.9850;
  let courierLng = 20.0000;

  if (order.status === 'confirmed' || minutesSinceCreated < 5) {
    currentStatus = 'confirmed';
    statusLabelVi = 'Đã xác nhận đơn hàng';
    statusLabelEn = 'Order Confirmed';
    currentLocationName = 'Hệ thống kiểm duyệt đơn hàng P4Shop TMU';
    courierLat = 20.9388;
    courierLng = 106.3145;
  } else if (order.status === 'packaging' || minutesSinceCreated < 15) {
    currentStatus = 'packaging';
    statusLabelVi = 'Đã đóng gói tại Tổng kho Hải Dương';
    statusLabelEn = 'Packed at Hai Duong Logistics Hub';
    currentLocationName = 'Tổng kho P4Shop TP. Hải Dương (128 Nguyễn Lương Bằng)';
    courierLat = 20.9388;
    courierLng = 106.3145;
  } else if (order.status === 'pickup' || minutesSinceCreated < 30) {
    currentStatus = 'pickup';
    statusLabelVi = 'Đang lấy hàng tại kho Hải Dương';
    statusLabelEn = 'Courier Picking up at Warehouse';
    currentLocationName = 'Kho điều phối xuất hàng P4Shop Express Hải Dương';
    courierLat = 20.9420;
    courierLng = 106.3200;
  } else if (order.status === 'shipping' || minutesSinceCreated < 90) {
    currentStatus = 'shipping';
    statusLabelVi = 'Đang vận chuyển liên tỉnh (Hải Dương ➔ Hà Nội)';
    statusLabelEn = 'Interprovincial Transit (Hai Duong to Hanoi)';
    currentLocationName = 'Đang di chuyển trên Quốc Lộ 5A hướng về Hà Nội';
    courierLat = 21.0100;
    courierLng = 105.8800;
  } else if (order.status === 'transit_hub' || minutesSinceCreated < 180) {
    currentStatus = 'transit_hub';
    statusLabelVi = 'Đã đến kho trung chuyển Cầu Giấy (Hà Nội)';
    statusLabelEn = 'Arrived at Hanoi Sorting Hub (Cau Giay)';
    currentLocationName = 'Bưu cục trung chuyển Cầu Giấy, Hà Nội';
    courierLat = 21.0320;
    courierLng = 105.7850;
  } else if (order.status === 'delivering' || minutesSinceCreated < 300) {
    currentStatus = 'delivering';
    statusLabelVi = 'Đang giao hàng (Cách địa chỉ nhận ~1.2 km)';
    statusLabelEn = 'Out for Delivery (1.2 km away)';
    currentLocationName = 'Shipper đang trên đường Hồ Tùng Mậu tới địa chỉ của bạn';
    courierLat = 21.0350;
    courierLng = 105.7760;
  } else {
    currentStatus = 'delivered';
    statusLabelVi = 'Giao hàng thành công';
    statusLabelEn = 'Delivered Successfully';
    currentLocationName = 'Đã bàn giao tại địa chỉ người nhận';
    courierLat = 21.0366;
    courierLng = 105.7744;
  }

  // Format delivery estimate
  const estDate = new Date(createdDate.getTime() + 24 * 3600 * 1000);
  const timeStr = `${estDate.getHours().toString().padStart(2, '0')}:${estDate.getMinutes().toString().padStart(2, '0')}`;
  const dateStr = `${estDate.getDate()}/${estDate.getMonth() + 1}/${estDate.getFullYear()}`;
  const estimatedDelivery = `${timeStr} ngày ${dateStr}`;
  const estimatedDeliveryEn = `${timeStr} on ${dateStr}`;

  const originAddress = 'Tổng Kho Logistics P4Shop TP. Hải Dương - Số 128 Đường Nguyễn Lương Bằng, TP. Hải Dương';
  const destinationAddress = `${order.shippingAddress.address}, ${order.shippingAddress.district ? order.shippingAddress.district + ', ' : ''}${order.shippingAddress.city}`;

  const createdTimeStr = `${createdDate.getHours().toString().padStart(2, '0')}:${createdDate.getMinutes().toString().padStart(2, '0')}`;

  const milestones: OrderMilestone[] = [
    {
      status: 'confirmed',
      title: 'Đã xác nhận đơn hàng',
      titleEn: 'Order Confirmed',
      description: 'Hệ thống P4Shop ghi nhận thanh toán & kiểm duyệt giao dịch thành công',
      descriptionEn: 'Payment verified & transaction approved',
      time: `${createdTimeStr} ${createdDate.toLocaleDateString('vi-VN')}`,
      completed: true,
      current: currentStatus === 'confirmed',
      locationName: 'P4Shop Order System',
    },
    {
      status: 'packaging',
      title: 'Đã đóng gói đơn hàng',
      titleEn: 'Packaging Completed',
      description: 'Hàng hóa đã được kiểm tra chất lượng, bọc chống sốc và dán niêm phong',
      descriptionEn: 'Inspected, bubble wrapped and sealed',
      time: `+15 phút sau`,
      completed: ['packaging', 'pickup', 'shipping', 'transit_hub', 'delivering', 'delivered'].includes(currentStatus),
      current: currentStatus === 'packaging',
      locationName: 'Tổng Kho P4Shop Logistics TP. Hải Dương',
    },
    {
      status: 'pickup',
      title: 'Đang lấy hàng',
      titleEn: 'Carrier Pickup',
      description: 'Bưu tá P4Shop Express đã tiếp nhận kiện hàng từ thủ kho',
      descriptionEn: 'Handed over to P4Shop Express courier',
      time: `+30 phút sau`,
      completed: ['pickup', 'shipping', 'transit_hub', 'delivering', 'delivered'].includes(currentStatus),
      current: currentStatus === 'pickup',
      locationName: 'Kho xuất hàng Hải Dương',
    },
    {
      status: 'shipping',
      title: 'Đang vận chuyển liên tỉnh',
      titleEn: 'Interprovincial Transit',
      description: 'Xe vận tải trung chuyển di chuyển tuyến Hải Dương ➔ Hà Nội qua Quốc Lộ 5A',
      descriptionEn: 'Transporting via National Highway 5A to Hanoi',
      time: `+1 giờ sau`,
      completed: ['shipping', 'transit_hub', 'delivering', 'delivered'].includes(currentStatus),
      current: currentStatus === 'shipping',
      locationName: 'Quốc Lộ 5A (Hải Dương ➔ Hà Nội)',
    },
    {
      status: 'transit_hub',
      title: 'Đã đến kho trung chuyển',
      titleEn: 'Arrived at Transit Hub',
      description: 'Bưu phẩm đã cập bến Trung tâm phân loại hàng hóa Cầu Giấy (Hà Nội)',
      descriptionEn: 'Arrived at Hanoi Central Sorting Hub (Cau Giay)',
      time: `+3 giờ sau`,
      completed: ['transit_hub', 'delivering', 'delivered'].includes(currentStatus),
      current: currentStatus === 'transit_hub',
      locationName: 'Bưu cục trung chuyển Cầu Giấy, Hà Nội',
    },
    {
      status: 'delivering',
      title: 'Đang giao hàng',
      titleEn: 'Out for Delivery',
      description: 'Shipper Nguyễn Văn Tuấn đang di chuyển phát tận tay người nhận',
      descriptionEn: 'Courier is en route to recipient location',
      time: `Hôm nay`,
      completed: ['delivering', 'delivered'].includes(currentStatus),
      current: currentStatus === 'delivering',
      locationName: 'Đường Hồ Tùng Mậu ➔ Điểm nhận',
    },
    {
      status: 'delivered',
      title: 'Giao hàng thành công',
      titleEn: 'Delivered Successfully',
      description: `Bàn giao đầy đủ cho ${order.shippingAddress.fullName} tại ${order.shippingAddress.address}`,
      descriptionEn: `Handed over to ${order.shippingAddress.fullName}`,
      time: `Dự kiến: ${estimatedDelivery}`,
      completed: currentStatus === 'delivered',
      current: currentStatus === 'delivered',
      locationName: destinationAddress,
    },
  ];

  return {
    orderNumber: order.orderNumber,
    status: currentStatus,
    statusLabel: statusLabelVi,
    statusLabelEn: statusLabelEn,
    originAddress,
    currentLocationName,
    destinationAddress,
    lastUpdatedAt: new Date().toLocaleTimeString('vi-VN') + ' ' + new Date().toLocaleDateString('vi-VN'),
    estimatedDelivery,
    estimatedDeliveryEn,
    shippingProvider: 'P4Shop Rocket Express (Giao hàng 24h)',
    courierName: 'Nguyễn Văn Tuấn',
    courierPhone: '0988 123 456',
    courierVehiclePlate: '29-S1 889.24',
    courierAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    warehouseLat: 20.9388,
    warehouseLng: 106.3145, // TP. Hải Dương
    courierLat: courierLat,
    courierLng: courierLng,
    destinationLat: 21.0366,
    destinationLng: 105.7744, // Đại học Thương Mại (79 Hồ Tùng Mậu)
    isSimulated: true,
    disclaimerText: 'Thông tin mô phỏng hành trình vận chuyển minh họa nội bộ P4Shop Express. Chưa kết nối API đơn vị vận chuyển bên ngoài.',
    items: order.items.map(item => ({
      name: item.product.name,
      nameEn: item.product.nameEn,
      quantity: item.quantity,
      image: item.product.image,
      price: item.variant.price || item.product.currentPrice,
      variantName: item.variant.name,
    })),
    milestones,
  };
}
