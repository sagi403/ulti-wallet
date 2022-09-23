import { Nav } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { logout } from "../store/userSlice";

const MainNavbar = () => {
  const dispatch = useDispatch();

  return (
    <nav>
      <Nav defaultActiveKey="/home" className="flex-column sidebar">
        <Nav.Link href="/home" className="btn mb-3">
          Active
        </Nav.Link>
        <Nav.Link
          href="/"
          className="btn mb-3"
          onClick={() => dispatch(logout())}
        >
          Logout
        </Nav.Link>
        <Nav.Link eventKey="link-2" className="btn mb-3">
          Link
        </Nav.Link>
      </Nav>
    </nav>
  );
};

export default MainNavbar;
