import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Nav from './componets/Nav';
import Footer from './componets/Footer';
import PlayersList from './componets/PlayersList';
import Header from './componets/Header';
import { ethers } from "ethers";
import { useEffect } from 'react';
import TennisERC20 from './abi/TennisERC20.json';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PlayerAdd from './componets/PlayerAdd';

const theme = createTheme();

export default function App() {
    const [owner, setOwner] = React.useState('0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266');
    const [players, setPlayers] = React.useState([]);
    const [wallet, setWallet] = React.useState(null);


    const walletConnectHandler = async () => {
        const { ethereum } = window;
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        setWallet(accounts[0]);
    }

    window.ethereum.on('accountsChanged', (accounts) => setWallet(accounts[0]));

    const updateEthers = async () => {
        // const provider = new ethers.providers.JsonRpcProvider();
        // const signer = provider.getSigner();
        // // 0x5FbDB2315678afecb367f032d93F642f64180aa3
        // const daiContract = new ethers.Contract('0x5FbDB2315678afecb367f032d93F642f64180aa3', TennisERC20.abi, signer);
        // await daiContract.mint(owner, ethers.utils.parseEther('1'));
        // const balanceOf = await daiContract.balanceOf(owner);
        // console.log(balanceOf);
    }

    useEffect(() => {
        console.log('useEffect');
        updateEthers();
    }, [])

    return (
        <ThemeProvider theme={ theme }>
            <main>
                <BrowserRouter>
                    <Nav/>
                    <Header wallet={wallet} owner={owner} walletConnectHandler={walletConnectHandler} />
                    <Routes>
                        <Route path="/" element={<PlayersList />} />
                        <Route path="/add/player" element={<PlayerAdd owner={owner} wallet={wallet} />} />
                    </Routes>
                </BrowserRouter>
            </main>
            <Footer />
        </ThemeProvider>
    );
}