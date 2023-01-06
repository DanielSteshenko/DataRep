import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export const DeleteModalComponent = (props) => {
    let id = props.id;

    const [show, setShow] = useState(false);
    // Error handling
    const [error, setError] = useState(null);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // on element load show the modal
    useEffect(() => {
        handleShow();
    }, []);


    // Handle form submit
    const handleSubmit = (event) => {
        event.preventDefault();

        // Send the todo item to the server
        axios.delete("http://localhost:4000/api/todos/" + id)
            .then(response => {
                // Reload the page
                window.location.reload();
            })
            .catch(error => {
                console.log(error);
                setError(error);
            });
    }

    return (
        // Modal
        <div className="text-center text-white mx-5 my-5">
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete To Do Item</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this item?</Modal.Body>

                {/* Error handling (Basically show an error if an error occurred on the server side) */}
                {error && <div className="alert alert-danger" role="alert">{error}</div>}

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="danger" onClick={handleSubmit}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}