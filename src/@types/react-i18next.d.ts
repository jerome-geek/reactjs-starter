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
            orderSheet: typeof ko.orderSheet;
            orderComplete: typeof ko.orderComplete;
            inquiry: typeof ko.inquiry;
            myInquiry: typeof ko.myInquiry;
            courseDetail: typeof ko.courseDetail;
            courseRequest: typeof ko.courseRequest;
            courseList: typeof ko.courseList;
            serviceCenter: typeof ko.serviceCenter;
            agency: typeof ko.agency;
            myPageInfo: typeof ko.myPageInfo;
            // about: typeof ko.about;
            //   about: typeof ko
        };
    }
}
