import { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

const ExchangeAppScreen = () => {
  const [coinExchangeFrom, setCoinExchangeFrom] = useState("");
  const [coinAmount, setCoinAmount] = useState("");
  const [coinReceivedMessage, setCoinReceivedMessage] = useState(false);

  const { coinInfo, loading, error } = useSelector(state => state.coin);

  useEffect(() => {
    console.log(coinInfo);
    if (coinInfo) {
      setCoinExchangeFrom(coinInfo[0]);
    }
  }, [coinInfo]);

  const handleSetCoinAmount = () => {
    setCoinReceivedMessage(true);
  };

  return (
    <Container fluid className="portfolio">
      <Container className="coin_cards">
        <div className="coin_card_upper">
          <Row className="m-0">
            <Col className="d-flex justify-content-start">
              <p className="exchange_extra_data">
                Balance: {coinExchangeFrom.balance} {coinExchangeFrom.name}
              </p>
            </Col>
          </Row>
          <Row className="m-0">
            <Col className="d-flex justify-content-start">
              <img
                src={coinExchangeFrom.logo}
                alt={coinExchangeFrom.name}
                className="mask"
              />
              <h2 className="coin_picker">
                {coinExchangeFrom.symbol} &nbsp;&nbsp;&nbsp;
                <FontAwesomeIcon icon={faChevronDown} />
              </h2>
            </Col>
            <Col className="d-flex justify-content-end">
              <input
                type="number"
                placeholder="0.00"
                className="amount_exchange"
                style={{ color: coinExchangeFrom.color }}
                value={coinAmount}
                onChange={e => setCoinAmount(e.target.value)}
                onBlur={handleSetCoinAmount}
              />
            </Col>
          </Row>
          <Row className="m-0">
            <Col className="d-flex justify-content-end">
              <p className="exchange_extra_data">Balance:0.4214</p>
            </Col>
          </Row>
        </div>
        <div className="coin_card_lower">
          <Row className="m-0">
            <Col className="d-flex justify-content-start">
              <p className="exchange_extra_data">
                Balance: {coinExchangeFrom.balance} {coinExchangeFrom.name}
              </p>
            </Col>
          </Row>
          <Row className="m-0">
            <Col className="d-flex justify-content-start">
              <img
                src={coinExchangeFrom.logo}
                alt={coinExchangeFrom.name}
                className="mask"
              />
              <h2 className="coin_picker">
                {coinExchangeFrom.symbol} &nbsp;&nbsp;&nbsp;
                <FontAwesomeIcon icon={faChevronDown} />
              </h2>
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
        {coinReceivedMessage && (
          <div className="alert received_alert" role="alert">
            🎉 You will receive = $24.56 in ETH
          </div>
        )}
      </Container>
    </Container>
  );
};

export default ExchangeAppScreen;
