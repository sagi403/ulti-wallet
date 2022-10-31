import { Col, Modal, Row, Table } from "react-bootstrap";
import localString from "../utils/localString";

const ChooseCoinModal = ({ show, onHide, coinInfo, onCoinPick }) => {
  const handleCoinPick = coin => {
    onCoinPick(coin);
    onHide();
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton className="coin_exchange_from_table">
        <Modal.Title
          id="contained-modal-title-vcenter"
          className="chart_total_value"
        >
          Select Asset to Receive
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="coin_exchange_from_table">
        <Table hover>
          <tbody>
            {coinInfo &&
              coinInfo.map(item => (
                <tr
                  key={item.id}
                  className="portfolio_table_body"
                  onClick={() => handleCoinPick(item)}
                >
                  <td className="ps-4 pt-3">
                    <Row>
                      <Col lg="3">
                        <img src={item.logo} alt={item.name} className="mask" />
                      </Col>
                      <Col className="my-auto">
                        <Row className="coin_title">{item.name}</Row>
                        <Row className="coin_subtitle">{item.symbol}</Row>
                      </Col>
                    </Row>
                  </td>
                  <td className="align-middle pe-5">
                    <Row>
                      <Col>
                        <Row className="coin_title justify-content-end">
                          {localString(item.balance)} {item.symbol}
                        </Row>
                        <Row className="coin_subtitle justify-content-end">
                          ${localString(item.balance * item.price)}
                        </Row>
                      </Col>
                    </Row>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </Modal.Body>
      <Modal.Footer className="coin_exchange_from_table" />
    </Modal>
  );
};

export default ChooseCoinModal;
