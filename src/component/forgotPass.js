
import { faX, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ForgotPassword({ forgot, setForgot }) {
    const [input, setInput] = useState({
        email: "",
        password: "",
    });
    const [confirmPass, setConPass] = useState("");
    const [msg, setMsg] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    function handleInput(event) {
        const { name, value } = event.target;
        if (name === "confirm-password") {
            setConPass(value);
            return;
        }
        setInput({ ...input, [name]: value });
    }

    function validPassword() {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
        if (!input.password.trim() || !input.email.trim() || !confirmPass.trim()) {
            setMsg("All fields are required!");
            return false;
        } else if (!emailRegex.test(input.email)) {
            setMsg("Enter a valid email");
            return false;
        } else if (input.password.trim() !== confirmPass.trim()) {
            setMsg("Passwords do not match");
            return false;
        }
        return true;
    }

    async function handleEmail(event) {
        event.preventDefault();
        setLoading(true);
        if (validPassword()) {
            try {
                const response = await axios.put(
                    `https://tilesprojectbackend-production.up.railway.app/design/public/update-password`, input
                );
                if (response.data === "Password changed successfully") {
                    window.location.reload();
                } else {
                    setMsg(response.data);
                }
                setLoading(false)
            } catch (error) {
                setMsg("Error updating password. Please try again.");
            }
        }
    }

    return (
        forgot && (
            <div className="w-full h-screen absolute bg-transparent flex items-center justify-center">
                {loading && (
                    <div className="absolute top-[0%] z-10 w-full h-screen bg-gray-900 bg-opacity-70  left-[50%] -translate-x-[50%] flex justify-center items-center ">
                        <div className="w-[4em] h-[4em] border-[#AA60C8] border-t-[2px] rounded-full animate-spin"></div>
                    </div>
                )}
                <section className="w-[90%] xs:w-[80%] md:w-[60%] lg:w-[40%] bg-white p-6 relative rounded-lg shadow-lg">
                    <FontAwesomeIcon icon={faX} onClick={() => setForgot(!forgot)} className="cursor-pointer absolute right-4 top-4" />
                    <h2 className="text-xl font-semibold text-center mb-4">Reset Password</h2>

                    <form onSubmit={handleEmail} className="space-y-4">
                        <div>
                            <label className="block font-medium">Email</label>
                            <input
                                type="email"
                                name="email"
                                className="w-full border p-2 rounded-md"
                                onChange={handleInput}
                            />
                        </div>
                        <div className="relative">
                            <label className="block font-medium">New Password</label>
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                className="w-full border p-2 rounded-md pr-10"
                                onChange={handleInput}
                            />
                            <FontAwesomeIcon 
                                icon={showPassword ? faEyeSlash : faEye} 
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-9 cursor-pointer"
                            />
                        </div>
                        <div className="relative">
                            <label className="block font-medium">Re-Enter Password</label>
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                name="confirm-password"
                                className="w-full border p-2 rounded-md pr-10"
                                onChange={handleInput}
                            />
                            <FontAwesomeIcon 
                                icon={showConfirmPassword ? faEyeSlash : faEye} 
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-3 top-9 cursor-pointer"
                            />
                        </div>

                        {msg && <p className="text-center bg-red-200 w-[90%] xs:w-[80%] mx-auto text-red-800 py-[1em]">{msg}</p>}

                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
                        >
                            Reset
                        </button>
                    </form>
                </section>
            </div>
        )
    );
}

export default ForgotPassword;
