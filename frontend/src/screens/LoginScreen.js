import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, resetError } from "../store/userSlice";
import { useEffect, useState } from "react";
import Message from "../components/Message";
import checkUserToken from "../utils/checkUserToken";
import validate from "../validation/validate";
import loginSchema from "../validation/loginValidation";
import FormFieldPartial from "../partials/FormFieldPartial";

const LoginScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorsMessage, setErrorsMessage] = useState({
    email: null,
    password: null,
  });

  const { userInfo, error, token } = useSelector(state => state.user);

  useEffect(() => {
    const isUserAuth = async () => {
      try {
        const auth = await checkUserToken(userInfo);

        if (auth && token && userInfo.token === token) {
          navigate("/app/portfolio", { replace: true });
        }
      } catch (error) {
        console.log(error);
      }
    };
    isUserAuth();

    return () => dispatch(resetError());
  }, [userInfo, navigate, token]);

  const submitHandler = async e => {
    e.preventDefault();
    dispatch(resetError());

    const errors = {};
    const { error } = validate({ email, password }, loginSchema);

    if (error) {
      for (let errorItem of error.details) {
        const { context, message } = errorItem;

        errors[context.key] = message;
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
