const BOARD = {
    NOTICE: process.env.NODE_ENV === 'development' ? '8064' : '',
    FAQ: process.env.NODE_ENV === 'development' ? '9061' : '',
    MANUAL: process.env.NODE_ENV === 'development' ? '9235' : '',
};

export default BOARD;
