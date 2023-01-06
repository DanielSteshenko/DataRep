import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import toast, { Toaster } from 'react-hot-toast';

// Component to show a modal to reload the app with sample data
export const ProfilePictureComponent = (props) => {
    const [show, setShow] = useState(props.show);
    const [handleClose, setHandleClose] = useState(props.onClose);
    const [error, setError] = useState(null);


    // Handle form submit
    const handleSubmit = (event) => {
        event.preventDefault();

        // Reload app with new data
        axios.post("http://localhost:4000/api/todos/reload").then(response => {
            toast.success("Reloaded app with fresh sample data");

            // Redirect to home page
            window.location.href = "/";
        }).catch(error => {
            console.log(error);
            setError(error);
            toast.error("Error reloading app, check console for details");
        });
    }

    return (
        // Modal
        <div className="text-center text-white mx-5 my-5">
            <div><Toaster/></div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>This will reload the app with fresh todo sample data</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to do this?</Modal.Body>

                {/* Error handling */}
                {error && <div className="alert alert-danger" role="alert">{error}</div>}

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="danger" onClick={handleSubmit}>
                        Reload
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

// Function to reload the app with sample data
export function SomethingElse() {
    const response = axios.post("http://localhost:4000/api/todos/reload");
    const retval = response.data;
    return retval;
}
