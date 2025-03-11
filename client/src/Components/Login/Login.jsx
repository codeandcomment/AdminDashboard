import React, { useRef } from "react";
import { Link, useNavigate} from 'react-router-dom'
import Axios from "axios";
const Login = () =>{

    const usernameRef = useRef(null);
    const passwordRef = useRef(null);
    const navigateTo = useNavigate();
    const loginHandler = (e) =>{
        e.preventDefault();
        const username = usernameRef.current.value.trim();
        const password = passwordRef.current.value.trim();


        if (!username || !password) {
            alert("All fields are required!");
            return;
          }
        Axios.post('http://localhost:3002/api/v1/login',{
            UserName:username,
            Password:password,
        }).then((response)=>{
            if(response.data.id>0){
                localStorage.setItem('token', response.data.token),
                navigateTo('/dashboard')
            }
            console.log('success',response);
        })
    }



    return(
        <div>
            <div className="flex flex-col items-center m-60">
                <h2>Login</h2>
                <form onSubmit={loginHandler}>
                    <div className="flex flex-col grid-cols-1 ">
                        <input className="border-1 m-4" type="text" placeholder="enter username" id="username" ref={usernameRef}></input>
                        <input className="border-1 m-4" type="password" placeholder="enter password" id="password" ref={passwordRef}></input>
                        <button className="border-1 m-6" type="submit">Login</button>
                    </div>
                </form>          
                  <Link to={'/register'}><button>  Register</button></Link>

            </div>
        </div>
    )


}

export default Login;