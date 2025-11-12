export const ReactSelectStyle = (width, height) => {
    return {
        placeholder: (base) => ({
            ...base,
            fontSize: '0.9rem',
            fontWeight: 'normal'
        }),
        control: (styles) => ({
            ...styles,
            borderRadius: '12px',
            boxShadow: 'none',
            width: width || '100%',
            height: height || '50px',
            '&:hover': {
                borderColor: '#000',
            },
            borderColor: '#DCDBDB',
            fontSize: '15px',
            maxHeight: '200px',
            overflowY: 'auto',
            // fontFamily: 'Open Sans, sans-serif'
        }),
        menu: (styles) => ({
            ...styles,
            fontSize: '1rem',
            zIndex: '10000'
        }),

        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected ? '#964315' : '#fff',
            '&:hover': {
                backgroundColor: state.isSelected ? '#964315' : '#F9F4F1'
            },
        }),
    };
};