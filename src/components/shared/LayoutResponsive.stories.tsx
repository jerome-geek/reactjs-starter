import { ComponentStory, ComponentMeta } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import LayoutResponsive from './LayoutResponsive';

export default {
    component: LayoutResponsive,
} as ComponentMeta<typeof LayoutResponsive>;

const Template: ComponentStory<typeof LayoutResponsive> = ({
    type,
    children,
    ...args
}) => (
    <LayoutResponsive type={type} {...args}>
        {children}
    </LayoutResponsive>
);

export const LargeLayout = Template.bind({});
LargeLayout.args = {
    type: 'large',
    children: 'Large Layout width: 1280px',
    style: {
        backgroundColor: '#F0F0F3',
        height: '200px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
};

export const MediumLayout = Template.bind({});
MediumLayout.args = {
    type: 'medium',
    children: 'Medium Layout width: 880px',
    style: {
        backgroundColor: '#F0F0F3',
        height: '200px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
};

export const SmallLayout = Template.bind({});
SmallLayout.args = {
    type: 'small',
    children: 'Small Layout width: 440px',
    style: {
        backgroundColor: '#F0F0F3',
        height: '200px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
};
