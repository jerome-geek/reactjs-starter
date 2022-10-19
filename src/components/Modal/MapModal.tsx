import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import Modal, { ModalDefaultType } from 'components/Modal/Modal';
import KaKaoMap from 'components/shared/Map';
import media from 'utils/styles/media';
import { copyLink } from 'utils/share';

const ModalContainer = styled.div`
    width: 100%;
    padding: 52px;
    text-align: center;
    display: flex;
    flex-direction: column;
    ${media.medium} {
        padding: 38px 20px;
        text-align: left;
    }
`;

const Title = styled.h2`
    font-size: 1.5rem;
    font-weight: bold;
    letter-spacing: -1.2px;
    color: ${(props) => props.theme.text1};
    width: 100%;
    margin-top: 8px;
    margin-bottom: 10px;
    ${media.medium} {
        margin-bottom: 20px;
        font-size: 1.333rem;
        letter-spacing: -0.8px;
    }
`;

const AddressContainer = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
    margin-bottom: 26px;
    ${media.medium} {
        order: 2;
        margin-bottom: 0;
        margin-top: 10px;
    }
`;

const Address = styled.p`
    color: ${(props) => props.theme.text2};
    line-height: 24px;
    ${media.medium} {
        font-size: 1.1666rem;
        line-height: 20px;
    }
`;

const CopyButton = styled.button`
    cursor: pointer;
    padding: 0;
    margin: 0 0 0 10px;
    text-decoration: underline;
    font-size: 1rem;
    ${media.medium} {
        font-size: 1.1666rem;
        color: ${(props) => props.theme.text2};
    }
`;

const MapContainer = styled.div`
    width: 100%;
    height: 400px;
    > div {
        width: 100%;
        height: inherit;
    }
    ${media.medium} {
        height: 252px;
    }
`;

interface MapModalType {
    address: string;
    agencyName: string;
}

const MapModal = ({
    width,
    height,
    onClickToggleModal,
    address,
    agencyName,
}: ModalDefaultType & MapModalType) => {
    const { t: agency } = useTranslation('agency');
    return (
        <Modal
            onClickToggleModal={onClickToggleModal}
            width={width}
            height={height}
        >
            <ModalContainer>
                <Title>{agencyName}</Title>
                <AddressContainer>
                    <Address>{address}</Address>
                    <CopyButton
                        onClick={() => {
                            copyLink({
                                copiedLink: address,
                            });
                        }}
                    >
                        {agency('copy')}
                    </CopyButton>
                </AddressContainer>
                <MapContainer>
                    <KaKaoMap address={address} />
                </MapContainer>
            </ModalContainer>
        </Modal>
    );
};

export default MapModal;
