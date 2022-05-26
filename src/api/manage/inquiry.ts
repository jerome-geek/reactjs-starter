import { AxiosResponse } from 'axios';

import request, { defaultHeaders } from 'api/core';
import { InquiryTypes, WriteInquiry } from 'models/manage';

const inquiry = {
    getInquiries: ({
        pageNumber,
        pageSize,
        hasTotalCount,
        startYmd,
        endYmd,
        inquiryTypeNo,
        inquiryStatus,
        inquiryStatuses,
        keyword,
        searchType,
    }: Paging & SearchDate & InquiryTypes): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: '/inquiries',
            params: {
                pageNumber,
                pageSize,
                hasTotalCount,
                startYmd,
                endYmd,
                inquiryTypeNo,
                inquiryStatus,
                inquiryStatuses,
                keyword,
                searchType,
            },
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: localStorage.getItem('accessToken') || '',
            }),
        }),

    // TODO 400 error, message: 해당 쇼핑몰에서 접근할 수 없거나 없는 문의 유형입니다. test 필요
    writeInquiry: ({
        originalFileName,
        inquiryTitle,
        answerEmailSendYn,
        uploadedFileName,
        orderNo,
        captcha,
        inquiryTypeNo,
        answerSmsSendYn,
        inquiryContent,
        email,
        productNo,
    }: WriteInquiry): Promise<AxiosResponse> =>
        request({
            method: 'POST',
            url: '/inquiries',
            data: {
                originalFileName,
                inquiryTitle,
                answerEmailSendYn,
                uploadedFileName,
                orderNo,
                captcha,
                inquiryTypeNo,
                answerSmsSendYn,
                inquiryContent,
                email,
                productNo,
            },
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: localStorage.getItem('accessToken') || '',
            }),
        }),

    // PREMIUM 타입에서 지원하지 않는 기능입니다.
    getInquiryConfig: (): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: '/inquiries/configurations',
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: localStorage.getItem('accessToken') || '',
            }),
        }),

    // TODO 404 error, message: 문의글이 존재하지 않습니다.
    getDetailInquiry: (inquiryNo: string): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: `/inquiries/${inquiryNo}`,
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: localStorage.getItem('accessToken') || '',
            }),
        }),

    // TODO 404 error, 위와 동일
    updateInquiry: (
        inquiryNo: string,
        {
            inquiryTitle,
            inquiryContent,
            originalFileName,
            uploadedFileName,
            answerSmsSendYn,
            answerEmailSendYn,
        }: Omit<
            WriteInquiry,
            'orderNo' | 'captcha' | 'inquiryTypeNo' | 'email' | 'productNo'
        >,
    ): Promise<AxiosResponse> =>
        request({
            method: 'PUT',
            url: `/inquiries/${inquiryNo}`,
            data: {
                inquiryTitle,
                inquiryContent,
                originalFileName,
                uploadedFileName,
                answerSmsSendYn,
                answerEmailSendYn,
            },
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: localStorage.getItem('accessToken') || '',
            }),
        }),

    // TODO 404 error, 위와 동일
    deleteInquiry: (inquiryNo: string): Promise<AxiosResponse> =>
        request({
            method: 'DELETE',
            url: `/inquiries/${inquiryNo}`,
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: localStorage.getItem('accessToken') || '',
            }),
        }),
};

export default inquiry;
