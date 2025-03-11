import React, { useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom'
import api from '../../utils/api'
const Dashboard = () =>{

    const [userlist, setuserList] = useState([]);
    const navigateTo = useNavigate()

    useEffect(()=>{


        const fecthUsers = async () =>{

            try{
                const response = await api.get('/listusers');
                console.log(response.data.result);
                setuserList(response.data.result);
            }catch(error){
                console.log(error);
            }

        }
        fecthUsers();
},[])

    const handleLogout =()=>{
        localStorage.removeItem('token');
        navigateTo('/')
    }

    return(
        <div>
         <a href="/logout">Logout</a>
            {
                userlist.map((user)=>{
                    return (<div key={user.id}>
                        <p>{user.id}</p>
                        <p>{user.username}</p>
                        <p>{user.email}</p>

                    </div>)
                })

            }
            <button className="m-4 bg-amber-600 border-2" onClick={handleLogout}>Logout</button>
        </div>
    )


}

export default Dashboard;