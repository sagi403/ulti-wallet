import { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import Message from "../components/Message";
import ConfirmSendModal from "../modals/ConfirmSendModal";
import SuccessfulSendModal from "../modals/SuccessfulSendModal";
import { coinUserData } from "../store/coinSlice";
import localString from "../utils/localString";
import addressSchema from "../validation/addressValidation";
import validate from "../validation/validate";

const SendAppScreen = () => {
  const [currentCoin, setCurrentCoin] = useState({});
  const [address, setAddress] = useState("");
  const [addressValidateMsg, setAddressValidateMsg] = useState("");
  const [amount, setAmount] = useState("");
  const [usdAmount, setUsdAmount] = useState("0.00");
  const [modalShow, setModalShow] = useState(false);
  const [confirmModalShow, setConfirmModalShow] = useState(false);

  const { userCoinsInfo, loading, error } = useSelector(state => state.coin);

  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!userCoinsInfo) {
      dispatch(coinUserData());
      return;
    }
    const [coin] = userCoinsInfo.filter(item => item.id === +id);

    setCurrentCoin(coin ? coin : userCoinsInfo[0]);
  }, [dispatch, userCoinsInfo, id]);

  const handleAddressBlur = () => {
    const { error } = validate({ address }, addressSchema);

    if (error && error.details) {
      setAddressValidateMsg(error.details[0].message);
      return;
    }
    setAddressValidateMsg("");
  };

  const handleSetCoinAmountBlur = () => {
    if (amount <= 0) {
      setAmount("");
      setUsdAmount("0.00");
      return;
    }

    if (amount > currentCoin.balance) {
      setAmount(currentCoin.balance);
      setUsdAmount(localString(currentCoin.balance * currentCoin.price));
      return;
    }

    amount
      ? setUsdAmount(localString(amount * currentCoin.price))
      : setUsdAmount("0.00");
  };

  const handlePickAmountBtn = amountPicked => {
    setAmount(amountPicked);
    setUsdAmount(localString(amountPicked * currentCoin.price));
  };

  const handleSendCoinsBtn = () => {
    setCurrentCoin(prev => {
      return { ...prev, amount, usdAmount, address };
    });
    setModalShow(true);
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <Container fluid className="container_body">
      <div className="text-center pt-5">
        <div className="successful_swap_body">
          <div className="polygon my-5">
            <img src={currentCoin.logo} alt={currentCoin.name} />
          </div>
          <div className="inputs_container mb-4">
            <div className="my-4">
              <Form.Control
                type="text"
                value={address}
                onChange={e => setAddress(e.target.value)}
                placeholder={`Send to ${currentCoin.name} address...`}
                className="send_input"
                isInvalid={addressValidateMsg}
                onBlur={handleAddressBlur}
              />
              <Form.Control.Feedback type="invalid">
                {addressValidateMsg}
              </Form.Control.Feedback>
            </div>
            <div className="coin_amount_container d-flex align-items-center">
              <Form.Control
                type="number"
                placeholder="0.00"
                className="sent_amount d-inline float-start"
                style={{ color: currentCoin.color }}
                value={amount}
                onChange={e => setAmount(e.target.value)}
                onBlur={handleSetCoinAmountBlur}
              />
              <div className="d-flex ms-auto">
                <p
                  className="send_amount_auto_btn"
                  onClick={() => handlePickAmountBtn(currentCoin.balance)}
                >
                  ALL
                </p>
                <p
                  className="send_amount_auto_btn"
                  onClick={() => handlePickAmountBtn(currentCoin.balance / 2)}
                >
                  HALF
                </p>
                <span
                  className="ms-3 fs-5"
                  style={{ color: currentCoin.color }}
                >
                  {currentCoin.symbol}
                </span>
              </div>
            </div>
            <hr
              className="send_hr m-0"
              style={{ background: currentCoin.color }}
            />
            <div className="coin_amount_container d-flex align-items-center">
              <span className="usd_send_value">{usdAmount}</span>
              <div className="d-flex ms-auto">
                <span className="ms-3 fs-5 chart_total_value">USD</span>
              </div>
            </div>
          </div>
          <Button
            onClick={handleSendCoinsBtn}
            className="close_modal mx-auto my-4 w-25"
            style={{ borderColor: currentCoin.color }}
            disabled={!(amount > 0 && address !== "" && !addressValidateMsg)}
          >
            Send
          </Button>
          {amount > 0 && address !== "" && !addressValidateMsg && (
            <div className="send_info">
              You're sending{" "}
              <span style={{ color: currentCoin.color }}>
                {amount} {currentCoin.symbol}
              </span>{" "}
              (${usdAmount})
            </div>
          )}
        </div>
      </div>
      <ConfirmSendModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        onConfirm={() => setConfirmModalShow(true)}
        coinInfo={currentCoin}
      />
      <SuccessfulSendModal
        show={confirmModalShow}
        onHide={() => setConfirmModalShow(false)}
        coinInfo={currentCoin}
      />
    </Container>
  );
};

export default SendAppScreen;
