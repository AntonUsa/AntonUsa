import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

function Header({ walletConnectHandler, owner, wallet }) {

    return (
        <>
            <Box
                sx={ {
                    bgcolor: 'background.paper',
                    pt: 8,
                    pb: 6,
                } }
            >
                <Container maxWidth="sm">
                    <Typography
                        component="h1"
                        variant="h2"
                        align="center"
                        color="text.primary"
                        gutterBottom
                    >
                        Welcome to Tennis Game
                    </Typography>
                    <Typography variant="h5" align="center" color="text.secondary" paragraph>
                        { owner.length ? wallet : 'You are not connect to metamask' }
                    </Typography>
                    <Stack
                        sx={ { pt: 4 } }
                        direction="row"
                        spacing={ 2 }
                        justifyContent="center"
                    >
                        <Button onClick={() => { walletConnectHandler() }} variant="contained">Connect Wallet</Button>
                        { owner === wallet ? <Button variant="outlined">Add Player</Button> : null }
                    </Stack>
                </Container>
            </Box>
        </>
    );
}

export default Header;