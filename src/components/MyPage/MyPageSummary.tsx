import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import OrderSummarySection from 'components/Order/OrderSummarySection';
import ShoppingSummary from 'components/Order/ShoppingSummary';

const MyPageSummaryContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 36px;
`;

const StyledLink = styled(Link)`
    font-size: 12px;
    letter-spacing: 0px;
    color: #999999;
    opacity: 1;
`;

const MyPageSummary = ({ memberName, orderSummary }: any) => {
    return (
        <div>
            <MyPageSummaryContainer>
                <p style={{ fontSize: '30px' }}>
                    <strong style={{ fontWeight: 'bolder' }}>
                        {memberName}
                    </strong>
                    님, 안녕하세요!
                </p>

                <StyledLink to='/my-page/info'>
                    정보수정 <FontAwesomeIcon icon={faAngleRight} />
                </StyledLink>
            </MyPageSummaryContainer>

            {/* <ShoppingSummary /> */}
            {orderSummary && (
                <OrderSummarySection orderSummary={orderSummary} />
            )}
        </div>
    );
};

export default MyPageSummary;
