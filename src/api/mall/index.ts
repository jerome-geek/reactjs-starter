import request from '../core';

const mall = {
    getMall: () => request({ method: 'GET', url: '/malls' }),
    getMallPartners: () => request({ method: 'GET', url: '/malls/partners' }),
    getSslInfo: () => request({ method: 'GET', url: '/malls/ssl' }),
};

export default mall;
