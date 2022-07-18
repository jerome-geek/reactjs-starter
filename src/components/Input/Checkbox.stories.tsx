import { ComponentStory, ComponentMeta } from '@storybook/react';

import CheckBox, { CheckboxProps } from 'components/Input/CheckBox';

export default {
    component: CheckBox,
    parameters: {
        componentSubtitle: '채크박스 컴포넌트',
    },
} as ComponentMeta<typeof CheckBox>;

const Template: ComponentStory<typeof CheckBox> = ({
    label,
    id,
    checked,
    ...props
}: CheckboxProps) => (
    <CheckBox id={id} label={label} checked={checked} {...props} />
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
