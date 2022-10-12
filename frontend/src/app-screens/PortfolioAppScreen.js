import { Col, Container, Row, Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort } from "@fortawesome/free-solid-svg-icons";
import checkUserToken from "../utils/checkUserToken";
import { coinData } from "../store/coinSlice";
import coinsGeneralData from "../utils/coinsGeneralData";
import CoinsGeneralInfoBar from "../components/CoinsGeneralInfoBar";

const PortfolioAppScreen = () => {
  const [total24hChange, setTotal24hChange] = useState(0);
  const [best24hAsset, setBest24hAsset] = useState(null);
  const [worst24hAsset, setWorst24hAsset] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userInfo } = useSelector(state => state.user);
  const { coinInfo, totalValue } = useSelector(state => state.coin);

  useEffect(() => {
    if (coinInfo) {
      const { totalChange, bestAsset, worstAsset } = coinsGeneralData(coinInfo);

      setTotal24hChange(totalChange);
      setBest24hAsset(bestAsset);
      setWorst24hAsset(worstAsset);
    }
  }, [coinInfo]);

  useEffect(() => {
    const isUserAuth = async () => {
      const auth = await checkUserToken(userInfo);

      if (!auth) {
        navigate("/login");
      }
    };
    isUserAuth();

    if (!coinInfo) {
      dispatch(coinData(userInfo));
    }
  }, [userInfo, navigate, dispatch, coinInfo]);

  return (
    <Container>
      <Row>
        <Col className="d-flex justify-content-center">
          <h3>Pie chart</h3>
        </Col>
      </Row>
      <hr />
      <Row>
        <CoinsGeneralInfoBar
          title="24h Change"
          info={
            total24hChange > 0 ? `+$${total24hChange}` : `-$${total24hChange}`
          }
        />
        |
        <CoinsGeneralInfoBar title="Portfolio Age" info={total24hChange} />|
        <CoinsGeneralInfoBar
          title="Best 24h Asset"
          info={
            best24hAsset &&
            `${best24hAsset.name} ${best24hAsset.percent_change_24h.toFixed(
              2
            )}%`
          }
        />
        |
        <CoinsGeneralInfoBar
          title="Worst 24h Asset"
          info={
            worst24hAsset &&
            `${worst24hAsset.name} ${worst24hAsset.percent_change_24h.toFixed(
              2
            )}%`
          }
        />
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
              {coinInfo &&
                coinInfo.map(item => (
                  <tr key={item.id} className="portfolio-table-body">
                    <td>
                      <img src={item.logo} alt={item.name} className="mask" />
                      {item.name}
                    </td>
                    <td className="text-end align-middle">
                      ${item.price.toFixed(2)}
                    </td>
                    <td className="text-end align-middle">
                      {item.percent_change_24h.toFixed(2) > 0 && "+"}
                      {item.percent_change_24h.toFixed(2)}%
                    </td>
                    <td className="text-end align-middle">
                      {item.balance} {item.symbol}
                    </td>
                    <td className="text-end align-middle">
                      ${item.value.toFixed(2)}
                    </td>
                    <td className="text-end align-middle">
                      {((item.value / totalValue) * 100).toFixed(2)}%
                    </td>
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
