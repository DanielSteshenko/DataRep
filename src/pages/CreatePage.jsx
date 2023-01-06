import React, {useState, useEffect} from "react";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

// Create page
export const CreatePage = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [done, setDone] = useState(false);

    // Error handling
    const [error, setError] = useState(null);

    const handleTitleChange = (event) => {
        setTitle(event.target.value); // Set the title to the value of the input
    }

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value); // Set the description to the value of the input
    }

    const handleDoneChange = (event) => {
        setDone(event.target.checked ? true : false); // If checked set to true else false
    }

    // Handle form submit
    const handleSubmit = (event) => {
        // If empty title show error
        if (title === "") {
            setError("Title is required");
            return;
        }
        // If empty description show error
        if (description === "") {
            setError("Description is required");
            return;
        }

        event.preventDefault();
        // Send the todo item to the server
        axios.post("http://localhost:4000/api/todos", { title, description, done })
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
        // Form to create a todo item
        <div className="text-center text-white mx-5 my-5">
            <h1>Create a To Do item: </h1>

            {/* Handle error */}
            {error && <h4 className="text-muted">Error: {error}</h4>}

            <div className="mx-5 my-5">
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicTitle">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" placeholder="Enter title" name="title" value={title} onChange={handleTitleChange}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicDescription">
                        <Form.Label>Description</Form.Label>
                        <Form.Control type="textarea" placeholder="Enter description" name="description" value={description} onChange={handleDescriptionChange}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicDone">
                        <Form.Label>Done</Form.Label>
                        <Form.Check type="checkbox" placeholder="Enter done status" name="done" value={done} onChange={handleDoneChange}/>
                    </Form.Group>

                    <Button variant="primary" type="submit" onClick={handleSubmit}>
                        Submit
                    </Button>
                </Form>
                </div>


        </div>
    );
}