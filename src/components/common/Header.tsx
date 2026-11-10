import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Menu, 
  Search, 
  Mic, 
  User, 
  ShoppingCart, 
  Rocket, 
  Gift, 
  ChevronRight, 
  ChevronLeft,
  Tv, 
  RotateCcw, 
  Briefcase, 
  Globe2, 
  Sparkles, 
  Store,
  ChevronDown,
  Apple,
  Heart,
  Truck
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { MegaMenu } from './MegaMenu';

const AUTOCOMPLETE_SUGGESTIONS_VI = [
  'tai nghe bluetooth không dây',
  'sony wh-1000xm5',
  'sáp tẩy trang banila co',
  'cà phê cô đặc blendy',
  'nồi chiên không dầu lock&lock',
  'mì udon tươi pulmuone',
  'áo polo golf hazzys',
  'bóng golf titleist pro v1',
  'tinh chất hồng sâm kgc',
  'nước tăng lực guronsan',
  'máy lọc không khí levoit',
  'bình giữ nhiệt stanley',
];

const AUTOCOMPLETE_SUGGESTIONS_EN = [
  'wireless bluetooth earphones',
  'sony wh-1000xm5',
  'banila co cleansing balm',
  'agf blendy portion coffee',
  'lock&lock air fryer',
  'pulmuone fresh udon',
  'hazzys golf polo',
  'titleist pro v1 golf balls',
  'kgc korean red ginseng',
  'guronsan energy drink',
  'levoit air purifier',
  'stanley tumbler 40oz',
];

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cart, wishlist, language, setLanguage, t } = useCart();
  
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const menuScrollRef = useRef<HTMLDivElement>(null);

  // Sync searchQuery with URL params if on /search
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get('q');
    if (q) {
      setSearchQuery(q);
    }
  }, [location.search]);

  // Handle scroll for sticky search bar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 150) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalWishlistCount = wishlist.length;

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = searchQuery.trim();
    setShowSuggestions(false);
    if (trimmed) {
      navigate(`/search?q=${encodeURIComponent(trimmed)}${selectedCategory !== 'all' ? `&cat=${selectedCategory}` : ''}`);
    } else {
      navigate('/search?q=all');
    }
  };

  const handleSelectSuggestion = (text: string) => {
    setSearchQuery(text);
    setShowSuggestions(false);
    navigate(`/search?q=${encodeURIComponent(text)}`);
  };

  const scrollQuickMenu = (direction: 'left' | 'right') => {
    if (menuScrollRef.current) {
      menuScrollRef.current.scrollBy({
        left: direction === 'left' ? -220 : 220,
        behavior: 'smooth'
      });
    }
  };

  const quickNavItems = [
    { id: 'tracking', name: t.header.quickNav.tracking, icon: <Truck className="w-4 h-4 text-emerald-600" />, badge: 'GPS', path: '/tracking' },
    { id: 'wishlist', name: t.header.quickNav.wishlist, icon: <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />, badge: totalWishlistCount > 0 ? `${totalWishlistCount}` : null, path: '/wishlist' },
    { id: 'seller', name: t.header.quickNav.seller, icon: <Store className="w-4 h-4 text-cyan-600" />, badge: 'HOT', path: '/seller' },
    { id: 'rocket', name: t.header.quickNav.rocket, icon: <Rocket className="w-4 h-4 text-blue-500" />, badge: null, path: '/search?q=rocket' },
    { id: 'fresh', name: t.header.quickNav.fresh, icon: <Apple className="w-4 h-4 text-emerald-500" />, badge: null, path: '/search?q=food' },
    { id: 'goldbox', name: t.header.quickNav.goldbox, icon: <Gift className="w-4 h-4 text-amber-500" />, badge: 'SALE', path: '/search?q=flashsale' },
    { id: 'new', name: t.header.quickNav.new, icon: <Sparkles className="w-4 h-4 text-red-500" />, badge: 'NEW', path: '/search?q=all' },
    { id: 'play', name: t.header.quickNav.play, icon: <Tv className="w-4 h-4 text-indigo-500" />, badge: null, path: '/search?q=electronics' },
  ];

  const suggestions = language === 'en' ? AUTOCOMPLETE_SUGGESTIONS_EN : AUTOCOMPLETE_SUGGESTIONS_VI;

  return (
    <header className="w-full bg-white select-none relative z-30 font-sans">
      {/* 0. Demo Environment Notice Banner */}
      <div className="bg-[#0B2A5B] text-white text-xs py-1.5 px-4 text-center font-medium tracking-wide flex flex-wrap items-center justify-center gap-2">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span>{t.header.bannerNotice}</span>
        <span className="text-gray-300">|</span>
        <span className="bg-orange-500/30 text-orange-200 px-2 py-0.5 rounded text-[11px] font-semibold">
          {language === 'en' ? 'Developer: Le Nguyen Ha Anh' : 'Người phát triển: Lê Nguyễn Hà Anh'}
        </span>
      </div>

      {/* a) Top Dual Banner (Rocket Delivery 24h & Special Gifts) */}
      <div className="bg-gradient-to-r from-[#DFF2FE] via-[#E9F4FF] to-[#FEEEDF] border-b border-blue-100/60 overflow-hidden">
        <div className="max-w-[1240px] mx-auto h-[74px] md:h-[84px] grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-blue-200/50">
          {/* Left half: Rocket 24h */}
          <div 
            onClick={() => navigate('/search?q=rocket')}
            className="flex items-center justify-between px-5 md:px-8 cursor-pointer hover:opacity-95 transition-opacity group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 md:w-11 md:h-11 rounded-full bg-white/90 shadow-xs flex items-center justify-center text-blue-600 group-hover:scale-105 transition-transform">
                <Rocket className="w-6 h-6 text-[#3B6EF5]" />
              </div>
              <div>
                <p className="text-xs text-blue-900 font-semibold tracking-wide uppercase">{t.header.rocketTitle}</p>
                <p className="text-sm md:text-base font-extrabold text-[#0B2A5B]">
                  {t.header.rocketSubtitle}
                </p>
              </div>
            </div>
            <div className="w-7 h-7 rounded-full bg-white/80 flex items-center justify-center text-gray-500 group-hover:translate-x-1 group-hover:text-blue-600 transition-all shadow-2xs">
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>

          {/* Right half: Special Gift */}
          <div 
            onClick={() => navigate('/tracking')}
            className="flex items-center justify-between px-5 md:px-8 cursor-pointer hover:opacity-95 transition-opacity group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 md:w-11 md:h-11 rounded-full bg-white/90 shadow-xs flex items-center justify-center text-emerald-600 group-hover:scale-105 transition-transform">
                <Truck className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <p className="text-xs text-emerald-900/80 font-semibold tracking-wide uppercase">
                  {language === 'en' ? 'Live Order Tracking' : 'Theo dõi vận đơn thời gian thực'}
                </p>
                <p className="text-sm md:text-base font-extrabold text-[#0B2A5B]">
                  {language === 'en' ? 'Locate your courier live on map' : 'Xem vị trí Shipper trực tiếp trên bản đồ số'}
                </p>
              </div>
            </div>
            <div className="w-7 h-7 rounded-full bg-white/80 flex items-center justify-center text-gray-500 group-hover:translate-x-1 group-hover:text-emerald-600 transition-all shadow-2xs">
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>

      {/* b) Utility Topbar */}
      <div className="bg-[#F5F6F8] border-b border-gray-200 text-[12px] text-gray-600 py-1.5 px-4">
        <div className="max-w-[1240px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Wishlist Link */}
            <button 
              onClick={() => navigate('/wishlist')}
              className="flex items-center gap-1 hover:text-rose-600 font-semibold transition-colors cursor-pointer"
            >
              <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
              <span>{t.common.wishlist}</span>
              {totalWishlistCount > 0 && (
                <span className="bg-rose-500 text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                  {totalWishlistCount}
                </span>
              )}
            </button>
            <span className="text-gray-300">|</span>
            {/* Tracking Link */}
            <button 
              onClick={() => navigate('/tracking')}
              className="flex items-center gap-1 hover:text-blue-600 font-semibold transition-colors cursor-pointer"
            >
              <Truck className="w-3.5 h-3.5 text-blue-600" />
              <span>{t.common.trackOrder}</span>
            </button>
            <span className="text-gray-300">|</span>
            {/* Seller Hub */}
            <button 
              onClick={() => navigate('/seller')}
              className="flex items-center gap-1 hover:text-cyan-700 font-semibold transition-colors cursor-pointer"
            >
              <Store className="w-3.5 h-3.5 text-cyan-600" />
              <span>{t.common.sellerCenter}</span>
            </button>
          </div>

          <div className="flex items-center gap-3">
            {/* Language Switcher */}
            <div className="flex items-center gap-1 bg-white px-2 py-0.5 rounded border border-gray-200 text-[11px] font-medium">
              <span className="text-gray-400">{t.common.language}:</span>
              <button 
                onClick={() => setLanguage('vi')}
                className={`px-1.5 py-0.5 rounded transition-colors cursor-pointer ${language === 'vi' ? 'bg-[#3B6EF5] text-white font-bold' : 'text-gray-600 hover:text-black'}`}
              >
                VIE
              </button>
              <span className="text-gray-300">/</span>
              <button 
                onClick={() => setLanguage('en')}
                className={`px-1.5 py-0.5 rounded transition-colors cursor-pointer ${language === 'en' ? 'bg-[#3B6EF5] text-white font-bold' : 'text-gray-600 hover:text-black'}`}
              >
                ENG
              </button>
              <span className="text-gray-300">/</span>
              <button 
                onClick={() => setLanguage('ko')}
                className={`px-1.5 py-0.5 rounded transition-colors cursor-pointer ${language === 'ko' ? 'bg-[#3B6EF5] text-white font-bold' : 'text-gray-600 hover:text-black'}`}
              >
                KOR
              </button>
            </div>

            <span className="text-gray-300 hidden sm:inline">|</span>
            <button 
              onClick={() => navigate('/seller')}
              className="hover:text-blue-600 transition-colors hidden sm:inline cursor-pointer"
            >
              {t.seller.registerTitle}
            </button>
          </div>
        </div>
      </div>

      {/* c) Main Header Section */}
      <div className="max-w-[1240px] mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          
          {/* 1. Category Button (Navy/Blue block with mega menu) */}
          <div className="relative">
            <button
              onClick={() => setIsMegaMenuOpen(!isMegaMenuOpen)}
              className="bg-[#3B6EF5] hover:bg-[#2e5fe6] text-white font-bold h-[54px] px-5 rounded-lg flex items-center gap-2.5 transition-colors shadow-sm shrink-0 cursor-pointer"
              aria-label={t.header.categoryBtn}
            >
              <Menu className="w-5 h-5" />
              <span className="text-sm tracking-wide">{t.header.categoryBtn}</span>
            </button>
            
            {/* Mega Menu Dropdown */}
            <MegaMenu isOpen={isMegaMenuOpen} onClose={() => setIsMegaMenuOpen(false)} />
          </div>

          {/* 2. Logo P4Shop with TMU Badge */}
          <div 
            onClick={() => navigate('/')}
            className="cursor-pointer flex items-center shrink-0 pr-2 group gap-2.5"
          >
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#0B2A5B] shadow-xs shrink-0 group-hover:scale-105 transition-transform bg-white p-0.5">
              <img 
                src="/assets/aistudio/image_fd917d90.png" 
                alt="Logo Đại học Thương Mại - P4Shop" 
                className="w-full h-full object-contain"
              />
            </div>
            
            <div className="flex flex-col">
              <div className="flex items-baseline leading-none">
                <span className="text-[32px] font-black text-[#FF4D1F] tracking-tight group-hover:scale-105 transition-transform inline-block">P4</span>
                <span className="text-[32px] font-extrabold text-[#0B2A5B] tracking-tight">Shop</span>
              </div>
              <span className="text-[10px] font-bold text-[#0B2A5B]/85 tracking-wide uppercase mt-0.5">
                Đại học Thương Mại
              </span>
            </div>

            <div className="hidden xl:flex flex-col ml-1 pl-2.5 border-l border-gray-200 text-[10px] text-gray-500 leading-tight">
              <span className="font-bold text-[#3B6EF5]">Dev: Lê Nguyễn Hà Anh</span>
              <span className="text-gray-400">TMU E-Commerce</span>
            </div>
          </div>

          {/* 3. Search Bar with 2px Blue Border + Category Selector */}
          <div className="flex-1 max-w-[620px] relative">
            <form 
              onSubmit={handleSearchSubmit}
              className="flex items-center border-2 border-[#3B6EF5] rounded-md h-[46px] bg-white overflow-hidden shadow-2xs focus-within:ring-2 focus-within:ring-blue-200 transition-all"
            >
              {/* Category selector */}
              <div className="relative h-full flex items-center border-r border-gray-200 bg-gray-50/70">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="h-full bg-transparent text-xs text-gray-700 pl-3 pr-7 font-medium appearance-none outline-none cursor-pointer"
                >
                  <option value="all">{t.header.categories.all}</option>
                  <option value="electronics">{t.header.categories.electronics}</option>
                  <option value="beauty">{t.header.categories.beauty}</option>
                  <option value="food">{t.header.categories.food}</option>
                  <option value="houseware">{t.header.categories.houseware}</option>
                  <option value="fashion_golf">{t.header.categories.fashion_golf}</option>
                  <option value="health">{t.header.categories.health}</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-gray-500 absolute right-2 pointer-events-none" />
              </div>

              {/* Input */}
              <div className="relative flex-1 h-full flex items-center">
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setShowSuggestions(true)}
                  placeholder={t.common.searchPlaceholder}
                  className="w-full h-full px-3 text-sm text-gray-800 placeholder-gray-400 outline-none"
                />
              </div>

              {/* Mic Icon */}
              <button 
                type="button" 
                onClick={() => alert(language === 'en' ? 'Voice search coming soon!' : 'Chức năng tìm kiếm bằng giọng nói đang chuẩn bị ra mắt!')}
                className="px-2.5 h-full text-gray-400 hover:text-blue-600 transition-colors flex items-center justify-center cursor-pointer"
                title="Voice Search"
              >
                <Mic className="w-4 h-4" />
              </button>

              {/* Blue Magnifying Glass Search Button */}
              <button
                type="submit"
                className="h-full px-5 bg-[#3B6EF5] hover:bg-[#2b5ee5] text-white flex items-center justify-center transition-colors cursor-pointer"
                aria-label={t.common.search}
              >
                <Search className="w-5 h-5 stroke-[2.5]" />
              </button>
            </form>

            {/* Autocomplete Suggestions Box */}
            {showSuggestions && (
              <>
                <div 
                  className="fixed inset-0 z-20"
                  onClick={() => setShowSuggestions(false)}
                />
                <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-xl border border-gray-200 z-30 py-2 divide-y divide-gray-100">
                  <div className="px-3 py-1.5 text-[11px] font-bold text-gray-400 uppercase tracking-wider flex items-center justify-between">
                    <span>{t.header.popularSearches}</span>
                    <span className="text-[#3B6EF5]">{t.header.todayTrending}</span>
                  </div>
                  <div className="py-1">
                    {suggestions.map((item, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleSelectSuggestion(item)}
                        className="w-full text-left px-3 py-2 text-xs text-gray-700 hover:bg-blue-50 hover:text-blue-700 flex items-center justify-between group transition-colors cursor-pointer"
                      >
                        <span className="flex items-center gap-2">
                          <span className={`w-4 text-center font-bold text-xs ${idx < 3 ? 'text-orange-500' : 'text-gray-400'}`}>
                            {idx + 1}
                          </span>
                          <span>{item}</span>
                        </span>
                        <ChevronRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-blue-500" />
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* 4. Right side: Wishlist, Account & Cart */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            {/* Wishlist Button */}
            <button 
              onClick={() => navigate('/wishlist')}
              className="flex flex-col items-center text-gray-700 hover:text-rose-600 transition-colors p-1 relative cursor-pointer group"
              title={t.common.wishlist}
            >
              <div className="relative">
                <Heart className={`w-6 h-6 stroke-[1.7] group-hover:scale-105 transition-transform ${totalWishlistCount > 0 ? 'fill-rose-50 text-rose-500' : ''}`} />
                {totalWishlistCount > 0 && (
                  <span className="absolute -top-1.5 -right-2.5 bg-rose-500 text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-xs">
                    {totalWishlistCount}
                  </span>
                )}
              </div>
              <span className="text-[11px] font-medium mt-0.5">{t.common.wishlist}</span>
            </button>

            {/* Account / Tracking */}
            <button 
              onClick={() => navigate('/tracking')}
              className="flex flex-col items-center text-gray-700 hover:text-[#3B6EF5] transition-colors p-1 cursor-pointer"
              title={t.common.trackOrder}
            >
              <Truck className="w-6 h-6 stroke-[1.7]" />
              <span className="text-[11px] font-medium mt-0.5">Vận đơn</span>
            </button>

            {/* Cart with Badge */}
            <button
              onClick={() => navigate('/cart')}
              className="flex flex-col items-center text-gray-700 hover:text-[#3B6EF5] transition-colors p-1 relative group cursor-pointer"
            >
              <div className="relative">
                <ShoppingCart className="w-6 h-6 stroke-[1.7] group-hover:scale-105 transition-transform" />
                {totalCartCount > 0 && (
                  <span className="absolute -top-1.5 -right-2.5 bg-[#3B6EF5] text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-xs">
                    {totalCartCount}
                  </span>
                )}
              </div>
              <span className="text-[11px] font-medium mt-0.5">{t.common.cart}</span>
            </button>
          </div>

        </div>
      </div>

      {/* d) Horizontal Quick Menu Bar */}
      <div className="border-t border-b border-gray-100 bg-white">
        <div className="max-w-[1240px] mx-auto px-2 relative flex items-center">
          {/* Scroll Left */}
          <button 
            onClick={() => scrollQuickMenu('left')}
            className="w-7 h-7 rounded-full bg-white shadow-xs border border-gray-200 flex items-center justify-center text-gray-500 hover:text-black shrink-0 z-10 mr-1 cursor-pointer"
            aria-label="Cuộn trái"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Nav Items */}
          <div 
            ref={menuScrollRef}
            className="flex items-center gap-6 overflow-x-auto scrollbar-none py-2 px-2 scroll-smooth text-xs font-semibold text-gray-700"
          >
            {quickNavItems.map(item => (
              <button
                key={item.id}
                onClick={() => navigate(item.path)}
                className="flex items-center gap-1.5 shrink-0 hover:text-[#3B6EF5] transition-colors group cursor-pointer"
              >
                <span className="group-hover:scale-110 transition-transform">{item.icon}</span>
                <span>{item.name}</span>
                {item.badge && (
                  <span className={`text-[10px] font-black px-1.5 py-0.2 rounded ${
                    item.badge === 'GPS' ? 'bg-emerald-600 text-white' : item.badge === 'HOT' ? 'bg-[#FF4D1F] text-white' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Scroll Right */}
          <button 
            onClick={() => scrollQuickMenu('right')}
            className="w-7 h-7 rounded-full bg-white shadow-xs border border-gray-200 flex items-center justify-center text-gray-500 hover:text-black shrink-0 z-10 ml-1 cursor-pointer"
            aria-label="Cuộn phải"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Compact Sticky Header when scrolling down */}
      {isSticky && (
        <div className="fixed top-0 left-0 right-0 bg-white shadow-md border-b border-gray-200 z-50 animate-in fade-in slide-in-from-top-1 duration-150 py-2.5 px-4">
          <div className="max-w-[1240px] mx-auto flex items-center justify-between gap-4">
            <div 
              onClick={() => navigate('/')}
              className="cursor-pointer flex items-center gap-2 shrink-0"
            >
              <img 
                src="/assets/aistudio/image_fd917d90.png" 
                alt="P4Shop TMU Logo" 
                className="w-7 h-7 rounded-full border border-blue-900 object-contain shrink-0"
              />
              <div className="flex items-baseline">
                <span className="text-2xl font-black text-[#FF4D1F]">P4</span>
                <span className="text-2xl font-extrabold text-[#0B2A5B]">Shop</span>
              </div>
            </div>

            {/* Quick Sticky Search */}
            <div className="flex-1 max-w-[500px]">
              <form onSubmit={handleSearchSubmit} className="flex items-center border border-[#3B6EF5] rounded-full px-3 py-1.5 bg-gray-50">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t.common.searchPlaceholder}
                  className="w-full text-xs bg-transparent outline-none text-gray-800"
                />
                <button type="submit" className="text-[#3B6EF5] ml-1">
                  <Search className="w-4 h-4" />
                </button>
              </form>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-3">
              <button 
                onClick={() => navigate('/tracking')}
                className="text-xs font-bold text-gray-700 hover:text-blue-600 flex items-center gap-1 cursor-pointer"
              >
                <Truck className="w-4 h-4 text-blue-600" />
                <span className="hidden sm:inline">{t.common.trackOrder}</span>
              </button>
              <button 
                onClick={() => navigate('/wishlist')}
                className="text-xs font-bold text-gray-700 hover:text-rose-600 flex items-center gap-1 cursor-pointer"
              >
                <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
                <span className="hidden sm:inline">({totalWishlistCount})</span>
              </button>
              <button 
                onClick={() => navigate('/cart')}
                className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>({totalCartCount})</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
