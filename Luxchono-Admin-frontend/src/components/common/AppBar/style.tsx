import styled from '@emotion/styled';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import { Theme } from '@mui/system';

interface CustomAppBarProps extends MuiAppBarProps {
    open?: boolean;
    theme?: Theme;
}

const drawerWidth = 240;

export const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop: string) => prop !== 'open',
})(({ theme, open }: CustomAppBarProps) => ({
    transition: (theme as any)?.transitions?.create(['margin', 'width'], {
        easing: (theme as any)?.transitions?.easing.sharp,
        duration: (theme as any)?.transitions?.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: (theme as any)?.transitions?.create(['margin', 'width'], {
            easing: (theme as any)?.transitions?.easing?.easeOut,
            duration: (theme as any)?.transitions?.duration?.enteringScreen,
        }),
    }),
}));

