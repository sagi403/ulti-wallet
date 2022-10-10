import { Col, Container, Row, Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort } from "@fortawesome/free-solid-svg-icons";
import coin from "../coin";
import checkUserToken from "../utils/checkUserToken";
import axios from "axios";

const PortfolioAppScreen = () => {
  const navigate = useNavigate();

  const { userInfo } = useSelector(state => state.user);

  // const fetchCoinsData = async () => {
  //   const headers = {
  //     "X-CMC_PRO_API_KEY": process.env.CMC_API_KEY,
  //   };
  //   const { data } = await axios.get(
  //     "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest",
  //     headers
  //   );
  //   console.log(data);
  // };
  // fetchCoinsData();

  useEffect(() => {
    const isUserAuth = async () => {
      const auth = await checkUserToken(userInfo);

      if (!auth) {
        navigate("/login");
      }
    };
    isUserAuth();
  }, [userInfo, navigate]);

  return (
    <Container>
      <Row>
        <Col className="d-flex justify-content-center">
          <h3>Pie chart</h3>
        </Col>
      </Row>
      <hr />
      <Row>
        <Col className="text-center">
          <h4>24h Change</h4>
        </Col>
        |
        <Col className="text-center">
          <h4>Portfolio Age</h4>
        </Col>
        |
        <Col className="text-center">
          <h4>Best 24h Asset</h4>
        </Col>
        |
        <Col className="text-center">
          <h4>Worst 24h Asset</h4>
        </Col>
      </Row>
      <Row>
        <Col>
          <Table striped bordered hover responsive variant="active">
            <thead>
              <tr>
                <th>
                  ASSET NAME <FontAwesomeIcon icon={faSort} />
                </th>
                <th className="text-end">
                  PRICE <FontAwesomeIcon icon={faSort} />
                </th>
                <th className="text-end">
                  24H CHANGE <FontAwesomeIcon icon={faSort} />
                </th>
                <th className="text-end">
                  BALANCE <FontAwesomeIcon icon={faSort} />
                </th>
                <th className="text-end">
                  VALUE <FontAwesomeIcon icon={faSort} />
                </th>
                <th className="text-end">
                  PORTFOLIO % <FontAwesomeIcon icon={faSort} />
                </th>
              </tr>
            </thead>
            <tbody>
              {coin.map(item => (
                <tr key={item.id} className="portfolio-table-body">
                  <td>
                    <img src={item.logo} alt={item.name} className="mask" />
                    {item.name}
                  </td>
                  <td className="text-end align-middle">${item.price}</td>
                  <td className="text-end align-middle">
                    {item.percent_change_24h > 0 && "+"}
                    {item.percent_change_24h}%
                  </td>
                  <td className="text-end align-middle">
                    {item.balance} {item.symbol}
                  </td>
                  <td className="text-end align-middle">
                    ${(item.price * item.balance).toFixed(2)}
                  </td>
                  <td className="text-end align-middle">33%</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default PortfolioAppScreen;
