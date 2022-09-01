import { useNavigate } from 'react-router-dom';

const GoBackButton = () => {
    const navigate = useNavigate();
    return <div onClick={() => navigate(-1)}>{'<'}</div>;
};

export default GoBackButton;
