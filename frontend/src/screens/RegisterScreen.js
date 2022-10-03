import { useEffect, useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../store/userSlice";
import Message from "../components/Message";
import checkUserToken from "../utils/checkUserToken";
import validate from "../validation/validate.js";
import registerSchema from "../validation/registerValidation.js";

const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validationErrors, setValidationErrors] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  const submitHandler = e => {
    e.preventDefault();

    const { error } = validate(
      { name, email, password, confirmPassword },
      registerSchema
    );

    if (error) {
      setValidationErrors(error.details);
      return;
    }

    setValidationErrors(null);
    dispatch(register({ name, email, password }));
  };

  return (
    <Container className="w-25">
      <h1 className="mt-5 mb-3">Register</h1>

      {error && <Message variant="danger">{error}</Message>}
      {validationErrors &&
        validationErrors.map((error, idx) => (
          <Message key={idx} variant="danger">
            {error.message}
          </Message>
        ))}

      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
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

        <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
          <Form.Label>Confirm password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Sign Up
        </Button>
      </Form>

      <Row className="py-3">
        <Col>
          Have an Account? <Link to="/login">Login</Link>
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterScreen;
