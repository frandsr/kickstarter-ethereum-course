import Link from "next/link";
import React, { useState } from "react";
import { Button, Form, Message, Input } from "semantic-ui-react";
import Layout from "../../../../components/Layout";
import web3 from "../../../../ethereum/web3";

const RequestNew = ({ address }) => {
  console.log(address);
  const [value, setValue] = useState("");
  const [description, setDescription] = useState("");
  const [recipient, setRecipient] = useState("");
  return (
    <Layout>
      <h3>Create a Request</h3>
      <Form>
        <Form.Field>
          <label>Description</label>
          <Input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Value in Ether</label>
          <Input value={value} onChange={(e) => setValue(e.target.value)} />
        </Form.Field>
        <Form.Field>
          <label>Recipient</label>
          <Input
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
          />
        </Form.Field>
        <Button primary>Create!</Button>
      </Form>
    </Layout>
  );
};

RequestNew.getInitialProps = async (context) => {
  let address = context.query.address;
  return {
    address,
  };
};

export default RequestNew;
