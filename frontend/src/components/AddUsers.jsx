import axios from 'axios';
function AddUsers() {
    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const newUsers = { name, email };
        console.log(newUsers);

            axios.post('http://localhost:5000/users', newUsers)
                .then(result => {
                    console.log(result)
                    if (result.data.insertedId) {
                        alert('Added user!!')
                    }
                })
    }
    return (
        <div>
            <h2>Add User Info</h2>

            <form onSubmit={handleSubmit}>
                <input type="text" name="name" id="" /> <br /><br />
                <input type="email" name="email" id="" /> <br /><br />
                <input type="submit" value="Add User" />
            </form>
        </div>
    )
}

export default AddUsers