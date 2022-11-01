import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col, Row } from "react-bootstrap";
import localString from "../utils/localString";

const ExchangeCardLower = ({ coin, amount, onPickModal }) => {
  return (
    <div className="coin_card_lower">
      <Row className="m-0">
        <Col className="d-flex justify-content-start">
          <p className="chart_total_assets">
            Balance: {coin.balance} {coin.name}
          </p>
        </Col>
      </Row>
      <Row className="m-0">
        <Col className="d-flex justify-content-start">
          <img src={coin.logo} alt={coin.name} className="mask" />
          <h2 className="coin_picker" onClick={() => onPickModal("all")}>
            {coin.symbol} &nbsp;&nbsp;&nbsp;
            <FontAwesomeIcon icon={faChevronDown} />
          </h2>
        </Col>
        <Col className="d-flex justify-content-end">
          <p className="amount_received" style={{ color: coin.color }}>
            {localString(amount, 5)}
          </p>
        </Col>
      </Row>
      <Row className="m-0">
        <Col className="d-flex justify-content-end">
          <p className="chart_total_assets">
            =${localString(amount * coin.price)}
          </p>
        </Col>
      </Row>
    </div>
  );
};

export default ExchangeCardLower;
