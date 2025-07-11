import axios from 'axios';
import React from 'react'
import { useLoaderData } from 'react-router-dom';

function UpdateUsers() {
    const loaded = useLoaderData();
    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const newUsers = { name, email };

        axios.put(`http://localhost:5000/users/${loaded._id}`, newUsers)
            .then(result => {
                console.log(result)
            })
    }
    return (
        <div>
            <h2>Update User Info</h2>

            <form onSubmit={handleSubmit}>
                <input type="text" name="name" defaultValue={loaded.name} id="" /> <br /><br />
                <input type="email" name="email" id="" defaultValue={loaded.email} /> <br /><br />
                <input type="submit" value="Update User" />
            </form>
        </div>
    )
}
export default UpdateUsers