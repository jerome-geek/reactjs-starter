import { ComponentStory, ComponentMeta } from '@storybook/react';

import LayoutResponsive from 'components/shared/LayoutResponsive';

export default {
    component: LayoutResponsive,
} as ComponentMeta<typeof LayoutResponsive>;

const Template: ComponentStory<typeof LayoutResponsive> = ({
    children,
    ...args
}) => {
    return (
        <LayoutResponsive {...args}>
            <>{children}</>
        </LayoutResponsive>
    );
};

export const LargeLayout = Template.bind({});
LargeLayout.args = {
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
    children: 'Small Layout width: 440px',
    style: {
        height: '200px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
};
