import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { useTranslation } from 'react-i18next';

import { product } from 'api/product';
import PrimaryButton from 'components/Button/PrimaryButton';
import SecondaryButton from 'components/Button/SecondaryButton';
import SEOHelmet from 'components/shared/SEOHelmet';

const ManualDetail = () => {
    const { t: manual } = useTranslation('manual');
    const { productNo } = useParams();

    const { data } = useQuery(
        ['product', productNo],
        async () => await product.getProductDetail(productNo as string),
        {
            enabled: !!productNo,
        },
    );

    return (
        <>
            <SEOHelmet
                data={{
                    title: manual('manualDetailTitle'),
                }}
            />

            <div style={{ padding: '10px', width: '1280px', margin: '0 auto' }}>
                <div style={{ marginTop: '4rem' }}>
                    <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>
                        {manual('manualDetailTitle')}
                    </h1>

                    <p
                        style={{
                            fontSize: '16px',
                            color: '#767676',
                            margin: '24px 0 30px 0',
                        }}
                    >
                        {manual('manualDetailDesc')}
                    </p>

                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'flex-end',
                        }}
                    >
                        <div
                            style={{
                                width: '28%',
                                display: 'flex',
                                justifyContent: 'space-evenly',
                            }}
                        >
                            <PrimaryButton
                                fontSize='12px'
                                style={{ width: '70px' }}
                            >
                                영상보기
                            </PrimaryButton>
                            <PrimaryButton
                                fontSize='12px'
                                style={{ width: '70px' }}
                            >
                                상품구매
                            </PrimaryButton>
                            <SecondaryButton
                                fontSize='12px'
                                style={{
                                    width: '70px',
                                    border: '1px solid #DBDBDB',
                                    color: '#000000',
                                }}
                            >
                                인쇄하기
                            </SecondaryButton>
                            <SecondaryButton
                                fontSize='12px'
                                style={{
                                    width: '70px',
                                    border: '1px solid #DBDBDB',
                                    color: '#000000',
                                }}
                            >
                                다운로드
                            </SecondaryButton>
                        </div>
                    </div>

                    <div style={{ textAlign: 'center' }}>
                        {data?.data.baseInfo.imageUrls.map((image: string) => {
                            return <img key={image} src={image} alt='main' />;
                        })}
                    </div>

                    {/* <div
                        style={{ textAlign: 'center' }}
                        dangerouslySetInnerHTML={{
                            __html: data?.data.baseInfo.content,
                        }}
                    ></div> */}
                </div>
            </div>
        </>
    );
};

export default ManualDetail;
