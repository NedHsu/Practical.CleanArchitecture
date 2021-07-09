import i18n from 'i18next';
import translation from './en/translation.json';
import tw from './zh-TW/translation.json';
import { initReactI18next } from 'react-i18next';

export const resources = {
    en: {
        translation,
    },
    tw: {
        tw,
    },
} as const;

i18n.use(initReactI18next).init({
    lng: 'en',
    resources,
});