export type SupportedLanguage = 'vi' | 'en' | 'ko';

export interface TranslationDictionary {
  common: {
    appName: string;
    university: string;
    developer: string;
    currency: string;
    addToCart: string;
    buyNow: string;
    addedToCart: string;
    searchPlaceholder: string;
    search: string;
    viewDetails: string;
    freeShipping: string;
    fastDelivery: string;
    verifiedStore: string;
    pendingVerification: string;
    approvedProduct: string;
    all: string;
    login: string;
    register: string;
    customerSupport: string;
    myAccount: string;
    cart: string;
    wishlist: string;
    savedItems: string;
    trackOrder: string;
    sellerCenter: string;
    language: string;
    backToHome: string;
    emptyList: string;
    continueShopping: string;
  };
  header: {
    bannerNotice: string;
    rocketTitle: string;
    rocketSubtitle: string;
    rocketAction: string;
    giftTitle: string;
    giftSubtitle: string;
    giftAction: string;
    categoryBtn: string;
    popularSearches: string;
    todayTrending: string;
    quickNav: {
      play: string;
      rocket: string;
      fresh: string;
      repurchase: string;
      biz: string;
      global: string;
      goldbox: string;
      new: string;
      seller: string;
      tracking: string;
      wishlist: string;
    };
    categories: {
      all: string;
      electronics: string;
      beauty: string;
      food: string;
      houseware: string;
      fashion_golf: string;
      health: string;
    };
  };
  home: {
    heroTitle: string;
    flashSaleTitle: string;
    flashSaleBadge: string;
    flashSaleDesc: string;
    endsIn: string;
    viewMoreFlashSale: string;
    bestSellerTitle: string;
    bestSellerDesc: string;
    recommendationTitle: string;
    recommendationDesc: string;
    exploreMore: string;
    orderTrackingBannerTitle: string;
    orderTrackingBannerDesc: string;
    trackNow: string;
    enterOrderNumberPlaceholder: string;
    voucherBannerTitle: string;
    voucherBannerSubtitle: string;
    claimVoucher: string;
    claimed: string;
    enterPromoCode: string;
    applyCode: string;
    allProductsApplied: string;
  };
  wishlist: {
    title: string;
    subtitle: string;
    emptyTitle: string;
    emptyDesc: string;
    totalSaved: string;
    clearAll: string;
    addAllToCart: string;
    removeFromWishlist: string;
    moveToCart: string;
  };
  tracking: {
    title: string;
    subtitle: string;
    inputLabel: string;
    inputPlaceholder: string;
    trackButton: string;
    recentOrders: string;
    sampleOrders: string;
    orderNotFound: string;
    orderNotFoundDesc: string;
    statusLabel: string;
    estimatedDelivery: string;
    shippingCourier: string;
    courierName: string;
    courierPhone: string;
    courierPlate: string;
    callCourier: string;
    messageCourier: string;
    deliveryMap: string;
    routeInfo: string;
    originWarehouse: string;
    currentPosition: string;
    destinationPoint: string;
    liveLocationDesc: string;
    stages: {
      placed: string;
      confirmed: string;
      packaging: string;
      shipping: string;
      delivered: string;
    };
  };
  seller: {
    title: string;
    subtitle: string;
    registerTitle: string;
    registerSubtitle: string;
    storeName: string;
    ownerName: string;
    phone: string;
    address: string;
    category: string;
    studentId: string;
    registerBtn: string;
    dashboardTitle: string;
    totalProducts: string;
    weeklyRevenue: string;
    positiveRating: string;
    auditStatus: string;
    auditStatusDesc: string;
    tabProducts: string;
    tabAddProduct: string;
    productName: string;
    productNameEn: string;
    originalPrice: string;
    salePrice: string;
    stock: string;
    imageSelect: string;
    customImageUrl: string;
    description: string;
    descriptionEn: string;
    fastDeliveryOption: string;
    freeShippingOption: string;
    saveProductBtn: string;
    deleteProduct: string;
    approvedBadge: string;
    activeSelling: string;
    emptySellerProducts: string;
  };
  cart: {
    title: string;
    selectAll: string;
    deleteSelected: string;
    unitPrice: string;
    quantity: string;
    totalPrice: string;
    emptyCartTitle: string;
    emptyCartDesc: string;
    orderSummary: string;
    subtotal: string;
    shippingFee: string;
    discount: string;
    totalPayment: string;
    checkoutBtn: string;
    voucherCode: string;
    apply: string;
    availableVouchers: string;
  };
  checkout: {
    title: string;
    shippingAddressTitle: string;
    editAddress: string;
    deliveryOption: string;
    paymentMethodTitle: string;
    eWallet: string;
    bankCard: string;
    cod: string;
    orderItemsTitle: string;
    voucherDiscount: string;
    termsHeader: string;
    termsNotice: string;
    agreeAllTerms: string;
    agreeCoreTerms: string;
    agreeMarketingTerms: string;
    confirmOrderBtn: string;
    secureNotice: string;
  };
  orderSuccess: {
    title: string;
    demoNotice: string;
    orderNumber: string;
    orderTime: string;
    trackOnMapBtn: string;
    continueShopping: string;
    auditLogTitle: string;
  };
}

export const TRANSLATIONS: Record<SupportedLanguage, TranslationDictionary> = {
  vi: {
    common: {
      appName: 'P4Shop',
      university: 'Trường Đại học Thương Mại (TMU)',
      developer: 'Lê Nguyễn Hà Anh',
      currency: '₫',
      addToCart: 'Thêm vào giỏ',
      buyNow: 'Mua ngay',
      addedToCart: 'Đã thêm vào giỏ hàng!',
      searchPlaceholder: 'Tìm sản phẩm trên P4Shop! (tai nghe, cà phê, mỹ phẩm...)',
      search: 'Tìm kiếm',
      viewDetails: 'Xem chi tiết',
      freeShipping: 'Miễn phí vận chuyển',
      fastDelivery: 'Giao nhanh ngày mai',
      verifiedStore: 'Sàn xác minh',
      pendingVerification: 'Chờ duyệt',
      approvedProduct: 'Đã kiểm duyệt',
      all: 'Tất cả',
      login: 'Đăng nhập',
      register: 'Đăng ký',
      customerSupport: 'Hỗ trợ khách hàng',
      myAccount: 'Tài khoản',
      cart: 'Giỏ hàng',
      wishlist: 'Yêu thích',
      savedItems: 'Sản phẩm đã lưu',
      trackOrder: 'Theo dõi đơn hàng',
      sellerCenter: 'Kênh Người Bán',
      language: 'Ngôn ngữ',
      backToHome: 'Về trang chủ',
      emptyList: 'Danh sách trống',
      continueShopping: 'Tiếp tục mua sắm',
    },
    header: {
      bannerNotice: 'Website Sàn TMĐT P4Shop — Đại học Thương Mại | Phát triển: Lê Nguyễn Hà Anh',
      rocketTitle: 'Dịch vụ giao hàng P4Shop Rocket',
      rocketSubtitle: 'Đặt trước 24h, giao hàng nhanh ngày mai!',
      rocketAction: 'Xem ngay',
      giftTitle: 'Tuần lễ tri ân khách hàng',
      giftSubtitle: 'Quà tặng đặc biệt & Voucher giảm đến 100k',
      giftAction: 'Nhận quà',
      categoryBtn: 'Danh mục',
      popularSearches: 'Tìm kiếm phổ biến trên P4Shop',
      todayTrending: 'Xu hướng hôm nay',
      quickNav: {
        play: 'P4Shop Play',
        rocket: 'Giao nhanh',
        fresh: 'Giao tươi',
        repurchase: 'Mua lại',
        biz: 'P4Shop Biz',
        global: 'Hàng quốc tế',
        goldbox: 'Hộp vàng',
        new: 'Mới trong ngày',
        seller: 'Đăng ký bán hàng',
        tracking: 'Theo dõi đơn hàng',
        wishlist: 'Yêu thích',
      },
      categories: {
        all: 'Tất cả danh mục',
        electronics: 'Điện tử & Công nghệ',
        beauty: 'Mỹ phẩm & Chăm sóc da',
        food: 'Cà phê & Thực phẩm',
        houseware: 'Đồ gia dụng & Đời sống',
        fashion_golf: 'Thời trang & Phụ kiện Golf',
        health: 'Sức khỏe & Thực phẩm bổ sung',
      },
    },
    home: {
      heroTitle: 'Siêu Đại Tiệc Ưu Đãi P4Shop',
      flashSaleTitle: 'Flash Sale Siêu Tốc',
      flashSaleBadge: 'GIẢM ĐẾN 82%',
      flashSaleDesc: 'Giá ưu đãi có hạn chỉ trong khung giờ vàng hôm nay!',
      endsIn: 'Kết thúc trong:',
      viewMoreFlashSale: 'Xem tất cả deal Flash Sale',
      bestSellerTitle: 'Bán chạy nhất theo danh mục',
      bestSellerDesc: 'Các sản phẩm có lượt mua và đánh giá 5 sao cao nhất tuần này',
      recommendationTitle: 'Gợi ý dành riêng cho bạn',
      recommendationDesc: 'Dựa trên thói quen mua sắm thông minh của bạn',
      exploreMore: 'Khám phá thêm',
      orderTrackingBannerTitle: 'Theo Dõi Đơn Hàng & Vị Trí Vận Chuyển Trực Tuyến',
      orderTrackingBannerDesc: 'Tra cứu hành trình đơn hàng, vị trí shipper giao đồ theo thời gian thực trên bản đồ',
      trackNow: 'Tra cứu ngay',
      enterOrderNumberPlaceholder: 'Nhập mã đơn hàng (VD: #P4S-892410 hoặc mã vừa đặt)...',
      voucherBannerTitle: 'Kho Voucher Giảm Giá Flash Sale Độc Quyền',
      voucherBannerSubtitle: 'Thu thập mã ngay — Áp dụng cho mọi sản phẩm toàn sàn & Miễn phí vận chuyển!',
      claimVoucher: 'Lưu mã',
      claimed: 'Đã lưu',
      enterPromoCode: 'Nhập mã giảm giá:',
      applyCode: 'Áp dụng',
      allProductsApplied: 'Áp dụng cho mọi sản phẩm',
    },
    wishlist: {
      title: 'Danh Sách Yêu Thích',
      subtitle: 'Nơi lưu giữ các sản phẩm bạn quan tâm để mua sắm bất cứ lúc nào',
      emptyTitle: 'Chưa có sản phẩm nào trong danh sách yêu thích',
      emptyDesc: 'Nhấn vào biểu tượng trái tim trên các sản phẩm để lưu lại tại đây!',
      totalSaved: 'sản phẩm đã lưu',
      clearAll: 'Xóa toàn bộ yêu thích',
      addAllToCart: 'Thêm tất cả vào giỏ hàng',
      removeFromWishlist: 'Xóa khỏi yêu thích',
      moveToCart: 'Chuyển vào giỏ hàng',
    },
    tracking: {
      title: 'Tra Cứu & Theo Dõi Đơn Hàng',
      subtitle: 'Xem vị trí đơn hàng thời gian thực trên bản đồ số & lộ trình vận chuyển',
      inputLabel: 'Mã số đơn hàng',
      inputPlaceholder: 'Nhập mã đơn hàng của bạn (VD: #P4S-892410)...',
      trackButton: 'Theo dõi đơn hàng',
      recentOrders: 'Đơn hàng gần đây của bạn:',
      sampleOrders: 'Đơn hàng của bạn:',
      orderNotFound: 'Không tìm thấy thông tin đơn hàng',
      orderNotFoundDesc: 'Vui lòng kiểm tra lại mã đơn hàng trong thông báo của bạn.',
      statusLabel: 'Trạng thái hiện tại',
      estimatedDelivery: 'Dự kiến giao hàng',
      shippingCourier: 'Đơn vị vận chuyển',
      courierName: 'Nhân viên giao hàng',
      courierPhone: 'Điện thoại liên hệ',
      courierPlate: 'Biển số xe',
      callCourier: 'Gọi Shipper',
      messageCourier: 'Gửi tin nhắn',
      deliveryMap: 'Bản Đồ Lộ Trình Giao Hàng Trực Tiếp',
      routeInfo: 'Hành trình từ Kho Tổng P4Shop TMU đến điểm giao của bạn',
      originWarehouse: 'Kho Tổng P4Shop (ĐH Thương Mại)',
      currentPosition: 'Vị trí hiện tại của Shipper',
      destinationPoint: 'Địa chỉ nhận hàng của bạn',
      liveLocationDesc: 'Shipper đang di chuyển cách bạn khoảng 1.2 km. Dự kiến giao trong 15-20 phút tới!',
      stages: {
        placed: 'Đã đặt hàng',
        confirmed: 'Đã xác nhận',
        packaging: 'Đang đóng gói',
        shipping: 'Đang giao hàng',
        delivered: 'Giao thành công',
      },
    },
    seller: {
      title: 'Kênh Người Bán P4Shop TMU',
      subtitle: 'Khởi nghiệp kinh doanh và mở rộng gian hàng uy tín tại Đại học Thương Mại',
      registerTitle: 'Đăng Ký Mở Gian Hàng Mới',
      registerSubtitle: 'Điền thông tin doanh nghiệp/sinh viên để được duyệt tự động gian hàng',
      storeName: 'Tên gian hàng / Thương hiệu',
      ownerName: 'Tên chủ shop / Đại diện',
      phone: 'Số điện thoại liên hệ',
      address: 'Địa chỉ kho gửi hàng (Hà Nội)',
      category: 'Ngành hàng chủ lực',
      studentId: 'Mã số Sinh viên TMU / CCCD',
      registerBtn: 'Đăng ký gian hàng ngay',
      dashboardTitle: 'Trung Tâm Quản Lý Gian Hàng',
      totalProducts: 'Tổng sản phẩm',
      weeklyRevenue: 'Doanh số 7 ngày',
      positiveRating: 'Tỷ lệ đánh giá tốt',
      auditStatus: 'Tiêu chuẩn kiểm duyệt',
      auditStatusDesc: '100% Sản phẩm đã qua kiểm duyệt quy chuẩn TMU',
      tabProducts: 'Danh sách sản phẩm trong gian hàng',
      tabAddProduct: 'Đăng sản phẩm mới lên sàn',
      productName: 'Tên sản phẩm (Tiếng Việt)',
      productNameEn: 'Tên sản phẩm (Tiếng Anh)',
      originalPrice: 'Giá niêm yết (₫)',
      salePrice: 'Giá khuyến mãi (₫)',
      stock: 'Số lượng tồn kho',
      imageSelect: 'Chọn hình ảnh minh họa chất lượng cao',
      customImageUrl: 'Hoặc dán URL hình ảnh tùy chỉnh',
      description: 'Mô tả chi tiết sản phẩm (Tiếng Việt)',
      descriptionEn: 'Mô tả chi tiết sản phẩm (Tiếng Anh)',
      fastDeliveryOption: 'Hỗ trợ giao nhanh P4Shop Rocket (24h)',
      freeShippingOption: 'Miễn phí vận chuyển cho khách hàng',
      saveProductBtn: 'Đăng bán & Kiểm duyệt tự động',
      deleteProduct: 'Gỡ sản phẩm',
      approvedBadge: 'Đã kiểm duyệt',
      activeSelling: 'Đang bày bán',
      emptySellerProducts: 'Gian hàng của bạn chưa có sản phẩm nào. Hãy đăng sản phẩm đầu tiên!',
    },
    cart: {
      title: 'Giỏ Hàng Của Bạn',
      selectAll: 'Chọn tất cả',
      deleteSelected: 'Xóa mục đã chọn',
      unitPrice: 'Đơn giá',
      quantity: 'Số lượng',
      totalPrice: 'Thành tiền',
      emptyCartTitle: 'Giỏ hàng của bạn đang trống',
      emptyCartDesc: 'Hãy khám phá hàng ngàn deal hời và thêm vào giỏ sắm nhé!',
      orderSummary: 'Tóm tắt đơn hàng',
      subtotal: 'Tạm tính:',
      shippingFee: 'Phí giao hàng:',
      discount: 'Khuyến mãi giảm:',
      totalPayment: 'Tổng thanh toán:',
      checkoutBtn: 'Tiến hành đặt hàng ngay',
      voucherCode: 'Mã giảm giá voucher',
      apply: 'Áp dụng',
      availableVouchers: 'Voucher khả dụng của bạn:',
    },
    checkout: {
      title: 'Xác Nhận Đặt Hàng & Thanh Toán',
      shippingAddressTitle: 'Thông tin nhận hàng',
      editAddress: 'Thay đổi địa chỉ',
      deliveryOption: 'Phương thức vận chuyển',
      paymentMethodTitle: 'Phương thức thanh toán',
      eWallet: 'Ví điện tử (ZaloPay / MoMo)',
      bankCard: 'Thẻ ngân hàng (Napas / Visa / Master)',
      cod: 'Thanh toán tiền mặt khi nhận hàng (COD)',
      orderItemsTitle: 'Kiểm tra sản phẩm',
      voucherDiscount: 'Ưu đãi voucher:',
      termsHeader: 'Điều Khoản & Điều Kiện Giao Dịch P4Shop TMU',
      termsNotice: 'Vui lòng đọc và tích chọn đồng thuận các điều khoản giao dịch trước khi đặt hàng.',
      agreeAllTerms: 'Tôi đồng ý với tất cả điều khoản và chính sách',
      agreeCoreTerms: 'Đồng ý với Điều khoản dịch vụ và Chính sách bảo mật (Bắt buộc)',
      agreeMarketingTerms: 'Nhận thông báo khuyến mãi, voucher độc quyền qua email/SMS (Tùy chọn)',
      confirmOrderBtn: 'Xác nhận đặt hàng',
      secureNotice: 'Môi trường mô phỏng an toàn — Không trừ tiền thật từ tài khoản',
    },
    orderSuccess: {
      title: 'Đặt Hàng Thành Công!',
      demoNotice: 'Đơn hàng của bạn đã được ghi nhận thành công trên hệ thống P4Shop Đại học Thương Mại.',
      orderNumber: 'Mã đơn hàng',
      orderTime: 'Thời gian đặt',
      trackOnMapBtn: 'Theo dõi đơn hàng trên bản đồ ngay',
      continueShopping: 'Tiếp tục mua sắm',
      auditLogTitle: 'Bản ghi xác thực điều khoản (Audit Log)',
    },
  },
  en: {
    common: {
      appName: 'P4Shop',
      university: 'Thuongmai University (TMU)',
      developer: 'Le Nguyen Ha Anh',
      currency: '₫',
      addToCart: 'Add to Cart',
      buyNow: 'Buy Now',
      addedToCart: 'Added to cart successfully!',
      searchPlaceholder: 'Search products on P4Shop! (headphones, coffee, skincare...)',
      search: 'Search',
      viewDetails: 'View Details',
      freeShipping: 'Free Shipping',
      fastDelivery: 'Next-Day Delivery',
      verifiedStore: 'Verified Mall',
      pendingVerification: 'Pending',
      approvedProduct: 'Verified & Approved',
      all: 'All',
      login: 'Sign In',
      register: 'Register',
      customerSupport: 'Customer Care',
      myAccount: 'My Account',
      cart: 'Cart',
      wishlist: 'Wishlist',
      savedItems: 'Saved Items',
      trackOrder: 'Track Order',
      sellerCenter: 'Seller Center',
      language: 'Language',
      backToHome: 'Back to Home',
      emptyList: 'List is empty',
      continueShopping: 'Continue Shopping',
    },
    header: {
      bannerNotice: 'P4Shop E-Commerce Mall — Thuongmai University | Developed by Le Nguyen Ha Anh',
      rocketTitle: 'P4Shop Rocket Delivery Service',
      rocketSubtitle: 'Order before midnight, next-day express delivery!',
      rocketAction: 'Explore',
      giftTitle: 'Customer Appreciation Week',
      giftSubtitle: 'Exclusive gifts & vouchers up to 100k VND',
      giftAction: 'Claim Gift',
      categoryBtn: 'Categories',
      popularSearches: 'Popular Searches on P4Shop',
      todayTrending: 'Trending Today',
      quickNav: {
        play: 'P4Shop Play',
        rocket: 'Rocket Fast',
        fresh: 'Fresh Food',
        repurchase: 'Buy Again',
        biz: 'P4Shop Biz',
        global: 'Global Imports',
        goldbox: 'Gold Box',
        new: 'New Releases',
        seller: 'Become a Seller',
        tracking: 'Order Tracking',
        wishlist: 'Wishlist',
      },
      categories: {
        all: 'All Categories',
        electronics: 'Electronics & Gadgets',
        beauty: 'Cosmetics & Skincare',
        food: 'Coffee & Gourmet Food',
        houseware: 'Home & Living',
        fashion_golf: 'Golf & Fashion Accessories',
        health: 'Health & Supplements',
      },
    },
    home: {
      heroTitle: 'P4Shop Mega Shopping Festival',
      flashSaleTitle: 'Lightning Flash Sale',
      flashSaleBadge: 'UP TO 82% OFF',
      flashSaleDesc: 'Limited quantity flash deals exclusively during golden hours today!',
      endsIn: 'Ends in:',
      viewMoreFlashSale: 'View All Flash Sale Deals',
      bestSellerTitle: 'Best Sellers by Category',
      bestSellerDesc: 'Top rated 5-star products with highest sales this week',
      recommendationTitle: 'Recommended For You',
      recommendationDesc: 'Tailored specifically for your smart shopping habits',
      exploreMore: 'Explore More',
      orderTrackingBannerTitle: 'Real-Time Order Tracking & Live Delivery Map',
      orderTrackingBannerDesc: 'Track your order status and watch your courier ride live on the interactive map',
      trackNow: 'Track Order Now',
      enterOrderNumberPlaceholder: 'Enter order code (e.g. #P4S-892410 or recently placed)...',
      voucherBannerTitle: 'Exclusive Flash Sale Voucher Wallet',
      voucherBannerSubtitle: 'Collect vouchers now — Applicable to ALL products storewide + Free Shipping!',
      claimVoucher: 'Claim',
      claimed: 'Claimed',
      enterPromoCode: 'Enter coupon code:',
      applyCode: 'Apply',
      allProductsApplied: 'Valid on all products',
    },
    wishlist: {
      title: 'My Wishlist',
      subtitle: 'Keep your favorite items saved so you can purchase anytime',
      emptyTitle: 'Your wishlist is currently empty',
      emptyDesc: 'Click the heart icon on any product card to save it here!',
      totalSaved: 'saved items',
      clearAll: 'Clear All Wishlist',
      addAllToCart: 'Add All to Cart',
      removeFromWishlist: 'Remove',
      moveToCart: 'Move to Cart',
    },
    tracking: {
      title: 'Order Status & Live Tracking',
      subtitle: 'View real-time order progression and courier location on the interactive map',
      inputLabel: 'Order Tracking Number',
      inputPlaceholder: 'Enter your order code (e.g. #P4S-892410)...',
      trackButton: 'Track Status',
      recentOrders: 'Your recent orders:',
      sampleOrders: 'Your orders:',
      orderNotFound: 'Order Not Found',
      orderNotFoundDesc: 'Please verify the order number in your order confirmation.',
      statusLabel: 'Current Status',
      estimatedDelivery: 'Estimated Arrival',
      shippingCourier: 'Delivery Carrier',
      courierName: 'Courier Driver',
      courierPhone: 'Contact Number',
      courierPlate: 'Vehicle License Plate',
      callCourier: 'Call Courier',
      messageCourier: 'Send Message',
      deliveryMap: 'Live Delivery Route Map',
      routeInfo: 'Route from P4Shop TMU Central Warehouse to your delivery address',
      originWarehouse: 'P4Shop TMU Hub (Thuongmai University)',
      currentPosition: 'Courier Current Location',
      destinationPoint: 'Your Delivery Address',
      liveLocationDesc: 'Courier is currently ~1.2 km away. Estimated delivery in 15-20 minutes!',
      stages: {
        placed: 'Order Placed',
        confirmed: 'Confirmed',
        packaging: 'Packing & Preparing',
        shipping: 'Out for Delivery',
        delivered: 'Delivered',
      },
    },
    seller: {
      title: 'P4Shop TMU Seller Center',
      subtitle: 'Empower your student entrepreneurship and grow your verified online store',
      registerTitle: 'Register Your New Store',
      registerSubtitle: 'Submit your store details to enjoy instant auto-approval for TMU students',
      storeName: 'Store Name / Brand',
      ownerName: 'Owner / Representative Name',
      phone: 'Contact Phone Number',
      address: 'Warehouse Address (Hanoi)',
      category: 'Main Category',
      studentId: 'TMU Student ID / Citizen ID',
      registerBtn: 'Launch Store Now',
      dashboardTitle: 'Merchant Management Hub',
      totalProducts: 'Total Products',
      weeklyRevenue: '7-Day Revenue',
      positiveRating: 'Positive Rating',
      auditStatus: 'Verification Status',
      auditStatusDesc: '100% Products audited and approved by TMU standards',
      tabProducts: 'Store Product Inventory',
      tabAddProduct: 'Publish New Product',
      productName: 'Product Title (Vietnamese)',
      productNameEn: 'Product Title (English)',
      originalPrice: 'List Price (₫)',
      salePrice: 'Promotional Price (₫)',
      stock: 'Stock Inventory',
      imageSelect: 'Select High-Res Studio Photo',
      customImageUrl: 'Or enter custom image URL',
      description: 'Detailed Description (Vietnamese)',
      descriptionEn: 'Detailed Description (English)',
      fastDeliveryOption: 'Enable P4Shop Rocket 24h Delivery',
      freeShippingOption: 'Offer Free Shipping to Customers',
      saveProductBtn: 'Publish & Auto-Audit Product',
      deleteProduct: 'Remove Product',
      approvedBadge: 'Approved',
      activeSelling: 'Active',
      emptySellerProducts: 'You have no products listed yet. Publish your first item!',
    },
    cart: {
      title: 'Your Shopping Cart',
      selectAll: 'Select All',
      deleteSelected: 'Delete Selected',
      unitPrice: 'Unit Price',
      quantity: 'Quantity',
      totalPrice: 'Total',
      emptyCartTitle: 'Your cart is empty',
      emptyCartDesc: 'Explore thousands of amazing deals and add them to your cart!',
      orderSummary: 'Order Summary',
      subtotal: 'Subtotal:',
      shippingFee: 'Shipping Fee:',
      discount: 'Discounts:',
      totalPayment: 'Total Payment:',
      checkoutBtn: 'Proceed to Checkout',
      voucherCode: 'Voucher Code',
      apply: 'Apply',
      availableVouchers: 'Your Claimed Vouchers:',
    },
    checkout: {
      title: 'Checkout & Payment',
      shippingAddressTitle: 'Shipping Address',
      editAddress: 'Change Address',
      deliveryOption: 'Shipping Speed',
      paymentMethodTitle: 'Payment Method',
      eWallet: 'E-Wallet (ZaloPay / MoMo)',
      bankCard: 'Bank Card (Napas / Visa / Master)',
      cod: 'Cash on Delivery (COD)',
      orderItemsTitle: 'Order Review',
      voucherDiscount: 'Voucher Discount:',
      termsHeader: 'P4Shop TMU Terms & Conditions Agreement',
      termsNotice: 'Please review and accept our transaction terms before placing your order.',
      agreeAllTerms: 'I agree to all terms and conditions',
      agreeCoreTerms: 'Accept Terms of Service and Privacy Policy (Required)',
      agreeMarketingTerms: 'Receive exclusive deals and vouchers via email/SMS (Optional)',
      confirmOrderBtn: 'Place Order Now',
      secureNotice: 'Secure checkout — protected by P4Shop Escrow',
    },
    orderSuccess: {
      title: 'Order Placed Successfully!',
      demoNotice: 'Your order has been registered in the P4Shop Thuongmai University system.',
      orderNumber: 'Order Number',
      orderTime: 'Placed At',
      trackOnMapBtn: 'Track Order Live on Map',
      continueShopping: 'Continue Shopping',
      auditLogTitle: 'Terms Agreement Verification (Audit Log)',
    },
  },
  ko: {
    common: {
      appName: 'P4Shop',
      university: '트엉마이 대학교 (TMU)',
      developer: '레 응우옌 하 안 (Le Nguyen Ha Anh)',
      currency: '₫',
      addToCart: '장바구니 담기',
      buyNow: '바로 구매',
      addedToCart: '장바구니에 담겼습니다!',
      searchPlaceholder: 'P4Shop에서 상품을 검색해보세요! (이어폰, 커피, 화장품...)',
      search: '검색',
      viewDetails: '상세보기',
      freeShipping: '무료배송',
      fastDelivery: '내일 도착 로켓배송',
      verifiedStore: '공식 인증 몰',
      pendingVerification: '검수 대기',
      approvedProduct: '검수 완료',
      all: '전체',
      login: '로그인',
      register: '회원가입',
      customerSupport: '고객센터',
      myAccount: '마이페이지',
      cart: '장바구니',
      wishlist: '찜한 목록',
      savedItems: '보관함',
      trackOrder: '배송 조회',
      sellerCenter: '판매자 센터',
      language: '언어',
      backToHome: '홈으로 이동',
      emptyList: '목록이 비어있습니다',
      continueShopping: '쇼핑 계속하기',
    },
    header: {
      bannerNotice: 'P4Shop 전자상거래 몰 — 트엉마이 대학교 | 개발자: 레 응우옌 하 안',
      rocketTitle: 'P4Shop 로켓배송 서비스',
      rocketSubtitle: '오늘 밤 12시 전 주문 시 내일 로켓 도착!',
      rocketAction: '바로가기',
      giftTitle: '고객 감사 특별 주간',
      giftSubtitle: '특별 사은품 및 최대 10만동 쿠폰 증정',
      giftAction: '받기',
      categoryBtn: '카테고리',
      popularSearches: 'P4Shop 인기 검색어',
      todayTrending: '오늘의 트렌드',
      quickNav: {
        play: 'P4Shop 플레이',
        rocket: '로켓배송',
        fresh: '로켓프레시',
        repurchase: '자주 산 상품',
        biz: 'P4Shop 비즈',
        global: '로켓직구',
        goldbox: '골드박스',
        new: '오늘의 신상품',
        seller: '판매자 입점',
        tracking: '실시간 배송조회',
        wishlist: '찜리스트',
      },
      categories: {
        all: '전체 카테고리',
        electronics: '가전 & 디지털',
        beauty: '뷰티 & 스킨케어',
        food: '식품 & 커피',
        houseware: '생활 & 주방용품',
        fashion_golf: '골프 & 패션',
        health: '건강 & 영양제',
      },
    },
    home: {
      heroTitle: 'P4Shop 슈퍼 쇼핑 페스티벌',
      flashSaleTitle: '타임 플래시 세일',
      flashSaleBadge: '최대 82% 할인',
      flashSaleDesc: '오늘 한정 골든타임 특가 혜택을 놓치지 마세요!',
      endsIn: '마감까지 남은 시간:',
      viewMoreFlashSale: '플래시 세일 상품 전체보기',
      bestSellerTitle: '카테고리별 베스트셀러',
      bestSellerDesc: '이번 주 평점 5점 만점 및 최다 판매 인기 상품',
      recommendationTitle: '회원님을 위한 맞춤 추천',
      recommendationDesc: '고객님의 스마트 쇼핑 취향을 기반으로 추천합니다',
      exploreMore: '더 알아보기',
      orderTrackingBannerTitle: '실시간 배송 조회 & 지도 위치 확인',
      orderTrackingBannerDesc: '배송 기사님의 실시간 위치와 이동 경로를 지도에서 확인하세요',
      trackNow: '지금 조회하기',
      enterOrderNumberPlaceholder: '주문번호 입력 (#P4S-892410 또는 최근 주문)...',
      voucherBannerTitle: '플래시 세일 전용 쿠폰팩',
      voucherBannerSubtitle: '지금 쿠폰 받기 — 전 상품 적용 가능 & 무료배송 쿠폰 증정!',
      claimVoucher: '쿠폰 받기',
      claimed: '발급완료',
      enterPromoCode: '쿠폰 코드 입력:',
      applyCode: '적용',
      allProductsApplied: '전 상품 적용 가능',
    },
    wishlist: {
      title: '내가 찜한 상품',
      subtitle: '관심 있는 상품을 모아두고 언제든지 편리하게 구매하세요',
      emptyTitle: '찜한 상품이 없습니다',
      emptyDesc: '상품의 하트 아이콘을 눌러 관심 상품으로 보관해보세요!',
      totalSaved: '개 상품 찜함',
      clearAll: '전체 삭제',
      addAllToCart: '전체 장바구니 담기',
      removeFromWishlist: '삭제',
      moveToCart: '장바구니로 이동',
    },
    tracking: {
      title: '주문 & 실시간 배송 조회',
      subtitle: '실시간 주문 진행 상태와 배송 기사님의 지도 위치를 확인하세요',
      inputLabel: '주문번호',
      inputPlaceholder: '주문번호를 입력하세요 (예: #P4S-892410)...',
      trackButton: '배송 조회',
      recentOrders: '최근 내 주문 내역:',
      sampleOrders: '체험용 데모 주문번호:',
      orderNotFound: '주문 정보를 찾을 수 없습니다',
      orderNotFoundDesc: '주문번호를 다시 확인하시거나 상단의 데모 번호를 선택해주세요.',
      statusLabel: '현재 상태',
      estimatedDelivery: '도착 예정 시간',
      shippingCourier: '배송사',
      courierName: '배송 기사',
      courierPhone: '기사님 연락처',
      courierPlate: '차량 번호',
      callCourier: '기사님 통화',
      messageCourier: '문자 보내기',
      deliveryMap: '실시간 배송 경로 지도',
      routeInfo: 'P4Shop TMU 물류센터부터 배송지까지의 이동 경로',
      originWarehouse: 'P4Shop TMU 물류센터 (트엉마이대)',
      currentPosition: '배송 기사 현재 위치',
      destinationPoint: '고객님 배송지',
      liveLocationDesc: '배송 기사님이 약 1.2km 전방에서 이동 중입니다. 15~20분 내 도착 예정입니다!',
      stages: {
        placed: '주문 접수',
        confirmed: '주문 확인',
        packaging: '상품 포장 중',
        shipping: '배송 중',
        delivered: '배송 완료',
      },
    },
    seller: {
      title: 'P4Shop TMU 판매자 센터',
      subtitle: '트엉마이 대학교 공식 인증 쇼핑몰에서 내 브랜드를 시작하세요',
      registerTitle: '신규 판매자 입점 신청',
      registerSubtitle: 'TMU 학생 및 판매자 정보 등록 시 즉시 검수 통과 입점',
      storeName: '스토어명 / 브랜드명',
      ownerName: '대표자명',
      phone: '대표 연락처',
      address: '출고지 주소 (하노이)',
      category: '주요 판매 카테고리',
      studentId: 'TMU 학번 또는 주민번호',
      registerBtn: '스토어 개설하기',
      dashboardTitle: '판매자 관리 대시보드',
      totalProducts: '등록 상품 수',
      weeklyRevenue: '주간 매출액',
      positiveRating: '고객 만족도',
      auditStatus: '품질 검수 현황',
      auditStatusDesc: 'TMU 품질 기준 100% 검수 통과 완료',
      tabProducts: '내 스토어 상품 목록',
      tabAddProduct: '신규 상품 등록',
      productName: '상품명 (베트남어)',
      productNameEn: '상품명 (영어)',
      originalPrice: '정상가 (₫)',
      salePrice: '할인가 (₫)',
      stock: '재고 수량',
      imageSelect: '스튜디오 고화질 이미지 선택',
      customImageUrl: '또는 이미지 URL 직접 입력',
      description: '상세 설명 (베트남어)',
      descriptionEn: '상세 설명 (영어)',
      fastDeliveryOption: 'P4Shop 로켓 24h 배송 지원',
      freeShippingOption: '고객 무료배송 혜택 제공',
      saveProductBtn: '상품 등록 & 자동 검수',
      deleteProduct: '상품 삭제',
      approvedBadge: '검수 완료',
      activeSelling: '판매 중',
      emptySellerProducts: '등록된 상품이 없습니다. 첫 상품을 등록해보세요!',
    },
    cart: {
      title: '장바구니',
      selectAll: '전체 선택',
      deleteSelected: '선택 삭제',
      unitPrice: '단가',
      quantity: '수량',
      totalPrice: '주문금액',
      emptyCartTitle: '장바구니가 비어 있습니다',
      emptyCartDesc: '다양한 특가 상품을 둘러보고 장바구니에 담아보세요!',
      orderSummary: '주문 요약',
      subtotal: '상품금액:',
      shippingFee: '배송비:',
      discount: '할인금액:',
      totalPayment: '총 결제예정금액:',
      checkoutBtn: '주문하기',
      voucherCode: '할인 쿠폰 코드',
      apply: '쿠폰 적용',
      availableVouchers: '보유 중인 할인 쿠폰:',
    },
    checkout: {
      title: '주문서 작성 & 결제',
      shippingAddressTitle: '배송지 정보',
      editAddress: '배송지 변경',
      deliveryOption: '배송 옵션',
      paymentMethodTitle: '결제 수단',
      eWallet: '전자지갑 (ZaloPay / MoMo)',
      bankCard: '국내/해외 카드 (Napas / Visa / Master)',
      cod: '착불 현금 결제 (COD)',
      orderItemsTitle: '주문 상품 확인',
      voucherDiscount: '쿠폰 할인:',
      termsHeader: 'P4Shop TMU 전자상거래 이용약관 동의',
      termsNotice: '주문 전 이용약관 및 개인정보 처리방침을 확인하고 동의해주세요.',
      agreeAllTerms: '모든 약관에 전체 동의합니다',
      agreeCoreTerms: '이용약관 및 개인정보 수집 이용 동의 (필수)',
      agreeMarketingTerms: '이벤트 및 혜택 알림 수신 동의 (선택)',
      confirmOrderBtn: '결제 및 주문 완료',
      secureNotice: '안전한 결제 — P4Shop Escrow 보호',
    },
    orderSuccess: {
      title: '주문이 정상 완료되었습니다!',
      demoNotice: '트엉마이 대학교 P4Shop 시스템에 주문이 안전하게 등록되었습니다.',
      orderNumber: '주문번호',
      orderTime: '주문일시',
      trackOnMapBtn: '실시간 지도에서 배송 조회하기',
      continueShopping: '쇼핑 계속하기',
      auditLogTitle: '약관 동의 감사 기록 (Audit Log)',
    },
  },
};
