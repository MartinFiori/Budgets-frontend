import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./Context/AuthContext";
import { MovementProvider } from "./Context/MovementContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<AuthProvider>
			<MovementProvider>
				<App />
			</MovementProvider>
		</AuthProvider>
	</React.StrictMode>
);
