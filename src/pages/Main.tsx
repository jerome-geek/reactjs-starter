import { useState } from 'react';

import Header from 'components/shared/Header';
import BandBanner from 'components/shared/BandBanner';

const Main = () => {
    const [bandBannerVisible, setBandBannerVisible] = useState(true);

    const onBandBannerCloseClick = () => {
        setBandBannerVisible(false);
    };

    return (
        <>
            <Header />
            {bandBannerVisible && (
                <BandBanner
                    title='신제품 출시 이벤트'
                    url='/'
                    onCloseClick={onBandBannerCloseClick}
                />
            )}

            <div>메인페이지입니다</div>
        </>
    );
};

export default Main;
