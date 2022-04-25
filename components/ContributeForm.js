import React, { useState } from "react";
import web3 from "../ethereum/web3";
import { Form, Input, Button, Message } from "semantic-ui-react";
import { NextRouter, useRouter } from "next/router";

const ContributeForm = ({ campaign }) => {
  const router = useRouter();
  const [value, setValue] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const onSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true);
    try {
      const accounts = await web3.eth.getAccounts();
      await campaign.methods.contribute().send({
        from: accounts[0],
        value: web3.utils.toWei(value, "ether"),
      });
      router.replace(router.asPath);
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setValue(0);
      setLoading(false);
    }
  };
  return (
    <Form onSubmit={onSubmit} error={!!errorMessage}>
      <Form.Field>
        <label>Ammount to Contribute</label>
        <Input
          label="ether"
          labelPosition="right"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </Form.Field>
      <Message error header="Oops!" content={errorMessage}></Message>
      <Button primary loading={loading}>
        Contribute!
      </Button>
    </Form>
  );
};

export default ContributeForm;
