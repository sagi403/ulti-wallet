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

const App = () => {
  const dispatch = useDispatch();

  const { loadingLogin } = useSelector(state => state.user);

  useEffect(() => {
    dispatch(autoLogin());
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
