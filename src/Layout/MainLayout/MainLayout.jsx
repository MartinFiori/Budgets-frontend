import React from "react";
import Navbar from "../../Components/Navbar/Navbar.jsx";
import Footer from "../../Components/Footer/Footer.jsx";
import s from "./MainLayout.module.css";

export default function MainLayout({ children }) {
	return (
		<div className={s.layout}>
			<Navbar />
			{children}
			<Footer />
		</div>
	);
}
