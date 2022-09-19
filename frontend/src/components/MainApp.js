import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWallet } from "@fortawesome/free-solid-svg-icons";
import MainNavbar from "./MainNavbar";
import Footer from "./Footer";

const MainApp = () => {
  return (
    <Container fluid>
      <Row>
        <Col xs={2}>
          <MainNavbar />
        </Col>
        <Col xs={10}>
          <main>
            <h1>
              <FontAwesomeIcon icon={faWallet} /> Welcome to Ulti Wallet
            </h1>
          </main>
        </Col>
      </Row>
      <Footer />
    </Container>
  );
};

export default MainApp;
