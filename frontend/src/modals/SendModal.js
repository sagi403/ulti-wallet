import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { Form } from "react-bootstrap";
import addressSchema from "../validation/addressValidation";
import validate from "../validation/validate";

const SendModal = ({ show, onHide, coinInfo }) => {
  const [address, setAddress] = useState("");
  const [addressValidateMsg, setAddressValidateMsg] = useState(null);

  useEffect(() => {
    setAddress("");
    setAddressValidateMsg(null);
  }, [show]);

  const handleAddressBlur = () => {
    const { error } = validate({ address }, addressSchema);

    if (error && error.details) {
      setAddressValidateMsg(error.details[0].message);
      return;
    }
    setAddressValidateMsg(null);
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
          <Form.Control
            type="text"
            value={address}
            onChange={e => setAddress(e.target.value)}
            placeholder={`Send to ${coinInfo.name} address...`}
            className="send_input"
            isInvalid={addressValidateMsg}
            onBlur={handleAddressBlur}
          />
          <Form.Control.Feedback type="invalid">
            {addressValidateMsg}
          </Form.Control.Feedback>
        </div>
      </Modal.Body>
      <Modal.Footer className="coin_exchange_from_table">
        <Button
          onClick={onHide}
          className="close_modal"
          style={{ borderColor: coinInfo.color }}
        >
          Send
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SendModal;
