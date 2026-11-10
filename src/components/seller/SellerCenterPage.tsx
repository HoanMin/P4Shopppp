import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Store, 
  PlusCircle, 
  Trash2, 
  CheckCircle2, 
  ShieldCheck, 
  Package, 
  TrendingUp, 
  Star, 
  Image as ImageIcon, 
  Sparkles,
  ExternalLink,
  Tag,
  ArrowRight
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { ProductCategory, Product } from '../../types';
import { formatVND } from '../../utils/pricing';

const SAMPLE_STUDIO_IMAGES: { label: string; url: string; cat: ProductCategory }[] = [
  { label: 'Tai nghe Bluetooth Pro', url: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&auto=format&fit=crop&q=80', cat: 'electronics' },
  { label: 'Loa Không Dây Studio', url: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=600&auto=format&fit=crop&q=80', cat: 'electronics' },
  { label: 'Serum Dưỡng Da Collagen', url: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&auto=format&fit=crop&q=80', cat: 'beauty' },
  { label: 'Sáp Tẩy Trang Dưỡng Ẩm', url: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&auto=format&fit=crop&q=80', cat: 'beauty' },
  { label: 'Cà Phê Arabica Rang Mộc', url: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=600&auto=format&fit=crop&q=80', cat: 'food' },
  { label: 'Trà Thảo Mộc Thượng Hạng', url: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=600&auto=format&fit=crop&q=80', cat: 'food' },
  { label: 'Bình Giữ Nhiệt Thép Không Gỉ', url: 'https://images.unsplash.com/photo-1577937927133-66ef06acdf18?w=600&auto=format&fit=crop&q=80', cat: 'houseware' },
  { label: 'Đèn Bàn Chống Cận Thị', url: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&auto=format&fit=crop&q=80', cat: 'houseware' },
  { label: 'Áo Polo Thể Thao Golf', url: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=600&auto=format&fit=crop&q=80', cat: 'fashion_golf' },
  { label: 'Bóng Golf Tour Performance', url: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=600&auto=format&fit=crop&q=80', cat: 'fashion_golf' },
  { label: 'Viên Uống Vitamin Sức Khỏe', url: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=600&auto=format&fit=crop&q=80', cat: 'health' },
];

export const SellerCenterPage: React.FC = () => {
  const navigate = useNavigate();
  const { 
    sellerStore, 
    registerSellerStore, 
    sellerProducts, 
    addSellerProduct, 
    deleteSellerProduct,
    language, 
    t 
  } = useCart();

  const [activeTab, setActiveTab] = useState<'products' | 'add'>('products');

  // Registration Form State
  const [storeName, setStoreName] = useState('');
  const [ownerName, setOwnerName] = useState('Lê Nguyễn Hà Anh');
  const [phone, setPhone] = useState('0912 345 678');
  const [address, setAddress] = useState('Đại học Thương Mại, 79 Hồ Tùng Mậu, Cầu Giấy, Hà Nội');
  const [category, setCategory] = useState<ProductCategory>('electronics');
  const [studentId, setStudentId] = useState('TMU-2026-HAANH');

  // Add Product Form State
  const [newProdName, setNewProdName] = useState('');
  const [newProdNameEn, setNewProdNameEn] = useState('');
  const [newProdCategory, setNewProdCategory] = useState<ProductCategory>('electronics');
  const [newProdSubcategory, setNewProdSubcategory] = useState('Đồ công nghệ thông minh');
  const [newProdPrice, setNewProdPrice] = useState('299000');
  const [newProdOriginalPrice, setNewProdOriginalPrice] = useState('450000');
  const [newProdStock, setNewProdStock] = useState('50');
  const [newProdImage, setNewProdImage] = useState(SAMPLE_STUDIO_IMAGES[0].url);
  const [newProdDesc, setNewProdDesc] = useState('');
  const [newProdDescEn, setNewProdDescEn] = useState('');
  const [fastDelivery, setFastDelivery] = useState(true);
  const [freeShipping, setFreeShipping] = useState(true);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!storeName.trim()) {
      alert(language === 'en' ? 'Please enter a store name!' : 'Vui lòng nhập tên gian hàng!');
      return;
    }
    registerSellerStore({
      storeName: storeName.trim(),
      ownerName: ownerName.trim(),
      phone: phone.trim(),
      address: address.trim(),
      category,
      studentIdOrTax: studentId.trim(),
    });
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdName.trim()) {
      alert(language === 'en' ? 'Please enter a product title!' : 'Vui lòng nhập tên sản phẩm!');
      return;
    }

    const price = parseInt(newProdPrice, 10) || 100000;
    const original = parseInt(newProdOriginalPrice, 10) || price;
    const discount = original > price ? Math.round(((original - price) / original) * 100) : 0;

    addSellerProduct({
      name: newProdName.trim(),
      nameEn: newProdNameEn.trim() || newProdName.trim(),
      brand: sellerStore?.storeName || 'P4Shop TMU Store',
      category: newProdCategory,
      subcategory: newProdSubcategory,
      subcategoryEn: newProdSubcategory,
      originalPrice: original,
      currentPrice: price,
      discountPercent: discount,
      image: newProdImage,
      images: [newProdImage],
      fastDelivery,
      deliveryDateText: 'Giao ngày mai (T5)',
      deliveryDateTextEn: 'Next-Day Delivery',
      freeShipping,
      condition: 'new',
      conditionText: 'Mới 100%',
      conditionTextEn: 'Brand New 100%',
      variantsCount: 1,
      description: newProdDesc.trim() || 'Sản phẩm chính hãng chất lượng cao phân phối từ gian hàng sinh viên ĐH Thương Mại.',
      descriptionEn: newProdDescEn.trim() || 'High quality genuine product distributed from TMU student merchant store.',
      specs: {
        'Tình trạng': 'Mới 100%',
        'Xuất xứ': 'Chính hãng',
        'Bảo hành': '12 tháng',
      },
      variants: [
        {
          id: 'v_default',
          name: 'Tiêu chuẩn',
          nameEn: 'Standard',
          price,
          inStock: true,
        },
      ],
    });

    // Reset & switch to products tab
    setNewProdName('');
    setNewProdNameEn('');
    setNewProdDesc('');
    setNewProdDescEn('');
    setActiveTab('products');
  };

  return (
    <div className="min-h-screen bg-[#F5F6F8] pb-16 font-sans">
      
      {/* 1. Header Banner */}
      <div className="bg-gradient-to-r from-[#0B2A5B] via-[#0F3876] to-[#1E3A8A] text-white py-8 px-4 border-b border-blue-900 shadow-sm">
        <div className="max-w-[1240px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <Store className="w-6 h-6 text-[#3B6EF5]" />
              <h1 className="text-2xl md:text-3xl font-black tracking-tight">
                {t.seller.title}
              </h1>
              <span className="bg-emerald-500/30 text-emerald-300 text-xs font-bold px-2.5 py-0.5 rounded-full border border-emerald-400/40">
                Chính thức TMU
              </span>
            </div>
            <p className="text-sm text-blue-200">
              {t.seller.subtitle}
            </p>
          </div>

          {sellerStore && (
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/15 text-xs text-blue-100 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <p className="font-extrabold text-white text-sm">{sellerStore.storeName}</p>
                <span className="text-emerald-300 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {t.seller.auditStatusDesc}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-[1240px] mx-auto px-4 py-8">
        
        {/* If Not Registered: Show Registration Form */}
        {!sellerStore ? (
          <div className="bg-white rounded-2xl p-6 md:p-10 border border-gray-200 shadow-md max-w-2xl mx-auto">
            <div className="text-center mb-6">
              <div className="w-14 h-14 bg-blue-50 text-[#3B6EF5] rounded-full flex items-center justify-center mx-auto mb-3">
                <Store className="w-7 h-7" />
              </div>
              <h2 className="text-xl font-black text-gray-900">{t.seller.registerTitle}</h2>
              <p className="text-xs text-gray-500 mt-1 max-w-md mx-auto">
                {t.seller.registerSubtitle}
              </p>
            </div>

            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">{t.seller.storeName} *</label>
                <input
                  type="text"
                  required
                  value={storeName}
                  onChange={(e) => setStoreName(e.target.value)}
                  placeholder="VD: P4Shop Tech TMU, Mỹ Phẩm Sinh Viên..."
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-xs font-semibold text-gray-800 focus:bg-white focus:border-blue-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">{t.seller.ownerName}</label>
                  <input
                    type="text"
                    value={ownerName}
                    onChange={(e) => setOwnerName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-xs font-semibold text-gray-800 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">{t.seller.phone}</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-xs font-semibold text-gray-800 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">{t.seller.address}</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-xs font-semibold text-gray-800 outline-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">{t.seller.category}</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as ProductCategory)}
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-xs font-semibold text-gray-800 outline-none cursor-pointer"
                  >
                    <option value="electronics">Điện tử &amp; Công nghệ</option>
                    <option value="beauty">Mỹ phẩm &amp; Làm đẹp</option>
                    <option value="food">Cà phê &amp; Thực phẩm</option>
                    <option value="houseware">Đồ gia dụng</option>
                    <option value="fashion_golf">Thời trang Golf</option>
                    <option value="health">Sức khỏe &amp; Dinh dưỡng</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">{t.seller.studentId}</label>
                  <input
                    type="text"
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-xs font-semibold text-gray-800 outline-none"
                  />
                </div>
              </div>

              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  <strong>Đặc quyền TMU:</strong> Gian hàng của bạn được cấp chứng nhận kiểm duyệt uy tín tự động ngay sau khi đăng ký.
                </span>
              </div>

              <button
                type="submit"
                className="w-full bg-[#3B6EF5] hover:bg-blue-600 text-white font-bold text-sm py-3 rounded-xl transition-all shadow-md cursor-pointer"
              >
                {t.seller.registerBtn}
              </button>
            </form>
          </div>
        ) : (
          /* If Registered: Merchant Dashboard */
          <div className="space-y-6">
            
            {/* KPI Cards Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs">
                <div className="flex items-center justify-between text-gray-400 mb-2">
                  <span className="text-xs font-bold">{t.seller.totalProducts}</span>
                  <Package className="w-4 h-4 text-blue-500" />
                </div>
                <div className="text-2xl font-black text-gray-900">{sellerProducts.length}</div>
                <span className="text-[11px] text-emerald-600 font-semibold">100% {t.seller.approvedBadge}</span>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs">
                <div className="flex items-center justify-between text-gray-400 mb-2">
                  <span className="text-xs font-bold">{t.seller.weeklyRevenue}</span>
                  <TrendingUp className="w-4 h-4 text-emerald-500" />
                </div>
                <div className="text-2xl font-black text-emerald-700">18.450.000 ₫</div>
                <span className="text-[11px] text-gray-400 font-medium">+14% so với tuần trước</span>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs">
                <div className="flex items-center justify-between text-gray-400 mb-2">
                  <span className="text-xs font-bold">{t.seller.positiveRating}</span>
                  <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                </div>
                <div className="text-2xl font-black text-gray-900">4.9 / 5.0</div>
                <span className="text-[11px] text-gray-400 font-medium">99.8% hài lòng</span>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs">
                <div className="flex items-center justify-between text-gray-400 mb-2">
                  <span className="text-xs font-bold">{t.seller.auditStatus}</span>
                  <ShieldCheck className="w-4 h-4 text-[#3B6EF5]" />
                </div>
                <div className="text-base font-black text-blue-700">ĐÃ KIỂM DUYỆT</div>
                <span className="text-[11px] text-emerald-600 font-semibold">Tiêu chuẩn TMU Mall</span>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex items-center gap-2 border-b border-gray-200 pb-2">
              <button
                onClick={() => setActiveTab('products')}
                className={`text-xs md:text-sm font-bold px-4 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'products'
                    ? 'bg-[#0B2A5B] text-white shadow-xs'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                <Package className="w-4 h-4" />
                <span>{t.seller.tabProducts} ({sellerProducts.length})</span>
              </button>
              <button
                onClick={() => setActiveTab('add')}
                className={`text-xs md:text-sm font-bold px-4 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'add'
                    ? 'bg-[#3B6EF5] text-white shadow-xs'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                <PlusCircle className="w-4 h-4" />
                <span>{t.seller.tabAddProduct}</span>
              </button>
            </div>

            {/* TAB 1: Products List */}
            {activeTab === 'products' && (
              <div>
                {sellerProducts.length === 0 ? (
                  <div className="bg-white rounded-2xl p-12 text-center border border-gray-200 max-w-md mx-auto my-6 shadow-xs">
                    <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <h3 className="text-base font-bold text-gray-800">{t.seller.emptySellerProducts}</h3>
                    <p className="text-xs text-gray-500 mt-1 mb-5">
                      Đăng tải sản phẩm mới để tiếp cận hàng ngàn sinh viên và khách hàng trên P4Shop.
                    </p>
                    <button
                      onClick={() => setActiveTab('add')}
                      className="bg-[#3B6EF5] hover:bg-blue-600 text-white font-bold text-xs py-2.5 px-5 rounded-xl inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <PlusCircle className="w-4 h-4" />
                      <span>{t.seller.tabAddProduct} ngay</span>
                    </button>
                  </div>
                ) : (
                  <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-xs">
                    <div className="divide-y divide-gray-100">
                      {sellerProducts.map(product => (
                        <div key={product.id} className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-gray-50/50 transition-colors">
                          <div className="flex items-center gap-3">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-16 h-16 rounded-xl object-cover border border-gray-200 bg-gray-50 shrink-0"
                            />
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                                  <CheckCircle2 className="w-3 h-3" />
                                  {t.seller.approvedBadge}
                                </span>
                                <span className="text-[10px] text-gray-400">• {product.subcategory}</span>
                              </div>
                              <h4 className="text-sm font-bold text-gray-900 mt-0.5 line-clamp-1">
                                {language === 'en' && product.nameEn ? product.nameEn : product.name}
                              </h4>
                              <div className="flex items-baseline gap-2 mt-1">
                                <span className="text-sm font-black text-[#F0471C]">
                                  {formatVND(product.currentPrice)}
                                </span>
                                {product.originalPrice > product.currentPrice && (
                                  <span className="text-xs text-gray-400 line-through">
                                    {formatVND(product.originalPrice)}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 self-end sm:self-auto">
                            <button
                              onClick={() => navigate(`/product/${product.id}`)}
                              className="bg-gray-100 hover:bg-blue-50 text-gray-700 hover:text-blue-600 text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                              title="Xem trên sàn"
                            >
                              <ExternalLink className="w-3 h-3" />
                              <span>Xem live</span>
                            </button>
                            <button
                              onClick={() => deleteSellerProduct(product.id)}
                              className="bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 cursor-pointer border border-rose-200"
                              title="Xóa khỏi gian hàng"
                            >
                              <Trash2 className="w-3 h-3" />
                              <span>{t.seller.deleteProduct}</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: Add New Product Form */}
            {activeTab === 'add' && (
              <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-200 shadow-xs max-w-3xl">
                <div className="mb-6 pb-4 border-b border-gray-100 flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-black text-gray-900">{t.seller.tabAddProduct}</h3>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Sản phẩm được tự động xác minh và kiểm duyệt tiêu chuẩn P4Shop TMU
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Auto-Audit Enabled
                  </span>
                </div>

                <form onSubmit={handleAddProduct} className="space-y-4">
                  {/* Name fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">{t.seller.productName} *</label>
                      <input
                        type="text"
                        required
                        value={newProdName}
                        onChange={(e) => setNewProdName(e.target.value)}
                        placeholder="VD: Tai nghe Bluetooth P4Shop Max..."
                        className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-xs font-semibold text-gray-800 focus:bg-white focus:border-blue-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">{t.seller.productNameEn}</label>
                      <input
                        type="text"
                        value={newProdNameEn}
                        onChange={(e) => setNewProdNameEn(e.target.value)}
                        placeholder="e.g. Wireless Bluetooth Earphones P4Shop..."
                        className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-xs font-semibold text-gray-800 focus:bg-white focus:border-blue-500 outline-none"
                      />
                    </div>
                  </div>

                  {/* Category & Subcategory */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">{t.seller.category}</label>
                      <select
                        value={newProdCategory}
                        onChange={(e) => setNewProdCategory(e.target.value as ProductCategory)}
                        className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-xs font-semibold text-gray-800 outline-none cursor-pointer"
                      >
                        <option value="electronics">Điện tử &amp; Công nghệ</option>
                        <option value="beauty">Mỹ phẩm &amp; Chăm sóc da</option>
                        <option value="food">Cà phê &amp; Thực phẩm</option>
                        <option value="houseware">Đồ gia dụng &amp; Đời sống</option>
                        <option value="fashion_golf">Thời trang &amp; Golf</option>
                        <option value="health">Sức khỏe &amp; Dinh dưỡng</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">Phân loại phụ (Subcategory)</label>
                      <input
                        type="text"
                        value={newProdSubcategory}
                        onChange={(e) => setNewProdSubcategory(e.target.value)}
                        placeholder="VD: Tai nghe không dây, Cà phê hạt..."
                        className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-xs font-semibold text-gray-800 outline-none"
                      />
                    </div>
                  </div>

                  {/* Pricing & Stock */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">{t.seller.salePrice} *</label>
                      <input
                        type="number"
                        required
                        value={newProdPrice}
                        onChange={(e) => setNewProdPrice(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-xs font-semibold text-gray-800 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">{t.seller.originalPrice}</label>
                      <input
                        type="number"
                        value={newProdOriginalPrice}
                        onChange={(e) => setNewProdOriginalPrice(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-xs font-semibold text-gray-800 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">{t.seller.stock}</label>
                      <input
                        type="number"
                        value={newProdStock}
                        onChange={(e) => setNewProdStock(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-xs font-semibold text-gray-800 outline-none"
                      />
                    </div>
                  </div>

                  {/* Image Picker */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5">{t.seller.imageSelect}</label>
                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5 mb-2">
                      {SAMPLE_STUDIO_IMAGES.map((img, idx) => (
                        <div
                          key={idx}
                          onClick={() => setNewProdImage(img.url)}
                          className={`relative aspect-square rounded-xl overflow-hidden border-2 cursor-pointer transition-all ${
                            newProdImage === img.url ? 'border-[#3B6EF5] ring-2 ring-blue-200 scale-105' : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <img src={img.url} alt={img.label} className="w-full h-full object-cover" />
                          {newProdImage === img.url && (
                            <div className="absolute top-1 right-1 bg-[#3B6EF5] text-white rounded-full p-0.5">
                              <CheckCircle2 className="w-3 h-3" />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                    <input
                      type="text"
                      value={newProdImage}
                      onChange={(e) => setNewProdImage(e.target.value)}
                      placeholder={t.seller.customImageUrl}
                      className="w-full px-3.5 py-2 bg-gray-50 border border-gray-300 rounded-xl text-xs text-gray-700 outline-none"
                    />
                  </div>

                  {/* Descriptions */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">{t.seller.description}</label>
                      <textarea
                        rows={3}
                        value={newProdDesc}
                        onChange={(e) => setNewProdDesc(e.target.value)}
                        placeholder="Mô tả công năng, đặc điểm nổi bật..."
                        className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-xs text-gray-800 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">{t.seller.descriptionEn}</label>
                      <textarea
                        rows={3}
                        value={newProdDescEn}
                        onChange={(e) => setNewProdDescEn(e.target.value)}
                        placeholder="Key features, specifications in English..."
                        className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-xs text-gray-800 outline-none"
                      />
                    </div>
                  </div>

                  {/* Toggles */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-1">
                    <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-gray-700">
                      <input
                        type="checkbox"
                        checked={fastDelivery}
                        onChange={(e) => setFastDelivery(e.target.checked)}
                        className="w-4 h-4 text-blue-600 rounded cursor-pointer"
                      />
                      <span>{t.seller.fastDeliveryOption}</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-gray-700">
                      <input
                        type="checkbox"
                        checked={freeShipping}
                        onChange={(e) => setFreeShipping(e.target.checked)}
                        className="w-4 h-4 text-blue-600 rounded cursor-pointer"
                      />
                      <span>{t.seller.freeShippingOption}</span>
                    </label>
                  </div>

                  {/* Audit assurance notice */}
                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>
                      <strong>Tiêu chuẩn kiểm duyệt TMU:</strong> Sau khi nhấn đăng bán, sản phẩm sẽ được gán nhãn <em>Đã kiểm duyệt (Verified)</em> và hiển thị ngay trên thanh tìm kiếm và mục danh mục.
                    </span>
                  </div>

                  <div className="flex items-center gap-3 pt-2">
                    <button
                      type="submit"
                      className="flex-1 bg-[#3B6EF5] hover:bg-blue-600 text-white font-bold text-sm py-3 rounded-xl transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
                    >
                      <PlusCircle className="w-4 h-4" />
                      <span>{t.seller.saveProductBtn}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab('products')}
                      className="px-5 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs rounded-xl transition-colors cursor-pointer"
                    >
                      Hủy
                    </button>
                  </div>
                </form>
              </div>
            )}

          </div>
        )}

      </div>

    </div>
  );
};
