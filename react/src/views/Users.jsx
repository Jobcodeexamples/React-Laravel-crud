import {Link} from "react-router-dom";
import { useEffect } from "react";
import axiosClient from "../axios-client";
import { useState } from "react";
import {useStateContext} from "../contexts/ContextProvider.jsx";

export default function Users() {
    const [users, setUser] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = () => {
        axiosClient.get('/users')
        .then(({data}) =>{
            setLoading(false);
            console.log(data);
            setUser(data.data);
        })
        .catch(() => {
            setLoading(false);
        });
    }

    const onDelete = (user) => {
        if(!window.confirm('Are you sure you want to delete this record?')){
            return
        }else{
            axiosClient.delete(`/users/${user.id}`)
            .then(() => {
                // TODO show notification
                setLoading(true);
                getUsers()
            })
        }
    }

    return(
        <div>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <h1>Users</h1>
                <Link to="/users/new" className="btn-add">Add new</Link>
            </div>
            <div className="card animated fadeInDown">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Create Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    {loading && <tbody>
                        <tr>
                            <td colSpan="5" className="text-center">
                                Loading ...
                            </td>
                        </tr>
                    </tbody>
                    }{!loading &&
                    <tbody>
                        {users.map(u => (
                            <tr key={u.id}>
                                <td>{u.id}</td>
                                <td>{u.name}</td>
                                <td>{u.email}</td>
                                <td>{u.created_at}</td>
                                <td>
                                    <Link className="btn-edit" to={'/users/' + u.id}>Edit</Link>
                                    &nbsp;
                                    <button onClick={ev => onDelete(u)}className="btn-delete">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    }
                </table>
            </div>
        </div>
    )
}