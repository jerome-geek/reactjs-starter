import { Link, NavLink } from 'react-router-dom';
import styled from 'styled-components';

import { useCart, useMember } from 'hooks';
import media from 'utils/styles/media';
import PATHS from 'const/paths';
import categoryNo from 'const/category';
import { ReactComponent as HeaderLogo } from 'assets/logo/headerLogo.svg';
import { ReactComponent as MyPageIcon } from 'assets/icons/person.svg';
import { ReactComponent as SearchIcon } from 'assets/icons/search.svg';
import { ReactComponent as CartIcon } from 'assets/icons/cart.svg';

const HeaderContainer = styled.header`
    background-color: #fff;
    box-shadow: 0 3px 5px #999;
    padding: 34px 80px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
`;

const LogoContainer = styled.div``;

const NavContainer = styled.nav`
    ${media.medium} {
        display: none;
    }

    & > a {
        padding: 0 45px;
    }
`;

const IconContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    & > a {
        position: relative;

        :not(:last-child) {
            margin-right: 1.5rem;
        }
    }

    ${media.medium} {
        display: none;
    }
`;

const CartCount = styled.div`
    position: absolute;
    right: 0;
    bottom: 0;
    background-color: #c00020;
    border-radius: 50%;
    width: 12px;
    height: 12px;
    font-size: 10px;
    text-align: center;
    color: #fff;
`;

const Header = () => {
    const { member } = useMember();

    const { cartInfo } = useCart();

    return (
        <HeaderContainer>
            <LogoContainer>
                <Link to='/'>
                    <HeaderLogo />
                </Link>
            </LogoContainer>

            <NavContainer>
                <NavLink to={`/product/${categoryNo.rangeFinder}`}>
                    거리 측정기
                </NavLink>
                <NavLink to={`/product/${categoryNo.launchMonitor}`}>
                    론치 모니터
                </NavLink>
                <NavLink to={`/product/${categoryNo.accessory}`}>
                    액세서리
                </NavLink>
                <NavLink to={PATHS.FAQ}>고객 서비스</NavLink>
                <NavLink to='/'>VSE</NavLink>
            </NavContainer>

            <IconContainer>
                <Link to={member ? PATHS.MY_PAGE : PATHS.LOGIN}>
                    <MyPageIcon />
                </Link>
                <Link to={PATHS.SEARCH}>
                    <SearchIcon />
                </Link>
                <Link to={PATHS.CART}>
                    <CartIcon />
                    <CartCount>{cartInfo?.deliveryGroups.length}</CartCount>
                </Link>
            </IconContainer>
        </HeaderContainer>
    );
};

export default Header;
