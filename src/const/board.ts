const BOARD = {
    NOTICE: process.env.REACT_APP_MODE === 'development' ? '8064' : '',
    FAQ: process.env.REACT_APP_MODE === 'development' ? '9216' : '',
    MANUAL: process.env.REACT_APP_MODE === 'development' ? '9235' : '',
};

export default BOARD;
