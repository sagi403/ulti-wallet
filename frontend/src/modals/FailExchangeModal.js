import { Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";

const FailExchangeModal = ({ show, onHide }) => {
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
          Failed swap!
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="coin_exchange_from_table">
        <div className="successful_swap_body">
          <p>We couldn't complete your swap, please try again later.</p>
        </div>
      </Modal.Body>
      <Modal.Footer className="coin_exchange_from_table d-flex justify-content-evenly">
        <Link to="/app/portfolio">
          <Button className="Portfolio_btn" onClick={onHide}>
            BACK TO PORTFOLIO
          </Button>
        </Link>

        <Link to="/app/exchange">
          <Button className="new_exchange_btn" onClick={onHide}>
            START A NEW EXCHANGE
          </Button>
        </Link>
      </Modal.Footer>
    </Modal>
  );
};

export default FailExchangeModal;
