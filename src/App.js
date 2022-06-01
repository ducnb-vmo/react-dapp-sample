import { ethers } from "ethers";
import { useRef } from "react";
import "./App.css";
import Greeter from './artifacts/contracts/Greeter.sol/Greeter.json';
import Token from './artifacts/contracts/Token.sol/Token.json';


const greeterAddress = "<greeter-address>"
const tokenAddress = "<token-address>"

function App() {
    const greetingRef = useRef("");
    const accIDRef = useRef("");
    const amtRef = useRef("");

    const requestAccount = async () => {
        await window.ethereum.request({method: 'eth_requestAccounts'})
    }

    const fetchGreeting = async () => {
        if (typeof window.ethereum !== 'undefined') {
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const contract = new ethers.Contract(greeterAddress, Greeter.abi, provider)
            try {
                const result = await contract.greet()
                console.log(`data: ${result}`);
            } catch (err) {
                console.log(`Error: ${err}`);
            }
        }
    };

    const setGreeting = async () => {
        const newGreeting = greetingRef.current.value;
        greetingRef.current.value = "";
        if (newGreeting && typeof window.ethereum !== 'undefined') {
            await requestAccount();
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(greeterAddress, Greeter.abi, signer)
            const transaction = await contract.setGreeting(newGreeting)
            await transaction.wait()
        }
    };

    const getBalance = async () => {
        if (typeof window.ethereum !== 'undefined') {
            const [account] = await window.ethereum.request({method: 'eth_requestAccounts'});
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const contract = new ethers.Contract(tokenAddress, Token.abi, provider)
            const balance = await contract.balanceOf(account);
            console.log(`Balance: ${balance}`);
        }
    }

    const sendCoins = async () => {
        if (typeof window.ethereum !== 'undefined') {
            const receiverID = accIDRef.current.value;
            const amount = amtRef.current.value;
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(tokenAddress, Token.abi, signer);
            const transaction = await contract.transfer(receiverID, parseInt(amount))
            await transaction.wait();
        }
    }

    return (
        <div className="App">
            <header className="App-header">
                <button onClick={fetchGreeting}>Fetch Greeting</button>
                <button onClick={setGreeting}>Set Greeting</button>
                <input ref={greetingRef} placeholder="Set greeting" />

                <br />

                <button onClick={getBalance}>Get Balance</button>
                <button onClick={sendCoins}>Send Coins</button>
                <input ref={accIDRef} placeholder="Account ID" />
                <input ref={amtRef} placeholder="Amount" />
            </header>
        </div>
    );
}

export default App;
