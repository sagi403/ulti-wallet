import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import AppNavbar from "./components/AppNavbar";
import PortfolioAppScreen from "./app-screens/PortfolioAppScreen";
import RequireAuth from "./components/RequireAuth";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { autoLogin } from "./store/userSlice";
import ExchangeAppScreen from "./app-screens/ExchangeAppScreen";
import TransferAppScreen from "./app-screens/TransferAppScreen";
import SendAppScreen from "./app-screens/SendAppScreen";
import ReceiveAppScreen from "./app-screens/ReceiveAppScreen";
import RequireCoinId from "./components/RequireCoinId";
import { coinsId } from "./store/coinSlice";

const App = () => {
  const dispatch = useDispatch();

  const { userInfo, loadingLogin } = useSelector(state => state.user);
  const { allCoinsId, loadingCoinsId } = useSelector(state => state.coin);

  useEffect(() => {
    if (!userInfo) {
      dispatch(autoLogin());
    }
  }, []);

  useEffect(() => {
    if (!allCoinsId) {
      dispatch(coinsId());
    }
  }, []);

  return (
    !loadingLogin && (
      <Router>
        <Routes>
          <Route element={<RequireAuth />}>
            <Route path="app" element={<AppNavbar />}>
              <Route path="portfolio" element={<PortfolioAppScreen />} />
              <Route path="exchange" element={<ExchangeAppScreen />} />
              <Route path="transfer/:id" element={<TransferAppScreen />} />
              <Route path="transfer/:id/send" element={<SendAppScreen />} />
              {!loadingCoinsId && (
                <Route element={<RequireCoinId />}>
                  <Route
                    path="transfer/:id/receive"
                    element={<ReceiveAppScreen />}
                  />
                </Route>
              )}
            </Route>
          </Route>

          <Route path="login" element={<LoginScreen />} />
          <Route path="register" element={<RegisterScreen />} />
          <Route path="/" element={<HomeScreen />} />
          <Route path="*" element={<p>There's nothing here: 404!</p>} />
        </Routes>
      </Router>
    )
  );
};

export default App;
