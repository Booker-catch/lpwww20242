import { Container, Row, Col, Stack, Image, Nav, NavLink } from "react-bootstrap";
import { FaInstagram } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa6";
import { FaSquareXTwitter } from "react-icons/fa6";

function Footer(){
    return(
        <footer>
            <Container className="footer-container border-t border-custom-light-grey text-white py-5">
                <Row>
                    <Col>
                        <Stack>
                            <h5>Horarios</h5>
                            <div>Lunes a Sábado: 12:00 - 23:00 hrs.</div>
                            <div>Domingo: 12:00 - 22:00 hrs.</div>
                        </Stack>
                    </Col>
                    <Col>
                        <Image
                        src="Fukusuke-logo.png"
                        width="120"
                        height="120"
                        className="d-inline-block align-top"
                        alt="logo"
                        />
                    </Col>
                    <Col>
                        <Nav className="h-full flex justify-center content-center text-4xl text-custom-light-grey">
                            <Nav.Link href="#"><FaInstagram /></Nav.Link>
                            <Nav.Link href="#"><FaFacebook /></Nav.Link>
                            <Nav.Link href="#"><FaSquareXTwitter /></Nav.Link>
                        </Nav>
                    </Col>
                </Row>
            </Container>
        </footer>
    )
}

export default Footer;