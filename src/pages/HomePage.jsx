import React from "react";

// Welcomes the user to the site and provides a short description of the site.
export const HomePage = () => {
    return (
        <div className="mx-5 my-5 text-center text-white">
        <h1>Welcome to the To-Do App</h1>

        <div className="mx-5 my-5 text-white">
        <p>
            This is a simple to-do app that allows you to create, edit, and delete to-do items.

            <br></br>

            Use the navigation bar to navigate to the different pages.
        </p>
        </div>


        {/* view all lists button redirects to list page */}
        <div className="mx-5 my-5 text-white">
            <a href="/list" className="btn btn-dark btn-lg active" role="button" aria-pressed="true">View All To-Do Lists</a>
        </div>


        </div>
    );
    };