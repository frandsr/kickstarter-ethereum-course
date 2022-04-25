import React from "react";
import { getCampaign } from "../../../ethereum/campaign";
import Layout from "../../../components/Layout";
import { Card, Grid, Button } from "semantic-ui-react";
import web3 from "../../../ethereum/web3";
import ContributeForm from "../../../components/ContributeForm";
import Link from "next/link";

const CampaignShow = (props) => {
  const renderCards = () => {
    const {
      balance,
      manager,
      minumimContribution,
      approversCount,
      requestCount,
    } = props;

    const items = [
      {
        header: manager,
        meta: "Address of Manager",
        description:
          "The manager created this campaign and can create a requests to withdraw money",
        style: { overflowWrap: "break-word" },
      },
      {
        header: minumimContribution,
        meta: "Minumum Contribution (wei)",
        description:
          " You must contribute at least this much wei to be a contributor",
      },
      {
        header: requestCount,
        meta: "Number of Requests",
        description:
          "A request tries to withdraw money from the contrat. Requests must be approved by approvers",
      },
      {
        header: approversCount,
        meta: "Number of Approvers",
        description:
          "Number of people who have already donated to the campaign",
      },
      {
        header: web3.utils.fromWei(balance, "ether"),
        meta: "Campaign Balance (ether)",
        description:
          "The balance is how much money this campaign left to spend",
      },
    ];
    return <Card.Group items={items} />;
  };

  const requestsPath = "/campaigns/" + props.address + "/requests";

  return (
    <Layout>
      <h3>Campaign Details</h3>
      <Grid>
        <Grid.Row>
          <Grid.Column width={12}>{renderCards()}</Grid.Column>
          <Grid.Column width={4}>
            <ContributeForm campaign={props.campaign} />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Link href={requestsPath}>
              <a className="item">
                <Button content="View Requests" primary></Button>
              </a>
            </Link>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Layout>
  );
};

CampaignShow.getInitialProps = async (context) => {
  let address = context.query.address;
  let campaign = getCampaign(address);
  let summary;
  try {
    summary = await campaign.methods.getSummary().call();
  } catch (error) {
    console.log(error);
  }
  return {
    address,
    campaign,
    minumimContribution: summary[0],
    balance: summary[1],
    requestCount: summary[2],
    approversCount: summary[3],
    manager: summary[4],
  };
};

export default CampaignShow;
