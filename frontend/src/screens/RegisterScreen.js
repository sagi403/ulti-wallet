import { useEffect, useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../store/userSlice";
import Message from "../components/Message";
import checkUserToken from "../utils/checkUserToken";
import validate from "../validation/validate";
import registerSchema from "../validation/registerValidation";
import FormFieldPartial from "../partials/FormFieldPartial";

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
        <FormFieldPartial
          label="Name"
          type="text"
          controlId="formBasicName"
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <FormFieldPartial
          label="Email address"
          type="email"
          controlId="formBasicEmail"
          placeholder="name@example.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <FormFieldPartial
          label="Password"
          type="password"
          controlId="formBasicPassword"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <FormFieldPartial
          label="Confirm Password"
          type="password"
          controlId="formBasicConfirmPassword"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
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
