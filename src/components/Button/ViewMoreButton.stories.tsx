import { ComponentStory, ComponentMeta } from '@storybook/react';

import ViewMoreButton from 'components/Button/ViewMoreButton';

export default {
    component: ViewMoreButton,
} as ComponentMeta<typeof ViewMoreButton>;

const Template: ComponentStory<typeof ViewMoreButton> = ({
    children,
    ...props
}) => <ViewMoreButton {...props}>{children}</ViewMoreButton>;

export const MainSlideViewMoreButton = Template.bind({});
MainSlideViewMoreButton.args = {
    to: '/',
    target: '_blank',
    children: '자세히 보기',
};
