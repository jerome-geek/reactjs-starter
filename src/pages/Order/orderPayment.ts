import { getPlatform } from 'utils';
import { tokenStorage } from 'utils/storage';

const accessTokenInfo = tokenStorage.getAccessToken();

const orderPayment = {
    setConfiguration: () =>
        window.NCPPay.setConfiguration({
            clientId: process.env.REACT_APP_CLIENT_ID,
            confirmUrl: `${window.location.origin}/order/complete`,
            platform: getPlatform(),
            accessToken: accessTokenInfo?.accessToken || '',
        }),
    reservation: (paymentData: any) => {
        window.NCPPay.reservation(paymentData);
    },
};

export default orderPayment;
