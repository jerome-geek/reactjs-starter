import { ComponentStory, ComponentMeta } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import ViewAllButton from './ViewAllButton';

export default {
    component: ViewAllButton,
} as ComponentMeta<typeof ViewAllButton>;

const Template: ComponentStory<typeof ViewAllButton> = () => (
    <ViewAllButton onClick={action('onClick')} />
);

export const DefaultComponent = Template.bind({});
DefaultComponent.args = {};
