import { Nav } from "react-bootstrap";

const MainNavbar = () => {
  return (
    <nav>
      <Nav defaultActiveKey="/home" className="flex-column sidebar">
        <Nav.Link href="/home" className="btn mb-3">
          Active
        </Nav.Link>
        <Nav.Link eventKey="link-1" className="btn mb-3">
          Link
        </Nav.Link>
        <Nav.Link eventKey="link-2" className="btn mb-3">
          Link
        </Nav.Link>
      </Nav>
    </nav>
  );
};

export default MainNavbar;
