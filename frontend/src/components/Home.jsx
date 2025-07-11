import axios from 'axios';
import { useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom'

function Home() {
  const loadedUsers = useLoaderData();
  const [users, setUsers] = useState(loadedUsers);

  const handleSubmit = (_id) => {
    console.log(_id)

    axios.delete(`http://localhost:5000/users/${_id}`)
      .then(data => {
        if (data.data.deletedCount > 0) {
          const remaining = users.filter(us => us._id !== _id);
          setUsers(remaining);
        }
      })
  }
  const handleUpdated = (_id) => {
    console.log(_id)
  }
  return (
    <div>
      <h2>User information</h2>
      {
        users.map(user => <ul>
          <h2>{user.name} : {user.email} <Link to={`updateusers/${user._id}`}><button onClick={() => handleUpdated(user._id)}>Update</button></Link> <button onClick={() => handleSubmit(user._id)}>Delete</button></h2>
        </ul>)
      }
    </div>
  )
}

export default Home