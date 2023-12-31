import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Outlet, NavLink } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import Login from './login/login';
import { ToastContainer, toast } from 'react-toastify';


const ColorModeContext = React.createContext({ toggleColorMode: () => { } });
const drawerWidth = 240;


function MyApp(props : any) {

    const logout = props.onLogout;
    const theme = useTheme();
    const colorMode = React.useContext(ColorModeContext);
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };


    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ my: 2 }}>
                PlayKashyap
            </Typography>
            <Divider />
            <List>
                <NavLink to={'/admin'}>
                    <ListItem disablePadding>
                        <ListItemButton sx={{ textAlign: 'center' }} >
                            <ListItemText>Home</ListItemText>
                        </ListItemButton>
                    </ListItem>
                </NavLink>
                <NavLink to={'/about'}>
                    <ListItem disablePadding>
                        <ListItemButton sx={{ textAlign: 'center' }}>
                            <ListItemText>About me</ListItemText>
                        </ListItemButton>
                    </ListItem>
                </NavLink>
                <NavLink to={'/contact'}>
                    <ListItem disablePadding>
                        <ListItemButton sx={{ textAlign: 'center' }} >
                            <ListItemText>Contact</ListItemText>
                        </ListItemButton>
                    </ListItem>
                </NavLink>
            </List>
        </Box>
    );

    return (


        <Box sx={{ display: 'flex', width: '100%', height: '100vh', bgcolor: 'background.default', color: 'text.primary' }}>
            <CssBaseline />
            <AppBar component="nav" sx={{ background: 'transparent', boxShadow: 'none' }}>
                <Toolbar>
                    <Box>
                        <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2, display: { sm: 'none' } }}>
                            <MenuIcon sx={{ color: theme.palette.mode === 'dark' ? '#fff' : '#000' }} />
                        </IconButton>
                        <IconButton sx={{ ml: 1, display: { sm: 'none' } }} onClick={colorMode.toggleColorMode} color="inherit">
                            {theme.palette.mode === 'dark' ? <Brightness7Icon sx={{ color: '#fff' }} /> : <Brightness4Icon sx={{ color: '#000' }} />}
                        </IconButton>
                    </Box>

                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' }, color: theme.palette.mode === 'dark' ? '#fff' : '#000' }}>
                        PlayKashyap
                    </Typography>
                    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                        <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
                            {theme.palette.mode === 'dark' ? <Brightness7Icon sx={{ color: '#fff' }} /> : <Brightness4Icon sx={{ color: '#000' }} />}
                        </IconButton>
                        <NavLink to={'/'}>
                            <Button sx={{ color: theme.palette.mode === 'dark' ? '#fff' : '#000' }}>
                                Home
                            </Button>
                        </NavLink>
                        <NavLink to={'/about'}>
                            <Button sx={{ color: theme.palette.mode === 'dark' ? '#fff' : '#000' }}>
                                About Me
                            </Button>
                        </NavLink>
                        <NavLink to={'/contact'}>
                            <Button sx={{ color: theme.palette.mode === 'dark' ? '#fff' : '#000' }}>
                                Contact
                            </Button>
                        </NavLink>
                        <IconButton onClick={() => logout(true)}>
                            <LogoutIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            <Box component="nav">
                <Drawer variant="temporary" open={mobileOpen} onClose={handleDrawerToggle} ModalProps={{ keepMounted: true, }} sx={{ display: { xs: 'block', sm: 'none' }, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }, }}>
                    {drawer}
                </Drawer>
            </Box>
            <Box component="main">
                <Toolbar />
                <Outlet />
            </Box>
        </Box>
    );
}


function Layout() {

    const token = localStorage.getItem('token');
    const [loggedIn, setLoggedIn] = React.useState(false);

    const [mode, setMode] = React.useState<'light' | 'dark'>('light');
    const colorMode = React.useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
            },
        }),
        [],
    );

    const theme = React.useMemo(
        () =>
            createTheme({
                palette: {
                    mode,
                },
            }),
        [mode],
    );

    React.useEffect(() => {
        if (token) {
            setLoggedIn(true);
        } else {
            setLoggedIn(false);
        }
    }, [token]);

    const checkLogin = (event: any) => {

        if (event) {
            setLoggedIn(true);
            toast.success('Welcome', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });


        } else {
            setLoggedIn(false);
        }
    }

    const Logout = (event: any) => {
        setLoggedIn(false);
        localStorage.removeItem('token');
    }

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                {loggedIn ? <MyApp onLogout={(e : any) => Logout(e)} /> : <Login onLogin={(e: any) => checkLogin(e)} />}
                <ToastContainer />
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}

export default Layout;
