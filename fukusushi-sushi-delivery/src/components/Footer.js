import { Container, Row, Col, Stack, Image, Nav } from "react-bootstrap";
import { FaInstagram, FaFacebook, FaSquareXTwitter } from "react-icons/fa6";

function Footer(){
    return(
        <footer className=" bg-footer-bg" fluid>
            <Container className="footer-container text-white py-4">
                <Row className="border-t border-custom-light-grey pt-3">
                    <Col>
                        <Stack className="flex h-full justify-center content-center">
                            <h5>Horarios</h5>
                            <div>Lunes a Sábado: 12:00 - 23:00 hrs.</div>
                            <div>Domingo: 12:00 - 22:00 hrs.</div>
                        </Stack>
                    </Col>
                    <Col className="flex justify-center">
                        <Image
                            src="Fukusuke-logo.png"
                            width="120"
                            height="120"
                            className="d-inline-block align-top"
                            alt="logo"
                        />
                    </Col>
                    <Col>
                        <Nav className="flex h-full justify-center content-center gap-4 text-4xl text-custom-light-grey">
                            <Nav.Link href="#" className="text-custom-light-grey">
                                <FaInstagram />
                            </Nav.Link>
                            <Nav.Link href="#" className="text-custom-light-grey">
                                <FaFacebook />
                            </Nav.Link>
                            <Nav.Link href="#" className="text-custom-light-grey">
                                <FaSquareXTwitter />
                            </Nav.Link>
                        </Nav>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
}

export default Footer;
