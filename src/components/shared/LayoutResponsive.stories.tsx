import { ComponentStory, ComponentMeta } from '@storybook/react';
import { useWindowSize } from 'usehooks-ts';

import LayoutResponsive from 'components/shared/LayoutResponsive';

export default {
    component: LayoutResponsive,
} as ComponentMeta<typeof LayoutResponsive>;

const Template: ComponentStory<typeof LayoutResponsive> = ({
    type,
    children,
    ...args
}) => {
    const { width } = useWindowSize();

    return (
        <LayoutResponsive type={type} {...args}>
            <>
                <p>{`${type} Layout width: ${width}px`}</p>
                {children}
            </>
        </LayoutResponsive>
    );
};

export const LargeLayout = Template.bind({});
LargeLayout.args = {
    type: 'large',
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
        height: '200px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
};
