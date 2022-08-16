import { pipe, reduce } from '@fxts/core';

const STR_DIVISION = Object.freeze({
    '/': '<br />',
    '': '',
});

const getLinkTarget = (target: 'CURRENT' | 'NEW') =>
    target === 'CURRENT' ? '_self' : '_blank';

const breakWord = (
    words: string,
    division: keyof typeof STR_DIVISION = '',
): string => {
    return pipe(
        words.split(division),
        reduce((a, b) => a + STR_DIVISION[division] + b),
    );
};

export { getLinkTarget, breakWord };
