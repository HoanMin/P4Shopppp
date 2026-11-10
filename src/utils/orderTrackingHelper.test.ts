import test from 'node:test';
import assert from 'node:assert/strict';
import { buildTrackingInfoFromOrder } from './orderTrackingHelper';
import { Order } from '../types';

test('buildTrackingInfoFromOrder generates compliant tracking data with Hai Duong and Hanoi routes', () => {
  const mockOrder: Order = {
    id: 'ord_test_123',
    orderNumber: '#P4S-20261110-8899',
    items: [
      {
        id: 'item-1',
        product: {
          id: 'earphone-bt-01',
          name: 'Tai nghe Bluetooth không dây Air Pro TWS Khử Ồn ENC',
          brand: 'P4Shop Sound',
          category: 'electronics',
          subcategory: 'Tai nghe',
          originalPrice: 499000,
          currentPrice: 399000,
          discountPercent: 20,
          rating: 4.8,
          reviewCount: 3500,
          image: '/assets/sample.png',
          images: ['/assets/sample.png'],
          fastDelivery: true,
          deliveryDateText: 'Giao ngày mai',
          freeShipping: false,
          condition: 'new',
          conditionText: 'Mới 100%',
          variantsCount: 3,
          verified: true,
          description: 'Mô tả',
          specs: {},
          variants: [{ id: 'v-blk', name: 'Đen', price: 399000, inStock: true }],
        },
        variant: { id: 'v-blk', name: 'Đen', price: 399000, inStock: true },
        quantity: 1,
        selected: true,
      },
    ],
    shippingAddress: {
      fullName: 'Lê Nguyễn Hà Anh',
      phone: '0912 345 678',
      address: 'Trường Đại học Thương Mại, Số 79 Đường Hồ Tùng Mậu',
      district: 'Quận Cầu Giấy',
      city: 'TP. Hà Nội',
    },
    paymentMethod: 'e-wallet',
    subtotal: 399000,
    shippingFee: 25000,
    discountAmount: 50000,
    totalAmount: 374000,
    createdAt: new Date().toISOString(),
    termsRecord: {
      acceptedAt: new Date().toISOString(),
      termsVersion: 'v2.4',
      coreTermsAccepted: true,
      marketingAccepted: false,
      clientIp: '113.161.45.88',
    },
    status: 'confirmed',
  };

  const tracking = buildTrackingInfoFromOrder(mockOrder, 'vi');

  // Verify essentials required by user
  assert.equal(tracking.orderNumber, '#P4S-20261110-8899');
  assert.equal(tracking.items.length, 1);
  assert.equal(tracking.items[0].name, 'Tai nghe Bluetooth không dây Air Pro TWS Khử Ồn ENC');
  
  // Origin & Destination
  assert.match(tracking.originAddress, /Hải Dương/);
  assert.match(tracking.destinationAddress, /Hồ Tùng Mậu/);
  
  // 7 Stages
  assert.equal(tracking.milestones.length, 7);
  assert.equal(tracking.isSimulated, true);
  assert.match(tracking.disclaimerText, /minh họa/);
});
