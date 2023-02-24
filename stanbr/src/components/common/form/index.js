import React from "react";
import {
  Card,
  Col,
  Container,
  FloatingLabel,
  Form,
  Row,
} from "react-bootstrap";
import ButtonCustom from "../button/index";
const FormCard = ({
  idValue,
  idHandler,
  messageValue,
  messageHandler,
  loading,
  randomIdHandler,
  submitHandler,
  formHeading,
}) => {
  return (
    <Container className="container mt-5">
      <Card className="text-center">
        <Card.Header as="h4">{formHeading}</Card.Header>
        <Card.Body>
          <Row>
            <Col md={randomIdHandler ? 10 : 12}>
              <FloatingLabel
                controlId="floatingInput"
                label="ID"
                className="mb-3"
              >
                <Form.Control
                  value={idValue}
                  onChange={(e) => idHandler(e)}
                  type="text"
                  placeholder="Enter your id"
                />
              </FloatingLabel>
            </Col>
            {randomIdHandler && (
              <Col md={2}>
                <ButtonCustom onClick={randomIdHandler} className="mt-2">
                  {"Use Random Id"}
                </ButtonCustom>
              </Col>
            )}
          </Row>

          {messageHandler && (
            <FloatingLabel controlId="floatingTextarea2" label="Message">
              <Form.Control
                value={messageValue}
                onChange={(e) => messageHandler(e)}
                as="textarea"
                placeholder="Enter your message here"
                style={{ height: "100px" }}
              />
            </FloatingLabel>
          )}
          <ButtonCustom
            disabled={loading}
            loading={loading}
            onClick={submitHandler}
            className="mt-4"
          >
            Submit
          </ButtonCustom>
        </Card.Body>
        <Card.Footer className="text-muted"></Card.Footer>
      </Card>
    </Container>
  );
};

export default FormCard;
