import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const NavbarIconPartial = ({
  to,
  icon,
  color = "",
  classes = "",
  onClick = null,
}) => {
  return (
    <LinkContainer to={to} className={classes} onClick={onClick}>
      <Nav.Link>
        <FontAwesomeIcon icon={icon} style={{ color }} />
      </Nav.Link>
    </LinkContainer>
  );
};

export default NavbarIconPartial;
