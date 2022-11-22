import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AiOutlineUser } from "react-icons/ai";
import { GoSignOut } from "react-icons/go";
import { AuthContext } from "../../Context/AuthContext";
import s from "./Navbar.module.css";

const Navbar = () => {
	const { user } = useContext(AuthContext);
	return (
		<div className={s.navbar}>
			<Link to="/" className={s.link}>
				Home
			</Link>
			<ul className={s.userSection}>
				<span className={s.link}>
					<AiOutlineUser className={s.icon} />
					{user.username}
				</span>
				<li className={s.signOut}>
					<GoSignOut className={s.icon} />
					Sign out
				</li>
			</ul>
		</div>
	);
};

export default Navbar;
