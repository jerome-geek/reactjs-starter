import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

import Header from 'components/shared/Header';
import Button from 'components/Common/Button';
import PATHS from 'const/paths';

const DetailList = styled.ul``;
const DetailListItem = styled.li`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 5px;
`;

const ButtonWrapper = styled.div`
    width: 100%;
    margin-top: 2rem;
`;

// TODO: 주문번호가 유효하지 않거나 잘못된 주문번호일 경우 처리 필요
const GuestOrderDetail = () => {
    const { guestOrderNo } = useParams();
    const navigate = useNavigate();

    if (!guestOrderNo) {
        navigate('/');
    }

    const onCancelOrderClick = () => {
        console.log(
            '주문취소 버튼은 입금대기 / 결제완료 상태인 경우에만 노출됩니다.',
        );
    };

    const onFaqButtonClick = () => {
        navigate(PATHS.FAQ);
    };

    // http://localhost:3000/guest/order/detail/1231231
    return (
        <>
            <Header />
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    padding: '20px',
                    width: '60%',
                    margin: 'auto',
                }}
            >
                <div
                    style={{
                        padding: '10px',
                        border: '1px solid black',
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <span style={{ fontWeight: 'bold' }}>{guestOrderNo}</span>
                    <span>{'(20-10-12-10:10 주문)'}</span>
                </div>
                <div
                    style={{
                        padding: '10px',
                        border: '1px solid black',
                        width: '100%',
                    }}
                >
                    <h2>이체정보111</h2>
                    <DetailList>
                        <DetailListItem>
                            <span>이체금액</span>
                            <span>18,000원</span>
                        </DetailListItem>
                        <DetailListItem>
                            <span>계좌정보</span>
                            <span>기업은행 234314905467</span>
                        </DetailListItem>
                        <DetailListItem>
                            <span>입금기한</span>
                            <span>2021.02.28 23:59까지</span>
                        </DetailListItem>
                    </DetailList>
                </div>

                <div
                    style={{
                        padding: '10px',
                        border: '1px solid black',
                        width: '100%',
                    }}
                >
                    <h2>결제정보</h2>
                    <DetailList>
                        <DetailListItem>
                            <span>총 결제금액</span>
                            <span>18,000원</span>
                        </DetailListItem>
                        <DetailListItem>
                            <span>상품 가격</span>
                            <span>24,000원</span>
                        </DetailListItem>
                        <DetailListItem>
                            <span>배송비</span>
                            <span>3,000원</span>
                        </DetailListItem>
                        <DetailListItem>
                            <span>할인 금액</span>
                            <span>-2,000원</span>
                        </DetailListItem>
                    </DetailList>
                </div>

                <div
                    style={{
                        padding: '10px',
                        border: '1px solid black',
                        width: '100%',
                    }}
                >
                    <h2>배송정보</h2>
                    <DetailList>
                        <DetailListItem>
                            <span>받는 사람</span>
                            <span>이순원</span>
                        </DetailListItem>
                        <DetailListItem>
                            <span>주소</span>
                            <span>서울시 강서구 대지로82 22-3</span>
                        </DetailListItem>
                        <DetailListItem>
                            <span>전화번호</span>
                            <span>01073775819</span>
                        </DetailListItem>
                    </DetailList>

                    <ButtonWrapper>
                        <Button
                            style={{
                                color: 'black',
                                backgroundColor: 'white',
                                border: '1px solid black',
                                width: '50%',
                                padding: '10px',
                                cursor: 'pointer',
                            }}
                            onClick={onCancelOrderClick}
                        >
                            주문취소
                        </Button>
                        <Button
                            style={{
                                color: 'white',
                                backgroundColor: 'black',
                                border: '1px solid black',
                                width: '50%',
                                padding: '10px',
                                cursor: 'pointer',
                            }}
                            onClick={onFaqButtonClick}
                        >
                            FAQ 바로가기
                        </Button>
                    </ButtonWrapper>
                </div>
            </div>
        </>
    );
};

export default GuestOrderDetail;
