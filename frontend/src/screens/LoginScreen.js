import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

const LoginScreen = () => {
  const location = useLocation();

  const redirect = location.search ? location.search.split("=")[1] : "/";

  return (
    <Container className="w-25">
      <h1 className="mt-5 mb-3">Login</h1>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>

        <Button variant="primary" type="submit">
          Sign In
        </Button>
      </Form>

      <Row className="py-3">
        <Col>
          New Customer?{" "}
          <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>
            Register
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginScreen;
