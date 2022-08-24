const CATEGORY = {
    RANGE_FINDER: process.env.NODE_ENV === 'development' ? 103723 : 0,
    LAUNCH_MONITOR: process.env.NODE_ENV === 'development' ? 103724 : 0,
    ACCESSORY: process.env.NODE_ENV === 'development' ? 103731 : 0,
};

export default CATEGORY;
