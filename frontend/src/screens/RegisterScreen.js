import { useEffect, useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { autoLogin, register, resetError } from "../store/userSlice";
import Message from "../components/Message";
import validate from "../validation/validate";
import registerSchema from "../validation/registerValidation";
import FormFieldPartial from "../partials/FormFieldPartial";

const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorsMessage, setErrorsMessage] = useState({
    name: null,
    email: null,
    password: null,
    confirmPassword: null,
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { error, loggedIn } = useSelector(state => state.user);

  useEffect(() => {
    if (loggedIn) {
      dispatch(autoLogin());
      navigate("/app/portfolio", { replace: true });
    }

    return () => dispatch(resetError());
  }, [loggedIn]);

  const submitHandler = e => {
    e.preventDefault();
    dispatch(resetError());

    const errors = {};
    const { error } = validate(
      { name, email, password, confirmPassword },
      registerSchema
    );

    if (error) {
      for (let errorItem of error.details) {
        const { context, message } = errorItem;

        errors[context.key] = message;
      }
      setErrorsMessage(errors);
      return;
    }

    setErrorsMessage({
      name: null,
      email: null,
      password: null,
      confirmPassword: null,
    });
    dispatch(register({ name, email, password }));
  };

  return (
    <Container className="w-25">
      <h1 className="mt-5 mb-3">Register</h1>

      {error && <Message variant="danger">{error}</Message>}

      <Form onSubmit={submitHandler}>
        <FormFieldPartial
          label="Name"
          type="text"
          controlId="formBasicName"
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
          message={errorsMessage && errorsMessage.name}
        />
        <FormFieldPartial
          label="Email address"
          type="email"
          controlId="formBasicEmail"
          placeholder="name@example.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
          message={errorsMessage && errorsMessage.email}
        />
        <FormFieldPartial
          label="Password"
          type="password"
          controlId="formBasicPassword"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          message={errorsMessage && errorsMessage.password}
        />
        <FormFieldPartial
          label="Confirm Password"
          type="password"
          controlId="formBasicConfirmPassword"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
          message={errorsMessage && errorsMessage.confirmPassword}
        />

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
