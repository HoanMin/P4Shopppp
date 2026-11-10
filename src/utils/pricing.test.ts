import test from 'node:test';
import assert from 'node:assert/strict';
import { formatVND, calculateOrderTotals, validateTermsAcceptance, generateDemoOrderNumber } from './pricing';
import { CartItem } from '../types';
import { getLocalizedProduct } from './productLocalization';

test('formatVND formats Vietnamese Dong properly with dot separator', () => {
  assert.equal(formatVND(399000), '399.000 ₫');
  assert.equal(formatVND(25000), '25.000 ₫');
  assert.equal(formatVND(374000), '374.000 ₫');
  assert.equal(formatVND(0), '0 ₫');
});

test('calculateOrderTotals computes standard flagship item correctly', () => {
  const dummyItem: CartItem = {
    id: 'item-1',
    product: {
      id: 'earphone-tws-01',
      name: 'Tai nghe Bluetooth không dây',
      brand: 'Acro',
      category: 'electronics',
      subcategory: 'Tai nghe TWS',
      originalPrice: 499000,
      currentPrice: 399000,
      discountPercent: 20,
      rating: 4.8,
      reviewCount: 3532,
      image: '/assets/sample.png',
      images: ['/assets/sample.png'],
      fastDelivery: true,
      deliveryDateText: 'Giao ngày mai (T5)',
      freeShipping: false,
      condition: 'new',
      conditionText: 'Mới',
      variantsCount: 3,
      verified: true,
      description: 'Tai nghe bluetooth',
      specs: {},
      variants: [{ id: 'v-black', name: 'Màu đen / 01', price: 399000, inStock: true }],
    },
    variant: { id: 'v-black', name: 'Màu đen / 01', price: 399000, inStock: true },
    quantity: 1,
    selected: true,
  };

  // Subtotal: 399.000, Shipping: 25.000, Discount: 50.000 -> Total: 374.000 (Exact match of Image 1!)
  const totals = calculateOrderTotals([dummyItem], 50000, 500000);
  assert.equal(totals.subtotal, 399000);
  assert.equal(totals.shippingFee, 25000);
  assert.equal(totals.discountAmount, 50000);
  assert.equal(totals.totalAmount, 374000);
  assert.equal(totals.itemCount, 1);
});

test('calculateOrderTotals applies free shipping voucher correctly', () => {
  const dummyItem: CartItem = {
    id: 'item-1',
    product: {
      id: 'prod-01',
      name: 'Bột cần tây',
      brand: 'TMU',
      category: 'health',
      subcategory: 'Bột thảo mộc',
      originalPrice: 260000,
      currentPrice: 175000,
      discountPercent: 33,
      rating: 4.7,
      reviewCount: 120,
      image: '/assets/sample.png',
      images: ['/assets/sample.png'],
      fastDelivery: true,
      deliveryDateText: 'Giao ngày mai',
      freeShipping: false,
      condition: 'new',
      conditionText: 'Mới',
      variantsCount: 1,
      verified: true,
      description: 'Bột cần tây',
      specs: {},
      variants: [{ id: 'v1', name: '20 gói', price: 175000, inStock: true }],
    },
    variant: { id: 'v1', name: '20 gói', price: 175000, inStock: true },
    quantity: 1,
    selected: true,
  };

  // With free shipping voucher active -> shippingFee should be 0
  const totals = calculateOrderTotals([dummyItem], 0, 500000, true);
  assert.equal(totals.shippingFee, 0);
  assert.equal(totals.totalAmount, 175000);
});

test('calculateOrderTotals handles empty cart gracefully', () => {
  const totals = calculateOrderTotals([]);
  assert.equal(totals.subtotal, 0);
  assert.equal(totals.shippingFee, 0);
  assert.equal(totals.discountAmount, 0);
  assert.equal(totals.totalAmount, 0);
});

test('validateTermsAcceptance requires core terms to be accepted', () => {
  assert.equal(validateTermsAcceptance(true), true);
  assert.equal(validateTermsAcceptance(false), false);
});

test('generateDemoOrderNumber creates valid #P4S- prefixed order code', () => {
  const orderNumber = generateDemoOrderNumber();
  assert.match(orderNumber, /^#P4S-\d{8}-\d{4}$/);
});

test('getLocalizedProduct switches between English and Vietnamese accurately', () => {
  const sampleProduct = {
    id: 'p1',
    name: 'Tai nghe Bluetooth không dây',
    nameEn: 'Wireless Bluetooth Earphones',
    brand: 'P4Shop',
    category: 'electronics' as const,
    subcategory: 'Tai nghe True Wireless',
    subcategoryEn: 'True Wireless Earphones',
    originalPrice: 400000,
    currentPrice: 300000,
    discountPercent: 25,
    rating: 5,
    reviewCount: 10,
    image: '',
    images: [],
    fastDelivery: true,
    deliveryDateText: 'Giao ngày mai',
    freeShipping: true,
    condition: 'new' as const,
    conditionText: 'Mới 100%',
    variantsCount: 1,
    verified: true,
    description: 'Mô tả tiếng Việt',
    descriptionEn: 'English description',
    specs: {},
    variants: [],
  };

  const vi = getLocalizedProduct(sampleProduct, 'vi');
  assert.equal(vi.name, 'Tai nghe Bluetooth không dây');
  assert.equal(vi.description, 'Mô tả tiếng Việt');

  const en = getLocalizedProduct(sampleProduct, 'en');
  assert.equal(en.name, 'Wireless Bluetooth Earphones');
  assert.equal(en.description, 'English description');
  assert.equal(en.subcategory, 'True Wireless Earphones');
});

test('calculateOrderTotals supports dual vouchers: 50k product discount + freeship voucher', () => {
  const dummyItem: CartItem = {
    id: 'item-dual',
    product: {
      id: 'prod-dual',
      name: 'Chuột Logitech',
      brand: 'Logitech',
      category: 'electronics',
      subcategory: 'Chuột',
      originalPrice: 500000,
      currentPrice: 400000,
      discountPercent: 20,
      rating: 4.9,
      reviewCount: 100,
      image: '',
      images: [],
      fastDelivery: true,
      deliveryDateText: 'Giao ngày mai',
      freeShipping: false,
      condition: 'new',
      conditionText: 'Mới',
      variantsCount: 1,
      verified: true,
      description: 'Chuột',
      specs: {},
      variants: [{ id: 'v1', name: 'Đen', price: 400000, inStock: true }],
    },
    variant: { id: 'v1', name: 'Đen', price: 400000, inStock: true },
    quantity: 1,
    selected: true,
  };

  // Subtotal: 400.000, Product discount: 50.000, Freeship active -> Total: 350.000
  const totals = calculateOrderTotals([dummyItem], 50000, 500000, true);
  assert.equal(totals.subtotal, 400000);
  assert.equal(totals.productDiscountAmount, 50000);
  assert.equal(totals.shippingDiscountAmount, 25000);
  assert.equal(totals.shippingFee, 0);
  assert.equal(totals.totalAmount, 350000);
});

