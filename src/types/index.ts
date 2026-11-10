export type ProductCategory = 
  | 'electronics' 
  | 'beauty' 
  | 'food' 
  | 'houseware' 
  | 'fashion_golf' 
  | 'health' 
  | 'all';

export type ProductCondition = 
  | 'new' 
  | 'box_dented' 
  | 'package_damaged' 
  | 'repackaged' 
  | 'refurbished';

export interface ProductVariant {
  id: string;
  name: string;
  nameEn?: string;
  price: number;
  inStock: boolean;
  color?: string;
  specs?: string;
}

export interface Product {
  id: string;
  name: string;
  nameEn?: string;
  nameKr?: string;
  brand: string;
  category: ProductCategory;
  subcategory: string;
  subcategoryEn?: string;
  originalPrice: number;
  currentPrice: number;
  discountPercent: number;
  rating: number;
  reviewCount: number;
  rank?: number;
  image: string;
  images: string[];
  fastDelivery: boolean; // Giao nhanh / Giao ngày mai
  deliveryDateText: string; // e.g. "Giao ngày mai (T5)"
  deliveryDateTextEn?: string;
  freeShipping: boolean;
  cashbackText?: string; // e.g. "Wow tích 1.500đ"
  cashbackTextEn?: string;
  condition: ProductCondition;
  conditionText: string; // "Mới", "Hộp móp", v.v.
  conditionTextEn?: string;
  variantsCount: number;
  batteryHours?: number; // for electronics filter
  model?: string;
  storage?: string;
  isSponsored?: boolean;
  isHot?: boolean;
  isFlashSale?: boolean;
  verified: boolean; // Trạng thái kiểm duyệt của sàn: true -> "Đã xác minh" / "Đã kiểm duyệt"
  sellerId?: string;
  sellerName?: string;
  description: string;
  descriptionEn?: string;
  specs: Record<string, string>;
  specsEn?: Record<string, string>;
  variants: ProductVariant[];
}

export interface CartItem {
  id: string; // unique item key (productId + variantId)
  product: Product;
  variant: ProductVariant;
  quantity: number;
  selected: boolean;
}

export interface ShippingAddress {
  fullName: string;
  phone: string;
  address: string;
  district: string;
  city: string;
  note?: string;
}

export type PaymentMethodType = 'e-wallet' | 'bank-card' | 'cod';

export interface TermsAgreementRecord {
  acceptedAt: string;
  termsVersion: string;
  coreTermsAccepted: boolean;
  marketingAccepted: boolean;
  clientIp?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  items: CartItem[];
  shippingAddress: ShippingAddress;
  paymentMethod: PaymentMethodType;
  subtotal: number;
  shippingFee: number;
  discountAmount: number; // total discount (product + shipping)
  productDiscountAmount?: number;
  shippingDiscountAmount?: number;
  totalAmount: number;
  createdAt: string;
  termsRecord: TermsAgreementRecord;
  status: 'confirmed' | 'packaging' | 'pickup' | 'shipping' | 'transit_hub' | 'delivering' | 'delivered';
  appliedVoucherCode?: string;
  appliedProductVoucherCode?: string;
  appliedShippingVoucherCode?: string;
}

export interface SearchFilters {
  query: string;
  category: string;
  brands: string[];
  fastDeliveryOnly: boolean;
  freeShippingOnly: boolean;
  conditions: ProductCondition[];
  minPrice?: number;
  maxPrice?: number;
  batteryHours?: string;
  model?: string;
  includeShippingInPrice: boolean;
  sortBy: 'ranking' | 'price_asc' | 'price_desc' | 'sales' | 'newest';
}

// Voucher
export interface Voucher {
  code: string;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  discountAmount: number; // in VND or free ship value
  discountType: 'fixed' | 'percent' | 'free_shipping';
  minOrderValue: number;
  expiresInText: string;
  isFlashSaleOnly?: boolean;
  claimed?: boolean;
  tag?: string;
}

// Order Tracking State & Locations
export type OrderTrackingStatus = 
  | 'placed' 
  | 'confirmed' 
  | 'packaging' 
  | 'pickup'
  | 'shipping' 
  | 'transit_hub'
  | 'delivering'
  | 'delivered';

export interface OrderMilestone {
  status: OrderTrackingStatus;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  time: string;
  completed: boolean;
  current: boolean;
  locationName: string;
}

export interface OrderTrackingInfo {
  orderNumber: string;
  status: OrderTrackingStatus;
  statusLabel: string;
  statusLabelEn: string;
  originAddress: string;
  currentLocationName: string;
  destinationAddress: string;
  lastUpdatedAt: string;
  estimatedDelivery: string;
  estimatedDeliveryEn: string;
  shippingProvider: string;
  courierName: string;
  courierPhone: string;
  courierVehiclePlate: string;
  courierAvatar: string;
  courierLat: number;
  courierLng: number;
  warehouseLat: number;
  warehouseLng: number;
  destinationLat: number;
  destinationLng: number;
  isSimulated: boolean;
  disclaimerText: string;
  items: {
    name: string;
    nameEn?: string;
    quantity: number;
    image: string;
    price: number;
    variantName?: string;
  }[];
  milestones: OrderMilestone[];
}

// Seller Center Store
export interface SellerStore {
  storeId: string;
  storeName: string;
  ownerName: string;
  phone: string;
  address: string;
  category: ProductCategory;
  studentIdOrTax: string;
  verified: boolean;
  registeredAt: string;
  rating: number;
  totalOrders: number;
}

// Product Review & Rating
export interface ProductReview {
  id: string;
  productId: string;
  authorName: string;
  authorBadge?: string;
  rating: number; // 1 to 5 stars
  title: string;
  comment: string;
  date: string;
  isVerifiedPurchase: boolean;
  helpfulCount: number;
  variantName?: string;
  images?: string[]; // Feedback images
}

