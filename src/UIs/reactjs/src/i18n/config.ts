import i18n from 'i18next';
import en from './en.json';
import tw from './tw.json';
import { initReactI18next } from 'react-i18next';

export const resources = {
    en: {
        translation: en,
    },
    tw: {
        translation: tw,
    },
} as const;

export function setI18nLanguage(lng: string) {
    i18n.changeLanguage(lng);
    localStorage.setItem('lng', lng);
};

i18n.use(initReactI18next).init({
    lng: localStorage.getItem('lng') || 'tw',
    resources,
});