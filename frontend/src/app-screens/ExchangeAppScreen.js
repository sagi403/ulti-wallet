import { useEffect, useState } from "react";
import { Button, ButtonGroup, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import ChooseCoinModal from "../components/ChooseCoinModal";
import localString from "../utils/localString";
import { coinAllData, coinUserData } from "../store/coinSlice";
import ExchangeCardUpper from "../partials/ExchangeCardUpper";
import ExchangeCardLower from "../partials/ExchangeCardLower";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsUpDown } from "@fortawesome/free-solid-svg-icons";

const ExchangeAppScreen = () => {
  const [coinExchangeFrom, setCoinExchangeFrom] = useState("");
  const [coinExchangeTo, setCoinExchangeTo] = useState("");
  const [coinPayAmount, setCoinPayAmount] = useState("");
  const [coinReceiveAmount, setCoinReceiveAmount] = useState("0.00");
  const [coinReceivedMessage, setCoinReceivedMessage] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [modalPickUser, setModalPickUser] = useState(true);

  const dispatch = useDispatch();

  const { userCoinsInfo, allCoinsInfo, loading, error } = useSelector(
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
    coinPayAmount
      ? setCoinReceivedMessage(true)
      : setCoinReceivedMessage(false);

    if (coinPayAmount > coin.balance) {
      setCoinPayAmount(coin.balance);
      setCoinReceiveAmount(
        (coin.balance * coinExchangeFrom.price) / coinExchangeTo.price
      );
      return;
    }

    setCoinReceiveAmount(
      (coinPayAmount * coinExchangeFrom.price) / coinExchangeTo.price
    );
  };

  const handleCoinPick = coin => {
    modalPickUser ? setCoinExchangeFrom(coin) : setCoinExchangeTo(coin);

    if (modalPickUser) {
      setCoinPayAmount("");
      setCoinReceiveAmount("0.00");
      setCoinReceivedMessage(false);
    } else {
      setCoinReceiveAmount(
        (coinPayAmount * coinExchangeFrom.price) / coin.price
      );
    }
  };

  const handlePickAmountBtn = amount => {
    setCoinPayAmount(amount);
    setCoinReceiveAmount(
      (amount * coinExchangeFrom.price) / coinExchangeTo.price
    );

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

  const handleSwap = () => {
    const temp = coinExchangeFrom;
    setCoinExchangeFrom(coinExchangeTo);
    setCoinExchangeTo(temp);

    setCoinPayAmount("");
    setCoinReceiveAmount("0.00");
  };

  return (
    <Container fluid className="portfolio">
      <Container className="coin_cards">
        <div className="position-relative mx-auto">
          <ExchangeCardUpper
            coin={coinExchangeFrom}
            amount={coinPayAmount}
            onPickModal={handleWhoPickModal}
            onSettingAmount={setCoinPayAmount}
            handleSetCoinAmount={handleSetCoinAmount}
          />
          <p className="swap_btn" onClick={() => handleSwap()}>
            <FontAwesomeIcon icon={faArrowsUpDown} />
          </p>
          <ExchangeCardLower
            coin={coinExchangeTo}
            amount={coinReceiveAmount}
            onPickModal={handleWhoPickModal}
          />
        </div>

        {coinReceivedMessage && (
          <div className="alert received_alert" role="alert">
            🎉 You will receive = $
            {localString(coinReceiveAmount * coinExchangeTo.price)} in{" "}
            {coinExchangeTo.symbol}
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

        <div className="exchange_info pb-4">
          <p>
            1 {coinExchangeFrom.symbol} ={" "}
            {localString(coinExchangeFrom.price / coinExchangeTo.price) ===
            "0.00"
              ? localString(coinExchangeFrom.price / coinExchangeTo.price, 5)
              : localString(coinExchangeFrom.price / coinExchangeTo.price)}{" "}
            {coinExchangeTo.symbol}
          </p>
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
