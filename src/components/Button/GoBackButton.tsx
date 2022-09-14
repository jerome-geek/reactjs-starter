import { FC, HTMLAttributes } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';

import Button from 'components/Common/Button';

interface GoBackButtonProps extends HTMLAttributes<HTMLButtonElement> {
    backUrl?: string;
}

const GoBackButton: FC<GoBackButtonProps> = ({ backUrl = '', ...props }) => {
    const navigate = useNavigate();

    const onButtonClick = (backUrl: string) => {
        backUrl ? navigate(backUrl) : navigate(-1);
    };

    return (
        <Button
            color='#191919'
            onClick={() => onButtonClick(backUrl)}
            {...props}
        >
            <FontAwesomeIcon icon={faAngleLeft} />
        </Button>
    );
};

export default GoBackButton;
