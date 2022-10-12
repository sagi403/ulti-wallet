import { Col, Row } from "react-bootstrap";

const CoinsGeneralInfoBar = ({ title, info }) => {
  return (
    <Col className="text-center">
      <Row>
        <h4>{title}</h4>
      </Row>
      <Row>
        <h4>{info}</h4>
      </Row>
    </Col>
  );
};

export default CoinsGeneralInfoBar;
