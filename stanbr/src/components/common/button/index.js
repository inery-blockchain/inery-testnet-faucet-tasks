import React from "react";
import { Spinner } from "react-bootstrap";
import Button from "react-bootstrap/Button";

const ButtonCustom = ({ children, loading, ...rest }) => {
  return (
    <Button {...rest} variant="outline-warning">
      {loading ? (
        <>
          <Spinner className="mx-2" animation="border" variant="warning" />
        </>
      ) : (
        children
      )}
    </Button>
  );
};

export default ButtonCustom;
