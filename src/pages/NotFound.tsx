import Lottie from 'lottie-react';
import notFoundAnimation from 'assets/lottie/91191-404-notfound.json';

const NotFound = () => (
    <div
        style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100vw',
            height: '100vh',
        }}
    >
        <Lottie animationData={notFoundAnimation} loop autoplay />
    </div>
);

export default NotFound;
