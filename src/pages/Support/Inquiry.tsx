import React, { useState } from 'react';
import { useMutation } from 'react-query';
import { StylesConfig } from 'react-select';
import { useWindowSize } from 'usehooks-ts';
import { head, map, pipe, toArray } from '@fxts/core';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import SEOHelmet from 'components/shared/SEOHelmet';
import Header from 'components/shared/Header';
import MobileHeader from 'components/shared/MobileHeader';
import SelectBox, { customStyle } from 'components/Common/SelectBox';
import { useMall } from 'hooks';
import { isMobile } from 'utils/styles/responsive';
import { inquiry } from 'api/manage';
import { WriteInquiry } from 'models/manage';
import media from 'utils/styles/media';

const InquiryContainer = styled.div`
    width: 1060px;
    margin: 118px auto 155px;
    color: ${(props) => props.theme.text1};
    ${media.xlarge} {
        width: 100%;
        margin: 50px 0 88px;
        padding: 0 24px;
    }
`;

const Title = styled.h2`
    font-size: 1.5rem;
    letter-spacing: -1.2px;
    font-weight: bold;
    margin-bottom: 36px;
    ${media.xlarge} {
        font-size: 1.428rem;
    }
    ${media.medium} {
        font-size: 1.666rem;
    }
`;

const InquiryTypeContainer = styled.div`
    width: 100%;
    background: ${(props) => props.theme.bg2};
    padding: 24px 0;
    display: flex;
    justify-content: center;
    align-items: center;
    > p {
        margin-right: 30px;
    }
    > div {
        width: 407px;
    }
    ${media.xlarge} {
        width: 100vw;
        margin-left: -24px;
        > div {
            font-size: 1.142rem;
            font-weight: bold;
            > div {
                font-weight: lighter;
            }
        }
        > p {
            font-size: 1.142rem;
        }
    }
    ${media.medium} {
        padding: 15px 24px;
        > div {
            width: 100%;
            font-size: 1.333rem;
        }
        > p {
            display: none;
        }
    }
`;

const InquiryContentContainer = styled.ul`
    margin-top: 40px;
    border-top: ${(props) => `2px solid ${props.theme.secondary}`};
    border-bottom: ${(props) => `1px solid ${props.theme.secondary}`};
`;

const InquiryContentList = styled.li`
    display: flex;
    align-items: center;
    padding: 30px 0;
    border-bottom: ${(props) => `1px solid ${props.theme.line2}`};
    &:last-child {
        border-bottom: none;
    }
    ${media.xlarge} {
        font-size: 1.142rem;
    }
    ${media.medium} {
        flex-direction: column;
        align-items: flex-start;
        font-size: 1.333rem;
        border-bottom: none;
        padding: 22px 0 0;
    }
`;

const InquiryContentTitle = styled.div`
    padding-left: 35px;
    font-weight: 500;
    width: 26.6%;
    ${media.medium} {
        width: 100%;
        padding: 0 10px 12px;
    }
`;

const InquiryContentInputBox = styled.div`
    width: 73.3%;
    ${media.medium} {
        width: 100%;
    }
`;

const InquiryContentInput = styled.input<{ paddingBottom?: string }>`
    border: ${(props) => `1px solid ${props.theme.line2}`};
    width: 88.56%;
    padding: 12px 18px;
    &:focus {
        border: ${(props) => `1px solid ${props.theme.line1}`};
    }
    ${media.medium} {
        width: 100%;
    }
`;

const InquiryContentText = styled.textarea`
    border: ${(props) => `1px solid ${props.theme.line2}`};
    width: 88.56%;
    padding: 21px 0 106px 18px;
    letter-spacing: -0.64px;
    &:focus {
        border: ${(props) => `1px solid ${props.theme.line1}`};
    }
    ${media.medium} {
        width: 100%;
    }
`;

const SendInquiryButton = styled.button`
    width: 440px;
    height: 44px;
    background: ${(props) => props.theme.secondary};
    color: #fff;
    margin: 50px auto;
    display: block;
    cursor: pointer;
    ${media.medium} {
        width: 100%;
    }
`;

interface InquiryType {
    inquiryTypeDescription: string;
    inquiryTypeName: string;
    inquiryTypeNo: number;
}

const Inquiry = () => {
    const [uploadFile, setUploadFile] = useState<
        Array<Blob | MediaSource | null>
    >([]);
    const [uploadImageList, setUploadImageList] = useState<string[]>([]);

    const [mallInfo] = useMall();

    const { width } = useWindowSize();

    const { register, handleSubmit, setValue, getValues } =
        useForm<WriteInquiry>();

    const { t: translation } = useTranslation('inquiry');

    const { mutate: inquiryMutate } = useMutation(
        async (inquiryContent: WriteInquiry & { image?: File }) =>
            await inquiry.writeInquiry(inquiryContent),
        {
            onSuccess: () => {
                alert('문의가 완료됐습니다.');
            },
        },
    );

    const uploadFileHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setUploadFile((prev) => {
                return [...prev, head(e.target.files!)!];
            });
            setUploadImageList((prev) => {
                return [...prev, URL.createObjectURL(head(e.target.files!)!)];
            });
        }
        return;
    };

    const onSubmit = handleSubmit(() => {
        if (!getValues('inquiryTypeNo')) {
            alert(translation('etc.inquiryTypeAlert'));
            return;
        }
        inquiryMutate({
            inquiryTypeNo: getValues('inquiryTypeNo'),
            inquiryTitle: getValues('inquiryTitle'),
            inquiryContent: getValues('inquiryContent'),
        });
    });

    return (
        <>
            <SEOHelmet
                data={{
                    title: translation('subTitle'),
                    meta: {
                        title: translation('subTitle'),
                        description: translation('description'),
                    },
                    og: {
                        title: translation('subTitle'),
                        description: translation('description'),
                    },
                }}
            />
            {isMobile(width) ? (
                <MobileHeader title={translation('mobileTitle')}></MobileHeader>
            ) : (
                <Header />
            )}
            <InquiryContainer>
                <Title>{translation('title')}</Title>
                <InquiryTypeContainer>
                    <p>{translation('inquiryType.title')}</p>
                    <SelectBox<InquiryType>
                        options={pipe(
                            mallInfo.inquiryType as InquiryType[],
                            map((a) => {
                                return {
                                    label: a.inquiryTypeName,
                                    inquiryTypeNo: a.inquiryTypeNo,
                                };
                            }),
                            toArray,
                        )}
                        onChange={(e) => {
                            setValue('inquiryTypeNo', e?.inquiryTypeNo);
                        }}
                        styles={{
                            ...(customStyle as StylesConfig<
                                Partial<InquiryType>,
                                false
                            >),
                            container: (provided) => ({
                                ...provided,
                                margin: '0',
                            }),
                            control: (
                                provided,
                                { menuIsOpen }: { menuIsOpen: boolean },
                            ) => ({
                                boxSizing: 'border-box',
                                width: '100%',
                                border: '2px solid #DBDBDB',
                                borderBottom: menuIsOpen ? 'none' : '',
                                display: 'flex',
                                height: '44px',
                                background: '#fff',
                            }),
                            option: () => ({
                                height: '44px',
                                lineHeight: '4px',
                                width: '100%',
                                boxSizing: 'border-box',
                                borderLeft: '2px solid #DBDBDB',
                                background: '#fff',
                                padding: '20px',
                                paddingLeft: '20px',
                                color: '#191919',
                                cursor: 'pointer',
                                fontWeight: 'normal',
                                '&:hover': {
                                    borderLeft: '2px solid #c00020',
                                    background: '#F0EFF4',
                                    fontWeight: 'bold',
                                },
                            }),
                        }}
                        placeHolder={translation('inquiryType.placeholder')}
                    />
                </InquiryTypeContainer>
                <InquiryContentContainer>
                    <InquiryContentList>
                        <InquiryContentTitle>
                            {translation('inquiryTitle.title')}
                        </InquiryContentTitle>
                        <InquiryContentInputBox>
                            <InquiryContentInput
                                type='text'
                                placeholder={translation(
                                    'inquiryTitle.placeholder',
                                )}
                                {...register('inquiryTitle', {
                                    required: true,
                                })}
                            />
                        </InquiryContentInputBox>
                    </InquiryContentList>
                    <InquiryContentList>
                        <InquiryContentTitle>
                            {translation('inquiryContent.title')}
                        </InquiryContentTitle>
                        <InquiryContentInputBox>
                            <InquiryContentText
                                placeholder={translation(
                                    'inquiryContent.placeholder',
                                )}
                                {...register('inquiryContent', {
                                    required: true,
                                })}
                            />
                        </InquiryContentInputBox>
                    </InquiryContentList>
                    <InquiryContentList>
                        <InquiryContentTitle>
                            {translation('file.title')}
                        </InquiryContentTitle>
                        <InquiryContentInputBox></InquiryContentInputBox>
                    </InquiryContentList>
                </InquiryContentContainer>
                <SendInquiryButton
                    onClick={() => {
                        onSubmit();
                    }}
                >
                    {translation('etc.sendButton')}
                </SendInquiryButton>
            </InquiryContainer>
        </>
    );
};

export default Inquiry;
