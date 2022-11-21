import React, { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoutes from "./ProtectedRoutes.jsx";
import { AuthContext } from "../Context/AuthContext.jsx";
import AuthRoutes from "./AuthRoutes.jsx";

export default function AppRouter() {
	const { isLogged } = useContext(AuthContext);
	return (
		<BrowserRouter>
			<Routes>
				{isLogged ? (
					<Route path="/*" element={<ProtectedRoutes />} />
				) : (
					<Route path="/auth/*" element={<AuthRoutes />} />
				)}
				<Route path="/*" element={<Navigate to={"/auth/login"} />} />
			</Routes>
		</BrowserRouter>
	);
}
