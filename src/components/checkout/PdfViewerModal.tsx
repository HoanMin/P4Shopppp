import React, { useState, useEffect } from 'react';
import { 
  X, 
  Download, 
  ExternalLink, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw,
  ChevronLeft, 
  ChevronRight, 
  FileText,
  ShieldCheck,
  Building,
  CheckCircle2,
  Globe,
  ArrowLeft,
  Layers,
  FileImage,
  Maximize2
} from 'lucide-react';

interface PdfViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type TermsLanguage = 'vi' | 'en';
type DisplayMode = 'slide' | 'all-slides' | 'pdf-embed';

export const PdfViewerModal: React.FC<PdfViewerModalProps> = ({ isOpen, onClose }) => {
  const [selectedLanguage, setSelectedLanguage] = useState<TermsLanguage>('vi');
  const [currentSlide, setCurrentSlide] = useState(1);
  const [displayMode, setDisplayMode] = useState<DisplayMode>('slide');
  const [zoomLevel, setZoomLevel] = useState(100);

  // Keyboard navigation (Arrow keys, Esc)
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        setCurrentSlide(prev => Math.max(1, prev - 1));
      } else if (e.key === 'ArrowRight') {
        const maxPages = selectedLanguage === 'vi' ? 6 : 7;
        setCurrentSlide(prev => Math.min(maxPages, prev + 1));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selectedLanguage, onClose]);

  if (!isOpen) return null;

  const pdfConfig = {
    vi: {
      title: 'Điều khoản và Điều kiện Giao dịch Sàn P4Shop (Tiếng Việt)',
      shortTitle: 'Điều khoản tiếng Việt',
      fileName: 'P4Shop_Dieu_khoan_giao_dich_TIENG_VIET.pdf',
      pdfUrl: '/terms/P4Shop_Dieu_khoan_giao_dich_TIENG_VIET.pdf',
      fallbackPdfUrl: '/assets/aistudio/P4Shop_Dieu_khoan_giao_dich_TIENG_VIET_64b4e3d5.pdf',
      totalPages: 6,
      badge: 'v2.4 (Chính thức) • 6 slide',
      slidePrefix: '/terms/pages_vi/page_',
      slideName: 'P4Shop_Dieu_khoan_Slide_',
      pageDescriptions: [
        'Trang 1: Căn cứ pháp lý & Phạm vi áp dụng, Giải thích từ ngữ',
        'Trang 2: Đặt hàng, Thanh toán an toàn Escrow & Vận chuyển P4Shop Rocket',
        'Trang 3: Theo dõi đơn hàng & Chính sách Hoàn tiền / Đổi trả (Cốt lõi 1), Gia hạn tự động (Cốt lõi 2)',
        'Trang 4: Dữ liệu cá nhân & Tiếp thị (Cốt lõi 3), Giải quyết tranh chấp (Cốt lõi 4)',
        'Trang 5: Quyền và nghĩa vụ các bên & Hành vi bị cấm, Bất khả kháng',
        'Trang 6: Hiệu lực văn bản, Thông tin liên hệ & Dấu kiểm duyệt sàn TMU, Chữ ký đại diện'
      ]
    },
    en: {
      title: 'General Terms and Conditions of Transaction (English)',
      shortTitle: 'English Terms & Conditions',
      fileName: 'P4Shop_General_Terms_and_Conditions_ENGLISH.pdf',
      pdfUrl: '/terms/P4Shop_General_Terms_and_Conditions_ENGLISH.pdf',
      fallbackPdfUrl: '/assets/aistudio/P4Shop_General_Terms_and_Conditions_ENGLISH_56fd5170.pdf',
      totalPages: 7,
      badge: 'v2.4 (Official) • 7 slides',
      slidePrefix: '/terms/pages_en/page_',
      slideName: 'P4Shop_Terms_Slide_',
      pageDescriptions: [
        'Page 1: Legal Basis, Scope of Application & Definitions',
        'Page 2: Ordering and Secure Payment (Escrow), Express Delivery Rocket',
        'Page 3: Real-time Order Tracking, Refund and Return Policy (Core 1), Periodic Renewal (Core 2)',
        'Page 4: Personal Data and Marketing (Core 3), Dispute Resolution (Core 4)',
        'Page 5: Rights & Obligations of Parties, Prohibited Conduct, Force Majeure',
        'Page 6: Effectiveness, Amendment & Governing Law, Contact Information',
        'Page 7: Confirmation & Execution, Official Compliance Seal and Authorized Signatory'
      ]
    },
  };

  const currentConfig = pdfConfig[selectedLanguage];

  // Helper to format slide image URL (1 -> 01)
  const getSlideImageUrl = (pageNumber: number) => {
    const formatted = String(pageNumber).padStart(2, '0');
    return `${currentConfig.slidePrefix}${formatted}.png`;
  };

  // Download whole PDF
  const handleDownloadFullPdf = () => {
    const link = document.createElement('a');
    link.href = currentConfig.pdfUrl;
    link.download = currentConfig.fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Download current slide as PNG
  const handleDownloadCurrentSlide = () => {
    const slideUrl = getSlideImageUrl(currentSlide);
    const link = document.createElement('a');
    link.href = slideUrl;
    link.download = `${currentConfig.slideName}${String(currentSlide).padStart(2, '0')}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleOpenPdfNewTab = () => {
    window.open(currentConfig.pdfUrl, '_blank');
  };

  const handleSwitchLanguage = (lang: TermsLanguage) => {
    setSelectedLanguage(lang);
    setCurrentSlide(1);
    setZoomLevel(100);
  };

  const handleZoomIn = () => setZoomLevel(prev => Math.min(175, prev + 25));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(75, prev - 25));
  const handleResetZoom = () => setZoomLevel(100);

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="pdf-viewer-title"
    >
      <div className="bg-[#24272A] w-full max-w-6xl h-[94vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-700 font-sans">
        
        {/* TOP TAB BAR: KHU VỰC 1 (TIẾNG VIỆT) & KHU VỰC 2 (TIẾNG ANH) */}
        <div className="bg-[#1A1C1E] px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 border-b border-gray-700 select-none">
          
          {/* Back button to return to Checkout */}
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="text-gray-300 hover:text-white bg-gray-800 hover:bg-gray-700 px-3 py-1.5 rounded-lg flex items-center gap-1.5 text-xs font-semibold transition-colors cursor-pointer border border-gray-700"
              title="Quay lại Xác nhận & Thanh toán"
            >
              <ArrowLeft className="w-4 h-4 text-orange-400" />
              <span>Quay lại</span>
            </button>
            <div className="h-4 w-px bg-gray-700 hidden sm:block" />
            <span className="text-xs font-bold text-gray-300 hidden sm:inline">
              Chọn khu vực văn bản:
            </span>
          </div>

          {/* TWO SELECTION AREAS (KHU VỰC 1 & KHU VỰC 2) */}
          <div className="flex items-center bg-[#111214] p-1 rounded-xl border border-gray-700">
            {/* Area 1: Vietnamese */}
            <button
              type="button"
              onClick={() => handleSwitchLanguage('vi')}
              className={`px-3 sm:px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                selectedLanguage === 'vi'
                  ? 'bg-[#F0471C] text-white shadow-md'
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded-full font-mono font-bold">1</span>
              <span>Khu vực 1: Điều khoản tiếng Việt</span>
            </button>

            {/* Area 2: English */}
            <button
              type="button"
              onClick={() => handleSwitchLanguage('en')}
              className={`px-3 sm:px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                selectedLanguage === 'en'
                  ? 'bg-[#3B6EF5] text-white shadow-md'
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded-full font-mono font-bold">2</span>
              <span>Khu vực 2: Điều khoản tiếng Anh (English)</span>
            </button>
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-white hover:bg-red-600 rounded-lg transition-colors cursor-pointer"
            title="Đóng cửa sổ điều khoản"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* SECONDARY TOOLBAR: Title, View Switcher, Page Selector, Zoom, Download */}
        <div className="bg-[#2D3034] text-gray-200 px-4 py-2 flex flex-wrap items-center justify-between gap-3 border-b border-gray-700 text-xs">
          
          {/* File Name & Page Indicator */}
          <div className="flex items-center gap-2 min-w-0">
            <FileText className={`w-4 h-4 shrink-0 ${selectedLanguage === 'vi' ? 'text-orange-400' : 'text-blue-400'}`} />
            <span id="pdf-viewer-title" className="font-bold text-white truncate max-w-[260px] sm:max-w-md">
              {currentConfig.title}
            </span>
            <span className="bg-gray-800 text-gray-300 text-[10px] font-mono px-2 py-0.5 rounded-full shrink-0 hidden md:inline border border-gray-600">
              {currentConfig.badge}
            </span>
          </div>

          {/* Middle Controls: Slide navigation & Zoom */}
          <div className="flex items-center gap-2">
            
            {/* View Mode Toggle: Slide vs All Slides vs Embedded PDF */}
            <div className="flex items-center bg-[#1A1C1E] rounded-lg p-0.5 border border-gray-700">
              <button
                type="button"
                onClick={() => setDisplayMode('slide')}
                className={`px-2.5 py-1 rounded text-[11px] font-semibold transition-colors cursor-pointer flex items-center gap-1 ${
                  displayMode === 'slide' 
                    ? 'bg-[#F0471C] text-white' 
                    : 'text-gray-400 hover:text-gray-200'
                }`}
                title="Xem từng slide chuẩn độ phân giải cao"
              >
                <FileImage className="w-3.5 h-3.5" />
                <span>Xem từng Slide</span>
              </button>
              <button
                type="button"
                onClick={() => setDisplayMode('all-slides')}
                className={`px-2.5 py-1 rounded text-[11px] font-semibold transition-colors cursor-pointer flex items-center gap-1 ${
                  displayMode === 'all-slides' 
                    ? 'bg-gray-700 text-white' 
                    : 'text-gray-400 hover:text-gray-200'
                }`}
                title="Cuộn liên tục qua tất cả các trang slide"
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Toàn bộ {currentConfig.totalPages} Slide</span>
              </button>
            </div>

            {/* Slide Next/Prev controls (when in slide mode) */}
            {displayMode === 'slide' && (
              <div className="flex items-center bg-[#1A1C1E] rounded-lg px-2 py-0.5 border border-gray-700">
                <button
                  disabled={currentSlide === 1}
                  onClick={() => setCurrentSlide(p => Math.max(1, p - 1))}
                  className="p-1 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                  title="Slide trước (Phím mũi tên Trái)"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="px-2 font-mono text-xs font-bold text-white">
                  Slide {currentSlide} / {currentConfig.totalPages}
                </span>
                <button
                  disabled={currentSlide === currentConfig.totalPages}
                  onClick={() => setCurrentSlide(p => Math.min(currentConfig.totalPages, p + 1))}
                  className="p-1 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                  title="Slide tiếp theo (Phím mũi tên Phải)"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Zoom Controls */}
            <div className="hidden sm:flex items-center bg-[#1A1C1E] rounded-lg px-1.5 py-0.5 border border-gray-700">
              <button
                onClick={handleZoomOut}
                disabled={zoomLevel <= 75}
                className="p-1 text-gray-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                title="Thu nhỏ"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span className="px-1 text-[11px] font-mono text-gray-300 min-w-[36px] text-center">
                {zoomLevel}%
              </span>
              <button
                onClick={handleZoomIn}
                disabled={zoomLevel >= 175}
                className="p-1 text-gray-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                title="Phóng to"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
              {zoomLevel !== 100 && (
                <button
                  onClick={handleResetZoom}
                  className="p-1 text-orange-400 hover:text-orange-300 cursor-pointer ml-1"
                  title="Đặt lại 100%"
                >
                  <RotateCcw className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* DOWNLOAD SLIDE BUTTON: Downloads EXACT slide as image */}
            <button
              onClick={handleDownloadCurrentSlide}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 text-xs shadow-xs cursor-pointer border border-emerald-500"
              title={`Tải file ảnh của Slide ${currentSlide}`}
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Tải slide này (Trang {currentSlide})</span>
              <span className="sm:hidden">Tải slide {currentSlide}</span>
            </button>

            {/* DOWNLOAD FULL PDF BUTTON: Downloads the complete original PDF */}
            <button
              onClick={handleDownloadFullPdf}
              className={`px-3 py-1.5 text-white font-bold rounded-lg transition-all flex items-center gap-1.5 text-xs shadow-xs cursor-pointer ${
                selectedLanguage === 'vi' 
                  ? 'bg-[#F0471C] hover:bg-[#d83c13]' 
                  : 'bg-[#3B6EF5] hover:bg-blue-600'
              }`}
              title={`Tải trọn bộ PDF: ${currentConfig.fileName}`}
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Tải trọn bộ PDF ({currentConfig.totalPages} trang)</span>
              <span className="sm:hidden">Tải PDF</span>
            </button>

            {/* Open in new browser tab */}
            <button
              onClick={handleOpenPdfNewTab}
              className="p-1.5 text-gray-300 hover:text-white bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors cursor-pointer border border-gray-700 hidden sm:block"
              title="Mở PDF trực tiếp trong tab mới"
            >
              <ExternalLink className="w-4 h-4" />
            </button>

          </div>

        </div>

        {/* MAIN SLIDE VIEWPORT AREA */}
        <div className="flex-1 overflow-auto p-4 sm:p-6 bg-[#16181A] flex flex-col items-center justify-start select-none">
          
          {displayMode === 'slide' ? (
            /* SINGLE SLIDE VIEW */
            <div className="flex flex-col items-center w-full max-w-4xl">
              
              {/* Slide Context Label */}
              <div className="w-full flex items-center justify-between text-xs text-gray-400 mb-2 px-1">
                <span className="font-semibold text-gray-300">
                  {currentConfig.pageDescriptions[currentSlide - 1]}
                </span>
                <span className="text-[11px] bg-gray-800 text-gray-400 px-2 py-0.5 rounded font-mono">
                  Độ phân giải siêu nét 2x • Ảnh chuẩn tài liệu gốc
                </span>
              </div>

              {/* Exact High-Resolution Slide Image */}
              <div 
                className="bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-400 transition-transform duration-200 flex justify-center"
                style={{
                  transform: `scale(${zoomLevel / 100})`,
                  transformOrigin: 'top center',
                  maxWidth: '100%',
                }}
              >
                <img 
                  src={getSlideImageUrl(currentSlide)} 
                  alt={`${currentConfig.shortTitle} - Slide ${currentSlide}`}
                  className="w-full h-auto max-h-[72vh] object-contain shadow-inner pointer-events-auto"
                  loading="eager"
                />
              </div>

            </div>
          ) : (
            /* ALL SLIDES CONTINUOUS SCROLL VIEW */
            <div className="w-full max-w-3xl space-y-6 pb-8">
              {Array.from({ length: currentConfig.totalPages }, (_, i) => i + 1).map(pageNum => (
                <div key={pageNum} className="flex flex-col items-center">
                  <div className="w-full flex items-center justify-between text-xs text-gray-400 mb-1.5 px-2">
                    <span className="font-bold text-orange-400">
                      Slide {pageNum} / {currentConfig.totalPages}
                    </span>
                    <button
                      onClick={() => {
                        const link = document.createElement('a');
                        link.href = getSlideImageUrl(pageNum);
                        link.download = `${currentConfig.slideName}${String(pageNum).padStart(2, '0')}.png`;
                        link.click();
                      }}
                      className="text-[11px] text-gray-300 hover:text-white flex items-center gap-1 bg-gray-800 hover:bg-gray-700 px-2.5 py-1 rounded cursor-pointer"
                    >
                      <Download className="w-3 h-3 text-emerald-400" />
                      <span>Tải slide {pageNum}</span>
                    </button>
                  </div>
                  <div className="bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-400 w-full">
                    <img 
                      src={getSlideImageUrl(pageNum)} 
                      alt={`${currentConfig.shortTitle} - Slide ${pageNum}`}
                      className="w-full h-auto object-contain"
                      loading="lazy"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>

        {/* BOTTOM THUMBNAIL STRIP & FOOTER ACTION BAR */}
        <div className="bg-[#1A1C1E] text-gray-300 border-t border-gray-700 flex flex-col">
          
          {/* Thumbnails of all slides in active language */}
          <div className="px-4 py-2 border-b border-gray-800 flex items-center gap-2.5 overflow-x-auto select-none scrollbar-thin">
            <span className="text-[11px] font-bold text-gray-400 shrink-0 uppercase tracking-wider mr-1">
              Các Slide ({currentConfig.totalPages}):
            </span>

            {Array.from({ length: currentConfig.totalPages }, (_, i) => i + 1).map(pageNum => {
              const isActive = currentSlide === pageNum && displayMode === 'slide';
              return (
                <button
                  key={pageNum}
                  onClick={() => {
                    setCurrentSlide(pageNum);
                    setDisplayMode('slide');
                  }}
                  className={`group relative shrink-0 rounded-lg overflow-hidden border-2 transition-all p-0.5 cursor-pointer flex flex-col items-center ${
                    isActive 
                      ? 'border-[#F0471C] ring-2 ring-orange-500/30 scale-105' 
                      : 'border-gray-700 hover:border-gray-500 opacity-75 hover:opacity-100'
                  }`}
                  title={`Chuyển tới Slide ${pageNum}`}
                >
                  <div className="w-12 h-16 bg-white overflow-hidden rounded-xs flex items-center justify-center">
                    <img 
                      src={getSlideImageUrl(pageNum)} 
                      alt={`Thumbnail ${pageNum}`}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <span className={`text-[10px] font-mono font-bold mt-0.5 ${isActive ? 'text-orange-400' : 'text-gray-400'}`}>
                    {pageNum}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Bottom Action Bar: Status & Close */}
          <div className="px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-[11px] text-gray-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="truncate">
                Văn bản pháp lý chính thức số 89/2026/QĐ-P4SHOP-TMU • Ban hành bởi Trường Đại học Thương Mại
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleDownloadCurrentSlide}
                className="bg-emerald-600/90 hover:bg-emerald-600 text-white px-3.5 py-1.5 rounded-xl font-bold text-xs transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Tải ảnh Slide {currentSlide} ({selectedLanguage === 'vi' ? 'Tiếng Việt' : 'English'})</span>
              </button>

              <button
                onClick={handleDownloadFullPdf}
                className="bg-gray-800 hover:bg-gray-700 text-white px-3.5 py-1.5 rounded-xl font-bold text-xs transition-colors flex items-center gap-1.5 cursor-pointer border border-gray-600"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Tải toàn bộ PDF ({currentConfig.totalPages} trang)</span>
              </button>

              <button
                onClick={onClose}
                className="bg-[#F0471C] hover:bg-[#d83c13] text-white px-6 py-1.5 rounded-xl font-bold text-xs transition-colors cursor-pointer shadow-md"
              >
                Quay lại &amp; Tiếp tục
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
