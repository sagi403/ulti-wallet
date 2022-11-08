import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { Form } from "react-bootstrap";
import addressSchema from "../validation/addressValidation";
import validate from "../validation/validate";

const SendModal = ({ show, onHide, coinInfo }) => {
  const [address, setAddress] = useState("");
  const [addressValidateMsg, setAddressValidateMsg] = useState(null);
  const [amount, setAmount] = useState("");

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
          <div className="mb-5">
            <img src={coinInfo.logo} alt={coinInfo.name} />
          </div>
          <div className="inputs_container">
            <div className="my-4">
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
            <div className="coin_amount_container d-flex align-items-center">
              <Form.Control
                type="number"
                placeholder="0.00"
                className="sent_amount d-inline float-start"
                style={{ color: coinInfo.color }}
                value={amount}
                onChange={e => setAmount(+e.target.value || "")}
                // onBlur={() => handleSetCoinAmount(coin)}
              />
              <div className="d-flex ms-auto">
                <p className="send_amount_auto_btn">ALL</p>
                <p className="send_amount_auto_btn">HALF</p>
                <span className="ms-3 fs-5" style={{ color: coinInfo.color }}>
                  {coinInfo.symbol}
                </span>
              </div>
            </div>
            <hr
              className="send_hr m-0"
              style={{ background: coinInfo.color }}
            />
            <div className="coin_amount_container d-flex align-items-center">
              <span className="usd_send_value">0.00</span>
              <div className="d-flex ms-auto">
                <span className="ms-3 fs-5 chart_total_value">USD</span>
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className="coin_exchange_from_table">
        <Button
          onClick={onHide}
          className="close_modal mx-auto my-4 w-25"
          style={{ borderColor: coinInfo.color }}
        >
          Send
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SendModal;
