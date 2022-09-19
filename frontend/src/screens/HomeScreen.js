import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWallet } from "@fortawesome/free-solid-svg-icons";

const HomeScreen = () => {
  return (
    <Container>
      <Row className="mt-5">
        <Col>
          <h2 className="logo-home">
            <FontAwesomeIcon icon={faWallet} /> Ulti
          </h2>
        </Col>
      </Row>
      <Row className="mt-5">
        <Col>
          <h1 className="desc-home">More than just a wallet</h1>
          <h3 className="mt-3 mb-5">
            Ulti makes it safe & easy for you to store, buy, send, receive, swap
            tokens on your web browser
          </h3>
          <Button variant="outline-primary" className="me-3">
            Sign Up
          </Button>
          <Button variant="primary">Sign In</Button>
        </Col>
        <Col>Add Picture</Col>
      </Row>
    </Container>
  );
};

export default HomeScreen;
