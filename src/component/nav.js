import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import userLogo from '../images/user.png';
import cancel from '../images/cancel.png'
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from '../images/iconModifyed1.png'
import { faArrowRight, faBars } from "@fortawesome/free-solid-svg-icons";
function Nav( {user, setUser} ) {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(!!user);
    const [visitProfile, setVisitProfile] = useState(false);
    const [loading, setLoading] = useState(false);
    const [nav, setNav] = useState(false)
    const [userImg, setUserImg] = useState(()=>{
        if (user) {
            const img = localStorage.getItem('img');
            return img ? JSON.parse(img) : user.img || null;
        }
    });

    useEffect(()=>{
        setIsAuthenticated(!!user);
    }, [user])
    function condition() {
        setVisitProfile(!visitProfile);
    }
    function logout() {
        setUser(null);
        setVisitProfile(false)
        localStorage.removeItem("user");
        localStorage.removeItem('img');
        navigate('/', {replace: true});
    }
    function handleImg(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
			reader.onload = () => {
				setUserImg(reader.result);
			};
		}
    }
    async function save() {
        setLoading(true)
        try {
            await axios.put(`https://merry-youth-production.up.railway.app/design/public/img/${user.email}`,{img: userImg});
            localStorage.setItem('img', JSON.stringify(userImg));
            window.location.reload();
        }
        finally {
            setLoading(false)
        }
    }
    
    function toggleNav() {
        setNav(!nav);
        setVisitProfile(false)
    }
    
    return(
        <div className=" w-full h-[10%] bg-nav flex justify-center flex-col">
            <nav className={`flex justify-between w-[80%] mx-auto lg:mx-0 lg:justify-around lg:w-full items-center`}>
                <div className={'flex items-center justify-center gap-[10px]'}>
                    <img src={logo} alt="" className="w-[3em] xl:w-[3.5em]" />
                    <Link to='/' className="text-[20px] xs:hidden">NextGen</Link>
                    <Link to='/' className="text-[20px] max-xs:hidden">NextGen Walls</Link>
                </div>
                    <FontAwesomeIcon className={'lg:hidden cursor-pointer'} icon={nav ? faArrowRight : faBars}  onClick={toggleNav} /> 
                <div
                className={`absolute top-[10%] left-0 w-full bg-nav py-[10px] z-10 transition-all duration-500 ease-in-out lg:static lg:flex lg:w-[60%] xl:w-[50%] lg:justify-between 
                ${nav ? "translate-y-0 opacity-100 visible" : "-translate-y-full opacity-0 invisible lg:visible lg:opacity-100 lg:translate-y-0"}`}
                >
                    <div className={`nav-com`}>
                        <NavLink className={({ isActive })=>
                            `nav-link w-full lg:w-auto text-center ${isActive &&
                            "bg-nav-hover text-white " }`
                        } to='/'>Home</NavLink>
                        <NavLink className={({ isActive })=>
                            `nav-link w-full lg:w-auto text-center ${isActive &&
                            "bg-nav-hover text-white " }`
                        } to='/generator'>Generate</NavLink>
                        <NavLink className={({ isActive })=>
                            `nav-link w-full lg:w-auto text-center ${isActive &&
                            "bg-nav-hover text-white " }`
                        } to='/pattern'>Texture</NavLink>
                        <NavLink className={({ isActive })=>
                            `nav-link w-full lg:w-auto text-center ${isActive &&
                            "bg-nav-hover text-white " }`
                        } to='/Save'>Saved</NavLink>
                    </div>
                        <section className={`profile-container ${visitProfile ? ` translate-x-0 opacity-100 visible` : `-translate-x-full opacity-0 invisible`}`}>
                    {visitProfile && (
                            <>
                            <div className="cancel-profile" onClick={condition}>
                                <img src={cancel} className='w-[1em] m-[10px]' alt="" />
                            </div>
                            <div className="profile-title">
                                <h2>User Info</h2>
                                <hr className="divider" />
                            </div>
                            <section className="profile-cards">
                                <div className="profile-img">
                                    <img src={userImg || userLogo}  alt="" />
                                    <div className="edit">
                                        <label htmlFor="img">Edit</label>
                                        <input type="file" hidden id="img" accept="image/*" onChange={handleImg} />
                                    </div>
                                </div>
                                <div className="profile-card ">
                                    <h3 className="">Name:</h3>
                                    <p className=" text-wrap">{user.name || ''}</p>
                                </div>
                                <div className="profile-card my-[20px]">
                                    <h3 className="">Email:</h3>
                                    <p className=" text-wrap">{user.email || ''}</p>
                                </div>
                            </section>
                            <div className="logout">
                                <button type="button"  onClick={logout}>Logout</button>
                                <button onClick={save}>save</button>
                            </div>
                            </>
                     )} 
                     {loading && (
                    <div className="absolute top-[0%] z-10 w-full h-full bg-gray-900 bg-opacity-70  left-[50%] -translate-x-[50%] flex justify-center items-center ">
                        <div className="w-[4em] h-[4em] border-[#AA60C8] border-t-[2px] rounded-full animate-spin"></div>
                    </div>
                )}
                        </section>
                    {isAuthenticated ?
                    (
                        <div className="nav-profile" onClick={condition}>
                            <div className=""><img src={ userImg || userLogo } className="w-[2em] rounded-full" alt="" /></div>
                            <div className="text-gray-600" >Profile</div>
                        </div>
                    ) :
                    (   nav ?
                        <div className="">
                            <hr className="w-[80%] mx-auto h-[0.8px] border-none bg-gray-400 my-[10px]" />
                            <div className="flex justify-center gap-[10%] text-gray-600">
                                <Link to='/login'>Login</Link>
                                <Link to='/signin'>Signin</Link>
                            </div>
                        </div>
                        :
                        <div className="nav-com">
                            <Link to='/login'>Login</Link>
                            <Link to='/signin'>Signin</Link>
                        </div>
                    )}
                </div>
            </nav>
        </div>
    );
}

export default Nav;
