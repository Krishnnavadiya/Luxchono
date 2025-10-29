import { styled, Theme } from '@mui/system';

import { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';

interface CustomAppBarProps extends MuiAppBarProps {
    open?: boolean;
    theme?: Theme; // Make theme optional
}
const drawerWidth = 240;

export const Main = styled('main', {
    shouldForwardProp: (prop: string) => prop !== 'open',
})(({ theme, open }: CustomAppBarProps) => ({
    flexGrow: 1,

    padding: theme?.spacing(3),
    transition: (theme as any)?.transitions?.create('margin', {
        easing: (theme as any)?.transitions?.easing.sharp,
        duration: (theme as any)?.transitions?.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
        transition: (theme as any)?.transitions?.create('margin', {
            easing: (theme as any)?.transitions?.easing.easeOut,
            duration: (theme as any)?.transitions?.duration.enteringScreen,
        }),
        marginLeft: 0,
    }),
}));

interface DrawerHeaderProps {
    theme?: Theme & { mixins?: { toolbar?: React.CSSProperties } };
}

export const DrawerHeader = styled('div')<DrawerHeaderProps>(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme?.spacing(0, 1),
    ...(theme?.mixins?.toolbar ?? {}),
    justifyContent: 'flex-end',
}));