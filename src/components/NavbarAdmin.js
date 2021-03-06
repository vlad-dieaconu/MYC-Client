import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import AuthService from "../services/AuthService";
import {Button} from "@mui/material";

const Appbar = () => {


    const logOut = () => {
        AuthService.logout();

    }

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand href="home" style={{ marginLeft: 15 }}>
        Manage Your Company
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav style={{ marginLeft: 10 }}>
          <Nav.Link href="projects">Projects</Nav.Link>
          <Nav.Link href="employees">Employees</Nav.Link>
          <Nav.Link href="workingdays">Working days</Nav.Link>
          <Nav.Link href="adminleaverequests">Leave requests</Nav.Link>
s
            {/*<NavDropdown title="Dropdown" id="collasible-nav-dropdown">*/}
          {/*    <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>*/}
          {/*    <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>*/}
          {/*    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>*/}
          {/*    <NavDropdown.Divider />*/}
          {/*    <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>*/}
          {/*</NavDropdown>*/}
        </Nav>
        <Nav className="ms-auto" style={{ marginRight: 20 }}>
          <Nav.Link href="profile">Profile</Nav.Link>

          {/*<Navbar.Text style={{ color: "white" }}>*/}

          {/*    Logged in as {JSON.parse(localStorage.getItem("client") || "{}").nume}*/}
          {/*</Navbar.Text>*/}
          <Button onClick={logOut}>LogOut</Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Appbar;
