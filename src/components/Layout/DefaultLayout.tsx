import { FC, HTMLAttributes, Suspense, useMemo } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useWindowSize } from 'usehooks-ts';
import { isEmpty, keys, toArray } from '@fxts/core';

import Header from 'components/shared/Header';
import MobileHeader from 'components/shared/MobileHeader';
import Loader from 'components/shared/Loader';
import Footer from 'components/shared/Footer';
import { isDesktop } from 'utils/styles/responsive';
import PATHS from 'const/paths';

interface DefaultLayoutProps extends HTMLAttributes<HTMLDivElement> {}

const DefaultLayout: FC<DefaultLayoutProps> = ({ children }) => {
    const params = useParams();
    const location = useLocation();

    const { width } = useWindowSize();

    const headerTitle = {
        [PATHS.GUEST_LOGIN]: '비회원 주문 조회',
        [PATHS.GUEST_ORDER_DETAIL]: '주문상세',
        [PATHS.FIND_ID]: '아이디 찾기',
        [PATHS.FIND_PASSWORD]: '비밀번호 찾기',
        [PATHS.JOIN_AGREEMENT]: '회원가입',
        [PATHS.JOIN]: '회원가입',
        [PATHS.JOIN_COMPLETED]: '회원가입',
        [PATHS.MANAGER]: '보이스캐디 매니저',
        [PATHS.MANUAL_DETAIL]: 'T9', // TODO: 상품명이 나와야함
        [PATHS.MY_INQUIRY]: '1:1 문의',
        [PATHS.INQUIRY]: '1:1 문의',
        [PATHS.CART]: '장바구니',
        [PATHS.ORDER]: '주문서',
    };

    const headerTitleList = toArray(keys(headerTitle));

    const currentPath = useMemo(
        () =>
            isEmpty(params)
                ? location.pathname
                : location.pathname.slice(
                      0,
                      location.pathname.lastIndexOf('/'),
                  ),
        [params, location.pathname],
    );

    const isMobileHeaderVisible = useMemo(
        () => !isDesktop(width) && headerTitleList.includes(currentPath),
        [width, currentPath, headerTitleList],
    );

    return (
        <div>
            {isMobileHeaderVisible ? (
                <MobileHeader title={headerTitle[currentPath] ?? ''} />
            ) : (
                <Header />
            )}

            <Suspense fallback={<Loader />}>{children}</Suspense>

            <Footer />
        </div>
    );
};

export default DefaultLayout;
