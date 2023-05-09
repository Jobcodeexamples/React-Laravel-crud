import { Link, Outlet, Navigate } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import { useEffect } from "react";
import axiosClient from "../axios-client.js";

export default function DefaultLayout() {
    const {user, token, setUser, notification, setToken} = useStateContext();

    if(!token){
        return <Navigate to="/login"/>
    }

    const onLogout = (ev) => {
        ev.preventDefault();

        axiosClient.post('/logout').then(() =>{
            setUser({})
            setToken(null)
        });
    }
    
    useEffect(() => {
        axiosClient.get('/user').then(({data}) => {
            setUser(data);
        });
    }, []);

    return(
        <div id="defaultLayout">
            <aside>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/users">Users</Link>
            </aside>
            <div className="content">
                {notification && 
                    <div className="notification">
                        {notification}
                    </div>
                }
                <header>
                    <div>
                        Oh CRUD! Application
                    </div>
                    <div>
                        {user.name}
                        &nbsp;
                        <a href="#" onClick={onLogout} className="btn-logout">Logout</a>
                    </div>
                </header>
                <main>
                    <Outlet />
                </main>
            </div>
        </div>
    )
}