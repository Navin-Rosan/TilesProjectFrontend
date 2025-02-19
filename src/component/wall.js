import React, { useState, useEffect } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls, Box } from "@react-three/drei";
import { TextureLoader } from "three";
import { HexColorPicker } from 'react-colorful';
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import userNotFound from '../images/user-not-found.jpg'

const WallScene = ({user}) => {
	const [customeUrl, setCustomeUrl] = useState("/images/bg-img-hero.jpg");
	const location = useLocation();
	const {textureUrl, colorCode} = location.state || {};
	const [color, setColor] = useState(colorCode || "#FFFFFF");
	const [size, setSize] = useState([5, 2.5, 0.1]);
	const [condition, setCondition] = useState(false)
	const [title, setTitle] = useState(null)
	const [message, setMessage] = useState(null)
	const [error, setError] = useState(null)
	const [notFound, setNotFound] = useState(false);
	const [sizeName, setSizeName] = useState(null);
	const [fetchError, setFetchError] = useState(null);
	const [fileError, setFileError] = useState(null)
	const [inputColor, setInputColor] = useState('');
	const isValidHex = (color) => /^#([0-9A-Fa-f]{3}){1,2}$/.test(color);
	const loader = textureUrl || customeUrl;
	function TextureComponent({ url }) {
        const texture = useLoader(TextureLoader, url);
        return <meshStandardMaterial map={texture} roughness={5} color={color} />;
    }
	function handleFileUpload(event) {
		try {
			const file = event.target.files[0];
			if (file && file.type.startsWith('image/')) {
				const reader = new FileReader();
				reader.onload = () => {
					setCustomeUrl(reader.result);
				};
				reader.readAsDataURL(file);
			}
			else if(!file.type.startsWith('image/')){
				setFileError('Image file type only accaptable')
			}
		}
		catch(error) {
		}
		
	}
	function validTitle() {
		if(title === null){
			setError("create a title");
			return false;
		}
		return true;
	}
	async function handlebackend() {
		try {
			if(validTitle()){
				const response = await axios.post(`http://localhost:8080/design/public/save-img/${user.email}`, {
					title: title,
					url: textureUrl || customeUrl,
					colorCode: color
				})
				if(response.data === "user favorite texture saved succefully") {
					setMessage(response.data);
					setCondition(!condition);
					setTitle(null)
				}
				else {
					setError(response.data);
					setTitle(null)
				}
			}
		}
		catch(error) {
			setFetchError("something went wrong, please try again later!");
		}
		
	}
	function handleSize(size) {
		const sizeMap = {
			'small': [3, 3, 0.1],
			'medium': [4, 4, 0.1],
			'large': [4, 6, 0.1],
			'extra-large': [6, 6, 0.1]
		}
		setSize(sizeMap[size])
		setSizeName(size)
	}

	function handleCondition(event) {
		if(user)
			setCondition(!condition);
		else
			setNotFound(!notFound);
	}

	function handleInput(event) {
		setTitle(event.target.value)
	}
	useEffect(()=>{
        if(message) {
            const timer = setTimeout(()=>{
                setMessage(null);
            }, 2000);
            return () => clearTimeout(timer);
        }
    },[message])
	useEffect(()=>{
        if(fileError) {
            const timer = setTimeout(()=>{
                setFileError(null);
            }, 5000);
            return () => clearTimeout(timer);
        }
    },[fileError])

	function handleColor(event) {
		const value = event.target.value;
		setInputColor(value)
		if(isValidHex(value)){
			setFileError('');
			setColor(value)
		}
		else
			setFileError("invalid hex color code")
	}

	function handleColorPicker(newColor) {
		setInputColor(newColor);
		setColor(newColor)
	}
	return(
		<>
		<title>Texture</title>
		{fetchError ? <div className="w-full">{fetchError}</div> :
			<div className="w-full min-h-screen relative bg-gray-900">
			{fileError && (
				<p className="w-[80%] lg:w-[30%] z-10 text-center bg-red-500 text-red-800 font-semibold transition-all duration-500 absolute top-[80%] max-lg:-translate-y-1/2 lg:top-[10%] left-1/2 -translate-x-1/2 rounded-[5px] py-[2em] lg:py-[20px]">{fileError}</p>
			)}
			{message && (
				<p className="w-[80%] lg:w-[30%] z-10 text-center absolute top-[80%] max-lg:-translate-y-1/2 lg:top-[20px] bg-green-600 left-1/2 -translate-x-1/2 text-white py-[2em]  lg:py-[20px]">{message}</p>
			)}
			<div className={` w-full h-full max-xs:py-[2em] xs:p-[2em] ${notFound ? 'max-md:hidden' : 'block'}`}>
				<h1 className="texture-title">Texture for tiles</h1>
				<section className="texture-hero  ">
					<div className="w-[80%] md:w-[80%] lg:w-[30%] xl:w-[25%] max-lg:mb-[2em] text-white font-medium text-base  lg:p-[2em] ">
						<div className="w-full">
							<HexColorPicker style={{width: '100%'}}  color={color} onChange={handleColorPicker} />
						</div>
						<div className="w-full flex  mt-[20px] max-lg:gap-[20px] items-center">
							<label htmlFor="" className="lg:w-[20%]">Hex:</label>
							<input
							type="text"
							value={inputColor}
							onChange={handleColor}
							className=" w-[50%] p-2  text-white bg-transparent border-[1px] outline-none ring-0 rounded"
							placeholder="#FFFFFF"
							/>
						</div>
					</div>
					<section className="w-[100%] lg:w-[50%] h-[60vh] bg-slate-950 rounded-[15px] ">
						<Canvas className="w-[80%] rounded-[15px] ">
							<ambientLight intensity={0.5} />
							<pointLight position={[10,10, 10]} />
							<OrbitControls enablePan={false} enableZoom={false} maxPolarAngle={Math.PI / 2} />
							{/* args= width, height, depth */}
							<Box args={size} position={[0, 0, 0]} >
								<TextureComponent url={loader} />
								{/* <meshStandardMaterial  map={texter} roughness={5} color={color} /> */}
							</Box>
						</Canvas>
					</section>
					<div className="card">
						<p className="font-normal text-[22px] mb-[20px]">Size</p>
						<div className="w-full max-lg:grid grid-cols-2 xs:grid-cols-4 gap-[20px]">
							<div className={sizeName==='small'?`group bg-gray-950`:`group`} onClick={()=>handleSize('small')}>
								<h2>small</h2>
								<p className="">12 <span>x</span> 12</p>
								<p>inches</p>
							</div>
							<hr className="h" />
							<div className={sizeName==='medium'?`group bg-gray-950`:`group`} onClick={()=>handleSize('medium')}>
								<h2>medium</h2>
								<p className="">16 <span>x</span> 16</p>
								<p>inches</p>
							</div>
							<hr className="h" />
							<div className={sizeName==='large'?`group bg-gray-950`:`group`} onClick={()=>handleSize('large')}>
								<h2>large</h2>
								<p className="">16 <span>x</span> 24</p>
								<p>inches</p>
							</div>
							<hr className="h" />
							<div className={sizeName==='extra-large'?`group bg-gray-950`:`group`} onClick={()=>handleSize('extra-large')}>
								<h2>extra large</h2>
								<p className="">18 <span>x</span> 18</p>
								<p>inches</p>
							</div>
						</div>
					</div>
				</section>
				<section className=" flex w-full max-md:flex-col-reverse max-md:text-center lg:w-[80%] gap-[20px] justify-between mt-[1.5em] ">
					<div className="w-[90%] max-xs:mx-auto xs:w-full md:w-auto flex flex-col gap-[20px] lg:ml-[2em]">
						<p className="file-title">Save the pattern</p>
						<button className="texture-save" onClick={handleCondition}>Save</button>
					</div>
					<div className="w-[90%] max-xs:mx-auto xs:w-full md:w-auto flex flex-col gap-[20px]">
						<span className="file-title">Choose a file: JPG*, PNG*, SVG*</span>
						<label className="upload-file" htmlFor="upload">Upload image</label>
						<input type="file" accept="image/*" className="input-file hidden " id="upload" onChange={handleFileUpload}/>
					</div>
					<div className="w-[90%] max-xs:mx-auto xs:w-full md:w-auto flex flex-col gap-[20px]">
						<p className="file-title">Generate Texture With AI</p>
						<Link className="texture-generate" to='/generator'>Generate</Link>
					</div>
					
				</section>
			</div>
			{condition && (
				<div className="confirm-tab">
					<div className="confirm-card">
						<FontAwesomeIcon icon={faX} onClick={handleCondition} className="confirm-cancel" />
						<div className=" font-medium text-[22px] text-dark capitalize mb-[20px]">save design</div>
						<div className="confirm-group">
							<label htmlFor="" className="text-base text-dark font-medium capitalize">create your title</label>
							<div className="w-full relative">
								<button className="confirm-btn" onClick={handlebackend}>Save</button>
								<input type="text" value={title} className={error?`empty-confirm`:`confirm-input`} placeholder={`eg.. sunset pattern`} onChange={handleInput} onClick={()=>setError(null)} />
							</div>
							{error && (
								<p className="text-left my-[10px] font-semibold text-red-600">{error}</p>
							)}
						</div>
					</div>
				</div>
			)}
			{notFound && (
				<div className="confirm-tab">
					<section className="not-found-tab">
						<div className="nf-head"><FontAwesomeIcon className="nf-icon" icon={faX} onClick={()=>setNotFound(!notFound)} /></div>
						<img src={userNotFound} className="xs:hidden w-[100%]" alt="" />
						<div className="text-center my-[20px] text-dark text-[26px] font-medium">User not found</div>
						<div className="text-[18px] text-center text-[#373840] max-xs:mb-[20px]">
							Login or Signup to get full access <Link to='/login' className="nf-link">login</Link> or <Link to='/signin' className="nf-link">sign up</Link>
						</div>
					</section>
				</div>
			)}
			</div>
		}
		</>
	);
};

export default WallScene;
