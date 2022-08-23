import styled from 'styled-components';

const ProductCardWrapper = styled.div`
    width: 250px;
    height: 300px;
    background: #f8f8fa 0% 0% no-repeat padding-box;
    box-shadow: 2px 2px 4px #0000001a;
    border: 4px solid #f8f8fa;
    opacity: 1;
`;

const ProductCardTitle = styled.p`
    text-align: left;
    letter-spacing: 0pt;
    color: #191919;
    opacity: 1;
    font-size: 20px;
`;

const ProductCardDesc = styled.p`
    text-align: left;
    letter-spacing: 0pt;
    color: #999999;
    opacity: 1;
    font-size: 10px;
    padding-top: 2px;
`;

const GenuineProductCard = () => {
    return (
        <ProductCardWrapper>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                }}
            >
                <img
                    src='//rlyfaazj0.toastcdn.net/20220623/164839.485302000/thumb-1583508427_3492_vc4_298x436.png'
                    style={{ width: '190px', height: '190px' }}
                    alt='VC4'
                />
            </div>
            <div
                style={{
                    padding: '14px 16px',
                    background: '#F0F0F3 0% 0% no-repeat padding-box',
                    width: '250px',
                    height: '85px',
                }}
            >
                <ProductCardTitle>CL2 Green</ProductCardTitle>
                <ProductCardDesc>
                    시리얼 번호 : E79051HON232123232
                </ProductCardDesc>
            </div>
        </ProductCardWrapper>
    );
};

export default GenuineProductCard;
