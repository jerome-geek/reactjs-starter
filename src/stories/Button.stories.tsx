import { ComponentStory, ComponentMeta } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Button from 'components/Common/Button';

export default {
    component: Button,
    parameters: {
        componentSubtitle: '기본 버튼 컴포넌트',
    },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = ({ children, ...args }) => (
    <Button onClick={action('onClick')} {...args}>
        {children}
    </Button>
);

export const DefaultButton = Template.bind({});
DefaultButton.args = {
    children: 'Button',
};

export const RedButton = Template.bind({});
RedButton.args = {
    children: 'Button',
    color: 'red',
};

export const BigButton = Template.bind({});
BigButton.args = {
    children: 'Button',
    color: 'red',
    fontSize: '20px',
};
