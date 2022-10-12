import { Col, Container, Row, Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort } from "@fortawesome/free-solid-svg-icons";
import checkUserToken from "../utils/checkUserToken";
import { coinData } from "../store/coinSlice";

const PortfolioAppScreen = () => {
  const [total24hChange, setTotal24hChange] = useState(0);
  const [best24hAsset, setBest24hAsset] = useState(null);
  const [worst24hAsset, setWorst24hAsset] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userInfo } = useSelector(state => state.user);
  const { coinInfo, totalValue } = useSelector(state => state.coin);

  const coinsGeneralData = coinInfo => {
    if (!coinInfo) {
      return;
    }

    let bestAsset = coinInfo.reduce((prev, current) => {
      return prev.percent_change_24h < current.percent_change_24h
        ? current
        : prev;
    });
    let worstAsset = coinInfo.reduce((prev, current) => {
      return prev.percent_change_24h < current.percent_change_24h
        ? prev
        : current;
    });

    let totalChange = 0;

    for (let coin of coinInfo) {
      let initialChange = (100 * coin.value) / (100 + coin.percent_change_24h);

      totalChange += initialChange * (coin.percent_change_24h / 100);
    }
    totalChange = totalChange.toFixed(2);

    return { totalChange, bestAsset, worstAsset };
  };

  useEffect(() => {
    const { totalChange, bestAsset, worstAsset } = coinsGeneralData(coinInfo);

    setTotal24hChange(totalChange);
    setBest24hAsset(bestAsset);
    setWorst24hAsset(worstAsset);
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
        <Col className="text-center">
          <Row>
            <h4>24h Change</h4>
          </Row>
          <Row>
            <h4>
              {total24hChange > 0
                ? `+$${total24hChange}`
                : `-$${total24hChange}`}
            </h4>
          </Row>
        </Col>
        |
        <Col className="text-center">
          <Row>
            <h4>Portfolio Age</h4>
          </Row>
          <Row>
            <h4>{total24hChange}</h4>
          </Row>
        </Col>
        |
        <Col className="text-center">
          <Row>
            <h4>Best 24h Asset</h4>
          </Row>
          <Row>
            <h4>
              {best24hAsset &&
                `${best24hAsset.name} ${best24hAsset.percent_change_24h.toFixed(
                  2
                )}%`}
            </h4>
          </Row>
        </Col>
        |
        <Col className="text-center">
          <Row>
            <h4>Worst 24h Asset</h4>
          </Row>
          <Row>
            <h4>
              {worst24hAsset &&
                `${
                  worst24hAsset.name
                } ${worst24hAsset.percent_change_24h.toFixed(2)}%`}
            </h4>
          </Row>
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
