import { useEffect, useState } from "react";
import { Button, ButtonGroup, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import ChooseCoinModal from "../components/ChooseCoinModal";
import localString from "../utils/localString";
import { coinAllData, coinUserData } from "../store/coinSlice";

const ExchangeAppScreen = () => {
  const [coinExchangeFrom, setCoinExchangeFrom] = useState("");
  const [coinExchangeTo, setCoinExchangeTo] = useState("");
  const [coinAmount, setCoinAmount] = useState("");
  const [coinReceivedMessage, setCoinReceivedMessage] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [modalPickUser, setModalPickUser] = useState(true);

  const dispatch = useDispatch();

  const { coinInfo, userCoinsInfo, allCoinsInfo, loading, error } = useSelector(
    state => state.coin
  );

  useEffect(() => {
    if (!userCoinsInfo) {
      dispatch(coinUserData());
      return;
    }
    if (!allCoinsInfo) {
      dispatch(coinAllData());
      return;
    }

    userCoinsInfo && setCoinExchangeFrom(userCoinsInfo[0]);
    allCoinsInfo && setCoinExchangeTo(allCoinsInfo[0]);
  }, [dispatch, userCoinsInfo, allCoinsInfo]);

  const handleSetCoinAmount = coin => {
    if (coinAmount > coin.balance) {
      setCoinAmount(coin.balance);
    }

    coinAmount ? setCoinReceivedMessage(true) : setCoinReceivedMessage(false);
  };

  const handleCoinPick = coin => {
    modalPickUser ? setCoinExchangeFrom(coin) : setCoinExchangeTo(coin);
    setCoinAmount("");
    setCoinReceivedMessage(false);
  };

  const handlePickAmountBtn = amount => {
    setCoinAmount(amount);

    amount ? setCoinReceivedMessage(true) : setCoinReceivedMessage(false);
  };

  const handleWhoPickModal = select => {
    if (select === "user") {
      setModalPickUser(true);
    } else if (select === "all") {
      setModalPickUser(false);
    }

    setModalShow(true);
  };

  return (
    <Container fluid className="portfolio">
      <Container className="coin_cards">
        <div className="coin_card_upper">
          <Row className="m-0">
            <Col className="d-flex justify-content-start">
              <p className="chart_total_assets">
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
              <h2
                className="coin_picker"
                onClick={() => handleWhoPickModal("user")}
              >
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
                onBlur={() => handleSetCoinAmount(coinExchangeFrom)}
              />
            </Col>
          </Row>
          <Row className="m-0">
            <Col className="d-flex justify-content-end">
              <p className="chart_total_assets">
                ${localString(coinAmount * coinExchangeFrom.price)}
              </p>
            </Col>
          </Row>
        </div>
        <div className="coin_card_lower">
          <Row className="m-0">
            <Col className="d-flex justify-content-start">
              <p className="chart_total_assets">
                Balance: {coinExchangeTo.balance} {coinExchangeTo.name}
              </p>
            </Col>
          </Row>
          <Row className="m-0">
            <Col className="d-flex justify-content-start">
              <img
                src={coinExchangeTo.logo}
                alt={coinExchangeTo.name}
                className="mask"
              />
              <h2
                className="coin_picker"
                onClick={() => handleWhoPickModal("all")}
              >
                {coinExchangeTo.symbol} &nbsp;&nbsp;&nbsp;
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

        <div className="btn_container">
          <ButtonGroup className="coin_amount_btn_group">
            <Button
              className="coin_amount_btn"
              onClick={() => handlePickAmountBtn("")}
            >
              MIN
            </Button>
            <Button
              className="coin_amount_btn"
              onClick={() => handlePickAmountBtn(coinExchangeFrom.balance / 2)}
            >
              HALF
            </Button>
            <Button
              className="coin_amount_btn"
              onClick={() => handlePickAmountBtn(coinExchangeFrom.balance)}
            >
              ALL
            </Button>
          </ButtonGroup>
        </div>
        <div className="btn_container">
          <Button className="coins_exchange" disabled={!coinReceivedMessage}>
            {coinReceivedMessage ? "EXCHANGE" : "ENTER AMOUNT"}
          </Button>
        </div>

        <div className="exchange_info">
          <p>1 {coinExchangeFrom.symbol} = 14.23452 ETH</p>{" "}
          {/* Need to update */}
        </div>

        <ChooseCoinModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          coinInfo={modalPickUser ? userCoinsInfo : allCoinsInfo}
          onCoinPick={handleCoinPick}
        />
      </Container>
    </Container>
  );
};

export default ExchangeAppScreen;
