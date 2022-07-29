import styled from 'styled-components';

const DiscountApplyContainer = styled.div`
    border-top: 2px solid #222943;
    border-bottom: 2px solid #222943;
`;

const SheetInputWrapper = styled.div`
    display: flex;
    border-bottom: 1px solid #dbdbdb;
    text-align: left;
    min-height: 104px;
    &:last-child {
        border-bottom: none;
    }
`;

const SheetInputTitleBox = styled.div`
    width: 200px;
    padding: 44px 0 40px 41px;
    display: flex;
    flex-direction: column;
`;

const SheetInputBox = styled.div`
    width: 440px;
    padding-top: 30px;
    padding-bottom: 20px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    align-items: center;
    color: ${(props) => props.theme.text1};
`;

const SheetTextInput = styled.input<{ inputWidth?: string }>`
    letter-spacing: -0.64px;
    font-weight: 400;
    height: 44px;
    width: ${(props) => (props.inputWidth ? props.inputWidth : '100%')};
    padding: 0 20px;
    min-height: 44px;
    margin-bottom: 10px;
    background: #f8f8fa;
    &::placeholder {
        color: #a8a8a8;
    }
    &:focus {
        border: 1px solid red;
    }
`;

const SheetButton = styled.div<{ width: string }>`
    width: ${(props) => props.width};
    height: 44px;
    line-height: 44px;
    text-align: center;
    color: #fff;
    background: #222943;
    margin-bottom: 10px;
    cursor: pointer;
`;

const DiscountApply = () => {
    return (
        <DiscountApplyContainer>
            <SheetInputWrapper>
                <SheetInputTitleBox>할인 쿠폰</SheetInputTitleBox>
                <SheetInputBox>
                    <SheetTextInput inputWidth='75%' disabled={true} />
                    <SheetButton width='20.4%'>적용</SheetButton>
                </SheetInputBox>
            </SheetInputWrapper>
        </DiscountApplyContainer>
    );
};

export default DiscountApply;
