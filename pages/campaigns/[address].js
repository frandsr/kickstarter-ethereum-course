import React from "react";
import { useRouter } from "next/router";
import campaign from "../../ethereum/campaign";
import Layout from "../../components/Layout";

const CampaignShow = ({ summary }) => {
  const router = useRouter();
  const { address } = router.query;

  return (
    <Layout>
      <h1>Campaign Details: {address}</h1>
    </Layout>
  );
};

CampaignShow.getInitialProps = async (ctx) => {
  let summary;
  try {
    summary = await campaign.methods.getSummary().call();
  } catch (error) {
    console.log(error);
  }
  console.log("Summary", summary);
  return { summary };
};

export default CampaignShow;
