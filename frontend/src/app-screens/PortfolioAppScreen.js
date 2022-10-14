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
import localString from "../utils/localString";
import DoughnutChart from "../components/DoughnutChart";

const PortfolioAppScreen = () => {
  const [total24hChange, setTotal24hChange] = useState(0);
  const [best24hAsset, setBest24hAsset] = useState(null);
  const [worst24hAsset, setWorst24hAsset] = useState(null);

  const [chartData, setChartData] = useState({
    labels: "",
    datasets: [],
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userInfo } = useSelector(state => state.user);
  const { coinInfo, totalValue } = useSelector(state => state.coin);

  useEffect(() => {
    if (coinInfo) {
      const { totalChange, bestAsset, worstAsset } = coinsGeneralData(coinInfo);

      setChartData({
        labels: coinInfo.map(coin => coin.symbol),
        datasets: [
          {
            label: "Asset Allocation",
            data: coinInfo.map(coin => coin.value),
            backgroundColor: ["red", "green", "blue", "yellow", "grey"],
            borderColor: "black",
            borderWidth: 2,
          },
        ],
      });

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
        <Col>
          <Row className="text-center">
            <h3>Pie chart</h3>
          </Row>
          <Row style={{ width: "40vh" }} className="mx-auto">
            <DoughnutChart chartData={chartData} />
          </Row>
        </Col>
      </Row>
      <hr />
      <Row>
        <CoinsGeneralInfoBar
          title="24h Change"
          info={
            total24hChange > 0
              ? `+$${localString(total24hChange)}`
              : `-$${localString(total24hChange * -1)}`
          }
        />
        |
        <CoinsGeneralInfoBar
          title="Portfolio Age"
          info={
            userInfo &&
            (userInfo.created_at.years
              ? `${userInfo.created_at.years} Year, ${userInfo.created_at.mons} Month, ${userInfo.created_at.days} Days`
              : userInfo.created_at.mons
              ? `${userInfo.created_at.mons} Month, ${userInfo.created_at.days} Days`
              : userInfo.created_at.days
              ? `${userInfo.created_at.days} Days`
              : "New Portfolio")
          }
        />
        |
        <CoinsGeneralInfoBar
          title="Best 24h Asset"
          info={
            best24hAsset &&
            `${best24hAsset.name} ${localString(
              best24hAsset.percent_change_24h
            )}%`
          }
        />
        |
        <CoinsGeneralInfoBar
          title="Worst 24h Asset"
          info={
            worst24hAsset &&
            `${worst24hAsset.name} ${localString(
              worst24hAsset.percent_change_24h
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
                      ${localString(item.price)}
                    </td>
                    <td className="text-end align-middle">
                      {item.percent_change_24h > 0 && "+"}
                      {localString(item.percent_change_24h)}%
                    </td>
                    <td className="text-end align-middle">
                      {localString(item.balance)} {item.symbol}
                    </td>
                    <td className="text-end align-middle">
                      ${localString(item.value)}
                    </td>
                    <td className="text-end align-middle">
                      {localString((item.value / totalValue) * 100)}%
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
