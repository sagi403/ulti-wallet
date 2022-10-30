import { useEffect, useState } from "react";
import { Button, Col, Container, Modal, Row, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import localString from "../utils/localString";

const ExchangeAppScreen = () => {
  const [coinExchangeFrom, setCoinExchangeFrom] = useState("");
  const [coinAmount, setCoinAmount] = useState("");
  const [coinReceivedMessage, setCoinReceivedMessage] = useState(false);
  const [modalShow, setModalShow] = useState(false);

  const { coinInfo, loading, error } = useSelector(state => state.coin);

  useEffect(() => {
    console.log(coinInfo);
    if (coinInfo) {
      setCoinExchangeFrom(coinInfo[0]);
    }
  }, [coinInfo]);

  const handleSetCoinAmount = () => {
    setCoinReceivedMessage(true);
  };

  function MyVerticallyCenteredModal(props) {
    return (
      <Modal
        {...props}
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
                    onClick={props.onHide}
                  >
                    <td className="ps-4 pt-3">
                      <Row>
                        <Col lg="3">
                          <img
                            src={item.logo}
                            alt={item.name}
                            className="mask"
                          />
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
                            ${localString(item.value)}
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
  }

  return (
    <Container fluid className="portfolio">
      <Container className="coin_cards">
        <div className="coin_card_upper">
          <Row className="m-0">
            <Col className="d-flex justify-content-start">
              <p className="exchange_extra_data">
                Balance: {coinExchangeFrom.balance} {coinExchangeFrom.name}
              </p>
            </Col>
          </Row>
          <Row className="m-0">
            <Col className="d-flex justify-content-start">
              <img
                src={coinExchangeFrom.logo}
                alt={coinExchangeFrom.name}
                className="mask"
              />
              <h2 className="coin_picker" onClick={() => setModalShow(true)}>
                {coinExchangeFrom.symbol} &nbsp;&nbsp;&nbsp;
                <FontAwesomeIcon icon={faChevronDown} />
              </h2>
            </Col>
            <Col className="d-flex justify-content-end">
              <input
                type="number"
                placeholder="0.00"
                className="amount_exchange"
                style={{ color: coinExchangeFrom.color }}
                value={coinAmount}
                onChange={e => setCoinAmount(e.target.value)}
                onBlur={handleSetCoinAmount}
              />
            </Col>
          </Row>
          <Row className="m-0">
            <Col className="d-flex justify-content-end">
              <p className="exchange_extra_data">Balance:0.4214</p>
            </Col>
          </Row>
        </div>
        <div className="coin_card_lower">
          <Row className="m-0">
            <Col className="d-flex justify-content-start">
              <p className="exchange_extra_data">
                Balance: {coinExchangeFrom.balance} {coinExchangeFrom.name}
              </p>
            </Col>
          </Row>
          <Row className="m-0">
            <Col className="d-flex justify-content-start">
              <img
                src={coinExchangeFrom.logo}
                alt={coinExchangeFrom.name}
                className="mask"
              />
              <h2 className="coin_picker">
                {coinExchangeFrom.symbol} &nbsp;&nbsp;&nbsp;
                <FontAwesomeIcon icon={faChevronDown} />
              </h2>
            </Col>
            <Col className="d-flex justify-content-end">
              <h2>0.36851</h2>
            </Col>
          </Row>
          <Row className="m-0">
            <Col className="d-flex justify-content-end">
              <p>Balance:0.4214</p>
            </Col>
          </Row>
        </div>
        {coinReceivedMessage && (
          <div className="alert received_alert" role="alert">
            🎉 You will receive = $24.56 in ETH
          </div>
        )}
        <MyVerticallyCenteredModal
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      </Container>
    </Container>
  );
};

export default ExchangeAppScreen;
