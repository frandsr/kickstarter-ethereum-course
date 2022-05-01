import Link from "next/link";
import React from "react";
import { Button, Table } from "semantic-ui-react";
import { getCampaign } from "../../../ethereum/campaign";
import RequestRow from "../../../components/RequestRow";
import Layout from "../../../components/Layout";

const Requests = ({ address, requests, requestCount, approversCount }) => {
  const newRequestPath = "/campaigns/" + address + "/requests/new";
  const { Header, Row, HeaderCell, Body } = Table;

  const renderRows = () => {
    return requests.map((request, index) => {
      return (
        <RequestRow
          key={index}
          id={index}
          request={request}
          address={address}
          approversCount={approversCount}
        />
      );
    });
  };

  return (
    <Layout>
      <h3>Requests</h3>
      <Link href={newRequestPath}>
        <a>
          <Button primary floated="right" style={{ marginBottom: "10px" }}>
            Add Request
          </Button>
        </a>
      </Link>
      <Table>
        <Header>
          <Row>
            <HeaderCell>ID</HeaderCell>
            <HeaderCell>Description</HeaderCell>
            <HeaderCell>Amount</HeaderCell>
            <HeaderCell>Recipient</HeaderCell>
            <HeaderCell>Approval Count1</HeaderCell>
            <HeaderCell>Approve</HeaderCell>
            <HeaderCell>Finalize</HeaderCell>
          </Row>
        </Header>
        <Body>{renderRows()}</Body>
      </Table>
      <div>Found {requestCount} requests.</div>
    </Layout>
  );
};

Requests.getInitialProps = async (context) => {
  const address = context.query.address;
  const campagin = getCampaign(address);
  const requestCount = await campagin.methods.getRequestsCount().call();
  const approversCount = await campagin.methods.approversCount().call();

  const requests = await Promise.all(
    Array(parseInt(requestCount))
      .fill()
      .map((element, index) => {
        return campagin.methods.requests(index).call();
      })
  );
  return {
    address,
    requests,
    requestCount,
    approversCount,
  };
};

export default Requests;
