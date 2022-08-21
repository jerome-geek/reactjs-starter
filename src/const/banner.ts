const BANNER = Object.freeze({
    mainBandBanner: process.env.NODE_ENV === 'development' ? '000' : '',
    mainCategoryBanner: process.env.NODE_ENV === 'development' ? '004' : '',
});

export default BANNER;
