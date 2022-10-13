import { FC } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { filter, head, pipe, toArray } from '@fxts/core';

import Checkbox from 'components/Input/Checkbox';

interface OrderTermsAgreementProps {
    isLogin?: boolean;
    orderTerms: { id: string; url: ''; isChecked: boolean }[];
    isAllOrderTermsChecked: boolean;
    agreeHandler: (term: string) => void;
    agreeAllHandler: (checked: boolean) => void;
}

const StyledContainer = styled.div`
    width: 100%;
    border: 1px solid #d1d2d2;
    padding-left: 30px;
    padding-right: 30px;

    > div {
        &:not(:last-child) {
            border-bottom: ${(props) => `1px dashed ${props.theme.text3}`};
        }
        padding: 30px 50px;
    }
`;

const Title = styled.p`
    color: #a8a8a8;
    font-size: 12px;
    line-height: 18px;
    letter-spacing: -0.48px;
    font-weight: normal;
`;

const CheckboxContainer = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 20px;
`;

const CheckboxContent = styled.p`
    margin-left: 10px;
    font-size: 12px;
    letter-spacing: -0.48px;
    line-height: 18px;

    & > span {
        color: #a8a8a8;
    }
`;

const StyledLink = styled(Link)`
    font-size: 10px;
    line-height: 16px;
    letter-spacing: 0;
    text-decoration: underline;
    color: #8c8c8c;
    margin-left: 10px;
`;

const OrderTermsAgreement: FC<OrderTermsAgreementProps> = ({
    isLogin = false,
    agreeHandler,
    orderTerms,
    agreeAllHandler,
    isAllOrderTermsChecked,
}) => {
    const { t: orderSheet } = useTranslation('orderSheet');

    const isTermChecked = (id: string) =>
        pipe(
            orderTerms,
            filter((a) => a.id === id),
            toArray,
            head,
        );

    return (
        <StyledContainer>
            {!isLogin && (
                <div>
                    <Title
                        dangerouslySetInnerHTML={{
                            __html: orderSheet('etc.guestAlert'),
                        }}
                    />
                </div>
            )}

            {!isLogin && (
                <div>
                    <CheckboxContainer>
                        <Checkbox
                            shape='square'
                            onClick={(e) =>
                                agreeAllHandler(e.currentTarget.checked)
                            }
                            checked={isAllOrderTermsChecked}
                        >
                            <CheckboxContent>전체동의</CheckboxContent>
                        </Checkbox>
                    </CheckboxContainer>

                    <CheckboxContainer>
                        <Checkbox
                            shape='square'
                            onClick={() => agreeHandler('agreeOrderService')}
                            checked={
                                isTermChecked('agreeOrderService')?.isChecked
                            }
                        >
                            <CheckboxContent>
                                서비스 이용약관 동의 <span>(필수)</span>
                            </CheckboxContent>
                        </Checkbox>
                        <StyledLink to='/'>자세히보기</StyledLink>
                    </CheckboxContainer>
                    <CheckboxContainer style={{ marginBottom: '0px' }}>
                        <Checkbox
                            shape='square'
                            onClick={() =>
                                agreeHandler('agreeOrderInformation')
                            }
                            checked={
                                isTermChecked('agreeOrderInformation')
                                    ?.isChecked
                            }
                        >
                            <CheckboxContent>
                                개인정보 처리방침 <span>(필수)</span>
                            </CheckboxContent>
                        </Checkbox>
                        <StyledLink to='/'>자세히보기</StyledLink>
                    </CheckboxContainer>
                </div>
            )}

            <div>
                <CheckboxContainer
                    style={{
                        marginBottom: '0px',
                        justifyContent: 'center',
                        alignItems: 'flex-start',
                    }}
                >
                    <Checkbox
                        shape='square'
                        onClick={() => agreeHandler('agreePurchase')}
                        checked={isTermChecked('agreePurchase')?.isChecked}
                    >
                        <CheckboxContent>
                            주문할 제품의 거래조건을 확인 하였으며,
                            <br /> 구매에 동의하시겠습니까 ? <span>(필수)</span>
                        </CheckboxContent>
                    </Checkbox>
                </CheckboxContainer>
            </div>
        </StyledContainer>
    );
};

export default OrderTermsAgreement;
