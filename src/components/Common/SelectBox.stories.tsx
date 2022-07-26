import { ComponentStory, ComponentMeta } from '@storybook/react';
import SelectBox, { SelectBoxProps } from 'components/Common/SelectBox';
import { FlatOption } from 'models/product';
import { SingleValue } from 'react-select';

export default {
    component: SelectBox,
    parameters: {
        componentSubtitle: 'Select Box 컴포넌트',
    },
} as ComponentMeta<typeof SelectBox>;

const options = [
    { label: '1번', optionNo: 111, count: 1 },
    { label: '2번', optionNo: 222, count: 1 },
    { label: '3번', optionNo: 333, count: 1 },
];

const handleChange = (selectedOption: SingleValue<Partial<FlatOption>>) => {
    console.log(selectedOption);
};

const Template: ComponentStory<typeof SelectBox<FlatOption>> = ({
    styles,
    onChange,
    options,
    placeHolder,
}: SelectBoxProps<FlatOption>) => (
    <SelectBox<FlatOption>
        options={options}
        onChange={onChange}
        styles={styles}
        placeHolder={placeHolder}
    />
);

export const defaultSelectBox = Template.bind({});
defaultSelectBox.args = {
    onChange: handleChange,
    options,
    placeHolder: '',
};

export const customSelectBox = Template.bind({});
customSelectBox.args = {
    onChange: handleChange,
    options,
    placeHolder: '',
    styles: {},
};
