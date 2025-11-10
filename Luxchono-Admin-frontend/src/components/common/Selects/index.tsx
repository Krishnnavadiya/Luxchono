import { FormControl, InputLabel, MenuItem } from '@mui/material'
import Select from 'react-select';
import { ReactSelectStyle } from './ReactSelect';
export default function Selects({ width, height, placeholder, options, selectedValues, setSelectedValues, isMulti,isDisabled ,menuPlacement }: any) {

    const handleSelectChange = (selectedOptions: any[]) => {
        setSelectedValues(selectedOptions);
    };

    return (
        <>
            <Select

            isDisabled={isDisabled}
                // closeMenuOnSelect={false}
                isMulti={isMulti}
                value={selectedValues}
                onChange={handleSelectChange}
                placeholder={placeholder}
                isClearable={true}
                styles={ReactSelectStyle(width, height)}
                options={options}
                menuPlacement={menuPlacement || "bottom"} />
        </>
    )
}


