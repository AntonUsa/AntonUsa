import React, { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

import { useNavigate } from "react-router-dom";
import { Input, InputLabel, TextField } from '@mui/material';
import Button from '@mui/material/Button';


function PlayerAdd({ owner, wallet }) {
    //"content-type": "multipart/form-data",
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [price, setPrice] = useState(0);

    useEffect(() => {
        if(owner?.toLowerCase() != wallet?.toLowerCase()){
            navigate('/');
        }
    }, [])

    const handleSubmit = async(e) => {
        e.preventDefault();
        setIsSubmitted(true);



        const formData = new FormData();
        formData.append('firstName', firstName);
        formData.append('lastName', lastName);
        formData.append('image', imageUrl);
        formData.append('owner', owner);
        formData.append('price', price);
        fetch('http://91.219.62.94:3000/add/player', {
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

                    <TextField
                        id="standard-basic"
                        fullWidth={ true }
                        size={ 'medium' }
                        label="Number"
                        type="number"
                        variant="standard"
                        sx={ { margin: '10px' } }
                        onChange={ (e) => setPrice(e.target.value) }
                    />

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
                                           onClick={ (e) => handleSubmit(e) }>Save</Button> : null}

                </Grid>
            </Container>
        </>
    );
}

export default PlayerAdd;
