import { Col, Row } from "react-bootstrap";

const CoinInfoBarPartial = ({ title, info, classes = "" }) => {
  return (
    <Col className={`text-center ${classes}`}>
      <Row>
        <h5 className="chart_total_assets">{title}</h5>
      </Row>
      <Row>
        <h5 className="chart_total_value">{info}</h5>
      </Row>
    </Col>
  );
};

export default CoinInfoBarPartial;
