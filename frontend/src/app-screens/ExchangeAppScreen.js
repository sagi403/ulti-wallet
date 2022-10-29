import { Button, Card, Col, Container, Row } from "react-bootstrap";

const ExchangeAppScreen = () => {
  return (
    <Container fluid className="portfolio">
      <Container className="coin_cards">
        <div className="coin_card_upper">
          <Row className="m-0">
            <Col className="d-flex justify-content-start">
              <p>Balance:0.4214</p>
            </Col>
          </Row>
          <Row className="m-0">
            <Col className="d-flex justify-content-start">
              <h2>BTC</h2>
            </Col>
            <Col className="d-flex justify-content-end">
              <h2>0.36851</h2>
            </Col>
          </Row>
          <Row className="m-0">
            <Col className="d-flex justify-content-end">
              <p>Balance:0.4214</p>
            </Col>
          </Row>
        </div>
        <div className="coin_card_lower">
          <Row className="m-0">
            <Col className="d-flex justify-content-start">
              <p>Balance:0.4214</p>
            </Col>
          </Row>
          <Row className="m-0">
            <Col className="d-flex justify-content-start">
              <h2>BTC</h2>
            </Col>
            <Col className="d-flex justify-content-end">
              <h2>0.36851</h2>
            </Col>
          </Row>
          <Row className="m-0">
            <Col className="d-flex justify-content-end">
              <p>Balance:0.4214</p>
            </Col>
          </Row>
        </div>
      </Container>
    </Container>
  );
};

export default ExchangeAppScreen;
