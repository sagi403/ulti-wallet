import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWallet } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import AppNavbar from "../components/AppNavbar";
import Footer from "../components/Footer";

const MainApp = () => {
  const navigate = useNavigate();

  const { userInfo } = useSelector(state => state.user);

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
  }, [userInfo, navigate]);

  return (
    <>
      <AppNavbar />
      <main>
        <h1>
          <FontAwesomeIcon icon={faWallet} /> Welcome to Ulti Wallet
        </h1>
      </main>
      <Footer />
    </>
  );
};

export default MainApp;
