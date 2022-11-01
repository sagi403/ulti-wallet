import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col, Row } from "react-bootstrap";
import localString from "../utils/localString";

const ExchangeCardUpper = ({
  coin,
  amount,
  onPickModal,
  onSettingAmount,
  handleSetCoinAmount,
}) => {
  return (
    <div className="coin_card_upper">
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
          <h2 className="coin_picker" onClick={() => onPickModal("user")}>
            {coin.symbol} &nbsp;&nbsp;&nbsp;
            <FontAwesomeIcon icon={faChevronDown} />
          </h2>
        </Col>
        <Col className="d-flex justify-content-end">
          <input
            type="number"
            placeholder="0.00"
            className="amount_exchange"
            style={{ color: coin.color }}
            value={amount}
            onChange={e => onSettingAmount(+e.target.value)}
            onBlur={() => handleSetCoinAmount(coin)}
          />
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

export default ExchangeCardUpper;
