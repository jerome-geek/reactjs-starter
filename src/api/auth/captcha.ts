import { AxiosResponse } from 'axios';

import request from 'api/core';

interface CaptchaImageBody {
    code: String;
    key: String;
}

const captcha = {
    generateCaptchaImage: ({ key }: { key: string }): Promise<AxiosResponse> =>
        request({ url: '/captcha/image', data: { key } }),

    checkCaptchaImage: ({
        code,
        key,
    }: CaptchaImageBody): Promise<AxiosResponse> =>
        request({
            method: 'POST',
            url: '/captcha/verify',
            data: { code, key },
        }),
};

export default captcha;
