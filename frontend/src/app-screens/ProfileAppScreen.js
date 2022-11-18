import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import FormFieldPartial from "../partials/FormFieldPartial";
import { coinUserData } from "../store/coinSlice";
import { autoLogin, resetError } from "../store/userSlice";
import registerSchema from "../validation/registerValidation";
import validate from "../validation/validate";

const ProfileAppScreen = () => {
  const { userInfo, loading, error } = useSelector(state => state.user);
  const { totalValue } = useSelector(state => state.coin);

  const [name, setName] = useState(userInfo ? userInfo.name : "");
  const [email, setEmail] = useState(userInfo ? userInfo.email : "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorsMessage, setErrorsMessage] = useState({
    name: null,
    email: null,
    password: null,
    confirmPassword: null,
  });
  const [fail, setFail] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!totalValue) {
      dispatch(coinUserData());
    }
  }, []);

  const submitHandler = async e => {
    e.preventDefault();
    dispatch(resetError());
    setFail(null);

    const errors = {};
    const { error } = validate(
      { name, email, password, confirmPassword },
      registerSchema
    );

    if (error) {
      for (let errorItem of error.details) {
        const { context, message } = errorItem;

        if (!errors[context.key]) {
          errors[context.key] = [];
        }

        errors[context.key].push(message);
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

    try {
      await axios.put("/api/users/profile", {
        name,
        email,
        password,
      });

      dispatch(autoLogin());
    } catch (error) {
      const err =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      setFail(err);
    }
  };

  return (
    <Container>
      <Row className="mt-3">
        <Col md={3}>
          <h2>User Profile</h2>
          {error && <Message variant="danger">{error}</Message>}
          {fail && <Message variant="danger">{fail}</Message>}
          {loading && <Loader />}
          <Form onSubmit={submitHandler}>
            <FormFieldPartial
              label="Name"
              type="text"
              controlId="formBasicName"
              value={name}
              onChange={e => setName(e.target.value)}
              messages={errorsMessage && errorsMessage.name}
            />
            <FormFieldPartial
              label="Email address"
              type="email"
              controlId="formBasicEmail"
              value={email}
              onChange={e => setEmail(e.target.value)}
              messages={errorsMessage && errorsMessage.email}
            />
            <FormFieldPartial
              label="Password"
              type="password"
              controlId="formBasicPassword"
              value={password}
              onChange={e => setPassword(e.target.value)}
              messages={errorsMessage && errorsMessage.password}
            />
            <FormFieldPartial
              label="Confirm Password"
              type="password"
              controlId="formBasicConfirmPassword"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              messages={errorsMessage && errorsMessage.confirmPassword}
            />

            <Button type="submit" variant="primary">
              Update
            </Button>
          </Form>
        </Col>
        <Col md={9}>
          <h2>My Transactions</h2>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfileAppScreen;
