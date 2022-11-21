import React from "react";
import s from "./AuthLayout.module.css";

const AuthLayout = ({ children }) => {
	return <div className={s.layout}>{children}</div>;
};

export default AuthLayout;
