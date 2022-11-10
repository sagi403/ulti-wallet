import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const SuccessfulSendModal = ({ show, onHide, coinInfo }) => {
  const navigate = useNavigate();

  const handleSuccessSend = () => {
    onHide();
    navigate(`/app/transfer/${coinInfo.id}`);
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
      <Modal.Header className="coin_exchange_from_table" />
      <Modal.Body className="coin_exchange_from_table">
        <div className="successful_swap_body">
          <div
            className="position-relative success_send_icon"
            style={{ color: coinInfo.color }}
          >
            <FontAwesomeIcon icon={faCircleCheck} />
          </div>
          <p className="send_amount m-0">Success!</p>
          <p className="chart_total_assets mb-0">{coinInfo.name} sent.</p>
        </div>
      </Modal.Body>
      <Modal.Footer className="coin_exchange_from_table p-0">
        <Button
          onClick={handleSuccessSend}
          className="new_exchange_btn w-25 mt-4"
        >
          Ok
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SuccessfulSendModal;
