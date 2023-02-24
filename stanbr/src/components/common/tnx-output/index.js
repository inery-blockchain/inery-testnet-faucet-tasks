import React from "react";
import { Container } from "react-bootstrap";

const TnxOutput = ({ data }) => {
  return (
    <Container className="border border-warning p-5 bg-light  container mt-5">
      <h3>Transaction Details:</h3>
      <div>
        <pre>
          <code>{JSON.stringify(data, null, 2)}</code>
        </pre>
      </div>
    </Container>
  );
};

export default TnxOutput;
