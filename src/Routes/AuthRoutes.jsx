import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import AuthLayout from "../Layout/AuthLayout/AuthLayout";
import LogIn from "../Views/LogIn/LogIn";
import Register from "../Views/Register/Register";

const AuthRoutes = () => {
	return (
		<AuthLayout>
			<Routes>
				<Route path="/login" element={<LogIn />} />
				<Route path="/register" element={<Register />} />
				<Route path="/*" element={<Navigate to="/login" />} />
			</Routes>
		</AuthLayout>
	);
};

export default AuthRoutes;
