import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function ModalTemp(props) {
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
        <Button variant={props.color} onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}