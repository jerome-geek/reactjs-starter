import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import {
    faCartShopping,
    faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import paths from 'const/paths';

const Header = () => {
    const [isLogin, setIsLogin] = useState(false);
    const [userName, setUserName] = useState('이윤환');

    const headerStyle = {
        background: '#fff',
        boxShadow: '0 3px 5px #999',
    };
    const headerContainerStyle = {
        // display: 'flex',
        justifyContent: 'space-between',
        padding: '25px 10px 25px 10px',
    };
    const headerLeftStyle = { cssFloat: 'left', display: 'block' };
    const navContainerStyle = {
        cssFloat: 'left',
        marginLeft: '40px',
        display: 'block',
    };
    const navBoxStyle = { marginLeft: '10px' };
    const headerRightStyle = { cssFloat: 'right', display: 'flex' };
    const headerRightBoxStyle = { marginRight: '10px' };

    return (
        <header style={headerStyle}>
            <div style={headerContainerStyle}>
                <div style={headerLeftStyle}>
                    <h1>
                        <Link to='/'>VOICE CADDIE</Link>
                    </h1>
                </div>
                <nav style={navContainerStyle}>
                    <NavLink style={navBoxStyle} to='/'>
                        거리 측정기
                    </NavLink>
                    <NavLink style={navBoxStyle} to='/'>
                        론치 모니터
                    </NavLink>
                    <NavLink style={navBoxStyle} to='/'>
                        액세서리
                    </NavLink>
                    <NavLink style={navBoxStyle} to='/'>
                        고객 서비스
                    </NavLink>
                    <NavLink style={navBoxStyle} to='/'>
                        VSE
                    </NavLink>
                </nav>
                <div style={headerRightStyle}>
                    {isLogin ? (
                        <Link style={headerRightBoxStyle} to='/'>
                            {userName}
                        </Link>
                    ) : (
                        <Link style={headerRightBoxStyle} to='/member/login'>
                            로그인
                        </Link>
                    )}
                    <Link style={headerRightBoxStyle} to={paths.SEARCH}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </Link>
                    <Link style={headerRightBoxStyle} to={paths.CART}>
                        <FontAwesomeIcon icon={faCartShopping} />
                    </Link>
                </div>
                <div className='after' style={{ clear: 'both' }}></div>
            </div>
        </header>
    );
};

export default Header;
