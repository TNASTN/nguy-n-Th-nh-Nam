export interface WeddingEvent {
  id: string;
  titleVi: string;
  titleEn: string;
  subtitleVi: string;
  subtitleEn: string;
  timeVi: string;
  timeEn: string;
  dateVi: string;
  dateEn: string;
  lunarDateVi: string;
  lunarDateEn: string;
  locationNameVi: string;
  locationNameEn: string;
  addressVi: string;
  addressEn: string;
  googleMapsUrl: string;
  embedMapQuery: string;
  timeline: { time: string; activityVi: string; activityEn: string }[];
}

export interface GalleryImage {
  id: string;
  url: string;
  titleVi: string;
  titleEn: string;
  category: 'traditional' | 'western' | 'card';
  captionVi: string;
  captionEn: string;
}

export const WEDDING_DATA = {
  groom: {
    fullName: 'Nguyễn Thành Nam',
    shortName: 'Thành Nam',
    roleVi: 'Chú Rể (Út Nam)',
    roleEn: 'The Groom',
    parentsVi: {
      father: 'Ông Nguyễn Thành Dương',
      mother: 'Bà Nguyễn Thị Lý',
      address: '78 Thôn Tiến Đông, Ea Knốp, Đắk Lắk, Vietnam'
    },
    parentsEn: {
      father: 'Mr. Nguyen Thanh Duong',
      mother: 'Mrs. Nguyen Thi Ly',
      address: '78 Tien Dong, Ea Knop, Dak Lak, Vietnam'
    },
    bankInfo: {
      bankName: 'MB Bank (Quân Đội)',
      accountNumber: '0987654321',
      accountName: 'NGUYEN THANH NAM',
      qrCodeUrl: 'https://api.vietqr.io/image/970422-0987654321-compact2.jpg?amount=0&addInfo=Mung%20Cuoi%20Thanh%20Nam'
    }
  },
  bride: {
    fullName: 'Lê Huỳnh Tú Uyên',
    shortName: 'Tú Uyên',
    roleVi: 'Cô Dâu (Út Nữ)',
    roleEn: 'The Bride',
    parentsVi: {
      father: 'Ông Lê Doãn Khôi',
      mother: 'Bà Huỳnh Thị Hồng',
      address: 'Thôn Giang Phú, Xã Tam Giang, Huyện Krông Năng, Đắk Lắk'
    },
    parentsEn: {
      father: 'Mr. Le Doan Khoi',
      mother: 'Mrs. Huynh Thi Hong',
      address: 'Giang Phu, Tam Giang, Krong Nang, Dak Lak'
    },
    bankInfo: {
      bankName: 'Vietcombank',
      accountNumber: '1023456789',
      accountName: 'LE HUYNH TU UYEN',
      qrCodeUrl: 'https://api.vietqr.io/image/970436-1023456789-compact2.jpg?amount=0&addInfo=Mung%20Cuoi%20Tu%20Uyen'
    }
  },
  weddingDate: '2026-11-28T19:00:00+07:00',
  weddingDateDisplayVi: 'Thứ Bảy, 28 Tháng 11 Năm 2026',
  weddingDateDisplayEn: 'Saturday, November 28, 2026',
  lunarDateVi: 'Nhằm ngày 20 tháng 10 năm Bính Ngọ',
  lunarDateEn: '20th Day of 10th Lunar Month',

  events: [
    {
      id: 'solemn-ceremony',
      titleVi: 'Lễ Báo Hỷ',
      titleEn: 'Wedding Reception (Lễ Báo Hỷ)',
      subtitleVi: 'Sự hiện diện của quý khách là niềm vinh hạnh cho gia đình chúng tôi',
      subtitleEn: 'Your presence is our family’s greatest honor and joy',
      timeVi: '18:30 Đón Khách - 19:00 Khai Tiệc',
      timeEn: '6:30 PM Reception - 7:00 PM Banquet',
      dateVi: 'Thứ Bảy, 28/11/2026',
      dateEn: 'Saturday, Nov 28, 2026',
      lunarDateVi: 'Nhằm ngày 20 tháng 10 năm Bính Ngọ',
      lunarDateEn: '20th Day of 10th Lunar Month',
      locationNameVi: 'Lễ Báo Hỷ: Nhà Hàng Thu Hiền',
      locationNameEn: 'Thu Hien Restaurant',
      addressVi: '18 Bác Ái, Thủ Đức, Hồ Chí Minh, Vietnam',
      addressEn: '18 Bac Ai, Thu Duc, Ho Chi Minh City, Vietnam',
      googleMapsUrl: 'https://maps.google.com/?q=Nh%C3%A0+H%C3%A0ng+Thu+Hi%E1%BB%81n,+18+B%C3%A1c+%C3%81i,+Th%E1%BB%A7+%C4%90%E1%BB%A9c,+H%E1%BB%93+Ch%C3%AD+Minh,+Vietnam',
      embedMapQuery: 'Nhà Hàng Thu Hiền, 18 Bác Ái, Thủ Đức, Hồ Chí Minh, Vietnam',
      timeline: [
        { time: '18:30', activityVi: 'Đón tiếp quý khách mời & chụp ảnh kỷ niệm tại sảnh tiệc', activityEn: 'Guest reception & photo session' },
        { time: '19:00', activityVi: 'Cử hành Lễ Báo Hỷ & khai tiệc chung vui cùng gia đình', activityEn: 'Wedding celebration & official banquet' },
        { time: '20:00', activityVi: 'Chúc rượu mừng hạnh phúc & giao lưu cùng bạn bè, người thân', activityEn: 'Champagne toast & warm gathering' }
      ]
    }
  ] as WeddingEvent[],

  gallery: [
    {
      id: 'drive-1',
      url: '/assets/wedding/QYN_7687.jpg',
      titleVi: 'Hạnh Phúc Viên Mãn',
      titleEn: 'Blissful Happiness',
      category: 'western',
      captionVi: 'Nụ cười rạng rỡ của cặp đôi trong bộ ảnh cưới phong cách hoàng gia.',
      captionEn: 'Radiant smile of the couple in royal European style.'
    },
    {
      id: 'drive-2',
      url: '/assets/wedding/QYN_7717.jpg',
      titleVi: 'Sánh Bước Bên Nhau',
      titleEn: 'Walking Together',
      category: 'western',
      captionVi: 'Chú rể Thành Nam và cô dâu Tú Uyên tay trong tay bước vào ngày vui.',
      captionEn: 'Groom Thanh Nam and Bride Tu Uyen hand in hand.'
    },
    {
      id: 'drive-3',
      url: '/assets/wedding/QYN_7877.jpg',
      titleVi: 'Nốt Nhạc Tình Yêu',
      titleEn: 'Melody of Love',
      category: 'western',
      captionVi: 'Giai điệu tình yêu êm đềm ngân vang trong khoảnh khắc thiêng liêng.',
      captionEn: 'Sweet harmony resonating in the unforgettable celebration.'
    },
    {
      id: 'drive-4',
      url: '/assets/wedding/QYN_8271.jpg',
      titleVi: 'Khoảnh Khắc Lãng Mạn',
      titleEn: 'Romantic Moment',
      category: 'western',
      captionVi: 'Ánh mắt trao nhau chứa chan niềm tin và sự che chở trọn đời.',
      captionEn: 'Devotion and lifelong warmth exchanged through tender gazes.'
    },
    {
      id: 'drive-5',
      url: '/assets/wedding/QYN_8407.jpg',
      titleVi: 'Bó Hoa Cưới Tinh Khôi',
      titleEn: 'Pure Blossom',
      category: 'western',
      captionVi: 'Sắc hoa trắng thuần khiết gửi gắm lời hứa thủy chung trăm năm.',
      captionEn: 'Pristine white blooms symbolizing pure commitment.'
    },
    {
      id: 'drive-6',
      url: '/assets/wedding/QYN_8549.jpg',
      titleVi: 'Ánh Mắt Yêu Thương',
      titleEn: 'Gaze of Devotion',
      category: 'western',
      captionVi: 'Giữa không gian hoa viên ngập tràn ánh nắng và sắc hoa tươi thắm.',
      captionEn: 'Embraced by blooming flowers and gentle sunlight.'
    },
    {
      id: 'drive-7',
      url: '/assets/wedding/QYN_8632.jpg',
      titleVi: 'Quý Phái & Trang Trọng',
      titleEn: 'Royal Elegance',
      category: 'western',
      captionVi: 'Lễ phục cưới hoàng gia sang trọng của chú rể Thành Nam và cô dâu Tú Uyên.',
      captionEn: 'Classic luxury bridal suit and gown for the grand occasion.'
    },
    {
      id: 'drive-8',
      url: '/assets/wedding/QYN_8644.jpg',
      titleVi: 'Không Gian Ấm Cúng',
      titleEn: 'Warmth of Love',
      category: 'western',
      captionVi: 'Tình yêu nồng ấm giữa khung cảnh lò sưởi và hoa hồng nhung đỏ.',
      captionEn: 'Cozy and luxurious atmosphere surrounded by velvet red roses.'
    },
    {
      id: 'drive-9',
      url: '/assets/wedding/QYN_8732.jpg',
      titleVi: 'Nàng Thơ Tú Uyên',
      titleEn: 'Graceful Bride Tu Uyen',
      category: 'western',
      captionVi: 'Vẻ đẹp dịu dàng, đài các của cô dâu trong chiếc váy cưới lộng lẫy.',
      captionEn: 'The captivating elegance of bride Tu Uyen in her wedding gown.'
    },
    {
      id: 'drive-10',
      url: '/assets/wedding/QYN_8742.jpg',
      titleVi: 'Cùng Nhìn Về Một Hướng',
      titleEn: 'Shared Future',
      category: 'western',
      captionVi: 'Hai trái tim cùng chung nhịp đập, hướng tới tương lai tốt đẹp.',
      captionEn: 'Two hearts beating in unison toward a shared journey.'
    },
    {
      id: 'drive-11',
      url: '/assets/wedding/QYN_9130.jpg',
      titleVi: 'Nụ Cười Tỏa Sáng',
      titleEn: 'Radiant Smile',
      category: 'western',
      captionVi: 'Niềm hân hoan rạng ngời trên gương mặt trong ngày trọng đại.',
      captionEn: 'Pure happiness shining brightly on their faces.'
    },
    {
      id: 'drive-12',
      url: '/assets/wedding/QYN_9220.jpg',
      titleVi: 'Lời Hẹn Ước Trăm Năm',
      titleEn: 'Everlasting Promise',
      category: 'western',
      captionVi: 'Bên nhau từ những ngày bình dị đến ngày chung đôi hạnh phúc.',
      captionEn: 'Together through every simple day toward this joyful milestone.'
    },
    {
      id: 'drive-13',
      url: '/assets/wedding/QYN_9537.jpg',
      titleVi: 'Ngọt Ngào & Tinh Tế',
      titleEn: 'Sweet & Refined',
      category: 'western',
      captionVi: 'Từng chi tiết được chăm chút tỉ mỉ cho ngày vui trọn vẹn.',
      captionEn: 'Every delicate touch crafted for the perfect wedding.'
    },
    {
      id: 'drive-14',
      url: '/assets/wedding/QYN_9599.jpg',
      titleVi: 'Hạnh Phúc Về Chung Nhà',
      titleEn: 'Home of Love',
      category: 'western',
      captionVi: 'Chính thức nên duyên vợ chồng, dựng xây tổ ấm yêu thương.',
      captionEn: 'Beginning a cherished new chapter of family life together.'
    },
    {
      id: 'drive-15',
      url: '/assets/wedding/QYN_9636.jpg',
      titleVi: 'Trọn Vẹn Yêu Thương',
      titleEn: 'Endless Love',
      category: 'western',
      captionVi: 'Bức tranh tình yêu hoàn mỹ lưu giữ muôn đời.',
      captionEn: 'A timeless portrait of love and devotion.'
    },
    {
      id: 'trad-1',
      url: '/assets/aistudio/7c89500b-1831-47a4-8528-709a25caeb23_8e706367.jpg',
      titleVi: 'Áo Dài Đỏ Truyền Thống',
      titleEn: 'Traditional Red Ao Dai',
      category: 'traditional',
      captionVi: 'Áo dài đỏ may mắn dưới làn pháo hoa chúc phúc ngày hôn lễ.',
      captionEn: 'Auspicious crimson Ao Dai celebrating the sacred ceremony.'
    },
    {
      id: 'trad-2',
      url: '/assets/aistudio/ae99462b-8da5-427f-869b-9800219d04ea_30adaafe.jpg',
      titleVi: 'Chú Rể Thành Nam Lễ Gia Tiên',
      titleEn: 'Groom Thanh Nam in Traditional Attire',
      category: 'traditional',
      captionVi: 'Trang trọng và lịch lãm trong trang phục truyền thống dân tộc.',
      captionEn: 'Handsome and dignified in traditional Vietnamese wedding attire.'
    },
    {
      id: 'trad-3',
      url: '/assets/aistudio/d9c63f9f-68b1-4788-b7e3-6038ea4be15f_3e988da8.jpg',
      titleVi: 'Nhẫn Cưới Định Ước',
      titleEn: 'Ring of Devotion',
      category: 'traditional',
      captionVi: 'Nắm chặt tay nhau cùng chiếc nhẫn cưới trao lời thề son sắt.',
      captionEn: 'Holding hands with the wedding ring sealing eternal fidelity.'
    }
  ] as GalleryImage[],

  // Audio track for romantic wedding atmosphere
  backgroundMusicUrl: 'https://cdn.pixabay.com/download/audio/2022/05/16/audio_c1e626154b.mp3?filename=wedding-piano-112199.mp3'
};

export const TRANSLATIONS = {
  vi: {
    invitationKicker: 'LỄ BÁO HỶ · THIỆP MỜI TRỰC TUYẾN',
    openEnvelopeTitle: 'Chạm để mở thiệp mời',
    openEnvelopeSubtitle: 'Thành Nam & Tú Uyên trân trọng kính mời',
    groomSide: 'Nhà Trai',
    brideSide: 'Nhà Gái',
    groomParents: 'Nhà Trai',
    brideParents: 'Nhà Gái',
    weddingOf: 'Lễ Báo Hỷ Của Cặp Đôi',
    countdownHeading: 'Cùng Đếm Ngược Đến Ngày Trọng Đại',
    days: 'Ngày',
    hours: 'Giờ',
    minutes: 'Phút',
    seconds: 'Giây',
    eventsHeading: 'Chương Trình Sự Kiện & Địa Điểm',
    addToCalendar: 'Lưu vào Lịch',
    viewOnMap: 'Xem Bản Đồ & Chỉ Đường',
    openGoogleMaps: 'Mở Chỉ Đường Google Maps',
    galleryHeading: 'Khoảnh Khắc Kỷ Niệm',
    gallerySubtitle: 'Hình ảnh sắc nét nguyên bản lưu giữ tình yêu trọn vẹn của chúng mình',
    allPhotos: 'Tất cả hình ảnh',
    traditionalPhotos: 'Lễ gia tiên truyền thống',
    westernPhotos: 'Album ảnh cưới',
    invitationCards: 'Thiệp cưới chính thức',
    rsvpHeading: 'Xác Nhận Tham Dự (RSVP)',
    rsvpSubtitle: 'Để gia đình đón tiếp quý khách chu đáo nhất, xin vui lòng gửi phản hồi trước ngày 25/11/2026',
    guestNameLabel: 'Họ và tên của bạn',
    phoneLabel: 'Số điện thoại liên hệ',
    attendingEventLabel: 'Bạn sẽ tham dự Lễ Báo Hỷ chứ?',
    dinner17Option: 'Bữa cơm thân mật',
    wedding18Option: 'Tham dự Lễ Báo Hỷ (18:30 ngày 28/11)',
    bothOption: 'Tham dự Lễ Báo Hỷ',
    declinedOption: 'Rất tiếc không thể tham dự',
    guestCountLabel: 'Số lượng người tham dự (bao gồm bạn)',
    guestSideLabel: 'Bạn là khách mời của ai?',
    ofGroom: 'Khách của Chú Rể (Nhà Trai)',
    ofBride: 'Khách của Cô Dâu (Nhà Gái)',
    noteLabel: 'Lời nhắn gửi thêm / Ghi chú bàn tiệc',
    submitRsvp: 'Gửi Xác Nhận Tham Dự',
    submitting: 'Đang gửi...',
    rsvpSuccess: 'Cảm ơn bạn! Gia đình đã nhận được thông tin xác nhận tham dự.',
    guestbookHeading: 'Sổ Lưu Bút & Lời Chúc Mừng',
    guestbookSubtitle: 'Những lời chúc tốt đẹp từ quý khách là món quà vô giá cho ngày vui',
    sendWish: 'Gửi Lời Chúc Phúc',
    senderNamePlaceholder: 'Tên của bạn hoặc xưng hô...',
    relationshipLabel: 'Mối quan hệ với cô dâu chú rể',
    relFriend: 'Bạn bè',
    relColleague: 'Đồng nghiệp',
    relFamily: 'Họ hàng / Người thân',
    relOther: 'Khách quý khác',
    messagePlaceholder: 'Viết những lời chúc ngọt ngào và tốt đẹp nhất dành tặng cặp đôi...',
    postWishBtn: 'Gửi Lời Chúc Tới Cặp Đôi',
    postingWish: 'Đang gửi lời chúc...',
    wishSuccess: 'Lời chúc của bạn đã được lưu vào sổ kỷ niệm!',
    giftBoxHeading: 'Hộp Mừng Cưới & Chúc Phúc',
    giftBoxSubtitle: 'Dành cho quý khách ở xa muốn gửi gắm tình cảm và món quà mừng hạnh phúc',
    groomGiftTab: 'Mừng Chú Rể (Thành Nam)',
    brideGiftTab: 'Mừng Cô Dâu (Tú Uyên)',
    bankName: 'Ngân hàng',
    accountNumber: 'Số tài khoản',
    accountHolder: 'Chủ tài khoản',
    copyNumber: 'Sao chép số TK',
    copied: 'Đã sao chép!',
    shareHeading: 'Chia Sẻ Thiệp Cưới',
    shareFacebook: 'Chia sẻ Facebook',
    shareZalo: 'Chia sẻ Zalo',
    copyLink: 'Sao chép liên kết thiệp',
    linkCopied: 'Đã sao chép liên kết!',
    adminPanel: 'Quản Trị',
    adminPinPrompt: 'Nhập mã PIN quản trị:',
    adminLogin: 'Đăng Nhập Quản Trị',
    adminWrongPin: 'Mã PIN chưa chính xác.',
    adminTitle: 'Bảng Điều Khiển Quản Trị Cưới',
    totalGuests: 'Tổng khách tham dự',
    totalRsvps: 'Lượt phản hồi',
    totalWishes: 'Lời chúc đã nhận',
    exportCsv: 'Xuất File Excel (CSV)',
    close: 'Đóng',
    offlineNotice: 'Đang xem chế độ ngoại tuyến (Dữ liệu đã được lưu trữ sẵn).',
    installPwa: 'Cài Đặt Thiệp Về Màn Hình',
    musicOn: 'Bật Nhạc',
    musicOff: 'Tắt Nhạc'
  },
  en: {
    invitationKicker: 'WEDDING RECEPTION · ONLINE INVITATION',
    openEnvelopeTitle: 'Tap to Open Wedding Invitation',
    openEnvelopeSubtitle: 'Thanh Nam & Tu Uyen warmly invite you',
    groomSide: "Groom's Family",
    brideSide: "Bride's Family",
    groomParents: "Groom's Parents",
    brideParents: "Bride's Parents",
    weddingOf: 'The Wedding Reception Of',
    countdownHeading: 'Counting Down to the Big Day',
    days: 'Days',
    hours: 'Hours',
    minutes: 'Minutes',
    seconds: 'Seconds',
    eventsHeading: 'Program Schedule & Location',
    addToCalendar: 'Add to Calendar',
    viewOnMap: 'View Map & Directions',
    openGoogleMaps: 'Open Google Maps Navigation',
    galleryHeading: 'Cherished Memories',
    gallerySubtitle: 'High-resolution original photography preserving our eternal love',
    allPhotos: 'All Photos',
    traditionalPhotos: 'Traditional Ceremony',
    westernPhotos: 'Wedding Album',
    invitationCards: 'Official Invitations',
    rsvpHeading: 'RSVP Confirmation',
    rsvpSubtitle: 'To ensure a warm and thoughtful reception, kindly confirm before Nov 25, 2026',
    guestNameLabel: 'Your full name',
    phoneLabel: 'Phone number',
    attendingEventLabel: 'Will you be attending the Wedding Reception?',
    dinner17Option: 'Intimate Dinner',
    wedding18Option: 'Attend Wedding Reception (6:30 PM, Nov 28)',
    bothOption: 'Attend Wedding Reception',
    declinedOption: 'Regretfully decline',
    guestCountLabel: 'Number of attending guests (including you)',
    guestSideLabel: 'Whose guest are you?',
    ofGroom: "Groom's Guest",
    ofBride: "Bride's Guest",
    noteLabel: 'Special note / Dietary request',
    submitRsvp: 'Confirm Attendance',
    submitting: 'Submitting...',
    rsvpSuccess: 'Thank you! Your RSVP has been received with love.',
    guestbookHeading: 'Guestbook & Wishes',
    guestbookSubtitle: 'Your warm wishes and blessings are the most precious wedding gift',
    sendWish: 'Send Your Blessing',
    senderNamePlaceholder: 'Your name or salutation...',
    relationshipLabel: 'Relationship with the couple',
    relFriend: 'Friend',
    relColleague: 'Colleague',
    relFamily: 'Family / Relative',
    relOther: 'Honored Guest',
    messagePlaceholder: 'Write heartfelt wishes and warm blessings for the happy couple...',
    postWishBtn: 'Send Blessing to Couple',
    postingWish: 'Sending blessing...',
    wishSuccess: 'Your blessing has been saved to the guestbook!',
    giftBoxHeading: 'Wedding Gift Box',
    giftBoxSubtitle: 'For friends and relatives from afar wishing to send love and congratulations',
    groomGiftTab: 'Groom (Thanh Nam)',
    brideGiftTab: 'Bride (Tu Uyen)',
    bankName: 'Bank',
    accountNumber: 'Account Number',
    accountHolder: 'Account Holder',
    copyNumber: 'Copy Account No.',
    copied: 'Copied!',
    shareHeading: 'Share Invitation',
    shareFacebook: 'Share to Facebook',
    shareZalo: 'Share to Zalo',
    copyLink: 'Copy Invitation Link',
    linkCopied: 'Link copied to clipboard!',
    adminPanel: 'Admin',
    adminPinPrompt: 'Enter Admin PIN:',
    adminLogin: 'Login to Admin',
    adminWrongPin: 'Incorrect PIN.',
    adminTitle: 'Wedding Admin Control Panel',
    totalGuests: 'Total Attending Guests',
    totalRsvps: 'Total Responses',
    totalWishes: 'Blessings Received',
    exportCsv: 'Export to Excel (CSV)',
    close: 'Close',
    offlineNotice: 'Viewing in Offline Mode (Cached for instant access).',
    installPwa: 'Add to Home Screen',
    musicOn: 'Play Music',
    musicOff: 'Pause Music'
  }
};
