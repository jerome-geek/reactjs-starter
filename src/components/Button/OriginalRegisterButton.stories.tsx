import { ComponentStory, ComponentMeta } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import OriginalRegisterButton from './OriginalRegisterButton';

export default {
    component: OriginalRegisterButton,
    argTypes: {
        title: { type: 'string' },
    },
} as ComponentMeta<typeof OriginalRegisterButton>;

const Template: ComponentStory<typeof OriginalRegisterButton> = ({
    title,
    ...args
}) => <OriginalRegisterButton title={title} onClick={action('onClick')} />;

export const DefaultComponent = Template.bind({});
DefaultComponent.args = {
    title: '정품 등록하기',
};
