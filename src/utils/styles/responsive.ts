import BREAKPOINTS from 'const/breakpoints';

const isMobile = (width: number) => width < BREAKPOINTS.MEDIUM;
const isTable = (width: number) =>
    width >= BREAKPOINTS.MEDIUM && width < BREAKPOINTS.LARGE;
const isDesktop = (width: number) => width >= BREAKPOINTS.LARGE;

export { isMobile, isTable, isDesktop };
