import { FC } from 'react';
import styled from 'styled-components';

import GoBackButton from 'components/Button/GoBackButton';

interface MobileHeaderProps {
    title: string;
}

const MobileHeaderContainer = styled.div`
    padding: 24px;
    position: relative;
    text-align: center;
`;

const MobileHeaderTitle = styled.h1`
    font-size: 16px;
    line-height: 24px;
    letter-spacing: -0.8px;
    color: #191919;
    font-weight: bold;
`;

const MobileHeader: FC<MobileHeaderProps> = ({ title }) => {
    return (
        <MobileHeaderContainer>
            <GoBackButton
                style={{ position: 'absolute', left: '24px' }}
                backUrl='/'
            />
            {title && <MobileHeaderTitle>{title}</MobileHeaderTitle>}
        </MobileHeaderContainer>
    );
};

export default MobileHeader;
