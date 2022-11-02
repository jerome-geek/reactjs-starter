import { expect, test } from '@jest/globals';

// 회원 엑세스 토큰의 기본 유효 기간은 12시간이며, 자동 로그인을 위해 keepLogin을 true로 요청하면 유효 기간이 90일인 토큰이 생성됩니다.
// TODO: CHECK:https://velog.io/@rud285/localStorage-mock
describe('회원', () => {
    test('일반 로그인 (AccessToken 유효기간 12시간)', () => {
        const shopbyAccessToken = {
            accessToken: 'UDfEvJYMIPhzkKnOHOjTGTCOP4c',
            expireIn: 43142,
            dormantMemberResponse: null,
            daysFromLastPasswordChange: 27,
            passwordChangeRequired: false,
            expiry: 1667309041853,
        };

        // 2022년 11월 1일 화요일 오후 10:24:01.853 GMT+09:00
        const memberDate = shopbyAccessToken.expiry;

        // 2022년 11월 1일 화요일 오후 2:08:50.822 GMT+09:00 (new Date().getTime())
        const now = 1667279330822;

        const isLogin = shopbyAccessToken.accessToken && memberDate > now;
        expect(isLogin).toBe(true);
    });

    test('로그인 상태 유지 (AccessToken 유효기간 90일)', () => {
        const shopbyAccessToken = {
            accessToken: 'oz0RMTseM8Itxm4Nmi0Paj-vFFM',
            expireIn: 7775997,
            dormantMemberResponse: null,
            daysFromLastPasswordChange: 27,
            passwordChangeRequired: false,
            expiry: 1675055405278,
        };

        // 2023년 1월 30일 월요일 오후 2:10:05.278 GMT+09:00
        const memberDate = shopbyAccessToken.expiry;

        // 2022년 11월 1일 화요일 오후 2:08:50.822 GMT+09:00 (new Date().getTime())
        const now = 1667279330822;

        const isLogin = shopbyAccessToken.accessToken && memberDate > now;
        expect(isLogin).toBe(true);
    });
});
