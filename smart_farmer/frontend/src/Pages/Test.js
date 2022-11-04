import React from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import Sidebar from "../components/Sidebar/SideBar";
import '../components/Sidebar/Sidebar.css'
import DisplayAlert from "../components/DisplayAlert";


export default function Test() {
    return (
        <DisplayAlert type="warning" content={'Successfully displayed'} />

    );
};