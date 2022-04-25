import Link from "next/link";
import React from "react";
import { Button } from "semantic-ui-react";

import Layout from "../../../components/Layout";

const Requests = ({ address }) => {
  const newRequestPath = "/campaigns/" + address + "/requests/new";

  return (
    <Layout>
      <h3>Requests</h3>
      <Link href={newRequestPath}>
        <a>
          <Button primary>Add Request</Button>
        </a>
      </Link>
    </Layout>
  );
};

Requests.getInitialProps = async (context) => {
  let address = context.query.address;
  return {
    address,
  };
};

export default Requests;
