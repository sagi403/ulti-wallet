import { Container, Nav, Navbar } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Outlet } from "react-router-dom";
import { logout, refreshStats } from "../store/generalSlice";
import {
  faRightFromBracket,
  faChartPie,
  faWallet,
  faArrowRightArrowLeft,
  faGear,
  faArrowRotateLeft,
} from "@fortawesome/free-solid-svg-icons";
import NavbarIconPartial from "../partials/NavbarIconPartial";
import localString from "../utils/localString";
import { useLocation } from "react-router-dom";

const MainNavbar = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const { totalValue } = useSelector(state => state.coin);

  return (
    <>
      <nav>
        <Navbar
          bg="dark"
          variant="dark"
          expand="lg"
          className="py-3"
          collapseOnSelect
        >
          <Container fluid>
            <LinkContainer to="/">
              <Navbar.Brand>
                <span className="logo">U</span>
                <span className="dim">$</span>
                {localString(totalValue)}
              </Navbar.Brand>
            </LinkContainer>

            <Navbar className="nav_centered">
              <NavbarIconPartial
                to="/app/portfolio"
                icon={faChartPie}
                color="#ffac20"
                classes="btn_nav"
              />
              <NavbarIconPartial
                to="/app/transfer/1"
                icon={faWallet}
                color="#7344FF"
                classes="btn_nav"
              />
              <span className="separator">|</span>
              <NavbarIconPartial
                to="/app/exchange"
                icon={faArrowRightArrowLeft}
                color="#208EE0"
                classes="btn_nav"
              />
            </Navbar>

            <Navbar.Toggle aria-controls="basic-navbar-nav" />

            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="justify-content-end flex-grow-1">
                <NavbarIconPartial
                  to={location.pathname}
                  icon={faArrowRotateLeft}
                  onClick={() => dispatch(refreshStats())}
                />
                <NavbarIconPartial to="/app/profile" icon={faGear} />
                <NavbarIconPartial
                  to="/"
                  icon={faRightFromBracket}
                  onClick={() => {
                    dispatch(logout());
                  }}
                />
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </nav>
      <Outlet />
    </>
  );
};

export default MainNavbar;
