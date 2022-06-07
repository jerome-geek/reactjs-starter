import { deviceDetect } from 'react-device-detect';

import { PLATFORM_TYPE } from 'models';

const getPlatform = (): PLATFORM_TYPE => {
    const device = deviceDetect(navigator.userAgent);
    if (device.isMobile) {
        if (device.os === 'iOS') {
            return PLATFORM_TYPE.IOS;
        }
        if (device.os === 'android') {
            return PLATFORM_TYPE.AOS;
        }
    }

    // TODO: PC인지 모바일 웹인지 확인 필요
    return PLATFORM_TYPE.PC;
};

/**
 * 빈 객체인지 확인
 * - 배열도 Object이므로 true를 반환하기 때문에, 추가로 Constructor도 확인한다
 *
 * @param {Object} obj
 * @returns Boolean
 */
const isEmptyObject = (obj: object) => {
    return obj && obj.constructor === Object && Object.keys(obj).length === 0;
};

export { getPlatform, isEmptyObject };
