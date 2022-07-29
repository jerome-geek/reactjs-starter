import Select, { SingleValue, ActionMeta, StylesConfig } from 'react-select';

import { ReactComponent as DropDownIcon } from 'assets/icons/arrow_drop_down.svg';

export interface SelectBoxProps<T> {
    options?: Partial<T>[];
    placeHolder?: string;
    onChange?: (
        selectedOption: SingleValue<Partial<T>>,
        actionMeta: ActionMeta<Partial<T>>,
    ) => void;
    styles?: StylesConfig<Partial<T>, false>;
}

export const customStyle = {
    container: (provided: any) => ({
        ...provided,
        margin: '22px 0 10px',
        boxSizing: 'border-box',
        width: '100%',
    }),
    control: (provided: any, { menuIsOpen }: { menuIsOpen: boolean }) => ({
        boxSizing: 'border-box',
        width: '100%',
        border: '2px solid #DBDBDB',
        borderBottom: menuIsOpen ? 'none' : '',
        display: 'flex',
        height: '67px',
        paddingLeft: '5px',
        cursor: 'pointer',
    }),
    menu: () => ({
        top: '100%',
        position: 'absolute',
        width: '100%',
        zIndex: 1,
        background: '#fff',
        bottom: '0',
    }),
    menuList: () => ({
        borderRight: '2px solid #DBDBDB',
        borderBottom: '2px solid #DBDBDB',
        borderTop: 'none',
        width: '100%',
        boxSizing: 'border-box',
    }),
    option: () => ({
        width: '100%',
        boxSizing: 'border-box',
        borderLeft: '2px solid #DBDBDB',
        background: '#fff',
        padding: '20px',
        paddingLeft: '20px',
        color: '#191919',
        cursor: 'pointer',
        '&:hover': {
            borderLeft: '2px solid #c00020',
            background: '#F0EFF4',
            fontWeight: 'bold',
        },
    }),
    placeholder: (provided: any) => ({
        ...provided,
        color: '#a8a8a8',
        fontSize: '16px',
        fontFamily: 'Noto Sans CJK KR',
    }),
    indicatorsContainer: (provided: any) => ({
        ...provided,
        marginRight: '13px',
    }),
    indicatorSeparator: () => ({}),
};

const SelectBox = <T extends any>({
    options,
    onChange,
    styles,
    placeHolder,
}: SelectBoxProps<T>) => {
    const DropdownIndicator = () => {
        return <DropDownIcon />;
    };

    return (
        <Select
            options={options}
            onChange={onChange}
            placeholder={placeHolder}
            styles={
                styles
                    ? styles
                    : (customStyle as StylesConfig<Partial<T>, false>)
            }
            components={{ DropdownIndicator }}
        />
    );
};

export default SelectBox;
