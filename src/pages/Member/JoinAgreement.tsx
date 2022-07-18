import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { VCTerms } from 'const/VCTerms';

const JoinAgreement = () => {
    const [checkAgree, setCheckAgree] = useState<string[]>([]);

    const navigate = useNavigate();

    const agreeAllButton = (checked: boolean) => {
        if (checked) {
            const checkList: string[] = [];

            VCTerms.forEach(({ id }) => {
                checkList.push(id);
            });

            setCheckAgree(checkList);
        } else {
            setCheckAgree([]);
        }
    };

    const agreeButton = (checked: boolean, id: string) => {
        if (checked) {
            setCheckAgree((prev) => [...prev, id]);
        } else {
            setCheckAgree(checkAgree.filter((check) => check !== id));
        }
    };

    const checkIsAllAgree = () => {
        if (checkAgree.length !== VCTerms.length) {
            alert('모든 약관에 동의해주세요');
        } else {
            navigate('/member/join', {
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
                onChange={(e) => agreeAllButton(e.target.checked)}
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

export default JoinAgreement;
