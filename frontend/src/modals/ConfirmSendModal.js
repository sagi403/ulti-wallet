import { Button, Modal } from "react-bootstrap";

const ReceiveModal = ({ show, onHide, coinInfo, onSuccess }) => {
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
          <p className="chart_total_value">Your {coinInfo.name} Address</p>
          <p className="copy_address_box" style={{ color: coinInfo.color }}>
            {coinInfo.public_address}
          </p>
        </div>
      </Modal.Body>
      <Modal.Footer className="coin_exchange_from_table">
        <Button
          onClick={onHide}
          className="close_modal"
          style={{ borderColor: coinInfo.color }}
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ReceiveModal;
