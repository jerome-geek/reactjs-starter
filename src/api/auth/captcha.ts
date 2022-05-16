import { AxiosResponse } from 'axios';

import request from 'api/core';

interface CaptchaImage {
    code: string;
    key: string;
}

const captcha = {
    generateCaptchaImage: ({
        key,
    }: Omit<CaptchaImage, 'code'>): Promise<AxiosResponse> =>
        request({ url: '/captcha/image', data: { key } }),

    checkCaptchaImage: ({ code, key }: CaptchaImage): Promise<AxiosResponse> =>
        request({
            method: 'POST',
            url: '/captcha/verify',
            data: { code, key },
        }),
};

export default captcha;
