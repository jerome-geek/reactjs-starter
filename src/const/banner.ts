const BANNER = Object.freeze({
    mainBannerWeb: process.env.NODE_ENV === 'development' ? '000' : '',
    mainBannerMobile: process.env.NODE_ENV === 'development' ? '005' : '',
    mainCategoryBanner: process.env.NODE_ENV === 'development' ? '004' : '',
});

export default BANNER;
