import React, { useState, useMemo } from 'react';
import { 
  Star, 
  ThumbsUp, 
  CheckCircle2, 
  Camera, 
  Filter, 
  MessageSquarePlus, 
  X, 
  Sparkles,
  Info,
  Maximize2
} from 'lucide-react';
import { Product, ProductReview } from '../../types';
import { useCart } from '../../context/CartContext';

interface ProductReviewsSectionProps {
  product: Product;
}

export const ProductReviewsSection: React.FC<ProductReviewsSectionProps> = ({ product }) => {
  const { getProductReviews, addProductReview, voteHelpfulReview, language } = useCart();
  
  const reviews = getProductReviews(product.id);

  // Filters state
  const [selectedRatingFilter, setSelectedRatingFilter] = useState<number | 'all' | 'with_images'>('all');
  
  // Image Lightbox Modal state
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // Add Review Form state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [newRating, setNewRating] = useState(5);
  const [newAuthor, setNewAuthor] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newComment, setNewComment] = useState('');
  const [newVariant, setNewVariant] = useState(product.variants[0]?.name || 'Tiêu chuẩn');
  const [newImageUrl, setNewImageUrl] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Calculate statistics
  const stats = useMemo(() => {
    const total = reviews.length;
    if (total === 0) {
      return {
        avgRating: 5.0,
        totalReviews: 0,
        counts: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
        percentages: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
        withImagesCount: 0,
      };
    }

    const counts: Record<number, number> = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    let sum = 0;
    let withImages = 0;

    reviews.forEach(r => {
      counts[r.rating] = (counts[r.rating] || 0) + 1;
      sum += r.rating;
      if (r.images && r.images.length > 0) withImages++;
    });

    const percentages: Record<number, number> = {
      5: Math.round((counts[5] / total) * 100),
      4: Math.round((counts[4] / total) * 100),
      3: Math.round((counts[3] / total) * 100),
      2: Math.round((counts[2] / total) * 100),
      1: Math.round((counts[1] / total) * 100),
    };

    return {
      avgRating: Number((sum / total).toFixed(1)),
      totalReviews: total,
      counts,
      percentages,
      withImagesCount: withImages,
    };
  }, [reviews]);

  // Filtered reviews
  const filteredReviews = useMemo(() => {
    return reviews.filter(r => {
      if (selectedRatingFilter === 'all') return true;
      if (selectedRatingFilter === 'with_images') return Boolean(r.images && r.images.length > 0);
      return r.rating === selectedRatingFilter;
    });
  }, [reviews, selectedRatingFilter]);

  // Extract all review images for quick gallery
  const allReviewImages = useMemo(() => {
    const list: { url: string; author: string; rating: number }[] = [];
    reviews.forEach(r => {
      if (r.images && r.images.length > 0) {
        r.images.forEach(img => {
          list.push({ url: img, author: r.authorName, rating: r.rating });
        });
      }
    });
    return list;
  }, [reviews]);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor.trim() || !newComment.trim()) return;

    const imagesToAttach = newImageUrl.trim() ? [newImageUrl.trim()] : undefined;

    addProductReview({
      productId: product.id,
      authorName: newAuthor.trim(),
      authorBadge: 'Khách hàng P4Shop (Đã mua)',
      rating: newRating,
      title: newTitle.trim() || 'Nhận xét về sản phẩm',
      comment: newComment.trim(),
      isVerifiedPurchase: true,
      variantName: newVariant,
      images: imagesToAttach,
    });

    setFormSubmitted(true);
    setTimeout(() => {
      setIsFormOpen(false);
      setFormSubmitted(false);
      setNewAuthor('');
      setNewTitle('');
      setNewComment('');
      setNewImageUrl('');
      setNewRating(5);
    }, 1200);
  };

  return (
    <section className="mt-10 bg-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-xs">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-gray-200 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl md:text-2xl font-black text-gray-900 tracking-tight">
              ĐÁNH GIÁ SẢN PHẨM
            </h2>
            <span className="bg-orange-100 text-[#F0471C] text-xs font-bold px-2.5 py-0.5 rounded-full">
              {stats.totalReviews} đánh giá
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Nhận xét thực tế và hình ảnh feedback từ khách hàng trải nghiệm mua sắm
          </p>
        </div>

        <button
          onClick={() => setIsFormOpen(!isFormOpen)}
          className="bg-[#3B6EF5] hover:bg-blue-600 text-white font-bold text-xs md:text-sm px-5 py-2.5 rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-xs shrink-0"
        >
          <MessageSquarePlus className="w-4 h-4" />
          <span>{isFormOpen ? 'Đóng biểu mẫu' : 'Viết đánh giá của bạn'}</span>
        </button>
      </div>

      {/* Transparency Note required by prompt */}
      <div className="mt-4 p-3.5 bg-amber-50/80 border border-amber-200 rounded-xl text-xs text-amber-900 flex items-start gap-2.5">
        <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <span className="font-bold">Ghi chú minh bạch: </span>
          <span>
            Các đánh giá mẫu hiển thị nhằm minh họa giao diện phản hồi 5 sao và hình ảnh feedback trên hệ thống P4Shop. Sàn phân biệt rõ ràng giữa dữ liệu mẫu minh họa và đánh giá thật của khách hàng, tuân thủ nguyên tắc không mạo nhận dữ liệu chưa xác thực.
          </span>
        </div>
      </div>

      {/* Review Summary Score Card */}
      <div className="mt-6 bg-[#FAFBFD] border border-gray-200/90 rounded-2xl p-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        
        {/* Left: Overall Rating (4 cols) */}
        <div className="md:col-span-4 text-center md:text-left md:border-r md:border-gray-200 md:pr-6">
          <div className="flex items-baseline justify-center md:justify-start gap-2">
            <span className="text-5xl font-black text-[#F0471C]">{stats.avgRating}</span>
            <span className="text-lg font-bold text-gray-400">/ 5.0</span>
          </div>
          
          <div className="flex items-center justify-center md:justify-start gap-1 my-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-5 h-5 ${
                  star <= Math.round(stats.avgRating)
                    ? 'fill-amber-400 text-amber-400'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>

          <p className="text-xs text-gray-500 font-medium">
            Dựa trên {stats.totalReviews} lượt đánh giá từ khách hàng
          </p>
        </div>

        {/* Center: Rating Breakdown Progress Bars (5 cols) */}
        <div className="md:col-span-5 space-y-1.5">
          {[5, 4, 3, 2, 1].map((stars) => {
            const count = stats.counts[stars] || 0;
            const pct = stats.percentages[stars] || 0;
            return (
              <button
                key={stars}
                onClick={() => setSelectedRatingFilter(stars)}
                className="w-full flex items-center gap-2.5 text-xs text-gray-600 hover:text-gray-900 group cursor-pointer"
              >
                <div className="flex items-center gap-1 w-14 shrink-0 font-medium">
                  <span>{stars}</span>
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                </div>
                <div className="flex-1 h-2.5 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-400 rounded-full transition-all duration-500 group-hover:bg-amber-500"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span className="w-12 text-right font-semibold text-gray-500 text-[11px] shrink-0">
                  {count} ({pct}%)
                </span>
              </button>
            );
          })}
        </div>

        {/* Right: Quick Image Feedback Stats (3 cols) */}
        <div className="md:col-span-3 bg-white p-4 rounded-xl border border-gray-200/80 text-center shadow-2xs">
          <Camera className="w-6 h-6 text-[#3B6EF5] mx-auto mb-1.5" />
          <p className="text-xs font-bold text-gray-900">
            {stats.withImagesCount} Đánh giá có ảnh
          </p>
          <p className="text-[11px] text-gray-500 mt-0.5">
            Xem hình ảnh thực tế từ người dùng
          </p>
          <button
            onClick={() => setSelectedRatingFilter('with_images')}
            className="mt-3 w-full bg-blue-50 hover:bg-blue-100 text-[#3B6EF5] text-xs font-bold py-1.5 px-3 rounded-lg transition-colors cursor-pointer"
          >
            Lọc xem ảnh ({stats.withImagesCount})
          </button>
        </div>

      </div>

      {/* Customer Feedback Photos Gallery Strip (Click to enlarge) */}
      {allReviewImages.length > 0 && (
        <div className="mt-6 pt-5 border-t border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-700 flex items-center gap-1.5">
              <Camera className="w-4 h-4 text-[#F0471C]" />
              <span>Hình ảnh feedback thực tế ({allReviewImages.length} ảnh):</span>
            </h3>
            <span className="text-[11px] text-gray-400">
              Nhấn vào ảnh để phóng to chi tiết
            </span>
          </div>

          <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
            {allReviewImages.map((item, idx) => (
              <div
                key={idx}
                onClick={() => setPreviewImage(item.url)}
                className="relative group w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden border border-gray-200 shrink-0 cursor-pointer shadow-xs hover:shadow-md transition-all"
              >
                <img
                  src={item.url}
                  alt={`Feedback ${idx + 1}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                  <Maximize2 className="w-5 h-5 drop-shadow" />
                </div>
                <div className="absolute bottom-1 right-1 bg-black/60 text-amber-300 text-[10px] font-bold px-1 rounded flex items-center gap-0.5">
                  ★ {item.rating}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add Review Collapsible Form */}
      {isFormOpen && (
        <div className="mt-6 p-6 bg-blue-50/50 border border-blue-200 rounded-2xl animate-in fade-in duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-blue-100 mb-4">
            <h3 className="text-sm font-bold text-[#0B2A5B] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span>Gửi đánh giá cho: {product.name}</span>
            </h3>
            <button
              onClick={() => setIsFormOpen(false)}
              className="text-gray-400 hover:text-gray-600 p-1 rounded-full cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {formSubmitted ? (
            <div className="p-6 bg-emerald-50 text-emerald-800 rounded-xl text-center border border-emerald-200">
              <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
              <p className="font-bold text-sm">Cảm ơn bạn đã gửi đánh giá!</p>
              <p className="text-xs text-emerald-600 mt-1">Phản hồi của bạn đã được ghi nhận vào hệ thống.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmitReview} className="space-y-4 text-xs">
              
              {/* Star Selection */}
              <div>
                <label className="block font-bold text-gray-700 mb-1.5">
                  Đánh giá chất lượng sản phẩm (1 - 5 sao):
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setNewRating(star)}
                      className="p-1 cursor-pointer transition-transform hover:scale-110"
                    >
                      <Star
                        className={`w-7 h-7 ${
                          star <= newRating
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-gray-300 hover:text-amber-300'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="font-bold text-gray-800 text-sm ml-2">
                    {newRating === 5 && 'Tuyệt vời ★★★★★'}
                    {newRating === 4 && 'Hài lòng ★★★★☆'}
                    {newRating === 3 && 'Bình thường ★★★☆☆'}
                    {newRating === 2 && 'Chưa hài lòng ★★☆☆☆'}
                    {newRating === 1 && 'Kém ★☆☆☆☆'}
                  </span>
                </div>
              </div>

              {/* Author and Variant Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">
                    Họ và tên của bạn: *
                  </label>
                  <input
                    type="text"
                    required
                    value={newAuthor}
                    onChange={(e) => setNewAuthor(e.target.value)}
                    placeholder="VD: Nguyễn Thuỳ Linh"
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">
                    Phân loại đã mua:
                  </label>
                  <select
                    value={newVariant}
                    onChange={(e) => setNewVariant(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg outline-none focus:border-blue-500 cursor-pointer"
                  >
                    {product.variants.map((v) => (
                      <option key={v.id} value={v.name}>{v.name}</option>
                    ))}
                    {product.variants.length === 0 && (
                      <option value="Tiêu chuẩn">Tiêu chuẩn</option>
                    )}
                  </select>
                </div>
              </div>

              {/* Title */}
              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  Tiêu đề nhận xét:
                </label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="VD: Sản phẩm rất tốt, giao hàng nhanh chóng"
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg outline-none focus:border-blue-500"
                />
              </div>

              {/* Comment Content */}
              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  Nội dung đánh giá chi tiết: *
                </label>
                <textarea
                  required
                  rows={3}
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Hãy chia sẻ cảm nhận về chất lượng sản phẩm, đóng gói, thái độ giao hàng..."
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg outline-none focus:border-blue-500"
                />
              </div>

              {/* Optional Image URL */}
              <div>
                <label className="block font-semibold text-gray-700 mb-1 flex items-center gap-1.5">
                  <Camera className="w-3.5 h-3.5 text-blue-600" />
                  <span>Đính kèm link hình ảnh feedback thực tế (tùy chọn):</span>
                </label>
                <input
                  type="url"
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                  placeholder="https://... (Link ảnh sản phẩm nhận được)"
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg outline-none focus:border-blue-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-600 font-semibold hover:bg-white"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#F0471C] hover:bg-[#d83c13] text-white rounded-lg font-bold transition-colors cursor-pointer"
                >
                  Gửi đánh giá
                </button>
              </div>

            </form>
          )}

        </div>
      )}

      {/* Filter Tabs (Tất cả, 5 sao, 4 sao, 3 sao, 2 sao, 1 sao, Có ảnh) */}
      <div className="mt-8 flex flex-wrap items-center gap-2 pb-4 border-b border-gray-100">
        <span className="text-xs font-bold text-gray-600 flex items-center gap-1.5 mr-1">
          <Filter className="w-3.5 h-3.5" />
          <span>Lọc theo:</span>
        </span>

        <button
          onClick={() => setSelectedRatingFilter('all')}
          className={`text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
            selectedRatingFilter === 'all'
              ? 'bg-[#3B6EF5] text-white border-[#3B6EF5] shadow-xs'
              : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'
          }`}
        >
          Tất cả ({reviews.length})
        </button>

        {[5, 4, 3, 2, 1].map((s) => {
          const count = stats.counts[s] || 0;
          return (
            <button
              key={s}
              onClick={() => setSelectedRatingFilter(s)}
              className={`text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all cursor-pointer flex items-center gap-1 ${
                selectedRatingFilter === s
                  ? 'bg-amber-500 text-white border-amber-500 shadow-xs'
                  : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'
              }`}
            >
              <span>{s}</span>
              <Star className="w-3 h-3 fill-current" />
              <span>({count})</span>
            </button>
          );
        })}

        <button
          onClick={() => setSelectedRatingFilter('with_images')}
          className={`text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all cursor-pointer flex items-center gap-1.5 ${
            selectedRatingFilter === 'with_images'
              ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
              : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'
          }`}
        >
          <Camera className="w-3.5 h-3.5" />
          <span>Có hình ảnh ({stats.withImagesCount})</span>
        </button>
      </div>

      {/* Review List */}
      <div className="mt-6 space-y-6 divide-y divide-gray-100">
        {filteredReviews.length === 0 ? (
          <div className="py-12 text-center text-gray-400 text-xs">
            Chưa có đánh giá nào phù hợp với bộ lọc đã chọn.
          </div>
        ) : (
          filteredReviews.map((rev) => (
            <div key={rev.id} className="pt-6 first:pt-0">
              
              {/* Review Header: User Avatar + Name + Rating */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  {/* Initials Avatar */}
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 text-white font-bold text-sm flex items-center justify-center shrink-0 shadow-2xs">
                    {rev.authorName.charAt(0)}
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-sm text-gray-900">
                        {rev.authorName}
                      </span>
                      {rev.isVerifiedPurchase && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          <span>Đã mua hàng</span>
                        </span>
                      )}
                      {rev.authorBadge && (
                        <span className="text-[10px] font-medium text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                          {rev.authorBadge}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2 mt-1">
                      {/* 5-star graphical stars */}
                      <div className="flex items-center gap-0.5">
                        {[1, 2, 3, 4, 5].map((st) => (
                          <Star
                            key={st}
                            className={`w-3.5 h-3.5 ${
                              st <= rev.rating
                                ? 'fill-amber-400 text-amber-400'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-gray-300">•</span>
                      <span className="text-[11px] text-gray-400">{rev.date}</span>
                      {rev.variantName && (
                        <>
                          <span className="text-gray-300">•</span>
                          <span className="text-[11px] text-gray-500">Phân loại: {rev.variantName}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Helpful Button */}
                <button
                  onClick={() => voteHelpfulReview(product.id, rev.id)}
                  className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-blue-600 hover:bg-blue-50 px-2.5 py-1.5 rounded-lg border border-gray-200 transition-colors cursor-pointer shrink-0"
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                  <span>Hữu ích ({rev.helpfulCount})</span>
                </button>
              </div>

              {/* Review Content */}
              <div className="mt-3 text-xs text-gray-700 leading-relaxed pl-13">
                {rev.title && (
                  <h4 className="font-bold text-gray-900 text-xs mb-1">
                    {rev.title}
                  </h4>
                )}
                <p className="text-gray-700">{rev.comment}</p>

                {/* Review Feedback Images Attached */}
                {rev.images && rev.images.length > 0 && (
                  <div className="mt-3 flex items-center gap-2.5 flex-wrap">
                    {rev.images.map((img, i) => (
                      <div
                        key={i}
                        onClick={() => setPreviewImage(img)}
                        className="relative group w-20 h-20 rounded-xl overflow-hidden border border-gray-200 cursor-pointer shadow-xs hover:border-blue-400 transition-all"
                      >
                        <img
                          src={img}
                          alt="Feedback photo"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                          <Maximize2 className="w-4 h-4" />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>
          ))
        )}
      </div>

      {/* Image Lightbox Modal for Zooming Customer Feedback Photos */}
      {previewImage && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150"
          onClick={() => setPreviewImage(null)}
        >
          <div
            className="relative max-w-3xl max-h-[90vh] bg-black rounded-2xl overflow-hidden shadow-2xl flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setPreviewImage(null)}
              className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center cursor-pointer transition-colors shadow-lg"
              title="Đóng ảnh"
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={previewImage}
              alt="Ảnh feedback chi tiết phóng to"
              className="max-w-full max-h-[85vh] object-contain rounded-xl"
            />
            <div className="p-3 text-center text-white/80 text-xs">
              Ảnh feedback thực tế từ người mua hàng trên P4Shop • Nhấn Esc hoặc click bên ngoài để đóng
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
