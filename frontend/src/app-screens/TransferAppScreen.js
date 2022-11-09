import { faArrowRightArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import ChooseCoinModal from "../modals/ChooseCoinModal";
import { coinAllData } from "../store/coinSlice";
import localString from "../utils/localString";
import Loader from "../components/Loader";
import Message from "../components/Message";
import ReceiveModal from "../modals/ReceiveModal";
import SendModal from "../modals/SendModal";
import axios from "axios";

const TransferAppScreen = () => {
  const [currentCoin, setCurrentCoin] = useState({});
  const [modalShow, setModalShow] = useState(false);
  const [receiveModal, setReceiveModal] = useState(false);
  const [sendModal, setSendModal] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { allCoinsInfo, loading, error } = useSelector(state => state.coin);

  // useEffect(() => {
  //   console.log("currentCoin", currentCoin);
  // }, [currentCoin]);

  useEffect(() => {
    if (!allCoinsInfo) {
      dispatch(coinAllData());
      return;
    }
    const [coin] = allCoinsInfo.filter(item => item.id === +id);

    setCurrentCoin(coin ? coin : allCoinsInfo[0]);
  }, [dispatch, allCoinsInfo, id]);

  const handleCoinPick = coin => {
    setCurrentCoin(coin);
    navigate(`/app/transfer/${coin.id}`, { replace: true });
  };

  const handleReceiveCoins = async () => {
    if (currentCoin && currentCoin.public_address) {
      setReceiveModal(true);
      return;
    }

    try {
      const { data } = await axios.post("/api/address", {
        coinId: currentCoin.id,
      });

      setCurrentCoin(prev => {
        return { ...prev, ...data };
      });
    } catch (error) {
      console.log(error);
      return;
    }

    setReceiveModal(true);
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
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
          onClick={() => setSendModal(true)}
          disabled={!currentCoin.balance}
        >
          Send
        </Button>
        <Button
          className="transfer_btn mx-2"
          style={{ borderColor: currentCoin.color }}
          onClick={handleReceiveCoins}
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
      <ReceiveModal
        show={receiveModal}
        onHide={() => setReceiveModal(false)}
        coinInfo={currentCoin}
      />
      <SendModal
        show={sendModal}
        onHide={() => setSendModal(false)}
        coinInfo={currentCoin}
      />
    </Container>
  );
};

export default TransferAppScreen;
