import { faBan, faEye, faEyeSlash, faForwardFast, faTag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Signin( {setUser} ) {
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const navigate = useNavigate();
    const [conditions, setConditions] = useState(null)
    const [errorMsg, setErrrorMsg] = useState(null);
    const [fetchError, setFetchError] = useState(null);
    const [mask, setMask] = useState(false);
    const [loading, setLoading] = useState(false);
    
    function handleData(event) {
        const {name, value} = event.target;
        setUserData({...userData, [name]: value })
        setErrrorMsg(null)
    }
    function handleConditions(event) {
        if(!conditions)
            setConditions(true)
        else
            setConditions(false)
    }
    function validInputs() {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
        const nameRegex = /^[A-Za-z]+[A-Za-z0-9]*$/;
        if(!userData.name.trim() && !userData.email.trim() && !userData.password.trim()) {
            setErrrorMsg("All fields are required");
            return false;
        }
        if(userData.name.trim() === "" || userData.name.trim() === null){
            setErrrorMsg("Enter your name");
            return false;
        }
        else if(!nameRegex.test(userData.name)) {
            setErrrorMsg("invalid username");
            return false;
        }
        else if(userData.name.length < 3){
            setErrrorMsg("user name is too sort");
            return false;
        }
        if(userData.email.trim() === "" || userData.email.trim() === null){
            setErrrorMsg("Enter your email");
            return false;
        }
        else if(!emailRegex.test(userData.email)) {
            setErrrorMsg("Invalid email");
            return false;
        }
        if(userData.password.trim() === "" || userData.password.trim() === null) {
            setErrrorMsg("create your password");
            return false;
        }
        if(!conditions) {
            setErrrorMsg("terms and conditons are applied")
            return false;
        }
        return true;
    }
    async function handleSignup(event) {
        event.preventDefault();
        setLoading(true);

        if(validInputs()) {
            try {
                const response = await axios.post("https://merry-youth-production.up.railway.app/design/register", userData);
                if(response.data.message === "user successfully registered"){
                    setUser(response.data.user);
                    navigate("/", { replace: true });
                }
                else
                    setErrrorMsg(response.data.message);

                setLoading(false);
            }
            catch(error) {
                setFetchError("Unable to connect server, check your connection or server is down!");
            }
        }
        
    }
    function togglerMask() {setMask(!mask)}
    return(
        <>
            <title>SingUp</title>
            {fetchError ? 
                <div className="w-full">{fetchError}</div> :
                <div className="w-full h-screen flex rlative">
                    {loading && (
                        <div className="absolute top-[0%] z-10 w-full h-screen bg-gray-900 bg-opacity-70  left-[50%] -translate-x-[50%] flex justify-center items-center ">
                            <div className="w-[4em] h-[4em] border-[#AA60C8] border-t-[2px] rounded-full animate-spin"></div>
                        </div>
                    )}
                    <section className="w-[50%] h-full bg-gradient-to-t to-indigo-950 from-blue-950 text-snow max-md:hidden">
                        <div className="flex flex-col w-[90%] lg:w-[70%] mx-auto h-[80%] justify-center ">
                            <h1 className="font-medium text-[2.5em] mb-[1.5em]">The choice of new generation.</h1>
                            <div className="content-group">
                                <FontAwesomeIcon icon={faTag} flip="horizontal" className="text-[1.8em] text-teal-600" />
                                <p className="text-[1.3em] capitalize">It's free.</p>
                            </div>
                            <div className="content-group my-[20px]">
                                <FontAwesomeIcon icon={faBan} className="text-[1.8em] text-teal-600" />
                                <p className="text-[1.3em] capitalize">No credit card.</p>
                            </div>
                            <div className="content-group">
                                <FontAwesomeIcon icon={faForwardFast}  className="text-[1.8em] text-teal-600" />
                                <p className="text-[1.3em] capitalize">Live preview.</p>
                            </div>
                        </div>
                        <div className="text-base text-gray-400 text-center mt-[5%]">&copy; 2025 NextGen Tiles. All rights reserved.</div>
                    </section>
                    <section className="w-full md:w-[50%] h-full bg-white">
                        <div className="w-[96%] xa:w-[90%] xs:w-[80%] md:w-[90%] lg:w-[80%] xl:w-[70%] h-full flex flex-col justify-center mx-auto ">
                            <h2 className="text-center mb-[5%] text-gray2 font-semibold text-[1.8em] capitalize">get started!</h2>
                            <form className="w-full" onSubmit={handleSignup}>
                                <div className="input-group">
                                        <label htmlFor="userName" className="input-label">user name</label>
                                        <input type="text" autoComplete="off" name="name" id="userName" onChange={handleData} value={userData.name} className="input" placeholder="Name" />
                                </div>
                                <div className="input-group my-[20px]">
                                        <label htmlFor="email" className="input-label">email</label>
                                        <input type="text" autoComplete="off" placeholder="Email" name="email" onChange={handleData} value={userData.email} className="input" />
                                </div>
                                <div className="input-group">
                                        <label htmlFor="password" className="input-label">password</label>
                                        <div className="w-full relative">
                                            <input type={mask ? `text` : 'password'} autoComplete="off" placeholder="Password" name="password" onChange={handleData} value={userData.password} className="input" />
                                            {mask ?
                                            <FontAwesomeIcon onClick={togglerMask} icon={faEyeSlash} className="absolute right-[10px] top-1/2 -translate-y-1/2 cursor-pointer" /> :
                                            <FontAwesomeIcon onClick={togglerMask} icon={faEye} className="absolute right-[10px] top-1/2 -translate-y-1/2 cursor-pointer" />
                                            }
                                        </div>
                                </div>
                                <div className="input-confirm">
                                    <input type="checkbox" name="" onClick={handleConditions} id="confirm" className="w-[15px] hover:cursor-pointer" />
                                    <label htmlFor="confirm" className="text-[12px] max-xa:font-bold xa:text-[14px] lg:text-base text-gray-500 font-medium">I agree the <a href="#" className="conditions">Terms & Conditions</a> and <a href="#" className="conditions">privacy policy</a></label>
                                </div>
                                <button type="submit" className="input-sumbit">SingUp</button>
                            </form>
                            <div className="mt-[10%] text-center">Already have an account? <Link to='/login' className="text-teal-500 hover:border-b-[2px] cursor-pointer font-semibold border-teal-500">Login here</Link></div>
                        </div>
                    </section>
                    {errorMsg && 
                        <p className="error-msg">{errorMsg}</p>
                    }
                </div>
            }
        </>
    );
}

export default Signin;
