import styled from 'styled-components';

import media from 'utils/styles/media';

const RequestResultProgressContainer = styled.ul`
    width: 100%;
    background: ${(props) => props.theme.bg2};
    padding: 19px 0;
    display: flex;
    justify-content: space-between;
    letter-spacing: 0;
`;

const RequestResultProgress = styled.li`
    border-right: ${(props) => `1px dashed ${props.theme.line2}`};
    width: 33.333%;
    padding: 8px 0;
    &:last-child {
        border-right: none;
    }
`;

const RequestResultStatus = styled.p`
    color: #999;
    font-size: 0.75rem;
    margin-bottom: 10px;
    ${media.xlarge} {
        font-size: 0.857rem;
    }
    ${media.medium} {
        font-size: 1rem;
    }
`;

const RequestResultCount = styled.p`
    font-size: 1.5rem;
    font-weight: 500;
    display: flex;
    justify-content: center;
    align-items: center;
    ${media.medium} {
        font-size: 1.666rem;
    }
    > span {
        font-weight: 400;
        margin-left: 8px;
        color: ${(props) => props.theme.text3};
        font-size: 0.75rem;
        ${media.xlarge} {
            font-size: 0.857rem;
        }
        ${media.medium} {
            font-size: 1rem;
        }
    }
`;

interface RequestProgress {
    status: string;
    count: number | string;
}

const RequestResult = ({
    requestProgressData,
}: {
    requestProgressData?: Array<RequestProgress>;
}) => {
    return (
        <RequestResultProgressContainer>
            {requestProgressData?.map(({ status, count }) => {
                return (
                    <RequestResultProgress>
                        <RequestResultStatus>{status}</RequestResultStatus>
                        <RequestResultCount>
                            {count}
                            <span>건</span>
                        </RequestResultCount>
                    </RequestResultProgress>
                );
            })}
        </RequestResultProgressContainer>
    );
};

export default RequestResult;
