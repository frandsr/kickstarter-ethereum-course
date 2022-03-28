import React from "react";
import { useRouter } from "next/router";

const CampaignDetail = () => {
  const router = useRouter();
  const { address } = router.query;
  return <div>CampaignDetail: {address} </div>;
};

export default CampaignDetail;
