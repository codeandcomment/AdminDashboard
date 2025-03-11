import React,{useRef} from "react";
import { Link } from "react-router-dom";
import Axios from 'axios';
const Register = () =>{

        const emailRef = useRef(null);
        const usernameRef = useRef(null);
        const passwordRef = useRef(null);
        const cnfrmPasswordRef = useRef(null);

        const createUser = (e) =>{
            e.preventDefault();
            const email= emailRef.current.value.trim();
            const username = usernameRef.current.value.trim();
            const password = passwordRef.current.value.trim();
            const cnfrmPassword = passwordRef.current.value.trim();

            if(cnfrmPassword!==password){
                console.log('password mismatch');
                return;
            }

            if (!username || !email || !email || !password) {
                alert("All fields are required!");
                return;
              }
            Axios.post('http://localhost:3002/register',{
                Email: email,
                UserName:username,
                Password:password,
            }).then((response)=>{
                console.log('user created',response);
            })
        }

    return(
        <div>
            <div className="flex flex-col items-center m-60">

                <h2>Regitser</h2>
                <form onSubmit={createUser}>
                <div className="flex flex-col grid-cols-1 ">
                        <input className="border-1 m-4" type="text" placeholder="enter email" id="emial" ref={emailRef}></input>
                        <input className="border-1 m-4" type="text" placeholder="enter username" id="username" ref={usernameRef}></input>
                        <input className="border-1 m-4" type="password" placeholder="enter password" id="password" ref={passwordRef}></input>
                        <input className="border-1 m-4" type="password" placeholder="enter confirm password" id="cnfrmPassword" ref={cnfrmPasswordRef}></input>
 
                        <button className="border-1 m-4" type="submit">Register</button>
                    </div>
                </form>
            </div>
            <Link to={'/register'}><button>  Register</button></Link>
        </div>
    )


}

export default Register;