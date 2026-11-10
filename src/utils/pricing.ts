import { CartItem } from '../types';

/**
 * Format currency into standard Vietnamese Dong string: e.g. 399.000 ₫
 */
export function formatVND(amount: number): string {
  if (isNaN(amount) || amount === null || amount === undefined) {
    return '0 ₫';
  }
  const formatted = Math.round(amount)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return `${formatted} ₫`;
}

/**
 * Calculate totals for cart items with voucher support
 */
export interface OrderCalculation {
  subtotal: number;
  originalShippingFee: number;
  shippingFee: number;
  productDiscountAmount: number;
  shippingDiscountAmount: number;
  discountAmount: number;
  totalAmount: number;
  itemCount: number;
}

export function calculateOrderTotals(
  items: CartItem[],
  customDiscount: number = 0,
  freeShippingThreshold: number = 500000,
  isFreeShippingVoucherActive: boolean = false
): OrderCalculation {
  const selectedItems = items.filter(item => item.selected !== false);
  const subtotal = selectedItems.reduce((acc, item) => {
    return acc + (item.variant.price || item.product.currentPrice) * item.quantity;
  }, 0);

  const itemCount = selectedItems.reduce((acc, item) => acc + item.quantity, 0);

  // If subtotal is 0, no fee and no discount
  if (subtotal === 0) {
    return {
      subtotal: 0,
      originalShippingFee: 0,
      shippingFee: 0,
      productDiscountAmount: 0,
      shippingDiscountAmount: 0,
      discountAmount: 0,
      totalAmount: 0,
      itemCount: 0,
    };
  }

  // Base shipping fee is 25.000 VND unless over threshold or freeShipping on all items or voucher applied
  const allFreeShipping = selectedItems.length > 0 && selectedItems.every(i => i.product.freeShipping);
  const originalShippingFee = 25000;
  let shippingDiscountAmount = 0;

  if (subtotal >= freeShippingThreshold || allFreeShipping || isFreeShippingVoucherActive) {
    shippingDiscountAmount = originalShippingFee;
  }

  const shippingFee = Math.max(0, originalShippingFee - shippingDiscountAmount);

  // Discount rule: capped at subtotal
  const productDiscountAmount = Math.min(customDiscount, subtotal);
  const discountAmount = productDiscountAmount + shippingDiscountAmount;
  const totalAmount = Math.max(0, subtotal + shippingFee - productDiscountAmount);

  return {
    subtotal,
    originalShippingFee,
    shippingFee,
    productDiscountAmount,
    shippingDiscountAmount,
    discountAmount,
    totalAmount,
    itemCount,
  };
}

/**
 * Check if the core terms and conditions are valid for completing checkout
 */
export function validateTermsAcceptance(coreTermsChecked: boolean): boolean {
  return coreTermsChecked === true;
}

/**
 * Generate a realistic official e-commerce order code like #P4S-20261028-7492
 */
export function generateOrderNumber(): string {
  const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  return `#P4S-${dateStr}-${randomSuffix}`;
}

/**
 * Backward compatibility alias
 */
export const generateDemoOrderNumber = generateOrderNumber;

