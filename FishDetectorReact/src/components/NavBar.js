import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useEffect, useState } from 'react';




const NavBar = () => {

    const [status, setStatus] = useState(false);

    useEffect(() => {
        let logged = localStorage.getItem('uid');
        if (logged) {
            setStatus(true);
        } else {
            setStatus(false);
        }
    }, [])

    const logout = () => {
        localStorage.clear();
        window.location.href = '/';

    }

    return (
        <div>
            <Navbar bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand href="/">Fish Detector</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="/register">Register</Nav.Link>
                        {!status && <Nav.Link href="/">Login</Nav.Link>}
                        {status && <Nav.Link onClick={logout} >Logout</Nav.Link>}
                        {status && <Nav.Link href="/detect">Detect</Nav.Link>}
                        {status && <Nav.Link href="/history">History</Nav.Link>}
                    </Nav>
                </Container>
            </Navbar>
        </div>
    );
}

export default NavBar;