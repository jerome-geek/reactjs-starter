import { FC, HTMLAttributes, Suspense, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { useWindowSize } from 'usehooks-ts';

import Header from 'components/shared/Header';
import MobileHeader from 'components/shared/MobileHeader';
import Loader from 'components/shared/Loader';
import Footer from 'components/shared/Footer';
import { isDesktop } from 'utils/styles/responsive';

interface DefaultLayoutProps extends HTMLAttributes<HTMLDivElement> {}

const DefaultLayout: FC<DefaultLayoutProps> = ({ children }) => {
    const location = useLocation();

    const { width } = useWindowSize();

    const isMobileHeaderVisible = useMemo(
        () => ['/search'].includes(location.pathname) && !isDesktop(width),
        [location.pathname, width],
    );

    return (
        <div>
            {/* TODO: 페이지마다 MobileHeader의 title 속성에 값을 지정해주어야함 */}
            {isMobileHeaderVisible ? <MobileHeader title='' /> : <Header />}

            <Suspense fallback={<Loader />}>{children}</Suspense>
            <Footer />
        </div>
    );
};

export default DefaultLayout;
