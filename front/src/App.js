import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Nav from './componets/Nav';
import Footer from './componets/Footer';
import PlayersList from './componets/PlayersList';
import Header from './componets/Header';
import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PlayerAdd from './componets/PlayerAdd';

const theme = createTheme();

export default function App() {
    const [owner, setOwner] = React.useState('');
    const [wallet, setWallet] = React.useState(null);
    const [contractAddress, setContractAddress] = React.useState('');
    const walletConnectHandler = async () => {
        const { ethereum } = window;
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        setWallet(accounts[0]);
        localStorage.setItem('walletConnected', true);
    }

    const setOwnerHandler = async () => {
        const data = await fetch('http://91.219.62.94:3000/data/init');
        const { owner, contractAddress } = await data.json();
        setOwner(owner);
        setContractAddress(contractAddress);
    };

    const logoutHandler = () => {
        localStorage.removeItem('walletConnected');
        setWallet(null);
    }

    window.ethereum.on('accountsChanged', (accounts) => setWallet(accounts[0]));

    useEffect(() => {
        setOwnerHandler();

        if(localStorage.getItem('walletConnected') === 'true' && wallet === null) {
            walletConnectHandler();
        }
    }, [])

    return (
        <ThemeProvider theme={ theme }>
            <main>
                <BrowserRouter>
                    <Nav wallet={wallet} owner={owner} walletConnectHandler={walletConnectHandler} logoutHandle={logoutHandler}/>
                    <Header wallet={wallet} owner={owner} />
                    <Routes>
                        <Route path="/" element={<PlayersList wallet={wallet} walletConnectHandler={walletConnectHandler} contractAddress={contractAddress} />} />
                        <Route path="/add/player" element={<PlayerAdd owner={owner} wallet={wallet} />} />
                    </Routes>
                </BrowserRouter>
            </main>
            <Footer />
        </ThemeProvider>
    );
}
