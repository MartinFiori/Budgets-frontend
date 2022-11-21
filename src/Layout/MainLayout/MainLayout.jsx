import React from "react";
import Navbar from "../../Components/Navbar/Navbar.jsx";
import Footer from "../../Components/Footer/Footer.jsx";

export default function MainLayout({ children }) {
	return (
		<div>
			<Navbar />
			{children}
			<Footer />
		</div>
	);
}
