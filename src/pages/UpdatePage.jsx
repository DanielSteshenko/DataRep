import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useParams } from "react-router-dom";

// Update page
export const UpdatePage = () => {
    let id = useParams().id; // Get the id from the URL

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [done, setDone] = useState(false);
    // Error handling
    const [error, setError] = useState(null);

    // Get the todo item from the server
    useEffect(() => {
        axios.get("http://localhost:4000/api/todos/" + id)
            .then(response => {
                setTitle(response.data.title);
                setDescription(response.data.description);
                setDone(response.data.done);
            })
            .catch(error => {
                console.log(error);
                setError(error);
            });
    } , []);

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    }

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    }

    const handleDoneChange = (event) => {
        setDone(event.target.checked ? true : false);
    }

    // Handle form submit
    const handleSubmit = (event) => {
        // If empty title show error
        if (title === "") {
            setError("Title is required");
            return;
        }
        if (description === "") {
            setError("Description is required");
            return;
        }

        event.preventDefault();

        // Send the todo item to the server
        axios.put("http://localhost:4000/api/todos/" + id, { title, description, done })
            .then(response => {
                // Redirect to home page
                window.location = "/list";
            })
            .catch(error => {
                console.log(error);
                setError(error);
            });
    }

    return (
        // Form to update a todo item
        <div className="text-center text-white mx-5 my-5">
            <h1>Update a To Do item: </h1>


            <div className="mx-5 my-5">
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="Title">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" placeholder="Enter title" value={title} onChange={handleTitleChange} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="Description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control type="text" placeholder="Enter description" value={description} onChange={handleDescriptionChange} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicDone">
                        <Form.Label>Done</Form.Label>
                        <Form.Check type="checkbox" placeholder="Enter done status" name="done" value={done} onChange={handleDoneChange}/>
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Update
                    </Button>
                </Form>
            </div>
        </div>
    );
}

