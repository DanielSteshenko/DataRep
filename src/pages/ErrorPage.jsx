import React from "react";

// Shows an error message if the user tries to access a page that doesn't exist.
export const ErrorPage = () => {
    return (
        <div className="mx-5 my-5 text-center text-white">
            <h1>Page Not Found</h1>
            <p>
                The page you are looking for does not exist.
            </p>
        </div>
    );
};