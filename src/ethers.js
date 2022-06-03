import { ethers } from "ethers";

window.ethereum.request({ method: "eth_requestAccounts" });

const provider = new ethers.providers.Web3Provider(window.ethereum);
provider.on("Transfer", () => {
    console.log("got an event");
})

export default provider;
