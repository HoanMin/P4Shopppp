import { ProductReview } from '../types';

export const COMPREHENSIVE_PRODUCT_REVIEWS: Record<string, ProductReview[]> = {
  // 1. Tai nghe Bluetooth Air Pro TWS
  'earphone-bt-01': [
    {
      id: 'rev_ep_01',
      productId: 'earphone-bt-01',
      authorName: 'Nguyễn Thu Trang',
      authorBadge: 'Sinh viên K58 - ĐH Thương Mại',
      rating: 5,
      title: 'Tai nghe chống ồn siêu đỉnh, pin trâu đúng cam kết!',
      comment: 'Mình đặt ship hỏa tốc nhận hàng tại Ký túc xá ĐH Thương Mại rất nhanh. Hộp nguyên seal, tai nghe đeo êm ái, khử tiếng ồn xe cộ tốt khi học bài tại thư viện. Kết nối Bluetooth rất nhạy.',
      date: '08/04/2026',
      isVerifiedPurchase: true,
      helpfulCount: 28,
      variantName: 'Màu Đen Nhám',
      images: [
        'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?w=600&auto=format&fit=crop&q=80',
      ],
    },
    {
      id: 'rev_ep_02',
      productId: 'earphone-bt-01',
      authorName: 'Hoàng Minh Đức',
      authorBadge: 'Khách hàng thân thiết',
      rating: 4,
      title: 'Chất âm ấm, bass vừa tầm, hoàn thiện nhựa tốt',
      comment: 'Âm bass chắc, nghe nhạc pop ballad rất hay. Mic đàm thoại rõ, chỉ có điều hộp sạc hơi dễ bám dấu vân tay chút nhưng lau là sạch. Giao hàng từ kho Hải Dương về Hà Nội chỉ mất gần 1 ngày.',
      date: '02/04/2026',
      isVerifiedPurchase: true,
      helpfulCount: 16,
      variantName: 'Màu Trắng Ngọc',
      images: [
        'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=600&auto=format&fit=crop&q=80',
      ],
    },
    {
      id: 'rev_ep_03',
      productId: 'earphone-bt-01',
      authorName: 'Đặng Quốc Bảo',
      authorBadge: 'Người mua tại Hải Dương',
      rating: 3,
      title: 'Dùng ổn trong tầm giá sinh viên, độ trễ khi chơi game nhẹ',
      comment: 'Nghe nhạc xem Youtube bình thường rất ngon. Nhưng khi chơi game bắn súng FPS thì có độ trễ nhẹ khoảng 0.2s. Đeo lâu trên 3 tiếng tai hơi cấn nhẹ, cần đổi núm tai silicon nhỏ hơn đi kèm.',
      date: '25/03/2026',
      isVerifiedPurchase: true,
      helpfulCount: 11,
      variantName: 'Xanh Navy TMU',
      images: [
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80',
      ],
    },
  ],

  // 2. Sony WH-1000XM5
  'elec-sony-wh1000xm5': [
    {
      id: 'rev_sn_01',
      productId: 'elec-sony-wh1000xm5',
      authorName: 'Trần Văn Hùng',
      authorBadge: 'Giảng viên Viện CNTT',
      rating: 5,
      title: 'Đỉnh cao chống ồn chủ động, chính hãng 100%',
      comment: 'Nhận hàng có đầy đủ tem bảo hành chính hãng Sony Việt Nam và hóa đơn VAT. Chống ồn gần như tuyệt đối, đệm tai da tổng hợp cực kỳ êm dù đeo liên tục 6 tiếng soạn giáo án.',
      date: '15/03/2026',
      isVerifiedPurchase: true,
      helpfulCount: 42,
      variantName: 'Bạc Ánh Kim',
      images: [
        'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=600&auto=format&fit=crop&q=80',
      ],
    },
    {
      id: 'rev_sn_02',
      productId: 'elec-sony-wh1000xm5',
      authorName: 'Vũ Thùy Linh',
      authorBadge: 'Người mua đã xác thực',
      rating: 4,
      title: 'Chất âm tuyệt vời nhưng không gập gọn được như XM4',
      comment: 'Chống ồn và micro đàm thoại tốt hơn đời XM4 rõ rệt, kết nối đồng thời laptop và điện thoại mượt mà. Điểm trừ duy nhất là củ tai chỉ xoay phẳng chứ không gập khúc lại được, balo nhỏ để hơi chiếm chỗ.',
      date: '28/03/2026',
      isVerifiedPurchase: true,
      helpfulCount: 19,
      variantName: 'Đen Huyền Bí',
    },
  ],

  // 3. Marshall Emberton
  'elec-marshall-emberton': [
    {
      id: 'rev_mb_01',
      productId: 'elec-marshall-emberton',
      authorName: 'Phạm Hải Nam',
      authorBadge: 'Thành viên CLB Âm nhạc TMU',
      rating: 5,
      title: 'Loa nghe acoustic và rock quá phê, thiết kế vintage sang trọng',
      comment: 'Loa nhỏ gọn cầm vừa tay nhưng âm lượng rất to và dày. Âm trường True Stereophonic 360 độ lan tỏa đều phòng trọ 25m2. Pin trâu dùng cả tuần chưa hết.',
      date: '04/04/2026',
      isVerifiedPurchase: true,
      helpfulCount: 22,
      variantName: 'Black and Brass',
      images: [
        'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=600&auto=format&fit=crop&q=80',
      ],
    },
    {
      id: 'rev_mb_02',
      productId: 'elec-marshall-emberton',
      authorName: 'Đỗ Quỳnh Chi',
      authorBadge: 'Người mua đã xác thực',
      rating: 4,
      title: 'Đẹp mắt, chống nước tốt mang đi dã ngoại rất hợp',
      comment: 'Chống nước IPX7 nên mang đi du lịch bể bơi hay cắm trại ở Ecopark vô cùng yên tâm. Nút joystick đồng kim loại thao tác cực đã tay.',
      date: '19/03/2026',
      isVerifiedPurchase: true,
      helpfulCount: 8,
      variantName: 'Màu Cream Vintage',
    },
  ],

  // 4. Logitech MX Master 3S
  'elec-logitech-mxmaster3s': [
    {
      id: 'rev_mx_01',
      productId: 'elec-logitech-mxmaster3s',
      authorName: 'Nguyễn Tấn Đạt',
      authorBadge: 'Coder / Data Analyst',
      rating: 5,
      title: 'Con chuột công thái học tốt nhất từng dùng, cuộn MagSpeed vô cực',
      comment: 'Bấm click cực êm (Quiet Clicks) không gây tiếng ồn trong đêm. Con lăn kim loại cuộn 1000 dòng/giây duyệt bảng tính Excel hay code rất sướng.',
      date: '10/04/2026',
      isVerifiedPurchase: true,
      helpfulCount: 35,
      variantName: 'Màu Xám Than Graphite',
      images: [
        'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=600&auto=format&fit=crop&q=80',
      ],
    },
    {
      id: 'rev_mx_02',
      productId: 'elec-logitech-mxmaster3s',
      authorName: 'Lê Thanh Thảo',
      authorBadge: 'Người mua đã xác thực',
      rating: 4,
      title: 'Chuột to và đầm tay, hợp tay nam hoặc bạn nào bàn tay lớn',
      comment: 'Tính năng Flow chuyển file giữa 2 máy Mac và Windows rất tiện. Tay mình hơi nhỏ nên lúc đầu hơi với ngón cái, dùng 3 ngày thì quen.',
      date: '22/03/2026',
      isVerifiedPurchase: true,
      helpfulCount: 14,
      variantName: 'Màu Trắng Xám Pale Gray',
    },
  ],

  // 5. Củ sạc Anker GaN 65W
  'elec-anker-gan65w': [
    {
      id: 'rev_ak_01',
      productId: 'elec-anker-gan65w',
      authorName: 'Vũ Đức Thịnh',
      authorBadge: 'Người mua đã xác thực',
      rating: 5,
      title: 'Nhỏ bằng quả trứng mà sạc được cả MacBook Air và iPhone',
      comment: 'Công nghệ GaN III tản nhiệt tốt, sạc đầy MacBook chỉ hơn 1 tiếng rưỡi mà củ sạc chỉ ấm nhẹ chứ không nóng rát như sạc thường. Chân cắm gập gọn tiện bỏ túi.',
      date: '01/04/2026',
      isVerifiedPurchase: true,
      helpfulCount: 19,
      variantName: 'Đen Nhám Titan',
      images: [
        'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=600&auto=format&fit=crop&q=80',
      ],
    },
  ],

  // 6. Apple AirPods 3
  'elec-apple-airpods3': [
    {
      id: 'rev_ap_01',
      productId: 'elec-apple-airpods3',
      authorName: 'Nguyễn Kiều Oanh',
      authorBadge: 'Sinh viên K59 TMU',
      rating: 5,
      title: 'Hàng chính hãng Apple VNA, âm thanh vòm Spatial Audio mê ly',
      comment: 'Mở nắp là iPhone nhận diện ngay lập tức. Đeo dạng earbud thoáng tai không bị bí như tai in-ear, pin trâu hơn đời 2 nhiều.',
      date: '03/04/2026',
      isVerifiedPurchase: true,
      helpfulCount: 26,
      variantName: 'Trắng Apple',
      images: [
        'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=600&auto=format&fit=crop&q=80',
      ],
    },
  ],

  // 7. Sáp tẩy trang Banila Co
  'beauty-banila-cleanitzero': [
    {
      id: 'rev_bn_01',
      productId: 'beauty-banila-cleanitzero',
      authorName: 'Đặng Thanh Vân',
      authorBadge: 'Khách hàng thân thiết',
      rating: 5,
      title: 'Tẩy trang sạch sâu mascara chống nước, không cay mắt',
      comment: 'Chất sáp mềm như kem xốp, thoa lên da tan ngay thành dầu nhũ hóa cực sạch. Da sau khi rửa mềm mại không hề bị khô căng rát.',
      date: '05/04/2026',
      isVerifiedPurchase: true,
      helpfulCount: 31,
      variantName: 'Bản Jumbo 180ml Tiết Kiệm',
      images: [
        'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&auto=format&fit=crop&q=80',
      ],
    },
    {
      id: 'rev_bn_02',
      productId: 'beauty-banila-cleanitzero',
      authorName: 'Bùi Lan Hương',
      authorBadge: 'Người mua đã xác thực',
      rating: 4,
      title: 'Hũ to dùng được 4 tháng, mùi hương hoa thơm nhẹ',
      comment: 'Sáp nhũ hóa nhanh với nước ấm. Đóng gói giao hàng từ kho bọc xốp chống sốc 3 lớp cẩn thận không bị móp hộp.',
      date: '20/03/2026',
      isVerifiedPurchase: true,
      helpfulCount: 12,
      variantName: 'Bản Tiêu Chuẩn 100ml',
    },
  ],

  // 8. Kem chống nắng La Roche-Posay
  'beauty-laroche-anthelios': [
    {
      id: 'rev_lrp_01',
      productId: 'beauty-laroche-anthelios',
      authorName: 'Trần Mỹ Duyên',
      authorBadge: 'Người mua đã xác thực',
      rating: 5,
      title: 'Kem chống nắng chân ái cho da dầu mụn mùa hè',
      comment: 'Chất gel cream thấm cực nhanh, kiềm dầu từ sáng đến chiều không bị đổ chảo dầu trên mặt. Không để lại vệt trắng bệt trên da.',
      date: '07/04/2026',
      isVerifiedPurchase: true,
      helpfulCount: 29,
      variantName: 'Tuýp 50ml Gel-Cream Kiềm Dầu',
      images: [
        'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=600&auto=format&fit=crop&q=80',
      ],
    },
    {
      id: 'rev_lrp_02',
      productId: 'beauty-laroche-anthelios',
      authorName: 'Phạm Thùy Trang',
      authorBadge: 'Người mua đã xác thực',
      rating: 4,
      title: 'Kiềm dầu tốt nhưng cần tán nhanh tay',
      comment: 'Do đặc tính set nhanh nên phải thoa từng vùng và vỗ đều. Check mã vạch chuẩn La Roche-Posay Pháp, tem phụ tiếng Việt đầy đủ.',
      date: '14/03/2026',
      isVerifiedPurchase: true,
      helpfulCount: 15,
      variantName: 'Tuýp 50ml Gel-Cream Kiềm Dầu',
    },
  ],

  // 9. Serum The Ordinary Niacinamide
  'beauty-ordinary-niacinamide': [
    {
      id: 'rev_to_01',
      productId: 'beauty-ordinary-niacinamide',
      authorName: 'Ngô Thùy Trang',
      authorBadge: 'Người mua đã xác thực',
      rating: 5,
      title: 'Mờ thâm mụn rõ sau 3 tuần sử dụng',
      comment: 'Serum hơi đặc lúc đầu nhưng thấm nhanh. Mình dùng kèm kem dưỡng ẩm thì thấy sợi bã nhờn cánh mũi giảm hẳn, da sáng đều màu hơn.',
      date: '18/03/2026',
      isVerifiedPurchase: true,
      helpfulCount: 23,
      variantName: 'Lọ 60ml Tiết Kiệm',
      images: [
        'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&auto=format&fit=crop&q=80',
      ],
    },
  ],

  // 10. Sữa rửa mặt CeraVe
  'beauty-cerave-foaming': [
    {
      id: 'rev_crv_01',
      productId: 'beauty-cerave-foaming',
      authorName: 'Lê Hoàng Yến',
      authorBadge: 'Người mua đã xác thực',
      rating: 5,
      title: 'Dung tích khủng 473ml dùng cả nửa năm, dịu nhẹ chuẩn da liễu',
      comment: 'Độ pH 5.5 chuẩn da khỏe, rửa xong da vẫn mướt mát không bị khô kin kít. Chai có vòi khóa xoay rất tiện khi mang đi công tác.',
      date: '29/03/2026',
      isVerifiedPurchase: true,
      helpfulCount: 30,
      variantName: 'Chai vòi nhấn 473ml',
      images: [
        'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&auto=format&fit=crop&q=80',
      ],
    },
  ],

  // 11. Mặt nạ ngủ môi Laneige
  'beauty-laneige-lipmask': [
    {
      id: 'rev_ln_01',
      productId: 'beauty-laneige-lipmask',
      authorName: 'Nguyễn Bích Ngọc',
      authorBadge: 'Người mua đã xác thực',
      rating: 5,
      title: 'Môi mềm mọng sau 1 đêm, không còn nứt nẻ chảy máu',
      comment: 'Mùi dâu quả mọng ngọt dịu như kẹo. Buổi tối bôi một lớp dày, sáng hôm sau lấy khăn ấm lau nhẹ là da chết môi bong sạch sẽ, đánh son lì cực mướt.',
      date: '02/04/2026',
      isVerifiedPurchase: true,
      helpfulCount: 18,
      variantName: 'Hương Berry truyền thống',
      images: [
        'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=600&auto=format&fit=crop&q=80',
      ],
    },
  ],

  // 12. Dầu gội xả Kerasys Devils
  'beauty-kerasys-devils': [
    {
      id: 'rev_ks_01',
      productId: 'beauty-kerasys-devils',
      authorName: 'Hồ Thu Hà',
      authorBadge: 'Người mua đã xác thực',
      rating: 5,
      title: 'Hương nước hoa lưu hương sang trọng đến 48 giờ',
      comment: 'Mùi hương quyến rũ như nước hoa cao cấp của Pháp. Tóc uốn nhuộm của mình sau khi gội xả trở nên tơi bồng và không còn xơ rối.',
      date: '26/03/2026',
      isVerifiedPurchase: true,
      helpfulCount: 14,
      variantName: 'Chai Dầu Gội 820ml',
      images: [
        'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=600&auto=format&fit=crop&q=80',
      ],
    },
  ],

  // 13. Cà phê cô đặc Blendy Nhật Bản
  'food-blendy-concentrate': [
    {
      id: 'rev_bl_01',
      productId: 'food-blendy-concentrate',
      authorName: 'Đinh Tiến Dũng',
      authorBadge: 'Cán bộ văn phòng - Hà Nội',
      rating: 5,
      title: 'Pha cà phê sữa tươi trong 10 giây, chuẩn vị quán Nhật',
      comment: 'Chỉ cần bóc 1 viên đổ vào 150ml sữa tươi không đường thêm đá là có ngay ly latte thơm nức. Tiện lợi vô cùng cho buổi sáng bận rộn.',
      date: '06/04/2026',
      isVerifiedPurchase: true,
      helpfulCount: 37,
      variantName: 'Ít Đường (Vị ngọt thanh)',
      images: [
        'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&auto=format&fit=crop&q=80',
      ],
    },
    {
      id: 'rev_bl_02',
      productId: 'food-blendy-concentrate',
      authorName: 'Nguyễn Mai Phương',
      authorBadge: 'Người mua đã xác thực',
      rating: 4,
      title: 'Viên caramel thơm béo, hạn sử dụng còn rất xa',
      comment: 'Hàng chuẩn nội địa Nhật Bản, date xa tận 2027. Đóng gói túi zipper bảo quản tiện. Sẽ tiếp tục ủng hộ P4Shop.',
      date: '21/03/2026',
      isVerifiedPurchase: true,
      helpfulCount: 16,
      variantName: 'Hương Caramel ngậy béo',
    },
  ],

  // 14. Mì Udon Pulmuone
  'food-pulmuone-udon': [
    {
      id: 'rev_pul_01',
      productId: 'food-pulmuone-udon',
      authorName: 'Trịnh Khánh Linh',
      authorBadge: 'Người mua đã xác thực',
      rating: 5,
      title: 'Sợi mì tươi dai ngon chuẩn vị Udon truyền thống',
      comment: 'Nước dùng dashi cá ngừ thanh ngọt tự nhiên, không bị gắt bột ngọt. Nấu cùng thịt bò và nấm kim châm ăn ngày mưa quá ấm bụng.',
      date: '01/04/2026',
      isVerifiedPurchase: true,
      helpfulCount: 20,
      variantName: 'Gói 4 phần ăn gia đình',
      images: [
        'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600&auto=format&fit=crop&q=80',
      ],
    },
  ],

  // 15. Cà phê Cầu Đất Arabica
  'food-caudat-arabica': [
    {
      id: 'rev_cd_01',
      productId: 'food-caudat-arabica',
      authorName: 'Phan Quốc Việt',
      authorBadge: 'Người yêu cà phê Specialty',
      rating: 5,
      title: 'Arabica Cầu Đất rang mộc thơm nồng nàn hương hoa quả',
      comment: 'Hạt rang đều màu, độ chua thanh nhẹ của trái cây chín mọng và hậu vị ngọt sâu. Pha pour-over V60 buổi sáng tại phòng thơm phức cả tầng.',
      date: '31/03/2026',
      isVerifiedPurchase: true,
      helpfulCount: 25,
      variantName: 'Nguyên hạt (Pha máy / Tự xay)',
      images: [
        'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=600&auto=format&fit=crop&q=80',
      ],
    },
  ],

  // 16. Hạt điều Bình Phước
  'food-cashew-binhphuoc': [
    {
      id: 'rev_cashew_01',
      productId: 'food-cashew-binhphuoc',
      authorName: 'Nguyễn Thị Hồng',
      authorBadge: 'Người mua tại Hải Dương',
      rating: 5,
      title: 'Hạt điều rang muối loại A hạt to mẩy, giòn rụm béo ngậy',
      comment: 'Hạt điều nguyên hạt không bị vỡ vụn, rang vừa lửa không bị cháy xém. Nắp nhôm niêm phong kín gió mở ra thơm lừng.',
      date: '27/03/2026',
      isVerifiedPurchase: true,
      helpfulCount: 19,
      variantName: 'Hộp nắp nhôm 500g',
      images: [
        'https://images.unsplash.com/photo-1536591375315-1b836821db56?w=600&auto=format&fit=crop&q=80',
      ],
    },
  ],

  // 17. Rong biển Hàn Quốc
  'food-seaweed-korea': [
    {
      id: 'rev_sw_01',
      productId: 'food-seaweed-korea',
      authorName: 'Vũ Minh Châu',
      authorBadge: 'Người mua đã xác thực',
      rating: 5,
      title: 'Rong biển tẩm dầu mè thơm ngon, ăn vặt hay cuộn cơm đều mê',
      comment: 'Lốc 16 gói nhỏ chia bữa rất tiện. Bé nhà mình rất thích ăn cơm cùng rong biển này.',
      date: '04/04/2026',
      isVerifiedPurchase: true,
      helpfulCount: 11,
      variantName: 'Lốc 16 gói',
    },
  ],

  // 18. Trà Ô Long Bảo Lộc
  'food-oolong-baoloc': [
    {
      id: 'rev_oolong_01',
      productId: 'food-oolong-baoloc',
      authorName: 'Lý Quốc Cường',
      authorBadge: 'Người mua đã xác thực',
      rating: 5,
      title: 'Trà hương sen mộc mạc, nước xanh vàng trong vắt',
      comment: 'Hộp thiếc sang trọng làm quà biếu thầy cô rất ý nghĩa. Vị trà tiền chát dịu hậu ngọt sâu không bị đắng chát gắt.',
      date: '17/03/2026',
      isVerifiedPurchase: true,
      helpfulCount: 15,
      variantName: 'Hộp thiếc 250g',
      images: [
        'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=600&auto=format&fit=crop&q=80',
      ],
    },
  ],

  // 19. Nồi chiên không dầu Lock&Lock
  'house-locknlock-airfryer': [
    {
      id: 'rev_ll_01',
      productId: 'house-locknlock-airfryer',
      authorName: 'Bùi Lan Anh',
      authorBadge: 'Người mua đã xác thực',
      rating: 5,
      title: 'Nồi chiên dung tích lớn 5.2L nướng nguyên con gà 2kg',
      comment: 'Màn hình cảm ứng hiện đại, dễ thao tác. Nướng khoai tây chiên và cánh gà giòn rụm mà tách được cả bát con mỡ thừa. Lớp chống dính rửa dễ dàng.',
      date: '05/04/2026',
      isVerifiedPurchase: true,
      helpfulCount: 33,
      variantName: 'Đen Bóng Sang Trọng',
      images: [
        'https://images.unsplash.com/photo-1584992236310-6edddc08acff?w=600&auto=format&fit=crop&q=80',
      ],
    },
    {
      id: 'rev_ll_02',
      productId: 'house-locknlock-airfryer',
      authorName: 'Hoàng Văn Thành',
      authorBadge: 'Người mua tại Cầu Giấy',
      rating: 4,
      title: 'Nấu ăn nhanh và không bị khói ám bếp',
      comment: 'Lúc mới bóc hộp nên bật không tải 10 phút để khử mùi nhựa mới theo sách hướng dẫn. Dùng 2 tuần nay ngày nào cũng làm món nướng.',
      date: '24/03/2026',
      isVerifiedPurchase: true,
      helpfulCount: 17,
      variantName: 'Trắng Sứ Bắc Âu',
    },
  ],

  // 20. Máy lọc không khí Levoit
  'house-levoit-airpurifier': [
    {
      id: 'rev_lev_01',
      productId: 'house-levoit-airpurifier',
      authorName: 'Nguyễn Đình Quân',
      authorBadge: 'Người mua đã xác thực',
      rating: 5,
      title: 'Chạy cực êm ban đêm, lọc sạch bụi mịn PM2.5 ở Hà Nội',
      comment: 'Nhà gần đường Hồ Tùng Mậu bụi nhiều, từ khi bật máy này con mình hết hẳn hắt hơi nghẹt mũi ban đêm. Màng lọc HEPA H13 khử mùi thức ăn siêu nhanh.',
      date: '03/04/2026',
      isVerifiedPurchase: true,
      helpfulCount: 27,
      variantName: 'Trắng Tinh Khôi',
      images: [
        'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&auto=format&fit=crop&q=80',
      ],
    },
  ],

  // 21. Ly giữ nhiệt Stanley Tumbler
  'house-stanley-tumbler': [
    {
      id: 'rev_st_01',
      productId: 'house-stanley-tumbler',
      authorName: 'Lê Thuỳ Trang',
      authorBadge: 'Sinh viên K60 TMU',
      rating: 5,
      title: 'Giữ đá lạnh 24 tiếng mang đi học từ sáng đến tối',
      comment: 'Ly to cầm đầm tay, vừa khít khay để cốc xe ô tô. Màu kem sữa xinh xỉu, ống hút silicon hút trà sữa trân châu thoải mái.',
      date: '08/04/2026',
      isVerifiedPurchase: true,
      helpfulCount: 39,
      variantName: 'Màu Kem Sữa Cream',
      images: [
        'https://images.unsplash.com/photo-1577937927133-66ef06acdf18?w=600&auto=format&fit=crop&q=80',
      ],
    },
    {
      id: 'rev_st_02',
      productId: 'house-stanley-tumbler',
      authorName: 'Ngô Thanh Huyền',
      authorBadge: 'Người mua đã xác thực',
      rating: 4,
      title: 'Màu sắc đẹp, nắp vặn kín chống tràn tốt',
      comment: 'Cốc to 1.18L chứa đủ lượng nước uống cho cả buổi học. Cầm hơi nặng một chút khi đổ đầy nước nhưng có quai cầm trợ lực rất êm.',
      date: '29/03/2026',
      isVerifiedPurchase: true,
      helpfulCount: 13,
      variantName: 'Màu Hồng Phấn Rose Quartz',
    },
  ],

  // 22. Ấm siêu tốc thủy tinh Philips
  'house-philips-kettle': [
    {
      id: 'rev_ph_01',
      productId: 'house-philips-kettle',
      authorName: 'Tô Văn Tuấn',
      authorBadge: 'Người mua đã xác thực',
      rating: 5,
      title: 'Thủy tinh chịu nhiệt dày dặn, đèn LED xanh dương đẹp mắt',
      comment: 'Đun 1.7L nước chỉ trong chưa đầy 4 phút. Thân thủy tinh trong suốt giúp nhìn rõ nước sôi và dễ phát hiện cặn canxi để vệ sinh.',
      date: '22/03/2026',
      isVerifiedPurchase: true,
      helpfulCount: 16,
      variantName: 'Thủy Tinh Viền Kim Loại',
      images: [
        'https://images.unsplash.com/photo-1544816155-12df9643f363?w=600&auto=format&fit=crop&q=80',
      ],
    },
  ],

  // 23. Đèn bàn học Xiaomi Desk Lamp
  'house-xiaomi-desklamp': [
    {
      id: 'rev_xm_01',
      productId: 'house-xiaomi-desklamp',
      authorName: 'Phạm Đức Duy',
      authorBadge: 'Sinh viên TMU',
      rating: 5,
      title: 'Ánh sáng bảo vệ mắt không nhấp nháy, chỉnh được nhiệt độ màu',
      comment: 'Núm xoay chỉnh độ sáng vô cấp rất mượt. Có chế độ học tập và chế độ đọc sách ban đêm không mỏi mắt khi thức ôn thi.',
      date: '02/04/2026',
      isVerifiedPurchase: true,
      helpfulCount: 21,
      variantName: 'Trắng Thanh Lịch',
      images: [
        'https://images.unsplash.com/photo-1534972195531-a756b1126f24?w=600&auto=format&fit=crop&q=80',
      ],
    },
  ],

  // 24. Hộp cơm cắm điện Bear
  'house-bear-lunchbox': [
    {
      id: 'rev_bear_01',
      productId: 'house-bear-lunchbox',
      authorName: 'Lê Ngọc Mai',
      authorBadge: 'Dân văn phòng Mai Dịch',
      rating: 5,
      title: 'Hâm nóng cơm canh nóng hổi chỉ 15 phút, khay inox 304 sạch sẽ',
      comment: 'Tạm biệt cơm nguội mùa đông. Khay inox tháo rời rửa sạch nhanh, nắp có gioăng hút chân không không lo rò rỉ nước canh ra túi xách.',
      date: '04/04/2026',
      isVerifiedPurchase: true,
      helpfulCount: 24,
      variantName: 'Vàng Kem Xinh Xắn',
      images: [
        'https://images.unsplash.com/photo-1584992236310-6edddc08acff?w=600&auto=format&fit=crop&q=80',
      ],
    },
  ],

  // 25. Bóng Golf Titleist Pro V1
  'golf-titleist-prov1': [
    {
      id: 'rev_pro_01',
      productId: 'golf-titleist-prov1',
      authorName: 'Đoàn Hữu Trí',
      authorBadge: 'Golfer Handicap 12',
      rating: 5,
      title: 'Bóng chuẩn Tour chính hãng, độ xoáy quanh green cực tốt',
      comment: 'Cảm giác bóng mềm khi chạm gậy gạt Putter, đường bay đầm và cản gió tốt. Mua trên P4Shop cam kết bảo hành chính hãng chuẩn chỉ.',
      date: '28/03/2026',
      isVerifiedPurchase: true,
      helpfulCount: 18,
      variantName: 'Hộp 12 quả số 1-4',
      images: [
        'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=600&auto=format&fit=crop&q=80',
      ],
    },
  ],

  // 26. Áo Polo Golf Hazzys
  'golf-hazzys-polo': [
    {
      id: 'rev_hz_01',
      productId: 'golf-hazzys-polo',
      authorName: 'Lê Tuấn Vũ',
      authorBadge: 'Người mua đã xác thực',
      rating: 5,
      title: 'Vải co giãn 4 chiều thoáng khí, form áo chuẩn Hàn Quốc',
      comment: 'Mặc swing thoải mái không bị bó nách. Thấm hút mồ hôi cực nhanh trong những vòng đấu nắng gắt 18 hố.',
      date: '01/04/2026',
      isVerifiedPurchase: true,
      helpfulCount: 15,
      variantName: 'Xanh Navy (Size L/XL)',
      images: [
        'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=600&auto=format&fit=crop&q=80',
      ],
    },
  ],

  // 27. Găng tay FootJoy
  'golf-footjoy-glove': [
    {
      id: 'rev_fj_01',
      productId: 'golf-footjoy-glove',
      authorName: 'Nguyễn Hải Đăng',
      authorBadge: 'Người mua đã xác thực',
      rating: 5,
      title: 'Da cừu Cabretta êm ái bám gậy chống trơn trượt',
      comment: 'Găng ôm sát từng khớp ngón tay, cảm giác cầm gậy chân thật. Lớp đệm hút ẩm ở mu bàn tay rất thoáng mát.',
      date: '25/03/2026',
      isVerifiedPurchase: true,
      helpfulCount: 12,
      variantName: 'Tay Trái - Size 23 (Phổ thông)',
    },
  ],

  // 28. Mũ Golf Titleist
  'golf-titleist-hat': [
    {
      id: 'rev_th_01',
      productId: 'golf-titleist-hat',
      authorName: 'Vũ Đức Nam',
      authorBadge: 'Người mua đã xác thực',
      rating: 5,
      title: 'Mũ form cứng cáp, thêu logo sắc nét',
      comment: 'Vành mũ chống nắng tốt, chất liệu chống tia UV cao cấp và có khóa dán điều chỉnh vòng đầu linh hoạt.',
      date: '19/03/2026',
      isVerifiedPurchase: true,
      helpfulCount: 9,
      variantName: 'Trắng Chữ Đen Classic',
    },
  ],

  // 29. Thắt lưng TaylorMade
  'golf-taylormade-belt': [
    {
      id: 'rev_tm_01',
      productId: 'golf-taylormade-belt',
      authorName: 'Trần Mạnh Cường',
      authorBadge: 'Người mua đã xác thực',
      rating: 5,
      title: 'Mặt xoay 2 màu đen nâu tiện phối đồ',
      comment: 'Da thật bền đẹp, mặt khóa kim loại đúc nguyên khối chống xước tinh xảo.',
      date: '12/03/2026',
      isVerifiedPurchase: true,
      helpfulCount: 7,
      variantName: 'Mặt xoay Đen / Nâu',
    },
  ],

  // 30. Giày Golf Ecco Biom H4
  'golf-ecco-shoes': [
    {
      id: 'rev_ecco_01',
      productId: 'golf-ecco-shoes',
      authorName: 'Đặng Tuấn Kiệt',
      authorBadge: 'Golfer',
      rating: 5,
      title: 'Giày êm ái hàng đầu thế giới, chống nước Gore-Tex 100%',
      comment: 'Đi bộ liên tục 18 hố không hề đau gót hay ê ẩm bàn chân. Đế đinh cao su bám cỏ dốc rất chắc chắn khi phát bóng.',
      date: '03/04/2026',
      isVerifiedPurchase: true,
      helpfulCount: 22,
      variantName: 'Trắng Viền Xám (Size 41/42)',
      images: [
        'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&auto=format&fit=crop&q=80',
      ],
    },
  ],

  // 31. Hồng sâm KGC Cheong Kwan Jang
  'health-kgc-ginseng': [
    {
      id: 'rev_kgc_01',
      productId: 'health-kgc-ginseng',
      authorName: 'Trần Thị Thu Thủy',
      authorBadge: 'Khách hàng thân thiết',
      rating: 5,
      title: 'Hồng sâm 6 năm tuổi chính phủ Hàn Quốc, tăng sức đề kháng rõ rệt',
      comment: 'Mẹ mình dùng mỗi sáng 1 gói thấy ăn ngon ngủ sâu giấc hơn, ít bị cảm vặt khi giao mùa. Hộp đóng gói trang trọng có tem chống giả KGC.',
      date: '06/04/2026',
      isVerifiedPurchase: true,
      helpfulCount: 34,
      variantName: 'Hộp 30 gói x 10ml',
      images: [
        'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&auto=format&fit=crop&q=80',
      ],
    },
  ],

  // 32. Viên sủi Berocca Orange
  'health-berocca-orange': [
    {
      id: 'rev_ber_01',
      productId: 'health-berocca-orange',
      authorName: 'Lê Minh Quân',
      authorBadge: 'Sinh viên năm cuối TMU',
      rating: 5,
      title: 'Cứu tinh những ngày ôn thi tốt nghiệp căng thẳng',
      comment: 'Vị cam thơm dễ uống như nước ngọt có ga, bổ sung vitamin nhóm B và khoáng chất giúp tỉnh táo cả ngày làm đồ án.',
      date: '07/04/2026',
      isVerifiedPurchase: true,
      helpfulCount: 17,
      variantName: 'Hộp 3 tuýp (30 viên)',
      images: [
        'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&auto=format&fit=crop&q=80',
      ],
    },
  ],

  // 33. Dầu cá Omega 3 Kirkland
  'health-kirkland-omega3': [
    {
      id: 'rev_omg_01',
      productId: 'health-kirkland-omega3',
      authorName: 'Nguyễn Thu Huyền',
      authorBadge: 'Người mua đã xác thực',
      rating: 5,
      title: 'Lọ lớn 400 viên cả nhà uống nửa năm, bổ mắt bổ tim',
      comment: 'Hàng chuẩn Mỹ nguyên seal nắp, viên nang mềm dễ nuốt không bị ợ mùi tanh cá. Làm việc máy tính cả ngày mắt đỡ khô hẳn.',
      date: '27/03/2026',
      isVerifiedPurchase: true,
      helpfulCount: 20,
      variantName: 'Lọ lớn 400 viên',
    },
  ],

  // 34. Nước tăng lực Guronsan
  'health-guronsan-energy': [
    {
      id: 'rev_gur_01',
      productId: 'health-guronsan-energy',
      authorName: 'Phạm Quang Minh',
      authorBadge: 'Người mua đã xác thực',
      rating: 5,
      title: 'Thức uống phục hồi năng lượng thể thao nhập khẩu Pháp',
      comment: 'Uống sau giờ tập gym hoặc bóng rổ thấy cơ thể phục hồi rất nhanh, giảm mỏi cơ bắp rõ rệt.',
      date: '21/03/2026',
      isVerifiedPurchase: true,
      helpfulCount: 11,
      variantName: 'Hộp 10 chai x 100ml',
    },
  ],

  // 35. Men vi sinh BioGaia
  'health-biogaia-drops': [
    {
      id: 'rev_bio_01',
      productId: 'health-biogaia-drops',
      authorName: 'Vũ Thảo Nguyên',
      authorBadge: 'Mẹ bỉm sữa thông thái',
      rating: 5,
      title: 'Men vi sinh hữu cơ Thụy Điển giúp bé êm bụng, đỡ nôn trớ',
      comment: 'Lọ nhỏ giọt tiện lợi, bé dùng đều đặn tiêu hóa tốt, tăng cân đều. Mua trên P4Shop date mới tinh, giao hỏa tốc đóng gói kèm túi giữ nhiệt chu đáo.',
      date: '02/04/2026',
      isVerifiedPurchase: true,
      helpfulCount: 28,
      variantName: 'Lọ nhỏ giọt 5ml',
      images: [
        'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&auto=format&fit=crop&q=80',
      ],
    },
  ],

  // 36. Bột cần tây Collagen
  'health-collagen-celery': [
    {
      id: 'rev_cel_01',
      productId: 'health-collagen-celery',
      authorName: 'Đỗ Hải Yến',
      authorBadge: 'Khách hàng thân thiết',
      rating: 5,
      title: 'Thanh lọc cơ thể, da dẻ mịn màng và giảm mỡ bụng tự nhiên',
      comment: 'Bột sấy lạnh công nghệ cao nên giữ được màu xanh tươi và vitamin. Uống vị thanh nhẹ rất dễ uống không bị đắng ngái như tự ép cần tây tươi.',
      date: '05/04/2026',
      isVerifiedPurchase: true,
      helpfulCount: 25,
      variantName: 'Hộp 20 gói hòa tan',
      images: [
        'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&auto=format&fit=crop&q=80',
      ],
    },
    {
      id: 'rev_cel_02',
      productId: 'health-collagen-celery',
      authorName: 'Nguyễn Quỳnh Nga',
      authorBadge: 'Người mua đã xác thực',
      rating: 4,
      title: 'Tiện lợi mang đi làm, uống kèm mật ong rất ngon',
      comment: 'Mỗi sáng pha 1 gói cùng 200ml nước ấm và 1 thìa mật ong. Sau 1 tháng thấy nhẹ bụng và da bớt mụn ẩn.',
      date: '16/03/2026',
      isVerifiedPurchase: true,
      helpfulCount: 14,
      variantName: 'Hộp 20 gói hòa tan',
    },
  ],
};

/**
 * Fallback generator for any dynamically added seller product
 */
export function getProductReviewsList(productId: string): ProductReview[] {
  if (COMPREHENSIVE_PRODUCT_REVIEWS[productId]) {
    return COMPREHENSIVE_PRODUCT_REVIEWS[productId];
  }
  // Generic high-quality template for new seller products
  return [
    {
      id: `rev_${productId}_1`,
      productId,
      authorName: 'Nguyễn Văn An',
      authorBadge: 'Khách hàng TMU',
      rating: 5,
      title: 'Sản phẩm chất lượng vượt trội, giao hàng nhanh',
      comment: 'Sản phẩm đúng như mô tả của nhà bán hàng, đóng gói cẩn thận hai lớp chống sốc. Dùng rất ưng ý!',
      date: '05/04/2026',
      isVerifiedPurchase: true,
      helpfulCount: 8,
      variantName: 'Tiêu chuẩn',
      images: [
        'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=600&auto=format&fit=crop&q=80',
      ],
    },
    {
      id: `rev_${productId}_2`,
      productId,
      authorName: 'Lê Thu Hương',
      authorBadge: 'Người mua đã xác thực',
      rating: 4,
      title: 'Đóng gói chắc chắn, trải nghiệm tốt trong tầm giá',
      comment: 'Giao hàng đúng hẹn, bưu tá thân thiện, chất lượng sản phẩm tương xứng với giá tiền.',
      date: '28/03/2026',
      isVerifiedPurchase: true,
      helpfulCount: 5,
      variantName: 'Tiêu chuẩn',
    },
  ];
}
