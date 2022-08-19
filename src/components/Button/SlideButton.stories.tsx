import { ComponentStory, ComponentMeta } from '@storybook/react';

import SlideButton from 'components/Button/SlideButton';

export default {
    component: SlideButton,
} as ComponentMeta<typeof SlideButton>;

const Template: ComponentStory<typeof SlideButton> = ({
    slideButtonType,
    ...props
}) => <SlideButton slideButtonType={slideButtonType} {...props} />;

export const PrevSlideButton = Template.bind({});
PrevSlideButton.args = {
    slideButtonType: 'prev',
};

export const NextSlideButton = Template.bind({});
NextSlideButton.args = {
    slideButtonType: 'next',
};
