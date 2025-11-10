import { styled, Theme, Spacing } from '@mui/system';
interface CustomTheme extends Theme {
  spacing: Spacing; // Ensure spacing is always defined
  mixins?: {
    toolbar?: React.CSSProperties;
  };
}

export const DrawerHeader = styled('div')(({ theme }: { theme: CustomTheme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1), 
  ...theme.mixins?.toolbar,
  justifyContent: 'flex-end',
}));
