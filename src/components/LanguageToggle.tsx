'use client';

import { useTranslation, Language } from '@/context/I18nContext';
import { useState } from 'react';

const languages = [
    {
        code: 'en' as Language,
        name: 'English',
        flag: '🇺🇸',
        nativeName: 'English'
    },
    {
        code: 'ar' as Language,
        name: 'Arabic',
        flag: '🇸🇦',
        nativeName: 'العربية'
    },
    {
        code: 'tr' as Language,
        name: 'Turkish',
        flag: '🇹🇷',
        nativeName: 'Türkçe'
    }
];

export default function LanguageToggle() {
    const { language, setLanguage, isRTL } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);

    const currentLanguage = languages.find(lang => lang.code === language) || languages[0];

    const handleLanguageChange = (newLanguage: Language) => {
        setLanguage(newLanguage);
        setIsOpen(false);
    };

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                aria-label="Select language"
            >
                <span className="text-lg">{currentLanguage.flag}</span>
                <span className="hidden sm:inline">{currentLanguage.nativeName}</span>
                <svg
                    className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''} ${isRTL ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {isOpen && (
                <>
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 z-10"
                        onClick={() => setIsOpen(false)}
                    />

                    {/* Dropdown */}
                    <div className={`absolute z-20 mt-1 w-48 bg-white border border-gray-300 rounded-lg shadow-lg ${isRTL ? 'left-0' : 'right-0'}`}>
                        <div className="py-1">
                            {languages.map((lang) => (
                                <button
                                    key={lang.code}
                                    onClick={() => handleLanguageChange(lang.code)}
                                    className={`w-full flex items-center gap-3 px-4 py-2 text-sm text-left hover:bg-gray-100 transition-colors ${language === lang.code
                                        ? 'bg-blue-50 text-blue-700 font-medium'
                                        : 'text-gray-700'
                                        } ${isRTL ? 'text-right' : 'text-left'}`}
                                    dir={lang.code === 'ar' ? 'rtl' : 'ltr'}
                                >
                                    <span className="text-lg">{lang.flag}</span>
                                    <div className="flex-1">
                                        <div className="font-medium">{lang.nativeName}</div>
                                        <div className="text-xs text-gray-500">{lang.name}</div>
                                    </div>
                                    {language === lang.code && (
                                        <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
