import React, { useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

function PlayersList(props) {
    const cards = [1, 2, 3];
    const [players, setPlayers] = React.useState([]);

    const playersInit = async () => {
        const data = await fetch('http://localhost:3000/players');
        const players = await data.json();
        setPlayers(players);
        console.log(players);
    }

    useEffect( () => {
        playersInit();
    }, []);

    return (
        <>
            <Container maxWidth="md">
                <Grid container spacing={ 4 }>
                    { players.map((player) => (
                        <Grid item key={ player.tokenId } xs={ 12 } sm={ 6 } md={ 4 }>
                            <Card
                                sx={ { height: '100%', display: 'flex', flexDirection: 'column' } }
                            >
                                <CardMedia
                                    component="img"
                                    image={ 'http://localhost:3000/image/' + player.image }
                                    alt="random"
                                />
                                <CardContent sx={ { flexGrow: 1 } }>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        { player.firstName }
                                    </Typography>
                                    <Typography>
                                        { player.lastName }
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small">View</Button>
                                    <Button size="small">Edit</Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    )) }
                </Grid>
            </Container>
        </>
    );
}

export default PlayersList;