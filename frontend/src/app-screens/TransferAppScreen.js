import { faArrowRightArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import ChooseCoinModal from "../modals/ChooseCoinModal";
import { coinAllData, resetError } from "../store/coinSlice";
import localString from "../utils/localString";
import Loader from "../components/Loader";
import Message from "../components/Message";

const TransferAppScreen = () => {
  const [currentCoin, setCurrentCoin] = useState({});
  const [modalShow, setModalShow] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { allCoinsInfo, loading, error } = useSelector(state => state.coin);

  useEffect(() => {
    if (!allCoinsInfo) {
      dispatch(coinAllData());
      return;
    }
    const [coin] = allCoinsInfo.filter(item => item.id === +id);

    setCurrentCoin(coin ? coin : allCoinsInfo[0]);
  }, [dispatch, allCoinsInfo, id]);

  useEffect(() => {
    if (error === "Coin not found") {
      dispatch(resetError());
    }
  }, [dispatch, error]);

  const handleCoinPick = coin => {
    setCurrentCoin(coin);
    navigate(`/app/transfer/${coin.id}`);
  };

  const handleTransferCoins = action => {
    navigate(`/app/transfer/${currentCoin.id}/${action}`);
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <Container fluid className="portfolio py-5">
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
          onClick={() => handleTransferCoins("send")}
          disabled={!currentCoin.balance}
        >
          Send
        </Button>
        <Button
          className="transfer_btn mx-2"
          style={{ borderColor: currentCoin.color }}
          onClick={() => handleTransferCoins("receive")}
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
        onCoinPick={coin => handleCoinPick(coin)}
      />
    </Container>
  );
};

export default TransferAppScreen;
