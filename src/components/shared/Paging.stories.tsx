import { action } from '@storybook/addon-actions';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Paging from 'components/shared/Paging';

export default {
    component: Paging,
    title: 'Components/Paging',
} as ComponentMeta<typeof Paging>;

const Template: ComponentStory<typeof Paging> = ({
    currentPage,
    totalPage,
    onFirstClick,
    onBeforeClick,
    onNextClick,
    onEndClick,
    ...args
}) => {
    return (
        <Paging
            currentPage={currentPage}
            totalPage={totalPage}
            onFirstClick={action('onFirstClick')}
            onBeforeClick={action('onBeforeClick')}
            onNextClick={action('onNextClick')}
            onEndClick={action('onEndClick')}
            {...args}
        />
    );
};

export const OnePagePaging = Template.bind({});
OnePagePaging.args = {
    currentPage: 1,
    totalPage: 1,
};

export const MultiPagePaging = Template.bind({});
MultiPagePaging.args = {
    currentPage: 1,
    totalPage: 10,
};
