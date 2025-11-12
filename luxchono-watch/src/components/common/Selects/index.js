
import Select from 'react-select';
import { ReactSelectStyle } from './ReactSelect';
export default function Selects({ width, height, placeholder, options, selectedValues, setSelectedValues, isMulti, isDisabled }) {

    const handleSelectChange = (selectedOptions) => {
        setSelectedValues(selectedOptions);
    };

    return (
        <>
            <Select
                isDisabled={isDisabled}
                isMulti={isMulti}
                value={selectedValues}
                onChange={handleSelectChange}
                placeholder={placeholder}
                isClearable={true}
                styles={ReactSelectStyle(width, height)}
                options={options}
                menuPlacement="bottom" />
        </>
    );
}


