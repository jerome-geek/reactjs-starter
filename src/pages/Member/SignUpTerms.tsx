import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { terms } from 'api/manage/index';
import { TERMS_TYPES } from 'api/manage/terms';

const SignUpTerms = () => {
    const [isAllChecked, setIsAllChecked] = useState<boolean>(false);
    const [checkAgree, setCheckAgree] = useState<string[]>([]);

    const navigate = useNavigate();

    const VCTerms = [
        { id: 'USE', name: '서비스 이용약관' },
        { id: 'PI_PROCESS', name: '개인정보 처리방침' },
        { id: 'LOCATION_INFO', name: '위치정보사업 이용약관' },
        { id: 'LOCATION_SERVICE', name: '위치기반 서비스 이용약관' },
        { id: 'VSE', name: 'VSE 서비스 이용약관' },
    ];

    const agreeAllButton = (checked: boolean) => {
        setIsAllChecked(!isAllChecked);

        if (checked) {
            let checkArr: string[] = [];

            VCTerms.forEach(({ id }) => {
                checkArr.push(id);
            });

            setCheckAgree(checkArr);
        } else {
            setCheckAgree([]);
        }
    };

    const agreeButton = (checked: boolean, id: string) => {
        if (checked) {
            setCheckAgree([...checkAgree, id]);
        } else {
            setCheckAgree(checkAgree.filter((check) => check !== id));
        }
    };

    const checkIsAllAgree = () => {
        if (!isAllChecked) {
            alert('모든 약관에 동의해주세요');
        } else {
            navigate('/signUp/input', {
                state: {
                    joinTermsAgreements: checkAgree,
                    // certificated: boolean
                },
            });
        }
    };

    return (
        <>
            <header>
                <button onClick={() => navigate(-1)}>{'<'}</button>
                <h2>회원 가입</h2>
            </header>
            <p>
                서비스 이용을 위해
                <br /> 약관에 동의해주세요
            </p>
            <input
                type='checkbox'
                id='agreeAll'
                onChange={(e: any) => agreeAllButton(e.target.checked)}
                checked={checkAgree.length === VCTerms.length}
            />
            <label htmlFor='agreeAll'>전체 동의</label>
            {VCTerms.map(({ id, name }) => (
                <React.Fragment key={id}>
                    <input
                        type='checkbox'
                        id={id}
                        onChange={(e) => agreeButton(e.target.checked, id)}
                        checked={checkAgree.includes(id)}
                    />
                    <label htmlFor={id}>{name}</label>
                </React.Fragment>
            ))}
            <button onClick={checkIsAllAgree}>다음</button>
        </>
    );
};

export default SignUpTerms;
