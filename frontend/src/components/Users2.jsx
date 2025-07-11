import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Users2() {
    // const [users, setUsers] = useState([]);
    const { isPaused, data: users } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/users')
            return res.json();
        }
    })
    if (isPaused) {
    //    return <h2>load</h2>
    }

    // useEffect(() => {
    //     fetch('http://localhost:5000/users')
    //         .then(res => res.json())
    //         .then(data => {
    //             setUsers(data);
    //         })
    //         .catch(error => {
    //             console.error("Failed to load users:", error);
    //         });
    // }, []);

    const handleUpdated = (_id) => {
        console.log("Update clicked:", _id);
    };

    return (
        <div>
            <h2>User Information</h2>
            {
                users?.map(user => (
                    <ul key={user._id}>
                        <li>
                            {user.name} : {user.email}
                            <Link to={`updateusers/${user._id}`}>
                                <button onClick={() => handleUpdated(user._id)}>Update</button>
                            </Link>
                        </li>
                    </ul>
                ))
            }
        </div>
    );
}

export default Users2;
