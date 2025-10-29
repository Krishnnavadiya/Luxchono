import { Button, IconButton, InputBase } from '@mui/material'
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from '@mui/icons-material/Clear';
import "./style.scss"
import React, { ChangeEvent } from 'react';


export default function Searchs({ setpage, setsearch, setinput, input, isFetching, disabled, placeholder }: any) {
    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            setsearch(input);
        }
    };
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.value === "") {
            setinput("");
            setsearch("");
        }
        setinput(e.target.value);
    };
    const handleClearSearch = () => {
        setinput("")
        setsearch("")

    }
    const HandleSearch = () => {
        setsearch(input);

    }
    return (
        <InputBase
            placeholder={placeholder}
            inputProps={{ "aria-label": "search" }}
            className="appbar_search "

            endAdornment={
                <div className="flex justify-end">
                    {input !== "" && (
                        <IconButton onClick={handleClearSearch}>
                            <ClearIcon />
                        </IconButton>
                    )}
                    <Button onClick={HandleSearch} className="appbar_search_button ml-[8px]" variant="contained">
                        <SearchIcon className="appbar_search_icon" />
                    </Button>
                </div>
            }
            value={input}
            onChange={isFetching ? (() => { }) : handleChange}
            onKeyDown={onKeyDown}
            disabled={disabled} />
    )
}


