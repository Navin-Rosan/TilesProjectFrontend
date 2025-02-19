import { Link, useLocation } from "react-router-dom";
import hero4 from '../images/hero4.png';
import idea1 from '../images/idea.png';
import visualization from '../images/visualization1.png';
import userFrienly from '../images/user-friendly1.png';
import Footer from "./footer";
import { useEffect, useState } from "react";
function Hero() {
    const location = useLocation();
    const [responseMessage, setMsg] = useState(location.state?.responseMessage || '');

    useEffect(()=>{
        if(responseMessage) {
            const timer = setTimeout(()=>{
                setMsg(null);
            }, 3000);
            return () => clearTimeout(timer);
        }
    },[responseMessage])
    
    return(
        <>
            <title>NextGen Wall</title>
            
            <div className="bg-main2 relative w-full h-full ">
                {responseMessage && (
                    <p className="absolute bg-[#20B2AA] transition-all duration-300 py-[1em] text-center font-medium text-[20px] left-[50%] -translate-x-[50%] w-[80%] md:w-[60%] lg:w-[30%] text-snow">{responseMessage}</p>
                )}
                <section className="flex flex-col lg:flex-row h-full lg:h-screen lg:justify-around overflow-hidden">
                    <div className="w-[80%] mx-auto lg:mx-0 lg:w-[30%] lg:mt-[12%] mt-[20px] text-center lg:text-left mb-[2em] lg:mb-0">
                        <h2 className="text-[2em] font-medium font-roboto text-gray-700 lg:mb-[25px]">Transform Your Tiles with AI-Generated Textures</h2>
                        <p className="text-[18px] font-normal font-roboto text-gray-600 my-[20px] lg:mb-[15%]">Use the power of AI to create unique wall designs and see them in 3D.</p>
                        <Link to='/pattern' className="hover:bg-hero2 bg-white text-gray-600 py-[5px] px-[15px] rounded hover:text-white text-[16px] font-medium border-[1px] hover:border-none transition-all duration-300 border-black">Get Started</Link>
                    </div>
                    <div className="sm:w-[80%] md:w-[80%] sm:mx-auto lg:mx-0 lg:w-[50%] xl:w-[40%] lg:flex lg:flex-col justify-center">   
                        <img src={hero4} className="w-full xs:w-[80%] sm:w-[80%] md:w-[70%] xs:mx-auto lg:mx-0 lg:w-[100%] shadow-lg rounded-lg" alt="" />
                    </div>
                </section>
                <section className="h-auto bg-content py-[3em]">
                    <div className="text-center mb-[2.5em] w-[90%] lg:w-full mx-auto lg:mx-0">
                        <h2 className="font-medium text-gray-800 font-roboto text-[32px] lg:text-[40px] mb-[10px] lg:mb-[20px]">Why Choose Our Platform?</h2>
                        <p className="font-normal text-gray-900 font-roboto text-[18px] md:text-[20px]">Transform your designs with AI-powered textures and real-time 3D visualization.</p>
                    </div>
                    <div className="w-[90%] xs:w-[80%] flex flex-col lg:flex-row gap-[10px] lg:gap-[10%] mx-auto lg:items-end mb-[2em] lg:mb-[3.5em]">
                        <p className="content-title">AI-Powered Image Generator: Turn your ideas into unique textures in seconds.</p>
                        <img src={idea1} alt="" className=" xs:w-[60%] xs:mx-auto lg:mx-0 lg:w-[32%] shadow-2xl rounded-lg"/>
                    </div>
                    <div className="w-[90%] xs:w-[80%] flex flex-col-reverse lg:flex-row gap-[10px] lg:gap-[10%] mx-auto lg:items-center mb-[2em] lg:mb-[3.5em]">
                        <img src={visualization} alt="" className="xs:w-[58%] xs:mx-auto lg:mx-0 lg:w-[30%] shadow-2xl rounded-lg "/>
                        <p className="content-title">AI-Powered Image Generator: Turn your ideas into unique textures in seconds.</p>
                    </div>
                    <div className="w-[90%] xs:w-[80%] flex flex-col lg:flex-row gap-[10px] lg:gap-[10%] mx-auto lg:items-start ">
                        <p className="content-title">AI-Powered Image Generator: Turn your ideas into unique textures in seconds.</p>
                        <img src={userFrienly} alt="" className="xs:w-[58%] xs:mx-auto lg:mx-0 lg:w-[30%] shadow-2xl rounded-lg"/>
                    </div>
                    <div className="mt-[3.5em] text-center xs:text-left">
                        <Link to='/generator' className="px-[1.5em] py-[6px] xs:ml-[10%] font-medium font-roboto text-base border-[1px] border-gray-800 bg-white text-hov hover:bg-hero rounded-lg hover:text-white hover:border-none transition-all duration-300">Get Texture</Link>
                    </div>
                </section>
                <Footer />
            </div>        
        </>

    );
}

export default Hero;