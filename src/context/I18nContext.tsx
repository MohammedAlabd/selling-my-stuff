'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'ar' | 'tr';

interface I18nContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string, params?: Record<string, string | number>) => string;
    isRTL: boolean;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

interface Translations {
    [key: string]: {
        [lang in Language]: string;
    };
}

const translations: Translations = {
    // Header and Navigation
    'header.title': {
        en: 'Moving Sale - Everything Must Go!',
        ar: 'تصفية انتقال - يجب أن يذهب كل شيء!',
        tr: 'Taşınma İndirimi - Her Şey Gitmeli!'
    },
    'header.subtitle': {
        en: 'Quality household items and furniture at great prices',
        ar: 'أدوات منزلية وأثاث عالي الجودة بأسعار رائعة',
        tr: 'Kaliteli ev eşyaları ve mobilyalar uygun fiyatlarda'
    },
    'nav.cart': {
        en: 'Cart',
        ar: 'السلة',
        tr: 'Sepet'
    },
    'nav.backToItems': {
        en: '← Back to all items',
        ar: '← العودة إلى جميع العناصر',
        tr: '← Tüm ürünlere dön'
    },

    // Sorting and Filtering
    'sort.label': {
        en: 'Sort by:',
        ar: 'ترتيب حسب:',
        tr: 'Sırala:'
    },
    'sort.condition': {
        en: 'Condition (Best First)',
        ar: 'الحالة (الأفضل أولاً)',
        tr: 'Durum (En İyi Önce)'
    },
    'sort.name': {
        en: 'Name (A-Z)',
        ar: 'الاسم (أ-ي)',
        tr: 'İsim (A-Z)'
    },
    'sort.priceLowHigh': {
        en: 'Price (Low to High)',
        ar: 'السعر (من الأقل إلى الأعلى)',
        tr: 'Fiyat (Düşükten Yükseğe)'
    },
    'sort.priceHighLow': {
        en: 'Price (High to Low)',
        ar: 'السعر (من الأعلى إلى الأقل)',
        tr: 'Fiyat (Yüksekten Düşüğe)'
    },
    'sort.category': {
        en: 'Category',
        ar: 'الفئة',
        tr: 'Kategori'
    },
    'items.count': {
        en: 'items',
        ar: 'عنصر',
        tr: 'ürün'
    },

    // Item Conditions
    'condition.excellent': {
        en: 'Excellent',
        ar: 'ممتاز',
        tr: 'Mükemmel'
    },
    'condition.good': {
        en: 'Good',
        ar: 'جيد',
        tr: 'İyi'
    },
    'condition.fair': {
        en: 'Fair',
        ar: 'متوسط',
        tr: 'Orta'
    },
    'badge.asGoodAsNew': {
        en: 'As Good As New',
        ar: 'كالجديد تماماً',
        tr: 'Sıfır Gibi'
    },
    'badge.soldOut': {
        en: 'SOLD OUT',
        ar: 'تم البيع',
        tr: 'TÜKENDİ'
    },

    // Cart
    'cart.title': {
        en: 'Shopping Cart',
        ar: 'سلة التسوق',
        tr: 'Alışveriş Sepeti'
    },
    'cart.empty.title': {
        en: 'Your cart is empty',
        ar: 'سلة التسوق فارغة',
        tr: 'Sepetiniz boş'
    },
    'cart.empty.subtitle': {
        en: 'Add some items to get started!',
        ar: 'أضف بعض العناصر للبدء!',
        tr: 'Başlamak için birkaç ürün ekleyin!'
    },
    'cart.browseItems': {
        en: 'Browse Items',
        ar: 'تصفح العناصر',
        tr: 'Ürünleri Görüntüle'
    },
    'cart.clearCart': {
        en: 'Clear Cart',
        ar: 'إفراغ السلة',
        tr: 'Sepeti Temizle'
    },
    'cart.viewDetails': {
        en: 'View Details',
        ar: 'عرض التفاصيل',
        tr: 'Detayları Görüntüle'
    },
    'cart.total': {
        en: 'Total:',
        ar: 'المجموع:',
        tr: 'Toplam:'
    },
    'cart.contactSeller': {
        en: 'Contact Seller for All Items',
        ar: 'التواصل مع البائع لجميع العناصر',
        tr: 'Tüm Ürünler İçin Satıcıyla İletişime Geç'
    },
    'cart.makeBulkOffer': {
        en: 'Make Bulk Offer',
        ar: 'تقديم عرض بالجملة',
        tr: 'Toplu Teklif Ver'
    },
    'cart.contactOrOffer': {
        en: 'Contact seller or make an offer for all items at once',
        ar: 'تواصل مع البائع أو قدم عرضاً لجميع العناصر مرة واحدة',
        tr: 'Satıcıyla iletişime geçin veya tüm ürünler için tek seferde teklif verin'
    },

    // Bulk Offer Modal
    'bulkOffer.title': {
        en: 'Make Bulk Offer',
        ar: 'تقديم عرض بالجملة',
        tr: 'Toplu Teklif Ver'
    },
    'bulkOffer.cartItems': {
        en: 'Cart Items',
        ar: 'عناصر السلة',
        tr: 'Sepet Ürünleri'
    },
    'bulkOffer.totalListed': {
        en: 'Total Listed Price:',
        ar: 'إجمالي السعر المدرج:',
        tr: 'Toplam Listelenen Fiyat:'
    },
    'bulkOffer.yourOffer': {
        en: 'Your Bulk Offer ($)',
        ar: 'عرضك بالجملة ($)',
        tr: 'Toplu Teklifiniz ($)'
    },
    'bulkOffer.placeholder': {
        en: 'Enter your bulk offer',
        ar: 'أدخل عرضك بالجملة',
        tr: 'Toplu teklifinizi girin'
    },
    'bulkOffer.description': {
        en: 'Your bulk offer will be sent via WhatsApp with all item details. Buying in bulk often gets better deals!',
        ar: 'سيتم إرسال عرضك بالجملة عبر واتساب مع جميع تفاصيل العناصر. الشراء بالجملة غالباً ما يحصل على صفقات أفضل!',
        tr: 'Toplu teklifiniz tüm ürün detaylarıyla birlikte WhatsApp üzerinden gönderilecek. Toplu alım genellikle daha iyi fırsatlar sunar!'
    },
    'bulkOffer.cancel': {
        en: 'Cancel',
        ar: 'إلغاء',
        tr: 'İptal'
    },
    'bulkOffer.send': {
        en: 'Send Bulk Offer',
        ar: 'إرسال العرض بالجملة',
        tr: 'Toplu Teklif Gönder'
    },

    // Item Details
    'item.description': {
        en: 'Description',
        ar: 'الوصف',
        tr: 'Açıklama'
    },
    'item.specifications': {
        en: 'Specifications',
        ar: 'المواصفات',
        tr: 'Özellikler'
    },
    'item.contactWhatsApp': {
        en: 'Contact on WhatsApp',
        ar: 'التواصل عبر الواتساب',
        tr: 'WhatsApp\'tan İletişime Geç'
    },
    'item.makeOffer': {
        en: 'Make an Offer',
        ar: 'تقديم عرض',
        tr: 'Teklif Ver'
    },
    'item.addToCart': {
        en: 'Add to Cart',
        ar: 'إضافة إلى السلة',
        tr: 'Sepete Ekle'
    },
    'item.removeFromCart': {
        en: 'Remove from Cart',
        ar: 'إزالة من السلة',
        tr: 'Sepetten Çıkar'
    },
    'item.pickupInfo': {
        en: 'Pickup Information',
        ar: 'معلومات الاستلام',
        tr: 'Alma Bilgisi'
    },
    'item.pickupDescription': {
        en: 'This item is available for pickup only. Please contact the seller to arrange a convenient time.',
        ar: 'هذا العنصر متاح للاستلام فقط. يرجى التواصل مع البائع لترتيب وقت مناسب.',
        tr: 'Bu ürün sadece alma şeklinde mevcuttur. Uygun bir zaman ayarlamak için lütfen satıcıyla iletişime geçin.'
    },

    // Offer Modal
    'offer.title': {
        en: 'Make an Offer',
        ar: 'تقديم عرض',
        tr: 'Teklif Ver'
    },
    'offer.askingPrice': {
        en: 'Asking Price:',
        ar: 'السعر المطلوب:',
        tr: 'İstenen Fiyat:'
    },
    'offer.yourOffer': {
        en: 'Your Offer ($)',
        ar: 'عرضك ($)',
        tr: 'Teklifiniz ($)'
    },
    'offer.placeholder': {
        en: 'Enter your offer',
        ar: 'أدخل عرضك',
        tr: 'Teklifinizi girin'
    },
    'offer.description': {
        en: 'Your offer will be sent via WhatsApp with the item details. The seller can accept, decline, or counter-offer.',
        ar: 'سيتم إرسال عرضك عبر واتساب مع تفاصيل العنصر. يمكن للبائع القبول أو الرفض أو تقديم عرض مضاد.',
        tr: 'Teklifiniz ürün detaylarıyla birlikte WhatsApp üzerinden gönderilecek. Satıcı kabul edebilir, reddedebilir veya karşı teklif verebilir.'
    },
    'offer.cancel': {
        en: 'Cancel',
        ar: 'إلغاء',
        tr: 'İptal'
    },
    'offer.send': {
        en: 'Send Offer',
        ar: 'إرسال العرض',
        tr: 'Teklif Gönder'
    },

    // Footer
    'footer.contact': {
        en: 'Contact me for pickup arrangements and additional questions',
        ar: 'تواصل معي لترتيب الاستلام والأسئلة الإضافية',
        tr: 'Alma düzenlemeleri ve ek sorular için benimle iletişime geçin'
    },

    // Alerts and Errors
    'alert.validPrice': {
        en: 'Please enter a valid price',
        ar: 'يرجى إدخال سعر صحيح',
        tr: 'Lütfen geçerli bir fiyat girin'
    },
    'alert.offerLessThanAsking': {
        en: 'Offer should be less than the asking price',
        ar: 'يجب أن يكون العرض أقل من السعر المطلوب',
        tr: 'Teklif istenen fiyattan az olmalıdır'
    },
    'alert.offerLessThanTotal': {
        en: 'Offer should be less than the total asking price',
        ar: 'يجب أن يكون العرض أقل من إجمالي السعر المطلوب',
        tr: 'Teklif toplam istenen fiyattan az olmalıdır'
    },

    // WhatsApp Messages
    'whatsapp.interestedIn': {
        en: 'Hi! I am interested in the following items from your moving sale:',
        ar: 'مرحبا! أنا مهتم بالعناصر التالية من تصفية الانتقال الخاصة بك:',
        tr: 'Merhaba! Taşınma indiriminizden aşağıdaki ürünlerle ilgileniyorum:'
    },
    'whatsapp.total': {
        en: 'Total:',
        ar: 'المجموع:',
        tr: 'Toplam:'
    },
    'whatsapp.available': {
        en: 'Are these items still available? When can I arrange pickup for all of them?',
        ar: 'هل هذه العناصر ما زالت متوفرة؟ متى يمكنني ترتيب استلام جميعها؟',
        tr: 'Bu ürünler hala mevcut mu? Hepsini ne zaman alabilirim?'
    },
    'whatsapp.bulkOffer': {
        en: 'Hi! I would like to make a bulk offer on the following items from your moving sale:',
        ar: 'مرحبا! أود تقديم عرض بالجملة على العناصر التالية من تصفية الانتقال الخاصة بك:',
        tr: 'Merhaba! Taşınma indiriminizden aşağıdaki ürünler için toplu teklif vermek istiyorum:'
    },
    'whatsapp.listed': {
        en: 'Listed:',
        ar: 'مدرج:',
        tr: 'Listelenen:'
    },
    'whatsapp.totalListedPrice': {
        en: 'Total Listed Price:',
        ar: 'إجمالي السعر المدرج:',
        tr: 'Toplam Listelenen Fiyat:'
    },
    'whatsapp.myBulkOffer': {
        en: 'My Bulk Offer:',
        ar: 'عرضي بالجملة:',
        tr: 'Toplu Teklifim:'
    },
    'whatsapp.bulkOfferAcceptable': {
        en: 'I am interested in purchasing all these items together. Is this bulk offer acceptable? I can arrange pickup for all items at once if you accept.',
        ar: 'أنا مهتم بشراء جميع هذه العناصر معاً. هل هذا العرض بالجملة مقبول؟ يمكنني ترتيب استلام جميع العناصر مرة واحدة إذا قبلت.',
        tr: 'Tüm bu ürünleri birlikte satın almakla ilgileniyorum. Bu toplu teklif kabul edilebilir mi? Kabul ederseniz tüm ürünleri bir seferde alabilirim.'
    },
    'whatsapp.itemOffer': {
        en: 'Hi! I\'d like to make an offer on the',
        ar: 'مرحبا! أود تقديم عرض على',
        tr: 'Merhaba! Aşağıdaki ürün için teklif vermek istiyorum:'
    },
    'whatsapp.listedPrice': {
        en: 'Listed Price:',
        ar: 'السعر المدرج:',
        tr: 'Listelenen Fiyat:'
    },
    'whatsapp.myOffer': {
        en: 'My Offer:',
        ar: 'عرضي:',
        tr: 'Teklifim:'
    },
    'whatsapp.itemLink': {
        en: 'Item Link:',
        ar: 'رابط العنصر:',
        tr: 'Ürün Linki:'
    },
    'whatsapp.offerAcceptable': {
        en: 'Is this offer acceptable? I\'m ready to arrange pickup if you accept.',
        ar: 'هل هذا العرض مقبول؟ أنا مستعد لترتيب الاستلام إذا قبلت.',
        tr: 'Bu teklif kabul edilebilir mi? Kabul ederseniz almaya hazırım.'
    },
    'whatsapp.interestedInItem': {
        en: 'Hi! I\'m interested in the',
        ar: 'مرحبا! أنا مهتم بـ',
        tr: 'Merhaba! Aşağıdaki ürünle ilgileniyorum:'
    },
    'whatsapp.listedFor': {
        en: 'listed for',
        ar: 'مدرج بسعر',
        tr: 'fiyatı'
    },
    'whatsapp.stillAvailable': {
        en: 'Is this item still available? When can I arrange pickup?',
        ar: 'هل هذا العنصر ما زال متوفراً؟ متى يمكنني ترتيب الاستلام؟',
        tr: 'Bu ürün hala mevcut mu? Ne zaman alabilirim?'
    }
};

interface I18nProviderProps {
    children: React.ReactNode;
}

export function I18nProvider({ children }: I18nProviderProps) {
    const [language, setLanguage] = useState<Language>('en');

    useEffect(() => {
        // Load saved language from localStorage
        const savedLanguage = localStorage.getItem('language') as Language;
        if (savedLanguage && ['en', 'ar', 'tr'].includes(savedLanguage)) {
            setLanguage(savedLanguage);
        }
    }, []);

    useEffect(() => {
        // Save language to localStorage
        localStorage.setItem('language', language);

        // Update document language and direction
        document.documentElement.lang = language;
        document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    }, [language]);

    const t = (key: string, params?: Record<string, string | number>): string => {
        const translation = translations[key];
        if (!translation) {
            console.warn(`Translation missing for key: ${key}`);
            return key;
        }

        let text = translation[language] || translation['en'] || key;

        // Replace parameters in the text
        if (params) {
            Object.entries(params).forEach(([param, value]) => {
                text = text.replace(new RegExp(`\\{${param}\\}`, 'g'), String(value));
            });
        }

        return text;
    };

    const isRTL = language === 'ar';

    const value = {
        language,
        setLanguage,
        t,
        isRTL
    };

    return (
        <I18nContext.Provider value={value}>
            {children}
        </I18nContext.Provider>
    );
}

export function useTranslation() {
    const context = useContext(I18nContext);
    if (context === undefined) {
        throw new Error('useTranslation must be used within an I18nProvider');
    }
    return context;
}
