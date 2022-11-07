import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef } from "react";
import { Button, Modal } from "react-bootstrap";

const ReceiveModal = ({ show, onHide, coinInfo }) => {
  const addressRef = useRef(null);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(addressRef.current.innerText);
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
          <p className="chart_total_value">Your {coinInfo.name} Address</p>
          <p
            className="copy_address_box"
            style={{ color: coinInfo.color }}
            ref={addressRef}
          >
            gfdshsfdhfsdpgfdgfdpogrfdgrgreg
            <span className="copy_btn" onClick={handleCopyAddress}>
              <FontAwesomeIcon icon={faCopy} />
            </span>
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
