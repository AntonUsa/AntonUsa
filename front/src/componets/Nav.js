import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import Typography from '@mui/material/Typography';

function Nav(props) {
    return (
        <>
            <CssBaseline/>
            <AppBar position="relative">
                <Toolbar>
                    <SportsEsportsIcon sx={ { mr: 2 } }/>
                    <Typography variant="h6" color="inherit" noWrap>
                        Tennis Game
                    </Typography>
                </Toolbar>
            </AppBar>
        </>
    );
}

export default Nav;