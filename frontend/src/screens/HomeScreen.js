import { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWallet } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import checkUserToken from "../utils/checkUserToken";

const HomeScreen = () => {
  const [isLogin, setIsLogin] = useState(false);
  const { userInfo, token } = useSelector(state => state.user);

  useEffect(() => {
    const isUserAuth = async () => {
      const auth = await checkUserToken(userInfo);

      auth && token && userInfo.token === token
        ? setIsLogin(true)
        : setIsLogin(false);
    };
    isUserAuth();
  }, [userInfo, token]);

  return (
    <Container>
      <Row className="mt-5">
        <Col>
          <h2 className="logo_home">
            <FontAwesomeIcon icon={faWallet} /> Ulti
          </h2>
        </Col>
      </Row>
      <Row className="mt-5">
        <Col>
          <h1 className="desc_home">More than just a wallet</h1>
          <h3 className="mt-3 mb-5">
            Ulti makes it safe & easy for you to store, buy, send, receive, swap
            tokens on your web browser
          </h3>
          {isLogin ? (
            <Link to="/app/portfolio">
              <Button variant="outline-primary" className="me-3">
                Portfolio
              </Button>
            </Link>
          ) : (
            <>
              <Link to="/register">
                <Button variant="outline-primary" className="me-3">
                  Sign Up
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="primary">Sign In</Button>
              </Link>
            </>
          )}
        </Col>
        <Col>Add Picture</Col>
      </Row>
    </Container>
  );
};

export default HomeScreen;
