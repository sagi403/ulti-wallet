import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/userSlice";
import { useEffect, useState } from "react";
import Message from "../components/Message";
import checkUserToken from "../utils/checkUserToken";
import validate from "../validation/validate.js";
import loginSchema from "../validation/loginValidation.js";

const LoginScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validationErrors, setValidationErrors] = useState(null);

  const { userInfo, error } = useSelector(state => state.user);

  useEffect(() => {
    const isUserAuth = async () => {
      const auth = await checkUserToken(userInfo);

      if (auth) {
        navigate("/app/portfolio");
      }
    };
    isUserAuth();
  }, [userInfo, navigate]);

  const submitHandler = async e => {
    e.preventDefault();

    const { error } = validate({ email, password }, loginSchema);

    if (error) {
      setValidationErrors(error.details);
      return;
    }

    setValidationErrors(null);
    dispatch(login({ email, password }));
  };

  return (
    <Container className="w-25">
      <h1 className="mt-5 mb-3">Login</h1>

      {error && <Message variant="danger">{error}</Message>}
      {validationErrors &&
        validationErrors.map((error, idx) => (
          <Message key={idx} variant="danger">
            {error.message}
          </Message>
        ))}

      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Sign In
        </Button>
      </Form>

      <Row className="py-3">
        <Col>
          New Customer? <Link to="/register">Register</Link>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginScreen;
