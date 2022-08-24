import { PropsWithChildren } from 'react';
import { useLocation } from 'react-router-dom';
import { useIsomorphicLayoutEffect } from 'usehooks-ts';

const ScrollToTop = ({ children }: PropsWithChildren) => {
    const { pathname } = useLocation();

    useIsomorphicLayoutEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth',
        });
    }, [pathname]);

    return <>{children}</>;
};

export default ScrollToTop;
