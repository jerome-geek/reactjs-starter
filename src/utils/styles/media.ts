export const mediaQuery = (maxWidth: number) => `
    @media (max-width: ${maxWidth}px)
`;

const media = {
    /* Large desktops and laptops */
    xxlarge: mediaQuery(1920),
    xlarge: mediaQuery(1440),
    large: mediaQuery(1200),
    /* Landscape tablets and medium desktops */
    medium: mediaQuery(1024),
    /* Landscape phones and portrait tablets */
    small: mediaQuery(768),
    /* Portrait phones and smaller */
    xsmall: mediaQuery(375),
    custom: mediaQuery,
};

export default media;
