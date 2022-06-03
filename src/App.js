import { ethers } from "ethers";
import { useRef } from "react";
import "./App.css";
import Greeter from "./artifacts/contracts/Greeter.sol/Greeter.json";
import Token from "./artifacts/contracts/Token.sol/Token.json";
import provider from "./ethers";

const greeterAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const tokenAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

function App() {
    const greetingRef = useRef("");
    const accIDRef = useRef("");
    const amtRef = useRef("");

    const fetchGreeting = async () => {
        const contract = new ethers.Contract(
            greeterAddress,
            Greeter.abi,
            provider
        );
        try {
            const result = await contract.greet();
            console.log(`data: ${result}`);
        } catch (err) {
            console.log(`Error: ${err}`);
        }
    };

    const setGreeting = async () => {
        const newGreeting = greetingRef.current.value;
        greetingRef.current.value = "";
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
            greeterAddress,
            Greeter.abi,
            signer
        );
        const transaction = await contract.setGreeting(newGreeting);
        await transaction.wait();
    };

    const getBalance = async () => {
        const [account] = await window.ethereum.request({
            method: "eth_requestAccounts",
        });
        const contract = new ethers.Contract(tokenAddress, Token.abi, provider);
        const balance = await contract.balanceOf(account);
        console.log(`Balance: ${balance}`);
    };

    const sendCoins = async () => {
        const receiverID = accIDRef.current.value;
        const amount = amtRef.current.value;
        const signer = provider.getSigner();
        const contract = new ethers.Contract(tokenAddress, Token.abi, signer);
        const transaction = await contract.transfer(
            receiverID,
            parseInt(amount)
        );
        await transaction.wait();
    };

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
