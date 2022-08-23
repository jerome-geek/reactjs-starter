import { ComponentStory, ComponentMeta } from '@storybook/react';
import GenuineProductCard from './GenuineProductCard';

export default {
    component: GenuineProductCard,
} as ComponentMeta<typeof GenuineProductCard>;

const Template: ComponentStory<typeof GenuineProductCard> = () => (
    <GenuineProductCard />
);

export const DefaultComponent = Template.bind({});
DefaultComponent.args = {};
