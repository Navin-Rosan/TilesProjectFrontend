import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Footer from "./footer";

function Save({user}) {
    const navigate = useNavigate();
    const [savedImg, setSavedImg] = useState([]);
    const [fetchError, setFetchError] = useState(null);
    const [loading, setLoading] = useState(true)
    const [deleteLoading, setDL] = useState(false)
    async function fetchImg() {
        setLoading(true)
        try {
            if(user){const response = await axios.get(`https://tilesprojectbackend-production.up.railway.app/design/public/get-save-img/${user.email}`)
            setSavedImg(response.data)}
        }
        catch(error) {
            setFetchError('something went wrong, please try again later!');
        }
        finally {
            setLoading(false)
        }
    }

    useEffect(()=>{
        user && fetchImg();
    },[user])



    function handleWallScene(url, colorCode) {
        if(url)
            navigate("/pattern", {state: {textureUrl: url, colorCode: colorCode}})
        else
        setFetchError('empty url');
        
    }

    async function handleDelete(title) {
        setDL(true);
        try {
            await axios.delete(`https://tilesprojectbackend-production.up.railway.app/design/public/delete-save-img/${user.email}/${title}`);
            setSavedImg((prev) => prev.filter((img) => img.title !== title));
        }
        catch(error) {
            setFetchError("something went wrong, please try again later!");
        }
        finally {
            setDL(false)
        }
    }
    
    
    return(
        <>
            <title>Saved Images</title>
            {fetchError ? 
                <div className="w-full h-screen">{fetchError}</div> :
                <div className="w-full">
                    <div className="w-full min-h-screen  mb-[2em] relative">
                            {deleteLoading && (
                                <div className="absolute top-[0%] z-10 w-full h-full bg-gray-900 bg-opacity-70  left-[50%] -translate-x-[50%] flex justify-center items-center ">
                                    <div className="w-[4em] h-[4em] border-[#AA60C8] border-t-[2px] rounded-full animate-spin"></div>
                                </div>
                            )}
                        <header className="save-head">
                            {(user ?
                                <>
                                    <h1 className="save-head-title">Your favorite creations</h1>
                                    <p className="save-head-body">Discover your favorite designs and inspirations stored in one place!</p>
                                </>
                                :
                                <>
                                    <h1 className="save-head-title">No active account found?</h1>
                                    <p className="save-head-body">You haven't create a account</p>
                                </>
                            )}     
                        </header>
                        {(user ?
                            loading ? 
                            <div className="w-full flex justify-center items-center py-10">Loading...</div> :
                            <div className={`w-full  ${savedImg.length > 0 && 'grid'} grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[20px] xs:gap-[10px] px-[10px] relative`}>
                            {savedImg.length === 0 && (
                                <div className="w-full flex items-center justify-center h-full font-semibold text-gray-700 text-[24px]">save section is Empty!</div>
                            )}
                            {savedImg && (
                                savedImg.map((value, index)=>{
                                    return(
                                        <div className="w-[100%]" key={index}>
                                            <div className="saved-card">
                                                <img src={value.url} className="saved-img" alt={value.title || "img"} />
                                            </div>
                                            <p className="saved-title">{value.title}</p>
                                            <div className="saved-btns">
                                                <button  onClick={ ()=>handleWallScene(value.url, value.colorCode) } className="saved-preview">Preview</button>
                                                <button onClick={()=>handleDelete(value.title)} type="button" className="saved-delete">Delete</button>
                                            </div>
                                            
                                        </div>
                                    )
                                })
                            )}
                            </div> :
                            <div className="save-signup">Create account! <Link to='/signin' className="text-[#189af7] hover:underline transition-all duration-300">Sign up</Link></div>
                        )}
                    </div>
                    <Footer />
                </div>
            }
        </>
    );
}

export default Save;