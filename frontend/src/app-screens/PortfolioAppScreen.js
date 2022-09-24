import { Col, Container, Row, Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort } from "@fortawesome/free-solid-svg-icons";

const PortfolioAppScreen = () => {
  return (
    <Container>
      <Row>
        <Col className="d-flex justify-content-center">
          <h3>Pie chart</h3>
        </Col>
      </Row>
      <hr />
      <Row>
        <Col className="text-center">
          <h4>24h Change</h4>
        </Col>
        |
        <Col className="text-center">
          <h4>Portfolio Age</h4>
        </Col>
        |
        <Col className="text-center">
          <h4>Best 24h Asset</h4>
        </Col>
        |
        <Col className="text-center">
          <h4>Worst 24h Asset</h4>
        </Col>
      </Row>
      <Row>
        <Col>
          <Table striped bordered hover responsive variant="active">
            <thead>
              <tr>
                <th>
                  ASSET NAME <FontAwesomeIcon icon={faSort} />
                </th>
                <th className="text-end">
                  PRICE <FontAwesomeIcon icon={faSort} />
                </th>
                <th className="text-end">
                  24H CHANGE <FontAwesomeIcon icon={faSort} />
                </th>
                <th className="text-end">
                  BALANCE <FontAwesomeIcon icon={faSort} />
                </th>
                <th className="text-end">
                  VALUE <FontAwesomeIcon icon={faSort} />
                </th>
                <th className="text-end">
                  PORTFOLIO % <FontAwesomeIcon icon={faSort} />
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>bitcoin</td>
                <td className="text-end">$9563.5</td>
                <td className="text-end">+7.14%</td>
                <td className="text-end">0.00516 BTC</td>
                <td className="text-end">$5743.6</td>
                <td className="text-end">33%</td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default PortfolioAppScreen;
