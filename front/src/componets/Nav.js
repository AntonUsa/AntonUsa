import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

function Nav(props) {
    const navigate = useNavigate();
    return (
        <>
            <CssBaseline/>
            <AppBar position="relative">
                <Toolbar onClick={() => navigate('/')}>
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