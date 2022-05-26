import { RotatingLines } from 'react-loader-spinner';

const Loader = () => {
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
            }}
        >
            <RotatingLines width='100' />
            <p>Loading...</p>
        </div>
    );
};

export default Loader;
