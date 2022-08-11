import React from 'react';
import Avatar from '@mui/material/Avatar';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import { IconButton, Menu, MenuItem, Tooltip } from '@mui/material';
import Button from '@mui/material/Button';

function Nav({ wallet, walletConnectHandler, logoutHandle }) {

    const navigate = useNavigate();

    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const logout = () => {
        logoutHandle();
        setAnchorElUser(null);
        navigate('/');
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        onClick={() => {navigate('/')}}
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Tennis Game
                    </Typography>

                    { !wallet ? <Button onClick={() => { walletConnectHandler() }} variant="contained">Connection</Button> : <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            <MenuItem onClick={handleCloseUserMenu}>
                                <Typography textAlign="center">Profile</Typography>
                            </MenuItem>
                            <MenuItem onClick={logout}>
                                <Typography textAlign="center">Logout</Typography>
                            </MenuItem>
                        </Menu>
                    </Box> }
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default Nav;
