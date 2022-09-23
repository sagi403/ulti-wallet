import { Container, Nav, Navbar } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { logout } from "../store/userSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

const MainNavbar = () => {
  const dispatch = useDispatch();

  return (
    <nav>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container fluid>
          <LinkContainer to="/">
            <Navbar.Brand>LOGO</Navbar.Brand>
          </LinkContainer>

          <Navbar className="nav-centered nav">
            <LinkContainer to="/">
              <Nav.Link>LOGO</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/">
              <Nav.Link>LOGO</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/">
              <Nav.Link>LOGO</Nav.Link>
            </LinkContainer>
          </Navbar>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="justify-content-end flex-grow-1">
              <LinkContainer to="/">
                <Nav.Link>
                  <FontAwesomeIcon icon={faRightFromBracket} />
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/" onClick={() => dispatch(logout())}>
                <Nav.Link>
                  <FontAwesomeIcon icon={faRightFromBracket} />
                </Nav.Link>
              </LinkContainer>
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
  );
};

export default MainNavbar;
