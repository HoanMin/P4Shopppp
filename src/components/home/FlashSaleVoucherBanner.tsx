import React, { useState } from 'react';
import { Tag, Ticket, Check, Sparkles, Truck, ArrowRight, Zap } from 'lucide-react';
import { useCart, DEFAULT_VOUCHERS } from '../../context/CartContext';
import { formatVND } from '../../utils/pricing';

export const FlashSaleVoucherBanner: React.FC = () => {
  const { 
    claimedVouchers, 
    claimVoucher, 
    claimAllVouchers,
    applyVoucher, 
    applyProductVoucher,
    applyShippingVoucher,
    activeProductVoucher,
    activeShippingVoucher,
    activeVoucher, 
    discountCode, 
    language, 
    t 
  } = useCart();

  const [inputCode, setInputCode] = useState('');

  const handleApplyInput = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCode.trim()) return;
    claimVoucher(inputCode.trim());
    applyVoucher(inputCode.trim());
    setInputCode('');
  };

  const allClaimed = DEFAULT_VOUCHERS.every(v => claimedVouchers.includes(v.code));

  return (
    <div className="bg-gradient-to-br from-amber-500 via-rose-500 to-red-600 rounded-2xl p-5 md:p-6 text-white shadow-lg mb-6 border border-white/20 relative overflow-hidden">
      {/* Decorative Blur Orbs */}
      <div className="absolute -right-8 -top-8 w-44 h-44 rounded-full bg-yellow-300/20 blur-xl pointer-events-none" />
      <div className="absolute left-1/3 -bottom-10 w-48 h-48 rounded-full bg-rose-400/25 blur-xl pointer-events-none" />

      {/* Header Info */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-white/20">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-8 h-8 rounded-full bg-white text-rose-600 flex items-center justify-center font-black shadow-xs">
              <Zap className="w-4 h-4 fill-rose-600" />
            </span>
            <span className="bg-yellow-300 text-gray-950 font-black text-xs px-2.5 py-0.5 rounded-full shadow-xs uppercase">
              {t.home.allProductsApplied}
            </span>
            <span className="bg-emerald-950/40 text-emerald-200 border border-emerald-400/30 text-[11px] font-bold px-2 py-0.5 rounded-full">
              Áp dụng song song 1 mã giảm giá + 1 mã Freeship
            </span>
          </div>
          <h3 className="text-xl md:text-2xl font-black tracking-tight text-white drop-shadow-xs">
            {t.home.voucherBannerTitle}
          </h3>
          <p className="text-xs text-rose-100 max-w-xl mt-0.5 font-medium">
            {t.home.voucherBannerSubtitle}
          </p>
        </div>

        {/* Input Coupon Box & Claim All Button */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          <button
            type="button"
            onClick={claimAllVouchers}
            className={`font-black text-xs px-4 py-2.5 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer ${
              allClaimed
                ? 'bg-emerald-500 text-white border border-emerald-300'
                : 'bg-white text-rose-600 hover:bg-yellow-100 hover:scale-[1.02]'
            }`}
          >
            {allClaimed ? (
              <>
                <Check className="w-4 h-4 stroke-[3]" />
                <span>Đã lưu tất cả 5 mã vào ví</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-amber-500 animate-spin-slow" />
                <span>Nhận tích lũy hết voucher (5 mã)</span>
              </>
            )}
          </button>

          <div className="bg-white/15 backdrop-blur-md p-1.5 rounded-xl border border-white/30 min-w-[260px]">
            <form onSubmit={handleApplyInput} className="flex items-center gap-1.5">
              <input
                type="text"
                value={inputCode}
                onChange={(e) => setInputCode(e.target.value)}
                placeholder="Nhập mã voucher..."
                className="bg-white text-gray-900 placeholder-gray-400 text-xs font-bold px-3 py-2 rounded-lg outline-none w-full shadow-inner"
              />
              <button
                type="submit"
                className="bg-yellow-400 hover:bg-yellow-300 text-gray-950 font-extrabold text-xs px-3.5 py-2 rounded-lg transition-colors cursor-pointer shrink-0 shadow-xs"
              >
                {t.home.applyCode}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Claimable Voucher Cards Grid */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 mt-4">
        {DEFAULT_VOUCHERS.map(v => {
          const isClaimed = claimedVouchers.includes(v.code);
          const isApplied = activeVoucher?.code === v.code || discountCode === v.code;

          return (
            <div
              key={v.code}
              className={`bg-white rounded-xl p-3 text-gray-800 shadow-md flex flex-col justify-between transition-all ${
                isApplied ? 'ring-2 ring-yellow-400 ring-offset-2 ring-offset-rose-600' : ''
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-1 mb-1.5">
                  <span className={`text-[10px] font-black px-1.5 py-0.2 rounded ${
                    v.discountType === 'free_shipping' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                  }`}>
                    {v.tag}
                  </span>
                  <span className="text-[10px] text-gray-400 font-medium">{v.expiresInText}</span>
                </div>

                <div className="flex items-baseline gap-1 my-1">
                  {v.discountType === 'free_shipping' ? (
                    <div className="flex items-center gap-1 text-emerald-700 font-black text-sm">
                      <Truck className="w-4 h-4" />
                      <span>FREESHIP 0Đ</span>
                    </div>
                  ) : (
                    <span className="text-base font-black text-[#F0471C]">
                      -{formatVND(v.discountAmount)}
                    </span>
                  )}
                </div>

                <h4 className="text-xs font-bold text-gray-900 line-clamp-1">
                  {language === 'en' ? v.titleEn : v.title}
                </h4>
                <p className="text-[11px] text-gray-500 mt-0.5 line-clamp-2 leading-tight">
                  {language === 'en' ? v.descriptionEn : v.description}
                </p>
              </div>

              {/* Action Button */}
              <div className="mt-3 pt-2 border-t border-gray-100 flex items-center justify-between gap-1">
                <span className="font-mono text-[10px] font-bold text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded">
                  {v.code}
                </span>

                <button
                  type="button"
                  onClick={() => {
                    claimVoucher(v.code);
                    applyVoucher(v.code);
                  }}
                  className={`text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 transition-all cursor-pointer ${
                    isApplied
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : isClaimed
                        ? 'bg-blue-600 hover:bg-blue-700 text-white'
                        : 'bg-[#F0471C] hover:bg-[#d83c13] text-white shadow-xs'
                  }`}
                >
                  {isApplied ? (
                    <>
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                      <span>Đang dùng</span>
                    </>
                  ) : isClaimed ? (
                    <span>Áp dụng</span>
                  ) : (
                    <span>{t.home.claimVoucher}</span>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="relative z-10 mt-3 pt-2 text-[11px] text-white/90 flex flex-wrap items-center justify-between gap-2">
        <span className="flex items-center gap-1.5 font-medium">
          <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
          Tất cả voucher trên áp dụng được cho <strong>mọi sản phẩm</strong> khi đặt hàng!
        </span>
        <span className="text-white/80">
          Chương trình đồng hành bởi Hội Sinh Viên ĐH Thương Mại
        </span>
      </div>
    </div>
  );
};
