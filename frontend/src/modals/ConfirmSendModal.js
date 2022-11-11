import axios from "axios";
import { Button, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { refreshStats } from "../store/generalSlice";

const ConfirmSendModal = ({ show, onHide, coinInfo, onConfirm, onFail }) => {
  const dispatch = useDispatch();

  const handleConfirmSendBtn = async () => {
    const data = {
      address: coinInfo.address,
      sentAmount: +coinInfo.amount,
      coinId: +coinInfo.id,
    };

    try {
      await axios.put("/api/transaction/send", data);
      dispatch(refreshStats());
    } catch (error) {
      onFail();
      return;
    } finally {
      onHide();
    }

    onConfirm();
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton className="coin_exchange_from_table" />
      <Modal.Body className="coin_exchange_from_table">
        <div className="successful_swap_body">
          <div className="polygon position-relative mb-5">
            <img src={coinInfo.logo} alt={coinInfo.name} />
          </div>
          <p className="chart_total_assets mb-0">Are you sure you want to</p>
          <p className="send_amount mb-4">Send ${coinInfo.usdAmount || "0"}?</p>
          <div className="address_box">
            <p className="fs-5" style={{ color: coinInfo.color }}>
              {coinInfo.amount} {coinInfo.symbol}
            </p>
            <p className="chart_total_assets mb-0">To address</p>
            <p className="chart_total_value mb-0">{coinInfo.address}</p>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className="coin_exchange_from_table d-flex justify-content-evenly pb-5">
        <Button onClick={onHide} className="close_modal">
          Back
        </Button>
        <Button
          onClick={handleConfirmSendBtn}
          className="close_modal"
          style={{ borderColor: coinInfo.color }}
        >
          Send
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmSendModal;
