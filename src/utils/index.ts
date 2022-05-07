import { deviceDetect } from 'react-device-detect';

import { PLATFORM_TYPE } from 'api/auth/authentication';

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

export { getPlatform };
