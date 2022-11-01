import { Button, Col, Modal, Row, Table } from "react-bootstrap";
import localString from "../utils/localString";

const SuccessfulExchangeModal = ({ show, onHide, coinInfo, onCoinPick }) => {
  const handleCoinPick = coin => {
    onCoinPick(coin);
    onHide();
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      backdrop="static"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header className="coin_exchange_from_table">
        <Modal.Title
          id="contained-modal-title-vcenter"
          className="successful_swap_title"
        >
          Exchange in process!
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="coin_exchange_from_table">
        <div className="successful_swap_body">
          <p>
            In a couple of seconds, your {coinInfo.name} will arrive.
            <br />
            You can safely use Ultra Wallet or start a new exchange while
            waiting for your {coinInfo.name} deposit.
          </p>
          <div className="polygon position-relative mt-5">
            <img src={coinInfo.logo} alt={coinInfo.name} />
            <span className="position-absolute top-100 start-100 translate-middle badge rounded-circle badge">
              ✓
            </span>
          </div>
          <hr className="portfolio_hr w-50 mx-auto" />
          <p className="success_usd_amount">
            You will receive ${localString(coinInfo.usdReceivedAmount)} USD
          </p>
          <h3 className="success_coins_amount">
            + {localString(coinInfo.coinReceiveAmount, 5)} {coinInfo.symbol}
          </h3>
        </div>
      </Modal.Body>
      <Modal.Footer className="coin_exchange_from_table">
        <Button className="Portfolio_btn" onClick={onHide}>
          BACK TO PORTFOLIO
        </Button>
        <Button className="new_exchange_btn" onClick={onHide}>
          START A NEW EXCHANGE
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SuccessfulExchangeModal;
