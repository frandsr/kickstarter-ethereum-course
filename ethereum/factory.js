import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  "0x1137bd0DB2C019df4A791fab266291f20CF362Ef"
);

export default instance;
