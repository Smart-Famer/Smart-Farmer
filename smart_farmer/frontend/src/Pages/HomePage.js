
import Header from "../components/login/Header.js"
import { Link } from "react-router-dom"
import { Container, Row, Col } from "reactstrap";
import LoginNavBar from "../components/NavBars/LoginNavbar"
import Sidebar from "../components/Sidebar/SideBar.js"
import Card from "../components/cards/card.js"

export default function Home() {
    return (
        <div className="main-container">
            <Sidebar />
            <div className="home">
                <Header />
                <div className="farm-card p-5">
                    <Container >
                        <Row>
                            <Col>
                                <Card name="My Farm 1" location="Matara-Sri lanka" />
                            </Col>
                            <Col>
                                <Card name="My Farm 2" location="Matara-Sri lanka" />
                            </Col>
                            <Col>
                                <Card name="My Farm 3" location="Matara-Sri lanka" />
                            </Col>
                            <Col>
                                <Card name="My Farm 4" location="Matara-Sri lanka" />
                            </Col>
                            <Col>
                                <Card name="My Farm 5" location="Matara-Sri lanka" />
                            </Col>
                        </Row>


                    </Container>

                </div>
            </div>


        </div>
    )
}