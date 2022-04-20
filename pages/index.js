import React, { Component } from "react";
import { Card, Button } from "semantic-ui-react";
import Layout from "../components/Layout";
import factory from "../ethereum/factory";
import Link from "next/link";

class CampaignIndex extends Component {
  static async getInitialProps() {
    const campaigns = await factory.methods.getDeployedCampaigns().call();
    return { campaigns };
  }

  renderCampaigns() {
    const items = this.props.campaigns.map((address) => {
      return {
        header: address,
        description: (
          <Link href={`/campaigns/${address}`}>
            <a className="item">View Campaign</a>
          </Link>
        ),
        fluid: true,
      };
    });
    return <Card.Group items={items} />;
  }

  render() {
    return (
      <Layout>
        <h2>Open Campaigns</h2>
        <Link href="/campaigns/new">
          <a className="item">
            <Button
              content="Create Campaign"
              icon="add circle"
              floated="right"
              primary
            ></Button>
          </a>
        </Link>

        {this.renderCampaigns()}
      </Layout>
    );
  }
}

export default CampaignIndex;
