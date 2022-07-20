import Select, { SingleValue, ActionMeta } from 'react-select';

import { FlatOption } from 'models/product';
import { ReactComponent as DropDownIcon } from 'assets/icons/arrow_drop_down.svg';

const SelectBox = ({
    options,
    onChange,
    styles,
}: {
    options?: Partial<FlatOption>[];
    onChange?: (
        selectedOption: SingleValue<Partial<FlatOption>>,
        actionMeta: ActionMeta<Partial<FlatOption>>,
    ) => void;
    styles?: {
        width?: string;
    };
}) => {
    const DropdownIndicator = () => {
        return <DropDownIcon />;
    };

    return (
        <Select
            options={options}
            onChange={onChange}
            placeholder={'제품을 선택해주세요'}
            styles={{
                container: (provided: any) => ({
                    ...provided,
                    margin: '22px 0 10px',
                    boxSizing: 'border-box',
                    width: styles?.width ? styles?.width : '100%',
                }),
                control: (provided: any, { menuIsOpen }) => ({
                    boxSizing: 'border-box',
                    width: styles?.width ? styles?.width : '100%',
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
                    border: '2px solid #DBDBDB',
                    borderTop: 'none',
                    width: '100%',
                    boxSizing: 'border-box',
                }),
                option: () => ({
                    width: '100%',
                    boxSizing: 'border-box',
                    borderLeft: '1px solid #',
                    background: '#fff',
                    padding: '20px',
                    paddingLeft: '20px',
                    color: '#191919',
                    cursor: 'pointer',
                    '&:hover': {
                        borderLeft: '2px solid #c00020',
                        paddingLeft: '18px',
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
            }}
            components={{ DropdownIndicator }}
        />
    );
};

export default SelectBox;
