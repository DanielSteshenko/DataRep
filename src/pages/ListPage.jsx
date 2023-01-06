// Show a list of todo items
import React, { useState, useEffect } from "react";
import axios from "axios";
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { DeleteModalComponent } from "../components/DeleteModalComponent";

export const ListPage = () => {
    // Get the list of todo items from the server
    const [todoList, setTodoList] = useState([]);
    // Error handling
    const [error, setError] = useState(null);

    const [show, setShow] = useState(false);

    const [id, setId] = useState("");


    // Get the list of todo items from the server
    useEffect(() => {
        axios.get("http://localhost:4000/api/todos")
            .then(response => {
                setTodoList(response.data);
            })
            .catch(error => {
                console.log(error);
                setError(error);
            });
    } , []);

    // Handle delete button click
    const handleDelete = (id) => {
        setShow(true); // Show modal
        setId(id); // Set the id of the todo item to delete
    }

    // Handle edit button click
    const handleEdit = (id) => {
        // Move to the Edit page
        window.location.href = "/update/" + id;
    }

    // accordion function
    const accordion = (index) => {
        var x = document.getElementById("collapse" + index); // Get the collapse element
        if (x.className.indexOf("show") === -1) { // If the collapse element is not shown
            x.className += " show"; // Show the collapse element
        } else { // If the collapse element is shown
            x.className = x.className.replace(" show", "");     // Hide the collapse element
        }
    }

    // change accordion icon function
    const changeIcon = (index) => { // index is the index of the todo item
        var x = document.getElementById("icon" + index); // Get the icon element
        if (x.className.indexOf("fa-chevron-down") === -1) { // If the icon is not fa-chevron-down
            x.className += " fa-chevron-down"; // Change the icon to fa-chevron-down
        } else { // If the icon is fa-chevron-down
            x.className = x.className.replace(" fa-chevron-down", " fa-chevron-up");    // Change the icon to fa-chevron-up
        }
    }


    // Accordian list of todo items (Todo list contains: title, description and done status)
    return (
        // Show modal if show is true
        <div className="text-center text-white mx-5 my-5">
            <h1>List of To Do items: </h1>

            {show ? <DeleteModalComponent show={show} setShow={setShow} id={id} /> : null}

            {/* Error handling */}
            {error ? <p>{error.message}</p> : null}

            <div className="mx-5 my-5">

            <Accordion>
                    {todoList.map((todo, index) => (
                        <Accordion.Item eventKey={index}>
                            <Accordion.Header onClick={() => {accordion(index); changeIcon(index);}}>
                                <div className="row">
                                    <div>
                                        <h3>{todo.title}</h3>
                                    </div>

                                    <div className="col-2">
                                        <i id={"icon" + index} className="fas fa-chevron-up"></i>
                                    </div>
                                </div>
                            </Accordion.Header>
                            <Accordion.Body id={"collapse" + index}>
                                <div className="row">
                                    <div className="col-12">
                                        <p>{todo.description}</p>

                                        <p>Done: {todo.done ? "Yes" : "No"}</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        <Button variant="dark" className="mx-1" onClick={() => handleEdit(todo._id)}>Edit</Button>
                                        <Button variant="dark" className="mx-1" onClick={() => handleDelete(todo._id)}>Delete</Button>
                                    </div>
                                </div>
                            </Accordion.Body>
                        </Accordion.Item>


                    ))}
                </Accordion>


            </div>
        </div>
    );

}