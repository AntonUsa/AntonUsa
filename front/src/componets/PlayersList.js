import React from 'react';
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

    return (
        <>
            <Container maxWidth="md">
                <Grid container spacing={ 4 }>
                    { cards.map((card) => (
                        <Grid item key={ card } xs={ 12 } sm={ 6 } md={ 4 }>
                            <Card
                                sx={ { height: '100%', display: 'flex', flexDirection: 'column' } }
                            >
                                <CardMedia
                                    component="img"
                                    image="https://source.unsplash.com/random"
                                    alt="random"
                                />
                                <CardContent sx={ { flexGrow: 1 } }>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        Heading
                                    </Typography>
                                    <Typography>
                                        This is a media card. You can use this section to describe the
                                        content.
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