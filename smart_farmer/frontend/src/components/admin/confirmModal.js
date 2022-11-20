import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default function ConfirmDelete(props) {
  const handleClick = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_HOST}/api/admin/delete-manager/${props.id}`
    );
    const json = await response.json();

    if (response.ok) {
      props.updateManagerList(json._id);
      props.onHide();
    }
  };
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
        <p>{props.message}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={handleClick}>
          Delete
        </Button>
        <Button variant="primary" onClick={props.onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
