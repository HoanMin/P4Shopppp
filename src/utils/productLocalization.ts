import { Product } from '../types';
import { SupportedLanguage } from '../i18n/translations';

export interface LocalizedProductInfo {
  name: string;
  description: string;
  subcategory: string;
  deliveryDateText: string;
  cashbackText?: string;
  conditionText: string;
  categoryLabel: string;
}

const CATEGORY_LABELS: Record<string, Record<SupportedLanguage, string>> = {
  electronics: {
    vi: 'Điện tử & Công nghệ',
    en: 'Electronics & Tech',
    ko: '가전 & 디지털',
  },
  beauty: {
    vi: 'Mỹ phẩm & Chăm sóc da',
    en: 'Cosmetics & Skincare',
    ko: '뷰티 & 스킨케어',
  },
  food: {
    vi: 'Cà phê & Thực phẩm',
    en: 'Coffee & Gourmet Food',
    ko: '식품 & 커피',
  },
  houseware: {
    vi: 'Đồ gia dụng & Đời sống',
    en: 'Home & Living',
    ko: '생활 & 주방용품',
  },
  fashion_golf: {
    vi: 'Thời trang & Golf',
    en: 'Golf & Fashion',
    ko: '골프 & 패션',
  },
  health: {
    vi: 'Sức khỏe & Thực phẩm bổ sung',
    en: 'Health & Supplements',
    ko: '건강 & 영양제',
  },
  all: {
    vi: 'Tất cả danh mục',
    en: 'All Categories',
    ko: '전체 카테고리',
  },
};

const CONDITION_TEXT_MAP: Record<string, Record<SupportedLanguage, string>> = {
  'Mới': { vi: 'Mới 100%', en: 'Brand New 100%', ko: '새상품 100%' },
  'Hộp móp (3)': { vi: 'Hộp móp nhẹ (3)', en: 'Dented Box (3)', ko: '박스 훼손 (3)' },
  'Đã bóc hộp': { vi: 'Đã bóc hộp kiểm tra', en: 'Open Box Inspected', ko: '개봉 반품 검수' },
  'Đổi trả (3)': { vi: 'Hàng đổi trả loại A (3)', en: 'Refurbished Grade A (3)', ko: '반품 최상급 (3)' },
  'Tân trang': { vi: 'Tân trang chính hãng', en: 'Certified Refurbished', ko: '공식 리퍼비시' },
};

export function getLocalizedProduct(product: Product, lang: SupportedLanguage): LocalizedProductInfo {
  let name = product.name;
  let description = product.description;
  let subcategory = product.subcategory;
  let deliveryDateText = product.deliveryDateText;
  let cashbackText = product.cashbackText;
  let conditionText = product.conditionText;

  if (lang === 'en') {
    if (product.nameEn) name = product.nameEn;
    if (product.descriptionEn) description = product.descriptionEn;
    if (product.subcategoryEn) subcategory = product.subcategoryEn;
    if (product.deliveryDateTextEn) {
      deliveryDateText = product.deliveryDateTextEn;
    } else {
      deliveryDateText = 'Next-Day Rocket Delivery';
    }
    if (product.cashbackTextEn) {
      cashbackText = product.cashbackTextEn;
    } else if (cashbackText) {
      cashbackText = 'P4Shop Cashback Rewards';
    }
    if (product.conditionTextEn) {
      conditionText = product.conditionTextEn;
    } else if (CONDITION_TEXT_MAP[product.conditionText]?.en) {
      conditionText = CONDITION_TEXT_MAP[product.conditionText].en;
    } else {
      conditionText = 'New / Certified';
    }
  } else if (lang === 'ko') {
    if (product.nameKr) name = product.nameKr;
    else if (product.nameEn) name = product.nameEn;
    
    deliveryDateText = '내일(목) 로켓배송 도착 보장';
    if (cashbackText) cashbackText = '쿠팡 와우 적립 혜택';
    if (CONDITION_TEXT_MAP[product.conditionText]?.ko) {
      conditionText = CONDITION_TEXT_MAP[product.conditionText].ko;
    }
  }

  const categoryLabel = CATEGORY_LABELS[product.category]?.[lang] || product.category;

  return {
    name,
    description,
    subcategory,
    deliveryDateText,
    cashbackText,
    conditionText,
    categoryLabel,
  };
}
