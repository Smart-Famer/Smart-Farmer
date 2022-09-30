import React from 'react'
import {Container,Row,Col} from 'reactstrap'
import "../App.css"

export default function Profile(props) {
    const profilePic = '/images/profilepic.jpg'
    const firstName = 'Hiruna'
    const lastName = 'Hansaka'
    const post  = 'Farm Assistent'

    return(
    
        <div className='profile--container mt-3'>
            <div className='profile--heading'>
                <h5>View Profile</h5>
            </div>
            <div className='profile--data'>
                <Container>
                    <Row>
                        <Col xs='8'>
                            <Row className="align-items-center px-5">
                                <Col>First Name</Col>
                                <Col className="bg-secondary bg-opacity-25 rounded py-3 text-center">{firstName}</Col>
                            </Row>
                            
                            <Row className="align-items-center px-5 pt-3">
                                <Col>Last Name</Col>
                                <Col className="bg-secondary bg-opacity-25 rounded py-3 text-center">{lastName}</Col>
                            </Row>
                            
                            <Row className="align-items-center px-5 pt-3">
                                <Col>Post</Col>
                                <Col className="bg-secondary bg-opacity-25 rounded py-3 text-center">{post}</Col>
                            </Row>

                        </Col>
                        <Col className="d-flex justify-content-center">
                            <img className="rounded w-75" src={profilePic} alt="Profile Picture"/>
                        </Col>
                    </Row>
                </Container>
            </div>       
        </div>         
           
        
    )
}