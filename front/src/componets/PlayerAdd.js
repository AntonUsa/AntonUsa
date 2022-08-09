import React, { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import MyToken from '../abi/MyToken.json';
import { useNavigate } from "react-router-dom";
import { Input, InputLabel, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { ethers } from 'ethers';

function PlayerAdd({ owner, wallet }) {
    //"content-type": "multipart/form-data",
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    useEffect(() => {
        if(owner != wallet){
            navigate('/');
        }
    }, [])

    const handleSubmit = async(e) => {
        e.preventDefault();
        setIsSubmitted(true);

        const provider = new ethers.providers.JsonRpcProvider();
        const signer = provider.getSigner();
        // 0x5FbDB2315678afecb367f032d93F642f64180aa3
        const daiContract = new ethers.Contract('0x5fbdb2315678afecb367f032d93f642f64180aa3', MyToken.abi, signer);
        await daiContract.safeMint(owner);
        const tokenId = await daiContract.getCurrentTokenId();

        const formData = new FormData();
        formData.append('firstName', firstName);
        formData.append('lastName', lastName);
        formData.append('image', imageUrl);
        formData.append('owner', owner);
        formData.append('tokenId', tokenId.toNumber() - 1);
        fetch('http://localhost:3000/add/player', {
            method: 'POST',
            body: formData
        }).then(res => res.json()).then(data => {
            console.log(data);
            if(data.status === 'success') {
                navigate('/');
                setIsSubmitted(false);
            }

        });
    };

    const imageHandle = (e) => {
        console.log(e.target.files[0].name);
        setImageUrl(e.target.files[0]);
    };

    return (
        <>
            <Container maxWidth="md">
                <Grid item xs={ 12 } sm={ 12 } md={ 12 }>
                    <TextField
                        sx={ { margin: '10px' } }
                        id="standard-basic"
                        fullWidth={ true }
                        size={ 'medium' }
                        multiline={ true }
                        label="First Name"
                        onChange={ (e) => setFirstName(e.target.value) }
                        variant="standard"/>
                    <TextField
                        sx={ { margin: '10px' } }
                        id="standard-basic"
                        fullWidth={ true }
                        size={ 'medium' }
                        multiline={ true }
                        label="Last Name"
                        onChange={ (e) => setLastName(e.target.value) }
                        variant="standard"/>

                    <Button
                        sx={ { margin: '10px' } }
                        variant="contained"
                        component="label"
                    >
                        Image File
                        <input
                            type="file"
                            onChange={ (e) => imageHandle(e) }
                            hidden
                        />
                    </Button>
                    { imageUrl.name ? imageUrl.name : null }
                </Grid>

                <Grid item xs={ 12 } sm={ 12 } md={ 12 } mt={ 4 }>
                    { !isSubmitted ? <Button sx={ { margin: '10px' } } variant="contained"
                                           onClick={ (e) => handleSubmit(e) }>Contained</Button> : null}

                </Grid>
            </Container>
        </>
    );
}

export default PlayerAdd;