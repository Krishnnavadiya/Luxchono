import React from "react";
import { TextField } from "@mui/material";

const Textareas = ({
    id,
    name,
    value,
    error,
    onChange,
    helperText,
    row,
    minRows,
    width,
    ...otherProps
}: any) => {
    return (
        <TextField
            sx={{
                "& .MuiInputBase-root": {
                    borderRadius: "10px !important",
                    width: width || "100%",
                },
                "@media (max-width: 768px)": {
                    "& .MuiInputBase-input::placeholder": {
                        fontSize: "11px !important",
                    },
                },
            }}

            minRows={minRows}
            multiline
            rows={row}
            variant="outlined"
            name={name}
            error={error}
            id={id}
            helperText={helperText}
            onChange={onChange}
            value={value}
            {...otherProps}
        />
    );
};

export default Textareas;
