import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import AppNavbar from "./components/AppNavbar";
import PortfolioAppScreen from "./app-screens/PortfolioAppScreen";
import AuthGuardRoute from "./components/AuthGuardRoute";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="app"
          element={
            <AuthGuardRoute redirectTo="/login">
              <AppNavbar />
            </AuthGuardRoute>
          }
        >
          <Route path="portfolio" element={<PortfolioAppScreen />} />
        </Route>

        <Route path="login" element={<LoginScreen />} />
        <Route path="register" element={<RegisterScreen />} />
        <Route path="/" element={<HomeScreen />} />
      </Routes>
    </Router>
  );
};

export default App;
