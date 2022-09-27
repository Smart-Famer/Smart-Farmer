import React from "react"
import "../App.css"
import LoginNavBar
    from "../components/NavBars/LoginNavbar"
import Login from "../components/Login"
import { Button, Container, Row, Col } from 'reactstrap';

export default function LoginPage() {
    return (
        <div className="login">
            <LoginNavBar />
            {/* <br/>
            <Container>
                <Row xs="3">
                    <Col></Col>
                    <Col> <Login /></Col>
                    <Col></Col>
                </Row>
            </Container> */}
            <div className="home-login"><Login /></div>

        </div>
    )
}