import { ComponentStory, ComponentMeta } from '@storybook/react';

import BandBanner from 'components/shared/BandBanner';

export default {
    component: BandBanner,
} as ComponentMeta<typeof BandBanner>;

const Template: ComponentStory<typeof BandBanner> = ({
    title,
    url,
    onCloseClick,
}) => {
    return <BandBanner title={title} url={url} onCloseClick={onCloseClick} />;
};

export const MainBandBanner = Template.bind({});
MainBandBanner.args = {
    title: '신제품 출시 이벤트',
    url: '/',
};
