const BANNER = {
    MAIN_BAND_BANNER: process.env.NODE_ENV === 'development' ? '006' : '',
    MAIN_WEB_BANNER: process.env.NODE_ENV === 'development' ? '000' : '',
    MAIN_MOBILE_BANNER: process.env.NODE_ENV === 'development' ? '005' : '',
    MAIN_CATEGORY_BANNER: process.env.NODE_ENV === 'development' ? '004' : '',
    MAIN_ETC_BANNER: process.env.NODE_ENV === 'development' ? '008' : '',
};

export default BANNER;
