import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


export default function ConfirmDelete(props) {

  const handleClick = async ()=>{
    const response = await fetch(
      `${process.env.REACT_APP_HOST}/api/admin/delete-manager/${props.id}`
    );
    const json = await response.json();
   
    // console.log(json)
    if (response.ok) {
      console.log(json);
    }
  }
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* <h4>{}</h4> */}
        <p>
          {props.message}
        </p>
      </Modal.Body>
      <Modal.Footer>
      <Button variant="danger" onClick={handleClick}>Delete</Button>
        <Button variant="primary" onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}














// import React from "react";
// import 'bootstrap/dist/css/bootstrap.min.css';
// import {
//     Button, Modal, ModalFooter,
//     ModalHeader, ModalBody
// } from "reactstrap"

// export default function ModalTemp({title,message}) {
//     // Modal open state
//     const [modal, setModal] = React.useState(false);
  
//     // Toggle for Modal
//     const toggle = () => setModal(!modal);
  
//     return (
//         <div style={{
//             display: 'block', width: 700, padding: 30
//         }}>
//             {/* <h4>ReactJS Reactstrap Modal Component</h4>
//             <Button color="danger"
//                 onClick={toggle}>Click me to open Modal</Button> */}
//             <Modal isOpen={modal} toggle={toggle}>
//                 <ModalHeader
//                     toggle={toggle}>{title}</ModalHeader>
//                 <ModalBody>
//                     {message}
//                 </ModalBody>
//                 <ModalFooter>
//                     <Button color="green" onClick={toggle}>Okay</Button>
//                 </ModalFooter>
//             </Modal>
//         </div >
//     );
    

// }
