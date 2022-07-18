import { ComponentMeta, ComponentStory } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Button from 'components/Button/Button';
import { ButtonProps } from 'components/Button/Button';

export default {
    component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = ({
    buttonType,
    children,
    ...props
}: ButtonProps) => (
    <Button onClick={action('onClick')} buttonType={buttonType} {...props}>
        {children}
    </Button>
);

export const PrimaryButton = Template.bind({});
PrimaryButton.args = {
    buttonType: 'primary',
    children: 'Primary Button',
};

export const SecondaryButton = Template.bind({});
SecondaryButton.args = {
    buttonType: 'secondary',
    children: 'Secondary Button',
};

export const TertiaryButton = Template.bind({});
TertiaryButton.args = {
    buttonType: 'tertiary',
    children: 'Tertiary Button',
};

export const DisabledButton = Template.bind({});
DisabledButton.args = {
    disabled: true,
    children: 'Disabled Button',
};
