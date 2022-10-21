import { getPlatform } from 'utils';
import { tokenStorage } from 'utils/storage';

const accessTokenInfo = tokenStorage.getAccessToken();

const payment = {
    setConfiguration: () =>
        window.NCPPay.setConfiguration({
            clientId: process.env.REACT_APP_CLIENT_ID,
            confirmUrl: `${window.location.origin}/order/complete`,
            platform: getPlatform(),
            accessToken: accessTokenInfo?.accessToken || '',
        }),

    reservation: (paymentData: any) => {
        if (!window.NCPPay) {
            throw new Error('ncp_pay 스크립트를 로드해주세요.');
        }

        window.NCPPay.reservation(paymentData);
    },
};

export default payment;
