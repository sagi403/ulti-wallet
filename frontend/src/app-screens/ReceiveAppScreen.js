import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { coinAllData } from "../store/coinSlice";

const ReceiveAppScreen = () => {
  const [currentCoin, setCurrentCoin] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const addressRef = useRef(null);

  const dispatch = useDispatch();
  const { id } = useParams();

  const { allCoinsInfo, loading, error } = useSelector(state => state.coin);

  useEffect(() => {
    if (!allCoinsInfo) {
      dispatch(coinAllData());
      return;
    }
    const [coin] = allCoinsInfo.filter(item => item.id === +id);

    if (!currentCoin.public_address) {
      (async () => {
        try {
          const { data } = await axios.post("/api/address", {
            coinId: coin.id,
          });

          setCurrentCoin({ ...coin, ...data });
        } catch (error) {
          setErrorMessage("Couldn't fetch an address, Please try again later.");
          return;
        }

        setErrorMessage("");
      })();
    }
  }, [dispatch, allCoinsInfo, id]);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(addressRef.current.innerText);
  };

  return loading ? (
    <Loader />
  ) : error || errorMessage ? (
    <Message variant="danger">{error || errorMessage}</Message>
  ) : (
    <Container fluid className="container_body">
      <div className="text-center pt-5">
        <div className="successful_swap_body">
          <div className="successful_swap_body">
            <div className="polygon position-relative my-5">
              <img src={currentCoin.logo} alt={currentCoin.name} />
            </div>
            <p className="chart_total_value">Your {currentCoin.name} Address</p>
            <p
              className="copy_address_box"
              style={{ color: currentCoin.color }}
              ref={addressRef}
            >
              {currentCoin.public_address}
              <span className="copy_btn" onClick={handleCopyAddress}>
                <FontAwesomeIcon icon={faCopy} />
              </span>
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ReceiveAppScreen;
