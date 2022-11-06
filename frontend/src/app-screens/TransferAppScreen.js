import { faArrowRightArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import ChooseCoinModal from "../components/ChooseCoinModal";
import { coinAllData } from "../store/coinSlice";
import localString from "../utils/localString";

const TransferAppScreen = () => {
  const [currentCoin, setCurrentCoin] = useState({});
  const [modalShow, setModalShow] = useState(false);

  const dispatch = useDispatch();

  const { allCoinsInfo, loading, error } = useSelector(state => state.coin);

  useEffect(() => {
    if (!allCoinsInfo) {
      dispatch(coinAllData());
      return;
    }

    setCurrentCoin(allCoinsInfo[0]);
  }, [dispatch, allCoinsInfo]);

  return (
    <Container fluid className="portfolio">
      <div className="text-center pt-5">
        <div className="polygon mx-auto">
          <img src={currentCoin.logo} alt={currentCoin.name} />
        </div>
        <div className="pt-5">
          <p className="total_coins" style={{ color: currentCoin.color }}>
            {currentCoin.balance || "0"} <span>{currentCoin.symbol}</span>
          </p>
        </div>
        <p className="total_usd">
          <span>$</span>
          {localString(currentCoin.price * currentCoin.balance)}{" "}
          <span>USD</span>
        </p>
        <Button
          className="transfer_btn mx-2"
          style={{ borderColor: currentCoin.color }}
        >
          Send
        </Button>
        <Button
          className="transfer_btn mx-2"
          style={{ borderColor: currentCoin.color }}
        >
          Receive
        </Button>
        <div>
          <Button
            className="coin_swap"
            style={{ background: currentCoin.color }}
            onClick={() => setModalShow(true)}
          >
            <FontAwesomeIcon icon={faArrowRightArrowLeft} />
          </Button>
        </div>
      </div>
      <ChooseCoinModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        coinInfo={allCoinsInfo}
        onCoinPick={coin => setCurrentCoin(coin)}
      />
    </Container>
  );
};

export default TransferAppScreen;
