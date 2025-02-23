
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

function Generator() {
    const [promt, setPromt] = useState("");
    const [img, setImg] = useState([]);
    const [loading, setLoading] = useState(false);
    const [display, setDisplay] = useState(false);
    const [url, setUrl] = useState(null);
    const [error, setError] = useState(null);
    const [promptError, setPromptError] = useState(null);
    const [loader, setLoader] = useState(0);

    const navigate = useNavigate();
    
    const key = "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";
    
    const imgCount = 4;
    const retryCount = 8;

    function blobToBase64(blob) {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.readAsDataURL(blob);
        });
    }

    async function fetchImage(modifiedPrompt, retries = 0) {
        try {
            const response = await axios.post("https://api-inference.huggingface.co/models/ZB-Tech/Text-to-Image",
                { inputs: modifiedPrompt },
                {
                    headers: {
                        Authorization: `Bearer ${key}`,
                        "Content-Type": "application/json",
                    },
                    responseType: "blob",
                }
            );

            if (response.status === 200) {
                return blobToBase64(response.data);
            }
        } catch (error) {
            if (error.response?.status === 429 && retries < retryCount) {
                const waitTime = (retries + 1) * 2000;
                setLoader(Math.min((waitTime / 16000) * 100, 100));
                return new Promise((resolve) => 
                    setTimeout(() => resolve(fetchImage(modifiedPrompt, retries + 1)), waitTime)
                );
            }
            setError("Something went wrong, please try again later!");
            return null;
        }
    }

    async function handleQuery() {
        if (promt.trim() === '') {
            setPromptError('Please enter a prompt');
            return;
        }

        setLoading(true);
        setImg([]);
        const requests = Array.from({ length: imgCount }, async (_, i) => {
            return fetchImage(`${promt}, variation ${i + 1}`);
        });

        const results = await Promise.all(requests);
        setImg(results.filter(img => img !== null));
        setLoading(false);
    }

    function mainHandle(image) {
        setUrl(image);
        setDisplay(true);
    }

    function handleUrl() {
        if (url) {
            navigate('/pattern', { state: { textureUrl: url } });
        } else {
            alert("No image selected!");
        }
    }

    return (
        <>
            <title>Image Generating</title>
            {error ? (
                <div className="w-full">{error}</div>
                
            ) : (
                <div className={`min-h-screen w-full  bg-gray-900 pt-[5%] relative max-lg:pb-[2em]`}>
                    <div className="flex flex-col lg:flex-row w-[90%] md:w-[60%]  mx-auto items-center justify-center gap-[20px]">
                        {promptError && <div className="absolute top-[2em] text-red-600 font-semibold">{promptError}</div>}
                        <div className="w-full lg:w-[80%] xl:w-[60%] relative">
                            <FontAwesomeIcon icon={faMagnifyingGlass} className="search" />
                            <input type="text" value={promt} onChange={(e) => setPromt(e.target.value)} 
                                className="input-query" placeholder="Search for an image" 
                                onKeyDown={(e) => e.key === 'Enter' && handleQuery()} />
                        </div>
                        {loading ?
                            <button onClick={handleQuery}  className="generate disabled:cursor-not-allowed" disabled>Generate</button> 
                            :
                            <button onClick={handleQuery}  className="generate">Generate</button> 
                        }
                    </div>

                    {loading && (
                        <>
                        <div className="max-md:w-[90%] w-[60%]  mx-auto mt-[5%]">
                            <p className="text-white text-center animate-pulse mb-[2em]">Generating... please wait</p>
                            <div className="w-full border-[2px] border-green-800 h-[2em] rounded-full relative">
                                <div className={`loader`} style={{width: `${Math.max(loader, 10)}%`}}></div>
                            </div>
                        </div>
                        <div className="absolute top-[50%] translate-y-[40%] left-[50%] -translate-x-[50%] flex justify-center items-center mt-8">
                            <div className=" border-t-[2px] border-blue-500 rounded-full w-14 h-14 animate-spin"></div>
                        </div>
                    </>
                    )}

                    {img.length > 0 && !loading && (
                        <div className={`w-[90%] lg:w-[95%] ${display ? "max-lg:hidden" : "grid"} grid max-lg:grid-cols-1 mt-[${img.length >= 4 ? "10%" : "5%"}] mx-auto ${img.length === 1 ? "grid-cols-1" : img.length === 2 ? "lg:grid-cols-2" : img.length === 3 ? "grid-cols-3" : "grid-cols-4"} gap-[20px] lg:gap-[4px]`} >{
                            img.map((image, index)=>{
                                console.log(img.length)
                                return(
                                    <>
                                        <div className="relative" key={index}>
                                            <img src={image} onClick={()=>mainHandle(image)} alt="" className={`body`} key={index}  />
                                        </div>
                                        
                                    </>
                                );
                            })}
                        </div>
                    )}

                    {display && (
                        <section className="w-[100%] max-md:flex flex-col  max-md:justify-center  min-h-screen bg-gray-900 lg:bg-opacity-90 pt-[2em] absolute top-0">
                            <h1 className="title">Selected Image</h1>
                            <div className="w-[80%] md:w-[70%] h-full mx-auto ">
                                <div className="w-[100%] md:w-[80%] lg:w-[50%] mx-auto ">
                                    <img src={url} alt="" className="w-[100%]"/>
                                </div>
                                <div className="text-gray-200 w-full md:w-[80%] lg:w-[40%] flex flex-col gap-[30%] my-[2em] lg:my-[2.5%] mx-auto">
                                    <div className="flex max-lg:flex-col-reverse max-lg:gap-[20px] justify-between ">
                                        <button className="cancel" onClick={()=>setDisplay(false)}>cancel</button> 
                                        <button className="pattern" onClick={handleUrl}>Pattern</button>
                                    </div>
                                </div>
                            </div>
                        </section>
                    )}
                </div>
            )}
        </>
    );
}

export default Generator;
