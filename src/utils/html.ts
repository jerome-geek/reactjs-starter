const getLinkTarget = (target: 'CURRENT' | 'NEW') =>
    target === 'CURRENT' ? '_self' : '_blank';

export { getLinkTarget };
