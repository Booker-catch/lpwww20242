import { Container, Row, Col, Stack } from "react-bootstrap";

function Footer(){
    return(
        <footer>
            <Container className="footer-container" fluid>
                <Row>
                    <Col>
                        <Stack>
                            <h5>Horarios</h5>
                            <div>Lunes a Sábado: 12:00 - 23:00 hrs.</div>
                            <div>Domingo: 12:00 - 22:00 hrs.</div>
                        </Stack>
                    </Col>
                    <Col>Logo</Col>
                    <Col>Hola</Col>
                </Row>
            </Container>
        </footer>
    )
}

export default Footer;