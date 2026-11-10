import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo } from 'react';
import { 
  CartItem, 
  Product, 
  ProductVariant, 
  ShippingAddress, 
  PaymentMethodType, 
  Order, 
  TermsAgreementRecord, 
  Voucher, 
  SellerStore,
  ProductReview
} from '../types';
import { calculateOrderTotals, generateDemoOrderNumber } from '../utils/pricing';
import { MOCK_PRODUCTS } from '../data/mockProducts';
import { SupportedLanguage, TRANSLATIONS, TranslationDictionary } from '../i18n/translations';

interface ToastMessage {
  id: string;
  message: string;
  type?: 'success' | 'info' | 'warning';
  productImage?: string;
}

export const DEFAULT_VOUCHERS: Voucher[] = [
  {
    code: 'FLASHSALE50K',
    title: 'Giảm 50.000 ₫ Toàn Sàn',
    titleEn: '50,000 ₫ Off Storewide',
    description: 'Áp dụng cho mọi sản phẩm, không giới hạn giá trị đơn hàng',
    descriptionEn: 'Valid on all products with no minimum spend',
    discountAmount: 50000,
    discountType: 'fixed',
    minOrderValue: 0,
    expiresInText: 'Còn 08 giờ',
    isFlashSaleOnly: true,
    tag: 'HOT FLASH SALE',
  },
  {
    code: 'FREESHIP',
    title: 'Miễn Phí Vận Chuyển',
    titleEn: 'Free Shipping Voucher',
    description: 'Tài trợ 100% phí giao hàng 25.000 ₫ cho mọi đơn hàng P4Shop',
    descriptionEn: '100% discount on standard 25,000 ₫ shipping fee',
    discountAmount: 25000,
    discountType: 'free_shipping',
    minOrderValue: 0,
    expiresInText: 'Hôm nay',
    isFlashSaleOnly: true,
    tag: 'FREESHIP TOÀN QUỐC',
  },
  {
    code: 'FLASHSALE100K',
    title: 'Giảm 100.000 ₫ Đơn Từ 400K',
    titleEn: '100,000 ₫ Off on Orders From 400K',
    description: 'Áp dụng cho đơn hàng từ 400.000 ₫ trở lên toàn sàn',
    descriptionEn: 'Valid on orders over 400,000 ₫ for all products',
    discountAmount: 100000,
    discountType: 'fixed',
    minOrderValue: 400000,
    expiresInText: 'Số lượng có hạn',
    isFlashSaleOnly: true,
    tag: 'SIÊU DEAL',
  },
  {
    code: 'FREESHIPEXTRA',
    title: 'Freeship Hỏa Tốc Rocket',
    titleEn: 'Rocket Express Free Shipping',
    description: 'Miễn phí giao hàng hỏa tốc trong 24h áp dụng cho mọi đơn',
    descriptionEn: 'Free 24h express delivery on all orders',
    discountAmount: 25000,
    discountType: 'free_shipping',
    minOrderValue: 0,
    expiresInText: 'Trong 24h',
    isFlashSaleOnly: false,
    tag: 'P4SHOP ROCKET',
  },
  {
    code: 'TMUSTUDENT20',
    title: 'Ưu Đãi 20% Sinh Viên TMU',
    titleEn: '20% Off for TMU Students',
    description: 'Giảm tối đa 80.000 ₫ dành riêng cho cộng đồng sinh viên',
    descriptionEn: 'Up to 80,000 ₫ discount exclusively for TMU student community',
    discountAmount: 80000,
    discountType: 'percent',
    minOrderValue: 150000,
    expiresInText: 'Ưu đãi sinh viên',
    isFlashSaleOnly: false,
    tag: 'ĐẠI HỌC THƯƠNG MẠI',
  },
];

import { COMPREHENSIVE_PRODUCT_REVIEWS, getProductReviewsList } from '../data/mockReviews';

export const DEFAULT_REVIEWS = COMPREHENSIVE_PRODUCT_REVIEWS;


interface CartContextType {
  // Products (including seller items)
  allProducts: Product[];
  
  // Cart
  cart: CartItem[];
  buyNowItem: CartItem | null;
  directCheckout: boolean;
  activeCheckoutItems: CartItem[];
  addToCart: (product: Product, variant?: ProductVariant, quantity?: number) => void;
  buyNow: (product: Product, variant?: ProductVariant, quantity?: number) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  toggleSelect: (itemId: string) => void;
  toggleSelectAll: (select: boolean) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  reorderItems: (items: CartItem[]) => void;
  
  // Wishlist
  wishlist: string[];
  isInWishlist: (productId: string) => boolean;
  toggleWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  clearWishlist: () => void;

  // Vouchers
  claimedVouchers: string[];
  activeVoucher: Voucher | null;
  activeProductVoucher: Voucher | null;
  activeShippingVoucher: Voucher | null;
  claimVoucher: (code: string) => boolean;
  claimAllVouchers: () => void;
  applyVoucher: (code: string) => boolean;
  applyProductVoucher: (code: string) => boolean;
  removeProductVoucher: () => void;
  applyShippingVoucher: (code: string) => boolean;
  removeShippingVoucher: () => void;
  removeVoucher: () => void;
  discountCode: string;
  appliedDiscount: number;
  productDiscount: number;
  shippingDiscount: number;
  isFreeShippingActive: boolean;

  // Reviews
  reviews: Record<string, ProductReview[]>;
  getProductReviews: (productId: string) => ProductReview[];
  addProductReview: (review: Omit<ProductReview, 'id' | 'date' | 'helpfulCount'>) => ProductReview;
  voteHelpfulReview: (productId: string, reviewId: string) => void;

  // Checkout & Order
  shippingAddress: ShippingAddress;
  updateShippingAddress: (addr: ShippingAddress) => void;
  paymentMethod: PaymentMethodType;
  setPaymentMethod: (pm: PaymentMethodType) => void;
  cartTotals: ReturnType<typeof calculateOrderTotals>;
  checkoutTotals: ReturnType<typeof calculateOrderTotals>;
  lastCompletedOrder: Order | null;
  allOrders: Order[];
  confirmOrderWithTerms: (marketingAccepted: boolean) => Order;

  // Seller Center
  sellerStore: SellerStore | null;
  sellerProducts: Product[];
  registerSellerStore: (data: Omit<SellerStore, 'storeId' | 'registeredAt' | 'verified' | 'rating' | 'totalOrders'>) => SellerStore;
  addSellerProduct: (data: Omit<Product, 'id' | 'rating' | 'reviewCount' | 'verified'>) => Product;
  deleteSellerProduct: (productId: string) => void;

  // Toasts
  toast: ToastMessage | null;
  dismissToast: () => void;
  showToast: (message: string, productImage?: string, type?: 'success' | 'info' | 'warning') => void;

  // i18n
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  t: TranslationDictionary;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'p4shop_cart_v2';
const LOCAL_STORAGE_WISHLIST_KEY = 'p4shop_wishlist_v2';
const LOCAL_STORAGE_ORDER_KEY = 'p4shop_last_order_v2';
const LOCAL_STORAGE_ALL_ORDERS_KEY = 'p4shop_all_orders_v2';
const LOCAL_STORAGE_VOUCHERS_KEY = 'p4shop_claimed_vouchers_v2';
const LOCAL_STORAGE_SELLER_STORE_KEY = 'p4shop_seller_store_v2';
const LOCAL_STORAGE_SELLER_PRODUCTS_KEY = 'p4shop_seller_products_v2';
const LOCAL_STORAGE_LANG_KEY = 'p4shop_language_v2';

const LOCAL_STORAGE_REVIEWS_KEY = 'p4shop_product_reviews_v2';

const DEFAULT_ADDRESS: ShippingAddress = {
  fullName: 'Lê Nguyễn Hà Anh',
  phone: '+84 912 345 678',
  address: 'Trường Đại học Thương Mại, Số 79 Đường Hồ Tùng Mậu, Phường Mai Dịch',
  district: 'Quận Cầu Giấy',
  city: 'TP. Hà Nội',
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Language
  const [language, setLanguageState] = useState<SupportedLanguage>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_LANG_KEY);
      if (saved === 'vi' || saved === 'en' || saved === 'ko') return saved;
    } catch {}
    return 'vi';
  });

  const setLanguage = (lang: SupportedLanguage) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(LOCAL_STORAGE_LANG_KEY, lang);
    } catch {}
  };

  const t = useMemo(() => TRANSLATIONS[language], [language]);

  // Seller Store & Seller Products
  const [sellerStore, setSellerStore] = useState<SellerStore | null>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_SELLER_STORE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {}
    // Seed default verified seller store for demo
    return {
      storeId: 'store_tmu_01',
      storeName: 'P4Shop Flagship TMU',
      ownerName: 'Lê Nguyễn Hà Anh',
      phone: '0912 345 678',
      address: '79 Hồ Tùng Mậu, Cầu Giấy, Hà Nội',
      category: 'electronics',
      studentIdOrTax: 'TMU-2026-HAANH',
      verified: true,
      registeredAt: '2026-01-10T08:00:00Z',
      rating: 4.9,
      totalOrders: 154,
    };
  });

  const [sellerProducts, setSellerProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_SELLER_PRODUCTS_KEY);
      if (saved) return JSON.parse(saved);
    } catch {}
    return [];
  });

  // Combined product catalog (built-in + seller added)
  const allProducts = useMemo(() => {
    return [...MOCK_PRODUCTS, ...sellerProducts];
  }, [sellerProducts]);

  // Wishlist
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_WISHLIST_KEY);
      if (saved) return JSON.parse(saved);
    } catch {}
    // Default seed flagship earphones in wishlist
    return ['earphone-bt-01', 'elec-sony-wh1000xm5'];
  });

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_WISHLIST_KEY, JSON.stringify(wishlist));
    } catch {}
  }, [wishlist]);

  // Product Reviews
  const [reviews, setReviews] = useState<Record<string, ProductReview[]>>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_REVIEWS_KEY);
      if (saved) return JSON.parse(saved);
    } catch {}
    return DEFAULT_REVIEWS;
  });

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_REVIEWS_KEY, JSON.stringify(reviews));
    } catch {}
  }, [reviews]);

  // Claimed Vouchers - start with default vouchers in wallet
  const [claimedVouchers, setClaimedVouchers] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_VOUCHERS_KEY);
      if (saved) return JSON.parse(saved);
    } catch {}
    return ['FLASHSALE50K', 'FREESHIP'];
  });

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_VOUCHERS_KEY, JSON.stringify(claimedVouchers));
    } catch {}
  }, [claimedVouchers]);

  // Two Separate Active Vouchers:
  // 1) Product Discount Voucher (fixed / percent)
  // 2) Free Shipping Voucher (free_shipping)
  const [activeProductVoucher, setActiveProductVoucher] = useState<Voucher | null>(() => {
    return DEFAULT_VOUCHERS[0]; // FLASHSALE50K default
  });

  const [activeShippingVoucher, setActiveShippingVoucher] = useState<Voucher | null>(() => {
    return DEFAULT_VOUCHERS[1]; // FREESHIP default
  });

  // Backward compatibility alias
  const activeVoucher = activeProductVoucher || activeShippingVoucher;
  const isFreeShippingActive = Boolean(activeShippingVoucher);
  const productDiscount = activeProductVoucher ? activeProductVoucher.discountAmount : 0;
  const shippingDiscount = activeShippingVoucher ? activeShippingVoucher.discountAmount : 0;
  const appliedDiscount = productDiscount + shippingDiscount;
  const discountCode = [activeProductVoucher?.code, activeShippingVoucher?.code].filter(Boolean).join(', ');

  // Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {}
    const flagship = MOCK_PRODUCTS[0];
    return [
      {
        id: `${flagship.id}-${flagship.variants[0].id}`,
        product: flagship,
        variant: flagship.variants[0],
        quantity: 1,
        selected: true,
      },
    ];
  });

  const [buyNowItem, setBuyNowItem] = useState<CartItem | null>(null);
  const [directCheckout, setDirectCheckout] = useState<boolean>(false);
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>(DEFAULT_ADDRESS);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>('e-wallet');

  // Orders
  const [lastCompletedOrder, setLastCompletedOrder] = useState<Order | null>(() => {
    try {
      const savedOrder = localStorage.getItem(LOCAL_STORAGE_ORDER_KEY);
      if (savedOrder) return JSON.parse(savedOrder);
    } catch {}
    return null;
  });

  const [allOrders, setAllOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_ALL_ORDERS_KEY);
      if (saved) return JSON.parse(saved);
    } catch {}
    return [];
  });

  const [toast, setToast] = useState<ToastMessage | null>(null);

  // Sync cart
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cart));
    } catch {}
  }, [cart]);

  // Sync seller products
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_SELLER_PRODUCTS_KEY, JSON.stringify(sellerProducts));
    } catch {}
  }, [sellerProducts]);

  // Sync seller store
  useEffect(() => {
    try {
      if (sellerStore) {
        localStorage.setItem(LOCAL_STORAGE_SELLER_STORE_KEY, JSON.stringify(sellerStore));
      }
    } catch {}
  }, [sellerStore]);

  const showToast = (message: string, productImage?: string, type: 'success' | 'info' | 'warning' = 'success') => {
    setToast({ id: Date.now().toString(), message, productImage, type });
    setTimeout(() => {
      setToast(prev => (prev?.message === message ? null : prev));
    }, 3200);
  };

  const dismissToast = () => setToast(null);

  // Cart actions
  const addToCart = (product: Product, variant?: ProductVariant, quantity: number = 1) => {
    const selectedVariant = variant || product.variants[0] || {
      id: 'default',
      name: 'Tiêu chuẩn',
      nameEn: 'Standard',
      price: product.currentPrice,
      inStock: true,
    };
    const itemId = `${product.id}-${selectedVariant.id}`;

    setCart(prev => {
      const existing = prev.find(item => item.id === itemId);
      if (existing) {
        return prev.map(item =>
          item.id === itemId ? { ...item, quantity: item.quantity + quantity } : item
        );
      } else {
        return [
          ...prev,
          {
            id: itemId,
            product,
            variant: selectedVariant,
            quantity,
            selected: true,
          },
        ];
      }
    });

    const title = language === 'en' && product.nameEn ? product.nameEn : product.name;
    showToast(language === 'en' ? `Added "${title}" to cart!` : `Đã thêm "${title}" vào giỏ hàng!`, product.image);
  };

  const buyNow = (product: Product, variant?: ProductVariant, quantity: number = 1) => {
    const selectedVariant = variant || product.variants[0] || {
      id: 'default',
      name: 'Tiêu chuẩn',
      nameEn: 'Standard',
      price: product.currentPrice,
      inStock: true,
    };
    const item: CartItem = {
      id: `${product.id}-${selectedVariant.id}`,
      product,
      variant: selectedVariant,
      quantity,
      selected: true,
    };
    setBuyNowItem(item);
    setDirectCheckout(true);
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCart(prev =>
      prev.map(item => (item.id === itemId ? { ...item, quantity } : item))
    );
    if (buyNowItem && buyNowItem.id === itemId) {
      setBuyNowItem({ ...buyNowItem, quantity });
    }
  };

  const toggleSelect = (itemId: string) => {
    setCart(prev =>
      prev.map(item => (item.id === itemId ? { ...item, selected: !item.selected } : item))
    );
  };

  const toggleSelectAll = (select: boolean) => {
    setCart(prev => prev.map(item => ({ ...item, selected: select })));
  };

  const removeFromCart = (itemId: string) => {
    setCart(prev => prev.filter(item => item.id !== itemId));
    if (buyNowItem?.id === itemId) {
      setBuyNowItem(null);
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  // Wishlist actions
  const isInWishlist = (productId: string): boolean => {
    return wishlist.includes(productId);
  };

  const toggleWishlist = (product: Product) => {
    const isSaved = isInWishlist(product.id);
    const prodName = language === 'en' && product.nameEn ? product.nameEn : product.name;
    if (isSaved) {
      setWishlist(prev => prev.filter(id => id !== product.id));
      showToast(
        language === 'en' ? `Removed "${prodName}" from wishlist` : `Đã xóa "${prodName}" khỏi danh sách yêu thích`,
        product.image,
        'info'
      );
    } else {
      setWishlist(prev => [...prev, product.id]);
      showToast(
        language === 'en' ? `Saved "${prodName}" to wishlist!` : `Đã thêm "${prodName}" vào danh sách yêu thích!`,
        product.image,
        'success'
      );
    }
  };

  const removeFromWishlist = (productId: string) => {
    setWishlist(prev => prev.filter(id => id !== productId));
  };

  const clearWishlist = () => {
    setWishlist([]);
    showToast(language === 'en' ? 'Cleared wishlist' : 'Đã xóa toàn bộ danh sách yêu thích', undefined, 'info');
  };

  // Voucher actions
  const claimVoucher = (code: string): boolean => {
    const upper = code.trim().toUpperCase();
    if (claimedVouchers.includes(upper)) {
      showToast(language === 'en' ? 'Voucher already in your wallet!' : 'Mã này đã có trong ví của bạn rồi!', undefined, 'info');
      return true;
    }
    setClaimedVouchers(prev => [...prev, upper]);
    showToast(language === 'en' ? `Claimed voucher ${upper} successfully!` : `Đã thu thập mã ${upper} vào ví voucher!`);
    return true;
  };

  const claimAllVouchers = () => {
    const allCodes = DEFAULT_VOUCHERS.map(v => v.code);
    setClaimedVouchers(allCodes);
    showToast(
      language === 'en'
        ? 'Claimed all 5 store vouchers successfully!'
        : 'Đã nhận toàn bộ 5 voucher giảm giá & Freeship vào ví!'
    );
  };

  // 1. Product Voucher
  const applyProductVoucher = (code: string): boolean => {
    const upper = code.trim().toUpperCase();
    const found = DEFAULT_VOUCHERS.find(v => v.code === upper);

    if (found && found.discountType !== 'free_shipping') {
      setActiveProductVoucher(found);
      showToast(
        language === 'en'
          ? `Product voucher applied: -${found.discountAmount.toLocaleString()} ₫!`
          : `Đã áp dụng mã giảm giá sản phẩm: -${found.discountAmount.toLocaleString()} ₫!`
      );
      return true;
    } else if (upper === 'P4SHOP50K' || upper === 'CHAOP4SHOP50K' || upper === 'CHAOHSHOPP50K') {
      setActiveProductVoucher(DEFAULT_VOUCHERS[0]);
      showToast(language === 'en' ? '50,000 ₫ product voucher applied!' : 'Áp dụng mã giảm 50.000 ₫ sản phẩm thành công!');
      return true;
    } else {
      showToast(language === 'en' ? 'Invalid product voucher' : 'Mã giảm giá sản phẩm không hợp lệ!', undefined, 'warning');
      return false;
    }
  };

  const removeProductVoucher = () => {
    setActiveProductVoucher(null);
    showToast(language === 'en' ? 'Removed product voucher' : 'Đã bỏ chọn mã giảm giá sản phẩm', undefined, 'info');
  };

  // 2. Free Shipping Voucher
  const applyShippingVoucher = (code: string): boolean => {
    const upper = code.trim().toUpperCase();
    const found = DEFAULT_VOUCHERS.find(v => v.code === upper);

    if (found && found.discountType === 'free_shipping') {
      setActiveShippingVoucher(found);
      showToast(
        language === 'en'
          ? 'Free Shipping voucher applied (100% delivery sponsored)!'
          : 'Đã áp dụng mã Miễn Phí Vận Chuyển (Giảm 25.000 ₫ phí ship)!'
      );
      return true;
    } else {
      showToast(language === 'en' ? 'Invalid free shipping voucher' : 'Mã freeship không hợp lệ!', undefined, 'warning');
      return false;
    }
  };

  const removeShippingVoucher = () => {
    setActiveShippingVoucher(null);
    showToast(language === 'en' ? 'Removed free shipping voucher' : 'Đã bỏ chọn mã miễn phí vận chuyển', undefined, 'info');
  };

  // Backward compatibility
  const applyVoucher = (code: string): boolean => {
    const upper = code.trim().toUpperCase();
    const found = DEFAULT_VOUCHERS.find(v => v.code === upper);
    if (found?.discountType === 'free_shipping') {
      return applyShippingVoucher(code);
    }
    return applyProductVoucher(code);
  };

  const removeVoucher = () => {
    removeProductVoucher();
    removeShippingVoucher();
  };

  // Reorder items
  const reorderItems = (orderItems: CartItem[]) => {
    if (!orderItems || orderItems.length === 0) return;
    setCart(prev => {
      const updated = [...prev];
      orderItems.forEach(reItem => {
        const existIdx = updated.findIndex(i => i.id === reItem.id);
        if (existIdx >= 0) {
          updated[existIdx] = { ...updated[existIdx], quantity: updated[existIdx].quantity + reItem.quantity, selected: true };
        } else {
          updated.push({ ...reItem, selected: true });
        }
      });
      return updated;
    });
    showToast(
      language === 'en' 
        ? `Added ${orderItems.length} items from previous order to cart!` 
        : `Đã thêm ${orderItems.length} sản phẩm từ đơn hàng cũ vào giỏ!`
    );
  };

  // Product reviews
  const getProductReviews = (productId: string): ProductReview[] => {
    if (reviews[productId] && reviews[productId].length > 0) {
      return reviews[productId];
    }
    return getProductReviewsList(productId);
  };

  const addProductReview = (newRev: Omit<ProductReview, 'id' | 'date' | 'helpfulCount'>): ProductReview => {
    const created: ProductReview = {
      ...newRev,
      id: 'rev_' + Date.now(),
      date: new Date().toLocaleDateString('vi-VN'),
      helpfulCount: 0,
      isVerifiedPurchase: true,
    };
    setReviews(prev => {
      const currentList = prev[newRev.productId] || getProductReviewsList(newRev.productId);
      const updated = {
        ...prev,
        [newRev.productId]: [created, ...currentList],
      };
      try {
        localStorage.setItem(LOCAL_STORAGE_REVIEWS_KEY, JSON.stringify(updated));
      } catch {}
      return updated;
    });
    showToast(
      language === 'en'
        ? 'Thank you! Your product review has been published.'
        : 'Cảm ơn bạn! Đánh giá sản phẩm đã được đăng thành công.'
    );
    return created;
  };

  const voteHelpfulReview = (productId: string, reviewId: string) => {
    setReviews(prev => {
      const currentList = prev[productId] || getProductReviewsList(productId);
      const updated = currentList.map(r => r.id === reviewId ? { ...r, helpfulCount: r.helpfulCount + 1 } : r);
      const nextMap = { ...prev, [productId]: updated };
      try {
        localStorage.setItem(LOCAL_STORAGE_REVIEWS_KEY, JSON.stringify(nextMap));
      } catch {}
      return nextMap;
    });
    showToast(language === 'en' ? 'Marked review as helpful!' : 'Đã ghi nhận đánh giá hữu ích!');
  };

  // Seller store actions
  const registerSellerStore = (data: Omit<SellerStore, 'storeId' | 'registeredAt' | 'verified' | 'rating' | 'totalOrders'>): SellerStore => {
    const newStore: SellerStore = {
      ...data,
      storeId: 'store_' + Date.now(),
      registeredAt: new Date().toISOString(),
      verified: true, // Auto-approved by P4Shop TMU audit standards
      rating: 5.0,
      totalOrders: 0,
    };
    setSellerStore(newStore);
    showToast(
      language === 'en' 
        ? `Store "${data.storeName}" registered and verified successfully!`
        : `Gian hàng "${data.storeName}" đã được đăng ký và kiểm duyệt tự động thành công!`
    );
    return newStore;
  };

  const addSellerProduct = (data: Omit<Product, 'id' | 'rating' | 'reviewCount' | 'verified'>): Product => {
    const newProd: Product = {
      ...data,
      id: 'sprod_' + Date.now(),
      rating: 5.0,
      reviewCount: 1,
      verified: true, // Đã kiểm duyệt
      sellerId: sellerStore?.storeId || 'store_tmu_custom',
      sellerName: sellerStore?.storeName || 'P4Shop TMU Merchant',
    };
    setSellerProducts(prev => [newProd, ...prev]);
    showToast(
      language === 'en' 
        ? `Product "${data.nameEn || data.name}" published & passed audit!`
        : `Sản phẩm "${data.name}" đã đăng bán thành công và được kiểm duyệt chuẩn TMU!`
    );
    return newProd;
  };

  const deleteSellerProduct = (productId: string) => {
    setSellerProducts(prev => prev.filter(p => p.id !== productId));
    showToast(language === 'en' ? 'Product removed from store' : 'Đã gỡ sản phẩm khỏi gian hàng', undefined, 'info');
  };

  // Active items for checkout
  const activeCheckoutItems: CartItem[] = directCheckout && buyNowItem 
    ? [buyNowItem] 
    : cart.filter(item => item.selected);

  const cartTotals = calculateOrderTotals(cart, productDiscount, 500000, isFreeShippingActive);
  const checkoutTotals = calculateOrderTotals(activeCheckoutItems, productDiscount, 500000, isFreeShippingActive);

  const updateShippingAddress = (addr: ShippingAddress) => {
    setShippingAddress(addr);
  };

  // Complete Order with Audit
  const confirmOrderWithTerms = (marketingAccepted: boolean): Order => {
    const termsRecord: TermsAgreementRecord = {
      acceptedAt: new Date().toISOString(),
      termsVersion: 'v2.5 - TMU 2026',
      coreTermsAccepted: true,
      marketingAccepted,
      clientIp: '113.161.45.' + Math.floor(10 + Math.random() * 89),
    };

    const newOrder: Order = {
      id: 'ord_' + Date.now(),
      orderNumber: generateDemoOrderNumber(),
      items: [...activeCheckoutItems],
      shippingAddress: { ...shippingAddress },
      paymentMethod,
      subtotal: checkoutTotals.subtotal,
      shippingFee: checkoutTotals.shippingFee,
      discountAmount: checkoutTotals.discountAmount,
      productDiscountAmount: checkoutTotals.productDiscountAmount,
      shippingDiscountAmount: checkoutTotals.shippingDiscountAmount,
      totalAmount: checkoutTotals.totalAmount,
      createdAt: new Date().toISOString(),
      termsRecord,
      status: 'confirmed',
      appliedVoucherCode: discountCode || undefined,
      appliedProductVoucherCode: activeProductVoucher?.code || undefined,
      appliedShippingVoucherCode: activeShippingVoucher?.code || undefined,
    };

    setLastCompletedOrder(newOrder);
    setAllOrders(prev => [newOrder, ...prev]);

    try {
      localStorage.setItem(LOCAL_STORAGE_ORDER_KEY, JSON.stringify(newOrder));
      const existingAll = localStorage.getItem(LOCAL_STORAGE_ALL_ORDERS_KEY);
      const ordersArray = existingAll ? JSON.parse(existingAll) : [];
      ordersArray.unshift(newOrder);
      localStorage.setItem(LOCAL_STORAGE_ALL_ORDERS_KEY, JSON.stringify(ordersArray));
    } catch {}

    // Clean up ordered items from cart
    if (directCheckout) {
      setBuyNowItem(null);
      setDirectCheckout(false);
    } else {
      setCart(prev => prev.filter(item => !item.selected));
    }

    return newOrder;
  };

  return (
    <CartContext.Provider
      value={{
        allProducts,
        cart,
        buyNowItem,
        directCheckout,
        activeCheckoutItems,
        addToCart,
        buyNow,
        updateQuantity,
        toggleSelect,
        toggleSelectAll,
        removeFromCart,
        clearCart,
        reorderItems,
        wishlist,
        isInWishlist,
        toggleWishlist,
        removeFromWishlist,
        clearWishlist,
        claimedVouchers,
        activeVoucher,
        activeProductVoucher,
        activeShippingVoucher,
        claimVoucher,
        claimAllVouchers,
        applyVoucher,
        applyProductVoucher,
        removeProductVoucher,
        applyShippingVoucher,
        removeShippingVoucher,
        removeVoucher,
        discountCode,
        appliedDiscount,
        productDiscount,
        shippingDiscount,
        isFreeShippingActive,
        reviews,
        getProductReviews,
        addProductReview,
        voteHelpfulReview,
        shippingAddress,
        updateShippingAddress,
        paymentMethod,
        setPaymentMethod,
        cartTotals,
        checkoutTotals,
        lastCompletedOrder,
        allOrders,
        confirmOrderWithTerms,
        sellerStore,
        sellerProducts,
        registerSellerStore,
        addSellerProduct,
        deleteSellerProduct,
        toast,
        dismissToast,
        showToast,
        language,
        setLanguage,
        t,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
