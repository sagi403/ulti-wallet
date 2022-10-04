import { Container, Nav, Navbar } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Outlet } from "react-router-dom";
import { logout } from "../store/userSlice";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRightFromBracket,
  faChartPie,
  faWallet,
  faArrowRightArrowLeft,
  faGear,
} from "@fortawesome/free-solid-svg-icons";
import NavbarIconPartial from "../partials/NavbarIconPartial";

const MainNavbar = () => {
  const dispatch = useDispatch();

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
              <Navbar.Brand>LOGO</Navbar.Brand>
            </LinkContainer>

            <Navbar className="nav-centered nav">
              <NavbarIconPartial
                to="/"
                icon={faChartPie}
                color="#ffac20"
                classes="btn-nav"
              />
              <NavbarIconPartial
                to="/"
                icon={faWallet}
                color="#7344FF"
                classes="btn-nav"
              />
              <span className="separator">|</span>
              <NavbarIconPartial
                to="/"
                icon={faArrowRightArrowLeft}
                color="#208EE0"
                classes="btn-nav"
              />
            </Navbar>

            <Navbar.Toggle aria-controls="basic-navbar-nav" />

            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="justify-content-end flex-grow-1">
                <NavbarIconPartial to="/" icon={faGear} />
                <NavbarIconPartial
                  to="/"
                  icon={faRightFromBracket}
                  onClick={() => dispatch(logout())}
                />
                {/* {userInfo ? (
                <NavDropdown title={userInfo.name} id="username">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <i className="fas fa-user"></i> Sign In
                  </Nav.Link>
                </LinkContainer>
              )} */}
                {/* {userInfo && userInfo.isAdmin && (
                <NavDropdown title="Admin" id="adminmenu">
                  <LinkContainer to="/admin/userlist">
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/productlist">
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/orderlist">
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/couponlist">
                    <NavDropdown.Item>Coupons</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )} */}
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
