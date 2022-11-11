import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { autoLogin, login, resetError } from "../store/userSlice";
import { useEffect, useState } from "react";
import Message from "../components/Message";
import validate from "../validation/validate";
import loginSchema from "../validation/loginValidation";
import FormFieldPartial from "../partials/FormFieldPartial";

const LoginScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorsMessage, setErrorsMessage] = useState({
    email: null,
    password: null,
  });

  const { error, loggedIn, userInfo } = useSelector(state => state.user);

  const from = location.state?.from?.pathname || "/app/portfolio";

  useEffect(() => {
    if (userInfo) {
      navigate(from, { replace: true });
      return;
    }

    if (loggedIn) {
      dispatch(autoLogin());
      navigate(from, { replace: true });
    }

    return () => dispatch(resetError());
  }, [loggedIn]);

  const submitHandler = async e => {
    e.preventDefault();
    dispatch(resetError());

    const errors = {};
    const { error } = validate({ email, password }, loginSchema);

    if (error) {
      for (let errorItem of error.details) {
        const { context, message } = errorItem;

        errors[context.key] = [message];
      }

      setErrorsMessage(errors);
      return;
    }

    setErrorsMessage({ email: null, password: null });
    dispatch(login({ email, password }));
  };

  return (
    <Container className="w-25">
      <h1 className="mt-5 mb-3">Login</h1>

      {error && <Message variant="danger">{error}</Message>}

      <Form onSubmit={submitHandler}>
        <FormFieldPartial
          label="Email address"
          type="email"
          controlId="formBasicEmail"
          placeholder="name@example.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
          messages={errorsMessage && errorsMessage.email}
        />
        <FormFieldPartial
          label="Password"
          type="password"
          controlId="formBasicPassword"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          messages={errorsMessage && errorsMessage.password}
        />

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
