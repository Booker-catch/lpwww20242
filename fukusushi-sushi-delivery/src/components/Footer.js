import { Container, Row, Col, Stack, Image, Nav } from "react-bootstrap";
import { FaInstagram, FaFacebook, FaSquareXTwitter } from "react-icons/fa6";

function Footer(){
    return(
        <footer className="bg-footer-bg" fluid>
            <Container className="footer-container text-white py-4">
                <Row 
                    className="border-t border-custom-light-grey pt-3  d-flex flex-column flex-md-row align-items-center"
                >
                    <Col className="mb-3 mb-md-0">
                        <Stack className="flex h-full justify-center content-center text-center">
                            <h5>Horarios</h5>
                            <div>Lunes a Sábado: 12:00 - 23:00 hrs.</div>
                            <div>Domingo: 12:00 - 22:00 hrs.</div>
                        </Stack>
                    </Col>
                    <Col className="mb-3 mb-md-0 d-flex justify-center">
                        <Image
                            src="Fukusuke-logo.png"
                            width="120"
                            height="120"
                            className="d-inline-block align-top"
                            alt="logo"
                            roundedCircle 
                        />
                    </Col>
                    <Col className="mb-3 mb-md-0 d-flex justify-center">
                        <Nav className="flex h-full justify-center content-center gap-4 text-2xl text-custom-light-grey lg:text-4xl">
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
