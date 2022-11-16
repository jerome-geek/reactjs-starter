const BANNER = {
    MAIN_BAND_BANNER: process.env.REACT_APP_MODE === 'development' ? '006' : '',
    MAIN_WEB_BANNER: process.env.REACT_APP_MODE === 'development' ? '000' : '',
    MAIN_MOBILE_BANNER:
        process.env.REACT_APP_MODE === 'development' ? '005' : '',
    MAIN_CATEGORY_BANNER:
        process.env.REACT_APP_MODE === 'development' ? '004' : '',
    MAIN_ETC_BANNER: process.env.REACT_APP_MODE === 'development' ? '008' : '',
    VC_MANAGER: process.env.REACT_APP_MODE === 'development' ? '009' : '',
    VC_MANUAL: process.env.REACT_APP_MODE === 'development' ? '010' : '',
    VC_GOLF_COURSE: process.env.REACT_APP_MODE === 'development' ? '011' : '',
};

export default BANNER;
