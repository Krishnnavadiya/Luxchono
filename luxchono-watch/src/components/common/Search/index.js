import { Button, IconButton, InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import './style.scss';
import React, { ChangeEvent } from 'react';

export default function Searchs({ setsearch, setinput, input, isFetching, disabled, placeholder, width, height }) {
    const onKeyDown = (e) => {
        if (e.key === 'Enter') {
            setsearch(input);
        }
    };
    const handleChange = (e) => {
        if (e.target.value === '') {
            setinput('');
            setsearch('');
        }
        setinput(e.target.value);
    };
    const handleClearSearch = () => {
        setinput('');
        setsearch('');

    };
    const HandleSearch = () => {
        setsearch(input);

    };
    return (
        <InputBase
            placeholder={placeholder}
            inputProps={{ 'aria-label': 'search' }}
            className="appbar_search "
            style={{ width: width, height: height }}
            endAdornment={
                <div className="flex justify-end">
                    {input !== '' && (
                        <div className="flex justify-center items-center cursor-pointer" disableRipple onClick={handleClearSearch}>
                            <ClearIcon style={{ fontSize: "20px" }} />
                        </div>
                    )}
                    <div onClick={HandleSearch} className="appbar_search_button ml-[8px] flex justify-center items-center cursor-pointer" variant="contained">
                        <SearchIcon className="appbar_search_icon" />
                    </div>
                </div>
            }
            value={input}
            onChange={isFetching ? (() => { }) : handleChange}
            onKeyDown={onKeyDown}
            disabled={disabled} />
    );
}


