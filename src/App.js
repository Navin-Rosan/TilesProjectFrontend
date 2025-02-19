import { useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Routes, useLocation } from "react-router-dom";
import Generator from "./component/generator";
import Hero from "./component/hero";
import Save from "./component/save";
import Login from "./component/login";
import Signin from "./component/signin";
import WallScene from "./component/wall";
import Nav from "./component/nav"; 

function App() {
	const [user, setUser] = useState(() => {
		const savedUser = localStorage.getItem('user'); 
		return savedUser ? JSON.parse(savedUser) : null; 
	  });
	
	  useEffect(() => {
		if (user) {
			const expiryTime = new Date().getTime() + 3 * 24 * 60 * 60 * 1000;
			
			localStorage.setItem('expiry', expiryTime.toString());
		  	localStorage.setItem('user', JSON.stringify(user)); 
		} else {
		  localStorage.removeItem('user'); 
		  localStorage.removeItem('expiry')
		}
	  }, [user]);
	  
	  useEffect(() => {
		const interval = setInterval(() => {
		  const expiry = localStorage.getItem("expiry");
		  const currentTime = new Date().getTime(); 
			
		  if (expiry && currentTime > Number(expiry)) { 
			handleLogout();
		  }
		}, 60000); 
	
		return () => clearInterval(interval);
	  }, []);
	
	  function handleLogout() {
		localStorage.removeItem("user");
		localStorage.removeItem("expiry");
		setUser(null);
	  }

	  function ConditionalNav({ user }) {
		const location = useLocation();
		const hideNavOnRoutes = ["/login", "/signin"]; 
	  
		if (hideNavOnRoutes.includes(location.pathname)) {
		  return null; 
		}
	  
		return <Nav user={user} setUser={setUser} />;
	  }
  return (
    <div className="App h-screen overflow-auto font-poppins relative">
      <Router>
        {/* Render Nav conditionally based on the current route */}
        <ConditionalNav user={user} setuser={setUser} />
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/generator" element={<Generator />} />
          <Route path="/pattern" element={<WallScene user={user} />} />
          <Route path="/save" element={<Save user = {user} />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/signin" element={<Signin setUser={setUser} />} />
        </Routes>
      </Router>
    </div>
  );
}



export default App;
