import 'react-i18next';
// import all namespaces (for the default language, only)
import * as ko from 'locales/ko';

// react-i18next versions higher than 11.11.0
declare module 'react-i18next' {
    // and extend them!
    interface CustomTypeOptions {
        // custom namespace type if you changed it
        // defaultNS: "main";
        // custom resources type
        resources: {
            main: typeof ko.main;
            manager: typeof ko.manager;
            manual: typeof ko.manual;
            productDetail: typeof ko.productDetail;
            // about: typeof ko.about;
            //   about: typeof ko
        };
    }
}
