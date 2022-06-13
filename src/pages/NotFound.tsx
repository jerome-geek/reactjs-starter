import Lottie from 'lottie-react';
import { useNavigate } from 'react-router-dom';

import Button from 'components/Common/Button';
import paths from 'const/paths';
import notFoundAnimation from 'assets/lottie/91191-404-notfound.json';

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                width: '100vw',
                height: '100vh',
            }}
        >
            <Lottie animationData={notFoundAnimation} loop autoplay />
            <div style={{ marginTop: '2rem' }}>
                <Button onClick={() => navigate(paths.MAIN)}>
                    홈으로 가기
                </Button>
            </div>
        </div>
    );
};

export default NotFound;
