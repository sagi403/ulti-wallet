import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import FormFieldPartial from "../partials/FormFieldPartial";
import { coinUserData } from "../store/coinSlice";

const ProfileAppScreen = () => {
  const { userInfo, loading, error } = useSelector(state => state.user);
  const { totalValue } = useSelector(state => state.coin);

  const [name, setName] = useState(userInfo ? userInfo.name : "");
  const [email, setEmail] = useState(userInfo ? userInfo.email : "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    if (!totalValue) {
      dispatch(coinUserData());
    }
  }, []);

  const submitHandler = e => {
    e.preventDefault();
  };

  return (
    <Container>
      <Row>
        <Col md={3}>
          <h2>User Profile</h2>
          {error && <Message variant="danger">{error}</Message>}
          {loading && <Loader />}
          <Form onSubmit={submitHandler}>
            <FormFieldPartial
              label="Name"
              type="text"
              controlId="formBasicName"
              value={name}
              onChange={e => setName(e.target.value)}
              // messages={errorsMessage && errorsMessage.name}
            />
            <FormFieldPartial
              label="Email address"
              type="email"
              controlId="formBasicEmail"
              value={email}
              onChange={e => setEmail(e.target.value)}
              // messages={errorsMessage && errorsMessage.email}
            />
            <FormFieldPartial
              label="Password"
              type="password"
              controlId="formBasicPassword"
              value={password}
              onChange={e => setPassword(e.target.value)}
              // messages={errorsMessage && errorsMessage.password}
            />
            <FormFieldPartial
              label="Confirm Password"
              type="password"
              controlId="formBasicConfirmPassword"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              // messages={errorsMessage && errorsMessage.confirmPassword}
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
