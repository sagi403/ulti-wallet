import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainAppScreen from "./screens/MainAppScreen";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/app" element={<MainAppScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/" element={<HomeScreen />} />
      </Routes>
    </Router>
  );
};

export default App;
