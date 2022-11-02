import React from "react";
import {Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { withRouter } from "react-router";
import Sidebar from "../components/Sidebar/SideBar";
import '../components/Sidebar/Sidebar.css'
import Navbar from "../components/NavBars/LoginNavbar"

export default function Test(){
    return (
        <>
         <Container fluid="x1">
                <Row>
                    <Col xs="3">      
                      <Sidebar />
                    </Col>
                    <Col xs="9"  >

                        this is a test
                    </Col> 
                </Row>

            </Container>
        </>
        );
  };