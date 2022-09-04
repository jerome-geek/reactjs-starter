import { ComponentStory, ComponentMeta } from '@storybook/react';

import Checkbox, { CheckboxProps } from 'components/Input/CheckBox';

export default {
    component: Checkbox,
    parameters: {
        componentSubtitle: '채크박스 컴포넌트',
    },
} as ComponentMeta<typeof Checkbox>;

const Template: ComponentStory<typeof Checkbox> = ({
    label,
    id,
    checked,
    ...props
}: CheckboxProps) => (
    <Checkbox id={id} label={label} checked={checked} {...props} />
);

export const UncheckedCheckbox = Template.bind({});
UncheckedCheckbox.args = {
    label: '로그인 상태 유지하기',
    id: 'keepLogin',
    checked: false,
};

export const CheckedCheckbox = Template.bind({});
CheckedCheckbox.args = {
    label: '로그인 상태 유지하기',
    id: 'keepLogin',
    checked: true,
};
