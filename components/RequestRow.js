import React, { useState } from "react";
import { useRouter } from "next/router";
import { Table, Button, Message } from "semantic-ui-react";
import web3 from "../ethereum/web3";
import { getCampaign } from "../ethereum/campaign";

const RequestRow = ({ id, request, address, approversCount }) => {
  const { Row, Cell } = Table;
  const { description, value, recipient, approvalCount, complete } = request;

  const [loadingApprove, setLoadingApprove] = useState(false);
  const [loadingFinalize, setLoadingFinalize] = useState(false);
  const [isComplete, setIsComplete] = useState(complete);
  const [approveErrorMessage, setapproveErrorMessage] = useState("");
  const [finalizeErrorMessage, setFinalizeErrorMessage] = useState("");
  const [isReadyToFinalize, setIsReadyToFinalize] = useState(
    approvalCount > approversCount / 2
  );
  const router = useRouter();

  const onApprove = async () => {
    const campaign = getCampaign(address);
    const accounts = await web3.eth.getAccounts();
    setLoadingApprove(true);
    try {
      await campaign.methods.approveRequest(id).send({
        from: accounts[0],
      });
      router.replace(router.asPath);
    } catch (error) {
      setapproveErrorMessage(error);
    } finally {
      setLoadingApprove(false);
    }
  };

  const onFinalize = async () => {
    const campaign = getCampaign(address);
    const accounts = await web3.eth.getAccounts();
    setLoadingFinalize(true);
    try {
      await campaign.methods.finalizeRequest(id).send({
        from: accounts[0],
      });
      router.replace(router.asPath);
    } catch (error) {
      console.log(error);
      setFinalizeErrorMessage(error);
    } finally {
      setLoadingFinalize(false);
    }
  };

  return (
    <Row disabled={isComplete} positive={isReadyToFinalize && !isComplete}>
      <Cell>{id}</Cell>
      <Cell>{description}</Cell>
      <Cell>{web3.utils.fromWei(value, "ether")}</Cell>
      <Cell>{recipient}</Cell>
      <Cell>{approvalCount + "/" + approversCount}</Cell>
      <Cell>
        {isComplete ? null : (
          <Button
            color="green"
            basic
            onClick={onApprove}
            loading={loadingApprove}
          >
            Approve
          </Button>
        )}
      </Cell>
      <Cell>
        {isComplete ? null : (
          <Button
            color="teal"
            basic
            onClick={onFinalize}
            loading={loadingFinalize}
          >
            Finalize
          </Button>
        )}
      </Cell>
    </Row>
  );
};

export default RequestRow;
