import i18n, { Resource } from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as ko from 'locales/ko';
import * as jp from 'locales/jp';

const resources: Resource = {
    'ko-KR': {
        ...ko,
    },
    'ja-JP': {
        ...jp,
    },
} as const;

i18n.use(initReactI18next).init({
    resources,
    lng: 'ko-KR',
    fallbackLng: {
        'ko-KR': ['ko-KR'],
        default: ['ko-KR'],
    },
    debug: true,
    keySeparator: false,
    interpolation: {
        escapeValue: false,
    },
    react: {
        useSuspense: false,
    },
});

export default i18n;
