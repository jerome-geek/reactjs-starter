import axios, { AxiosResponse } from 'axios';

enum MEMBER_ACCOUNT_CD {
    VC = '01',
    GOOGLE = '02',
    FACEBOOK = '03',
    APPLE = '04',
    KAKAO = '05',
    NAVER = '06',
}

enum MEMBER_CD {
    NORMAL = '01',
    CADDIE = '02',
}

enum SERVICE_CD {
    KOREA = '01',
    USA = '02',
    JAPAN = '03',
    MVC = '04',
    MSC = '05',
    VSE = '06',
    Y1 = '07',
    VCM = '08',
}

interface MemberJoinBody {
    mbId: string;
    mbPassword: string;
    mbName: string;
    mbSexCd?: 'M' | 'F' | 'N';
    mbBirth: string;
    mbEmail?: string;
    mbHpNo: string;
    mbNationality: 'USA' | 'JPN' | 'KOR';
    mbSocialYn: 'Y' | 'N';
    mbAccountGbnCd: MEMBER_ACCOUNT_CD;
    mbGbnCd: MEMBER_CD;
    serviceGbnCd: SERVICE_CD;
    joinIp?: string;
    mbTelNo?: string;
    mbZip?: string;
    mbAddr1?: string;
    mbAddr2?: string;
    mbEngName?: string;
    mbJpnName?: string;
    mbNickName?: string;
    mbHomePageUrl?: string;
    socialProvider?: string;
    socialIdentifier?: string;
    social_access_token?: string;
    apple_audience?: string;
    apple_client_id?: string;
    profileUrl?: string;
    photoUrl?: string;
    displayName?: string;
    clauseList: {
        clauseSeq: number;
        agreeYn: 'Y' | 'N';
    }[];
}

const BASE_URL = 'http://3.39.37.100:8080';

const member = {
    join: (body: MemberJoinBody): Promise<AxiosResponse> => {
        return axios({
            method: 'POST',
            baseURL: BASE_URL,
            url: '/members/new-member',
            data: body,
        });
    },
    checkId: (params: { mbId: string }): Promise<AxiosResponse> => {
        return axios({
            method: 'GET',
            baseURL: BASE_URL,
            url: '/members/id',
            params: { mbId: params.mbId },
        });
    },
};

export default member;
