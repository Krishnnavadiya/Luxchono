import React from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';

export default function TextFields(props: any) {
  const { type, endAdornment, accept, action, multiple, icons, ...restProps } = props;

  return (
    <TextField
      {...restProps}
      type={type}
      inputProps={{
        accept: accept,
        multiple: multiple, // Add this line
      }}
      InputProps={{
        endAdornment: endAdornment && (
          <InputAdornment position="end">
            <IconButton disableRipple onClick={action}>
              {icons}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
}
