import { faFacebook, faInstagram, faTelegram, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const Footer = () => {
    return(
        <div className="bg-gray-900 w-full  p-[1.5em] text-gray-400">
            <div className="grid lg:grid-cols-5 grid-cols-1 text-center lg:text-start w-full gap-y-[2em] lg:gap-0 ">
                <section className="md:w-[80%] lg:w-full lg:col-span-2 mx-auto">
                    <h2 className="footer-title">About Us</h2>
                    <p className="text-justify font-normal text-base">Welcome to our innovative platform, where technology meets creativity to revolutionize tile design. Using advanced AI tools, we empower users to generate unique and personalized tile patterns effortlessly.</p>
                </section>
                <section className="w-fit  mx-auto">
                    <h2 className="footer-title">Quick Links</h2>
                    <ul className="flex flex-col gap-[10px]">
                        <li className="footer-link"><Link to='/pattern'>create pattern</Link></li>
                        <li className="footer-link"><Link to='/generator'>create texture</Link></li>
                        <li className="footer-link"><Link to='/save'>saved pattern</Link></li>
                    </ul>
                </section>
                <section className="w-fit mx-auto lg:w-full lg:mx-0">
                    <h2 className="footer-title">contact</h2>
                    <p className="">Email: <a href="mailto:navinkanagarosan@gmail.com">nextgen@gmail.com</a></p>
                    <p className="my-[10px]">Phone: +91 98375 98736</p>
                    <p className="">Address: 123 AI Lane, Design City, CA</p>
                </section>
                <section className="w-fit mx-auto">
                    <h2 className="footer-title">follow on</h2>
                    <div className="flex gap-[20px]">
                        <a href=""><FontAwesomeIcon className="social-icon" icon={faFacebook} /></a>
                        <a href=""><FontAwesomeIcon className="social-icon" icon={faTwitter} /></a>
                        <a href=""><FontAwesomeIcon className="social-icon" icon={faInstagram} /></a>
                        <a href=""><FontAwesomeIcon className="social-icon" icon={faTelegram} /></a>
                    </div>
                </section>
            </div>
            <div className="w-full mt-[3em]">
                <p className="text-center">&copy; 2025 NextGen Tiles. All rights reserved.</p>
            </div>
        </div>
    );
};

export default Footer;