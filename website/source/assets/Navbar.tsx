import { Container, Nav, Navbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useLocation } from 'react-router-dom';
import '../components/Navbar.css';

export default function AppNavbar() {
    const location = useLocation();

    const noNavbarPaths = ["/", "/login", "/RegisterPage"];
    if (noNavbarPaths.includes(location.pathname)) {
        return null;
    }

    async function countClick() {
        alert('Haste nichts besseres zu TUN als hier rum zu DRÜCKEN MENSCH!');
    }
    
    return (
        <Navbar
          expand="lg"          // ab "lg" komplett sichtbar, sonst Collapse
          fixed="top"          // oben fixiert
          className="glass-navbar"  // für Glassmorphism-Style
        variant="dark"
        >
        <Container>
            <Navbar.Brand onClick={countClick}>GroupOrganizer</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
            <Nav>
                <LinkContainer to="/dashboard">
                    <Nav.Link>Dashboard</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/todo">
                    <Nav.Link>ToDo</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/group">
                    <Nav.Link>Gruppen</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/profile">
                    <Nav.Link>Profil</Nav.Link>
                </LinkContainer>
            </Nav>
            </Navbar.Collapse>
        </Container>
        </Navbar>
    );
}