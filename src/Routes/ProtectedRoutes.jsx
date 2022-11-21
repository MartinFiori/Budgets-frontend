import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import MainLayout from "../Layout/MainLayout/MainLayout.jsx";
import CreateForm from "../Views/CreateForm/CreateForm.jsx";
import Dashboard from "../Views/Dashboard/Dashboard";

const ProtectedRoutes = () => {
	return (
		<MainLayout>
			<Routes>
				<Route path="/createMovement" element={<CreateForm />} />
				<Route path="/home" element={<Dashboard />} />
				<Route path="/*" element={<Navigate to="/home" />} />
			</Routes>
		</MainLayout>
	);
};

export default ProtectedRoutes;
