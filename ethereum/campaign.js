import web3 from "./web3";
import Campaign from "./build/Campaign.json";
//Genero una instancia de un contrato ya existente
const instance = new web3.eth.Contract(
  JSON.parse(Campaign.interface),
  "0x763dB777287F25B547cc1C9c7a2a174712c1A294"
);

export default instance;
