import React, { useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import MyToken from '../abi/MyToken.json';
import { ethers } from 'ethers';

function PlayersList({ wallet, walletConnectHandler, contractAddress }) {
    const [players, setPlayers] = React.useState([]);

    const playersInit = async () => {
        const data = await fetch('http://91.219.62.94:3000/players');
        const players = await data.json();
        setPlayers(players);
    };

    const buyPlayer = async (player) => {
        if (!wallet) {
            walletConnectHandler();
        }

        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const daiContract = new ethers.Contract(contractAddress, MyToken.abi, signer);
        await daiContract.safeMint(wallet, { value: ethers.utils.parseUnits(player.price, 'wei') });
        const tokenId = await daiContract.getCurrentTokenId();

        const formData = new FormData();
        formData.append('tokenId', tokenId - 1);
        formData.append('newOwner', wallet);
        formData.append('playerId', player.id);
        fetch('http://91.219.62.94:3000/buy/player', {
            method: 'POST',
            body: formData
        }).then(res => res.json()).then(data => {
            console.log(data);
            if (data.status === 'success') {
                console.log('success');
                let targets = [...players];
                targets = targets.map(p => {
                    if (p.id === player.id) {
                        p.owner = wallet;
                    }
                    return p;
                });
                setPlayers(targets);
            }
        });
    };

    const checkTransaction = async (txHash, player) => {
        const txInterval = setInterval(async () => {
            const tx = await window.ethereum.request({
                method: 'eth_getTransactionReceipt',
                params: [txHash],
            });
            if (tx !== null && tx.status === '0x1') {
                console.log(tx);
                let targets = [...players];
                targets = targets.map(p => {
                    if (p.id === player.id) {
                        p.owner = tx.from;
                    }
                    return p;
                });
                setPlayers(targets);
                clearInterval(txInterval);

            }
        }, 1000);
    };

    useEffect(() => {
        playersInit();
    }, []);

    return (
        <>
            <Container maxWidth="md">
                <Grid container spacing={ 4 }>
                    { players.map((player, index) => (
                        <Grid item key={ index } xs={ 12 } sm={ 6 } md={ 4 }>
                            <Card
                                sx={ { height: '100%', display: 'flex', flexDirection: 'column' } }
                            >
                                <CardMedia
                                    component="img"
                                    image={ 'http://91.219.62.94:3000/image/' + player.image }
                                    alt="random"
                                />
                                <CardContent sx={ { flexGrow: 1 } }>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        { player.firstName } { player.lastName }
                                    </Typography>
                                    <Typography sx={ { fontSize: '12px' } }>
                                        ......{ player.owner.slice(10, player.length) }
                                    </Typography>
                                </CardContent>
                                <CardActions sx={ { justifyContent: 'space-between' } }>
                                    <Button onClick={ () => buyPlayer(player) } variant="contained"
                                            size="small">Buy</Button>
                                    <Typography>
                                        Price in wei: { player.price }
                                    </Typography>
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
