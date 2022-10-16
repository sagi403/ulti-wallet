import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import AppNavbar from "./components/AppNavbar";
import PortfolioAppScreen from "./app-screens/PortfolioAppScreen";
import RequireAuth from "./components/RequireAuth";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route element={<RequireAuth />}>
          <Route path="app" element={<AppNavbar />}>
            <Route path="portfolio" element={<PortfolioAppScreen />} />
          </Route>
        </Route>

        <Route path="login" element={<LoginScreen />} />
        <Route path="register" element={<RegisterScreen />} />
        <Route path="/" element={<HomeScreen />} />
        <Route path="*" element={<p>There's nothing here: 404!</p>} />
      </Routes>
    </Router>
  );
};

export default App;
