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
            backgroundColor: [...coinInfo.map(coin => coin.color)],
            borderColor: "black",
            borderWidth: 2,
            cutout: "95%",
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
    <Container fluid className="portfolio">
      <Container>
        <Row>
          <Col>
            <Row className="mx-auto doughnut_chart">
              <div className="chart_content text-center">
                <h3 className="chart_total_value">
                  <span className="dim">$</span>
                  {localString(totalValue)}
                </h3>
                <h4 className="chart_total_assets">
                  {coinInfo && `${coinInfo.length} Assets`}
                </h4>
              </div>
              <DoughnutChart chartData={chartData} />
            </Row>
          </Col>
        </Row>
        <hr className="portfolio_hr" />
        <Row className="py-5">
          <CoinsGeneralInfoBar
            title="24h Change"
            info={
              total24hChange > 0
                ? `+$${localString(total24hChange)}`
                : `-$${localString(total24hChange * -1)}`
            }
            classes="general_info_bar"
          />
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
            classes="general_info_bar"
          />
          <CoinsGeneralInfoBar
            title="Best 24h Asset"
            info={
              best24hAsset &&
              `${best24hAsset.name} ${localString(
                best24hAsset.percent_change_24h
              )}%`
            }
            classes="general_info_bar"
          />
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
        <Row className="pb-4">
          <Col>
            <Table bordered hover variant="active">
              <thead>
                <tr className="table_header">
                  <th className="py-4 ps-4 rounded_top_left chart_total_assets">
                    ASSET NAME <FontAwesomeIcon icon={faSort} />
                  </th>
                  <th className="text-end py-4 chart_total_assets">
                    PRICE <FontAwesomeIcon icon={faSort} />
                  </th>
                  <th className="text-end py-4 chart_total_assets">
                    24H CHANGE <FontAwesomeIcon icon={faSort} />
                  </th>
                  <th className="text-end py-4 chart_total_assets">
                    BALANCE <FontAwesomeIcon icon={faSort} />
                  </th>
                  <th className="text-end py-4 chart_total_assets">
                    VALUE <FontAwesomeIcon icon={faSort} />
                  </th>
                  <th className="text-end py-4 pe-4 rounded_top_right chart_total_assets">
                    PORTFOLIO % <FontAwesomeIcon icon={faSort} />
                  </th>
                </tr>
              </thead>
              <tbody>
                {coinInfo &&
                  coinInfo.map(item => (
                    <tr key={item.id} className="portfolio_table_body">
                      <td className="ps-4">
                        <Row>
                          <Col lg="4">
                            <img
                              src={item.logo}
                              alt={item.name}
                              className="mask"
                            />
                          </Col>
                          <Col>
                            <Row className="chart_total_value">{item.name}</Row>
                            <Row className="chart_total_assets">
                              {item.symbol}
                            </Row>
                          </Col>
                        </Row>
                      </td>
                      <td className="text-end align-middle chart_total_value">
                        ${localString(item.price)}
                      </td>
                      <td className="text-end align-middle chart_total_value">
                        {item.percent_change_24h > 0 && "+"}
                        {localString(item.percent_change_24h)}%
                      </td>
                      <td className="text-end align-middle chart_total_value">
                        {localString(item.balance)} {item.symbol}
                      </td>
                      <td className="text-end align-middle chart_total_value">
                        ${localString(item.value)}
                      </td>
                      <td className="text-end align-middle chart_total_value pe-4">
                        {localString((item.value / totalValue) * 100)}%
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default PortfolioAppScreen;
