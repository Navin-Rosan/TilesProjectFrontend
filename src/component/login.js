import { faLock, faLockOpen, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import login from "../images/login.png"
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import ForgotPassword from "./forgotPass";
function Login({setUser}) {
    const [input, setInput] = useState({
        email: '',
        password: ''
    });
    const [errorMsg, setErrrorMsg] = useState(null);
    const navigate = useNavigate();
    const [mask, setMask] = useState(false);
    const [fetchError, setFetchError] = useState(null);
    const [forgot, setForgot] = useState(false);
    const [loading, setLoading] = useState(false);

    function handleInput(event) {
        const {name, value} = event.target;
        setInput({...input, [name]: value});
        setErrrorMsg(null);
    }
    function validValues() {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
        if(!input.email.trim() && !input.password.trim()) {
            setErrrorMsg("All fields are required");
            return false;
        }
        if(input.email.trim() === "" || input.email.trim() === null){
            setErrrorMsg("Enter your email");
            return false;
        }
        else if(!emailRegex.test(input.email)) {
            setErrrorMsg("enter a valid email");
            return false;
        }
        if(!input.password.trim() && input.password.trim() === "") {
            setErrrorMsg("Enter Password");
            return false;
        }
        return true;
    }

    async function handleLogin(event) {
        event.preventDefault();
        setLoading(true);
        try {
            if(validValues()) {
                const response = await axios.post("https://tilesprojectbackend-production.up.railway.app/design/login", input);
                if(response.data.message === "user login successfully"){
                    setUser(response.data.user)
                    navigate('/', {replace: true, state: {responseMessage: response.data.message}});
                }
                else
                    setErrrorMsg(response.data.message);
                setLoading(false)
            }
        }
        catch(error) {
            setFetchError("Unable to connect server, check your connection or server is down!");
        }
    }

    function togglerMask() {setMask(!mask)}
    
    return(
        <>
        <title>Login</title>
        {fetchError ? 
            <div className="w-full">{fetchError}</div> :
            <div className="flex w-full h-screen font-roboto relative">
                {loading && (
                    <div className="absolute top-[0%] z-10 w-full h-screen bg-gray-900 bg-opacity-70  left-[50%] -translate-x-[50%] flex justify-center items-center ">
                        <div className="w-[4em] h-[4em] border-[#AA60C8] border-t-[2px] rounded-full animate-spin"></div>
                    </div>
                )}
                {errorMsg && (<p className="max-md:w-[80%] max-lg:w-[60%] max-lg:text-center absolute top-[20px] left-[50%] -translate-x-1/2 bg-[#f8d7da] text-[#721c24] max-lg:py-[10px] lg:p-[2px] border-[1px] border-[#f5c6cb] rounded-[4px]">{JSON.stringify(errorMsg)}</p>)}
                <section className="w-full md:w-[50%] h-full bg-[#bfdbf7]">
                    <div className="h-full w-[90%] xs:w-[70%] md:w-[90%] lg:w-[70%] xl:w-[65%] mx-auto flex flex-col justify-center">
                        <form onSubmit={handleLogin} className="">  
                            <div className="login-title">
                                <h2 className="">Sign in to your account</h2>
                                <p className="">Welcome back to NextGen</p>
                            </div>
                            <div className="login-group mb-[20px]">
                                <label htmlFor="">Email</label>
                                <div className="login-input-group relative w-full">
                                    <input type="text" autoComplete="off" onChange={handleInput} name="email" placeholder="email" />
                                    <FontAwesomeIcon icon={faUser} className="login-icons" />
                                </div>
                            </div>
                            <div className="login-group">
                                <label htmlFor="">Password</label>
                                <div className="login-input-group relative">
                                    <input type={mask ? `text` : `password`} autoComplete="off" onChange={handleInput} name="password" placeholder="password"/>
                                    {mask ?
                                        <FontAwesomeIcon icon={faLockOpen} onClick={togglerMask} className="login-icons" /> :
                                        <FontAwesomeIcon icon={faLock} onClick={togglerMask} className="login-icons" />
                                    }
                                </div>
                            </div>
                            <button className="login-btn" type="submit">Login</button>
                        </form>
                        {/* <div className="w-full flex items-center justify-between my-[20px]">
                            <hr className="w-[40%] border-gray-400" />
                            <p className="text-gray-500 font-normal">or</p>
                            <hr className="w-[40%] border-gray-400" />
                            </div> */}
                            <div className="forgot-pass my-[20px]">
                                <p className="text-base text-[#2e5068] " onClick={()=>setForgot(!forgot)}>Forgot your password?</p>
                            </div>
                        <div  className="w-full text-center" >
                            <p className="text-[#4a6b84] font-normal">don't have an account? <Link to='/signin' className="underline text-[#1a3b5d]">sign up</Link></p>
                        </div>
                    </div>
                </section>
                <section className="w-[50%] max-md:hidden">
                    <img src={login} alt="" className="w-[100%] h-full" />
                </section>
                {forgot && <ForgotPassword forgot={forgot} setForgot={setForgot} />}
            </div>
        }
        </>
    );
}

export default Login;